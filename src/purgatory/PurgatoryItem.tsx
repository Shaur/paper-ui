import React, {useState} from "react";
import {Button, Grid, ListItem, Stack, TextField} from "@mui/material";
import {StackProps} from "@mui/material/Stack/Stack";
import {PurgatoryItemModel} from "./model";
import {rejectPurgatoryItem} from "../api";

interface PurgatoryItemProps {
    item: PurgatoryItemModel,
    onReject: (id: Number) => void
}

export default function PurgatoryItem(props: PurgatoryItemProps) {

    interface ItemViewModel {
        value: any,
        title: string
    }

    const [innerItem, setInnerItem] = useState<ItemViewModel[]>([
        {value: props.item.meta.seriesName, title: "Title"},
        {value: props.item.meta.number, title: "Number"},
        {value: props.item.meta.publisher, title: "Publisher"},
        {value: props.item.meta.summary, title: "Summary"},
        {value: props.item.meta.pagesCount, title: "Pages count"}
    ]);

    function onChange(e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>, title: string) {
        let newArray = innerItem.map(v => {
            if (title === v.title) {
                return {value: e.currentTarget.value, title: v.title}
            } else {
                return v
            }
        });

        setInnerItem(newArray)
    }

    function onReject(id: Number) {
        rejectPurgatoryItem(id, props.onReject)
    }

    return (
        <Grid container spacing={0} paddingTop={5} width={550}>
            <img src={`http://localhost:8080/private/comics/purgatory/file/${props.item.id}/0`} alt="cover" width={270}/>
            <Stack direction="column" spacing={1} paddingTop={0}>
                {innerItem.map(i => {
                    return (
                        <ListItem key={i.title}>
                            <TextField id={i.title} label={i.title} variant="outlined" value={i.value}
                                       onChange={e => onChange(e, i.title)}/>
                        </ListItem>
                    )
                })}
                <ListItem>
                    <Actions direction="row" spacing={1} onReject={() => {onReject(props.item.id)}}/>
                </ListItem>
            </Stack>
        </Grid>
    )
}

interface ActionsProps extends StackProps {
    onApprove?: () => void
    onReject?: () => void
}

const Actions: React.FC<ActionsProps> = ({...stackProps}) => {
    return (
        <Stack {...stackProps}>
            <Button variant="contained" color="success" onClick={stackProps.onApprove}>
                Approve
            </Button>
            <Button variant="contained" color="error" onClick={stackProps.onReject}>
                Reject
            </Button>
        </Stack>
    );
};
