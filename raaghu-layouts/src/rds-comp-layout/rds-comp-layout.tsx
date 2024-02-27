import React, { ReactNode, useState } from "react";
import "./rds-comp-layout.css";
export interface RdsCompLayoutProps {
  displayType?: string;
  children?: ReactNode;
  //withShell?: boolean;
}

const RdsCompLayout = (props: RdsCompLayoutProps) => {
    return (
     <div className='layout1 p-3'>
             {/* <div className='row'>
               <div className='col-md-12 shell-header'>
                 <h1></h1>
               </div>
             </div>
             <div className='row'>
               <div className='col-md-2 left vh-100'></div>
               <div className='col-md-10'> */}
                 <div>
                   <div className="row">
                {props.children}
                </div>
              </div>
            </div>
        //   </div>
        // </div>

//          <>
//       {!props.withShell && (
//         <div className="layout">
//           <div className="container">
//             <div className="row">
//               {props.children}
//             </div>
//           </div>
//         </div>
//       )}
//       {props.withShell && (
//         <div className="layout">
//           <div className="container">
//             <div className="row">
//               <div className="col-md-12 shell-header">
//                 <h1></h1>
//               </div>
//             </div>
//             <div className="row">
//               <div className="col-md-2 left"></div>
//               <div className="col-md-10">
//                 <div className="container">
//                   <div className="row">
//                     {props.children}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
// </> 

      )
  };

export default RdsCompLayout;
