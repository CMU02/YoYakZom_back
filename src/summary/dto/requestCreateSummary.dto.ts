import { Summary } from "../summary.entity";

export class RequestCreateSummary {
    category : string;
    summary : string;
    original_text : string;

    toEntity(summary : Summary) {
        summary.category = this.category;
        summary.summary = this.summary;
        summary.original_text = this.original_text;
    }
}