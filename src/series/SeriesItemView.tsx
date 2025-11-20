import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {IssueCatalogItemModel, SeriesCatalogItemModel} from "../purgatory/model";
import {deleteIssue, getIssues, getSeries, updateSeries} from "../api";
import {Badge, Button, Checkbox, Stack} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import EditIcon from '@mui/icons-material/Edit';

function SeriesItemView() {
    let {id} = useParams()
    let [series, setSeries] = useState<SeriesCatalogItemModel>()
    let [items, setItems] = useState<IssueCatalogItemModel[]>()
    let [isEnded, setIsEnded] = useState<boolean>(false)

    useEffect(() => {
        getIssues(Number.parseInt(id as string), data => setItems(data))
    }, []);

    useEffect(() => {
        getSeries(parseInt(id as string), data => onSeriesLoad(data))
    }, []);

    function onSeriesLoad(input: SeriesCatalogItemModel) {
        setSeries(input)
        setIsEnded((_) => input.ended)
    }

    return (
        <div>
            <h3>{series?.title}</h3>
            <div>
            <Checkbox
                checked={isEnded}
                onChange={data => setIsEnded((state) => !state)}
                slotProps={{
                    input: { 'aria-label': 'controlled' },
                }}
            />
            <span>Ended</span>
            </div>
            <Button onClick={() => {updateSeries(parseInt(id!!), {ended: isEnded || false}, (_) => {})}}>Save</Button>
        <Grid2 container direction="row">
            {items?.map(item => {
                return (
                    <Stack direction="column" spacing={1} padding={2}>
                        <Badge badgeContent={item.pagesCount} color="primary">
                            <img
                                src={`${process.env.REACT_APP_SERVER_URL}/pages/${item.id}/0`}
                                alt="cover"
                                className='Сover'
                            />
                        </Badge>
                        <div className='Series-Title'>
                            <a href={`/reader/${item.id}`}>{item.number}</a>
                            <Button onClick={() => {
                                deleteIssue(item.id, () => {
                                    setItems(exists => exists?.filter(i => i.id !== item.id))
                                })
                            }}>Delete</Button>
                            <Button><EditIcon/></Button>
                        </div>
                    </Stack>
                )
            })}
        </Grid2>
        </div>
    )

}

export default SeriesItemView;