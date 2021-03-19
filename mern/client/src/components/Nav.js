import React, { useState, useEffect, useCallback } from 'react';

import { Link, useHistory, useLocation } from 'react-router-dom';

import * as authActionType from '../redux/auth/authTypes'

import { useDispatch } from 'react-redux';

import decode from 'jwt-decode';

function Nav() {

    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));

    const dispatch = useDispatch();

    const history = useHistory();
    const location = useLocation();

    const logout = useCallback(() => {
        dispatch({ type: authActionType.LOGOUT });

        history.push('/');

        setUser(null);
    }, [dispatch, history]);

    useEffect(() => {
        const token = user?.token;
    
        if (token) {
          const decodedToken = decode(token);
    
          if (decodedToken.exp * 1000 < new Date().getTime()) logout();
        }
    
        setUser(JSON.parse(localStorage.getItem('profile')));
      }, [location, logout, user?.token]);

    const navStyle = {
        color: "#fff"
    }

    return (
        <div>
            <nav>
                <Link to="/">
                    <h3>Logo</h3>
                </Link>
                <ul className="nav-links">
                    {user?.result ? (
                        <>
                            <span>Welcome {user.result.name}</span>
                            <button onClick={logout}>Log Out</button>
                        </>
                    ) : (
                        <>
                            <Link to="/singup" style={navStyle}>
                                <li>Sign Up</li>
                            </Link>
                            <Link to="/singin" style={navStyle}>
                                <li>Sign In</li>
                            </Link>
                        </>
                    )}
                </ul>
            </nav>
        </div>
    );
}

export default Nav;
