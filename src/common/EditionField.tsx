import {TextField} from "@mui/material";
import React, {ChangeEvent, useState} from "react";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker, LocalizationProvider, PickerValidDate} from "@mui/x-date-pickers";
import dayjs from "dayjs";


function EditionField(props: EditionFieldProps) {
    const [value, setValue] = useState<any>(props.defaultValue)

    function onChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        setValue(e.currentTarget.value)
        props.onChange(e.currentTarget.value)
    }

    return (
        (props.type !== 'date') ? (
            <TextField id={props.title} label={props.title} variant="outlined" value={value}
                       onChange={onChange}/>
        ) : (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker label={props.title} value={dayjs(value)}/>
            </LocalizationProvider>
        )

    )
}

interface EditionFieldProps {
    title: string,
    type: String,
    defaultValue: any,
    onChange: (value: any) => void
}

export default EditionField