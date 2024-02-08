// import React from "react";
// import RdsCompLayout from "./rds-comp-layout"; 

// export default {
//   title: "Layout",
//   component: RdsCompLayout,
//   argTypes: {
//     displayType: {
//       control: {
//         type: 'select',
//         options: ['layout1', 'layout2', 'layout3']
//       },
//       defaultValue: 'layout1'
//     }
//   }
// };

// export const Layout1 = (args) => <RdsCompLayout {...args} />;
// Layout1.args = {
//   displayType: 'layout1',
// };

// export const Layout2 = (args) => <RdsCompLayout {...args} />;
// Layout2.args = {
//   displayType: 'layout2',
// };

// export const Layout3 = (args) => <RdsCompLayout {...args} />;
// Layout3.args = {
//   displayType: 'layout3',
// };































// import React from "react";
// import RdsCompLayout from "./rds-comp-layout";
// import RdsCompLayoutItem from "./rds-comp-layout-item";


// export default {
//   title: "Layout",
//   component: RdsCompLayout,
//   argTypes: {
//     displayType: {
//       control: {
//         type: 'select',
//         options: ['layout1', 'layout2', 'layout3', 'layout4']
//       },
//       defaultValue: 'layout1'
//     }
//   }
// };

// export const Layout1 = (args) => (
//   <RdsCompLayout {...args}>
//     <RdsCompLayoutItem title="Main Content">
//     <div className='col-md-12'>
//       <div className="content">
//       </div>
//     </div>
//     </RdsCompLayoutItem>
//   </RdsCompLayout>
// );
// Layout1.args = {
//   displayType: 'layout1',
// };

// export const Layout2 = (args) => (
//   <RdsCompLayout {...args}>
//     <RdsCompLayoutItem title="Main Content">
//     <div className="row">
//               <div className="col-md-4 content"></div>
//               <div className="col-md-4 content"></div>
//               <div className="col-md-4 content"></div>
//             </div>
//             <div className="row">
//               <div className="content"></div>
//             </div>
//     </RdsCompLayoutItem>
//   </RdsCompLayout>
// );
// Layout2.args = {
//   displayType: 'layout2',
// };

// export const Layout3 = (args) => (
//   <RdsCompLayout {...args}>
//     <RdsCompLayoutItem title="Main Content">
//     <div className="row">
//               <div className="col-md-12 content"></div>
//             </div>
//             <div className="row">
//               <div className="col-md-4 content"></div>
//               <div className="col-md-4 content"></div>
//               <div className="col-md-4 content"></div>
//             </div>
//             <div className="row">
//               <div className="col-md-12 content"></div>
//             </div>
//     </RdsCompLayoutItem>
//   </RdsCompLayout>
// );
// Layout3.args = {
//   displayType: 'layout3',
// };

// export const Layout4 = (args) => (
//   <RdsCompLayout {...args}>
//     <RdsCompLayoutItem title="Main Content">
//     <div className="row">
//               <div className="col-xl-6 col-lg-12 col-md-12 content"></div>
//               <div className="col-xl-3 col-lg-6 col-md-12 content"></div>
//               <div className="col-xl-3 col-lg-6 col-md-12 content"></div>
//             </div>
//             <div className="row">
//               <div className="col-md-12 col-lg-12 col-xl-6">
//                 <div className="row">
//                   <div className="col-md-6 content"></div>
//                   <div className="col-md-6 content"></div>
//                 </div>
//               </div>
//               <div className="col-md-12 col-lg-12 col-xl-6 content"></div>
//             </div>
//             <div className="row">
//               <div className="col-md-12 content"></div>
//             </div>
//     </RdsCompLayoutItem>
//   </RdsCompLayout>
// );
// Layout4.args = {
//   displayType: 'layout4',
// };



import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";
import RdsCompLayout from "./rds-comp-layout";
import RdsCompLayoutItem from "./rds-comp-layout-item";

