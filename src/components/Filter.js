import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { filterProducts, sortProducts } from "../actions/productActions"

const Filter = () => {

  const products = useSelector(state => state.products.items)
  const filteredProducts = useSelector(state => state.products.filteredItems)
  const dispatch = useDispatch()
  
  return !filteredProducts ? (<div>Loading...</div>) : (
    <div className="filter">
      <div className="filter-result">{filteredProducts.length} Products</div>
      <div className="filter-sort">
        Order{" "}
        <select onChange={(e) => dispatch(sortProducts(filteredProducts, e.target.value))}>
          <option value="latest">Latest</option>
          <option value="lowest">Lowest</option>
          <option value="highest">Highest</option>
        </select>
      </div>
      <div className="filter-size">
        Filter{" "}
        <select onChange={(e) => dispatch(filterProducts(products, e.target.value))}>
          <option value="">ALL</option>
          <option value="XS">XS</option>
          <option value="S">S</option>
          <option value="M">M</option>
          <option value="L">L</option>
          <option value="XL">XL</option>
          <option value="XXL">XXL</option>
        </select>
      </div>
    </div>
  )
}

export default Filter
