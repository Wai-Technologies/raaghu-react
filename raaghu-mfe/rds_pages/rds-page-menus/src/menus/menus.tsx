import React, { useEffect, useState } from "react";
import { RdsOffcanvas } from "../../../rds-elements";
import {
  RdsCompAlertPopup,
  RdsCompOrganizationTree,
} from "../../../rds-components";
import { createTree } from "../../../../libs/shared/array-to-tree-converter";
import {
  useAppDispatch,
  useAppSelector,
} from "../../../../libs/state-management/hooks";
import {
  deleteMenuItem,
  postMenuItems,
  editMenuItem,
  getAllMenuItems,
  fetchPages,
} from "../../../../libs/state-management/public.api";
import RdsCompNewMenu from "../../../../../raaghu-components/src/rds-comp-new-menu/rds-comp-new-menu";
import { useTranslation } from "react-i18next";

const Menus = () => {
  //useState of the component
  const { t } = useTranslation();
  const [Data, setData] = useState<any>({
    url: "",
    displayName: "",
    isActive: true,
    icon: "",
    target: "",
    elementId: "",
    cssClass: "",
    pageId: "",
  });
  const [id, setId] = useState({
    id: null,
    parentId: null,
    pageId: null,
  });
  const [Alert, setAlert] = useState({ show: false, message: "", color: "" });
  const [inputReset, setInputReset] = useState(false);

  const [pageData, setPageData] = useState([]);
  const nodeColor = ["#6E4D9F", "#0D79AE", "#14A94B", "#FBA919"];
  const [menuPageList, setMenuPageList] = useState<any>([]);
  const menuPage = useAppSelector((state) => state.persistedReducer.menus);
  const [menusData, setMenusData] = useState<any>({
    url: "",
    displayName: "",
    isActive: true,
    icon: "",
    target: "",
    elementId: "",
    cssClass: "",
    pageId: "",
  });

  const dto: any = {
    parentId: null,
    displayName: "",
    isActive: true,
    url: "",
    icon: "",
    order: 0,
    target: "",
    elementId: "",
    cssClass: "",
    pageId: "",
  };
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAllMenuItems() as any);
  }, [dispatch]);

  useEffect(() => {
    if (menuPage?.menus) {
      const tempmenus = createTree(
        menuPage?.menus?.items,
        "parentId",
        "id",
        null,
        "children",
        [
          {
            target: "label",
            source: "displayName",
          },
          {
            target: "expandedIcon",
            value: "fa fa-folder-open text-warning",
          },
          {
            target: "collapsedIcon",
            value: "fa fa-folder text-warning",
          },
          {
            target: "expanded",
            value: true,
          },
        ],
        1
      );
      setPageData(tempmenus);
    }
  }, [menuPage?.menus]);

  const handlerSaveAddRootMenu = (data: {
    url?: string;
    displayName?: string;
    isActive?: boolean;
    icon?: string;
    target?: string;
    elementId?: string;
    cssClass?: string;
    pageId?: string;
  }) => {
    dto.displayName = data.displayName;
    dto.isActive = data.isActive;
    dto.url = data.url == "" ? null : data.url;
    dto.icon = data.icon == "" ? null : data.icon;
    dto.target = data.target == "" ? null : data.target;
    dto.elementId = data.elementId == "" ? null : data.elementId;
    dto.cssClass = data.cssClass == "" ? null : data.cssClass;
    dto.pageId = data.pageId == "" ? null : data.pageId;
    dispatch(postMenuItems(dto) as any).then((res: any) => {
      dispatch(getAllMenuItems() as any);
    });
    handlerCloseOffcanvas();
  };

  // add a sub-menu
  const handlerAddSubMenu = (data: any) => {
    setId({ ...id, id: data.id });
    setData({
      ...Data,
      url: "",
      displayName: "",
      isActive: true,
      icon: "",
      target: "",
      elementId: "",
      cssClass: "",
      pageId: "",
    });
  };

  const handlerSaveAddSubMenu = (data: {
    url?: string;
    displayName?: string;
    isActive?: boolean;
    icon?: string;
    target?: string;
    elementId?: string;
    cssClass?: string;
  }) => {
    dto.parentId = id.id;
    dto.pageId = id.pageId;
    dto.displayName = data.displayName;
    dto.isActive = data.isActive;
    dto.url = data.url == "" ? null : data.url;
    dto.icon = data.icon == "" ? null : data.icon;
    dto.target = data.target == "" ? null : data.target;
    dto.elementId = data.elementId == "" ? null : data.elementId;
    dto.cssClass = data.cssClass == "" ? null : data.cssClass;
    dispatch(postMenuItems(dto) as any).then((res: any) => {
      dispatch(getAllMenuItems() as any);
    });
  };

  // edit a menu
  const handlerEditMenu = (data: any) => {
    setId({ ...id, id: data.id });
    setData({
      ...dto,
      url: data.url,
      displayName: data.displayName,
      isActive: data.isActive,
      icon: data.icon,
      target: data.target,
      elementId: data.elementId,
      cssClass: data.cssClass,
      pageId: data.pageId,
    });
  };
  const handlerSaveEditMenu = (data: {
    url?: string;
    displayName?: string;
    isActive?: boolean;
    icon?: string;
    target?: string;
    elementId?: string;
    cssClass?: string;
    pageId?: string;
  }) => {
    dto.displayName = data.displayName;
    dto.isActive = data.isActive;
    dto.url = data.url == "" ? null : data.url;
    dto.icon = data.icon == "" ? null : data.icon;
    dto.target = data.target == "" ? null : data.target;
    dto.elementId = data.elementId == "" ? null : data.elementId;
    dto.cssClass = data.cssClass == "" ? null : data.cssClass;
    dto.pageId = data.pageId == "" ? null : data.pageId;

    dispatch(editMenuItem({ id: id.id, model: dto }) as any).then(
      (res: any) => {
        if (res.type == "menu/editMenuItem/rejected") {
          setAlert({
            ...Alert,
            show: true,
            message: t("Your request has been denied"),
            color: "danger",
          });
        } else {
          setAlert({
            ...Alert,
            show: true,
            message: t("Menu edited Successfully"),
            color: "success",
          });
        }
        dispatch(getAllMenuItems() as any);
      }
    );
  };

  const handlerCloseOffcanvas = () => {
    setMenusData({
      url: "",
      displayName: "",
      isActive: true,
      icon: "",
      target: "",
      elementId: "",
      cssClass: "",
      pageId: "",
    });
    setData({
      url: "",
      displayName: "",
      isActive: true,
      icon: "",
      target: "",
      elementId: "",
      cssClass: "",
      pageId: "",
    });
    setInputReset(!inputReset);
  };

  //delete a menu
  const handlerDeleteMenu = (id: any) => {
    setId({ ...id, id: id });
  };

  useEffect(() => {
    dispatch(fetchPages({ items: menuPage?.pages }) as any);
  }, [dispatch]);

  useEffect(() => {
    if (menuPage?.pages?.items) {
      if (menuPage?.pages?.items?.length) {
        const menuPageData: any[] = [];
        menuPage?.pages?.items.map((item: any) => {
          const newItem = {
            option: item.title,
            value: item.id,
          };
          menuPageData.push(newItem);
        });
        setMenuPageList(menuPageData);
      }
    }
  }, [menuPage?.pages?.items]);

  useEffect(() => {
    dispatch(getAllMenuItems() as any).then(() => {
      handlerDeleteConfirm();
    });
  }, [dispatch]);

  const handlerDeleteConfirm = () => {
    dispatch(deleteMenuItem(id.id) as any).then(() => {
      dispatch(getAllMenuItems() as any);
    });
  };

  return (
    <>
      <div className="container-fluid p-0 m-0">
        <div className="row h-100">
          <div className="col-xxl-12 col-xl-12 col-lg-12 col-12 mb-xxl-0 mb-xl-0 mb-lg-0 mb-4">
            <div>
              <div className="card card-full-stretch rounded-0 border-0">
                <div className="card-header bg-transparent">
                  <h5 className="card-title fw-medium">
                    {t("Menu Management Tree")}
                  </h5>
                </div>
                <div className="card-body overflow-x-hidden overflow-y-scroll children-scrollable">
                  <RdsCompOrganizationTree
                    organizationTreeData={pageData}
                    onDeleteNode={handlerDeleteMenu}
                    onCreateNode={(data) => {
                      setId({ ...id, id: data.id });
                    }}
                    onCreateSubUnit={handlerAddSubMenu}
                    onNodeEdit={handlerEditMenu}
                    nodeColor={nodeColor}
                    onCreateRootNode={() => {}}
                    mutable={false}
                    offId="oganization"
                    buttonLabel="NEW ROOT MENU"
                  ></RdsCompOrganizationTree>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* New Root Menu */}
      <RdsOffcanvas
        placement="end"
        canvasTitle={t("NEW ROOT MENU")}
        backDrop={true}
        scrolling={false}
        preventEscapeKey={false}
        offId="doganization"
        onClose={handlerCloseOffcanvas}
      >
        <RdsCompNewMenu
          menusData={menusData}
          menuPage={menuPageList}
          onSubmit={handlerSaveAddRootMenu}
          reset={inputReset}
          onCancel={handlerCloseOffcanvas}
        />
      </RdsOffcanvas>

      {/* Delete Tree Node */}
      <RdsCompAlertPopup
        alertID={"deleteTreeNode"}
        onSuccess={handlerDeleteConfirm}
      ></RdsCompAlertPopup>

      {/* New Sub-root  */}
      <RdsOffcanvas
        placement="end"
        canvasTitle={t("SUB ROOT MENU")}
        backDrop={true}
        scrolling={false}
        preventEscapeKey={false}
        offId="aoganization"
        onClose={handlerCloseOffcanvas}
      >
        <RdsCompNewMenu
          menusData={Data}
          menuPage={menuPageList}
          onSubmit={handlerSaveAddSubMenu}
          reset={inputReset}
          onCancel={handlerCloseOffcanvas}
        />
      </RdsOffcanvas>

      {/* Edit Unit  */}
      <RdsOffcanvas
        placement="end"
        canvasTitle={t("SUB ROOT MENU")}
        backDrop={true}
        scrolling={false}
        preventEscapeKey={false}
        offId="boganization"
        onClose={handlerCloseOffcanvas}
      >
        <RdsCompNewMenu
          menusData={Data}
          menuPage={menuPageList}
          onSubmit={handlerSaveEditMenu}
          reset={inputReset}
          onCancel={handlerCloseOffcanvas}
        />
      </RdsOffcanvas>
    </>
  );
};

export default Menus;
