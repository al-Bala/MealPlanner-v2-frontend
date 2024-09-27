import {useState} from "react";
import {Product} from "../../../../models/models.ts";
import {t} from "i18next";
import {SearchBarUser} from "./SearchBarUser.tsx";
import {SearchResultListUser} from "./SearchResultListUser.tsx";
import {ChosenUserProducts} from "./ChosenUserProducts.tsx";

export const UserProducts = () => {
    const [searchText, setSearchText] = useState('');
    const [rows, setRows] = useState<Product[]>([]);
    const [isResultSelected, setIsResultSelected] = useState(false);

    return (
        <div className="item1" style={{ backgroundColor: 'lightblue', height: "auto"}}>
            <div>{t('userProductsMessage')}:</div>
            <div className="user-prod-container">
                <div className="user-item">
                    <div className="div-user">
                        <SearchBarUser searchText={searchText}
                                       setRows={setRows}
                                       onSearchTextChange={setSearchText}
                                       setIsResultSelected={setIsResultSelected}/>
                        <SearchResultListUser
                            rows={rows}
                            setRows={setRows}
                            onSearchTextChange={setSearchText}
                            isResultSelected={isResultSelected}
                            setIsResultSelected={setIsResultSelected}
                        />
                    </div>
                </div>
                <div className="user-item">
                    Products:
                    <ChosenUserProducts/>
                </div>
            </div>
        </div>
    );
}