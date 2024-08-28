// import React, { useEffect, useState } from "react";
// import { RdsInput, RdsTextArea } from "../../rds-elements";
// import { use } from "i18next";

// interface FormsProps {
//     id: string;
//     handleDataChanges: (data:any) => void;
//     capturerData: any;
//     // capturerData: {
//     //     bugId: number;
//     //     email: string;
//     //     title: string;
//     //     description?: string | null;
//     //     captureDateTime: string;
//     //     consoleError?: string | null;
//     // };
// }

// const Forms: React.FC<FormsProps> = (props) => {

//     const [capturerData, setCapturerData] = useState(props.capturerData);

//     useEffect(() => {
//         setCapturerData(props.capturerData);
//     }, [capturerData]);
//     const handleDataChanges = (value: any, key: string) => {
//         setCapturerData({ ...capturerData, [key]: value });
//         // setFormData({...capturerData, [key]: value});
//     };

//     const emitData = (data)=>{
//        props.handleDataChanges && props.handleDataChanges(data);
//     };

//     const renderFormFields = () => {
//         switch (props.id) {
//         case "reportIssue":
//             return (
//                 <>
//                     <RdsInput
//                         name="bugTitle"
//                         id="bugTitle"
//                         placeholder="Login Issue"
//                         label="Issue"
//                         customClasses="no-blur mb-3"
//                         inputType="text"
//                         onChange={(e) => handleDataChanges(e.target.value, "bugTitle")}
//                         value={capturerData?.title}
//                         required={true}
//                         labelPosition="top"
//                         dataTestId="bugTitle"
//                         size="medium"
//                     />
//                     <div className="mb-3">
//                         <RdsTextArea
//                             id="bugDescription"
//                             placeholder="I am facing issue regarding..."
//                             label="Describe the issue"
//                             isRequired={false}
//                             readonly={false}
//                             labelPosition="top"
//                             value={capturerData?.description}
//                             dataTestId="description"
//                             onChange={(e) => handleDataChanges(e.target.value, "description")}
//                         />
//                     </div>
//                     <RdsInput
//                         name="email"
//                         id="bugReportersEmail"
//                         placeholder="john.doe@gmail.com"
//                         label="Email"
//                         customClasses="no-blur"
//                         inputType="email"
//                         onChange={(e) => handleDataChanges(e.target.value, "email")}
//                         value={capturerData?.email}
//                         required={true}
//                         labelPosition="top"
//                         dataTestId="email"
//                         size="medium"
//                         validatonPattern={/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i}
//                         validationMsg="Please Enter Valid Email Address."
//                     />
//                 </>
//             );
//         default:
//             return (
//                 <>
//                     <RdsInput
//                         name={`${props.id}Email`}
//                         id={`${props.id}Email`}
//                         placeholder="john.doe@gmail.com"
//                         label="Email"
//                         customClasses="no-blur"
//                         inputType="email"
//                         onChange={(e) => handleDataChanges(e.target.value, "email")}
//                         value={capturerData?.email}
//                         required={true}
//                         labelPosition="top"
//                         dataTestId="email"
//                         size="medium"
//                         validatonPattern={/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i}
//                         validationMsg="Please Enter Valid Email Address."
//                     />
//                     <RdsInput
//                         name={`${props.id}Title`}
//                         id={`${props.id}Title`}
//                         placeholder={props.id === "featureRequest" ? "Video recording feature" : "New feature in the latest update!"}
//                         label={props.id === "featureRequest" ? "Feature" : "Message"}
//                         customClasses="no-blur"
//                         inputType="text"
//                         onChange={(e) => handleDataChanges(e.target.value, "bugTitle")}
//                         value={capturerData?.title}
//                         required={true}
//                         labelPosition="top"
//                         dataTestId={`${props.id}Title`}
//                         size="medium"
//                     />
//                     <RdsTextArea
//                         id={`${props.id}Description`}
//                         placeholder={props.id === "featureRequest" ? "I would like to have a feature that..." : "I am very pleased with the new feature..."}
//                         label={props.id === "featureRequest" ? "Feature description" : "Message description"}
//                         isRequired={false}
//                         readonly={false}
//                         labelPosition="top"
//                         value={capturerData?.description}
//                         dataTestId={`${props.id}Description`}
//                         onChange={(e) => handleDataChanges(e.target.value, "description")}
//                     />
//                 </>
//             );
//         }
//     };

//     return (
//         <div className="text-start mb-1">
//             {renderFormFields()}
//         </div>
//     );
// };

// export default Forms;