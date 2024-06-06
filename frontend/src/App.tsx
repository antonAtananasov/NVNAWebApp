import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

const testGet = async (setter: React.Dispatch<React.SetStateAction<string>>) => {
  const result = await fetch('http://localhost:3000/')
  const text = await result.text()
  setter(text)
}


function App() {
  const [count, setCount] = useState(0)
  const [text, setText] = useState('loading...')
  useEffect(() => {
    testGet(setText)
  })

  return (
    <>
      {/* put the BrowserRouter and Route tags here */}

      <div>
        <h1>{text}</h1>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>

      {/*  */}
    </>
  )
}

export default App
