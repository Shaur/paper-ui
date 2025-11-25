import {IssueCatalogItemModel} from "../purgatory/model";
import {Badge, Button, Stack, TextField} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done"
import React, {useState} from "react";
import {deleteIssue, getIssues, getSeries, updateIssue} from "../api";
import {IssueUpdateRequest, UpdateIssue} from "../comics/model";

interface IssueViewProperties {
    item: IssueCatalogItemModel
    onDelete: (id: number) => void
}

function IssueView(properties: IssueViewProperties) {
    const [editMode, setEditMode] = useState(false)
    const [changes, setChanges] = useState<UpdateIssue>({number: properties.item.number})

    return (
        <Stack direction="column" spacing={1} padding={2}>
            <Badge badgeContent={properties.item.pagesCount} color="primary">
                <img
                    src={`${process.env.REACT_APP_SERVER_URL}/pages/${properties.item.id}/0`}
                    alt="cover"
                    className='Сover'
                />
            </Badge>
            <div className='Series-Title'>
                {editMode ? (
                    <TextField value={changes.number}
                               onChange={(event) => setChanges({number: event.currentTarget.value})}/>
                ) : (
                    <a href={`/reader/${properties.item.id}`}>{changes.number}</a>
                )}

                <Button onClick={() => properties.onDelete(properties.item.id)}>Delete</Button>
                <Button onClick={() => {
                    if (editMode) {
                        updateIssue(properties.item.id, changes, () => setEditMode((prev) => !prev))
                    } else {
                        setEditMode((prev) => !prev)
                    }
                }}>
                    {editMode ? (<DoneIcon/>) : (<EditIcon/>)}
                </Button>
            </div>
        </Stack>
    )
}

export default IssueView;