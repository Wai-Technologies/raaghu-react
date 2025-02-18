import React from "react";
import { RdsIcon, RdsIconLabel, RdsLabel, RdsSelectList } from "../rds-elements";

export interface RdsCompShoppingCartProp {
    cart: any,
    role: string,
    itemList: any[];
}

const RdsCompShoppingCart = (props: RdsCompShoppingCartProp) => {
    return (
      <>
        <div className="p-3">
          <div>
            {props.itemList.map((item: any, index: number) => (
              <>
                <div
                  className="d-lg-flex d-md-flex justify-content-between shopping___cart"
                  key={index}
                  data-testid="shopping-cart-item"
                >
                  <div>
                    <img
                      src={item.image}
                      alt="profilePic"
                      width="130px"
                      height="130px"
                      className="profil_image_Class rounded-circle"
                      data-testid="profile-pic"
                      style={{ height: "-webkit-fill-available" }}
                    ></img>
                  </div>
                  <div>
                    <RdsLabel
                      fontWeight="bold"
                      label={item.prodName}
                    ></RdsLabel>
                    <RdsLabel
                      fontWeight="lighter"
                      label={item.description}
                    ></RdsLabel>
                    <RdsLabel
                      fontWeight="semibold"
                      label={item.price}
                    ></RdsLabel>
                    <div className="mt-4">
                      <RdsIconLabel
                      
                        colorVariant="success"
                        icon={item.highlightsIcon}
                        label={item.highlights}
                        size="medium"
                        fill={false}
                        iconposition="left"
                      />
                    </div>
                  </div>
                  <div className="d-flex">
                    <div className="me-3 mx-md-3 ">
                      <RdsSelectList
                        id="story"
                        isSearchable
                        onChange={() => {}}
                        placeholder="Select option"
                        selectItems={item.quantity}
                        selectedValue={item.quantity[0].value}
                      />
                    </div>
                    <div className="mt-3">
                      <RdsIcon
                        name="cancel"
                        height="14px"
                        width="14px"
                        colorVariant="dark"
                        fill={false}
                        stroke={true}
                      />
                    </div>
                  </div>
                </div>
                <hr />
              </>
            ))}
          </div>
        </div>
      </>
    );
};
export default RdsCompShoppingCart; 