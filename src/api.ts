import axios, {HttpStatusCode} from "axios";
import {ApproveRequest, UpdateIssue, UpdateSeries} from "./comics/model";

let serverUrl = process.env.REACT_APP_SERVER_URL

export function getPurgatoryItems(callback: (data: any) => void) {
    _request(Request.GET, `${serverUrl}/purgatory`, callback)
}

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

export function getSeries(id: number, callback: (data: any) => void) {
    axios.get(`${serverUrl}/series/${id}`, _headers())
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
    _request(Request.GET, `${serverUrl}/stats/disk`, callback)
}

export function mergeSeries(ids: number[], callback: (data: any) => void) {
    axios.put(`${serverUrl}/series/merge`, {ids: ids}, _headers())
        .then(callback)
}

export function deleteIssue(id: number, callback: (data: any) => void) {
    axios.delete(`${serverUrl}/issue/${id}`, _headers())
        .then(callback)
}

export function updateSeries(id: number, request: UpdateSeries, callback: (data: any) => void) {
    axios.put(`${serverUrl}/series/${id}`, request, _headers())
        .then(callback)
}

export function updateIssue(id: number, request: UpdateIssue, callback: () => void) {
    axios.patch(`${serverUrl}/issue/${id}`, request, _headers())
        .then(callback)
}

function _headers() {
    let token = localStorage.getItem("token")
    return {headers: {"Authorization": "Bearer " + token}}
}

function _request(type: Request, url: string, callback: (data: any) => void, body?: any) {
    switch (type) {
        case Request.GET: axios.get(url, _headers())
            .then(response => callback(response.data))
            .catch(error => {
                console.log(error)
                if (error?.response?.status === HttpStatusCode.Unauthorized) {
                    localStorage.removeItem("token")
                    window.location.href = "/"
                }
            })

    }
}
enum Request {
    GET,
    PUT,
    DELETE,
    POST,
    PATCH
}