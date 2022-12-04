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

const baseURL2 = 'https://api.coincap.io/v2/assets/';

export default function CoinList() {
  const [posts, setPosts] = React.useState([]);
  const [pageSize, setPageSize] = React.useState<number>(3);
  const [, setCoinID] = useRecoilState(coinIDState);

  React.useEffect(() => {
    axios.get(baseURL2).then((response) => {
      setPosts(response.data.data);
    });
  }, []);

  const rows: GridRowsProp = posts;

  const columns: GridColDef[] = [
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'rank', headerName: 'Rank', width: 100 },
    { field: 'symbol', headerName: 'Symbol', width: 150 },
    {
      field: 'priceUsd',
      headerName: 'Price (USD)',
      flex: 1,
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
      field: 'changePercent24Hr',
      headerName: 'Change (24Hr)',
      flex: 1,
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
    setCoinID(params.row.id);
  };

  return (
    <div style={{ height: 250, width: '100%' }}>
      <Box
        sx={{
          height: 300,
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
        <Box style={{ height: 300, width: '100%' }}>
          <DataGrid
            rows={rows}
            columns={columns}
            components={{ Toolbar: GridToolbar }}
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
            rowsPerPageOptions={[3, 10, 20]}
            pagination
            onRowClick={handleRowClick}
          />
        </Box>
      </Box>
    </div>
  );
}
