import {Dispatch, SetStateAction, useState} from "react";
import {Product, UserProduct} from "../../../models/models.ts";
import {t} from "i18next";
import {SearchBarUser} from "./SearchBarUser.tsx";
import {SearchResultListUser} from "./SearchResultListUser.tsx";

interface Props{
    userProducts: UserProduct[];
    setUserProducts: Dispatch<SetStateAction<UserProduct[]>>;
}

export const UserProducts = ({userProducts, setUserProducts}: Props) => {
    const [searchText, setSearchText] = useState('');
    const [rows, setRows] = useState<Product[]>([]);
    const [isRowSelected, setIsRowSelected] = useState(false);

    return (
        <div className="item1" style={{ backgroundColor: 'lightblue', height: "auto"}}>
            <div>{t('userProductsMessage')}:</div>
            <div className="user-prod-container">
                <div className="user-item">
                    <div className="div-user">
                        <SearchBarUser searchText={searchText}
                                       setRows={setRows}
                                       onSearchTextChange={setSearchText}
                                       setIsRowSelected={setIsRowSelected}/>
                        <SearchResultListUser
                            rows={rows}
                            onSearchTextChange={setSearchText}
                            setUserProducts={setUserProducts}
                            isRowSelected={isRowSelected}
                            setIsRowSelected={setIsRowSelected}
                        />
                    </div>
                </div>
                <div className="user-item">
                    Products:
                    <div>
                        {userProducts.map((userProduct, id) => (
                            <div key={id}>
                                {userProduct.name} - {userProduct.amount} {userProduct.unit}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}