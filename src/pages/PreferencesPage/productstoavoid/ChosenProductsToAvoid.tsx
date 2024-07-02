interface Props {
    productsToAvoid: string[];
}

export const ChosenProductsToAvoid = ({productsToAvoid}: Props) => {
    return (
        <div>
            {productsToAvoid.map((productToAvoid, id) => (
                <div key={id}>
                    {productToAvoid}
                </div>
            ))}
        </div>
    );
}