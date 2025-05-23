import React from 'react';
import './OrderDetails.css';
import { useSelector } from 'react-redux';
import { MdArrowBackIos } from 'react-icons/md';

 const OrderDetails = () => {
  const listorders = useSelector((state) => state.client.orders);
  const recentOrder = listorders[listorders.length - 1];

  return (
    <>
      {recentOrder && (
        <div className="order-container">
          <div onClick={()=>history.back()} dir="ltr" className="back-container">
          <a href="#" className= 'small-back-button' style={{width:'30%'}}  aria-label="Go back">
              <span className="back-button__icon"></span>
              <span className="back-button__text">عودة</span>
          </a></div>
    

          <div className="order-header">
            <h1>تفاصيل الطلب</h1>
            <p>رقم الطلب: <span className="order-id">{recentOrder.id}</span></p>
          </div>

          <div className="customer-details">
            <h2>معلومات العميل</h2>
            <p><strong>الاسم:</strong> {recentOrder.name}</p>
            <p><strong>رقم الهاتف:</strong> {recentOrder.phonenumber}</p>
            <p><strong>الشارع:</strong> {recentOrder.street}</p>
            <p><strong>رقم المنزل:</strong> {recentOrder.housenumber}</p>
          </div>

          <div className="items-list">
            <h2>العناصر المطلوبة</h2>
            <div className="items-container">
              {recentOrder.items.map((item, index) => (
                <div key={index} className="item-card">
                  <img src={item.image} alt={item.name} className="item-img" />
                  <div className="item-info">
                    <h3 className="item-name">{item.name}</h3>
                    <p className="item-price">{item.price} درهم</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="total-amount">
            <h3>المبلغ الإجمالي: {recentOrder.items.reduce((acc, item) => acc + item.price, 0)} درهم</h3>
          </div>
        </div>
      )}
    </>
  );
};
export default OrderDetails;