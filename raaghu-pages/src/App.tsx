import "./App.css";
import {
  RdsButton,
  RdsDatepicker,
  RdsInput,
  RdsCard,
  RdsCarousel,
} from "../../raaghu-elements/src";
import { RdsCompTopNavigation } from "../../raaghu-components/src";
function App() {
  return (
    <div className="app-container">
      {" "}
      <div
        style={{
          position: "absolute",
          width: "450px",
          top: "426px",
          left: "972px",
        }}
      >
        {" "}
        <RdsCard
          borderColor=""
          cardText=""
          cardTitle="Card Title"
          cardSubTitle="Card Subtitle"
          showTitle
          showSubTitle
          colorVariant="primary"
          imageUrl="https://picsum.photos/seed/picsum/1200/600"
          isImage
          showFooter
        />{" "}
      </div>{" "}
      <div
        style={{
          position: "absolute",
          width: "450px",
          top: "426px",
          left: "22px",
        }}
      >
        {" "}
        <RdsCard
          borderColor=""
          cardText=""
          cardTitle="Card Title"
          cardSubTitle="Card Subtitle"
          showTitle
          showSubTitle
          colorVariant="primary"
          imageUrl="https://picsum.photos/seed/picsum/1200/600"
          isImage
          showFooter
        />{" "}
      </div>{" "}
      <div
        style={{
          position: "absolute",
          width: "450px",
          top: "426px",
          left: "497px",
        }}
      >
        {" "}
        <RdsCard
          borderColor=""
          cardText=""
          cardTitle="Card Title"
          cardSubTitle="Card Subtitle"
          showTitle
          showSubTitle
          colorVariant="primary"
          imageUrl="https://picsum.photos/seed/picsum/1200/600"
          isImage
          showFooter
        />{" "}
      </div>{" "}
      <div style={{ position: "absolute", top: "876px", left: "1240px" }}>
        {" "}
        <RdsButton
          colorVariant="success"
          label="Save Details"
          size="medium"
        />{" "}
      </div>{" "}
      <div
        style={{
          position: "absolute",
          top: "846px",
          left: "22px",
          width: "450px",
        }}
      >
        {" "}
        <RdsInput
          id=""
          inputType="text"
          label="Name"
          labelPosition="top"
          placeholder="Enter Your Name"
          showIcon
          size="medium"
          value=""
        />{" "}
      </div>{" "}
      <div
        style={{
          position: "absolute",
          top: "846px",
          left: "488px",
          width: "718px",
        }}
      >
        {" "}
        <RdsDatepicker
          showTitle
          title="Birthdate"
          type="default"
          isDropdownOpen
          placeholder="Enter Your Birthdate"
        />{" "}
      </div>{" "}
      <div
        style={{
          position: "absolute",
          height: "262px",
          width: "450px",
          top: "90px",
          left: "22px",
        }}
      >
        {" "}
        <RdsCarousel
          Indicators
          carouselItems={[
            {
              id: 1,
              imgUrl:
                "https://cdn.londonandpartners.com/visit/london-organisations/tower-bridge/86830-640x360-tower-bridge-640.jpg",
              name: "Sam Smith",
              roleName: "Product Manager",
              subTitle:
                "Nulla metus metus ullamcorper vel tincidunt set euismod nibh quisque volutpat condimentum veilt class patent taciti sociosqu and litara ad litora torquent per conubia nastra.",
            },
            {
              id: 2,
              imgUrl:
                "https://cdn.londonandpartners.com/-/media/images/london/visit/things-to-do/sightseeing/london-attractions/coca-cola-london-eye/the-london-eye-2-640x360.jpg?mw=640&hash=F7D574072DAD523443450DF57E3B91530064E4EE",
              name: "king John",
              roleName: "Tech Lead",
              subTitle:
                "this is the caption section were u can add the caption for the image",
            },
          ]}
          controls
          crossFade
          role="style1"
        />{" "}
      </div>{" "}
      <div
        style={{
          position: "absolute",
          height: "262px",
          width: "450px",
          top: "90px",
          left: "975px",
        }}
      >
        {" "}
        <RdsCarousel
          Indicators
          carouselItems={[
            {
              id: 1,
              imgUrl:
                "https://cdn.londonandpartners.com/visit/london-organisations/tower-bridge/86830-640x360-tower-bridge-640.jpg",
              name: "Sam Smith",
              roleName: "Product Manager",
              subTitle:
                "Nulla metus metus ullamcorper vel tincidunt set euismod nibh quisque volutpat condimentum veilt class patent taciti sociosqu and litara ad litora torquent per conubia nastra.",
            },
            {
              id: 2,
              imgUrl:
                "https://cdn.londonandpartners.com/-/media/images/london/visit/things-to-do/sightseeing/london-attractions/coca-cola-london-eye/the-london-eye-2-640x360.jpg?mw=640&hash=F7D574072DAD523443450DF57E3B91530064E4EE",
              name: "king John",
              roleName: "Tech Lead",
              subTitle:
                "this is the caption section were u can add the caption for the image",
            },
          ]}
          controls
          crossFade
          role="style1"
        />{" "}
      </div>{" "}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "52px",
          backgroundColor: "white",
          zIndex: 1000,
          boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        {" "}
        <RdsCompTopNavigation
          brandLogo="https://picsum.photos/seed/picsum/1200/600"
          brandName="Raaghu"
          languageLabel="Language"
          languageItems={[
            {
              icon: "us",
              iconHeight: "20px",
              iconWidth: "20px",
              label: "EN(US)",
              val: "en",
            },
            {
              icon: "in",
              iconHeight: "20px",
              iconWidth: "20px",
              label: "English(IND)",
              val: "en",
            },
            {
              icon: "us",
              iconHeight: "20px",
              iconWidth: "20px",
              label: "French",
              val: "fr",
            },
          ]}
          logo="https://picsum.photos/seed/picsum/1200/600"
          navbarSubTitle="Statistics and reports"
          navbarTitle="Dashboard"
          notifications={[
            {
              selected: false,
              state: 1,
              status: "success",
              time: "a month ago",
              title: "Tenant added",
              urlTitle: "hello",
              userNotificationId: 0,
            },
            {
              selected: false,
              state: 1,
              status: "error",
              time: "a month ago",
              title: "Tenant deleted",
              urlTitle: "hello",
              userNotificationId: 1,
            },
            {
              selected: false,
              state: 1,
              status: "warn",
              time: "a month ago",
              title: "Tenant added warn",
              urlTitle: "hello",
              userNotificationId: 2,
            },
            {
              selected: false,
              state: 1,
              status: "info",
              time: "a month ago",
              title: "Tenant deleted info",
              urlTitle: "hello",
              userNotificationId: 3,
            },
          ]}
          profileEmail="john.doe@raaghu.io"
          profileName="John Doe"
          profileTitle="John Doe"
          themeItems={[
            {
              icon: "sun",
              iconHeight: "20px",
              iconWidth: "20px",
              label: "Light",
              val: "light",
            },
            {
              icon: "moon",
              iconHeight: "20px",
              iconWidth: "20px",
              label: "Dark",
              val: "dark",
            },
          ]}
          toggleItems={[
            {
              icon: "menu",
              label: "Toggle Menu",
              action: () => console.log("Toggle menu clicked"),
            },
          ]}
          elementList={[]}
          componentsList={[]}
          themeLabel=""
          onForgotPassword={function (isForgotPasswordClicked?: boolean): void {
            throw new Error("Function not implemented.");
          }}
          onProfileLinkTopNav={function (
            id: string,
            navigateTo?: string,
            label?: string
          ): void {
            throw new Error("Function not implemented.");
          }}
        />{" "}
      </div>{" "}
    </div>
  );
}
export default App;

