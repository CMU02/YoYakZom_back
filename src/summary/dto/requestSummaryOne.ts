import { Summary } from "../summary.entity";

export class RequestSummaryOne {
    id : number;
    category: string;
    summary: string;
    original: string;
    created_at: Date;

    toEntity(summary : Summary) {
        this.id  = summary.id;
        this.category = summary.category;
        this.summary = summary.summary;
        this.original = summary.original;
        this.created_at = summary.created_at
    }
}