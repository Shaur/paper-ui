import React, {useEffect, useState} from "react";
import Grid2 from "@mui/material/Grid2";
import {SeriesCatalogItemModel} from "../purgatory/model";
import {findSeries} from "../api";
import {Badge, Button, Stack} from "@mui/material";
import '../App.css'

import {subscribe, unsubscribe} from "../api"
import MultiEditToolbox from "../multi-edit-toolbox/MultiEditToolbox";


function SeriesPanel() {
    const [items, setItems] = useState<SeriesCatalogItemModel[]>([])
    const [pageNumber, setPageNumber] = useState(0)
    const [selected, setSelected] = useState<number[]>([])


    useEffect(() => {
        fetchSeries()
    }, [])

    useEffect(() => {
        fetchSeries()
    }, [pageNumber]);

    function fetchSeries() {
        findSeries(20, pageNumber, data => setItems((prevState) => {
            if (prevState.length === 0) {
                return data
            }

            let filtered = data.filter((value: SeriesCatalogItemModel) => prevState.find(obj => value.id === obj.id) === undefined)
            return [...prevState, ...filtered]
        }))
    }

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
        <div>
            <MultiEditToolbox selected={selected}/>
            <Grid2 container direction="row">
                {items?.map(item => {
                    return (
                        <Stack direction="column" spacing={1}
                               className={selected.includes(item.id) ? "Series-Wrapper Selected-Series" : "Series-Wrapper"}
                               onClick={event => {
                                   if (event.ctrlKey) {
                                       setSelected(state => {
                                           if (state.includes(item.id)) {
                                               return state.filter(value => value !== item.id)
                                           } else {
                                               return [...state, item.id]
                                           }
                                       })
                                   }
                               }}>
                            <Badge badgeContent={item.issuesCount.valueOf()} color="primary">
                                <img
                                    src={`${process.env.REACT_APP_SERVER_URL}${item.cover}?size=SMALL`}
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
            <Button fullWidth={true} onClick={() => {
                setPageNumber((value) => {
                        return value + 1
                    }
                )
            }}>Load more</Button>
        </div>
    )
}

export default SeriesPanel;