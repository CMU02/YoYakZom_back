export class PagedResponse<T> {
    summaries : T[];
    total : number;
    page : number;
    pageSize : number;
}