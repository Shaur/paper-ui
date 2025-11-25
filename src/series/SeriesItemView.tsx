import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {IssueCatalogItemModel, SeriesCatalogItemModel} from "../purgatory/model";
import {deleteIssue, getIssues, getSeries, updateSeries} from "../api";
import {Button, Checkbox} from "@mui/material";
import Grid2 from "@mui/material/Grid2";
import IssueView from "./IssueView";

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
                    onChange={_ => setIsEnded((state) => !state)}
                    slotProps={{
                        input: {'aria-label': 'controlled'},
                    }}
                />
                <span>Ended</span>
            </div>
            <Button onClick={() => {
                updateSeries(parseInt(id!!), {ended: isEnded || false}, (_) => {})
            }}>Save</Button>
            <Grid2 container direction="row">
                {items?.map(item => {
                    return (
                        <IssueView
                            item={item}
                            onDelete={(id) => {
                                deleteIssue(id, () => {
                                    setItems(exists => exists?.filter(i => i.id !== id))
                                })
                            }}/>
                    )
                })}
            </Grid2>
        </div>
    )

}

export default SeriesItemView;