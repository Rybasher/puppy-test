import { IResponce} from "../../types/types";
import {Button, Select, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Paper} from '@mui/material';
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import {DateTimePicker} from "@mui/x-date-pickers/DateTimePicker";
import React, {useState} from "react";
import {CreateAppointment, statuses} from "../CreateAppointment";
import ManIcon from '@mui/icons-material/Man';
import PetsIcon from '@mui/icons-material/Pets';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';
import DoneIcon from '@mui/icons-material/Done';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

export type propsType = {
    appointment: IResponce,
    deleteAppointmentHandler: (id: number) => void,
    changeStatusHandler: (id: number, statusValue: any) => void,
    changeVisitDataHandler: (id: number, timeValue: any) => void,
    isOpenStatus: boolean,
    isOpenVisit: boolean,
    isOpenUpdate: boolean
    setIsOpenStatus: (arg: boolean) => void,
    setIsOpenVisit: (arg: boolean) => void
    setIsOpenUpdate: (arg: boolean) => void
    handleClose: () => void
}

export const AppointmentItem: React.FC<propsType> = (props) => {

    const {
        appointment,
        changeVisitDataHandler,
        changeStatusHandler,
        setIsOpenVisit,
        setIsOpenStatus,
        isOpenStatus,
        isOpenVisit,
        handleClose,
        deleteAppointmentHandler,
        isOpenUpdate,
        setIsOpenUpdate
    } = props

    const [timeValue, setTimeValue] = useState<string | Date | null>('')
    const [openForUpdate, setOpenForUpdate] = useState<boolean>(false)
    const [statusValue, setStatusValue] = useState<string>('')

    console.log(openForUpdate)

    const handleUpdate = () => {
        setIsOpenUpdate(true)
        setOpenForUpdate(true)
    }

    // console.log(statusValue, 'statusValue')

    // console.log(appointment.visit_date)

    return (
        <Paper className='appointment__card'>
            { appointment.id }
            <div className='appointment__card--title'>
                <p className='sign'><ManIcon/> {appointment.owner_name}</p>
                <p className='sign'><PetsIcon/> {appointment.dog_name}</p>
                <p className='sign'><MiscellaneousServicesIcon/> {appointment.service}</p>
                <p className='sign'><MiscellaneousServicesIcon/> {appointment.visit_date.toString()}</p>

                {appointment.status === 'Waiting' && <p className='sign'><HourglassBottomIcon/></p>}
                {appointment.status === 'Done' && <p className='sign'><DoneIcon/></p>}
                {appointment.status === 'Processing' && <p className='sign'><AccessTimeIcon/></p>}
            </div>

            <div className='buttons__container'>
                <Dialog open={isOpenVisit} onClose={handleClose}>
                    <DialogTitle>Change date</DialogTitle>
                    <DialogContent sx={{width: 300}}>
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DateTimePicker
                                renderInput={(props) => <TextField {...props} />}
                                label=""
                                value={timeValue}
                                onChange={(newDate) => setTimeValue(newDate)}
                                minDateTime={new Date()}
                            />
                        </LocalizationProvider>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={() => changeVisitDataHandler(appointment.id, timeValue)}>Ok</Button>
                    </DialogActions>
                </Dialog>

                <Button
                    className='button'
                    size='large'
                    variant='contained'
                    onClick={() => setIsOpenVisit(true)}
                >
                    Change visit day
                </Button>

                <Dialog open={isOpenStatus} onClose={handleClose}>
                    <DialogTitle>Change status</DialogTitle>
                    <DialogContent sx={{width: 300}}>
                        <Select
                            size='medium'
                            defaultValue=''
                            fullWidth
                            value={statusValue}
                            onChange={(e) => setStatusValue(e.target.value)}
                        >
                            {statuses}
                        </Select>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Cancel</Button>
                        <Button onClick={() => {
                            changeStatusHandler(appointment.id, statusValue)
                            setStatusValue('')
                        }}>Ok</Button>
                    </DialogActions>
                </Dialog>
                <Button
                    className='button'
                    variant='contained'
                    size='large'
                    onClick={() => setIsOpenStatus(true)}
                >
                    Change status
                </Button>
                <Button
                    className='button'
                    variant='contained'
                    size='large'
                    onClick={() => deleteAppointmentHandler(appointment.id)}
                >
                    Delete
                </Button>
                <Dialog open={isOpenUpdate} onClose={handleClose}>
                    <DialogTitle>Update order</DialogTitle>
                    <DialogContent>
                        <CreateAppointment
                            openForUpdate={openForUpdate}
                            setOpenForUpdate={setIsOpenUpdate}
                            appointment={appointment}
                        />
                    </DialogContent>
                    { !openForUpdate && (
                        <DialogActions>
                            <Button onClick={handleClose}>Cancel</Button>
                            <Button onClick={() => changeVisitDataHandler(appointment.id, timeValue)}>Ok</Button>
                        </DialogActions>
                    ) }

                </Dialog>
                <Button
                    className='button'
                    variant='contained'
                    size='large'
                    onClick={handleUpdate}
                >
                    Update
                </Button>

            </div>

        </Paper>
    )
}