// import React, { FC } from 'react';
// import { RdsCompLayoutWrapper } from './rds-comp-layout.styled';

// interface RdsCompLayoutProps {
//    displayType?: 'layout1' | 'layout2'| 'layout3';
// }

// const LayoutComponents: {
//   [key in RdsCompLayoutProps["displayType"]]: React.ReactNode;
// } = {
//   layout1: (
//     <div className="layout1">
//       <header>
//         <h1>Header</h1>
//       </header>
//       <div className="main">
//         <aside className="left">Sidebar</aside>
//         <main className="right">
//         <div className="container">
//           <div className="row bg-white">
//             <div className="content">Content</div>
//           </div>
//         </div>
//         </main>
//       </div>
//     </div>
//   ),
//   layout2: (
//     <div className="layout2">
//       <header>
//         <h1>Header</h1>
//       </header>
//       <div className="main">
//         <aside className="left">Sidebar</aside>
//         <main className="right">
//           <div className="container">
//             <div className="row">
//               <div className="col bg-white">Column 1</div>
//               <div className="col bg-white">Column 2</div>
//               <div className="col bg-white">Column 3</div>
//             </div>
//             <div className="row bg-white">
//               <div className="content">Content</div>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   ),
//   layout3: (
//     <div className="layout3">
//       <header>
//         <h1>Header</h1>
//       </header>
//       <div className="main">
//         <aside className="left">Sidebar</aside>
//         <main className="right">
//           <div className="container">
//             <div className="row bg-white">
//               <div className="col bg-white">Column 1</div>
//             </div>
//             <div className="row">
//               <div className="col bg-white">Column 1</div>
//               <div className="col bg-white">Column 2</div>
//               <div className="col bg-white">Column 3</div>
//             </div>
//             <div className="row bg-white">
//               <div className="content">Content</div>
//             </div>
//           </div>
//         </main>
//       </div>
//     </div>
//   ),
// };

// const RdsCompLayout: FC<RdsCompLayoutProps> = ({ displayType = 'layout1' }) => (
//   <RdsCompLayoutWrapper>
//     {LayoutComponents[displayType]}
//   </RdsCompLayoutWrapper>
// );

// export default RdsCompLayout;




// import React, { FC } from 'react';
// import { RdsCompLayoutWrapper } from './rds-comp-layout.styled';

// interface RdsCompLayoutProps {
//    displayType?: 'layout1' | 'layout2'| 'layout3';
//    mainContent: React.ReactNode; 
// }

// const LayoutComponents: {
//   [key in RdsCompLayoutProps["displayType"]]: FC<{ mainContent: React.ReactNode }>;
// } = {
//   layout1: ({ mainContent }) => (
//     // <div className="layout1">
//     //   <header>
//     //     <h1>Header</h1>
//     //   </header>
//     //   <div className="main">
//     //     <aside className="left">Sidebar</aside>
//     //     <main className="right">
//     //       <div className="container">
//     //         <div className="row bg-white">
//     //           <div className="content">{mainContent}</div>
//     //         </div>
//     //       </div>
//     //     </main>
//     //   </div>
//     // </div>
//     <div className='layout1'>
//       <div className='row'>
//       <div className='col-md-12 shell-header'>
//         <h1></h1>
//     </div>
//     </div>
//     <div className='row'>     
//         <div className='col-md-2 left vh-100'></div>
//         <div className='col-md-10'>
//           <div className="container">
//             <div className="row">             
//                 {/* <div className='content'> */}
//                   {mainContent}
//                 {/* </div> */}
//               </div>
//             </div>
//           </div>
//       </div>
//     </div>
//   ),
//   layout2: ({ mainContent }) => (
//     // <div className="layout2">
//     //   <header>
//     //     <h1>Header</h1>
//     //   </header>
//     //   row
//     //   <div className="main">
//     //     <aside className="left">Sidebar</aside>
//     //     <main className="right">
//     //       <div className="container">
//     //         <div className="row bg-white">
//     //           <div className="content">{mainContent}</div>
//     //         </div>
//     //       </div>
//     //     </main>
//     //   </div>
//     // </div>

