import React, { useEffect } from "react";
import { fetchOrders } from "../actions/orderActions"
import formatCurrency from "../util";
import { useSelector, useDispatch } from "react-redux"

const Orders = () => {

  const orders = useSelector(state => state.order.orders)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchOrders())
  }, [])
      
  return !orders ? (
    <div>Orders</div>
  ) : (
    <div className="orders">
      <h2>Orders</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>DATE</th>
            <th>TOTAL</th>
            <th>NAME</th>
            <th>EMAIL</th>
            <th>ADDRESS</th>
            <th>ITEMS</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.createdAt}</td>
              <td> {formatCurrency(order.total)}</td>
              <td>{order.name}</td>
              <td>{order.email}</td>
              <td>{order.address}</td>
              <td>
                {order.cartItems.map((item) => (
                  <div key={item._id}>
                    {item.count} {" x "} {item.title}
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Orders
