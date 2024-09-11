export interface ApproveRequest {
    id: Number,
    seriesUpdate: SeriesUpdateRequest,
    issueUpdate: IssueUpdateRequest
}

export interface SeriesUpdateRequest {
    id?: Number | null,
    title: string,
    publisher: string
}

export interface IssueUpdateRequest {
    number: string,
    summary: string,
    publicationDate: Date,
    pagesCount: Number
}