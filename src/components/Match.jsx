function Match({ profile, score }) {
    return (
        <div className="match-card">
            <h2 className="match-name">{profile.full_name}</h2>

            <label className="match-label">Education</label>
            <p className="match-info">{profile.education || "No education added"}</p>

            <label className="match-label">Skills</label>
            <p className="match-info">
                {Array.isArray(profile.skills) && profile.skills.length > 0 ? profile.skills.join(", ") : "No skills added"}
            </p>

            <label className="match-label">Preferred Roles</label>
            <p className="match-info">
                {Array.isArray(profile.roles) && profile.roles.length > 0 ? profile.roles.join(", ") : "No preferred roles added"}
            </p>

            <label className="match-label">Participating in</label>
            <p className="match-info">
                {Array.isArray(profile.hackathons) && profile.hackathons.length > 0 ? profile.hackathons.join(", ") : "No hackathons added"}
            </p>

            {/* Display match score */}
            <label className="match-label">Match Score</label>
            <p className="match-info">{score || "Loading score..."}</p>
        </div>
    );
}


export default Match;