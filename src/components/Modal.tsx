import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useRecoilValue } from 'recoil';
import { coinIDState } from '../app-atoms';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
import { ChartData } from 'chart.js';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Container } from '@mui/system';
import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1.6),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  borderRadius: 0,
}));

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

type Person = {
  id: string;
  priceUsd: number;
  symbol: string;
  marketCapUsd: number;
  rank: number;
  name: number;
  vwap24Hr: number;
  supply: number;
  volumeUsd24Hr: number;
  changePercent24Hr: number;
  maxSupply: number;
  explorer: string;
};

type Props = {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
};

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  height: '90%',
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export const options = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: '1 YEAR',
    },
    legend: {
      display: false,
    },
  },
};

export const options2 = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: '1 DAY (24H)',
    },
    legend: {
      display: false,
    },
  },
};

export const options4 = {
  responsive: true,
  plugins: {
    title: {
      display: true,
      text: '1 MONTH',
    },
    legend: {
      display: false,
    },
  },
};

const priceFormatUSD = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

const percentFormat = new Intl.NumberFormat('en-US', {
  style: 'percent',
  notation: 'compact',
  maximumFractionDigits: 2,
});

const priceFormatUSDCompact = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  notation: 'compact',
  maximumFractionDigits: 3,
});

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicModal(props: Props) {
  const [open] = React.useState(true);
  const handleClose = () => props.setShowModal(false);
  const useCoinID = useRecoilValue(coinIDState);
  const [post, setPost] = React.useState([]);
  const [post2, setPost2] = React.useState([]);
  const [post3, setPost3] = React.useState<Person | string | any>('');
  const [post4, setPost4] = React.useState([]);

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const baseURL =
    'https://api.coincap.io/v2/assets/' + useCoinID + '/history?interval=d1';

  const baseURL2 =
    'https://api.coincap.io/v2/assets/' + useCoinID + '/history?interval=m1';

  const baseURL3 = 'https://api.coincap.io/v2/assets/' + useCoinID;

  const baseURL4 =
    'https://api.coincap.io/v2/assets/' + useCoinID + '/history?interval=h1';

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      return setPost(response.data.data);
    });
  }, [baseURL]);

  React.useEffect(() => {
    axios.get(baseURL2).then((response2) => {
      return setPost2(response2.data.data);
    });
  }, [baseURL2]);

  React.useEffect(() => {
    axios.get(baseURL3).then((response3) => {
      return setPost3(response3.data.data);
    });
  }, [baseURL3]);

  React.useEffect(() => {
    axios.get(baseURL4).then((response4) => {
      return setPost4(response4.data.data);
    });
  }, [baseURL4]);

  const data: ChartData<'line', { date: Date; priceUsd: number }[]> = {
    labels: post.map(({ date }) => moment.utc(date).format('YY/MM/DD')),
    datasets: [
      {
        label: '',
        data: post.map(({ priceUsd }) => priceUsd),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderWidth: 1,
        type: 'line',
        pointRadius: 3,
      },
    ],
  };

  const data2: ChartData<'line', { date: Date; priceUsd: number }[]> = {
    labels: post2.map(({ date }) => moment.utc(date).format('YY/MM/DD HH:MM')),
    datasets: [
      {
        label: '',
        data: post2.map(({ priceUsd }) => priceUsd),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderWidth: 1,
        type: 'line',
        pointRadius: 3,
      },
    ],
  };

  const data4: ChartData<'line', { date: Date; priceUsd: number }[]> = {
    labels: post4.map(({ date }) => moment.utc(date).format('YY/MM/DD HH:MM')),
    datasets: [
      {
        label: '',
        data: post4.map(({ priceUsd }) => priceUsd),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderWidth: 1,
        type: 'line',
        pointRadius: 3,
      },
    ],
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Box
          sx={{
            width: '100%',
          }}
        >
          <Box
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
            }}
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab label="Details" {...a11yProps(0)} />
              <Tab label="1 Day (24H)" {...a11yProps(1)} />
              <Tab label="1 Month" {...a11yProps(2)} />
              <Tab label="1 Year" {...a11yProps(3)} />
              <Tab label="1 Day/Month/Year" {...a11yProps(4)} />
            </Tabs>
          </Box>
          <Box sx={{ width: '100%' }}>
            <Stack spacing={20}>
              <TabPanel value={value} index={0}>
                <Item>ID: {post3.id}</Item>
                <Item>NAME: {post3.name}</Item>
                <Item>PRICE: {priceFormatUSD.format(post3.priceUsd)}</Item>
                <Item>SYMBOL: {post3.symbol}</Item>
                <Item>
                  MARKET CAP: {priceFormatUSDCompact.format(post3.marketCapUsd)}
                </Item>
                <Item>RANK: {post3.rank}</Item>
                <Item>NAME: {post3.name}</Item>
                <Item>
                  VWAP (24HR): {priceFormatUSD.format(post3.vwap24Hr)}
                </Item>
                <Item>
                  SUPPLY: {priceFormatUSDCompact.format(post3.supply)}
                </Item>
                <Item>
                  VOLUME (24HR):{' '}
                  {priceFormatUSDCompact.format(post3.volumeUsd24Hr)}
                </Item>
                <Item>
                  CHANGE (24HR):
                  {percentFormat.format(post3.changePercent24Hr / 100)}
                </Item>
                <Item>
                  MAX. SUPPLY: {priceFormatUSD.format(post3.maxSupply)}
                </Item>
                <Button href={post3.explorer} target="_blank">
                  More information
                </Button>
                <Button
                  href={'https://wikipedia.org/wiki/' + post3.name}
                  target="_blank"
                >
                  Wikipedia
                </Button>
              </TabPanel>
            </Stack>
          </Box>
          <TabPanel value={value} index={1}>
            <Container>
              <Line options={options2} data={data2} />
            </Container>
          </TabPanel>
          <TabPanel value={value} index={2}>
            <Container>
              <Line options={options4} data={data4} />
            </Container>
          </TabPanel>
          <TabPanel value={value} index={3}>
            <Container>
              <Line options={options} data={data} />
            </Container>
          </TabPanel>
          <TabPanel value={value} index={4}>
            <div
              style={{ position: 'relative', height: '40vh', width: '80vw' }}
            >
              <Container>
                <Line options={options2} data={data2} width={15} height={2} />
                <Line options={options4} data={data4} width={10} height={2} />
                <Line options={options} data={data} width={10} height={2} />
              </Container>
            </div>
          </TabPanel>
        </Box>
      </Box>
    </Modal>
  );
}