// import "./App.css";
// import {
//   RdsButton,
//   RdsDatepicker,
//   RdsInput,
//   RdsCard,
//   RdsCarousel,
// } from "../../raaghu-elements/src";
// import { RdsCompTopNavigation } from "../../raaghu-components/src";
// function App() {
//   return (
//     <div className="app-container">
//       {" "}
//       {/* Top Navigation Bar */}{" "}
//       <div
//         style={{
//           position: "absolute",
//           top: 0,
//           left: 0,
//           width: "100%",
//           height: "52px",
//           backgroundColor: "white",
//           zIndex: 100,
//           boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
//         }}
//       >
//         {" "}
//         <RdsCompTopNavigation
//           brandLogo="https://picsum.photos/seed/picsum/1200/600"
//           brandName="Raaghu"
//           languageLabel="Language"
//           languageItems={[
//             {
//               icon: "us",
//               iconHeight: "20px",
//               iconWidth: "20px",
//               label: "EN(US)",
//               val: "en",
//             },
//             {
//               icon: "in",
//               iconHeight: "20px",
//               iconWidth: "20px",
//               label: "English(IND)",
//               val: "en",
//             },
//             {
//               icon: "us",
//               iconHeight: "20px",
//               iconWidth: "20px",
//               label: "French",
//               val: "fr",
//             },
//           ]}
//           logo="https://picsum.photos/seed/picsum/1200/600"
//           navbarSubTitle="Statistics and reports"
//           navbarTitle="Dashboard"
//           notifications={[
//             {
//               selected: false,
//               state: 1,
//               status: "success",
//               time: "a month ago",
//               title: "Tenant added",
//               urlTitle: "hello",
//               userNotificationId: 0,
//             },
//             {
//               selected: false,
//               state: 1,
//               status: "error",
//               time: "a month ago",
//               title: "Tenant deleted",
//               urlTitle: "hello",
//               userNotificationId: 1,
//             },
//             {
//               selected: false,
//               state: 1,
//               status: "warn",
//               time: "a month ago",
//               title: "Tenant added warn",
//               urlTitle: "hello",
//               userNotificationId: 2,
//             },
//             {
//               selected: false,
//               state: 1,
//               status: "info",
//               time: "a month ago",
//               title: "Tenant deleted info",
//               urlTitle: "hello",
//               userNotificationId: 3,
//             },
//           ]}
//           profileEmail="john.doe@raaghu.io"
//           profileName="John Doe"
//           profileTitle="John Doe"
//           themeItems={[
//             {
//               icon: "sun",
//               iconHeight: "20px",
//               iconWidth: "20px",
//               label: "Light",
//               val: "light",
//             },
//             {
//               icon: "moon",
//               iconHeight: "20px",
//               iconWidth: "20px",
//               label: "Dark",
//               val: "dark",
//             },
//           ]}
//           toggleItems={[
//             {
//               icon: "menu",
//               label: "Toggle Menu",
//               action: () => console.log("Toggle menu clicked"),
//             },
//           ]}
//           elementList={[]}
//           componentsList={[]}
//           themeLabel=""
//           onForgotPassword={function (isForgotPasswordClicked?: boolean): void {
//             throw new Error("Function not implemented.");
//           }}
//           onProfileLinkTopNav={function (
//             id: string,
//             navigateTo?: string,
//             label?: string
//           ): void {
//             throw new Error("Function not implemented.");
//           }}
//         />{" "}
//       </div>{" "}
//       {/* Carousel */}{" "}
//       <div
//         style={{
//           position: "absolute",
//           top: "90px",
//           left: "22px",
//           width: "450px",
//         }}
//       >
//         {" "}
//         <RdsCarousel
//           Indicators
//           carouselItems={[
//             {
//               id: 1,
//               imgUrl:
//                 "https://cdn.londonandpartners.com/visit/london-organisations/tower-bridge/86830-640x360-tower-bridge-640.jpg",
//               name: "Sam Smith",
//               roleName: "Product Manager",
//               subTitle:
//                 "Nulla metus metus ullamcorper vel tincidunt set euismod nibh quisque volutpat condimentum veilt class patent taciti sociosqu and litara ad litora torquent per conubia nastra.",
//             },
//             {
//               id: 2,
//               imgUrl:
//                 "https://cdn.londonandpartners.com/-/media/images/london/visit/things-to-do/sightseeing/london-attractions/coca-cola-london-eye/the-london-eye-2-640x360.jpg?mw=640&hash=F7D574072DAD523443450DF57E3B91530064E4EE",
//               name: "king John",
//               roleName: "Tech Lead",
//               subTitle:
//                 "this is the caption section were u can add the caption for the image",
//             },
//           ]}
//           controls
//           crossFade
//           role="style1"
//         />{" "}
//       </div>{" "}
//       {/* Carousel */}{" "}
//       <div
//         style={{
//           position: "absolute",
//           top: "90px",
//           left: "975px",
//           width: "450px",
//         }}
//       >
//         {" "}
//         <RdsCarousel
//           Indicators
//           carouselItems={[
//             {
//               id: 1,
//               imgUrl:
//                 "https://cdn.londonandpartners.com/visit/london-organisations/tower-bridge/86830-640x360-tower-bridge-640.jpg",
//               name: "Sam Smith",
//               roleName: "Product Manager",
//               subTitle:
//                 "Nulla metus metus ullamcorper vel tincidunt set euismod nibh quisque volutpat condimentum veilt class patent taciti sociosqu and litara ad litora torquent per conubia nastra.",
//             },
//             {
//               id: 2,
//               imgUrl:
//                 "https://cdn.londonandpartners.com/-/media/images/london/visit/things-to-do/sightseeing/london-attractions/coca-cola-london-eye/the-london-eye-2-640x360.jpg?mw=640&hash=F7D574072DAD523443450DF57E3B91530064E4EE",
//               name: "king John",
//               roleName: "Tech Lead",
//               subTitle:
//                 "this is the caption section were u can add the caption for the image",
//             },
//           ]}
//           controls
//           crossFade
//           role="style1"
//         />{" "}
//       </div>{" "}
//       {/* Card 1 */}{" "}
//       <div
//         style={{
//           position: "absolute",
//           top: "426px",
//           left: "22px",
//           width: "450px",
//         }}
//       >
//         {" "}
//         <RdsCard
//           borderColor=""
//           cardText=""
//           cardTitle="Card Title"
//           cardSubTitle="Card Subtitle"
//           showTitle
//           showSubTitle
//           colorVariant="primary"
//           imageUrl="https://picsum.photos/seed/picsum/1200/600"
//           isImage
//           showFooter
//         />{" "}
//       </div>{" "}
//       {/* Card 2 */}{" "}
//       <div
//         style={{
//           position: "absolute",
//           top: "426px",
//           left: "497px",
//           width: "450px",
//         }}
//       >
//         {" "}
//         <RdsCard
//           borderColor=""
//           cardText=""
//           cardTitle="Card Title"
//           cardSubTitle="Card Subtitle"
//           showTitle
//           showSubTitle
//           colorVariant="primary"
//           imageUrl="https://picsum.photos/seed/picsum/1200/600"
//           isImage
//           showFooter
//         />{" "}
//       </div>{" "}
//       {/* Card 3 */}{" "}
//       <div
//         style={{
//           position: "absolute",
//           top: "426px",
//           left: "972px",
//           width: "450px",
//         }}
//       >
//         {" "}
//         <RdsCard
//           borderColor=""
//           cardText=""
//           cardTitle="Card Title"
//           cardSubTitle="Card Subtitle"
//           showTitle
//           showSubTitle
//           colorVariant="primary"
//           imageUrl="https://picsum.photos/seed/picsum/1200/600"
//           isImage
//           showFooter
//         />{" "}
//       </div>{" "}
//       {/* Input */}{" "}
//       <div
//         style={{
//           position: "absolute",
//           top: "846px",
//           left: "22px",
//           width: "450px",
//         }}
//       >
//         {" "}
//         <RdsInput
//           id=""
//           inputType="text"
//           label="Name"
//           labelPosition="top"
//           placeholder="Enter Your Name"
//           showIcon
//           size="medium"
//           value=""
//         />{" "}
//       </div>{" "}
//       {/* DatePicker */}{" "}
//       <div
//         style={{
//           position: "absolute",
//           top: "846px",
//           left: "488px",
//           width: "718px",
//         }}
//       >
//         {" "}
//         <RdsDatepicker
//           showTitle
//           title="Birthdate"
//           type="default"
//           isDropdownOpen
//         />{" "}
//       </div>{" "}
//       {/* Button */}{" "}
//       <div
//         style={{
//           position: "absolute",
//           top: "876px",
//           left: "1240px",
//           width: "98px",
//         }}
//       >
//         {" "}
//         <RdsButton
//           colorVariant="success"
//           label="Save Details"
//           size="medium"
//         />{" "}
//       </div>{" "}
//     </div>
//   );
// }
// export default App;

