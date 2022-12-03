import React from 'react';
import Avatar from '@mui/material/Avatar';
import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';

type Props = {};

const About = (props: Props) => {
  return (
    <div>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Avatar
          alt="Adam I. Horvath"
          src="https://sdk.bitmoji.com/render/panel/20048676-100548185991_1-s5-v1.png?transparent=1&palette=1&scale=1"
          sx={{ width: 128, height: 128 }}
        />
        &nbsp;&nbsp;
        <Typography>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean
          commodo nibh et nibh iaculis, eget porttitor eros venenatis. Integer
          egestas dapibus turpis, sit amet consectetur risus tempor sit amet.
          Praesent eu nisl at urna consequat tincidunt sit amet et ligula. In
          vel vestibulum ex. Aliquam sed ex ac sapien iaculis suscipit. Nam
          rhoncus tempus augue lacinia aliquet.
        </Typography>
        &nbsp;&nbsp;
        <Typography>
          Duis eleifend fermentum orci, ac mollis turpis fringilla quis. Ut
          vitae dui id dui auctor eleifend ac at felis. Maecenas nisi purus,
          fringilla non semper et, elementum nec justo. Praesent pharetra rutrum
          pulvinar. Phasellus id erat ac ante facilisis sollicitudin vel at dui.
          Pellentesque lobortis quam ut lectus pharetra dictum. Curabitur
          aliquet, ligula eu placerat laoreet, dolor nisi tempor nulla, sit amet
          sagittis odio nisl nec tellus. Phasellus eu commodo nunc.
        </Typography>
        &nbsp;&nbsp;
        <Button href="https://coincap.io/" target={'_blank'}>
          coincap api
        </Button>
      </Box>
    </div>
  );
};

export default About;
