import axios from 'axios';
import {FirstDayRequest, Product} from './models/models';
import {Dispatch, SetStateAction} from "react";

interface Props {
    filterText: string;
    setRows: Dispatch<SetStateAction<Product[]>>;
}
export const api = () => {
    const getProducts = async ({filterText, setRows}: Props) => {
        try {
            await axios.get(`http://localhost:8080/products?query=` + filterText)
                .then(res => setRows(res.data));
        } catch (error) {
            console.log("Api error!")
        }
    };

    const postPreferences = async (fdr: FirstDayRequest) => {
        try {
            const response = await axios.post('http://localhost:8080/plan/firstDay', fdr, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('Success:', response.data);

        } catch (error) {
            console.log("Api error!")
        }
    };

    return {
        getProducts,
        postPreferences
    };
};
