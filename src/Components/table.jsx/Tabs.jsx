import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import {useState,useEffect} from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Navigate } from 'react-router-dom';
import { red } from '@mui/material/colors';
import {DndProvider,useDrag,useDrop} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'
import update from 'immutability-helper'

const type ="DraggableBodyRow"
const columns = [
  { id: 'No', label: 'No', minWidth: 170 },
  { id: 'name', label: 'Name', minWidth: 100 },
  {
    id: 'descriptiom',
    label: 'Description',
    minWidth: 170,
    align: 'right',
   
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'price',
    label: 'Price',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: '',
    label: 'Actions',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}


export default function ColumnGroupingTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [error,setError]=useState('')
  const [data,setData]=useState([])
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const token = JSON.parse(localStorage.getItem("token"))
  const config={
      headers:{
      Authorization:`Bearer ${token}`
      }
    }
  
 
  useEffect(()=>{
   
    axios.get('http://localhost:8008/item/',config).then(response=>{
  setData(response.data)
    }).catch((error) => {
      if(error.response) setError("Not Authorized User....... Please Login");
    
  });
   },[])


  return (
    <Paper sx={{ width: '100%' }} className="table">
      <span className='span'>{error}</span>
      <TableContainer sx={{ maxHeight: 440 }} >
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center" className='tit' colSpan={2}>
                Item
              </TableCell>
              <TableCell align="center" className='tit' colSpan={3}>
                Details
              </TableCell>
            </TableRow>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ top: 57, minWidth: column.minWidth,color:"#3f6ad8",fontWeight:600}}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row,index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                       <TableCell >
                          {index+1}
                        </TableCell>
                        <TableCell >
                          {row.name}
                        </TableCell>
                        <TableCell align='right'>
                        {row.description}
                      </TableCell>
                      <TableCell align='right'>
                         {row.price}
                      </TableCell>
                      <TableCell style={{ width: 160 }} align='right'>
                <DeleteIcon sx={{color:"#3f6ad8",cursor:"pointer"}}  onClick={()=>{
                  axios.delete(`http://localhost:8008/item/${row._id}`,config).then(response=>{
                    Swal.fire(
                      {
                      text: "Item deleted Successfully",
                      icon: "success",
                      confirmButtonText: 'Ok',
                      confirmButtonColor: '#23BDB8',
                    }
                      
                    ).then(function() {
                      window.location = "/home";
                  })
                  })
                }}/>
                <EditIcon sx={{color:"#3f6ad8" ,cursor:"pointer",marginLeft:"20px"}} onClick={()=>{
                  window.location=`/edit/${row._id}`
                }}/>
              </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5,10, 25]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}