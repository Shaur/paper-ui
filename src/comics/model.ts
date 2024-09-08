export interface ApproveRequest {
    seriesUpdate: SeriesUpdateRequest,
    issueUpdate: IssueUpdateRequest
}

export interface SeriesUpdateRequest {
    id?: Number,
    title?: string,
    publisher?: string
}

export interface IssueUpdateRequest {
    number?: string,
    summary?: string,
    publicationDate?: Date,
    pagesCount?: Number
}