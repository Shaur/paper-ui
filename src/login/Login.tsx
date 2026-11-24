import React, {useState} from "react";
import {Box, Button, Stack, TextField} from "@mui/material";
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
        let serverUrl = import.meta.env.VITE_SERVER_URL
        axios.post<TokenResponse>(`${serverUrl}/customer/login`, {username: username, password: password})
            .then((response) => {
                localStorage.setItem("token", response.data.token)
                props.onClick()
            })
            .catch((reason) => {
                console.log(reason)
            });
    }

    return (
        <Box sx={{minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <Stack direction="column" spacing={1}>
                <TextField id="username" label="Username" variant="outlined" value={username}
                           onChange={(data) => setUsername(data.currentTarget.value)}/>
                <TextField id="password" label="Password" variant="outlined" type="password" value={password}
                           onChange={(data) => setPassword(data.currentTarget.value)}/>
                <Button color="primary" onClick={login}>Sign In</Button>
            </Stack>
        </Box>
    )
}

export default Login