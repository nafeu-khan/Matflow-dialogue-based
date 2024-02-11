import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Fileupload from '../fileupload/Fileupload';
const FileModal = () => {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const style = {
        position: 'fixed', // Changed to 'fixed'
        top: '50%', // Centered vertically
        left: '50%', // Centered horizontally
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };
  return (
    <div>
      <Button onClick={handleOpen}> Files</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
         <Fileupload modalopen={setOpen} />
        </Box>
      </Modal>
    </div>
  );
}


export default FileModal