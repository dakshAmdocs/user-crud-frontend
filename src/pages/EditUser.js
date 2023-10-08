import * as React from 'react';
import UserDetails from "../components/UserDetails";
import { editableInputTypes } from '@testing-library/user-event/dist/utils';
import {useState,useEffect} from 'react'
import ApiCalls from "../services/ApiCalls"
import { useParams } from 'react-router-dom';
import axios from "axios";

const BASE_URL = "http://localhost:8080/api/"

const EditUser = () => {

    const user_id = useParams().user_id
    
    console.log(user_id)
    
    return(
        <div>
            <UserDetails user_id = {user_id}/>
        </div>
    )
}

export default EditUser;