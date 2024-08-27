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
        {value: item.meta.seriesName, title: "Title"},
        {value: item.meta.number, title: "Number"},
        {value: item.meta.publisher, title: "Publisher"},
        {value: item.meta.summary, title: "Summary"},
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

    return (
        <Grid container spacing={1}>
            <Stack direction="column" spacing={1} paddingTop={5}>
                {innerItem.map(i => {
                    return (
                        <ListItem key={i.title}>
                            <TextField id={i.title} label={i.title} variant="outlined" value={i.value}
                                       onChange={e => onChange(e, i.title)}/>
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
