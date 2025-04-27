import Navbar from "../components/Navbar";
import Match from "../components/Match";
import { useState, useEffect } from "react";
import { supabase } from "../client";

function Homepage({token}) {

  const [profiles, setProfiles] = useState([]);

  async function fetchProfiles() {
    const { data, error } = await supabase.from("profiles").select("*");

    if (error) console.error(error);
    else setProfiles(data);
  }

  useEffect(() => {
    fetchProfiles();
  }, []);

  return (
    
    <div className="homepage-container">

        <Navbar />

        <h3>Welcome back, {token.user.user_metadata.full_name}</h3>

        <h3>Your Matches</h3>
        <div className="matches">
        {profiles
          .filter(profile => profile.id !== token.user.id)
          .map(profile => (
            <Match key={profile.id} profile={profile}/>
          ))
        }
      </div> 

    </div>
  )
}

export default Homepage