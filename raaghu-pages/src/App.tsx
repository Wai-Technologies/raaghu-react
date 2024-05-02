import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  return (
    <>
      <div>
      <a href="https://raaghu.io" target="_blank">
          <img src="https://raaghustorageaccount.blob.core.windows.net/raaghu-blob/Raaghu%20Logo%20SD.svg" className="logo" alt="Raaghu Logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React Logo" />
        </a>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite Logo" />
        </a>
      </div>
      <h1>Raaghu with React + Vite</h1>
      <div className="card">
        <p>
          Start creating pages by using Application Shells, Layouts, Component, Elements, Charts and more.
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Raaghu, Vite and React Logos to learn more
      </p>
    </>
  )
}

export default App
