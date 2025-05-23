import React from 'react';
import './OrderSuccess.css'; // Create this CSS file
import  Navbar  from '../navbar/Navbar';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const OrderSuccess = () => {
    const listorders = useSelector((state) => state.client.orders);
    console.log(listorders);

    return (
        <>
            <Navbar />
            <div className="success-container">
                <div className="success-card">
                    <div className="success-icon">✓</div>
                    <h2 className="success-title">تم تقديم الطلب بنجاح</h2>
                    <p className="success-message">
                        📞<br />
                        ستتلقى رسالة على هاتفك لتأكيد طلبك قبل التحضير
                    </p>
                    <div className="button-group">
                        <Link to={'/orderhistory'}>
                            <button className="view-orders-btn">عرض الطلب</button>
                        </Link>
                        <Link to={'/'}>
                            <button className="continue-shopping-btn">العودة إلى الصفحة الرئيسية</button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default OrderSuccess;