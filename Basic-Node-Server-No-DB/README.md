## Simple Node API with Express (No DB)

- This application is divided into 3 different parts:

    - ## Index

    In de index file we create the express server
    
    ```javascript
        import express from 'express'

        import userRoutes from './routes/users.js'

        const app = express()
        const PORT = 5000

        app.use(express.json())

        ...

        app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
    ```

    And define de Routes

    ```javascript
        import { 
            getAllUsers,
            getUserById,
            createUser,
            deleteUserById,
            updateUserById
        } from '../controllers/users.js'

        // With this we say all users routes are going to start with http://localhost:5000/users
        app.use('/users', userRoutes)

        // This is the Home page http://localhost:5000
        app.get('/', (req, res) => res.send("Home page!"))
    ```

    - ## Routes

    In the routes we create the router

    ```javascript
        const router = express.Router()

        ...

        export default router
    ```

    And define de different routes our application will have.

    ```javascript
        // GET ALL USERS -> GET & http://localhost:5000/users
        router.get('/', getAllUsers);

        // GET USER BY ID -> GET & http://localhost:5000/users/:id
        router.get('/:id', getUserById);

        // CREATE AN USER -> POST & http://localhost:5000/users
        router.post('/', createUser);

        // DELETE AN USER -> DELETE & http://localhost:5000/users/:id
        router.delete('/:id', deleteUserById);

        // UPDATE AN USER -> PATCH & http://localhost:5000/users/:id
        router.patch('/:id', updateUserById);
    ```

    The second parameter to all these defined routes are functions that are developed in the controllers.

    - ## Controller

    In the Controller the logic for the different routes are developed

    To get URL parameters we use:

    ```javascript
        // from http://localhost:5000/users/:id we get the id like...
        const { id } = req.params
    ```

    To get variables sent on the request body we use:

    ```javascript
        /* 
            A request to an url such as http://localhost:5000/users/:id
            with a body like

            {
                "id": "1",
                "firstName": 'Rafael',
                "lastName": 'Ruiz Morales',
                "age": 37
            }
        */
        const { firstName, lastName, age } = req.body
    ```

    This example code include the CRUD operations

    ```javascript
        import { v4 as uuidv4 } from 'uuid';

        let users = []

        export const getAllUsers = (req, res) => {
            console.log(users)
            res.send(users)
        }

        export const getUserById = (req, res) => {
            // for   /users/2   then   req.params => { id: 2 }
            const { id } = req.params

            const user = users.find(user => user.id === id) || []

            res.send(user)
        }

        export const createUser = (req, res) => {
            const newUser = req.body
            const id = uuidv4()

            const userWithId = {...newUser, id: id}

            users.push(userWithId)

            res.send(`User with ID: ${id} has been CREATED`)
        }

        export const deleteUserById = (req, res) => {
            const { id } = req.params

            users = users.filter(user => user.id !== id)

            res.send(`User with ID: ${id} has been DELETED`)
        }

        export const updateUserById = (req, res) => {
            const { id } = req.params
            const { firstName, lastName, age } = req.body

            const userToBeUpdated = users.find(user => user.id === id)

            if (firstName) {
                userToBeUpdated.firstName = firstName
            }

            if (lastName) {
                userToBeUpdated.lastName = lastName
            }
            
            if (age) {
                userToBeUpdated.age = age
            }

            res.send(`User with ID: ${id} has been UPDATED`)
        }
    ```
