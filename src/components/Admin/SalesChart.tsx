// src/components/admin/SalesChart.tsx
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// This is a crucial step to register the components Chart.js needs
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

// This component expects the fetched data as props
const SalesChart = ({ chartData }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Sales Performance - Last 7 Days',
        font: {
            size: 18,
        }
      },
    },
    scales: {
        y: {
            beginAtZero: true,
            ticks: {
                // Format ticks to show '₹' symbol
                callback: function(value, index, ticks) {
                    return '₹' + value;
                }
            }
        }
    }
  };

  const data = {
    labels: chartData.labels,
    datasets: [
      {
        label: 'Sales (₹)',
        data: chartData.salesData,
        borderColor: 'rgb(53, 235, 62)',
        backgroundColor: 'rgba(233, 116, 20, 0.801)',
      },
    ],
  };

  return <Line options={options} data={data} />;
};

export default SalesChart;