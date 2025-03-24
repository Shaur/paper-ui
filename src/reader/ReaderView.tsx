import {IconButton, Stack} from "@mui/material";
import {ArrowLeft, ArrowRight} from "@mui/icons-material";
import {useParams} from "react-router-dom";
import React, {useState} from "react";
import '../App.css'

function ReaderView() {
    let {id} = useParams()
    const [currentPage, setCurrentPage] = useState(0)
    return (
        <Stack direction="column" textAlign={'center'}>
            <div>{currentPage}</div>
            <Stack direction="row" alignContent={'center'} justifyContent={'center'}>
                <IconButton onClick={() => setCurrentPage(page => page - 1)}><ArrowLeft/></IconButton>
                <img
                    src={`${process.env.REACT_APP_SERVER_URL}/pages/${id}/${currentPage}`}
                    alt={`page ${id}`}
                    className={'Reader-Page'}
                />
                <IconButton onClick={() => setCurrentPage(page => page + 1)}><ArrowRight/></IconButton>
            </Stack>
        </Stack>

    )
}

export default ReaderView;