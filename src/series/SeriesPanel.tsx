import React, {useEffect, useState} from "react";
import Grid2 from "@mui/material/Unstable_Grid2";
import {SeriesCatalogItemModel} from "../purgatory/model";
import {findSeries} from "../api";
import {Badge, Button, Stack} from "@mui/material";
import '../App.css'

import {subscribe, unsubscribe} from "../api"


function SeriesPanel() {
    const [items, setItems] = useState<SeriesCatalogItemModel[]>([])


    useEffect(() => {
        findSeries(data => setItems(data))
    }, [])

    function handleSubscription(seriesId: Number, subscribed: boolean) {
        if (subscribed) {
            unsubscribe(seriesId, () => _subscriptionCallback(seriesId, false));
        } else {
            subscribe(seriesId, () => _subscriptionCallback(seriesId, true))
        }
    }

    function _subscriptionCallback(seriesId: Number, state: boolean) {
        setItems(items => items.map(item => {
                return (item.id === seriesId) ? {...item, subscribed: state} : item;
            })
        )
    }

    return (
        <Grid2 container direction="row">
            {items?.map(item => {
                return (
                    <Stack direction="column" spacing={1}>
                        <Badge badgeContent={item.issuesCount.valueOf()} color="primary">
                            <img
                                src={`${process.env.REACT_APP_SERVER_URL}${item.cover}`}
                                alt="cover"
                                className='Сover'
                                width={300}
                                height={400}
                            />
                        </Badge>
                        <div className='Series-Title'>
                            <a href={`/series/${item.id}`}>{item.title}</a>
                        </div>
                        <div>
                            <Button onClick={() => handleSubscription(item.id, item.subscribed)}>
                                {item.subscribed ? "Unsubscribe" : "Subscribe"}
                            </Button>
                        </div>
                    </Stack>
                )
            })}
        </Grid2>
    )
}

export default SeriesPanel;