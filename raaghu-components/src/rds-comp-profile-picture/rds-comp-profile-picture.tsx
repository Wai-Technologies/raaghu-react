import React, { useState, useEffect } from "react";
import { RdsButton, RdsFileUploader, RdsRadioButton } from "../rds-elements";
import { useTranslation } from "react-i18next";

interface RdsCompProfilePictureProps { }


const RdsCompProfilePicture = (props: any) => {

  const profileList = [
    {
      checked: true,
      id: 0,
      label: "Use Default",
      name: "radio_button",
      type: 0,
    },
    {
      checked: false,
      id: 1,
      label: "Use Gravatar",
      name: "radio_button",
      type: 1,
    },
    {
      checked: false,
      id: 2,
      label: "Upload Files",
      name: "radio_button",
      type: 2,
    },
  ];
  const [avatarImg, setAvatarImg] = useState<any>(props.profilePictureData);
  const [type, setavatarType] = useState(0);
  const [show, setShow] = useState<boolean>(false);
  const [profilepicstypes, setprofilepicstypes] = useState<any>()
  const [firstload, setfirstload] = useState<number>(0);
  const [isExceed, setIsExceed] = useState(false);
  const imagePathradiobutton = "./assets/profile-picture-circle.svg"
  function profileImage(data: any) {
    setfirstload((prev) => (prev + 1))
    if (type == 2) {
      const fileSize = data.files[0].size / 1024; //now size in kb
      //validation
      if (fileSize > 1024) {
        setIsExceed(true);
      } else {
        setIsExceed(false);
      }
      props.postProfilePic(data.files[0]);
    }

  }

  useEffect(() => {
    if (props.ProfileType == 2 && firstload == 0) {
      setIsExceed(true)
    }
    if (props.ProfileType == 2) {
      setAvatarImg(props.profilePictureData);
    }
    if (props.ProfileType == 1) {
      setAvatarImg("./assets/Avatar-rds-mascot.svg");
    }
    if (props.ProfileType == 0) {
      setAvatarImg("./assets/profile-picture-circle.svg");
    }
    const profilelisttypes = profileList.map((item: any, i: any) => {
      return {
        checked: i == props.ProfileType ? true : false,
        id: i,
        label: item.label,
        name: item.name,
        type: i,
      }
    })
    if (props.ProfileType == 2 && profilelisttypes[2].checked) {
      setShow(true)
    } else {
      setShow(false)
    }

    setprofilepicstypes(profilelisttypes)



  }, [props.profilePictureData, props.ProfileType, props.profilePicture]);


  const onClickSetProfilePicture = (event: any) => {
    const selectedLabel = event.target.value;

    // Update the profilepicstypes array based on the selected label
    const updatedProfilepicstypes = profilepicstypes.map((item: any) => ({
      ...item,
      checked: item.label === selectedLabel,
    }));

    setprofilepicstypes(updatedProfilepicstypes);

    if (event.target.value == "Use Default") {
      setIsExceed(false)
      setShow(false);
      // alert(0);
      setAvatarImg("./assets/profile-picture-circle.svg");
      setavatarType(0);
      const imagePath = "./assets/profile-picture-circle.svg";

      // Create a new File object from the local file
      const file = new File([imagePath], "profile.svg", {
        type: "image/svg+xml",
      });

      props.postProfilePic(file, 0);
      setShow(false);
    } else if (event.target.value == "Use Gravatar") {
      setIsExceed(false)
      setShow(false);
      setAvatarImg("./assets/profile-picture-circle.svg");
      setavatarType(1);

      const imagePath = "./assets/Avatar-rds-mascot.svg";

      // Create a new File object from the local file
      const file = new File([imagePath], "avatar.svg", {
        type: "image/svg+xml",
      });
      props.postProfilePic(file, 1); // pass the file to the function
      setShow(false);
    } else if (event.target.value == "Upload Files") {
      setIsExceed(true)
      // alert(2);
      setavatarType(2);
      setAvatarImg(props.profilePictureData ? avatarImg : imagePathradiobutton)
      setShow(true);
    } else {
      setShow(false)
    }
  };


  const validation = [
    {
      hint: "File size should not be greater than 1 MB.",
      isError: false,
    },
  ];
  const onSaveHandler = () => {

    props.handleProfileDataSubmit(type)
  }
  return (
    <form>
      <div className="d-md-flex d-block py-4 align-items-center">
        <div className="mb-3 d-xxl-block d-xl-block d-lg-block d-md-block d-flex justify-content-center mb-xxl-0 mb-xl-0 mb-lg-0 mb-md-0 mb-4">
          <img
            src={avatarImg}
            alt={"profilePic"}
            width="120px"
            height="120px"
            className="profil_image_Class rounded-circle"
            data-testid="avatar"
            style={{ height: '-webkit-fill-available' }}
          ></img>
        </div>
        <div className="ms-md-3">
          <RdsRadioButton
            displayType="Default"
            itemList={profilepicstypes}
            onlyChecked={true}
            onChange={() => setavatarType(type)}
            onClick={onClickSetProfilePicture}
            dataTestId="radio-btn"
          />
        </div>
      </div>
      <div className="row position-relative">
        {show && (
          <>
            <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-12 mb-3 ">
              <RdsFileUploader
                colorVariant="primary"
                extensions="jpg, jpeg, png"
                multiple={false}
                placeholder=""
                size="small"
                label="Select New Image"
                limit={1}
                validation={validation}
                getFileUploaderInfo={(data: any) => profileImage(data)}
              />
            </div>
          </>
        )}
      </div>
      <div className="row">
      <div className="d-flex flex-column-reverse flex-lg-row flex-md-column-reverse flex-row flex-xl-row flex-xxl-row footer-buttons gap-2 mt-3 pb-3">
        <RdsButton
            label="Save Changes"
            colorVariant="primary"
            isDisabled={false}
            block={false}
            type="button"
            size="small"
            onClick={onSaveHandler}
            dataTestId="save"
          />
        </div></div>
    </form>
  );
};

export default RdsCompProfilePicture;
