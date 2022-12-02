import React from 'react';
import axios from 'axios';
import { ChartData } from 'chart.js';
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
import moment from 'moment';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: '1Y Chart',
    },
    legend: {
      display: false,
    },
  },
};

const baseURL = 'https://api.coincap.io/v2/assets/bitcoin/history?interval=d1';

const Chart = () => {
  const [posts, setPosts] = React.useState([]);

  const labels = posts.map(({ date }) => moment.utc(date).format('YYYY/MM/DD'));

  const data: ChartData<'line', { date: Date; priceUsd: number }[]> = {
    labels,
    datasets: [
      {
        label: '',
        data: posts.map(({ priceUsd }) => priceUsd),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderWidth: 1,
        type: 'line',
        pointRadius: 0,
      },
    ],
  };
  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      return setPosts(response.data.data);
    });
  }, []);
  console.log(posts);
  return (
    <div>
      <Line options={options} data={data} />
    </div>
  );
};

export default Chart;
