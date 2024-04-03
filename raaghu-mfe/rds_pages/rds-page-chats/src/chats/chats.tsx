import React, { useState, useEffect, useRef, useCallback } from "react";
import {
    useAppSelector,
    useAppDispatch,
} from "../../../../libs/state-management/hooks";
import {
    FetchContacts,
    FetchConversation,
    postConversationSendMessage
} from "../../../../libs/state-management/chats/chats-slice";
import { RdsButton, RdsCheckbox, RdsIcon, RdsSearch, RdsTextArea } from "../../../rds-elements";
import { useTranslation } from "react-i18next";

const Chats = () => {
    const iconForIllustration = localStorage.getItem("theme") || " light";
    const [activeUser, setActiveUser] = useState<any>(null)
    const [inputValue, setInputValue] = useState('');
    const [timeoutId, setTimeoutId] = useState<any>(null);
    const [enteredText, setEnteredText] = useState("");
    const [isSendOnEnter, setIsSendOnEnter] = useState(true)
    const [contacts, setContacts] = useState<any>({
        current: [],
        preExist: [],
        other: []
    })
    const containerRef = useRef<HTMLDivElement>(null);
    const { t } = useTranslation();
    const chatsData = useAppSelector((state) => state.persistedReducer.chats) as any;
    const [hasPrintedOthersHeader, setHasPrintedOthersHeader] = useState(false);

    console.log("chatsData from api -", chatsData.conversation.messages);
    console.log("active user -", activeUser);

    const messagesEndRef = React.useRef<null | HTMLDivElement>(null);

    React.useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ block: "end", behavior: "auto" });
        }
    }, [chatsData.conversation.messages]);


    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(FetchContacts({
            filter: "",
            includeOtherContacts: false
        }) as any);
    }, []);

    useEffect(() => {
        if (inputValue !== "") {
            const preExist = chatsData?.contacts.filter((contactFromApi: any) =>
                contacts.current.some((contact: any) => contact.userId === contactFromApi.userId)
            )
            const other = chatsData?.contacts.filter((contactFromApi: any) =>
                !preExist.some((contact: any) => contact.userId === contactFromApi.userId)
            );
            setContacts({ ...contacts, preExist: preExist, other: other })
        } else {
            setContacts({ ...contacts, current: chatsData?.contacts })
        }
    }, [chatsData?.contacts])

    const handleMsgType = (e: any) => {
        setEnteredText(e.target.value);
    };

    useEffect(() => {
        const data = {
            targetUserId: activeUser?.userId, skipCount: 0, maxResultCount: 50
        }
        dispatch(FetchConversation(data) as any)
    }, [activeUser])

    const handleSendMsg = () => {
        dispatch(postConversationSendMessage({ message: enteredText, targetUserId: activeUser?.userId }) as any).then(() => {
            dispatch(FetchConversation({ targetUserId: activeUser?.userId, skipCount: 0, maxResultCount: 50 }) as any)
        })
        setEnteredText("");
    }

    const handlerSendOnEnter = () => {
        setIsSendOnEnter(!isSendOnEnter)
    }
    const handleEnterKeyDown = (e: any) => {
        if (e.keyCode == 13 && e.shiftKey == false && isSendOnEnter) {
            e.preventDefault();
            handleSendMsg();
        }
    };

    useEffect(() => {
        if (chatsData.contacts.some((contact: any) => contact.lastMessageSide !== 1)) {
            setHasPrintedOthersHeader(true);
        } else {
            setHasPrintedOthersHeader(false);
        }
    }, [chatsData.contacts]);

    const handleSearch = (value: any) => {
        if (value !== "") {
            dispatch(FetchContacts({
                filter: value,
                includeOtherContacts: true
            }) as any);
        } else {
            dispatch(FetchContacts({
                filter: value,
                includeOtherContacts: false
            }) as any);
        }
    };

    const handleChange = (event: any) => {
        const value = event.target.value;
        setInputValue(value);

        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        const newTimeoutId = setTimeout(() => {
            handleSearch(value);
        }, 300);

        setTimeoutId(newTimeoutId);
    };

    const handlerClickContact = (userName: any, userSurname: any) => {
        setActiveUser({ name: userName, surname: userSurname })
    }
    const formatDate = (date: Date) => {
        const currentDate = new Date();

        if (
            date.getDate() === currentDate.getDate() &&
            date.getMonth() === currentDate.getMonth() &&
            date.getFullYear() === currentDate.getFullYear()
        ) {
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        } else {
            const day = date.getDate();
            const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(date);
            return `${day} ${month}`;
        }
    };

    return (
        <div>
            <div className="container-fuild p-0 m-0">
                <div className="row">
                    <div className="col-xxl-4 col-xl-4 col-12 mb-xxl-0 mb-xl-0 mb-4">
                        <div className="card card-full-stretch py-4 rounded-0 border-0" >
                            <div className="card-body">
                                <div className="px-4 mb-4">
                                    <RdsSearch
                                        placeholder={t("Search Contacts" || "")}
                                        size={"small"}
                                        value={inputValue}
                                        onChange={handleChange}
                                    ></RdsSearch>
                                </div>
                                <div className="overflow-y-scroll px-4" style={{ height: "516px" }}>
                                    {chatsData.contacts.filter((contact: any) => contact.lastMessageSide === 1).map((contact: any, index: any) => {
                                        const lastMessageDate = new Date(contact.lastMessageDate);
                                        const formattedDate = formatDate(lastMessageDate);
                                        return (
                                            <div className="cursor-pointer pb-3" key={index} onClick={() => setActiveUser(contact)}>
                                                <div className={`d-flex justify-content-between w-100 border p-2  ${(activeUser?.userId === contact?.userId) ? "activeContact" : " inactiveContact"} contactCard`} >
                                                    <div className="d-flex align-items-center">
                                                        <div className="me-3">
                                                            <div className="position-relative">
                                                                <img
                                                                    src="./assets/profile-picture-circle.svg"
                                                                    className="avatar avatar-md rounded rounded-circle"
                                                                    alt="Profile"
                                                                />
                                                                <span className="end-0 position-absolute top-50"></span>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className={`fw-semibold fs-6  ${activeUser?.userId === contact?.userId ? "text-primary" : "text-chat"}`}
                                                                onClick={() => handlerClickContact(contact.name, contact.surname)} >
                                                                {contact.name} {contact.surname}
                                                            </div>
                                                            <small className="fw-light ">{contact.lastMessage}</small>
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <span className="fs-7">
                                                            {formattedDate}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                    }
                                    {hasPrintedOthersHeader && <div className=" bg-light rounded my-1 mx-4 mb-3 d-flex justify-content-center text-primary p-2"> OTHER CONTACTS</div>}
                                    {chatsData.contacts.filter((contact: any) => contact.lastMessageSide !== 1).map((contact: any, index: number) => {
                                        const lastMessageDate = new Date(contact.lastMessageDate);
                                        const formattedDate = formatDate(lastMessageDate);
                                        return (
                                            <div className="cursor-pointer pb-2" key={index} onClick={() => setActiveUser(contact)}>
                                                <div className={`d-flex justify-content-between w-100 border p-2  ${(activeUser?.userId === contact?.userId) ? "activeContact" : " inactiveContact"} contactCard`} >
                                                    <div className="d-flex align-items-center">
                                                        <div className="me-3">
                                                            <div className="position-relative">
                                                                <img
                                                                    src="./assets/profile-picture-circle.svg"
                                                                    className="avatar avatar-md rounded rounded-circle"
                                                                    alt="Profile"
                                                                />
                                                                <span className="end-0 position-absolute top-50"></span>
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className={`fw-semibold fs-6  ${activeUser?.userId === contact?.userId ? "text-primary" : "text-chat"}`}
                                                                onClick={() => handlerClickContact(contact.name, contact.surname)} >
                                                                {contact.name} {contact.surname}
                                                            </div>
                                                            <small className="fw-light ">{contact.lastMessage}</small>
                                                        </div>
                                                        <div>
                                                            <span className="fs-7">
                                                                {formattedDate}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xxl-8 col-xl-8 col-12 mb-xxl-0 mb-xl-0 mb-4">
                        <div className="card rounded-0 card-full-stretch px-4 border-0 p-3 justify-content-between">
                            <div className="card-body d-flex flex-column  w-100">
                                {activeUser ? (<>
                                    <div ref={containerRef} className="">
                                        <div className="d-flex border-bottom pb-2 mb-3 align-items-center ">
                                            <div className="me-3">
                                                <div className="position-relative">
                                                    <img
                                                        src="./assets/profile-picture-circle.svg"
                                                        className="avatar avatar-sm rounded rounded-circle"
                                                    ></img>
                                                    <span className="end-0 position-absolute top-50">
                                                    </span>
                                                </div>
                                            </div>
                                            <div>
                                                <div className="fw-semibold fs-6">{activeUser?.name} {activeUser?.surname} </div>
                                            </div>
                                        </div>
                                        <div className="chatArea overflow-x-hidden overflow-y-scroll">
                                            <div className="pe-2 pb-1">
                                                <div className="mb-4 ">
                                                    {chatsData.conversation.messages && [...chatsData.conversation.messages].reverse().map((item: any) => {
                                                        const lastMessageDate = new Date(item?.messageDate);
                                                        const formattedDate = formatDate(lastMessageDate);
                                                        return (
                                                            <div className="d-flex justify-content-end">
                                                                <div>
                                                                    <small
                                                                        className="mt-1 fs-6 text-end text-muted  d-flex justify-content-end">
                                                                        {formattedDate}
                                                                    </small>
                                                                    <div
                                                                        className="px-3 py-2 mb-2 my-chat-bg m-0">
                                                                        <div className="text-wrap">{item?.message}</div>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        );
                                                    })}
                                                    <div ref={messagesEndRef} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                                ) : (
                                    <div className=" col d-flex align-items-center justify-content-center flex-column">
                                        <div className="text-muted lottie-border-0 lottie-filter-0">
                                            {iconForIllustration === "light" && (
                                                <RdsIcon
                                                    height="160px"
                                                    width="200px"
                                                    fill={false}
                                                    stroke={true}
                                                    type="lottie"
                                                    colorVariant="dark"
                                                    isContinueAnimate={true}
                                                    name="youtube_colored"
                                                    isHovered
                                                    iconPath="./assets/lottie-files/outlined/dual-color/no-contact-selected-light.json"
                                                />
                                            )}
                                            {iconForIllustration === "dark" && (
                                                <RdsIcon
                                                    height="160px"
                                                    width="200px"
                                                    fill={false}
                                                    stroke={true}
                                                    type="lottie"
                                                    colorVariant="dark"
                                                    isContinueAnimate={true}
                                                    isHovered
                                                    iconPath="./assets/lottie-files/outlined/dual-color/no-contact-selected-dark.json"
                                                />
                                            )}
                                            {iconForIllustration === "semidark" && (
                                                <RdsIcon
                                                    height="160px"
                                                    width="200px"
                                                    fill={false}
                                                    stroke={true}
                                                    type="lottie"
                                                    colorVariant="dark"
                                                    isContinueAnimate={true}
                                                    isHovered
                                                    iconPath="./assets/lottie-files/outlined/dual-color/no-contact-selected-light.json"
                                                />
                                            )}
                                        </div>
                                        <h5 className="fw-normal mb-0">{t("No Contact Selected") || ""}</h5>
                                        <p className="fw-normal text-muted mt-2">
                                            {t("Search contacts from list to start the conversation") || ""}
                                        </p>
                                    </div>
                                )}
                                <div className="typeMsg px-4 py-3">
                                    <div className="w-100 me-3">
                                        <RdsTextArea placeholder={t("Type message") || ""}
                                            value={enteredText}
                                            onChange={handleMsgType}
                                            onKeyDown={activeUser ? handleEnterKeyDown : () => { }}
                                            rows={3}
                                        />
                                    </div>
                                    <div className="d-flex flex-column flex-xxl-row flex-xl-row flex-lg-row flex-md-row gap-3 justify-content-between mt-3">
                                        <RdsCheckbox label={t("Send On Enter") || ""} checked={isSendOnEnter} onChange={handlerSendOnEnter}></RdsCheckbox>
                                        <RdsButton
                                            label={t("Send") || ""}
                                            size="small"
                                            colorVariant="primary"
                                            type="button"
                                            isDisabled={!enteredText || !activeUser}
                                            onClick={handleSendMsg}
                                        ></RdsButton></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default Chats;



