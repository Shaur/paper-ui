export interface ArchiveMeta {
    seriesName: string,
    number: string,
    summary: string,
    publisher: string,
    pagesCount: Number
}

export interface PurgatoryItemModel {
    id: Number,
    meta: ArchiveMeta
}

export interface SeriesCatalogItemModel {
    id: Number,
    title: string,
    publisher: string,
    issuesCount: Number,
    cover: string
}