export interface ArchiveMeta {
    seriesName: string,
    number: string,
    summary: string,
    publisher: string,
    pagesCount: number
}

export interface PurgatoryItemModel {
    id: Number,
    meta: ArchiveMeta
}

export interface SeriesCatalogItemModel {
    id: number,
    title: string,
    publisher: string,
    issuesCount: Number,
    cover: string,
    subscribed: boolean
}

export interface IssueCatalogItemModel {
    id: number,
    number: string,
    summary: string,
    seriesId: Number,
    pagesCount: number,
    publicationDate: Date
}