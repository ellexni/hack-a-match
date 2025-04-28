import { useState } from 'react'
import { supabase } from '../../backend/client'
import { Link, useNavigate } from 'react-router-dom'

function Login({setToken}) {

    let navigate = useNavigate()

  const [formData,setFormData] = useState({
    email:'',password:''
  })

  console.log(formData)

  function handleChange(event) {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [event.target.name]:event.target.value
      }
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    try {
        const { data, error } = await supabase.auth.signInWithPassword({
            email: formData.email,
            password: formData.password,
          })
      if (error) throw error
      console.log(data)
      setToken(data)
      navigate('/homepage')

    } catch (error) {
      alert(error)
    }
    
  }

  return (
    <div className="auth-form-container">

      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Login</h2>

        <label className="login-label">Email</label>
        <input 
          placeholder='Email'
          name='email'
          onChange={handleChange}
        />

      <label className="login-label">Password</label>  
        <input
          placeholder='Password' 
          name='password'
          type='password'
          onChange={handleChange}
        />

        <button type='submit'>
          Submit
        </button>
        <p>Don't have an account?<Link to='/signup'> Signup</Link></p>

      </form>
      
    </div>
  )
}

export default Login
