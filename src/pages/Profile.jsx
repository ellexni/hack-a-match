import Navbar from "../components/Navbar"
import Modal from "../components/Modal"
import { supabase } from "../client";
import { useState, useEffect } from "react"

function Profile({token}) {

    const [info, setInfo] = useState([])

    async function fetchInfo() {
        const {data, error} = await supabase.from("profiles").select("*").eq("id", id).single();

        if (error) console.error(error);
        else setInfo(data);
    }

    useEffect(() => {
        fetchInfo();
      }, [token]); 


  return (
    
    <div className="profile-container">

        <Navbar />

        <h3>{token.user.user_metadata.full_name}'s Profile Information</h3>
            <div className="profile-information">

                <label className="profile-label">Name</label>
                    <p className="profile-info">
                        {token.user.user_metadata.full_name}
                    </p>
                
                <label className="profile-label">Education</label>
                    <p className="profile-info">
                        {info?.education || "No education added"}
                    </p>
                
                <label className="profile-label">Bio</label>
                    <p className="profile-info">
                        {info?.bio || "No bio added"}
                    </p>
                
                <label className="profile-label">Skills</label>
                    <p className="profile-info">
                        {info?.skills || "No skills added"}
                    </p>
                
                <label className="profile-label">Preferred Roles</label>
                    <p className="profile-info">
                        {info?.roles || "No preferred roles added"}
                    </p>
                
                <label className="profile-label">Participating in</label>
                    <p className="profile-info">
                        {info?.hackathons || "No hackathons added"}
                    </p>

                
            </div>
        
        <button className="edit">Edit Profile</button>
        <Modal token={token}/>

    </div>
  )
}

export default Profile