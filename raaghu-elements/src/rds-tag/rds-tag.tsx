import React, { useState } from "react";
import RdsIcon from "../rds-icon";
import "./rds-tag.css";

export enum TagType {
    Square = "square",
    Round = "round",
  }

export enum Role {
    Basic = "basic",
    TagWithScroll = "tagWithScroll",
  }

export enum ColorVariant {
    Primary = "primary",
    Success = "success",
    Danger = "danger",
    Warning = "warning",
    Light = "light",
    Info = "info",
    Secondary = "secondary",
    Dark = "dark",
  }

export interface RdsTagProps {
    tagType: TagType;
    tagArray?: any[];
    inputText?: string;
    fillClose?: boolean;
    role: Role;
    colorVariant: ColorVariant;
}

const RdsTag = (props: RdsTagProps) => {
    const [tagAr, setTagArr] = useState<string[]>(props.tagArray || []);
    const closeFill = props.fillClose || false;
    let classes: any;
    const tagColor = "tag-" + `${props.colorVariant}`;
    const borderColor = "border border-" + `${props.colorVariant}`;
    classes = `bd-example ${tagColor} ${borderColor}`;

    if (props.tagType === TagType.Square) {
        classes = `bd-example square-tags  ${tagColor} ${borderColor}`;
    }
    if (props.tagType === TagType.Round) {
        classes = `bd-example rounded-pill  ${tagColor} ${borderColor}`;
    }

    const tagtextcolor = "text-" + `${props.colorVariant}`;

    const addTag = (e: any) => {
        if (e.key === "Enter" && e.target.value.trim() != "") {
            setTagArr([...tagAr, e.target.value]);
            e.target.value = "";
        }
    };

    const mystyle = {
        backgroundColor: props.colorVariant,
        borderRadius: "50%",
    };
    const deleteTag = (i: number) => {
        setTagArr([...tagAr.filter((tag) => tagAr.indexOf(tag) !== i)]);
    };

    return (
        <>
            <div>
                <div className="binding-tags border p-2">
                    <div className="d-flex">
                        <div className="rds-tags res-class w-100">
                            <div className=" float-left ">
                                <div
                                    className={
                                        props.role == Role.Basic
                                            ? "p-0"
                                            : "scroll-type d-block m-1 mb-2"
                                    }
                                    id="inserTag"
                                >
                                    {tagAr.map((item, i) => {
                                        return (
                                            <div
                                                className={`d-inline-block m-1 mb-2 ${classes}`}
                                                key={i}
                                            >
                                                <div
                                                    className="tags tags-dismissible align-items-center fade show tagcorners"
                                                    role="alert"
                                                    aria-live="assertive"
                                                    aria-atomic="true"
                                                >
                                                    <div className="d-flex align-items-center">
                                                        <div className={`mx-1 tags-body ${tagtextcolor}`}>
                                                            {item}
                                                        </div>
                                                        <span
                                                            onClick={() => deleteTag(i)}
                                                            //className={tagtextcolor} 
                                                            className={`cursorpointer ${tagtextcolor} `}


                                                        >
                                                            <RdsIcon
                                                                name="cancel"
                                                                fill={false}
                                                                stroke={true}
                                                                width="15"
                                                                height="15"
                                                                borderRadius={
                                                                    closeFill == true
                                                                        ? "50%"
                                                                        : "props.colorVariant"
                                                                }
                                                                colorVariant={
                                                                    closeFill == true
                                                                        ? "light"
                                                                        : props.colorVariant
                                                                }
                                                            />
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                            <span>
                                <input
                                    type="text"
                                    className="form-control form-control-sm border-0"
                                    name="inputText"
                                    onKeyUp={addTag}
                                    placeholder="+ Add Tag"
                                    aria-label="+Tag"
                                    aria-describedby="basic-addon1"
                                />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
export default RdsTag;
