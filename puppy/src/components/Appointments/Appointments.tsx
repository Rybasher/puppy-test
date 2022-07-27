import React, {useEffect, useState} from "react";
import {changeStatus, changeVisitDay, deleteAppointment, findByNames, getData} from "../../api/api";
import {IResponce} from "../../types/types";
import {AppointmentItem} from "../AppointmentItem";
import Skeleton from '@mui/material/Skeleton';
import {Filters} from "../Filters";

const sceleton = Array(10).fill('').map(el => (
    <Skeleton key={Math.random()} variant="text" width='90%' height={100} sx={{marginX: 'auto', marginY: -2}}/>
))

export const Appointments = () => {

    const [error, setError] = useState<boolean>(false)
    const [data, setData] = useState<IResponce[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isOpenStatus, setIsOpenStatus] = useState<boolean>(false)
    const [isOpenVisit, setIsOpenVisit] = useState<boolean>(false)
    const [isOpenUpdate, setIsOpenUpdate] = useState<boolean>(false)

    const [someClients, setSomeClients] = useState<IResponce[]>()

    const getAllData = async (payload: (Date | null) = new Date()) => {
        setIsLoading(true)
        setError(false)
        try {

            const result = await getData(payload as Date)
            console.log(result)
            setData(result.items)


        } catch (e) {
            setError(true)
            console.log(e)
        }
        setIsLoading(false)
    }

    const handleClose = () => {
        setIsOpenStatus(false)
        setIsOpenVisit(false)
        setIsOpenUpdate(false)
    }

    const changeVisitDataHandler = async (id: number, timeValue: any) => {

        let result = timeValue.toISOString().slice(0, 19)
        await changeVisitDay(id, result)
        handleClose()
        getAllData()
    }

    const changeStatusHandler = async (id: number, statusValue: any) => {
        setError(false)
        setIsLoading(true)
        try {
            await changeStatus(id, statusValue)
        } catch (e) {
            setError(true)
            console.log(e)
        }
        handleClose()
        getAllData()
        setIsLoading(false)
    }

    const deleteAppointmentHandler = async (id: number) => {
        setError(false)
        setIsLoading(true)
        try {
            await deleteAppointment(id)
        } catch (e) {
            setError(error)
            console.log(e)
        }
        getAllData()
        handleClose()
        setIsLoading(false)
    }

    const findHandler = async (owner: string, puppy: string) => {
        setIsLoading(true)
        setError(false)
        try {

            let res = await findByNames(owner, puppy)

            setSomeClients(res.items)

        } catch (e) {

            setError(true)
            console.log(e)

        }
        setIsLoading(false)

    }

    useEffect(() => {
        getAllData()
    }, [])

    return (
        <div>
            <Filters
                findByName={findHandler}
                setSomeClients={setSomeClients}
                getAllData={getAllData}
            />
            {
                isLoading && !error
                    ? <>{sceleton}</>
                    : (someClients?.length ? someClients : data).map(appointment => (
                        <AppointmentItem
                            key={appointment.id}
                            appointment={appointment}
                            deleteAppointmentHandler={deleteAppointmentHandler}
                            changeStatusHandler={changeStatusHandler}
                            changeVisitDataHandler={changeVisitDataHandler}
                            isOpenStatus={isOpenStatus}
                            setIsOpenStatus={setIsOpenStatus}
                            isOpenVisit={isOpenVisit}
                            setIsOpenVisit={setIsOpenVisit}
                            handleClose={handleClose}
                            isOpenUpdate={isOpenUpdate}
                            setIsOpenUpdate={setIsOpenUpdate}
                        />
                    ))

            }
        </div>
    )
}