import { v4 as uuidv4 } from 'uuid';

//Let's emulate a DB using and array
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