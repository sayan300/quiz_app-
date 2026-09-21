# Quiz App — PostgreSQL + Node.js backend

## Setup
1. `npm install`
2. Create a PostgreSQL database, e.g. `createdb quiz_app`
3. Run the schema: `psql -d quiz_app -f schema.sql`
4. Copy `.env.example` to `.env` and fill in your PostgreSQL credentials
5. `npm start`
6. Open `http://localhost:3000/login.html` (create account) or `http://localhost:3000/registration.html` (sign in)

## What was added
- `server.js` — Express server with `/api/register` and `/api/login`
- `db.js` — PostgreSQL connection pool (uses `pg`)
- `schema.sql` — `users` table (id, full_name, email, password_hash, created_at)
- Passwords are hashed with bcrypt before being stored
- `login.html`/`login.js` now submit to `/api/register`
- `registration.html`/`registration.js` now submit to `/api/login`
- `index.html` (the quiz) is unchanged, served as a static file