// import './App.css';
// import { RdsButton, RdsDatepicker, RdsInput, RdsCard, RdsCarousel } from "../../raaghu-elements/src";
// import { RdsCompTopNavigation } from "../../raaghu-components/src";

// function App() {
//   return (
//     <div className="app-container">
//       {/* Top Navigation */}
//       {/* <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '52px', backgroundColor: 'white', zIndex: 100, boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
//         <RdsCompTopNavigation
//           brandLogo="https://picsum.photos/seed/picsum/1200/600"
//           brandName="Raaghu"
//           languageLabel="Language"
//           languageItems={[
//             { icon: 'us', iconHeight: '20px', iconWidth: '20px', label: 'EN(US)', val: 'en' },
//             { icon: 'in', iconHeight: '20px', iconWidth: '20px', label: 'English(IND)', val: 'en' },
//             { icon: 'us', iconHeight: '20px', iconWidth: '20px', label: 'French', val: 'fr' }
//           ]}
//           navbarSubTitle="Statistics and reports"
//           navbarTitle="Dashboard"
//           notifications={[
//             { selected: false, state: 1, status: 'success', time: 'a month ago', title: 'Tenant added', urlTitle: 'hello', userNotificationId: 0 },
//             { selected: false, state: 1, status: 'error', time: 'a month ago', title: 'Tenant deleted', urlTitle: 'hello', userNotificationId: 1 }
//           ]}
//           profileEmail="john.doe@raaghu.io"
//           profileName="John Doe"
//           profileTitle="John Doe"
//         />
//       </div> */}

