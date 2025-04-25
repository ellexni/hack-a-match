import { supabase } from "../client";
import { useState, useEffect } from "react"

function Modal({ token }) {

    const [info, setInfo] = useState({})
    const [formData, setFormData] = useState({});
    
    useEffect(() => {
        async function fetchInfo() {
          if (!token?.user?.id) return;
    
          const { data, error } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", token.user.id)
            .single();
    
          if (error) console.error("Fetch error:", error);
          else {
            setInfo(data);
            setFormData(data);
          }
        }
    
        fetchInfo();
      }, [token]);
    
      function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({
          ...prev,
          [name]: value
        }));
      }

      function convertIfArrayField(fieldName, value) {
        const arrayFields = ["skills", "roles", "hackathons"];
        if (arrayFields.includes(fieldName)) {
          return value
            .split(",")
            .map((s) => s.trim())
            .filter((s) => s.length > 0);
        }
        return value;
      }

      async function handleSubmit(e) {
        e.preventDefault();
    
        const updates = {};
        for (let key in formData) {
          if (formData[key] !== info[key]) {
            updates[key] = convertIfArrayField(key, formData[key]);
          }
        }
    
        if (Object.keys(updates).length === 0) {
          alert("No changes to update.");
          return;
        }
    
        const { error } = await supabase
          .from("profiles")
          .update(updates)
          .eq("id", token.user.id);
    
        if (error) {
          console.error("Update error:", error);
        } else {
          alert("Profile updated!");
        }
      }
    

     return (
    <div className="modal-container">
      <div className="modal">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2>Edit Profile</h2>

          <label className="login-label">Education</label>
          <input
            name="education"
            placeholder={info.education || "Add education"}
            value={formData.education || ""}
            onChange={handleChange}
          />

          <label className="login-label">Bio</label>
          <input
            name="bio"
            placeholder={info.bio || "Add bio"}
            value={formData.bio || ""}
            onChange={handleChange}
          />

          <label className="login-label">Skills</label>
          <input
            name="skills"
            placeholder={info.skills || "Add skills"}
            value={formData.skills || ""}
            onChange={handleChange}
          />

            <label className="login-label">Preferred Roles</label>
                <select
                    name="roles"
                    multiple
                    value={formData.roles}
                    onChange={handleChange}
                >
                    <option value="Developer">Back-end Developer</option>
                    <option value="Designer">Front-end Developer</option>
                    <option value="Project Manager">AI/ML Engineer</option>
                    <option value="Tester">Researcher</option>
                </select>

            <label className="login-label">Participating in</label>
                <select
                    name="hackathons"
                    multiple
                    value={formData.hackathons}
                    onChange={handleChange}
                >
                    <option value="Hackathon 1">Hack the North</option>
                    <option value="Hackathon 2">Hack Canada</option>
                    <option value="Hackathon 3">AI Engineer Hackathon</option>
                </select>

          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default Modal;