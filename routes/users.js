import express from 'express'

import { 
    getAllUsers,
    getUserById,
    createUser,
    deleteUserById,
    updateUserById
} from '../controllers/users.js'

const router = express.Router()

// {
//     "id": "1",
//     "firstName": 'Rafael',
//     "lastName": 'Ruiz Morales',
//     "age": 37
// }

// GET ALL USERS -> GET & http://localhost:5000/users
router.get('/', getAllUsers);

// GET USER BY ID -> GET & http://localhost:5000/users/:id
router.get('/:id', getUserById);

// CREATE AN USER -> POST & http://localhost:5000/users
router.post('/', createUser);

// DELETE AN USER -> DELETE & http://localhost:5000/users/:id
router.delete('/:id', deleteUserById);

/*
    NOTE: Using PUT requires us to specify all attributes even if we want to change only one attribute. But if we use the PATCH method we can update only the fields we need and there is no need to mention all the fields.
*/

// UPDATE AN USER -> PATCH & http://localhost:5000/users/:id
router.patch('/:id', updateUserById);

export default router