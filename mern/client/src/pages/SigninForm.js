import React from 'react';

import { signin } from '../redux/auth/authActions';

import { useForm } from "react-hook-form";

import { useHistory } from 'react-router-dom';

import { useDispatch } from 'react-redux';

// email, password
export default function SigninForm() {

    const { register, handleSubmit, errors } = useForm();

    const history = useHistory();

    const dispatch = useDispatch();

    const onSubmit = data => {
        // {
        //     email: "test@gmail.com",
        //     password: "1234"
        // }
        
        dispatch(signin(data, history));
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <label>Email</label>
            <input name="email" ref={register({ required: true })} />
            {errors.email && <p>Email is required</p>}<br />

            <label>Password</label>
            <input type="password" name="password" ref={register({ required: true })} />
            {errors.password && <p>Password is required</p>}<br />

            <input type="submit" />
        </form>
    );
}
