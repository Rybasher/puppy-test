import axios from 'axios'
import {IPayload} from "../types/types";

export const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000'
})

export const createAppointment = (payload: IPayload) => {
    return axiosInstance.post('/create_appointment', payload)
}

export const getData = (payload: Date = new Date()) => {

    console.log(payload, 'пейлоад апи')

    const date = payload?.toISOString().slice(0, 10)
    return axiosInstance.get(`/appointment/${date}/`)
        .then(resp => resp.data)

}

export const changeVisitDay = (appointment_id: number, payload: string | Date | null) => {
    return axiosInstance.post(`/appointment/${appointment_id}/change_visit_date?appointment_visit=${payload}`)
}

export const changeStatus = (appointment_id: number, payload: string) => {
    return axiosInstance.post(`/appointment/${appointment_id}/change_status?appointment_status=${payload}`)
}

export const deleteAppointment = (appointment_id: number,) => {
    return axiosInstance.post(`/appointment/${appointment_id}/delete`)
}

export const addAppointment = (appointment_id: number,) => {
    return axiosInstance.post(`/appointment/${appointment_id}`)
}

export const findByNames = (owner_name: string, dog_name: string) => {
    return axiosInstance.get(`/appointment/${owner_name}/${dog_name}`)
        .then(resp => resp.data)
}

export const updateAppointment = (id: number, payload: IPayload) => {
    return axiosInstance.post(`/appointment/${id}/update`, payload)
}

