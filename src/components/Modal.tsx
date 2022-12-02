import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useRecoilValue } from 'recoil';
import { coinIDState } from '../app-atoms';

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

export default function BasicModal(props: Props) {
  const [open] = React.useState(true);
  const handleClose = () => props.setShowModal(false);
  const useCoinID = useRecoilValue(coinIDState);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {useCoinID}
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            IDE JON A GRAPH.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
