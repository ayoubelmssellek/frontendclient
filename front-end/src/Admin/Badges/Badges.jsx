import styles from './Badges.module.css';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaRegStar, FaBoxOpen, FaUsers, FaChartLine, FaHamburger } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { useQuery } from '@tanstack/react-query';
import { fetchingUser } from '../../Api/fetchingData/FetchUserData';
const Badge = () => {
      const token = localStorage.getItem('authToken');

      const { data: parsedUser } = useQuery({
        queryKey: ["user"],
        queryFn:fetchingUser,
        enabled: !!token,  // هادي كتخلي useQuery يخدم غير إذا كان التوكن موجود (true)
        staleTime: 1000 * 60 * 5,
    });

    
    

    const { t } = useTranslation();
    const { role } = useParams();
    const products = useSelector((state) => state.admin.produits);

    return (
        <div className={styles.BadgeContainer}>
            <Link to={`/admin/Dashboard/${role}/Products`}>
                <div className={styles.badgeCard}>
                    <div className={styles.badgeHeader}>
                        <div className={styles.iconWrapper}>
                            <div className={`${styles.badgeIcon} ${styles.products}`}>
                                <FaHamburger color='#fff' size={20} />
                            </div>
                            <span className={styles.notificationBadge}>4</span>
                        </div>
                        <div className={styles.titleAndNumber}>
                            <h3 className={styles.cardTitle}>     
                            {t('badges.products')}
                            </h3>
                            <p className={styles.cardValue}>{products.length}</p>
                        </div>
                    </div>
                    <p className={styles.growthText}>
                     {t('badges.lastUpdate')} 2025/02/22
                    </p>
                </div>
            </Link>

            <Link to={`/admin/Dashboard/${role}/ListeOrders`}>
                <div className={styles.badgeCard}>
                    <div className={styles.badgeHeader}>
                        <div className={styles.iconWrapper}>
                            <div className={`${styles.badgeIcon} ${styles.orders}`}>
                                <FaBoxOpen color='#fff' size={20} />
                            </div>
                            <span className={styles.notificationBadge}>4</span>
                        </div>
                        <div className={styles.titleAndNumber}>
                            <h3 className={styles.cardTitle}>
                            {t('badges.orders')}
                            </h3>
                            <p className={styles.cardValue}>21</p>
                        </div>
                    </div>
                    <p className={styles.growthText}>
                    {t('badges.lastUpdate')} 2025/02/22
                    </p>
                </div>
            </Link>

            {/* Repeat similar structure for other badges */}
            {
                parsedUser?.role_id === 2 && parsedUser?.role_name === 'admin'  && (
                                <Link to={`/admin/Dashboard/${role}/Customers`}>
                                    <div className={styles.badgeCard}>
                                        <div className={styles.badgeHeader}>
                                            <div className={`${styles.badgeIcon} ${styles.customers}`}>
                                                <FaUsers color='#fff' size={20} />
                                            </div>
                                            <div className={styles.titleAndNumber}>
                                                <h3 className={styles.cardTitle}>
                                                {t('badges.customers')}
                                                </h3>
                                                <p className={styles.cardValue}>71</p>
                                            </div>
                                        </div>
                                        <p className={styles.growthText}>
                                        {t('badges.lastUpdate')} 2025/02/22
                                        </p>
                                    </div>
                                </Link>
                )
            }

         {
            parsedUser?.role_id === 2 && parsedUser?.role_name === 'admin'  && (
                <Link to={`/admin/Dashboard/${role}/Reviews`}>
                <div className={styles.badgeCard}>
                    <div className={styles.badgeHeader}>
                        <div className={`${styles.badgeIcon} ${styles.reviews}`}>
                            <FaRegStar color='#fff' size={20} />
                        </div>
                        <div className={styles.titleAndNumber}>
                            <h3 className={styles.cardTitle}>
                            {t('badges.reviews')}
                            </h3>
                            <p className={styles.cardValue}>21</p>
                        </div>
                    </div>
                    <p className={styles.growthText}>
                    {t('badges.lastUpdate')} 2025/02/22
                    </p>
                </div>
            </Link>
            )
         }

        {
            parsedUser?.role_id === 2 && parsedUser?.role_name === 'admin' && (
                            <Link to={`/admin/Dashboard/${role}/SalesCompenent`}>
                                <div className={styles.badgeCard}>
                                    <div className={styles.badgeHeader}>
                                        <div className={`${styles.badgeIcon} ${styles.sales}`}>
                                            <FaChartLine color='#fff' size={20} />
                                        </div>
                                        <div className={styles.titleAndNumber}>
                                            <h3 className={styles.cardTitle}>
                                            {t('badges.sales')}
                                            </h3>
                                            <p className={styles.cardValue}>13</p>
                                        </div>
                                    </div>
                                    <p className={styles.growthText}>
                                    {t('badges.lastUpdate')} 2025/02/22
                                    </p>
                                </div>
                            </Link>
            )
        }
        </div>
    );
};

export default Badge;