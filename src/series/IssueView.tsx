import {IssueCatalogItemModel} from "../purgatory/model";
import {Badge, Button, ListItem, Stack, TextField} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DoneIcon from "@mui/icons-material/Done"
import React, {useState} from "react";
import {deleteIssue, updateIssue} from "../api";
import {UpdateIssue} from "../comics/model";
import DeleteIcon from "@mui/icons-material/Delete";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";

interface IssueViewProperties {
    item: IssueCatalogItemModel
    onDelete: (id: number) => void
}

function IssueView(properties: IssueViewProperties) {
    const [editMode, setEditMode] = useState(false)
    const [changes, setChanges] = useState<UpdateIssue>({
        number: properties.item.number,
        publicationDate: properties.item.publicationDate != null
            ? dayjs(properties.item.publicationDate).format('YYYY-MM-DDT00:00:00')
            : null
    })

    return (
        <Stack direction="row" spacing={1} padding={2}>
            <Badge badgeContent={properties.item.pagesCount} color="primary">
                <img
                    src={`${import.meta.env.VITE_SERVER_URL}/pages/${properties.item.id}/0`}
                    alt="cover"
                    className='Сover'
                />
                <Button onClick={() => setEditMode(!editMode)}
                        className="Edit-Mode"
                >
                    <EditIcon/>
                </Button>
            </Badge>
            {editMode ? (
                <Stack direction="column" spacing={2}>
                    <div className='Series-Title'>
                        <ListItem key="Number">
                            <TextField id="Number"
                                       label="Number"
                                       value={changes.number}
                                       onChange={(event) => setChanges({...changes, number: event.currentTarget.value})}
                            />
                        </ListItem>


                        <ListItem key="Publication date">
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    label="Publication date"
                                    value={dayjs(changes.publicationDate)}
                                    onChange={value => setChanges({
                                        ...changes,
                                        publicationDate: value?.format('YYYY-MM-DDT00:00:00') ?? null
                                    })}
                                />
                            </LocalizationProvider>
                        </ListItem>

                        <Button
                            onClick={() => deleteIssue(properties.item.id, () => properties.onDelete(properties.item.id))}
                        >
                            <DeleteIcon/>
                        </Button>
                        <Button onClick={() => {
                            updateIssue(properties.item.id, changes, () => setEditMode((prev) => !prev))
                        }}>
                            <DoneIcon/>
                        </Button>
                    </div>
                </Stack>
            ) : null}
        </Stack>
    )
}

export default IssueView;