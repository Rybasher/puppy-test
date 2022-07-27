import {Button, Paper, TextField} from "@mui/material";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {DateTimePicker} from "@mui/x-date-pickers/DateTimePicker";
import React, {useState} from "react";
import {propsType} from "../Filters";

export const FindByDate: React.FC<propsType> = (props) => {

    const { getAllData } = props

    const [timeValue, setTimeValue] = useState<string | Date | null>('')

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
            }}
        >
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateTimePicker
                    renderInput={(props) => <TextField {...props} />}
                    label="Date "
                    value={timeValue}
                    onChange={(newDate) => setTimeValue(newDate)}
                    timeIcon={false}
                />
            </LocalizationProvider>
            <Button sx={{marginTop: 3}} variant='contained' onClick={() => getAllData(timeValue as Date)} >
                Find
            </Button>
        </Paper>
    )
}