import React from 'react';

import { signup } from '../redux/auth/authActions';

import { useForm } from "react-hook-form";

import { useHistory } from 'react-router-dom';

import { useDispatch } from 'react-redux';

// email, password, confirmPassword, firstName, lastName
export default function SignupForm() {

    const { register, handleSubmit, errors } = useForm();

    const history = useHistory();

    const dispatch = useDispatch();
    
    const onSubmit = data => {
        // {
        //     email: "test@gmail.com",
        //     password: "1234",
        //     confirmPassword: "1234",
        //     firstName: "Test",
        //     lastName: "First User"
        // }

        dispatch(signup(data, history));
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>Email</label>
            <input name="email" ref={register({ required: true })} />
            {errors.email && <p>Email is required</p>}<br />

            <label>Password</label>
            <input type="password" name="password" ref={register({ required: true })} />
            {errors.password && <p>Password is required</p>}<br />

            <label>Confirm Password</label>
            <input type="password" name="confirmPassword" ref={register({ required: true })} />
            {errors.confirmPassword && <p>ConfirmPassword is required</p>}<br />

            <label>FirstName</label>
            <input name="firstName" ref={register({ required: true })} />
            {errors.firstName && <p>FirstName is required</p>}<br />

            <label>LastName</label>
            <input name="lastName" ref={register({ required: true })} />
            {errors.lastName && <p>LastName is required</p>}<br />

            <input type="submit" />
        </form>
    );
}
