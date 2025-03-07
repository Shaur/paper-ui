import React, {useState} from "react";
import {Button, LinearProgress, Stack, TextField} from "@mui/material";
import axios from "axios";

function PurgatoryFileUpload(props: PurgatoryFileUploadProps) {

    const [files, setFiles] = useState<FileList | null>(null)
    const [progress, setProgress] = useState<number[]>([]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files) {
            setFiles(e.target.files)
            setProgress(Array.from(e.target.files).map(() => 0))
        }
    }

    function handleClick() {
        if (files === null) {
            return
        }

        let token = localStorage.getItem("token")
        let serverUrl = process.env.REACT_APP_SERVER_URL

        for (let i = 0; i < files.length; i++) {
            const formData = new FormData();
            formData.append('file', files[i]);


            axios.postForm(`${serverUrl}/private/comics`, formData, {
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "multipart/form-data"
                },
                onUploadProgress: (event) => {
                    const progress = (event.loaded / (event.total ?? 1)) * 100;
                    setProgress(items => items.map((v, index) => (index === i) ? progress : v));
                }
            })
                .then(_ => {
                    const allSuccess = progress.every(num => num === 100)
                    progress.forEach(num => console.log(num))
                    if (allSuccess) {
                        setFiles(null)
                        setProgress([])
                    }
                    props.onFileUploaded()
                })
                .catch(reason => console.log(reason))
        }
    }

    return (
        <Stack direction="column">
            <Stack direction="row" spacing={0.5}>
                <TextField type="file" onChange={handleChange} inputProps={{multiple: true}}/>
                <Button type="submit" disabled={files === null} onClick={handleClick}>Upload</Button>
            </Stack>
            {progress.map((v, index) => {
                const file = files ? files[index].name : "Unknown"
                return (
                    <Stack key={index} direction="column" width={350} paddingTop={5}>
                        <div>{file}</div>
                        <LinearProgress variant="determinate" value={v}/>
                    </Stack>
                )
            })
            }

        </Stack>
    )
}

interface PurgatoryFileUploadProps {
    onFileUploaded: () => void
}

export default PurgatoryFileUpload