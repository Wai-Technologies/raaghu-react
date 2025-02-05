
import './App.css';
// import { RdsButton, RdsDatePicker } from "@waiin/raaghu-react"
import { RdsButton, RdsDatepicker, RdsInput,RdsCard, RdsCarousel } from "../../raaghu-elements/src";
import { RdsCompTopNavigation } from "../../raaghu-components/src";
// import '../node_modules/@waiin/raaghu-react/dist/style.css'


function App() {
  return (
    
    
<div className="app-container">
    <div className="rectangle-2"></div>
    <div className="rectangle-3"></div>
        <div className="top-navigation">
        <RdsCompTopNavigation
          brandLogo="https://picsum.photos/seed/picsum/1200/600"
          brandName="Raaghu"
          languageLabel="Language" // ✅ Added missing prop
          languageItems={[
            {
              icon: 'us',
              iconHeight: '20px',
              iconWidth: '20px',
              label: 'EN(US)',
              val: 'en'
            },
            {
              icon: 'in',
              iconHeight: '20px',
              iconWidth: '20px',
              label: 'English(IND)',
              val: 'en'
            },
            {
              icon: 'us',
              iconHeight: '20px',
              iconWidth: '20px',
              label: 'French',
              val: 'fr'
            }
          ]}
          logo="https://picsum.photos/seed/picsum/1200/600"
          navbarSubTitle="Statistics and reports"
          navbarTitle="Dashboard"
          notifications={[
            {
              selected: false,
              state: 1,
              status: 'success',
              time: 'a month ago',
              title: 'Tenant added',
              urlTitle: 'hello',
              userNotificationId: 0
            },
            {
              selected: false,
              state: 1,
              status: 'error',
              time: 'a month ago',
              title: 'Tenant deleted',
              urlTitle: 'hello',
              userNotificationId: 1
            },
            {
              selected: false,
              state: 1,
              status: 'warn',
              time: 'a month ago',
              title: 'Tenant added  warn',
              urlTitle: 'hello',
              userNotificationId: 2
            },
            {
              selected: false,
              state: 1,
              status: 'info',
              time: 'a month ago',
              title: 'Tenant deleted info',
              urlTitle: 'hello',
              userNotificationId: 3
            }
          ]}
          profileEmail="john.doe@raaghu.io"
          profileName="John Doe"
          profileTitle="John Doe"
          themeItems={[
            {
              icon: 'sun',
              iconHeight: '20px',
              iconWidth: '20px',
              label: 'Light',
              val: 'light'
            },
            {
              icon: 'moon',
              iconHeight: '20px',
              iconWidth: '20px',
              label: 'Dark',
              val: 'dark'
            }
          ]}
          toggleItems={[
            {
              icon: 'menu',
              label: 'Toggle Menu',
              action: () => console.log('Toggle menu clicked')
            }
          ]}
          elementList={[]} // ✅ Added missing prop
          componentsList={[]} // ✅ Added missing prop
          themeLabel={''} onForgotPassword={function (isForgotPasswordClicked?: boolean): void {
            throw new Error('Function not implemented.');
          } } onProfileLinkTopNav={function (id: string, navigateTo?: string, label?: string): void {
            throw new Error('Function not implemented.');
          } }  />
        </div>

    <div className='content'>
      
        <div className='input1'>
          <RdsInput id="" inputType="text" label="Country" labelPosition="top" placeholder="Where are you going ?"  showIcon size="medium" value=""/>

        </div>

      {/* <h1>Welcome  Raaghu UI in Vite</h1> */}
      <div id="btn-1">
      <RdsDatepicker showTitle title="Select Date" type="default" isDropdownOpen/>

      </div>
      <div className='btn-2'>
        <RdsButton colorVariant="primary" label="Get 50% Discount" size="large" />
      </div>
      <div className='btn-3'>
        <RdsButton colorVariant="primary" label="Submit" size="large" />
      </div>

      <div className='card-1'>
      <RdsCard
          borderColor=""
          cardText="Some quick example text to build on the card title and make up the bulk of the card's content."
          cardTitle="Card title"
          cardSubTitle='Card subtitle'
          showTitle
          showSubTitle
          colorVariant="primary"
          imageUrl="https://picsum.photos/seed/picsum/1200/600"
          isImage
          showFooter
        />
      </div>

      <div className='card-2'>
          <RdsCarousel
            Indicators
            carouselItems={[
              {
                id: 1,
                imgUrl: 'https://cdn.londonandpartners.com/visit/london-organisations/tower-bridge/86830-640x360-tower-bridge-640.jpg',
                name: 'Sam Smith',
                roleName: 'Product Manager',
                subTitle: 'Nulla metus metus ullamcorper vel tincidunt set euismod nibh quisque volutpat condimentum veilt class patent taciti sociosqu and litara ad litora torquent per conubia nastra.'
              },
              {
                id: 2,
                imgUrl: 'https://cdn.londonandpartners.com/-/media/images/london/visit/things-to-do/sightseeing/london-attractions/coca-cola-london-eye/the-london-eye-2-640x360.jpg?mw=640&hash=F7D574072DAD523443450DF57E3B91530064E4EE',
                name: 'king John',
                roleName: 'Tech Lead',
                subTitle: 'this is the caption section were u can add the caption for the image'
              }
            ]}
            controls
            crossFade
            role="style1"
          />
      </div>

    </div>
</div>
  );
}

export default App;
