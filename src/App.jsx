import { useEffect, useState } from 'react'
import { SignUp, Login } from './pages'
import { Route, Routes } from 'react-router-dom'
import "./App.css"

function App() {

  const [token, setToken] = useState(false)

  if (token) {
    sessionStorage.setItem('token', JSON.stringify(token))
  }

  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      let data = JSON.parse(sessionStorage.getItem('token'))
      setToken(data)
    }

  }, [])

  return (
    <div>
      <Routes>
        <Route path={'/signup'} element={<SignUp />}/>
        <Route path={'/'} element={<Login setToken={setToken}/>}/>
      </Routes>
    </div>
  )
}

export default App
