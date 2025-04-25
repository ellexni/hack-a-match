import { supabase } from "../client";
import { useState, useEffect } from "react";

function Modal({ token, closeModal }) {
    const [info, setInfo] = useState({});
    const [formData, setFormData] = useState({});
    const [showRolesDropdown, setShowRolesDropdown] = useState(false);
    const [showHackathonsDropdown, setShowHackathonsDropdown] = useState(false);
    const [showSkillsDropdown, setShowSkillsDropdown] = useState(false);
    
    
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

        useEffect(() => {
            fetchInfo();
        }, [token]);
        
    
    function handleChange(e) {
        const { name, value } = e.target;
        setFormData((prev) => ({
          ...prev,
          [name]: value
        }));
    }

    function handleSelectChange(field, value) {
        setFormData((prev) => {
            const currentValues = prev[field] || [];
            const updatedValues = currentValues.includes(value)
                ? currentValues.filter(v => v !== value)
                : [...currentValues, value];
            
            return {
                ...prev,
                [field]: updatedValues
            };
        });
    }

    function convertIfArrayField(fieldName, value) {
        const arrayFields = ["skills", "roles", "hackathons"];
        if (arrayFields.includes(fieldName)) {
            if (typeof value === "string") {
                return value
                    .split(",")
                    .map((s) => s.trim())
                    .filter((s) => s.length > 0);
            }
            return value; // If it's already an array, return it as is
        }
        return value;
    }

    async function handleSubmit(e) {
        e.preventDefault();
    
        console.log("Submitting form data:", formData);
        console.log("Original profile info:", info);
    
        const updates = {};
        for (let key in formData) {
            if (formData[key] !== info[key]) {
                updates[key] = convertIfArrayField(key, formData[key]);
            }
        }
    
        console.log("Updates prepared:", updates);
    
        if (Object.keys(updates).length === 0) {
            alert("No changes to update.");
            return;
        }
    
        // Check if token and user.id are available
        console.log("User ID:", token?.user?.id);
    
        const { error } = await supabase
            .from("profiles")
            .update(updates)
            .eq("id", token.user.id);
    
        if (error) {
            console.error("Error updating profile:", error);
        } else {
            alert("Profile updated!");
            closeModal(); // Close modal on success
            
            
        }
    }

    const roles = [
        "Back-end Developer",
        "Front-end Developer",
        "AI/ML Engineer",
        "Researcher"
    ];

    const hackathons = [
        "Hack the North",
        "Hack Canada",
        "AI Engineer Hackathon"
    ];

    const skills = [
        "React",
        "Python",
        "C++",
        "JavaScript",
        "HTML",
        "CSS",
        "AI/ML"
    ]

    return (
        <div className="modal-container" onClick={(e) => {if (e.target.className === "modal-container") closeModal()}}>
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
                    <div className="custom-select">
                        <div 
                            className="select-display"
                            onClick={() => setShowSkillsDropdown(!showSkillsDropdown)}
                        >
                            {formData.skills?.length 
                                ? formData.skills.join(", ") 
                                : "Select skills"}
                        </div>
                        {showSkillsDropdown && (
                            <div className="select-dropdown">
                                {skills.map(skill => (
                                    <div 
                                        key={skill}
                                        className={`select-option ${formData.skills?.includes(skill) ? 'selected' : ''}`}
                                        onClick={() => handleSelectChange('skills', skill)}
                                    >
                                        {skill}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <label className="login-label">Preferred Roles</label>
                    <div className="custom-select">
                        <div 
                            className="select-display"
                            onClick={() => setShowRolesDropdown(!showRolesDropdown)}
                        >
                            {formData.roles?.length 
                                ? formData.roles.join(", ") 
                                : "Select roles"}
                        </div>
                        {showRolesDropdown && (
                            <div className="select-dropdown">
                                {roles.map(role => (
                                    <div 
                                        key={role}
                                        className={`select-option ${formData.roles?.includes(role) ? 'selected' : ''}`}
                                        onClick={() => handleSelectChange('roles', role)}
                                    >
                                        {role}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <label className="login-label">Participating in</label>
                    <div className="custom-select">
                        <div 
                            className="select-display"
                            onClick={() => setShowHackathonsDropdown(!showHackathonsDropdown)}
                        >
                            {formData.hackathons?.length 
                                ? formData.hackathons.join(", ") 
                                : "Select hackathons"}
                        </div>
                        {showHackathonsDropdown && (
                            <div className="select-dropdown">
                                {hackathons.map(hackathon => (
                                    <div 
                                        key={hackathon}
                                        className={`select-option ${formData.hackathons?.includes(hackathon) ? 'selected' : ''}`}
                                        onClick={() => handleSelectChange('hackathons', hackathon)}
                                    >
                                        {hackathon}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Modal;