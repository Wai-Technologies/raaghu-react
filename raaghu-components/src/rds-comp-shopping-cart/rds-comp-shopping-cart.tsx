import React from "react";

export interface RdsCompShoppingCartProp {
    cart: any,
    role: string,
    itemList: any[];
}

const RdsCompShoppingCart = (props: RdsCompShoppingCartProp) => {
    return (<>
        <div className="p-3">
            <div>
                {props.itemList.map((item: any, index: number) => (<>
                    <div className="d-flex justify-content-between   shopping___cart" key={index} data-testid="shopping-cart-item">
                        <div>{item.image}</div>
                        <div> {item.description}</div>
                        <div>{item.quantity}</div>
                        <div>{item.price}</div>
                    </div>
                    <hr />
                </>))}

            </div>
            <div>Order Summery</div>
            <div>footer</div>
        </div>

    </>);
};
export default RdsCompShoppingCart; 