//       {/* Cards */}
//       {[22, 497, 972].map((left, index) => (
//         <div key={index} style={{ position: 'absolute', top: '426px', left: `${left}px`, width: '450px' }}>
//           <RdsCard
//             borderColor=''
//             cardText=''
//             cardTitle='Card Title'
//             cardSubTitle='Card Subtitle'
//             showTitle
//             showSubTitle
//             colorVariant='primary'
//             imageUrl='https://picsum.photos/seed/picsum/1200/600'
//             isImage
//             showFooter
//           />
//         </div>
//       ))}

//       {/* Input Fields & Buttons */}
//       <div style={{ position: 'absolute', top: '846px', left: '22px', width: '450px' }}>
//         <RdsInput id='' inputType='text' label='Name' labelPosition='top' placeholder='Enter Your Name' showIcon size='medium' value='' />
//       </div>
//       <div style={{ position: 'absolute', top: '846px', left: '488px', width: '350px' }}>
//         <RdsDatepicker showTitle title='From Date' type='default' isDropdownOpen />
//       </div>
//       <div style={{ position: 'absolute', top: '844px', left: '854px', width: '350px' }}>
//         <RdsDatepicker showTitle title='To Date' type='default' isDropdownOpen />
//       </div>
//       <div style={{ position: 'absolute', top: '876px', left: '1220px', width: '98px' }}>
//         <RdsButton colorVariant='success' label='Save Details' size='medium' />
//       </div>

