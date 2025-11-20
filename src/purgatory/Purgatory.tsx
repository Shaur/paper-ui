import React, {useEffect, useState} from "react";
import axios from "axios";
import PurgatoryItem from "./PurgatoryItem";
import {PurgatoryItemModel} from "./model";
import PurgatoryFileUpload from "./PurgatoryFileUpload";
import {Button, Card, Stack} from "@mui/material";
import DiskInfoWidget from "../disk-info-widget/DiskInfoWidget";
import {DiskInfo} from "../comics/model";
import {getDiskInfo} from "../api";

function getItems(onSuccess: ((value: PurgatoryItemModel[]) => void)) {
    let token = localStorage.getItem("token")
    let serverUrl = process.env.REACT_APP_SERVER_URL
    axios.get<PurgatoryItemModel[]>(`${serverUrl}/purgatory`, {headers: {"Authorization": "Bearer " + token}})
        .then((response) => {
            onSuccess(response.data)
        })
        .catch(_ => {}/*localStorage.removeItem("token")*/)
}

function Purgatory() {
    const [purgatoryItems, setPurgatoryItems] = useState<PurgatoryItemModel[]>()
    const [selectedItem, setSelectedItem] = useState<PurgatoryItemModel | undefined>()
    const [diskInfo, setDiskInfo] = useState<DiskInfo | undefined>()

    useEffect(() => {
        getItems(setPurgatoryItems)
        getDiskInfo(setDiskInfo)
    }, [])

    function handleItemResolve(id: Number) {
        let items = purgatoryItems?.filter(value => value.id !== id)
        setSelectedItem((_) => items?.[0])

        setPurgatoryItems(items)
    }

    function getCard(item: PurgatoryItemModel | undefined) {
        if (item === undefined) return null
        return (
            <PurgatoryItem
                key={item.id.toString()}
                item={item}
                handleDecision={id => handleItemResolve(id)}
            />
        )
    }

    function handleFileUploaded() {
        getItems(setPurgatoryItems)
    }

    return (
        <div>
            <DiskInfoWidget diskInfo={diskInfo}/>
            <PurgatoryFileUpload onFileUploaded={handleFileUploaded}/>
            <Card className="Purgatory-Panel">
                <Stack spacing={2} width={400}>
                    {purgatoryItems?.map(item => {
                        return (
                            <Button variant={item === selectedItem ? "contained" : "text"}
                                    onClick={() => setSelectedItem((_) => item)}
                            >
                                {`${item.meta.seriesName}  #${item.meta.number}`}
                            </Button>
                        )
                    })}
                </Stack>
                {getCard(selectedItem)}
            </Card>
        </div>
    );
}

export default Purgatory;