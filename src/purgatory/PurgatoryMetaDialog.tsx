import {Button, Dialog, DialogActions, DialogContent, DialogTitle, ListItem, Stack, TextField} from "@mui/material";
import {saveMeta} from "../api";
import {PurgatoryItemModel} from "./model";
import React, {useState} from "react";

export interface PurgatoryMetaDialogProperties {
    open: boolean,
    onClose: () => void
    onConfirm: (item: PurgatoryItemModel) => void
}

export default function PurgatoryMetaDialog(properties: PurgatoryMetaDialogProperties) {

    const [title, setTitle] = useState("")
    const [number, setNumber] = useState("")

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const formJson = Object.fromEntries((formData as any).entries());
        const number = formJson.number;
        const title = formJson.title;

        saveMeta(title, number, (item: PurgatoryItemModel) => {
            properties.onConfirm(item)
            close()
        })
    };

    const handlePaste = (e: React.ClipboardEvent) => {
        e.preventDefault()

        const text = e.clipboardData.getData('text/plain');
        const parts = text.split("#").map(v => v.trim())

        setTitle(parts[0])

        if (parts.length == 2) {
            setNumber(parts[1])
        }
    }

    function close() {
        setTitle("")
        setNumber("")
        properties.onClose()
    }

    return (
        <Dialog open={properties.open}>
            <DialogTitle>Add new meta</DialogTitle>
            <DialogContent>
                <form onSubmit={handleSubmit} id="add-meta-form">
                    <Stack direction="column" spacing={1} paddingTop={0}>
                        <ListItem key="Title">
                            <TextField
                                id="Title"
                                label="Title"
                                name="title"
                                variant="outlined"
                                required={true}
                                value={title}
                                onChange={e => setTitle(e.currentTarget.value)}
                                onPaste={handlePaste}
                            />
                        </ListItem>
                        <ListItem key={"Number"}>
                            <TextField
                                id="Number"
                                label="Number"
                                name="number"
                                variant="outlined"
                                value={number}
                                required={true}
                                onChange={e => setNumber(e.currentTarget.value)}
                            />
                        </ListItem>
                    </Stack>
                </form>
            </DialogContent>
            <DialogActions>
                <Button onClick={close}>Cancel</Button>
                <Button type="submit" form="add-meta-form">Save</Button>
            </DialogActions>
        </Dialog>
    );
}