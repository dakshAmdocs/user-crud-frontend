import * as React from 'react';
import UserTable from "../components/UserTable"
import { Button, Stack } from '@mui/material';
import { Link } from 'react-router-dom';


const Homepage = () => {

    return(
        <Stack spacing={3} alignItems={"center"}>
            <UserTable/>
            <Link to="/createUser"> <Button variant="contained" size="small">Create User</Button> </Link>
        </Stack>
    )
}

export default Homepage;