//       {/* Carousels */}
//       {[22, 500, 975].map((left, index) => (
//         <div key={index} className={`card-${index + 1}`} style={{ position: 'absolute', height: '100px', width: '30%', top: '90px', left: `${left}px`, zIndex: 1000 }}>
//           <RdsCarousel
//             Indicators
//             carouselItems={[
//               { id: 1, imgUrl: 'https://cdn.londonandpartners.com/visit/london-organisations/tower-bridge/86830-640x360-tower-bridge-640.jpg', name: 'Sam Smith', roleName: 'Product Manager', subTitle: 'Short description' },
//               { id: 2, imgUrl: 'https://cdn.londonandpartners.com/-/media/images/london/visit/things-to-do/sightseeing/london-attractions/coca-cola-london-eye/the-london-eye-2-640x360.jpg?mw=640&hash=F7D574072DAD523443450DF57E3B91530064E4EE', name: 'King John', roleName: 'Tech Lead', subTitle: 'Caption section' }
//             ]}
//             controls
//             crossFade
//             role='style1'
//           />
//         </div>
//       ))}
//     </div>
//   );
// }

// export default App;

// import './App.css';
// import { RdsButton, RdsDatepicker, RdsInput, RdsCard, RdsCarousel } from "../../raaghu-elements/src";
// import { RdsCompTopNavigation } from "../../raaghu-components/src";

