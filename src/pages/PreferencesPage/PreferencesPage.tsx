// import {useTranslation} from "react-i18next";
import {SearchBar} from "./productstoavoid/SearchBar.tsx";
import {SearchResultsList} from "./productstoavoid/SearchResultList.tsx";
import {SearchResultListUser} from "./userproducts/SearchResultListUser.tsx";
import {useEffect, useState} from "react";
import {DietOption} from "./diet/DietOption.tsx";
import {ChosenProductsToAvoid} from "./productstoavoid/ChosenProductsToAvoid.tsx";
import {UserProduct, DietModel} from '../../models/models.ts';
import "./PrefPage.css"
import {SearchBarUser} from "./userproducts/SearchBarUser.tsx";
import {t} from 'i18next';

export const PreferencesPage = () => {
    const [diet, setDiet] = useState<DietModel>({id: 0, name: ''});
    const [portionsNr, setPortionsNr] = useState('');
    const [productsToAvoid, setProductsToAvoid] = useState(['']);
    const prods: UserProduct[] = [];
    const [userProducts, setUserProducts] = useState(prods);
    const [firstDay, setFirstDay] = useState('');

    useEffect(() => {
        console.log("Selected diet:", diet);
        console.log("Portions number:", portionsNr);
        console.log("Products to avoid:", productsToAvoid);
        console.log("User products:", userProducts);
        console.log("First day:", firstDay);
    }, [diet, firstDay, portionsNr, productsToAvoid, userProducts]);

    const DIETS: DietModel[] = [
        {id: 1, name: "vegetarian"},
        {id: 2, name: "vegan"},
        {id: 3, name: "gluten-free"},
        {id: 4, name: "lactose-free"}
    ];

    function Diet({diets}: { diets: DietModel[] }) {
        return (
            <div>
                <div>{t('dietMessage')}:</div>
                <DietOption diets={diets} diet={diet} setDiet={setDiet}/>
            </div>
        );
    }

    function Portions() {
        return (
            <div>
                <div>{t('portionsMessage')}:</div>
                <input
                    type="number"
                    value={portionsNr}
                    // placeholder="Portions"
                    placeholder={t('portionsMessage')}
                    onChange={(e) => setPortionsNr(e.target.value)}
                />
            </div>
        );
    }

    function ProductsToAvoid() {
        const [searchText, setSearchText] = useState('');
        return (
            <div>
                <div>{t('pToAvoidMessage')}:</div>
                <SearchBar searchText={searchText} onSearchTextChange={setSearchText}/>
                <SearchResultsList
                    searchText={searchText}
                    onSearchTextChange={setSearchText}
                    setProductsToAvoid={setProductsToAvoid}
                />
                <div>
                    <ChosenProductsToAvoid productsToAvoid={productsToAvoid}/>
                </div>
            </div>
        );
    }

    function UserProducts() {
        const [searchText, setSearchText] = useState('');
        const [isRowSelected, setIsRowSelected] = useState(false);
        return (
            <div>
                <div>{t('userProductsMessage')}:</div>
                <div className="container">
                    <SearchBarUser searchText={searchText} onSearchTextChange={setSearchText}
                                   setIsRowSelected={setIsRowSelected}/>
                    <SearchResultListUser
                        searchText={searchText}
                        onSearchTextChange={setSearchText}
                        setUserProducts={setUserProducts}
                        isRowSelected={isRowSelected}
                        setIsRowSelected={setIsRowSelected}
                    />
                </div>
                <div>
                    {userProducts.map((userProduct, id) => (
                        <div key={id}>
                            {userProduct.name} - {userProduct.amount} {userProduct.unit}
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    function FirstDayOfPlan() {
        return (
            <div>
                <div>{t('firstDayMessage')}:</div>
                <input
                    type="date"
                    value={firstDay}
                    onChange={(e) => setFirstDay(e.target.value)}
                />
            </div>
        );
    }

    return (
        <>
            <div>
                <Diet diets={DIETS}/>
                <Portions/>
                <ProductsToAvoid/>
                <UserProducts/>
                <FirstDayOfPlan/>
            </div>
        </>
    );
}