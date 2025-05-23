import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './SalesTable.module.css';
import {
  TrendingUp,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Package,
  Search
} from 'lucide-react';

const mockSales = [
  {
    id: "SAL-2024-001",
    date: "2024-03-10T10:30:00",
    items: [
      { name: "Margherita Pizza", category: "Pizza", type: "Vegetarian", quantity: 2, price: 15.99 },
      { name: "Pasta Carbonara", category: "Pasta", type: "Non-Vegetarian", quantity: 1, price: 12.99 }
    ],
    status: "completed",
    total: 44.97
  },
  // Add more mock data entries...
];

const SalesTable = () => {
  const { t } = useTranslation();
  const [timeFilter, setTimeFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSales = useMemo(() => {
    const filterSales = (sales, filter) => {
      const now = new Date();
      const filterDate = new Date();
      
      switch(filter) {
        case 'day': filterDate.setDate(now.getDate() - 1); break;
        case 'week': filterDate.setDate(now.getDate() - 7); break;
        case 'month': filterDate.setMonth(now.getMonth() - 1); break;
        default: return sales;
      }
      return sales.filter(sale => new Date(sale.date) >= filterDate);
    };

    let filtered = filterSales(mockSales, timeFilter);
    if(searchTerm) {
      filtered = filtered.filter(sale =>
        sale.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sale.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }
    return filtered;
  }, [timeFilter, searchTerm]);

  const analytics = useMemo(() => {
    const completedSales = mockSales.filter(s => s.status === 'completed');
    return {
      totalRevenue: completedSales.reduce((sum, sale) => sum + sale.total, 0),
      dailySales: 285.50,
      weeklySales: 1895.30,
      monthlySales: 8450.75
    };
  }, []);

  const previousPeriodComparison = useMemo(() => ({
    revenue: 12.5
  }), []);

  return (
    <div className={styles.salesDashboard}>
      <div className={styles.analyticsGrid}>
        {/* Total Revenue Card */}
        <div className={styles.analyticsCard}>
          <div className={styles.cardHeader}>
            <div>
              <p className={styles.cardLabel}>{t('filters.total_revenue')}</p>
              <p className={styles.cardValue}>${analytics.totalRevenue.toFixed(2)}</p>
            </div>
            <div className={`${styles.trend} ${
              previousPeriodComparison.revenue >= 0 ? styles.positive : styles.negative
            }`}>
              {previousPeriodComparison.revenue >= 0 ? (
                <ArrowUpRight color='var(--success-color)' />
              ) : (
                <ArrowDownRight color='var(--danger-color)' />
              )}
              {Math.abs(previousPeriodComparison.revenue)}%
            </div>
          </div>
        </div>

        {/* Daily Sales Card */}
        <div className={styles.analyticsCard}>
          <div className={styles.cardHeader}>
            <div>
              <p className={styles.cardLabel}>{t('filters.daily_sales')}</p>
              <p className={styles.cardValue}>${analytics.dailySales.toFixed(2)}</p>
            </div>
            <Calendar color='var(--primary)'/>
          </div>
        </div>

        {/* Weekly Sales Card */}
        <div className={styles.analyticsCard}>
          <div className={styles.cardHeader}>
            <div>
              <p className={styles.cardLabel}>{t('filters.weekly_sales')}</p>
              <p className={styles.cardValue}>${analytics.weeklySales.toFixed(2)}</p>
            </div>
            <TrendingUp color='var(--success-color)'/>
          </div>
        </div>

        {/* Monthly Sales Card */}
        <div className={styles.analyticsCard}>
          <div className={styles.cardHeader}>
            <div>
              <p className={styles.cardLabel}>{t('filters.monthly_sales')}</p>
              <p className={styles.cardValue}>${analytics.monthlySales.toFixed(2)}</p>
            </div>
            <Package color='var(--icon-color)'/>
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className={styles.filters}>
        <div className={styles.searchContainer}>
          <Search className={styles.searchIcon} />
          <input
            type="text"
            placeholder={t('filters.search_placeholder')}
            className={styles.searchInput}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className={styles.dateFilter}>
          <Calendar className={styles.calendarIcon} />
          <select
            className={styles.dateSelect}
            value={timeFilter}
            onChange={(e) => setTimeFilter(e.target.value)}
          >
            <option value="all">{t('filters.time.all')}</option>
            <option value="day">{t('filters.time.day')}</option>
            <option value="week">{t('filters.time.week')}</option>
            <option value="month">{t('filters.time.month')}</option>
          </select>
        </div>
      </div>

      {/* Sales Table */}
      <div className={styles.salesTable}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>{t('tables.sale_id')}</th>
              <th>{t('tables.date')}</th>
              <th>{t('tables.product_name')}</th>
              <th>{t('tables.category')}</th>
              <th>{t('tables.type')}</th>
              <th>{t('tables.status')}</th>
              <th>{t('tables.total')}</th>
            </tr>
          </thead>
          <tbody>
            {filteredSales.map((sale) =>
              sale.items.map((item, index) => (
                <tr key={`${sale.id}-${index}`} className={styles.tableRow}>
                  <td className={styles.tableData}>{sale.id}</td>
                  <td className={styles.tableData}>
                    {new Date(sale.date).toLocaleDateString()}
                  </td>
                  <td className={styles.tableData}>{item.name}</td>
                  <td className={styles.tableData}>{item.category}</td>
                  <td className={styles.tableData}>{item.type}</td>
                  <td className={styles.tableData}>
                    <span className={`${styles.statusBadge} ${
                      sale.status === 'completed' ? styles.completed : styles.refunded
                    }`}>
                      {t(`status.${sale.status}`)}
                    </span>
                  </td>
                  <td className={styles.tableData}>
                    ${(item.quantity * item.price).toFixed(2)}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {filteredSales.length === 0 && (
        <div className={styles.noResults}>
          <p>{t('empty_state.no_sales')}</p>
        </div>
      )}
    </div>
  );
};

export default SalesTable;