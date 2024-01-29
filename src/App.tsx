
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useState } from 'react';

function App() {
  const [color, setColor] = useState()

  const handleClick = async () => {
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
    if (tab && tab.url && tab.url.startsWith('http')) {
      chrome.scripting.executeScript<any, void>({
        target: { tabId: tab.id! },
        args: [color],
        func: (color) => {
          alert("Hello from my extension");
          document.body.style.backgroundColor = color
        }
      });
    } else {
      console.log('Cannot execute script on a Chrome-specific URL or when no active tab is found.');
    }
  };

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <input type='color' onChange={(e: any) => setColor(e.target.value)} />
      <div className="card">
        <button onClick={handleClick}>
          Click Me
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
