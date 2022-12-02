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
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import DataGridPremiumDemo from './CoinList';
import { useRecoilState, useRecoilValue } from 'recoil';
import { coinIDState } from '../app-atoms';

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

const Chart = () => {
  const [posts, setPosts] = React.useState([]);
  const [post, setPost] = React.useState([]);
  const useCoinID = useRecoilValue(coinIDState);
  const [coinID, setCoinID] = useRecoilState(coinIDState);

  const baseURL2 = 'https://api.coincap.io/v2/assets/';

  const baseURL =
    'https://api.coincap.io/v2/assets/' + useCoinID + '/history?interval=d1';

  const handleChange = (event: SelectChangeEvent) => {
    setCoinID(event.target.value as string);
  };

  React.useEffect(() => {
    axios.get(baseURL2).then((response) => {
      setPost(response.data.data);
    });
  }, []);

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      return setPosts(response.data.data);
    });
  }, [baseURL]);
  if (!post) return null;

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

  return (
    <div>
      <DataGridPremiumDemo />
      <Box sx={{ minWidth: 120, margin: 10 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Coin</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={coinID}
            label="Coin"
            onChange={handleChange}
          >
            {post.map(({ id, name }) => (
              <MenuItem key={id} value={id}>
                {name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <Box sx={{ minWidth: 550, margin: 1 }}>
          <Line options={options} data={data} />
        </Box>
      </Box>
    </div>
  );
};

export default Chart;
