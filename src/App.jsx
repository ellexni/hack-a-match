import { useEffect, useState } from 'react'
import { SignUp, Login, Homepage, Profile } from './pages'
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
        { token ? <Route path={'/homepage'} element={<Homepage token={token}/>}/> : ""}
        { token ? <Route path={'/profile'} element={<Profile token={token}/>}/> : ""}
      </Routes>
    </div>
  )
}

export default App