//     <div className='layout2'>
//       <div className='row'>
//       <div className='col-md-12 shell-header'>
//         <h1></h1>
//     </div>
//     </div>
//     <div className='row'>     
//         <div className='col-md-2 left vh-100'></div>
//         <div className='col-md-10'>
//           <div className="container">
//           <div className="row">             
//                 {/* <div className='content'> */}
//                   {mainContent}
//                 {/* </div> */}
//               </div>
//             </div>
//           </div>
//       </div>
//     </div>
//   ),
//   layout3: ({ mainContent }) => (
//     // <div className="layout3">
//     //   <header>
//     //     <h1>Header</h1>
//     //   </header>
//     //   <div className="main">
//     //     <aside className="left">Sidebar</aside>
//     //     <main className="right">
//     //       <div className="container">
//     //         <div className="row bg-white">
//     //           <div className="content">{mainContent}</div>
//     //         </div>
//     //       </div>
//     //     </main>
//     //   </div>
//     // </div>
//     <div className='layout3'>
//       <div className='row'>
//       <div className='col-md-12 shell-header'>
//         <h1></h1>
//     </div>
//     </div>
//     <div className='row'>     
//         <div className='col-md-2 left vh-100'></div>
//         <div className='col-md-10'>
//           <div className="container">
//           <div className="row">             
//                 {/* <div className='content'> */}
//                   {mainContent}
//                 {/* </div> */}
//               </div>
//             </div>
//           </div>
//       </div>
//     </div>
//   ),
// };



// const RdsCompLayout: FC<RdsCompLayoutProps> = ({ displayType = 'layout1', mainContent }) => (
//   <RdsCompLayoutWrapper>
//     {LayoutComponents[displayType]({ mainContent })}
//   </RdsCompLayoutWrapper>
// );

// export default RdsCompLayout;


// import React, { FC } from 'react';
// import { RdsCompLayoutWrapper } from './rds-comp-layout.styled';

// interface RdsCompLayoutProps {
//    displayType?: 'layout1' | 'layout2' | 'layout3' | 'layout4';
//    mainContent: React.ReactNode; 
// }


// const RdsCompLayout: FC<RdsCompLayoutProps> = ({ displayType = 'layout1', mainContent }) => {
//   return (
//     <RdsCompLayoutWrapper>
//       <div className={`layout${displayType.charAt(displayType.length - 1)}`}>
//         <div className='row'>
//           <div className='col-md-12 shell-header'>
//             <h1></h1>
//           </div>
//         </div>
//         <div className='row'>
//           <div className='col-md-2 left vh-100'></div>
//           <div className='col-md-10'>
//             <div className="container">
//               <div className="row">
//                 {mainContent}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </RdsCompLayoutWrapper>
//   );
// };

// export default RdsCompLayout;

import React, { ReactNode, useState } from "react";
import "./rds-comp-layout.css";
export interface RdsCompLayoutProps {
  displayType?: string;
  children?: ReactNode;
  withShell?: boolean;
}

const RdsCompLayout = (props: RdsCompLayoutProps) => {
    return (
      // <div className={`layout${displayType.charAt(displayType.length - 1)}`}>
      // <div className='layout1'>
      //        <div className='row'>
      //          <div className='col-md-12 shell-header'>
      //            <h1></h1>
      //          </div>
      //        </div>
      //        <div className='row'>
      //          <div className='col-md-2 left vh-100'></div>
      //          <div className='col-md-10'>
      //            <div className="container">
      //              <div className="row">
      //           {props.children}
      //           </div>
      //         </div>
      //       </div>
      //     </div>
      //   </div>
<>
      {!props.withShell && (
        <div className="layout">
          <div className="container">
            <div className="row">
              {props.children}
            </div>
          </div>
        </div>
      )}
      {props.withShell && (
        <div className="layout">
          <div className="container">
            <div className="row">
              <div className="col-md-12 shell-header">
                <h1></h1>
              </div>
            </div>
            <div className="row">
              <div className="col-md-2 left"></div>
              <div className="col-md-10">
                <div className="container">
                  <div className="row">
                    {props.children}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
</>
      )
  };

export default RdsCompLayout;
