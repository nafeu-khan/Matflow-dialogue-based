import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Fileupload from '../fileupload/Fileupload';
import AgGridComponent from "../AgGridComponent/AgGridComponent"

import {
    deleteIndexedDB,
    parseCsv,
    parseExcel,
    storeDataInIndexedDB,
    fetchDataFromIndexedDB
  } from "../../util/indexdb";
const DatasetDisplay = ({csvNames}) => {
    const [open, setOpen] = React.useState(false);
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

    const handleButtonClick=async(name)=>{
        rowData= await fetchDataFromIndexedDB(name);
        const columnDefs =
        csvData.length > 0
          ? Object.keys(csvData[0]).map((key) => ({
              headerName: key,
              field: key,
              valueGetter: (params) => {
                return params.data[key];
              },
            }))
          : [];
          setOpen(true);
    }
  return (
    <div>
        {console.log("in " ,csvNames,typeof (csvNames))}
         { 
        csvNames.map((button, index) => (
            <>
                <button key={index} onClick={handleButtonClick(button)}>
                  {button}
                </button>
                 <Modal
                 open={open}
                 onClose={()=>setOpen(false)}
                 aria-labelledby="modal-modal-title"
                 aria-describedby="modal-modal-description"
               >
                 <Box sx={style}>
                 <AgGridComponent rowData={rowData} columnDefs={columnDefs} />
                 </Box>
               </Modal>
               </>
              ))}
      {/* <Button onClick={handleOpen}> Files</Button> */}
     
    </div>
  );
}

export default DatasetDisplay