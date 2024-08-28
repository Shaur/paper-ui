import React, {useEffect, useState} from "react";
import axios from "axios";
import PurgatoryItem from "./PurgatoryItem";
import {PurgatoryItemModel} from "./model";
import PurgatoryFileUpload from "./PurgatoryFileUpload";
import Grid2 from "@mui/material/Unstable_Grid2";

function getItems(onSuccess: ((value: PurgatoryItemModel[]) => void)) {
    let token = localStorage.getItem("token")
    axios.get<PurgatoryItemModel[]>("http://localhost:8080/private/comics/purgatory", {headers: {"Authorization": "Bearer " + token}})
        .then((response) => {
            onSuccess(response.data)
        })
}

function Purgatory() {
    const [purgatoryItems, setPurgatoryItems] = useState<PurgatoryItemModel[]>()

    useEffect(() => {
        getItems(setPurgatoryItems)
    }, [])

    function handleFileUploaded() {
        getItems(setPurgatoryItems)
    }

    return (
        <Grid2>
            <PurgatoryFileUpload onFileUploaded = {handleFileUploaded}/>
            <Grid2 container direction="row">
                {purgatoryItems?.map(item => {
                    return (
                        <PurgatoryItem key={item.id.toString()} id={item.id} meta={item.meta}/>
                    )
                })}
            </Grid2>
        </Grid2>
    );
}

export default Purgatory;