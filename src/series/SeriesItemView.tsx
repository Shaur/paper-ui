import {useParams} from "react-router-dom";
import React, {useEffect, useState} from "react";
import {IssueCatalogItemModel} from "../purgatory/model";
import {getIssues} from "../api";
import {Badge, Stack} from "@mui/material";
import Grid2 from "@mui/material/Grid2";

function SeriesItemView() {
    let {id} = useParams()
    let [items, setItems] = useState<IssueCatalogItemModel[]>()

    useEffect(() => {
        getIssues(Number.parseInt(id as string), data => setItems(data))
    }, [id]);

    return (
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
                        </div>
                    </Stack>
                )
            })}
        </Grid2>
    )

}

export default SeriesItemView;