export default {
    title: "Layout",
    component: RdsCompLayout,
    argTypes: {
      displayType: {
        control: {
          type: 'select',
          options: ['layout1', 'layout2', 'layout3', 'layout4']
        },
        defaultValue: 'layout1'
      }
    }
} as ComponentMeta<typeof RdsCompLayout>;

const Template: ComponentStory<typeof RdsCompLayout> = (args) => (
    <RdsCompLayout {...args} />
);


export const Layout1 = Template.bind({});
Layout1.args = {
  displayType: 'layout1',
  withShell: true,
 children: (
    <>
      <RdsCompLayoutItem title={""}>
        <div className="col-md-12">
          <div className="content-with-full-height"></div>
        </div>
      </RdsCompLayoutItem>
    </>
  ),
};

export const Layout2 = Template.bind({});
Layout2.args = {
  displayType: 'layout2',
  withShell: true,
 children: (
    <>
      <RdsCompLayoutItem title={""}>
        {/* <div className="row">
          <div className="col-md-4 content-with-small-height"></div>
          <div className="col-md-4 content-with-small-height"></div>
          <div className="col-md-4 content-with-small-height"></div>
        </div>
        <div className="row">
          <div className="content-with-full-height"></div>
        </div> */}
        <div className="grid-container-3">
          <div className=" content-with-small-height"></div>
          <div className=" content-with-small-height"></div>
          <div className=" content-with-small-height"></div>
        </div>
        <div className="grid-container-1">
          <div className="content-with-full-height"></div>
        </div>
      </RdsCompLayoutItem>
    </>
  ),
};


export const Layout3 = Template.bind({});
Layout3.args = {
  displayType: 'layout3',
  withShell: true,
 children: (
    <>
      <RdsCompLayoutItem title={""}>
      {/* <div className="row">
             <div className="col-md-12 content-with-small-height"></div>
           </div>
           <div className="row">
             <div className="col-md-4 content-with-small-height"></div>
             <div className="col-md-4 content-with-small-height"></div>
             <div className="col-md-4 content-with-small-height"></div>
           </div>
           <div className="row">
             <div className="col-md-12 content-with-full-height"></div>
           </div> */}

<div className="grid-container-1">
             <div className="content-with-small-height"></div>
           </div>
           <div className="grid-container-3">
             <div className="content-with-small-height"></div>
             <div className="content-with-small-height"></div>
             <div className="content-with-small-height"></div>
           </div>
           <div className="grid-container-1">
             <div className="content-with-full-height"></div>
           </div>
      </RdsCompLayoutItem>
    </>
  ),
};


export const Layout4 = Template.bind({});
Layout4.args = {
 displayType: 'layout4',
 withShell: true,
 children: (
    <>
      <RdsCompLayoutItem title={""}>
      {/* <div className="row">
             <div className="col-xl-6 col-lg-12 col-md-12 content-with-small-height"></div>
             <div className="col-xl-3 col-lg-6 col-md-12 content-with-small-height"></div>
             <div className="col-xl-3 col-lg-6 col-md-12 content-with-small-height"></div>
           </div>
           <div className="row">
             <div className="col-md-12 col-lg-12 col-xl-6">
               <div className="row">
                 <div className="col-md-6 content-with-medium-height"></div>
                 <div className="col-md-6 content-with-medium-height"></div>
               </div>
             </div>
             <div className="col-md-12 col-lg-12 col-xl-6 content-with-medium-height"></div>
           </div>
           <div className="row">
             <div className="col-md-12 content-with-medium-height"></div>
           </div> */}

<div className="grid-container-5">
             <div className="content-with-small-height"></div>
             <div className="content-with-small-height"></div>
             <div className="content-with-small-height"></div>
           </div>
           <div className="grid-container-6">
             {/* <div className="col-md-12 col-lg-12 col-xl-6">
               <div className="row"> */}
                 <div className="content-with-medium-height"></div>
                 <div className="content-with-medium-height"></div>
               {/* </div>
             </div> */}
             <div className="content-with-medium-height"></div>
           </div>
           <div className="grid-container-1">
             <div className="col-md-12 content-with-medium-height"></div>
           </div>

           
      </RdsCompLayoutItem>
    </>
  ),
};


