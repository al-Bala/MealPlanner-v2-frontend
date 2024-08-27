import axios from 'axios';
import {FirstDayRequest, NextDayRequest, Product} from '../models/models.ts';
import {Dispatch, SetStateAction} from "react";

interface Props {
    filterText: string;
    setRows: Dispatch<SetStateAction<Product[]>>;
}
interface Props2 {
    firstDayRequest: FirstDayRequest;
}
interface Props3 {
    nextDayRequest: NextDayRequest;
}

export const apiGenerator = () => {
    const getProducts = async ({filterText, setRows}: Props) => {
        try {
            await axios.get(`http://localhost:8080/products?query=` + filterText)
                .then(res => setRows(res.data));
        } catch (error) {
            console.log("Api error!")
        }
    };

    const postFirstDay = async ({firstDayRequest}: Props2) => {
        try {
            const response = await axios.post('http://localhost:8080/plan/firstDay', firstDayRequest, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Success:', response.data);
            return response.data;

        } catch (error) {
            console.log("Api error!")
        }
    };

    const postNextDay = async ({nextDayRequest}: Props3) => {
        try {
            const response = await axios.post('http://localhost:8080/plan/nextDay', nextDayRequest, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Success:', response.data);
            return response.data;

        } catch (error) {
            console.log("Api error!")
        }
    };

    return {
        getProducts,
        postFirstDay,
        postNextDay
    };
};
