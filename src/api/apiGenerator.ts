import {
    DietModel,
    Product
} from '../models/models.ts';
import {Dispatch, SetStateAction} from "react";
import myAxios from "./myAxios.ts";
import {
    AcceptDayRequest,
    ChangeDayRequest,
    CreateDayResponse,
    FirstDayRequest,
    NextDayRequest
} from "../models/generatorModels.ts";
import {AxiosError} from "axios";

const FIRST_DAY_CREATE_URL: string = '/generator/days/first';
const NEXT_DAY_CREATE_URL: string = '/generator/days/next';
const CHANGE_DAY_URL: string = '/generator/days/change';
const ACCEPT_DAY_URL: string = '/generator/days/accept';

interface Props {
    filterText: string;
    setRows: Dispatch<SetStateAction<Product[]>>;
}
interface FirstDayProps {
    firstDayRequest: FirstDayRequest;
}
interface NextDayProps {
    nextDayRequest: NextDayRequest;
}
interface ChangeDayProps {
    changeDayRequest: ChangeDayRequest;
}
interface AcceptDayProps {
    acceptDayRequest: AcceptDayRequest;
}

export const apiGenerator = () => {
    const getProducts = async ({filterText, setRows}: Props) => {
        try {
            await myAxios.get(`products?query=` + filterText, {
                withCredentials: true
            })
                .then(res => setRows(res.data));
        } catch (error) {
            console.log("Api error!")
        }
    };

    const getAllDiets = async (): Promise<DietModel[] | undefined> => {
        try {
            const response = await myAxios.get(`/diets`,
                {
                    withCredentials: true
                }
            );
            console.log('Success GET diets ', response?.data);
            return response?.data;
        } catch (err) {
            console.log("Api error!")
        }
    };

    const postFirstDay = async ({firstDayRequest}: FirstDayProps): Promise<CreateDayResponse | undefined> => {
        try {
            const response = await myAxios.post(FIRST_DAY_CREATE_URL, firstDayRequest, {
                headers: {'Content-Type': 'application/json'},
                withCredentials: true
            });
            console.log('Success first day:', response.data);
            return response.data;
        } catch (error) {
            if(error instanceof AxiosError){
                if(error.status == 404){
                    return error.response?.data;
                }
                else {
                    console.log("Api error!")
                }
            }
        }
    };

    const postNextDay = async ({nextDayRequest}: NextDayProps): Promise<CreateDayResponse | undefined> => {
        try {
            const response = await myAxios.post(NEXT_DAY_CREATE_URL, nextDayRequest, {
                headers: {'Content-Type': 'application/json'},
                withCredentials: true
            });
            console.log('Success next day:', response.data);
            return response.data;
        } catch (error) {
            if(error instanceof AxiosError){
                if(error.status == 404){
                    return error.response?.data;
                }
                else {
                    console.log("Api error!")
                }
            }
        }
    };

    const changeDay = async ({changeDayRequest}: ChangeDayProps): Promise<CreateDayResponse | undefined> => {
        try {
            const response = await myAxios.post(CHANGE_DAY_URL, changeDayRequest, {
                headers: {'Content-Type': 'application/json'},
                withCredentials: true
            });
            console.log('Success change:', response.data);
            return response.data;

        } catch (error) {
            if(error instanceof AxiosError){
                if(error.status == 404){
                    alert("Not found more matching recipes.\nYou must stay with previous one.");
                }
                else {
                    console.log("Api error!")
                }
            }
        }
    };

    const acceptDay = async ({acceptDayRequest}: AcceptDayProps): Promise<void> => {
        try {
            const response = await myAxios.post(ACCEPT_DAY_URL, acceptDayRequest, {
                headers: {'Content-Type': 'application/json'},
                withCredentials: true
            });
            console.log('Success (day approved):', response.data);
            // return response.data;
        } catch (err) {
            console.log("Api error!")
        }
    };

    return {
        getProducts,
        getAllDiets,
        postFirstDay,
        postNextDay,
        changeDay,
        acceptDay
    };
};
