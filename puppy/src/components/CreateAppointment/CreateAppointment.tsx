import {TextField, Select, MenuItem, Button, Card, FormControl, InputLabel} from "@mui/material";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import React, {useEffect, useState} from "react";
import {servicesList, statusesList} from "../../data/data";
import {createDate} from '../../utils/createDate'
import {createAppointment, getData, updateAppointment} from "../../api/api";
import {IPayload, IResponce} from "../../types/types";
import {DateTimePicker} from "@mui/x-date-pickers";


export const services = servicesList.map(service => (
    <MenuItem key={service.id} value={service.name}>
        {service.name}
    </MenuItem>
))

export const statuses = statusesList.map(el => (
    <MenuItem key={el.id} value={el.status}>
        {el.status}
    </MenuItem>
))

type updateProps = {
    openForUpdate?: boolean
    appointment?: IResponce,
    setOpenForUpdate?: (arg: boolean) => void
}

export const CreateAppointment: React.FC<updateProps> = (props) => {

    const {openForUpdate, appointment, setOpenForUpdate} = props

    const [timeValue, setTimeValue] = useState<Date | null | undefined>(new Date());
    const [owner, setOwner] = useState<string>('')
    const [puppy, setPuppy] = useState<string>('')
    const [service, setService] = useState<string>('')
    const [status, setStatus] = useState<string>('')

    console.log(timeValue, 'value')

    useEffect(() => {
        if (openForUpdate) {
            appointment && setService(appointment?.service)
            appointment && setOwner(appointment?.owner_name)
            appointment && setPuppy(appointment?.dog_name)
            appointment && setStatus(appointment?.status)
            appointment && setTimeValue(new Date(appointment?.visit_date))
        }
    }, [openForUpdate, appointment])

    const handleSend = () => {

        const data: IPayload = {
            owner_name: owner,
            dog_name: puppy,
            status,
            service,
            registration_date: openForUpdate
                ? new Date().toISOString().replace('T', ' ').slice(0, 19)
                : createDate(),
            visit_date: timeValue?.toISOString().replace('T', ' ').slice(0, 19),
            update_at: openForUpdate
                ? new Date().toISOString().replace('T', ' ').slice(0, 19)
                : createDate(),
        }


        if (openForUpdate) {
            alert('update')
            appointment && updateAppointment(appointment.id, data)
            setOpenForUpdate && setOpenForUpdate(false)
            getData()

        } else {
            alert('create')
            createAppointment(data)
        }

        setStatus('')
        setPuppy('')
        setOwner('')
        setService('')
        setTimeValue(null)
    }

    return (
        <Card sx={{
            width: openForUpdate ? '80%' : '20%',
            marginX: 'auto',
            padding: '2vh',

        }}>
            <div className={openForUpdate ? 'openUpdate' : ''}>
                <FormControl sx={{width: 270, paddingBottom: 1}}>
                    <TextField
                        size='medium'
                        label='Puppy'
                        value={puppy}
                        onChange={(e) => setPuppy(e.target.value)}
                    />
                </FormControl>

                <FormControl sx={{width: 270, paddingBottom: 1}}>
                    <TextField
                        size='medium'
                        label='Owner'
                        value={owner}
                        onChange={(e) => setOwner(e.target.value)}
                    />
                </FormControl>

                <FormControl sx={{width: 270, paddingBottom: 1}}>
                    <InputLabel>Services</InputLabel>
                    <Select
                        size='medium'
                        label='Services'
                        defaultValue={'first service'}
                        value={service}
                        onChange={(e) => setService(e.target.value)}
                    >
                        {services}
                    </Select>
                </FormControl>
                <FormControl sx={{width: 270, paddingBottom: 1}}>
                    <InputLabel>Statuses</InputLabel>
                    <Select
                        size='medium'
                        defaultValue='first status'
                        label='Statuses'
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        {statuses}
                    </Select>
                </FormControl>

                <div>
                    <LocalizationProvider dateAdapter={AdapterDateFns} >
                        <DateTimePicker
                            renderInput={(props) => <TextField {...props} />}
                            label="DatePicker"
                            value={timeValue}
                            onChange={(newDate) => setTimeValue(newDate)}
                        />
                    </LocalizationProvider>
                </div>
                <div>
                    <Button variant='contained' onClick={handleSend} sx={{width: 270, marginTop: 1}}>
                        {openForUpdate ? 'Update' : 'Create'}
                    </Button>
                </div>

            </div>
        </Card>
    )
}