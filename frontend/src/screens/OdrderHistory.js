import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import LoadingBox from "../Component/LoadingBox";
import MessageBox from "../Component/MessageBox";
import { orderHistory } from "../Services/Actions/action";

function OdrderHistory() {
  const orderhistory = useSelector((state) => state.orderHistory);
  console.log(orderhistory);
  const userInfo = useSelector((state) => state.product.userInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(orderHistory({ user: userInfo }));
  }, [userInfo, dispatch]);
  return (
    <div>
      <Helmet>
        <title>Order History</title>
      </Helmet>
      <h1>Order History</h1>
      {orderhistory.loading ? (
        <LoadingBox />
      ) : orderhistory.error ? (
        <MessageBox variant="danger">{orderhistory.error}</MessageBox>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>DATE</th>
              <th>Total</th>
              <th>Paid</th>
              <th>Delivered</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {orderhistory.OrderHistory.map((order)=>{
                return( <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                <td>{order.totalPrice.toFixed(2)}</td>
                <td>{order.isPaid ? order.paidAt.substring(0, 10) : 'No'}</td>
                <td>
                  {order.isDelivered
                    ? order.deliveredAt.substring(0, 10)
                    : 'No'}
                </td>
                <td>
                  <Button
                    type="button"
                    variant="light"
                    onClick={() => {
                      navigate(`/order/${order._id}`);
                    }}
                  >
                    Details
                  </Button>
                </td>
                </tr>)
               
            })}

          </tbody>
        </table>
      )}
    </div>
  );
}

export default OdrderHistory;
