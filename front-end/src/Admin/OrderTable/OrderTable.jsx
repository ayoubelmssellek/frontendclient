import { useTranslation } from 'react-i18next';
import styles from './OrderTable.module.css';
import { useQuery } from '@tanstack/react-query';
import { fetchAllOrders } from '../../Api/fetchingData/FetchGetAllOrders';


const OrderTable = () => {
  const { data: listorders, isLoading, error } = useQuery({
    queryKey: ['orders'],
    queryFn: fetchAllOrders,
  });
  const { t } = useTranslation();

  const getStatusStyle = (status) => {
    switch (status) {
      case 'in-preparation':
        return styles.statusInPrep;
      case 'ready':
        return styles.statusReady;
      case 'delivered':
        return styles.statusDelivered;
      default:
        return '';
    }
  };
  if (isLoading) return <div className={styles.loading}>Loading...</div>;
  if (error) return <div className={styles.error}>Error: {error.message}</div>;

  return (
    <div className={styles.recentOrders}>
      <div className={styles.tableHeader}>
        <h3>{t("tables.recentOrders")}</h3>
      </div>
      <div className={styles.tableContainer}>
        <table className={styles.ordersTable}>
          <thead>
            <tr>
              <th>{t('tables.order_id')}</th>
              <th>{t('tables.customer')}</th>
              <th>{t('tables.phone')}</th>
              <th>{t('tables.date')}</th>
              <th>{t('tables.items')}</th>
              <th>{t('tables.status')}</th>
            </tr>
          </thead>
          <tbody>
            {listorders.slice(0, 5).map((order) => (
              <tr key={order.id}>
                <td>{order.order_number}</td>
                <td>{order.name}</td>
                <td>{order.phonenumber}</td>
                <td>{order.order_date}</td>
                <td>
                  {order.items.length} {t('tables.items')}
                </td>
                <td>
                  <span className={`${styles.status} ${getStatusStyle(order.statusOrder)}`}>
                    {t(`status.${order.status}`)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderTable;