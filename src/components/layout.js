
import React from "react"
import {useImmerReducer} from "use-immer"

import Header from "./header"
import "../styles/layout.css"
import StateContext from "../context/stateContext"
import DispatchContext from "../context/dispatchContext"

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

  const [appState, appDespatch] = useImmerReducer(reducer, initialState);

  return (
      <StateContext.Provider value={appState}>
        <DispatchContext.Provider value={appDespatch}>
          <Header/>
          <main>{children}</main>
          <footer className="footer bg--grey color--white"/>
        </DispatchContext.Provider>
      </StateContext.Provider>
  )
}

export default Layout
