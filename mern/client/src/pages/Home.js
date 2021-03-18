import React from 'react';

function Home(props) {
    const user = JSON.parse(localStorage.getItem('profile'));

    // console.log(user.result)
    // {
        // _id: "605358c9eefaeec576fba07f",
        // email: "test@gmail.com",
        // password: "$2a$12$eRIToiykCxRXnYoun/QteODnvrpgfXOPZdDwBD9siiknu9uO15ZwG",
        // name: "Test Smith", 
        // __v: 0
    // }
    return (
        <div>
            {user?.result ? (
                <p><b>{user?.result.name}</b> is logged in</p>
            ) : (
                <p>No users logged in</p>
            )}
        </div>
    );
}

export default Home;