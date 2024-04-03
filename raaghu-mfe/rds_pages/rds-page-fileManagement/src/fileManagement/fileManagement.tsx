import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "./fileManagement.css";
import RdsCompDataTable from "../../../../../raaghu-components/src/rds-comp-data-table";
import {
  RdsCompAlertPopup,
  RdsCompFileUploader,
} from "../../../rds-components";
import RdsCompFileManagementTree, {
} from "../../../../../raaghu-components/src/rds-comp-fileManagement-Tree/rds-comp-fileManagement-Tree";
import {
  RdsAlert,
  RdsButton,
  RdsIcon,
  RdsIconLabel,
  RdsIllustration,
  RdsInput,
  RdsLabel,
  RdsOffcanvas,
  RdsSearch,
} from "../../../../../raaghu-elements/src";
import {
  deleteFileDescriptorRequest,
  deleteDirectoryDescriptorRequest,
  getDirectoryDescriptor1Request,
  getDirectoryDescriptorSubDirectoriesRequest,
  postFileDescriptorPreUploadInfoRequest,
  postDirectoryDescriptorMoveRequest,
  postFileDescriptorMoveRequest,
  postDirectoryDescriptor1Request,
  postDirectoryDescriptorRequest,
  postFileDescriptorUploadRequest,
  postFileDescriptorRequest,
  getFileDescriptorDownloadTokenRequest,
  getFileDescriptorDownloadRequest,
} from "../../../../libs/public.api";
import {
  useAppSelector,
  useAppDispatch,
} from "../../../../libs/state-management/hooks";
import RdsCompFileMover from "../../../../../raaghu-components/src/rds-comp-file-mover";

