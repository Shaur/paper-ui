import React, {useState} from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Autocomplete,
    Button,
    Grid,
    ListItem,
    Stack,
    TextField, Typography
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import {StackProps} from "@mui/material/Stack/Stack";
import {PurgatoryItemModel} from "./model";
import {rejectPurgatoryItem, approvePurgatoryItem, findBySeriesTitle} from "../api";
import './purgatory.css'
import {ApproveRequest} from "../comics/model";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import dayjs from "dayjs";

interface PurgatoryItemProps {
    item: PurgatoryItemModel,
    handleDecision: (id: Number) => void
}

export default function PurgatoryItem(props: PurgatoryItemProps) {

    const [viewModelState, setViewModelState] = useState({seriesId: null, title: props.item.meta.seriesName})
    const [number, setNumber] = useState(props.item.meta.number)
    const [summary, setSummary] = useState(props.item.meta.summary)
    const [publicationDate, setPublicationDate] = useState(new Date())
    const [pagesCount, setPagesCount] = useState(props.item.meta.pagesCount)
    const [publisher, setPublisher] = useState(props.item.meta.publisher)

    const [seriesOptions, setSeriesOptions] = useState<any[]>([])

    function onReject() {
        rejectPurgatoryItem(props.item.id, props.handleDecision)
    }

    function onApprove() {
        const request: ApproveRequest = {
            id: props.item.id,
            seriesUpdate: {
                id: viewModelState.seriesId,
                title: viewModelState.title,
                publisher: publisher
            },
            issueUpdate: {
                number: number,
                summary: summary,
                publicationDate: publicationDate,
                pagesCount: pagesCount
            }
        }

        approvePurgatoryItem(request, props.handleDecision)
    }

    function setOptions() {
        findBySeriesTitle(viewModelState.title, (data) => {
            setSeriesOptions(data)
        })
    }

    const range = (start: number, end: number): number[] => {
        return Array.from(Array(end - start).keys()).map((i) => i + start);
    };

    return <Grid container spacing={0} paddingTop={5} width={650}>
        <Stack direction="column" spacing={1}>
            <ListItem>
                <img
                    src={`${process.env.REACT_APP_SERVER_URL}/private/comics/purgatory/file/${props.item.id}/0`}
                    alt="cover"
                    className='Сover'
                />
            </ListItem>
            <ListItem>
                <Actions
                    direction="row"
                    spacing={1}
                    onReject={onReject}
                    onApprove={onApprove}
                />
            </ListItem>
        </Stack>

        <Stack direction="column" spacing={1} paddingTop={0}>
            <ListItem key="Title">
                <Autocomplete
                    freeSolo={true}
                    options={seriesOptions}
                    getOptionLabel={(option) => option.title}
                    onChange={(_: any, newValue: any | null) => {
                        if (newValue === null) {
                            setViewModelState(state => Object.assign(state, {seriesId: null, title: null}))
                        } else {
                            setViewModelState(state => Object.assign(state, {
                                seriesId: newValue.id,
                                title: newValue.title
                            }))
                        }
                    }}
                    onInputChange={(_, newInputValue) => {
                        setViewModelState(state => Object.assign(state, {title: newInputValue}))
                        setOptions()
                    }}
                    defaultValue={viewModelState}
                    sx={{width: 300}}
                    renderInput={(params) => <TextField {...params}
                                                        label={`Title ${viewModelState.seriesId === null ? 'unlinked' : 'linked'}`}
                                                        variant="outlined"/>}
                />
            </ListItem>
            <ListItem key="Number">
                <TextField id="Number" label="Number" variant="outlined" value={number}
                           onChange={v => setNumber(v.currentTarget.value)}/>
            </ListItem>
            <ListItem key="Publisher">
                <TextField id="Publisher" label="Publisher" variant="outlined" value={publisher}
                           onChange={v => setPublisher(v.currentTarget.value)}/>
            </ListItem>
            <ListItem key="Summary">
                <TextField id="Summary" label="Summary" variant="outlined" multiline={true} sx={{width: 300}}
                           value={summary}
                           onChange={v => setSummary(v.currentTarget.value)}/>
            </ListItem>
            <ListItem key="Pages count">
                <TextField id="Pages count" label="Pages count" variant="outlined" value={pagesCount}
                           onChange={v => setPagesCount(Number.parseInt(v.currentTarget.value))}/>
            </ListItem>
            <ListItem key="Publication date">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker label="Publication date" value={dayjs(publicationDate)}/>
                </LocalizationProvider>
            </ListItem>
        </Stack>
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel2-content"
                id="panel2-header"
            >
                <Typography component="span">Pages</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Grid direction={"row"}>
                    {range(0, pagesCount.valueOf()).map(item =>
                        <img
                            src={`${process.env.REACT_APP_SERVER_URL}/private/comics/purgatory/file/${props.item.id}/${item}?size=SMALL`}
                            alt="cover"
                            width={150}
                        />
                    )}
                </Grid>
            </AccordionDetails>
        </Accordion>

    </Grid>
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
