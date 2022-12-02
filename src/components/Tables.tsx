import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import { Link } from '@mui/material';
import Container from '@mui/material/Container';
import InfoIcon from '@mui/icons-material/Info';

const baseURL = 'https://api.coincap.io/v2/assets/';

export default function Tables() {
  const [post, setPost] = React.useState([]);

  const priceFormatUSD = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const priceFormatUSDCompact = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    notation: 'compact',
    maximumFractionDigits: 3,
  });

  const percentFormat = new Intl.NumberFormat('en-US', {
    style: 'percent',
    notation: 'compact',
    maximumFractionDigits: 2,
  });

  React.useEffect(() => {
    axios.get(baseURL).then((response) => {
      setPost(response.data.data);
    });
  }, []);

  if (!post) return null;

  return (
    <Container fixed>
      <div></div>
      <Table aria-label="simple table" size="small">
        <caption>A basic table example with a caption</caption>
        <TableHead>
          <TableRow>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Rank</TableCell>
            <TableCell align="left">Price (USD)</TableCell>
            <TableCell align="left">Market Cap</TableCell>
            <TableCell align="left">SYMBOL</TableCell>
            <TableCell align="left">VWAP (24Hr) </TableCell>
            <TableCell align="left">Supply</TableCell>
            <TableCell align="left">Volume (24Hr)</TableCell>
            <TableCell align="left">Change (24Hr)</TableCell>
            <TableCell align="left">Info</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {post.map(
            ({
              id,
              symbol,
              priceUsd,
              marketCapUsd,
              rank,
              name,
              vwap24Hr,
              supply,
              volumeUsd24Hr,
              changePercent24Hr,
              maxSupply,
              explorer,
            }) => (
              <TableRow
                key={id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell align="left">
                  <Link href={explorer} underline="none">
                    {name}
                  </Link>
                </TableCell>
                <TableCell align="left">{rank}</TableCell>
                <TableCell align="left">
                  {priceFormatUSD.format(priceUsd)}
                </TableCell>
                <TableCell align="left">
                  {priceFormatUSDCompact.format(marketCapUsd)}
                </TableCell>
                <TableCell align="left">{symbol}</TableCell>
                <TableCell align="left">
                  {priceFormatUSD.format(vwap24Hr)}
                </TableCell>
                <TableCell align="left">
                  {priceFormatUSDCompact.format(supply)}
                </TableCell>
                <TableCell align="left">
                  {priceFormatUSDCompact.format(volumeUsd24Hr)}
                </TableCell>
                <div style={{ textAlign: 'center' }}>
                  {percentFormat.format(changePercent24Hr / 100)}
                </div>
                <TableCell align="left">
                  <InfoIcon />
                </TableCell>
              </TableRow>
            )
          )}
        </TableBody>
      </Table>
    </Container>
  );
}
