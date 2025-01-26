import axios from "axios";
import {ApproveRequest} from "./comics/model";

let serverUrl = process.env.SERVER_URL

export function rejectPurgatoryItem(id: Number, callback:(id: Number) => void) {
    let token = localStorage.getItem("token")

    axios.delete(`${serverUrl}/private/comics/purgatory/${id}`, {headers: {"Authorization": "Bearer " + token}})
        .then(_ => callback(id))
}

export function approvePurgatoryItem(request: ApproveRequest, callback: (id: Number) => void) {
    axios.put(`${serverUrl}/private/comics/purgatory`, request, _headers())
        .then(_ => callback(request.id))
}

export function findBySeriesTitle(title: String, callback: (data: any) => void) {
    axios.get(`${serverUrl}/series/autocomplete?title=${title}`, _headers())
        .then(response => callback(response.data))
}

export function findSeries(callback: (data: any) => void) {
    axios.get(`${serverUrl}/series`, _headers())
        .then(response => callback(response.data))
}

export function getIssues(seriesId: Number, callback: (data: any) => void) {
    axios.get(`${serverUrl}/issue?seriesId=${seriesId}`, _headers())
        .then(response => callback(response.data))
}

function _headers() {
    let token = localStorage.getItem("token")
    return {headers: {"Authorization": "Bearer " + token}}
}