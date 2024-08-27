export interface ArchiveMeta {
    seriesName: string,
    number: string,
    summary: string,
    publisher: string,
    fileName: string
}

export interface PurgatoryItemModel {
    id: Number,
    meta: ArchiveMeta
}