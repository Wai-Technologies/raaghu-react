import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { RdsButton, RdsLabel, RdsInput, RdsSelectList, RdsDatePicker, RdsCheckbox, RdsNavtabs } from "../rds-elements";
import RdsCompTypeahead from "../rds-comp-typeahead";
import RdsCompAlertPopup from "../rds-comp-alertpopup"

export interface RdsCompBooksProps {
  NameBookProp?: any;
  PriceBookProp?: any;
  PublishDateBookProp?: any;
  NameAuthorProp?: any;
  create?: boolean;
  update?: boolean;
  onSaveHandler?: any;
  offCanvasType?: any;
  CategorySelectProp?: any;
  CategorySelectedItemsProp?: any;
  NameAuthorListProp?: any;

}


const RdsCompBooks = (props: RdsCompBooksProps) => {
  const { t } = useTranslation();
  const {
    NameBookProp,
    PriceBookProp,
    PublishDateBookProp,
    NameAuthorProp,
    NameAuthorListProp,
    offCanvasType,
    onSaveHandler,
    CategorySelectProp,
    CategorySelectedItemsProp,
  } = props;

  const [formValid, setFormValid] = useState(true);
  const [activeNavTabId, setActiveNavTabId] = useState("0");
  const [data, setData] = useState({
    Name: NameBookProp, Price: PriceBookProp, PublishDate: PublishDateBookProp ? new Date(PublishDateBookProp) : new Date(), CategoryIds: [], NameAuthor: NameAuthorProp
  });


  useEffect(() => {
    const isValid = (data.Name && data.Price)
    setFormValid(!isValid);
  }, [data]);



  useEffect(() => {

    const isValid = (data.Name && data.Price)

    setFormValid(!isValid);
  }, [data]);

  useEffect(() => {
    setData((prevData) => ({
      ...prevData, Name: NameBookProp, Price: PriceBookProp, PublishDate: PublishDateBookProp ? new Date(PublishDateBookProp) : new Date(), NameAuthor: NameAuthorProp
    }));

  }, [NameBookProp, PriceBookProp, PublishDateBookProp, NameAuthorProp]);


  const [navtabsItems, setNavtabItems] = useState([
    { label: t("Books"), id: "0" },
    { label: t("Categories"), id: "1" }
  ])
  const displayCase = { Name: { create: true, update: true }, Price: { create: true, update: true }, PublishDate: { create: true, update: true } }





  const selectHandlerName = (item: any) => {
    setData((prevData) => ({ ...prevData, Name: item.value }))
  }


  const onDateChangePublishDate = (e: any) => {
    setData((prevData) => ({ ...prevData, PublishDate: e }))
  }


  const handleSave = () => {
    onSaveHandler({
      data
    });


    setData({
      Name: "", Price: "", PublishDate: new Date(), CategoryIds: [], NameAuthor: ""
    });

  };

  return (




    <>

      <RdsNavtabs
        navtabsItems={navtabsItems}
        activeNavTabId={activeNavTabId}
        type="tabs"
        activeNavtabOrder={(activeNavTabId: any) => {
          setActiveNavTabId(activeNavTabId);
        }}>
      </RdsNavtabs>


      {activeNavTabId == "0" && (<>
        <div className="row">

          {
            <div className="col-md-12 mb-3">
              <div className="form-group mt-3">
                <RdsInput
                  size="small"
                  label=" Name"
                  placeholder="Name"
                  value={data.Name}
                  onChange={(e: any) =>
                    setData((prevData) => ({ ...prevData, Name: e.target.value }))
                  }
                  required={true}
                ></RdsInput>
              </div>
            </div>
          }


          {
            <div className="col-md-12 mb-3">
              <div className="form-group mt-3">
                <RdsInput
                  size="small"
                  label=" Price"
                  placeholder="Price"
                  value={data.Price}
                  onChange={(e: any) =>
                    setData((prevData) => ({ ...prevData, Price: e.target.value }))
                  }
                  required={true}
                ></RdsInput>
              </div>
            </div>
          }


          {
            <div className="col-md-12 mb-3">
              <div className="form-group mt-3">
                <div className="mb-2">
                  <RdsLabel label=" Publish Date" required={true}></RdsLabel>
                </div>
                <RdsDatePicker
                  type="default"
                  selectedDate={onDateChangePublishDate}
                  dateForEdit={data.PublishDate}
                  onDatePicker={function (start: any, end?: any) {
                    return " ";
                  }} isDropdownOpen={false}
                ></RdsDatePicker>
              </div>
            </div>
          }

          <div className="col-md-6 mb-3">
            <div className="form-group mt-3">
              <RdsSelectList
                id="namAuth"
                label={" Name"}
                selectedOption={data.Name}
                selectItems={NameAuthorListProp}
                onChange={selectHandlerName}
                selectedValue={NameAuthorProp}
              ></RdsSelectList>
            </div>
          </div>
          <div className="col-md-6 mt-5">
            <RdsButton
              type={"button"}
              label={"New Author"}
              iconColorVariant="light"
              size="small"
              colorVariant="primary"
              icon="plus"
              iconFill={false}
              iconStroke={true}
              iconHeight="12px"
              iconWidth="12px"
              databsdismiss="modal"
              databstoggle="modal"
              //databstarget={`#navigateAuthor${NameProp}`}
              databstarget={`#navigateAuthor`}
            ></RdsButton>
          </div>
          <RdsCompAlertPopup
            messageAlert="You will be redirected to Author Page. Ensure all mandatory fields are filled; otherwise, changes won't be saved."

            alertID={`navigateAuthor`}

            onSuccess={() => { console.log("navigate") }}

          ></RdsCompAlertPopup>


        </div>
      </>)}

      {
        activeNavTabId == "1" && (<>
          <div className="row">
            <RdsCompTypeahead selectItems={CategorySelectProp}
              label={"Categories"}
              selectedItems={CategorySelectedItemsProp}
              onChange={(data: any) => setData((prevData) => ({ ...prevData, CategoryIds: data }))
              }></RdsCompTypeahead>
          </div>
        </>)
      }

      <div className="footer-buttons my-2">
        <div className="row">
          <div className="col-md-12 d-flex">
            <div>
              <RdsButton
                label={("Close")}
                type="button"
                colorVariant="primary"
                size="small"
                databsdismiss="offcanvas"
                isOutline={true}
              ></RdsButton>
            </div>
            <div className="ms-2">
              <RdsButton
                label="Save"
                type="button"
                size="small"
                isDisabled={formValid}
                class="ms-2"
                colorVariant="primary"
                databsdismiss="offcanvas"
                onClick={handleSave}
              ></RdsButton>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
export default RdsCompBooks;