import { useMemo } from 'react';
import ReactApexChart from 'react-apexcharts';
import styles from '../SalesCharts/SalesChartsbyType.module.css';
import { useTranslation } from 'react-i18next';

const ApexDonutChartbytype = () => {
  const { t } = useTranslation();

  // Data definitions
  const Categories = [
    { category: 'Tacos', value: 5450 },
    { category: 'Chawarma', value: 1830 },
    { category: 'Paninis', value: 920 },
    { category: 'Jus', value: 920 },
    { category: 'Penzarotti', value: 920 },
    { category: 'Chikas', value: 920 },
    { category: 'Pasticcio', value: 920 },
    { category: 'Salades', value: 920 },
    { category: 'Pates', value: 560 }
  ];

  const categoryColors = {
    Tacos: '#4f46e5',    
    Chawarma: '#eab308',     
    Paninis: '#7ff69c',      
    Jus: '#d81891',
    Penzarotti: '#6a1627',   
    Chikas: '#0d9488',
    Pasticcio: '#e84b55',
    Salades: '#0dac35',
    Pates: '#2d83ff'
  };

  // Prepare data for ApexCharts
  const series = Categories.map((item) => item.value);
  const labels = Categories.map((item) => t(`categories.${item.category}`, { defaultValue: item.category }));
  const colors = Categories.map((item) => categoryColors[item.category]);

  // Chart options
  const options = useMemo(() => ({
    chart: {
      type: 'donut',
      foreColor: '#5d5d5d'
    },
    labels: labels,
    colors: colors,
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
  }), [t, labels]);

  return (
    <div className={styles.chartContainer}>
      <div className={styles.titleAndFilter}>
      <h2 className={styles.chartTitle}>{t('filters.Sales by Category')}</h2>
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
          key={t('languageKey')}
        />
      </div>
    </div>
  );
};

export default ApexDonutChartbytype;