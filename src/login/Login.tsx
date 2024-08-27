import React, {useState} from "react";
import {Button, ListItem, Stack, TextField} from "@mui/material";
import axios from "axios";

interface LoginProps {
    onClick: () => void
}

interface TokenResponse {
    token: string
}

function Login(props: LoginProps) {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    function login() {
        axios.post<TokenResponse>("http://localhost:8080/customer/login", {username: username, password: password})
            .then((response) => {
                localStorage.setItem("token", response.data.token)
                props.onClick()
            })
            .catch((reason) => {console.log(reason)});
    }

    return (
        <Stack direction="column" spacing={1}>
            <ListItem>
                <TextField id="username" label="Username" variant="outlined" value={username}
                           onChange={(data) => setUsername(data.currentTarget.value)}/>
            </ListItem>
            <ListItem>
                <TextField id="password" label="Password" variant="outlined" type="password" value={password}
                           onChange={(data) => setPassword(data.currentTarget.value)}/>
            </ListItem>
            <ListItem>
                <Button color="primary" onClick={login}>Sign In</Button>
            </ListItem>
        </Stack>
    )
}

export default Login