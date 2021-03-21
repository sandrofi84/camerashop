import React, { useState, useContext, useEffect } from 'react'
import { Range } from 'rc-slider';
import 'rc-slider/assets/index.css';
import DispatchContext from '../context/dispatchContext';
import StateContext from '../context/stateContext';

const MoreFiltersMenu = ({makes, minPriceDefault, maxPriceDefault}) => {
    const appState = useContext(StateContext)
    const appDispatch = useContext(DispatchContext)

    const [minMaxValues, setMinMaxValues] = useState(appState.activeFilters.price)

    useEffect(() => {
        if (appState.activeFilters.price.length === 0) {
            setMinMaxValues([minPriceDefault,maxPriceDefault])
        }
    },[appState.activeFilters.price])

    useEffect(() => {
        let delayedRequest
        
        delayedRequest = setTimeout(() => {
            appDispatch({type: "requestFilterCounter"})
        }, 300)

        return () => {
            clearTimeout(delayedRequest)
        }
    },[minMaxValues])

    useEffect(() => {
        if (appState.requestFilterCounter) {
            appDispatch({type: "setPriceFilter", price: minMaxValues})
            appDispatch({type: "filterProducts"})
        }
    }, [appState.requestFilterCounter])

    

    function toggleMakeFilter(make) {
        appDispatch({ type: "toggleMakeFilter", filter: make })
        appDispatch({ type: "filterProducts" })
    }

    return (
        <div className="more-filters-menu color--white bg--purple">
            <div className="more-filters-menu__by-make">
                <p>Makes</p>
                <div className="more-filters-menu__by-make__pool">
                    {
                        makes.map(make => (
                            <div key={make.node.id}>
                                <input onChange={() => toggleMakeFilter(make.node.makeName)} type="checkbox" name={make.node.makeName} id={make.node.makeName} checked={appState.activeFilters.make.includes(make.node.makeName)} />
                                <label htmlFor={make.node.makeName}>{make.node.makeName}</label>
                            </div>
                        ))
                    }
                </div>
            </div>
            
            <div className="more-filters-menu__price-filter">
                <p>Prices</p>
                <div className="more-filters-menu__price-filter-container">
                    <div className="more-filters-menu__price-filter-range">
                        <Range onChange={e => {
                            setMinMaxValues(e)
                        }} defaultValue={[minPriceDefault,maxPriceDefault]} value={minMaxValues} min={minPriceDefault} max={maxPriceDefault} allowCross={false} />
                    </div>
                    <div className="more-filters-menu__price-filter-minmax">
                        <span>min: £{minMaxValues[0]}</span>
                        <span>max: £{minMaxValues[1]}</span>
                    </div>
                    
                </div>
            </div>

            <div className="more-filters-menu__more-filters">
                <p>More Filters</p>
                <div className="more-filters-menu__more-filters__pool">
                    <div>
                        <input onChange={() => {
                            appDispatch({type: "toggleOnlySaleFilter"})
                            appDispatch({type: "filterProducts"})
                        }} type="checkbox" name="onlySale" id="onlySale" checked={appState.activeFilters.onlySale} />
                        <label htmlFor="onlySale">Only sale products</label>
                    </div>
                    <div>
                        <input onChange={() => {
                            appDispatch({type: "toggleOnlyAvailableFilter"})
                        }} type="checkbox" name="onlyAvailable" id="onlyAvailable" checked={appState.activeFilters.onlyAvailable} />
                        <label htmlFor="onlyAvailable">Only available products</label>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default MoreFiltersMenu
