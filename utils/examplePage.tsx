import { getBooksRequest,getBooksWithNavigationPropertiesRequest,putBooksRequest,postBooksRequest,deleteBooksRequest
  ,getBooksCategoryLookupRequest,getBookssAuthorLookupRequest
  
  
  } from "../../../../libs/state-management/public.api"
  import React, { useEffect, useState } from "react";
  import { useTranslation } from "react-i18next";
  import {
      useAppDispatch,
      useAppSelector,
    } from "../../../../libs/state-management/hooks";
    import {
      RdsAlert,
      RdsButton,
      RdsDatePicker,
      RdsInput,
      RdsLabel,
      RdsOffcanvas,
      RdsSelectList,
    } from "../../../rds-elements";
    import { RdsCompAlertPopup, RdsCompDatatable, RdsCompBooks } from "../../../rds-components";
  
    const tableHeaders = [{"displayName":"NAME","name":"Name","key":"name","datatype":"text","sortable":true,"element":"RdsInput"},{"displayName":"PRICE","name":"Price","key":"price","datatype":"text","sortable":true,"element":"RdsInput"},{"displayName":"PUBLISHDATE","name":"PublishDate","key":"publishDate","datatype":"text","sortable":true,"element":"RdsDatePicker"},{"displayName":"NAME","key":"nameAuthor","pascalCaseDisplayName":"Name","datatype":"text","sortable":true,"element":"Dropdown","name":"[object Object]","entityName":"author"}]
  
  
  
  
  const Books = () => {
   const databooks = useAppSelector(
    (state:any) => state.persistedReducer.book);
   const dispatch = useAppDispatch();
   const { t } = useTranslation();
   const [Data, setData] = useState<any>([{}]);
   const [Alert, setAlert] = useState({ show: false, message: "", color: "" });
   const [dataEmit, setdataEmit] = useState<any>([{}]);
   const [NameList ,setNameList] =  useState([{}])
  
  
    const [Categoryitems,setCategoryitems] = useState([{}])
    const [CategorySelectedItems,setCategorySelectedItems] = useState([{}])
  
  
   useEffect(() => {
    const timer = setTimeout(() => {
      setAlert({ ...Alert, show: false });
    }, 3000);
    return () => clearTimeout(timer);
  }, [Alert.message,databooks?.getBooks]);
  
  useEffect(()=>{
  
  dispatch(getBookssAuthorLookupRequest({}) as any);},[]);
  
  
  
  useEffect(()=>{
    if(JSON.stringify(databooks.getBookssAuthorLookup)!=="{}"){
  const tempNavList = databooks.getBookssAuthorLookup?.items.map((data:any)=>{
  return {
  option: data.displayName,
  value: data.id
  }})
  setNameList(tempNavList)
  }},[
    databooks.getBookssAuthorLookup
  ]);
  
  
  useEffect(()=>{
    dispatch(getBooksCategoryLookupRequest({}) as any)
  },[])
  
  useEffect(()=>{
    const tempCategory = databooks?.getBooksCategoryLookup?.items.map((item:any)=>{
    return {
      option:item.displayName,
      value:item.id
    }
   })
  
   setCategoryitems(tempCategory)
  
  
  
  },[  databooks?.getBooksCategoryLookup])
  
  useEffect(() => {
    dispatch(getBooksRequest({}) as any);
  }, []);
  
  useEffect(() => {
    if (databooks?.getBooks
    ?.items != null) {
      const tempData = databooks?.getBooks?.items.map(
          (item: any) =>
          {
          function getDatefortable (inputDate:any){
            const dateTimeString = inputDate;
            const date = new Date(dateTimeString);
            const formattedDate = new Intl.DateTimeFormat("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            }).format(date);
            return formattedDate
          }
            return{id:item.book.id,
              concurrencyStamp:item.book.concurrencyStamp,
              name:item.book.name,price:item.book.price,publishDate:getDatefortable(item.book.publishDate),nameAuthor:item.book.nameAuthor,    nameAuthorauthor:item.author?.nameAuthor,
      authorid:item.author?.id,
  
            }
        });
  
      setData(tempData);
    }
  }, [databooks?.getBooks]);
  
      const onNewCreate = (datafromcomponent: any) => {
  
  const categoryIdsBind = datafromcomponent.data.CategoryIds.map((dataId:any)=>{
  return dataId.value
  })
  
       let nameAuthorIndex = datafromcomponent.data.Name
  
  
  
  
        const data = {
  
          categoryIds : categoryIdsBind,
  
          name: datafromcomponent.data.Name,
  price: datafromcomponent.data.Price,
  publishDate: datafromcomponent.data.PublishDate.toISOString().substring(0, 19)
  
      ,authorId : nameAuthorIndex.toString()
  
      }
        dispatch(postBooksRequest({requestBody:data}) as any).then((res: any) => {
          if (res.type.includes("rejected")) {
            setAlert({
              ...Alert,
              show: true,
              message: "Something went wrong",
              color: "danger",
            });
          } else {
            setAlert({
              ...Alert,
              show: true,
              message: "Added Successfully",
              color: "success",
            });
          }
         dispatch(getBooksRequest({}) as any);
        }).catch((error: any) => {
          setAlert({
            ...Alert,
            show: true,
            message: "Something went wrong",
            color: "danger",
          });
          console.error(error);
        });
      };
      const actions = [{ id: "edit", displayName: t("Edit"), offId: "BooksEdit"},
    {id: "delete", displayName: t("Delete"), modalId: "BooksDel"}]
      const onActionSelection = (rowData: any, actionId: any) => {
  
        dispatch(getBooksWithNavigationPropertiesRequest({id:rowData.id}) as any).then((res:any)=>{
          let tempIdBooks = res.payload.categories.map((data:any)=>{
              return {
                option: data.categoryName,
                value: data.id
              }
            })
            setCategorySelectedItems(tempIdBooks)
        })
  
        setdataEmit({
          concurrencyStamp:rowData.concurrencyStamp,
           name : rowData.name,
   price : rowData.price,
   publishDate : rowData.publishDate
    ,nameAuthor : rowData.nameAuthor,
  
          authorid: rowData.authorid,
          id: rowData.id,
        });
      };
      const onEdithandler = (datafromcomponent: any) => {
  
  
          const categoryIdsBind = datafromcomponent.data.CategoryIds.map((dataId:any)=>{
          return dataId.value
          })
  
        const id = dataEmit.id;
  
  
     let nameAuthorIndex = datafromcomponent.data.Name
  
  
         function dateChange (inputdate:any){
          const date = new Date(inputdate);
          const year = date.getFullYear();
          const month = (date.getMonth() + 1).toString().padStart(2, "0");
          const day = date.getDate().toString().padStart(2, "0");
          const hours = date.getHours().toString().padStart(2, "0");
          const minutes = date.getMinutes().toString().padStart(2, "0");
          const seconds = date.getSeconds().toString().padStart(2, "0");
          const formattedDate = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
          return formattedDate
         }
        const data = {
  
          concurrencyStamp : dataEmit.concurrencyStamp,
          categoryIds : categoryIdsBind,
          name: datafromcomponent.data.Name,
  price: datafromcomponent.data.Price,
  publishDate: dateChange(datafromcomponent.data.PublishDate)
    ,authorId : nameAuthorIndex.toString()
  
      }
      // this is for Edit
        dispatch(putBooksRequest({ id: id ,requestBody: data }) as any)
          .then((res: any) => {
            setdataEmit([{}]);
            if (res.type.includes("rejected")){
              setAlert({
                ...Alert,
                show: true,
                message: "Error while updating",
                color: "danger",
              });
            }else{
              dispatch(getBooksRequest({}) as any);
              setAlert({
                ...Alert,
                show: true,
                message: "Updated Succesfully",
                color: "success",
              });
            }
          })
          .catch((error: any) => {
            setAlert({
              ...Alert,
              show: true,
              message: "Something went wrong",
              color: "danger",
            });
            console.error(error);
          });
      };
      const onDeleteHandler = () => {
        dispatch(deleteBooksRequest({id:dataEmit.id}) as any)
          .then((res: any) => {
            if (res.type.includes("rejected")){
              setAlert({
                ...Alert,
                show: true,
                message: "Error while deleting",
                color: "danger",
              });
  
            }else{
  
              dispatch(getBooksRequest({}) as any);
              setAlert({
                ...Alert,
                show: true,
                message: "Deleted Successfully",
                color: "success",
              });
            }
          })
          .catch((error: any) => {
            setAlert({
              ...Alert,
              show: true,
              message: "Something went wrong",
              color: "danger",
            });
            console.error(error);
          });
        setdataEmit([{}]);
      };
  
  
  return <>
  <div className="row">
          <div className="col-md-12 mb-3 ">
            <div className="row ">
              <div className="col-md-4">
               {/* add alert here */}
               {Alert.show && (
                <RdsAlert
                  alertmessage={Alert.message}
                  colorVariant={Alert.color}
                ></RdsAlert>
              )}
              </div>
              <div className="col-md-8 d-flex justify-content-end align-items-center">
                {/* add new  button here with offcanvas*/}
  
                <RdsOffcanvas
                offcanvasbutton={
                  <div>
                    <RdsButton
                      type={"button"}
                      label={"New Books"}
                      iconColorVariant="light"
                      size="small"
                      colorVariant="primary"
                      icon="plus"
                      iconFill={false}
                      iconStroke={true}
                      iconHeight="12px"
                      iconWidth="12px"
                    ></RdsButton>
                  </div>
                }
                placement={"end"}
                backDrop={true}
                scrolling={false}
                preventEscapeKey={false}
                offId={"newBooks"}
                canvasTitle={"New Books"}
                offcanvaswidth={550}
              >
                <RdsCompBooks
                NameBookProp = {""}
  PriceBookProp = {""}
  PublishDateBookProp = {""}
  CategorySelectProp = {Categoryitems}
    CategorySelectedItemsProp = {[]}
  NameAuthorProp={""}
    NameAuthorListProp={NameList}
                onSaveHandler={onNewCreate}
                offCanvasType={"create"}
  
                ></RdsCompBooks>
              </RdsOffcanvas>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <div className="card p-2 h-100 border-0 rounded-0 card-full-stretch">
              <div className="d-flex mt-3">
                <h5 className="col-md-9  ps-2 p-2">All Books</h5>
              </div>
              <div className="p-2">
                <RdsCompDatatable
                  classes="table__userTable"
                  tableHeaders={tableHeaders}
                  pagination={true}
                  tableData={Data} // data
                  actions={actions} // add action={[ add array of actions you require]} here to have action dropdown
                  onActionSelection={onActionSelection}
                  // add onActionSelction here for what function you want to call
                  recordsPerPage={10}
                  recordsPerPageSelectListOption={true}
                ></RdsCompDatatable>
              </div>
              {/* add edit offcanvas here  */}
              <RdsOffcanvas
                placement={"end"}
                backDrop={true}
                scrolling={false}
                preventEscapeKey={false}
                offId={"BooksEdit"}
                canvasTitle={"Edit"}
                offcanvaswidth={550}
              >
                <>
                <RdsCompBooks
                  NameBookProp = {dataEmit.name}
  PriceBookProp = {dataEmit.price}
  PublishDateBookProp = {dataEmit.publishDate}
                offCanvasType={"update"}
                CategorySelectProp = {Categoryitems}
        CategorySelectedItemsProp = {CategorySelectedItems}
  
      NameAuthorProp={dataEmit.name}
    NameAuthorListProp={NameList}
                  onSaveHandler={onEdithandler}
                  ></RdsCompBooks>
                </>
              </RdsOffcanvas>
              {/* add alert pop up here */}
              <RdsCompAlertPopup
                alertID={"BooksDel"}
                onSuccess={onDeleteHandler}
              ></RdsCompAlertPopup>
  
  
            </div>
          </div>
        </div>
        </>
                }
  export default Books;