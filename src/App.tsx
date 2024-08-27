import React from "react";
import {useState} from 'react';
import Purgatory from "./purgatory/Purgatory";
import Login from "./login/Login";

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token") !== null)

    function onClick() {
        setIsLoggedIn(!isLoggedIn)
    }

    return (
        isLoggedIn ? (
            <Purgatory/>
        ) : (
            <Login onClick={onClick}/>
        )
    );
}

export default App