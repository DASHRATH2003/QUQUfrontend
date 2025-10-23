import React, { useState, useEffect } from 'react';
import { Line, Bar, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import adminApi from '../../utils/adminAxios';
import { toast } from 'react-hot-toast';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [timeRange, setTimeRange] = useState('week'); // week, month, year
  const [salesData, setSalesData] = useState({
    labels: [],
    datasets: []
  });
  const [orderStats, setOrderStats] = useState({
    labels: [],
    datasets: []
  });
  const [categoryData, setCategoryData] = useState({
    labels: [],
    datasets: []
  });
  const [summaryStats, setSummaryStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    averageOrderValue: 0,
    topSellingProduct: '',
  });

  useEffect(() => {
    fetchAnalytics();
  }, [timeRange]);

  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const response = await adminApi.get(`/api/admin/analytics?timeRange=${timeRange}`);
      const data = response.data;

      // Update sales data
      setSalesData({
        labels: data.salesData.labels,
        datasets: [{
          label: 'Sales',
          data: data.salesData.values,
          fill: false,
          borderColor: 'rgb(147, 51, 234)',
          tension: 0.1
        }]
      });

      // Update order statistics
      setOrderStats({
        labels: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
        datasets: [{
          label: 'Orders by Status',
          data: data.orderStats,
          backgroundColor: [
            'rgba(255, 206, 86, 0.5)',
            'rgba(54, 162, 235, 0.5)',
            'rgba(75, 192, 192, 0.5)',
            'rgba(153, 102, 255, 0.5)',
            'rgba(255, 99, 132, 0.5)',
          ],
          borderColor: [
            'rgba(255, 206, 86, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 99, 132, 1)',
          ],
          borderWidth: 1
        }]
      });

      // Update category data
      setCategoryData({
        labels: data.categoryData.labels,
        datasets: [{
          label: 'Sales by Category',
          data: data.categoryData.values,
          backgroundColor: [
            'rgba(147, 51, 234, 0.5)',
            'rgba(236, 72, 153, 0.5)',
            'rgba(59, 130, 246, 0.5)',
          ],
          borderColor: [
            'rgba(147, 51, 234, 1)',
            'rgba(236, 72, 153, 1)',
            'rgba(59, 130, 246, 1)',
          ],
          borderWidth: 1
        }]
      });

      // Update summary statistics
      setSummaryStats(data.summaryStats);
    } catch (error) {
      console.error('Error fetching analytics:', error);
      toast.error('Failed to load analytics data');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Time Range Selector */}
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
        >
          <option value="week">Last 7 Days</option>
          <option value="month">Last 30 Days</option>
          <option value="year">Last 12 Months</option>
        </select>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Sales</h3>
          <p className="text-2xl font-bold text-gray-900">£{summaryStats.totalSales.toFixed(2)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Total Orders</h3>
          <p className="text-2xl font-bold text-gray-900">{summaryStats.totalOrders}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Average Order Value</h3>
          <p className="text-2xl font-bold text-gray-900">£{summaryStats.averageOrderValue.toFixed(2)}</p>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-sm font-medium text-gray-500">Top Selling Product</h3>
          <p className="text-2xl font-bold text-gray-900">{summaryStats.topSellingProduct}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sales Trend */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Sales Trend</h2>
          <Line data={salesData} options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: false
              }
            }
          }} />
        </div>

        {/* Order Status */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Orders by Status</h2>
          <Bar data={orderStats} options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: false
              }
            }
          }} />
        </div>

        {/* Category Distribution */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Sales by Category</h2>
          <Doughnut data={categoryData} options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              title: {
                display: false
              }
            }
          }} />
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <div className="space-y-4">
            {/* Add recent activity items here */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-900">New Order #1234</p>
                <p className="text-sm text-gray-500">2 minutes ago</p>
              </div>
              <span className="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800">
                £99.99
              </span>
            </div>
            {/* Add more activity items */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;