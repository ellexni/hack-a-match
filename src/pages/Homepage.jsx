import Navbar from "../components/Navbar";
import Match from "../components/Match";
import { useState, useEffect } from "react";
import { supabase } from "../../backend/client";

function Homepage({ token }) {
  const [profiles, setProfiles] = useState([]);
  const [matchScores, setMatchScores] = useState([]);

  async function fetchProfiles() {
    const { data, error } = await supabase.from("profiles").select("*");
    if (error) console.error(error);
    else setProfiles(data);
  }

  useEffect(() => {
    fetchProfiles();
  }, []);

  // AI Logic
  useEffect(() => {
    if (profiles.length > 0) {
      const myProfile = token.user.user_metadata;
      
      const generatedPrompts = profiles
        .filter(profile => profile.id !== token.user.id)
        .map(profile => {
          return `Current user:
            Name: ${myProfile.full_name}
            Education: ${myProfile.education}
            Skills: ${myProfile.skills?.join(", ") || "No skills listed"}
            Preferred Roles: ${myProfile.roles?.join(", ") || "No roles listed"}
            Hackathons Participating: ${myProfile.hackathons?.join(", ") || "No hackathons listed"}

            Compare against:
            Name: ${profile.full_name}
            Education: ${profile.education}
            Skills: ${profile.skills?.join(", ") || "No skills listed"}
            Preferred Roles: ${profile.roles?.join(", ") || "No roles listed"}
            Hackathons Participating: ${profile.hackathons?.join(", ") || "No hackathons listed"}

            Scoring Criteria:
- Skills overlap: up to 40 points (e.g., 1 shared = ~10 pts, 2+ shared = 30–40)
- Hackathon participation overlap: up to 30 points (e.g., 1 match = 15 pts, 2 = 30)
- Similar education: up to 20 points (same university = full points)
- Preferred roles: award 10 points **only if roles are different**
- If a category is blank or missing, it scores **0 for that category**, but does **not** cancel other scores.
- Do not give benefit of the doubt. Be strict, but fair.

Question: How good of a hackathon team match is ${profile.full_name} for ${myProfile.full_name}? Respond with just a number between 0-100.`;
        });

      
        const generateMatchScores = async () => {
          try {
            const responses = await Promise.all(
              generatedPrompts.map(async (prompt) => {
                const res = await fetch("http://localhost:3001/api/match", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({ prompt }),
                });
        
                const data = await res.json();
                return data.response;  // This is the generated match score
              })
            );
            setMatchScores(responses);
          } catch (error) {
            console.error("Error fetching match scores:", error);
          }
        };
        

      generateMatchScores();  
    }
  }, [profiles, token]);

  return (
    <div className="homepage-container">
      <Navbar />
      <h3>Welcome back, {token.user.user_metadata.full_name}</h3>
      <h3>Your Matches</h3>
      <div className="matches">
        {profiles
          .filter(profile => profile.id !== token.user.id)
          .map((profile, index) => (
            <Match key={profile.id} profile={profile} score={matchScores[index]} />
          ))}
      </div>
    </div>
  );
}

export default Homepage;
