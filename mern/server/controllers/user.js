import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import User from '../models/user.js'

// Sign up means "to register; to create an account"
export const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body

    try {

        const existingUser = await User.findOne({ email })

        if (existingUser) {
            return res.status(400).json({ message: `User with email ${email} already exists` });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords don't match" })
        }

        if (!firstName) {
            return res.status(400).json({ message: "FirstName is required" })
        }

        if (!lastName) {
            return res.status(400).json({ message: "LastName is required" })
        }

        const hashPassword = await bcrypt.hash(password, 12); // 12 is the salt

        const result = User.create( 
            {
                email,
                password: hashPassword,
                name: `${firstName} ${lastName}`
            } 
        );

        const token = jwt.sign(
            { email: result.email, id: result._id },
            'SecretOrPrivateKey',
            { expiresIn: '1h' }
        )

        return res.status(200).json({ result, token })

    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}

// Sign in and log in are synonyms
export const signin = async (req, res) => {
    const { email, password } = req.body

    try {
        const existingUser = await User.findOne({ email })

        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
        }

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password)

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { email: existingUser.email, id: existingUser._id },
            'SecretOrPrivateKey',
            { expiresIn: '1h' }
        )

        return res.status(200).json({ result: existingUser, token })

    } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
    }
}