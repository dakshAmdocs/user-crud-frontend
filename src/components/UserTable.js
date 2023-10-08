import * as React from 'react';
import {useState,useEffect} from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';  
import Loading from './Loading';
import ApiCalls from "../services/ApiCalls"
import { Link } from 'react-router-dom';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import InfiniteScroll from 'react-infinite-scroll-component';
import axios from "axios";
import { tabClasses } from '@mui/material';

const BASE_URL = "http://localhost:8080/api/"

export default function UserTable (){

const [rows, setRows] = useState([]);
const [isLoading, setIsLoading] = useState(true);
const[page, setPage] = useState(0);
const [tableLength, setTableLength] = useState(0)
const [isLast, setIsLast] = useState(true)


  useEffect(() => {
    
    axios.get(BASE_URL + "users/" + page).then(
      (response)=>{
        console.log(response.data)
        setRows(response.data.content)
        setTableLength(response.data.totalElements)
        setIsLoading(false)
        console.log(rows)
        setIsLast(response.data.last);
        console.log("isLast: " + response.data.last);
      }
    ).catch(e => {
      setRows([]);
    })
  }, [])

  const deleteFunction = (e) => {
    var key = e.currentTarget.dataset.buttonKey
    console.log(key)

    confirmAlert({
      title: 'Confirm to Delete',
      message: 'Are you sure you wan to delete this user?',
      buttons: [
        {
          label: 'Yes',
          onClick: () =>{
            axios.delete(BASE_URL + "delete/" + key).then(
              ()=>{
                setRows(rows.filter((row) => row.customer_id != key))
                setTableLength(tableLength-1)
              }
            )
          }
        },
        {
          label: 'No',
          onClick: () => {}
        }
      ]
    });
  };

  const fetchData = ()=>{

    //setTimeout(function(){}, 1000);
    console.log("fetch data pagr no.: " + page)

    
    axios.get(BASE_URL + "users/" + (page + 1)).then(
      (response)=>{
        console.log(response.data)
        setRows(rows.concat(response.data.content))
        setTableLength(response.data.totalElements)
        setIsLoading(false)
        setPage(page+1)
        console.log(rows)
        setIsLast(response.data.last);
        console.log("isLast: " + response.data.last);
        console.log("fetch data after api call pagr no.: " + page)
      }
    ).catch(e => {
      setRows([]);
    })
  }

  
  if(rows==null || isLoading){
    return <Loading isLoading = {isLoading}/>
  }

  return (
    
    <TableContainer id="scrollable" component={Paper} sx={{ maxHeight: 370}}>
    <InfiniteScroll
      dataLength={rows.length}
      next={fetchData}
      hasMore={!isLast} // Replace with a condition based on your data source
      loader={<center> <p>Loading more data...</p> </center>}
     
      // style={{
      //   overflow: "hidden",
      // }}
      scrollableTarget="scrollable"
    >
      <Table stickyHeader sx={{ minWidth: 1000 }} aria-label="sticky table" >
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="center">FIRST NAME</TableCell>
            <TableCell align="center">LAST NAME</TableCell>
            <TableCell align="center">ID NUMBER</TableCell>
            <TableCell align="center">ACTION</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.customer_id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>
                  <Link to={`/editUser/` + row.customer_id} className="button" scope="row" >{row.customer_id}</Link>
              </TableCell>
              
              <TableCell align="center">{row.first_name}</TableCell>
              <TableCell align="center">{row.last_name}</TableCell>
              <TableCell align="center">{row.id_number}</TableCell>
              <TableCell align="center">
              <Stack spacing={1} direction="row" justifyContent="center" >
                <Button variant="contained" data-button-key={row.customer_id} size="small" color="error" onClick={deleteFunction}> Delete</Button>
              </Stack>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      </InfiniteScroll>
    </TableContainer>
    
  );
}