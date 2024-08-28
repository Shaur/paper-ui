import React, {useState} from "react";
import {Button, Stack, TextField} from "@mui/material";
import axios from "axios";

function PurgatoryFileUpload(attributes: PurgatoryFileUploadAttributes) {

    const [files, setFiles] = useState<FileList | null>(null)


    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files) {
            setFiles(e.target.files)
        }
    }

    function handleClick() {
        if (files === null) {
            return
        }

        let token = localStorage.getItem("token")
        const formData = new FormData();
        for (let i = 0; i < files.length; i++) {
            formData.append('file', files[i]);
        }


        axios.postForm("http://localhost:8080/private/comics", formData, {
            headers: {
                "Authorization": "Bearer " + token,
                "Content-Type": "multipart/form-data"
            }
        })
            .then(_ => {
                setFiles(null)
                attributes.onFileUploaded()
            })
            .catch(reason => console.log(reason))
    }

    return (
        <Stack direction="row" spacing={0.5}>
            <TextField type="file" onChange={handleChange} inputProps={{multiple: true}}/>
            <Button type="submit" disabled={files === null} onClick={handleClick}>Upload</Button>
        </Stack>
    )
}

interface PurgatoryFileUploadAttributes {
    onFileUploaded: () => void
}

export default PurgatoryFileUpload