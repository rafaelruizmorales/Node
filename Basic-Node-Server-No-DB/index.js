import express from 'express'

import userRoutes from './routes/users.js'

const app = express()
const PORT = 5000

app.use(express.json())

// With this we say all users routes are going to start with http://localhost:5000/users
app.use('/users', userRoutes)

// This is the Home page http://localhost:5000
app.get('/', (req, res) => res.send("Home page!"))

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))