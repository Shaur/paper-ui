import axios from "axios";
import {ApproveRequest} from "./comics/model";

let serverUrl = process.env.REACT_APP_SERVER_URL

export function rejectPurgatoryItem(id: Number, callback: (id: Number) => void) {
    let token = localStorage.getItem("token")

    axios.delete(`${serverUrl}/private/comics/purgatory/${id}`, {headers: {"Authorization": "Bearer " + token}})
        .then(_ => callback(id))
}

export function deletePage(id: Number, number: number, callback: () => void) {
    let token = localStorage.getItem("token")

    axios.delete(`${serverUrl}/private/comics/purgatory/${id}/${number}`, {headers: {"Authorization": "Bearer " + token}})
        .then(_ => callback())
}

export function approvePurgatoryItem(request: ApproveRequest, callback: (id: Number) => void) {
    axios.put(`${serverUrl}/private/comics/purgatory`, request, _headers())
        .then(_ => callback(request.id))
}

export function findBySeriesTitle(title: String, callback: (data: any) => void) {
    axios.get(`${serverUrl}/series/autocomplete?title=${title}`, _headers())
        .then(response => callback(response.data))
}

export function findSeries(pageSize: Number, pageNumber: Number, callback: (data: any) => void) {
    axios.get(`${serverUrl}/series?limit=${pageSize}&offset=${pageNumber}`, _headers())
        .then(response => callback(response.data))
}

export function getIssues(seriesId: Number, callback: (data: any) => void) {
    axios.get(`${serverUrl}/series/${seriesId}/issues`, _headers())
        .then(response => callback(response.data))
}

export function subscribe(seriesId: Number, callback: () => void) {
    axios.put(`${serverUrl}/series/${seriesId}/subscribe`, {}, _headers())
        .then(callback)
}

export function unsubscribe(seriesId: Number, callback: () => void) {
    axios.put(`${serverUrl}/series/${seriesId}/unsubscribe`, {}, _headers())
        .then(callback)
}

export function getDiskInfo(callback: (data: any) => void) {
    axios.get(`${serverUrl}/stats/disk`, _headers())
        .then(response => callback(response.data))
}

export function mergeSeries(ids: number[], callback: (data: any) => void) {
    axios.put(`${serverUrl}/series/merge`, {ids: ids}, _headers())
        .then(callback)
}

export function deleteIssue(id: number, callback: (data: any) => void) {
    axios.delete(`${serverUrl}/issue/${id}`, _headers())
        .then(callback)
}

function _headers() {
    let token = localStorage.getItem("token")
    return {headers: {"Authorization": "Bearer " + token}}
}