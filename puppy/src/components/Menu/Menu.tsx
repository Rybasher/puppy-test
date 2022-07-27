import { Button} from "@mui/material";
import React from "react";
import {Link} from "react-router-dom";

export const Menu = () => {

    return (
        <div className='menu' >
            <Button variant='contained' sx={{mr: '10px'}}>
                <Link to='/'> Appointments </Link>
            </Button>
            <Button variant='contained' sx={{mr: '10px'}}>
                <Link to='/createappointment'> Create appointment </Link>
            </Button>
        </div>
    )
}