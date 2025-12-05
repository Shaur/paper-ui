import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {IssueCatalogItemModel, SeriesCatalogItemModel} from "../purgatory/model";
import {getIssues, getSeries, updateSeries} from "../api";
import {Button, Checkbox, TextField} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import IssueView from "./IssueView";
import {UpdateSeries} from "../comics/model";

function SeriesItemView() {
    let {id} = useParams()
    let [series, setSeries] = useState<SeriesCatalogItemModel>()
    let [items, setItems] = useState<IssueCatalogItemModel[]>()

    const [update, setUpdate] = useState<UpdateSeries>({
        ended: series?.ended || false,
        publisher: series?.publisher ?? ""
    })

    useEffect(() => {
        getIssues(parseInt(id as string), data => setItems(data))
    }, [id]);

    useEffect(() => {
        getSeries(parseInt(id as string), data => onSeriesLoad(data))
    }, [id]);

    function onSeriesLoad(input: SeriesCatalogItemModel) {
        setSeries(input)
        setUpdate(prev => ({...prev, ended: input.ended, publisher: input.publisher ?? ""}))
    }

    return (
        <div>
            <h2>{series?.title}</h2>
            <div>
                <TextField
                    value={update?.publisher}
                    label="Publisher"
                    onChange={event => setUpdate(prev => ({...prev, publisher: event.target.value}))}/>
            </div>
            <div>
                <Checkbox
                    checked={update.ended}
                    onChange={_ => setUpdate(prev => ({...prev, ended: !prev.ended}))}

                    slotProps={{
                        input: {'aria-label': 'controlled'},
                    }}
                />
                <span>Ended</span>
            </div>
            <Button onClick={() => {
                updateSeries(parseInt(id!!), update, (_) => {})
            }}>Save</Button>
            <Grid2 container direction="row">
                {items?.map(item => {
                    return (
                        <IssueView
                            item={item}
                            onDelete={(id) => {
                                setItems(exists => exists?.filter(i => i.id !== id))
                            }}/>
                    )
                })}
            </Grid2>
        </div>
    )

}

export default SeriesItemView;