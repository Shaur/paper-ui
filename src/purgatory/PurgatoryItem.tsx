import React, {useState} from "react";
import {Button, Grid, ListItem, Stack, TextField} from "@mui/material";
import {StackProps} from "@mui/material/Stack/Stack";
import {PurgatoryItemModel} from "./model";

export default function PurgatoryItem(item: PurgatoryItemModel) {

    interface ItemViewModel {
        value: string,
        title: string
    }

    const [innerItem, setInnerItem] = useState<ItemViewModel[]>([
        {
            value: item.meta.seriesName,
            title: "Title",
        },
        {value: item.meta.number, title: "Number"},
        {value: item.meta.publisher, title: "Publisher"},
        {value: item.meta.summary, title: "Summary"},
    ]);

    return (
        <Grid container spacing={1}>
            <Stack direction="column" spacing={1} paddingTop={5}>
                {innerItem.map(i => {
                    return (
                        <ListItem>
                            <TextField id={i.title} label={i.title} variant="outlined" value={i.value}/>
                        </ListItem>
                    )
                })}
                <ListItem>
                    <Actions direction="row" spacing={1}/>
                </ListItem>
            </Stack>
        </Grid>
    )
}

interface ActionsProps extends StackProps {
    onClick?: () => void
}

const Actions: React.FC<ActionsProps> = ({...stackProps}) => {
    return (
        <Stack {...stackProps}>
            <Button variant="contained" color="success" onClick={stackProps.onClick}>
                Approve
            </Button>
            <Button variant="contained" color="error">
                Reject
            </Button>
        </Stack>
    );
};
