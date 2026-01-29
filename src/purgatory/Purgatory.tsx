import React, {useEffect, useState} from "react";
import PurgatoryItem from "./PurgatoryItem";
import {PurgatoryItemModel} from "./model";
import PurgatoryFileUpload from "./PurgatoryFileUpload";
import {Button, Card, Stack} from "@mui/material";
import DiskInfoWidget from "../disk-info-widget/DiskInfoWidget";
import {DiskInfo} from "../comics/model";
import {getDiskInfo, getPurgatoryItems} from "../api";
import PurgatoryMetaDialog from "./PurgatoryMetaDialog";
import AddIcon from "@mui/icons-material/Add";

function getItems(onSuccess: ((value: PurgatoryItemModel[]) => void)) {
    getPurgatoryItems(onSuccess)
}

function Purgatory() {
    const [purgatoryItems, setPurgatoryItems] = useState<PurgatoryItemModel[]>([])
    const [selectedItem, setSelectedItem] = useState<PurgatoryItemModel | undefined>()
    const [diskInfo, setDiskInfo] = useState<DiskInfo | undefined>()
    const [open, setOpen] = useState(false)

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
        <React.Fragment>
            <PurgatoryMetaDialog
                open={open}
                onClose={() => setOpen(false)}
                onConfirm={item => setPurgatoryItems(items => [...items, item])}
            />
        <div>
            <DiskInfoWidget diskInfo={diskInfo}/>
            <div>
                <PurgatoryFileUpload onFileUploaded={handleFileUploaded}/>

            </div>
            <Card className="Purgatory-Panel">
                <Stack spacing={2} width={400}>
                    {purgatoryItems?.map(item => {
                        return (
                            <Button variant={item === selectedItem ? "contained" : "text"}
                                    color={item.meta.pagesCount === 0 ? "warning" : "info"}
                                    onClick={() => setSelectedItem((_) => item)}
                            >
                                {`${item.meta.seriesName}  #${item.meta.number}`}
                            </Button>
                        )
                    })}
                    <Button
                        startIcon={<AddIcon />}
                        variant="outlined"
                        onClick={() => setOpen(true)}
                    >
                        Add meta
                    </Button>
                </Stack>
            </Card>
            {getCard(selectedItem)}
        </div>
        </React.Fragment>
    );
}

export default Purgatory;