import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useRecoilValue } from 'recoil';
import { coinIDState } from '../../app-atoms';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
import { ChartData } from 'chart.js';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Container } from '@mui/system';
import { Button } from '@mui/material';
import Stack from '@mui/material/Stack';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {
  percentFormat,
  priceFormatUSD,
  priceFormatUSDCompact,
} from '../Format/Format';
import { Item, style } from './Style';
import { options } from './LineChartDetails';
import { TabPanelProps, CoinDetailProps, ModalProps } from './Types';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

// m1: 2022-12-02 / 2022-12-03  DAY
// h1: 2022-11-03 / 2022-12-03  MONTH
// d1: 2021-12-04 / 2022-12-02  YEAR

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

export default function BasicModal(props: ModalProps) {
  const [open] = React.useState(true);
  const [coinDetail, setCoinDetail] = React.useState([]);
  const [detail, setDetail] = React.useState<CoinDetailProps | string | any>(
    ''
  );
  const [value, setValue] = React.useState(0);
  const [inputValue, setInputValue] = React.useState('m1');

  const useCoinID = useRecoilValue(coinIDState);

  const handleInputChange = (event: SelectChangeEvent) => {
    setInputValue(event.target.value as string);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleClose = () => props.setShowModal(false);

  const COIN_HISTORY_URL = `https://api.coincap.io/v2/assets/${useCoinID}/history?interval=${inputValue}`;
  const COIN_URL = `https://api.coincap.io/v2/assets/${useCoinID}`;

  React.useEffect(() => {
    axios.get(COIN_HISTORY_URL).then((response) => {
      return setCoinDetail(response.data.data);
    });
  }, [COIN_HISTORY_URL]);

  React.useEffect(() => {
    axios.get(COIN_URL).then((response3) => {
      return setDetail(response3.data.data);
    });
  }, [COIN_URL]);

  const data: ChartData<'line', { date: Date; priceUsd: number }[]> = {
    labels: coinDetail.map(({ date }) =>
      moment.utc(date).format('YY/MM/DD HH:MM')
    ),
    datasets: [
      {
        label: '',
        data: coinDetail.map(({ priceUsd }) => priceUsd),
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
            borderBottom: 1,
            borderColor: 'divider',
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
              <Tab label="Line charts" {...a11yProps(1)} />
            </Tabs>
          </Box>
          <Box sx={{ width: '100%' }}>
            <Stack spacing={20}>
              <TabPanel value={value} index={0}>
                <Item>ID: {detail.id}</Item>
                <Item>NAME: {detail.name}</Item>
                <Item>PRICE: {priceFormatUSD.format(detail.priceUsd)}</Item>
                <Item>SYMBOL: {detail.symbol}</Item>
                <Item>
                  MARKET CAP:{' '}
                  {priceFormatUSDCompact.format(detail.marketCapUsd)}
                </Item>
                <Item>RANK: {detail.rank}</Item>
                <Item>NAME: {detail.name}</Item>
                <Item>
                  VWAP (24HR): {priceFormatUSD.format(detail.vwap24Hr)}
                </Item>
                <Item>
                  SUPPLY: {priceFormatUSDCompact.format(detail.supply)}
                </Item>
                <Item>
                  VOLUME (24HR):{' '}
                  {priceFormatUSDCompact.format(detail.volumeUsd24Hr)}
                </Item>
                <Item>
                  CHANGE (24HR):{' '}
                  {percentFormat.format(detail.changePercent24Hr / 100)}
                </Item>
                <Item>
                  MAX. SUPPLY: {priceFormatUSD.format(detail.maxSupply)}
                </Item>
                <Button href={detail.explorer} target="_blank">
                  More information
                  <MoreHorizIcon />
                </Button>
                <Button
                  href={'https://wikipedia.org/wiki/' + detail.name}
                  target="_blank"
                >
                  Wikipedia
                  <OpenInNewIcon />
                </Button>
              </TabPanel>
            </Stack>
          </Box>
          <TabPanel value={value} index={1}>
            <Container>
              <Box sx={{ minWidth: 120 }}>
                <FormControl fullWidth>
                  <InputLabel id="date-select-label">
                    {useCoinID.toUpperCase()}
                  </InputLabel>
                  <Select
                    labelId="date-select-label"
                    id="date-select"
                    value={inputValue}
                    label={useCoinID.toUpperCase()}
                    onChange={handleInputChange}
                  >
                    <MenuItem value={'m1'}>1 Day</MenuItem>
                    <MenuItem value={'h1'}>1 Month</MenuItem>
                    <MenuItem value={'d1'}>1 Year</MenuItem>
                  </Select>
                </FormControl>
              </Box>
              <Line options={options} data={data} />
            </Container>
          </TabPanel>
        </Box>
      </Box>
    </Modal>
  );
}
