import * as React from 'react';
import {
  DataGrid,
  GridToolbar,
  GridRowsProp,
  GridColDef,
  GridValueFormatterParams,
  GridCellParams,
  GridEventListener,
} from '@mui/x-data-grid';
import axios from 'axios';
import clsx from 'clsx';
import { Box } from '@mui/material';
import { useRecoilState } from 'recoil';
import { coinIDState } from '../../app-atoms';
import BasicModal from '../Modal/Modal';

const baseURL2 = 'https://api.coincap.io/v2/assets/';

export default function CoinList() {
  const [posts, setPosts] = React.useState([]);
  const [pageSize, setPageSize] = React.useState<number>(10);
  const [, setCoinID] = useRecoilState(coinIDState);
  const [showModal, setShowModal] = React.useState<boolean>(false);

  React.useEffect(() => {
    axios.get(baseURL2).then((response) => {
      setPosts(response.data.data);
    });
  }, []);

  const rows: GridRowsProp = posts;

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'rank', headerName: 'Rank', width: 100 },
    { field: 'symbol', headerName: 'Symbol', width: 100 },
    {
      field: 'priceUsd',
      headerName: 'Price (USD)',
      width: 120,
      valueFormatter: (params: GridValueFormatterParams<number>) => {
        if (params.value == null) {
          return '';
        }

        const valueFormatted = Number(params.value).toLocaleString();
        return `${valueFormatted} $`;
      },
    },
    {
      field: 'marketCapUsd',
      headerName: 'Market Cap',
      width: 120,
      valueFormatter: (params: GridValueFormatterParams<number>) => {
        if (params.value == null) {
          return '';
        }

        const valueFormatted = Number(params.value).toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
          maximumFractionDigits: 2,
          notation: 'compact',
        });
        return `${valueFormatted}`;
      },
    },
    {
      field: 'vwap24Hr',
      headerName: 'VWAP (24Hr)',
      width: 150,
      valueFormatter: (params: GridValueFormatterParams<number>) => {
        if (params.value == null) {
          return '';
        }

        const valueFormatted = Number(params.value).toLocaleString();
        return `${valueFormatted} $`;
      },
    },
    {
      field: 'supply',
      headerName: 'Supply',
      width: 100,
      valueFormatter: (params: GridValueFormatterParams<number>) => {
        if (params.value == null) {
          return '';
        }

        const valueFormatted = Number(params.value).toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
          maximumFractionDigits: 1,
          notation: 'compact',
        });
        return `${valueFormatted}`;
      },
    },
    {
      field: 'volumeUsd24Hr',
      headerName: 'Volume (24Hr)',
      width: 150,
      valueFormatter: (params: GridValueFormatterParams<number>) => {
        if (params.value == null) {
          return '';
        }

        const valueFormatted = Number(params.value).toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
          maximumFractionDigits: 3,
          notation: 'compact',
        });
        return `${valueFormatted}`;
      },
    },
    {
      field: 'changePercent24Hr',
      headerName: 'Change (24Hr)',
      width: 150,
      valueFormatter: (params: GridValueFormatterParams<number>) => {
        if (params.value == null) {
          return '';
        }

        const valueFormatted = Number(params.value).toLocaleString();
        return `${valueFormatted} %`;
      },
      cellClassName: (params: GridCellParams<number>) => {
        if (params.value == null) {
          return '';
        }

        return clsx('super-app', {
          negative: params.value < 0,
          positive: params.value > 0,
        });
      },
    },
  ];

  const handleRowClick: GridEventListener<'rowClick'> = (params) => {
    console.log(params.row.id);
    setCoinID(params.row.id);
    setShowModal(true);
  };

  return (
    <div style={{ width: '100%' }}>
      <Box
        sx={{
          width: '100%',
          '& .super-app-theme--cell': {
            backgroundColor: 'rgba(224, 183, 60, 0.55)',
            color: '#1a3e72',
            fontWeight: '600',
          },
          '& .super-app.negative': {
            color: 'red',
            fontWeight: '600',
          },
          '& .super-app.positive': {
            color: 'green',
            fontWeight: '600',
          },
        }}
      >
        <div style={{ height: 650, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[10, 25, 50, 100]}
            pagination
            onRowClick={handleRowClick}
          />
        </div>
      </Box>
      {showModal ? <BasicModal setShowModal={setShowModal} /> : null}
    </div>
  );
}