// function App() {
//   return (
//     <div className="app-container">
//       {/* Top Navigation Bar */}
//       <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '52px', backgroundColor: 'white', zIndex: 100, boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)' }}>
//         <RdsCompTopNavigation
//           brandLogo="https://picsum.photos/seed/picsum/1200/600"
//           brandName="Raaghu"
//           languageLabel="Language"
//           languageItems={[
//             { icon: 'us', iconHeight: '20px', iconWidth: '20px', label: 'EN(US)', val: 'en' },
//             { icon: 'in', iconHeight: '20px', iconWidth: '20px', label: 'English(IND)', val: 'en' },
//             { icon: 'us', iconHeight: '20px', iconWidth: '20px', label: 'French', val: 'fr' }
//           ]}
//           logo="https://picsum.photos/seed/picsum/1200/600"
//           navbarSubTitle="Statistics and reports"
//           navbarTitle="Dashboard"
//           notifications={[
//             { selected: false, state: 1, status: 'success', time: 'a month ago', title: 'Tenant added', urlTitle: 'hello', userNotificationId: 0 },
//             { selected: false, state: 1, status: 'error', time: 'a month ago', title: 'Tenant deleted', urlTitle: 'hello', userNotificationId: 1 },
//             { selected: false, state: 1, status: 'warn', time: 'a month ago', title: 'Tenant added warn', urlTitle: 'hello', userNotificationId: 2 },
//             { selected: false, state: 1, status: 'info', time: 'a month ago', title: 'Tenant deleted info', urlTitle: 'hello', userNotificationId: 3 }
//           ]}
//           profileEmail="john.doe@raaghu.io"
//           profileName="John Doe"
//           profileTitle="John Doe"
//           themeItems={[
//             { icon: 'sun', iconHeight: '20px', iconWidth: '20px', label: 'Light', val: 'light' },
//             { icon: 'moon', iconHeight: '20px', iconWidth: '20px', label: 'Dark', val: 'dark' }
//           ]}
//           toggleItems={[{ icon: 'menu', label: 'Toggle Menu', action: () => console.log('Toggle menu clicked') }]}
//           elementList={[]}
//           componentsList={[]}
//           themeLabel=""
//           onForgotPassword={function (isForgotPasswordClicked?: boolean): void { throw new Error('Function not implemented.'); }}
//           onProfileLinkTopNav={function (id: string, navigateTo?: string, label?: string): void { throw new Error('Function not implemented.'); }}
//         />
//       </div>

