export interface Product {
    id: number;
    name: string;
    mainUnit: string;
    units: string[];
    weight: number;
}

export interface UserProduct {
    name: string;
    amount: number;
    unit: string;
}

export interface ProductS {
    name: string;
    amount: string;
    unit: string;
}

export interface DietModel {
    id: number;
    name: string;
}