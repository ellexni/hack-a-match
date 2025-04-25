import { useState } from 'react'
import { supabase } from '../client'
import { Link } from 'react-router-dom'

function SignUp() {

  const [formData,setFormData] = useState({
    fullName:'',email:'',password:''
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
      const { data, error } = await supabase.auth.signUp(
        {
          email: formData.email,
          password: formData.password,
          options: {
            data: {
              full_name: formData.fullName,
            }
          }
        }
      )
      if (error) throw error
      alert('Check your email for verification link')

    } catch (error) {
      alert(error)
    }
    
  }

  return (
    <div>


      <form onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <input 
          placeholder='Fullname'
          name='fullName'
          onChange={handleChange}
        />

        <input 
          placeholder='Email'
          name='email'
          onChange={handleChange}
        />

        <input
          placeholder='Password' 
          name='password'
          type='password'
          onChange={handleChange}
        />

        <button type='submit'>
          Submit
        </button>
        <p>Already have an account?  <Link to='/'>Login</Link></p>
      </form>
      
    </div>
  )
}

export default SignUp
