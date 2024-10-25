import { Summary } from "../summary.entity";

export class RequestSummaryFindAll {
    id : number;
    category: string;
    summary: string;
    original_text: string;
    created_at: Date;
    view_count: number;

    toEntity(summary : Summary) {
        this.id  = summary.id;
        this.category = summary.category;
        this.summary = summary.summary;
        this.original_text = summary.original_text;
        this.created_at = summary.created_at
        this.view_count = summary.view_count;
    }
}