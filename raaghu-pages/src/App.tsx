
import './App.css';
// import { RdsButton, RdsDatePicker } from "@waiin/raaghu-react"
import { RdsButton, RdsDatepicker, RdsInput } from "../../raaghu-elements/src";
import { RdsCompTopNavigation } from "../../raaghu-components/src";
// import '../node_modules/@waiin/raaghu-react/dist/style.css'


function App() {
  return (
    
    
    <div className="app-container">
        <div className="top-navigation">
        <RdsCompTopNavigation
  brandLogo="https://picsum.photos/seed/picsum/1200/600"
  brandName="Raaghu"
  languageLabel="Language"  // ✅ Added missing prop
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
  toggleItems={[  // ✅ Added missing prop
    {
      icon: 'menu',
      label: 'Toggle Menu',
      action: () => console.log('Toggle menu clicked')
    }
  ]}
  elementList={[]}  // ✅ Added missing prop
  componentsList={[]}  // ✅ Added missing prop
/>
        </div>

     
      <RdsDatepicker id="" title="Select Date" type="default" isDropdownOpen/>
      <RdsInput id="" inputType="text" label="Country" labelPosition="top" placeholder="Where are you going ?" required showIcon size="medium" value=""/>

      <h1>Welcome  Raaghu UI in Vite</h1>
      <div id="btn-1">
      

      </div>
      <RdsButton colorVariant="primary" label="Get 50% Discount" size="large" />

    </div>
  );
}

export default App;
