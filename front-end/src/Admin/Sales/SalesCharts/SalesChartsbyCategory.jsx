import { useMemo } from 'react'; // Add this import
import ReactApexChart from 'react-apexcharts';
import styles from '../SalesCharts/SalesChartsbyCategory.module.css';
import { useTranslation } from 'react-i18next';

const ApexDonutChartbyCatigory = () => {
  const { t } = useTranslation();

  // Data definitions
  const Types = [
    { Type: 'Poulet', value: 2450 },
    { Type: 'Nuggets', value: 1830 },
    { Type: 'Viande hachée', value: 920 },
    { Type: 'Thon', value: 920 },
    { Type: 'Jambon', value: 920 },
    { Type: 'Mixte', value: 920 },
    { Type: 'fruit de mer', value: 560 }
  ];

  const typeColors = {
    Poulet: '#4f46e5',
    Nuggets: '#eab308',
    "Viande hachée": '#0d9488',
    Thon: '#6a1627',
    Jambon: '#d81891',
    Mixte: '#0dac35',
    "fruit de mer": '#2d83ff'
  };

  // Prepare data for ApexCharts
  const series = Types.map((item) => item.value);

  // ✅ Use useMemo for dynamic options
  const options = useMemo(() => ({
    chart: {
      type: 'donut',
      foreColor: '#5d5d5d'
    },
    labels: Types.map((item) => t(`types.${item.Type}`, { defaultValue: item.Type })),
    colors: Types.map((item) => typeColors[item.Type]),
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 300,
          },
          legend: {
            position: 'bottom',
          },
        },
      },
    ],
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
      fontSize: '14px',
      fontWeight: 600,
      markers: {
        width: 12,
        height: 12,
        radius: 6,
      },
      itemMargin: {
        vertical: 8,
      },
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              show: true,
              label: t('filters.Total Sales'),
              color: 'var(--text-color)',
              fontSize: '16px',
              fontWeight: 600,
              formatter: (w) => {
                const total = w.globals.seriesTotals.reduce((a, b) => a + b, 0);
                return total.toLocaleString();
              },
            },
            value: {
              show: true,
              color: 'var(--text-color)',
              fontSize: '14px',
              fontWeight: 500,
              formatter: (value) => {
                return value.toLocaleString();
              },
            },
          },
        },
      },
    },
  }), [t]); // Recompute when language changes

  return (
    <div className={styles.chartContainer}>
      <div className={styles.titleAndFilter}>
        <h2 className={styles.chartTitle}>{t('filters.Sales by Types')}</h2>
        <div className={styles.filterButtons}>
          <button className={styles.filterButton}>{t('filters.Day')}</button>
          <button className={styles.filterButton}>{t('filters.Week')}</button>
          <button className={styles.filterButton}>{t('filters.Month')}</button>
        </div>
      </div>
      <div id="chart">
        <ReactApexChart
          options={options}
          series={series}
          type="donut"
          height={350}
          key={t('languageKey')} // Optional: Force re-render
        />
      </div>
    </div>
  );
};

export default ApexDonutChartbyCatigory;