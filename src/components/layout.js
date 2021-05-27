
import React, { useEffect } from "react"
import {useImmerReducer} from "use-immer"

import "../styles/layout.css"

import Header from "./header"
import Footer from "./footer"

import StateContext from "../context/stateContext"
import DispatchContext from "../context/dispatchContext"
import Disclaimer from "./disclaimer"


const Layout = ({ children }) => {

  const initialState = {
    products: null,
    filteredProducts: null,
    activeFilters: {
      category: "shop-all",
      make: [],
      price: [],
      onlySale: false,
      onlyAvailable: false
    },
    requestFilterCounter: 0,
    moreFiltersMenuIsVisible: false
  }

  function reducer(draft, action) {
    switch (action.type) {

      case "setProducts":
        draft.products = action.products;
        return draft;

      case "setCategoryFilter":
        draft.activeFilters.category = action.filter;
        return draft;

      case "toggleMakeFilter":
        draft.activeFilters.make.includes(action.filter) ? draft.activeFilters.make = draft.activeFilters.make.filter(make => make !== action.filter) : draft.activeFilters.make.push(action.filter)
        return draft;
      
      case "setPriceFilter":
        draft.activeFilters.price = action.price;
        return draft;

      case "toggleOnlySaleFilter":
        draft.activeFilters.onlySale = !draft.activeFilters.onlySale
        return draft;

      case "toggleOnlyAvailableFilter":
        draft.activeFilters.onlyAvailable = !draft.activeFilters.onlyAvailable
        return draft;

      case "filterProducts":
        draft.filteredProducts = draft.products.filter(product => {
          const categoryCheck = draft.activeFilters.category === "shop-all" ? true : product.node.category.categoryName === draft.activeFilters.category
          const makeCheck = draft.activeFilters.make.length === 0 ? true : draft.activeFilters.make.includes(product.node.make.makeName)
          const priceCheck = draft.activeFilters.price.length === 0 ? true : product.node.discountPrice ? product.node.discountPrice >= draft.activeFilters.price[0] && product.node.discountPrice <= draft.activeFilters.price[1] : product.node.price >= draft.activeFilters.price[0] && product.node.price <= draft.activeFilters.price[1]
          const onlySaleCheck = draft.activeFilters.onlySale ? product.node.discountPrice : true

          return categoryCheck && makeCheck && priceCheck && onlySaleCheck
        })
        return draft;

      case "toggleMoreFiltersMenu":
        draft.moreFiltersMenuIsVisible = !draft.moreFiltersMenuIsVisible;
        return draft;

      case "requestFilterCounter":
        draft.requestFilterCounter++
        return draft;
      
      case "clearFilters":
        draft.filteredProducts = null;
        draft.activeFilters = initialState.activeFilters;
        return draft;
      
      default:
        return draft;
    }
  }

  const [appState, appDispatch] = useImmerReducer(reducer, initialState);

  useEffect(() => {
    let unsubscribe;
    
    const handler = () => {
        unsubscribe = window.Snipcart.events.on('item.adding', (parsedCartItem) => {
        const cartItems = window.Snipcart.store.getState().cart.items.items;
        let filteredCart = [];
        if (cartItems.length > 0) {
          filteredCart = cartItems.filter(item => item.id === parsedCartItem.id)
        }
        // we want to animate the cart count badge only when an item is actually added to the cart
        // so we have to check if the item max quantity has already been reached
        if (filteredCart.length === 0 || filteredCart[0]?.quantity !== parsedCartItem.maxQuantity) {
          document.getElementById(parsedCartItem.id).disabled = true;
          document.getElementById("snipcart-items-count").classList.add("animation--expand")
          
          setTimeout(()=>{
            document.getElementById(parsedCartItem.id).disabled = false;
            document.getElementById("snipcart-items-count").classList.remove("animation--expand")
          }, 600)
        }
      })
    }

    // when snipcart is ready we start listening for when an item is added to the cart so we 
    // can animate the cart count badge
    document.addEventListener('snipcart.ready', handler);

    return () => {
      // cleanup
        if (unsubscribe) {
          unsubscribe()
        }
        document.removeEventListener('snipcart.ready', handler)
    }
  }, [])

  return (
      <StateContext.Provider value={appState}>
        <DispatchContext.Provider value={appDispatch}>
          <Header/>
          <Disclaimer />
          <main>{children}</main>
          <Footer />
        </DispatchContext.Provider>
      </StateContext.Provider>
  )
}

export default Layout
