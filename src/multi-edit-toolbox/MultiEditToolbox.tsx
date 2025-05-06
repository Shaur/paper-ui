import {MultiEditToolboxProperties} from "./MultiEditToolboxProperties";
import {IconButton} from "@mui/material";
import CallMergeIcon from "@mui/icons-material/CallMerge";
import React from "react";

function MultiEditToolbox(properties: MultiEditToolboxProperties) {
    let selected = properties.selected
    if (selected.length === 0) return (<div></div>)
    return (
        <div className="Toolbar">
            <IconButton onClick={properties.onMergeClick}>
                {selected.length}<CallMergeIcon/>
            </IconButton>
        </div>
    )
}

export default MultiEditToolbox