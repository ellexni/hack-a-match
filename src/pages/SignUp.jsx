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
      
      const user = data.user;
      if (user) {
        const { error: insertError } = await supabase.from("profiles").insert([
          {
            id: user.id,
            bio: "",
            education: "",
            skills: [],
            roles: [],
            hackathons: [],
          }
        ]);
        if (insertError) {
          console.error("Insert profile error:", insertError);
        } else {
          console.log("Profile created.");
        }
      }
  
      alert('Check your email for verification link')

    } catch (error) {
      alert(error)
    }
    
  }

  return (
    <div className="auth-form-container">


      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <label className="login-label">Name</label>
        <input 
          placeholder='Fullname'
          name='fullName'
          onChange={handleChange}
        />
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
        <p>Already have an account?  <Link to='/'>Login</Link></p>
      </form>
      
    </div>
  )
}

export default SignUp
