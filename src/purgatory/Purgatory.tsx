import React, {useEffect, useState} from "react";
import {Stack} from "@mui/material";
import axios from "axios";
import PurgatoryItem from "./PurgatoryItem";
import {PurgatoryItemModel} from "./model";

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

    return (
        <Stack direction="row" spacing={1}>
            {purgatoryItems?.map(item => {
                return (
                    <PurgatoryItem key = {item.id.toString()} id={item.id} meta={item.meta}/>
                )
            })}
        </Stack>
    );
}

export default Purgatory;