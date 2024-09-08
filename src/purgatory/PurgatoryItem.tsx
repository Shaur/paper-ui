import React, {useState} from "react";
import {Button, Grid, ListItem, Stack} from "@mui/material";
import {StackProps} from "@mui/material/Stack/Stack";
import {PurgatoryItemModel} from "./model";
import {rejectPurgatoryItem} from "../api";
import './purgatory.css'
import EditionField from "../common/EditionField";

interface PurgatoryItemProps {
    item: PurgatoryItemModel,
    onReject: (id: Number) => void
}

export default function PurgatoryItem(props: PurgatoryItemProps) {

    interface ItemViewModel {
        value: any,
        title: string,
        type: string,
        onChange: (value: any) => void
    }

    const innerItem: ItemViewModel[] = [
        {
            value: props.item.meta.seriesName,
            title: "Title",
            type: "text",
            onChange: (v => setUpdateRequest(state => Object.assign(state, {title: v})))
        },
        {
            value: props.item.meta.number,
            title: "Number",
            type: "text",
            onChange: (v => setUpdateRequest(state => Object.assign(state, {number: v})))
        },
        {
            value: props.item.meta.publisher,
            title: "Publisher",
            type: "text",
            onChange: (v => setUpdateRequest(state => Object.assign(state, {publisher: v})))
        },
        {
            value: props.item.meta.summary,
            title: "Summary",
            type: "text",
            onChange: (v => setUpdateRequest(state => Object.assign(state, {summary: v})))
        },
        {
            value: props.item.meta.pagesCount,
            title: "Pages count",
            type: "number",
            onChange: (v => setUpdateRequest(state => Object.assign(state, {pagesCount: v})))
        },
        {
            value: new Date().toLocaleDateString(),
            title: "Publication date",
            type: "date",
            onChange: (v => setUpdateRequest(state => Object.assign(state, {publicationDate: v})))
        }
    ]

    let [updateRequest, setUpdateRequest] = useState({
        title: props.item.meta.seriesName,
        publisher: props.item.meta.publisher,
        number: props.item.meta.number,
        summary: props.item.meta.summary,
        publicationDate: new Date(),
        pagesCount: props.item.meta.pagesCount
    })

    function onReject(id: Number) {
        rejectPurgatoryItem(id, props.onReject)
    }

    function onApprove() {
        console.log(updateRequest)
    }

    return (
        <Grid container spacing={0} paddingTop={5} width={600}>
            <img
                src={`http://localhost:8080/private/comics/purgatory/file/${props.item.id}/0`}
                alt="cover"
                className='Сover'
            />
            <Stack direction="column" spacing={1} paddingTop={0}>
                {innerItem.map(i => {
                    return (
                        <ListItem key={i.title}>
                            <EditionField title={i.title} defaultValue={i.value} type={i.type} onChange={i.onChange}/>
                        </ListItem>
                    )
                })}
                <ListItem>
                    <Actions
                        direction="row"
                        spacing={1}
                        onReject={() => {
                            onReject(props.item.id)
                        }}
                        onApprove={onApprove}
                    />
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
