import React, {useState} from "react";
import {Button, LinearProgress, Stack, TextField} from "@mui/material";
import axios from "axios";

interface UploadProgress {
    file: File
    progress: number
}

function PurgatoryFileUpload(props: PurgatoryFileUploadProps) {

    const [files, setFiles] = useState<File[]>([])
    const [progress, setProgress] = useState<UploadProgress[]>([]);

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (e.target.files) {
            setFiles(Array.from(e.target.files))
            setProgress(Array.from(e.target.files).map(f => {
                return {file: f, progress: 0}
            }))
        }
    }

    function handleClick() {
        if (files === null) {
            return
        }

        let token = localStorage.getItem("token")
        let serverUrl = process.env.REACT_APP_SERVER_URL

        for (let i = 0; i < files.length; i++) {
            let file = files[i]

            const formData = new FormData();
            formData.append('file', file);

            axios.postForm(`${serverUrl}/purgatory`, formData, {
                headers: {
                    "Authorization": "Bearer " + token,
                    "Content-Type": "multipart/form-data"
                },
                onUploadProgress: (event) => {
                    const progress = (event.loaded / (event.total ?? 1)) * 100;
                    setProgress(items => items.map((v, _) => (v.file === file) ? {progress: progress, file: file} : v));
                }
            })
                .then(_ => {
                    setFiles((prevState) => prevState?.filter(f => f !== file))
                    setProgress(prevState => prevState.filter(value => value.file !== file))

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
                return (
                    <Stack key={index} direction="column" width={350} paddingTop={5}>
                        <div>{v.file.name}</div>
                        <LinearProgress variant="determinate" value={v.progress}/>
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