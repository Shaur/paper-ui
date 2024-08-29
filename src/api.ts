import axios from "axios";

export function rejectPurgatoryItem(id: Number, callback:(id: Number) => void) {
    let token = localStorage.getItem("token")
    axios.delete(`http://localhost:8080/private/comics/purgatory/${id}`, {headers: {"Authorization": "Bearer " + token}})
        .then(_ => callback(id))
}