import {FindByName} from "../FindByName";
import {FindByDate} from "../FindByDate";
import {IResponce} from "../../types/types";

export type propsType = {
    findByName: (ar1: string, arg2: string) => void
    setSomeClients: (arg: IResponce[]) => void
    getAllData: (arg: undefined | Date | null) => any
}

export const Filters: React.FC<propsType> = (props) => {

    return (
        <div>
            <FindByName {...props}/>
            <FindByDate {...props}/>
        </div>
    )
}