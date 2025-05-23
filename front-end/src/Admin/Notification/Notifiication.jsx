import { useDispatch, useSelector } from "react-redux";
import styles from '../Notification/Notification.module.css';
import { ClearNotificationListe } from "../Redux/Action";
import { useState } from "react";
import Sidebar from "../Sidebar/Sidebar";
import Navbar from "../Navbar/Navbar";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const Notifiication = () => {
  const dispatch = useDispatch();
  const Notifications = useSelector((state) => state.admin.Notifications);
  const [isOpen, setIsOpen] = useState(false);
  const { role } = useParams();

  const handleSidebarStateChange = (newState) => {
    setIsOpen(newState);
  };
    
  const handelClearAll = () => {
    localStorage.removeItem('notificationListe');
    dispatch(ClearNotificationListe());
  };

  return (
    <div className="content" style={{ backgroundColor: 'var(--background-color)', color: 'var(--text-color)' }}>
      <Sidebar isOpen={isOpen} onSidebarStateChange={handleSidebarStateChange} />
      <div className={`all-badges  ${isOpen ? 'push-main-content' : 'ml-20'}`}>
        <Navbar pagePath='Notification'/>
        <div className="pages">
          <div className={styles.notificationsContainer}>
            <h2 className={styles.notificationsTitle}>📬 Notification</h2>
            <button 
              onClick={handelClearAll}
              className={styles.clearButton}
            >
              Clear All Notification
            </button>
            <div className={styles.notificationsList}>
              {Notifications.map((item, index) => 
                item.type === 'order' ? (
                  <Link 
                    key={index} 
                    to={`/admin/Dashboard/${role}/ViewOrderDetails/${item.id}`}
                    style={{ textDecoration: 'none', color: 'inherit' }}
                  >
                    <div className={`${styles.notificationItem} ${styles.order}`}>
                      <div className={styles.notificationIcon}>🛒</div>
                      <div className={styles.notificationContent}>
                        <h3 className={styles.notificationTitle}>طلب جديد: {item.items.map((prod) => prod.name)}</h3>
                        <p className={styles.notificationTime}>{item.date}</p>
                      </div>
                      <span className={styles.notificationBadge}>Order</span>
                    </div>
                  </Link>
                ) : (
                  <div key={index} className={`${styles.notificationItem} ${styles.review}`}>
                    <div className={styles.notificationIcon}>⭐</div>
                    <div className={styles.notificationContent}>
                      <h3 className={styles.notificationTitle}>مراجعة جديدة: {item.text} </h3>
                      <p className={styles.notificationTime}> {item.date} </p>
                    </div>
                    <span className={styles.notificationBadge}>Review</span>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifiication;