import { IServicesList, Status } from "../types/types";

export const servicesList: IServicesList[] = [
    {id: 1, name: 'First service',},
    {id: 2, name: 'Second service',},
    {id: 3, name: 'Third service',},
    {id: 4, name: 'Fourth service',},
    {id: 5, name: 'Fifth service',},
]

export const statusesList: Status[] = [
    {id: 1, status: 'Waiting',},
    {id: 2, status: 'Processing',},
    {id: 3, status: 'Done',},
]