//       {/* Input Field */}
//       <div style={{ position: 'absolute', top: '305px', left: '62px', width: '400px' }}>
//         <RdsInput
//           id=''
//           inputType='text'
//           label='Country'
//           labelPosition='top'
//           placeholder='Where are you going ?'
//           showIcon
//           size='medium'
//           value=''
//         />
//       </div>

//       {/* Date Picker */}
//       <div style={{ position: 'absolute', top: '305px', left: '901px', width: '250px' }}>
//         <RdsDatepicker
//           showTitle
//           title='Date'
//           type='default'
//           isDropdownOpen
//         />
//       </div>

//       {/* Submit Button */}
//       <div style={{ position: 'absolute', top: '329px', left: '1196px' }}>
//         <RdsButton
//           colorVariant='primary'
//           label='SUBMIT'
//           size='large'
//         />
//       </div>

//       {/* Discount Button */}
//       <div style={{ position: 'absolute', top: '61px', left: '1212px' }}>
//         <RdsButton
//           colorVariant='primary'
//           label='Get 50% Discount'
//           size='large'
//         />
//       </div>

//       {/* Card 1 */}
//       <div style={{ position: 'absolute', width: '400px', top: '556px', left: '40px' }}>
//         <RdsCard
//           borderColor=''
//           cardText=''
//           cardTitle='Card Title'
//           cardSubTitle='Card Subtitle'
//           showTitle
//           showSubTitle
//           colorVariant='primary'
//           imageUrl='https://picsum.photos/seed/picsum/1200/600'
//           isImage
//           showFooter
//         />
//       </div>

//       {/* Card 2 */}
//       <div style={{ position: 'absolute', width: '400px', top: '556px', left: '988px' }}>
//         <RdsCard
//           borderColor=''
//           cardText=''
//           cardTitle='Card Title'
//           cardSubTitle='Card Subtitle'
//           showTitle
//           showSubTitle
//           colorVariant='primary'
//           imageUrl='https://picsum.photos/seed/picsum/1200/600'
//           isImage
//           showFooter
//         />
//       </div>

//       {/* Carousel */}
//       <div className='card-2' style={{ position: 'absolute', height: '100px', width: '30%', top: '505px', left: '513px', zIndex: 1000 }}>
//         <RdsCarousel
//           Indicators
//           carouselItems={[
//             {
//               id: 1,
//               imgUrl: 'https://cdn.londonandpartners.com/visit/london-organisations/tower-bridge/86830-640x360-tower-bridge-640.jpg',
//               name: 'Sam Smith',
//               roleName: 'Product Manager',
//               subTitle: 'Nulla metus metus ullamcorper vel tincidunt set euismod nibh quisque volutpat condimentum veilt class patent taciti sociosqu and litara ad litora torquent per conubia nastra.'
//             },
//             {
//               id: 2,
//               imgUrl: 'https://cdn.londonandpartners.com/-/media/images/london/visit/things-to-do/sightseeing/london-attractions/coca-cola-london-eye/the-london-eye-2-640x360.jpg?mw=640&hash=F7D574072DAD523443450DF57E3B91530064E4EE',
//               name: 'king John',
//               roleName: 'Tech Lead',
//               subTitle: 'this is the caption section were u can add the caption for the image'
//             }
//           ]}
//           controls
//           crossFade
//           role='style1'
//         />
//       </div>

//       {/* Background Rectangles */}

//     </div>
//   );
// }

// export default App;
