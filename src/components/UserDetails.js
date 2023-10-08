import * as React from 'react';
import {useState,useEffect} from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Container } from '@mui/material';
import Card from '@mui/material/Card';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import ApiCalls from "../services/ApiCalls"
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import moment from 'moment'
import Loading from './Loading';
import axios from "axios";


const BASE_URL = "http://localhost:8080/api/"


const idtype = [
    {
        value: 'aadhar',
        label: 'Aadhar Number',
    },
    {
        value: 'pan',
        label: 'PAN Number',
    },
    {
        value: 'passport',
        label: 'Passport Number',
    },
];

const gender = [
    {
        value: 'male',
        label: 'Male',
    },
    {
        value: 'female ',
        label: 'Female',
    },
    {
        value: 'others',
        label: 'Others',
    },
];
const UserDetails = ({user_id}) => {  

    let navigate = useNavigate();
    const [userState, setUserState] = useState({id: null, first_name: null, last_name: null, dob: null, id_type: null, id_number: null, gender: null});
    const [firstNameErrorText, setFirstNameErrorText] = React.useState("");
    const [lastNameErrorText, setlastNameErrorText] = React.useState("");
    const [dobErrorText, setDobErrorText] = React.useState("");
    const [idTypeErrorText, setIdTypeErrorText] = React.useState("");
    const [idNumberErrorText, setIdNumberErrorText] = React.useState("");
    const [genderErrorText, setGenderErrorText] = React.useState("");
    
    useEffect(()=>{

        if(user_id!=null){
            axios.get(BASE_URL + "user/" + user_id).then(
                (response)=>{
                    console.log("api response: ")
                    console.log(response.data)
                    setUserState(response.data)
                }
            ).catch(e => {
                console.log(e)
            })

        }

	}, [])

    const onSubmit = event => {

        event.preventDefault();
        console.log(userState)
        //console.log(moment("26/02/2001", "DD/MM/YYYY"))
        var b = true;

        if(!userState.first_name){
            b=false;
            setFirstNameErrorText("required field")
        }else{
            setFirstNameErrorText("")
        }

        if(!userState.last_name){
            b=false;
            setlastNameErrorText("required field")
        }else{
            setlastNameErrorText("")
        }

        if(!userState.dob){
            b=false;
            setDobErrorText("required field")
        }else if(moment(userState.dob) >= moment()){
            b=false;
            setDobErrorText("invalid DOB")
        }else{
            setDobErrorText("")
        }

        if(!userState.id_type){
            b=false;
            setIdTypeErrorText("required field")
        }else{
            setIdTypeErrorText("")
        }

        if(!userState.id_number){
            b=false;
            setIdNumberErrorText("required field")
        }else if(userState.id_type=="aadhar" && !/^\d+$/.test(userState.id_number)){
            b=false;
            setIdNumberErrorText("Aadhar number cannot contain alphabets.")
        }
        else if(userState.id_type=="aadhar" && userState.id_number.length!=12){
            b=false;
            setIdNumberErrorText("Aadhar number is must have exactly 12 digits.")
        }
        else{
            setIdNumberErrorText("")
        }

        if(!userState.gender){
            b=false;
            setGenderErrorText("required field")
        }else{
            setGenderErrorText("")
        }

        console.log("value of b: " + b)

        if(b){
             ApiCalls.updateUser(userState);
             navigate("/");
        }
    };

if(userState.customer_id==null){
    return <Loading/>
}

    return (
        <>
            <Container>
                <Card>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1, width: '25ch' },
                        }}
                        autoComplete="off"
                    >
                        <div>
                            <TextField
                                required
                                id="outlined-required"
                                label="First Name"
                                defaultValue={userState.first_name}
                                error={!!firstNameErrorText}
                                helperText={firstNameErrorText}
                                onChange={e => {setUserState({...userState, first_name: e.target.value})}}
                            />
                            <TextField
                                required
                                id="outlined-required"
                                label="Last Name"
                                defaultValue={userState.last_name}
                                error={!!lastNameErrorText}
                                helperText={lastNameErrorText}
                                onChange={e => {setUserState({...userState, last_name: e.target.value})}}
                            />&nbsp;

                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker 
                                        id="date-picker"
                                        label="Date Of Birth"
                                        locale="in"
                                        required
                                        defaultValue={moment(userState.dob, "DD/MM/YYYY")}
                                        maxDate={moment()}
                                        format="DD/MM/YYYY"
                                        onChange={e => {setUserState({...userState, dob: e.format("DD/MM/YYYY")})}}
                                        error={!!dobErrorText}
                                        helperText={dobErrorText}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </div>
                        <div>
                            <TextField
                                id="outlined-select-idtype"
                                select
                                required
                                label="ID Type"
                                defaultValue={userState.id_type}
                                onChange={e => {setUserState({...userState, id_type: e.target.value})}}
                                error={!!idTypeErrorText}
                                helperText={idTypeErrorText}
                            >
                                {idtype.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>

                            <TextField
                                required
                                id="outlined-required"
                                label="ID Number"
                                defaultValue={userState.id_number}
                                onChange={e => {setUserState({...userState, id_number: e.target.value})}}
                                error={!!idNumberErrorText}
                                helperText={idNumberErrorText}
                            />

                            <TextField
                                id="outlined-select-gender"
                                select
                                required
                                label="Gender"  
                                defaultValue={userState.gender}
                                onChange={e => {setUserState({...userState, gender: e.target.value})}}
                                error={!!genderErrorText}
                                helperText={genderErrorText}
                            >
                                {gender.map((option) => (
                                    <MenuItem key={option.value} value={option.value}>
                                        {option.label}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </div>
                </Box>
                </Card>

                <br></br>
                <div>
                    <Button type="submit" variant="contained" onClick={onSubmit}>Submit</Button>
                        &nbsp; &nbsp;
                    <Button variant="outlined" href="/">Back</Button>
                </div>
            </Container>
           
        </>
    );
}
export default UserDetails;