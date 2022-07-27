export interface IServicesList  {
    id: number,
    name: string
}

export type Status = {
    id: number
    status: string
}

export interface IPayload {
    owner_name: string
    dog_name: string
    status: string
    service: string,
    registration_date: string | Date,
    visit_date: string | Date | undefined,
    update_at: string | Date
}

export interface IResponce {
    dog_name: string
    id: number
    owner_name: string
    service: string
    status: string
    data?: IPayload[]
    visit_date: Date
}

export interface IAppointment {
    id: number
    name: string
}
