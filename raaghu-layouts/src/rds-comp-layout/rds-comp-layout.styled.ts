import styled from 'styled-components';

export const RdsCompLayoutWrapper = styled.div`
  * {
    margin: 5px;
    box-sizing: border-box;
  }

  body {
    height: 95vh;
    background-color: lightgray;
    font-family: Arial, sans-serif;
    text-align: center;
    color: white;
    font-size: 24px;
    display: flex;
    flex-direction: column;
  }

  header {
    background-color: #b7d0d8;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;
    width: 100%;
    font-size: 30px;
    font-family: ui-sans-serif;
    text-align: center;
  }

  .main {
    display: flex;
    flex: 1;
    margin-top: 44px; 
  }

  .left {
    background-color: #bcc1da;
    padding: 3em 0 3em 0;
    flex: 2;
    position: fixed;
    top: 60px;
    bottom: 0;
    left: 0px;
    overflow-y: auto;
    width: 210px;
    text-align: center;
    display: flex;
    font-size: 30px;
    font-family: ui-sans-serif;
    justify-content: center;
    align-items: center;
  }

  main {
    background-color: #c6c6c657;
    //padding: 3em 0 3em 0;
    padding: 1em;
    flex: 8;
    margin-left: 200px; /* Width of fixed sidebar */
  }

  /* Custom styling for main content areas */
  .main-content1 {
    background-color: lightblue;
  }

  .main-content2 {
    background-color: lightgreen;
  }

  .main-content3 {
    background-color: lightcoral;
  }

  @media all and (max-width: 550px) {
    .main {
      flex-direction: column;
    }
    main {
      padding: 5em 0 5em 0;
    }
    .left {
      position: static; /* Reset position for small screens */
      flex: auto;
      margin-top: 0;
    }
  }






  .container {
    display: flex;
    flex-direction: column;
  }
  
  .row {
    display: flex;
  }
  
  .col {
    flex-grow: 1;
    padding: 10px;
    height: 100px;
    text-align: center;
    font-size: 30px;
    font-family: ui-sans-serif;
  }

  .content{
    flex-grow: 1;
    padding: 10px;
    height: 100vh;
    text-align: center;
    font-size: 30px;
    font-family: ui-sans-serif;
  }
  
  .bg-white {
    background-color: #fff;
  }
  
  @media (max-width: 768px) {
    .row {
      flex-direction: column;
    }
  }
  
`;