const FileManagement = () => {
  const iconForIllustration = sessionStorage.getItem("theme") || " light";
  const [skipCount, setSkipCount] = useState<number>(0);
  const [recordsPerPage, setRecordsPerPage] = useState<number>(10);
  const [totalRecords, setTotalRecords] = useState<number | null>(0);
  const [Alert, setAlert] = useState({ show: false, message: "", color: "" });
  const [name, setName] = useState("");
  const [data, setData] = useState([]);
  const [totalFiles, setTotaFiles] = useState<any[]>([]);
  const [uploadFiles, setUploadFiles] = useState<any>([]);
  const [moveNewFolder, setMoveNewFolder] = useState<string>("");
  const [selectedNode, setSelectedNode] = useState("");
  const [folderId, setFolderId] = useState<string>("");
  const [parentFolderId, setParentFolderId] = useState<string>("");
  const [isDirectory, setIsDirectory] = useState<string>();
  const [directories, setDirectories] = useState<any[]>([
    {
      name: "All",
      path: "/all",
      parentId: null,
      id: null,
      hasChildren: false,
      children: [],
      clicked: false,
    },
  ]);
  const [tableData, setTableData] = useState<any[]>([]);
  const [inputReset, setInputReset] = useState(false);

  const dispatch: any = useAppDispatch();
  const fileDescriptor = useAppSelector(
    (state) => state.persistedReducer.fileDescriptors
  );
  const directoryDescriptor = useAppSelector(
    (state) => state.persistedReducer.directoryDescriptors
  );

  const { t } = useTranslation();
  const tableHeaders = [
    {
      displayName: t("FileManagement.Name"),
      key: "name",
      datatype: "text",
      sortable: true,
    },
    {
      displayName: t("Size (kB)"),
      key: "size",
      datatype: "text",
      sortable: true,
    },
  ];

  useEffect(() => {
    if (directoryDescriptor.getDirectoryDescriptor1?.items) {
      const tempdata = directoryDescriptor.getDirectoryDescriptor1.items.map(
        (item: any) => {
          return {
            id: item.id,
            name: item.name,
            isDirectory: item.isDirectory,
            size: `${(item.size / 1024).toFixed(2)}`,
          };
        }
      );
      setTableData(tempdata);
      setData(tempdata);

      setTotalRecords(directoryDescriptor.getDirectoryDescriptor1?.totalCount);
    }
  }, [directoryDescriptor?.getDirectoryDescriptor1]);

  const actions = [
    { id: "rename", displayName: t("FileManagement.Rename"), offId: "Rename" },
    { id: "delete", displayName: t("AbpUi.Delete"), modalId: "DeleteFile" },
    { id: "move", displayName: t("FileManagement.Move"), offId: "Move" },
    { id: "download", displayName: t("FileManagement.Download") },
  ];

  const handlerAction = (rowData: any, actionId: any) => {
    setFolderId(rowData.id);
    setIsDirectory(rowData.isDirectory);
    setName(rowData.name);

    if (actionId == "download") {
      const dto = { id: rowData.id };
      dispatch(getFileDescriptorDownloadTokenRequest(dto) as any).then(
        (res: any) => {
          if (res.payload) {
            dispatch(
              getFileDescriptorDownloadRequest({
                id: dto.id,
                token: res.payload.token,
              })
            ).then((response: any) => {
              response.payload.blob().then((res: any) => {
                const file: any = new File([res], rowData.name, {
                  type: res.type,
                });
                downloadBlob(file, rowData.name);
                function downloadBlob(blob: any, fileName: any) {
                  //Creating a URL for the blob object
                  const blobUrl = URL.createObjectURL(blob);

                  //Creating an anchor element to link it to blob oject
                  const a = document.createElement("a");
                  a.href = blobUrl;
                  a.download = fileName;

                  //Triggering a click event on the anchor element
                  a.style.display = "none";
                  document.body.appendChild(a);
                  a.click();

                  //Cleaning up that tag
                  document.body.removeChild(a);
                  URL.revokeObjectURL(blobUrl);
                }
              });
            });
          }
        }
      );
    }
  };

  const UpdateFolderName = () => {
    const dto = { requestBody: { name: name }, id: folderId };
    dispatch(postDirectoryDescriptorRequest(dto) as any).then((res: any) => {
      if (res.type.includes("rejected")) {
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
          message: t("Directory updated Successfully"),
          color: "success",
        });
        
        setSelectedNode(name);
      }
      dispatch(
        getDirectoryDescriptorSubDirectoriesRequest({
          parentId: undefined,
        }) as any
      );
    });
  };

  const handleRenameUpdate = () => {
    const dto = { requestBody: { name: name }, id: folderId };
    if (isDirectory) {
      dispatch(postDirectoryDescriptorRequest(dto) as any).then((res: any) => {
        if (res.type.includes("rejected")) {
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
            message: t("Directory updated Successfully"),
            color: "success",
          });
        }
        dispatch(
            getDirectoryDescriptor1Request({
              id: parentFolderId,
              skipCount: skipCount,
              maxResultCount: recordsPerPage,
            }) as any
          );
      });
    } else {
      dispatch(postFileDescriptorRequest(dto) as any).then((res: any) => {
        if (res.type.includes("rejected")) {
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
            message: t("File updated Successfully"),
            color: "success",
          });
        }
      });
      dispatch(
        getDirectoryDescriptor1Request({
          id: parentFolderId,
          skipCount: skipCount,
          maxResultCount: recordsPerPage,
        }) as any
      );
      setName("");
    }
  };

  useEffect(() => {
    if (fileDescriptor.editFile) {
      const tempdata = tableData.map((item: any) => {
        if (item.id == fileDescriptor.editFile.id) {
          return {
            id: fileDescriptor.editFile.id,
            name: fileDescriptor.editFile.name,
            isDirectory: item.isDirectory,
            size: `${(fileDescriptor.editFile.size / 1024).toFixed(2)}`,
          };
        } else {
          return {
            id: item.id,
            name: item.name,
            isDirectory: item.isDirectory,
            size: `${(item.size / 1024).toFixed(2)}`,
          };
        }
      });
      setTableData(tempdata);
    }
  }, [fileDescriptor?.editFile]);

  const folderMover = (e: any) => {
    const files = {
      body: {
        id: folderId,
        newParentId: moveNewFolder,
      },
    };
    dispatch(
      postDirectoryDescriptorMoveRequest({ requestBody: files.body }) as any
    ).then((res: any) => {
      if (res.type.includes("rejected")) {
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
          message: t("Directory moved Successfully"),
          color: "success",
        });
      }
      dispatch(
        getDirectoryDescriptorSubDirectoriesRequest({
          parentId: undefined,
        }) as any
      );
    });
  };

  const movefolder = (e: any) => {
    const files = {
      body: {
        id: folderId,
        newParentId: moveNewFolder,
      },
    };
    if (isDirectory) {
      dispatch(
        postDirectoryDescriptorMoveRequest({ requestBody: files.body }) as any
      ).then((res: any) => {
        if (res.type.includes("rejected")) {
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
            message: t("Directory moved Successfully"),
            color: "success",
          });
        }
        dispatch(
          getDirectoryDescriptorSubDirectoriesRequest({
            parentId: undefined,
          }) as any
        );
      });
    } else {
      dispatch(
        postFileDescriptorMoveRequest({ requestBody: files.body }) as any
      ).then((res: any) => {
        if (res.type.includes("rejected")) {
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
            message: t("File moved Successfully"),
            color: "success",
          });
        }
        dispatch(
          getDirectoryDescriptorSubDirectoriesRequest({
            parentId: undefined,
          }) as any
        );
      });
    }
  };


  useEffect(() => {
    dispatch(
      getDirectoryDescriptorSubDirectoriesRequest({ parentId: folderId }) as any
    );
  }, []);

  useEffect(() => {
    if (
      directoryDescriptor.getDirectoryDescriptorSubDirectories &&
      directoryDescriptor?.getDirectoryDescriptorSubDirectories?.items
    ) {
      const updatedDirectories = [...directories];
      updatedDirectories[0].children =
        directoryDescriptor.getDirectoryDescriptorSubDirectories.items;
      updatedDirectories[0].hasChildren =
        directoryDescriptor.getDirectoryDescriptorSubDirectories.items.length >
        0
          ? true
          : false;
      setDirectories(updatedDirectories);
    }
  }, [directoryDescriptor?.getDirectoryDescriptorSubDirectories]);

  const dTo: {
    id: any;
    name: string;
    parentId: any;
    extraProperties: any;
  } = { name: "", id: null, parentId: null, extraProperties: {} };

  function handlerPath({ id, name }: any) {
    setSelectedNode(name);
    setFolderId(id);
    dispatch(
      getDirectoryDescriptor1Request({
        id: id,
        skipCount: skipCount,
        maxResultCount: recordsPerPage,
      }) as any
    );
    setParentFolderId(id);
  }

  function setFolderPath(event: any) {
    let id = undefined;
    if (event && event.id) {
      id = event.id;
    } else {
      id = undefined;
    }
    setMoveNewFolder(id);
    dispatch(
      getDirectoryDescriptor1Request({
        id: id,
        skipCount: skipCount,
        maxResultCount: recordsPerPage,
      }) as any
    );
    dispatch(getDirectoryDescriptorSubDirectoriesRequest(id) as any);
  }

  const handlerCloseOffcanvas = () => {
    setName("");
    setInputReset(!inputReset);
  };
  const addNewFolder = () => {
    dTo.name = name;
    dTo.parentId = folderId;
    dispatch(postDirectoryDescriptor1Request({ requestBody: dTo }) as any).then(
      (res: any) => {
        if (res.type.includes("rejected")) {
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
            message: t("File added Successfully"),
            color: "success",
          });
        }
        dispatch(
          getDirectoryDescriptorSubDirectoriesRequest({
            parentId: undefined,
          }) as any
        );
        dispatch(
          getDirectoryDescriptor1Request({
            id: folderId,
            skipCount: skipCount,
            maxResultCount: recordsPerPage,
          }) as any
        );
      }
    );
    handlerCloseOffcanvas();
  };
  const onDeleteFolder = () => {
    dTo.id = folderId;
    dispatch(deleteDirectoryDescriptorRequest({ id: folderId }) as any).then(
      (res: any) => {
        if (res.type.includes("rejected")) {
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
            message: t("Directory deleted Successfully"),
            color: "success",
          });
        }
      }
    );
  };
  const handleDeleteDirectorySuccess = () => {
    if (isDirectory) {
      dispatch(deleteDirectoryDescriptorRequest({ id: folderId }) as any).then(
        async (res: any) => {
          if (res.type.includes("rejected")) {
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
              message: t("Directory deleted Successfully"),
              color: "success",
            });
          }
          await dispatch(
            getDirectoryDescriptor1Request({
              id: parentFolderId,
              skipCount: skipCount,
              maxResultCount: recordsPerPage,
            }) as any
          );
        }
      );
    } else {
      dispatch(deleteFileDescriptorRequest({ id: folderId }) as any).then(
        async (res: any) => {
          if (res.type.includes("rejected")) {
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
              message: t("File deleted Successfully"),
              color: "success",
            });
          }
          await dispatch(
            getDirectoryDescriptor1Request({
              id: parentFolderId,
              skipCount: skipCount,
              maxResultCount: recordsPerPage,
            }) as any
          );
        }
      );
    }
  };

  const SetSearchName = (e: any) => {
    const temparr = data.filter((data: any) =>
      data.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setTableData(temparr);
  };

  function preUploadFileInfo(_data: any) {
    const tempUploadfiles: any[] = [];
    const tempfiles: any[] = [];
    [..._data.files].map((res: any) => {
      const data: any = {
        directoryId: folderId,
        fileName: res.name,
        size: res.size,
      };
      tempUploadfiles.push(data);
      tempfiles.push(res);
    });
    setTotaFiles(totalFiles.concat(tempfiles));
    setUploadFiles(uploadFiles.concat(tempUploadfiles));
  }

  useEffect(() => {
    dispatch(
      postFileDescriptorPreUploadInfoRequest({
        requestBody: uploadFiles,
      }) as any
    );
  }, [uploadFiles]);

  const handleDeleteFile = (id: any) => {
    const tempfiles = [...totalFiles];
    const tempUploadfiles = [...uploadFiles];

    tempfiles.splice(id, 1);
    tempUploadfiles.splice(id, 1);

    setTotaFiles(tempfiles);
    setUploadFiles(tempUploadfiles);
  };

  const UploadedFile = () => {
    totalFiles.map((e: any) => {
      const body = {
        relativePath: null,
        name: e.name,
        directoryId: folderId,
        extraProperties: {},
        formData: { File: new Blob([e], { type: e.type }) },
      };
      dispatch(postFileDescriptorUploadRequest(body) as any).then(
        async (res: any) => {
          if (res.type.includes("rejected")) {
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
              message: t("File uploaded Successfully"),
              color: "success",
            });
          }

          await dispatch(
            getDirectoryDescriptor1Request({
              id: parentFolderId,
              skipCount: skipCount,
              maxResultCount: recordsPerPage,
            }) as any
          );
        }
      );
      setTableData(totalFiles.concat(tableData));
    });
  };
  useEffect(() => {
    // Set a 2-second timer to update the state
    const timer = setTimeout(() => {
      setAlert({ ...Alert, show: false });
    }, 2000);

    // Clean up the timer when the component unmounts or when the state changes
    return () => clearTimeout(timer);
  }, [fileDescriptor]);
  useEffect(() => {
    // Set a 2-second timer to update the state
    const timer = setTimeout(() => {
      setAlert({ ...Alert, show: false });
    }, 2000);

    // Clean up the timer when the component unmounts or when the state changes
    return () => clearTimeout(timer);
  }, [directoryDescriptor]);

  //paginationa handling
  const paginationHandler = (currentPage: number, recordsPP: number) => {
    const skipCount = recordsPP * (currentPage - 1);
    if (recordsPP !== recordsPerPage) {
      setRecordsPerPage(recordsPP);
    }
    setSkipCount(skipCount);
  };

  const handleClickButtonGroup = (id: any, name: any) => {
    if (id == "plusButton") {
      setName("");
    } else {
      setName(name);
    }
  };
  return (
    <div>
      <div className="container-fluid p-0 m-0">
        <div className="row">
          <div className="col-xxl-5 col-xl-5 col-lg-12 col-12 mb-xxl-0 mb-xl-0 mb-lg-4 mb-4">
            <div>
              <div className="card card-full-stretch rounded-0 border-0 px-4 py-2">
                <div className="card-header bg-transparent px-0 pt-0">
                  <h5 className="card-title">{t("File Management Tree")}</h5>
                  <span className="mt-3">
                    {Alert.show && (
                      <RdsAlert
                        alertmessage={Alert.message}
                        size="small"
                        colorVariant={Alert.color}
                      ></RdsAlert>
                    )}
                  </span>
                </div>
                <div className="card-body overflow-x-hidden p-0 overflow-y-scroll children-scrollable">
                  <RdsCompFileManagementTree
                    items={directories}
                    path={handlerPath}
                    selectedItemId={directories[0].id}
                    offId="organization"
                    onClickButtonGroup={handleClickButtonGroup}
                  ></RdsCompFileManagementTree>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xxl-7 col-xl-7 col-lg-12 col-12 mb-xxl-0 mb-xl-0 mb-lg-0 mb-4 ps-lg-1 ps-xl-1 ps-xxl-1">
          <div>
            <div className="card card-full-stretch rounded-0 border-0 px-4 py-2">
              {selectedNode === "" && (
                <>
                  <div className="card-header bg-transparent px-0 pt-0">
                    <h5 className="card-title">
                      {t("Select an File Management node")}
                    </h5>
                  </div>
                  <div>
                    {iconForIllustration === "light" && (
                      <RdsIllustration
                        label="No Records Available"
                        subLabel=""
                        colorVariant="dark"
                        iconHeight="200px"
                        iconWidth="200px"
                        iconPath="./assets/lottie-files/outlined/dual-color/illustration-light.json"
                        isContinueAnimate={true}
                      />
                    )}
                    {iconForIllustration === "dark" && (
                      <RdsIllustration
                        label="No Records Available"
                        subLabel=""
                        colorVariant="dark"
                        iconHeight="200px"
                        iconWidth="200px"
                        iconPath="./assets/lottie-files/outlined/dual-color/illustration-dark.json"
                        isContinueAnimate={true}
                      />
                    )}
                    {iconForIllustration === "semidark" && (
                      <RdsIllustration
                        label="No Records Available"
                        subLabel=""
                        colorVariant="dark"
                        iconHeight="200px"
                        iconWidth="200px"
                        iconPath="./assets/lottie-files/outlined/dual-color/illustration-light.json"
                        isContinueAnimate={true}
                      />
                    )}
                  </div>
                </>
              )}
              {selectedNode !== "" && (
                <div>
                  <div className="card-header d-flex justify-content-between px-0 bg-transparent align-items-center pt-0">
                    <h5 className="card-title">{selectedNode}</h5>
                  </div>
                  <div className="row justify-content-between align-items-baseline">
                    <div className="col-xxl-5 col-xl-5 col-lg-8 col-md-8 col-12 mb-xxl-0 mb-xl-0 mb-lg-0 mb-3 ps-3">
                      <RdsSearch
                        label=""
                        labelPosition="top"
                        placeholder="Search"
                        size="small"
                        onKeyPress={SetSearchName}
                      />
                    </div>
                    <div className="col-xxl-7 col-xl-7 col-lg-4 col-md-4 col-12 mb-xxl-0 mb-xl-0 mb-lg-0 mb-3">
                      <RdsOffcanvas
                        canvasTitle={t("FileManagement.UploadFiles")}
                        placement="end"
                        backDrop={true}
                        scrolling={false}
                        preventEscapeKey={false}
                        offId={"Files"}
                        offcanvasbutton={
                          <div className="d-xxl-flex d-xl-flex d-lg-flex justify-content-end mb-xxl-0 mb-xl-0 mb-lg-0 mb-3">
                            <RdsButton
                              icon="upload_data"
                              label={t("FileManagement.UploadFiles") || ""}
                              iconColorVariant="primary"
                              iconHeight="12px"
                              iconWidth="12px"
                              iconFill={false}
                              iconStroke={true}
                              block={false}
                              size="small"
                              type="button"
                              colorVariant="primary"
                              isOutline={true}
                              showLoadingSpinner={true}
                            ></RdsButton>
                          </div>
                        }
                      >
                        <RdsCompFileUploader
                          onClick={UploadedFile}
                          onDeleteFile={handleDeleteFile}
                          preFileInfo={(data: any) => preUploadFileInfo(data)}
                        ></RdsCompFileUploader>
                      </RdsOffcanvas>
                    </div>
                  </div>
                  <div className="card-body px-0 overflow-x-hidden overflow-y-scroll children-scrollable">
                    <div className="row tab-content" id="nav-tabContent">
                      <div className="row">
                        <RdsCompDataTable
                          actionPosition="right"
                          tableHeaders={tableHeaders}
                          tableData={tableData}
                          actions={actions}
                          onActionSelection={handlerAction}
                          noDataheaderTitle={t("No Records Available") || ""}
                          pagination={true}
                          illustration={true}
                          recordsPerPageSelectListOption={true}
                          totalRecords={totalRecords}
                          recordsPerPage={recordsPerPage}
                          onPaginationHandler={paginationHandler}
                        />
                      </div>
                      <RdsOffcanvas
                        canvasTitle={t("FileManagement.Rename")}
                        placement="end"
                        offcanvaswidth={650}
                        backDrop={true}
                        scrolling={false}
                        preventEscapeKey={false}
                        offId="Rename"
                      >
                        <div>
                          <div className="">
                            <RdsInput
                              size="medium"
                              inputType="text"
                              placeholder={t("Enter Name") || ""}
                              label={t("FileManagement.Name") || ""}
                              labelPosition="top"
                              id=""
                              value={name}
                              required={true}
                              onChange={(e) => {
                                setName(e.target.value);
                              }}
                            ></RdsInput>
                            <div className="pb-3 d-flex flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row me-3 footer-buttons gap-2">
                              <RdsButton
                                label={t("AbpUi.Cancel") || ""}
                                databsdismiss="offcanvas"
                                type={"button"}
                                size="small"
                                isOutline={true}
                                colorVariant="primary"
                                class="me-2"
                              ></RdsButton>
                              <RdsButton
                                label={t("FileManagement.Rename") || ""}
                                type={"button"}
                                size="small"
                                databsdismiss="offcanvas"
                                isDisabled={name === ""}
                                colorVariant="primary"
                                class="me-2"
                                onClick={ handleRenameUpdate}
                                showLoadingSpinner={true}
                              ></RdsButton>
                            </div>
                          </div>
                        </div>
                      </RdsOffcanvas>
                      <RdsOffcanvas
                        canvasTitle={t("FileManagement.Move")}
                        placement="end"
                        offcanvaswidth={650}
                        backDrop={true}
                        scrolling={false}
                        preventEscapeKey={false}
                        offId={"Move"}
                      >
                        <div>
                          <div className="pt-3">
                            <RdsLabel
                              label={t("FileManagement.MoveToUnder") || ""}
                              size="15px"
                            ></RdsLabel>
                          </div>
                          <div className="mt-3 mb-4 p-2 border">
                            <RdsIconLabel
                              icon="home"
                              label="All Files"
                              size="small"
                              fill={false}
                              iconposition="left"
                            />
                          </div>
                          <div className="mb-3 pb-2 border-bottom">
                            <RdsLabel
                              label={t("Folder Name") || ""}
                              size="14px"
                            >
                              <RdsIcon
                                name={"up"}
                                height="12px"
                                width="12px"
                                stroke={true}
                              />

                              <RdsIcon
                                name={"down"}
                                height="12px"
                                width="12px"
                                stroke={true}
                              />
                            </RdsLabel>
                          </div>
                          <RdsCompFileMover
                            items={directories}
                            path={setFolderPath}
                            selectedItemId={directories[0].id}
                          ></RdsCompFileMover>
                          <div className="pb-3 d-flex flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row flex-row footer-buttons gap-2">
                            <RdsButton
                              label={t("AbpUi.Cancel") || ""}
                              databsdismiss="offcanvas"
                              type={"button"}
                              size="small"
                              isOutline={true}
                              colorVariant="primary"
                              class="me-2"
                            ></RdsButton>
                            <RdsButton
                              label={t("FileManagement.Move") || ""}
                              type={"button"}
                              size="small"
                              databsdismiss="offcanvas"
                              colorVariant="primary"
                              class="me-2"
                              showLoadingSpinner={true}
                              onClick={movefolder}
                            ></RdsButton>
                          </div>
                        </div>
                      </RdsOffcanvas>
                    </div>
                  </div>
                </div>
              )}
            </div>
            </div>
          </div>
        </div>
      </div>
      <RdsOffcanvas
        placement="end"
        canvasTitle={t("NEW FOLDER")}
        offId="aorganization"
        backDrop={true}
        scrolling={false}
        preventEscapeKey={false}
        onClose={handlerCloseOffcanvas}
      >
        <RdsInput
          label={t("Folder Name") || ""}
          labelPosition="top"
          required={true}
          placeholder="Enter Name"
          size="medium"
          value={name}
          reset={inputReset}
          onChange={(e) => setName(e.target.value)}
        ></RdsInput>
        <div className="pb-3 d-flex flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row flex-row footer-buttons gap-2">
          <RdsButton
            type={"button"}
            label={t("AbpUi.Cancel") || ""}
            size="small"
            isOutline={true}
            colorVariant="primary"
            databsdismiss="offcanvas"
            onClick={handlerCloseOffcanvas}
          ></RdsButton>

          <RdsButton
            type={"button"}
            label={t("AbpUi.Save") || ""}
            class="ms-2"
            size="small"
            isDisabled={name === ""}
            colorVariant="primary"
            onClick={addNewFolder}
            databsdismiss="offcanvas"
          ></RdsButton>
        </div>
      </RdsOffcanvas>
      <RdsOffcanvas
        canvasTitle={t("FileManagement.Rename")}
        placement="end"
        offcanvaswidth={650}
        backDrop={true}
        scrolling={false}
        preventEscapeKey={false}
        offId="borganization"
      >
        <div>
          <div className="">
            <RdsInput
              size="medium"
              inputType="text"
              placeholder={t("Enter Name") || ""}
              label={t("FileManagement.Name") || ""}
              labelPosition="top"
              id=""
              value={name}
              required={true}
              onChange={(e) => {
                setName(e.target.value);
              }}
            ></RdsInput>
            <div className="pb-3 d-flex flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row me-3 footer-buttons gap-2">
              <RdsButton
                label={t("AbpUi.Cancel") || ""}
                databsdismiss="offcanvas"
                type={"button"}
                size="small"
                isOutline={true}
                colorVariant="primary"
                class="me-2"
              ></RdsButton>
              <RdsButton
                label={t("AbpUi.Save") || ""}
                type={"button"}
                size="small"
                databsdismiss="offcanvas"
                isDisabled={name === ""}
                colorVariant="primary"
                class="me-2"
                onClick={UpdateFolderName}
                showLoadingSpinner={true}
              ></RdsButton>
            </div>
          </div>
        </div>
      </RdsOffcanvas>
      <RdsOffcanvas
        canvasTitle={t("FileManagement.Move")}
        placement="end"
        offcanvaswidth={650}
        backDrop={true}
        scrolling={false}
        preventEscapeKey={false}
        offId={"corganization"}
      >
        <div>
          <div className="">
            <RdsLabel
              label={t("FileManagement.MoveToUnder") || ""}
              size="15px"
            ></RdsLabel>
          </div>
          <div className="mt-1 p-2 border">
            <RdsIconLabel
              icon="home"
              label="All Files"
              size="small"
              fill={false}
              iconposition="left"
            />
          </div>
          <div className="border-bottom mb-3 mt-4 pb-1 pb-2">
            <RdsLabel label={t("Folder Name") || ""} size="14px">
              <RdsIcon name={"up"} height="12px" width="12px" stroke={true} />

              <RdsIcon name={"down"} height="12px" width="12px" stroke={true} />
            </RdsLabel>
          </div>
          <RdsCompFileMover
            items={directories}
            path={setFolderPath}
            selectedItemId={directories[0].id}
          ></RdsCompFileMover>
          <div className="pb-3 d-flex flex-column-reverse flex-lg-row flex-md-column-reverse flex-xl-row flex-xxl-row me-3 footer-buttons gap-2">
            <RdsButton
              label={t("AbpUi.Cancel") || ""}
              databsdismiss="offcanvas"
              type={"button"}
              size="small"
              isOutline={true}
              colorVariant="primary"
              class="me-2"
            ></RdsButton>
            <RdsButton
              label={t("FileManagement.Move") || ""}
              type={"button"}
              size="small"
              databsdismiss="offcanvas"
              colorVariant="primary"
              class="me-2"
              showLoadingSpinner={true}
              onClick={folderMover}
            ></RdsButton>
          </div>
        </div>
      </RdsOffcanvas>
      <RdsCompAlertPopup
        alertID={"deleteTreeNode"}
        onSuccess={onDeleteFolder}
      />
      <RdsCompAlertPopup
        alertID={"DeleteFile"}
        onSuccess={handleDeleteDirectorySuccess}
      />
    </div>
  );
};

export default FileManagement;
