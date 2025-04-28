Description:
Hack-a-Match is an AI-powered matchmaker used for individuals participating in hackathons. The purpose of this webapp is to help participants find teammates by matching them based on education, biographies, skills, preferred team roles, and hackathons they will be participating in. The AI generates a match score, allowing users to discover the best potential teammates for upcoming hackathons.

Tech Stack:
- Frontend: React + Vite
- Backend: Node.js
- Database and Authentication: Supabase
- AI: OpenAI API
- Design: Figma, Bolt.new for CSS generation

Project Setup:
Database:
  Supabase was used to store authentication and profile information. Profile data includes:
  - id (uuid) - unique identifier for each user
  - skills (text[]) - a list of user's technical skills
  - roles (text[]) - a list of preferred roles
  - bio (text) - a custom bio for users
  - hackathons (text[]) - a list of hackathons the user will be participating in
  - education (text) - user's current education status
  - full_name (text) - user's name, connected to authentication for display purposes
  - created_at (timestamp) - timestamp when the profile was created

Frontend and UI:
  React was used to build the frontend and Vite was used to bundle teh application for a fast development process. For UI, I designed it in Figma, and then used Bolt.new to generate the CSS for those designs.

AI Implemtation:
  OpenAI API was used to handle the AI logic. The purpose of the AI is to generate a match score between users based on profile data. The score will then be displayed on the Match cards, which is seen on the Homepage. User data gets fetched from the Supabase database, and then is sent to the OpenAI API for comparison. The AI will provide a numerical match score.

Backend Logic and Authentication:
  Supabase Auth was used for user authentication, allowing for secure login and profile management. Profiles are dynamically updated, allowing users to edit their information as they desire.

Technical Decisions:
Supabase:
  Supabase was chosen for its ease-of-use. It made it very simple to implement Authentication and data storage for users.

React + Vite:
  This was chosen for frontend development due to React's flexibility and Vite's fast build process

OpenAI API:
  OpenAI API was used for its capabilities in NLP and generating match scores. I decided to use this API since I have never used it previously and wanted to expand my skillset.

Bolt.new for CSS:
  This was used to make UI implementation quicker.

AI Assistance:
  Whenever I encountered implementation issues (example, AI integration, backend set-up, etc.), I used AI tools to generate code and assist in debugging. AI was used for UI integration, ensuring back-end logic was secure, and was overall very helpful in debugging my code. 
