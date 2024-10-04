import React, {useEffect, useState} from "react";
import Grid2 from "@mui/material/Unstable_Grid2";
import {SeriesCatalogItemModel} from "../purgatory/model";
import {findSeries} from "../api";
import {Badge, Stack} from "@mui/material";
import '../App.css'


function SeriesPanel() {
    const [items, setItems] = useState<SeriesCatalogItemModel[]>()


    useEffect(() => {
        findSeries(data => setItems(data))
    }, [])


    return (
        <Grid2 container direction="row">
            {items?.map(item => {
                return (
                    <Stack direction="column" spacing={1}>
                        <Badge badgeContent={item.issuesCount.valueOf()} color="primary">
                            <img
                                src={`http://localhost:8080${item.cover}`}
                                alt="cover"
                                className='Сover'
                            />
                        </Badge>
                        <div className='Series-Title'>{item.title}</div>
                    </Stack>
                )
            })}
        </Grid2>
    )
}

export default SeriesPanel;