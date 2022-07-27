import {TextField, Button, Paper, FormControl} from "@mui/material";
import React, { useState} from "react";
import ManIcon from '@mui/icons-material/Man';
import PetsIcon from '@mui/icons-material/Pets';
import {propsType} from "../Filters";

export const FindByName:React.FC<propsType> = (props) => {
     const { findByName } = props

    const [owner, setOwner] = useState<string>('')
    const [puppy, setPuppy] = useState<string>('')

    return (
        <Paper
            elevation={3}
            sx={{
                width: '30%',
                height: 200,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                padding: 2,
                marginX: 'auto',
                marginBottom: 10
        }}>
            <h2>Find us</h2>
            <FormControl sx={{width: 270, marginX: 'auto', paddingBottom: 1}}>
                <TextField
                    size='small'
                    label={<ManIcon/>}
                    value={owner}
                    onChange={(e) => setOwner(e.target.value)}
                />
            </FormControl>
            <FormControl sx={{width: 270, marginX: 'auto', paddingBottom: 1}}>
                <TextField
                    size='small'
                    label={<PetsIcon/>}
                    value={puppy}
                    onChange={(e) => setPuppy(e.target.value)}
                />
            </FormControl>


            <Button
                sx={{width: 270, marginX: 'auto'}}
                size='small'
                variant='contained'
                onClick={() => findByName(owner, puppy)}
                disabled={!owner.length || !puppy.length}
            >
                Find
            </Button>
        </Paper>
    )
}