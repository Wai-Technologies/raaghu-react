import React, { Suspense, useEffect, useState } from "react";
import "./rds-comp-elements.css";
import { RdsLabel, RdsIcon } from "../rds-elements";
import code_snippet from "./code_snippet";

export interface RdsCompElementsProps { }

const RdsCompElements = (props: any) => {
   const [codeSnippet, setCodeSnippet] = useState<any>({
      code: "",
      name: ""
   });

   const [show, setShow] = useState<boolean>(false);

   const ComponentElement = React.lazy(
      () => import("./elements/" + props.type + ".tsx")
   );

   useEffect(() => {
      const filteredSnippets = code_snippet.filter((snippet) =>
         snippet.hasOwnProperty(props.type)
      );
      const value = Object.values(filteredSnippets[0])[0];
      const name = Object.values(filteredSnippets[0])[1];
      setCodeSnippet({ ...codeSnippet, code: value, name: name });
   }, [props.type]);

   const copy_click = (text: any) => {
      setShow(true);
      navigator.clipboard.writeText(text);
   };

   const setChildCode = (message: any) => {
   };

   return (
      <>
         <div className="card p-2 border-0 rounded-0 mt-4 vh-88">
            <div className="card-header">
               <h5>
                  <RdsLabel>
                     {" "}
                     <span className="text-capitalize">{codeSnippet.name}</span>{" "}
                  </RdsLabel>
               </h5>
            </div>
            <div className="card-body pt-0">
               <div className="row">
                  <div className="col-lg-6 col-md-6 col-xs-12 mb-3 mt-2">
                     <RdsLabel>Preview</RdsLabel>
                     <div className="mb-4 mt-3">
                        <Suspense fallback={<div>Page is Loading...</div>}>
                           <ComponentElement
                              onChange={(event: any) => setChildCode(event)}
                           />
                        </Suspense>
                     </div>
                  </div>
                  <div className="col-md-6">
                     <RdsLabel>Code</RdsLabel>
                     <div className="bg-light mt-4 p-4 rounded-4 pb-0">
                        <span className="float-end cursor-pointer">
                           {show ? (
                              <RdsIcon
                                 name="check"
                                 width="12px"
                                 height="12px"
                                 colorVariant="primary"
                                 fill={false}
                                 stroke={true}
                              ></RdsIcon>
                           ) : (
                              <RdsIcon
                                 name="clipboard"
                                 width="17px"
                                 height="17px"
                                 fill={false}
                                 stroke={true}
                                 onClick={() => copy_click(codeSnippet.code)}
                              ></RdsIcon>
                           )}
                        </span>
                        <pre className="bg-light language-html">
                           <code className="language-html">
                              {ComponentElement.name}
                              {codeSnippet.code}
                           </code>
                        </pre>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </>
   );
};

export default RdsCompElements;