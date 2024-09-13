import React from "react";
import {useState} from 'react';
import Purgatory from "./purgatory/Purgatory";
import Login from "./login/Login";
import {Box, Tab, Tabs} from "@mui/material";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function CustomTabPanel(props: TabPanelProps) {
    const {children, value, index, ...other} = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{p: 3}}>{children}</Box>}
        </div>
    );
}

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("token") !== null)
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    function onClick() {
        setIsLoggedIn(!isLoggedIn)
    }

    return (
        isLoggedIn ? (
            <Box sx={{width: '100%'}}>
                <Box sx={{borderBottom: 1, borderColor: 'divider'}}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Purgatory" aria-controls='simple-tabpanel-0'/>
                        <Tab label="Series" aria-controls='simple-tabpanel-1'/>
                    </Tabs>
                </Box>
                <CustomTabPanel value={value} index={0}>
                    <Purgatory/>
                </CustomTabPanel>
                <CustomTabPanel value={value} index={1}>
                    Item Two
                </CustomTabPanel>
            </Box>
        ) : (
            <Login onClick={onClick}/>
        )
    );
}

export default App