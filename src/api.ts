import axios from "axios";
import {ApproveRequest} from "./comics/model";

export function rejectPurgatoryItem(id: Number, callback:(id: Number) => void) {
    let token = localStorage.getItem("token")
    axios.delete(`http://localhost:8080/private/comics/purgatory/${id}`, {headers: {"Authorization": "Bearer " + token}})
        .then(_ => callback(id))
}

export function approvePurgatoryItem(request: ApproveRequest, callback: (id: Number) => void) {
    axios.put(`http://localhost:8080/private/comics/purgatory`, request, _headers())
        .then(_ => callback(request.id))
}

export function findBySeriesTitle(title: String, callback: (data: any) => void) {
    axios.get(`http://localhost:8080/series?title=${title}`, _headers())
        .then(response => callback(response.data))
}

function _headers() {
    let token = localStorage.getItem("token")
    return {headers: {"Authorization": "Bearer " + token}}
}