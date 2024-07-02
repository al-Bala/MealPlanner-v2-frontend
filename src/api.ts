import { Product } from './models/models';

export const api = () => {
    const PRODUCTS = [
        {id: 1, name: "Apple", mainUnit: "g", units: ["g", "kg", "szt"], weight: 80},
        {id: 2, name: "Milk", mainUnit: "ml", units: ["ml", "l"], weight: null},
        {id: 3, name: "Yogurt", mainUnit: "ml", units: ["m", "ml"], weight: null},
        {id: 4, name: "Broccoli", mainUnit: "g", units: ["g", "kg", "szt"], weight: 150},
        {id: 5, name: "Pumpkin", mainUnit: "g", units: ["g", "kg", "szt"], weight: 500}
    ];

    // const getProducts = (filterText: string): Prod[] => {
    const getProducts = (filterText: string) => {
        const prods: Product[] = [];

        PRODUCTS.forEach((product) => {
            if(filterText.length > 0){
                if (product.name.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
                    return;
                }
                prods.push(<Product>product);
            }
        });
        return prods;
    };

    return {
        getProducts
    };
};
