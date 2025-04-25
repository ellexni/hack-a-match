import Navbar from "../components/Navbar"

function Homepage({token}) {

  return (
    
    <div className="homepage-container">

        <Navbar />

        <h3>Welcome back, {token.user.user_metadata.full_name}</h3>

    </div>
  )
}

export default Homepage