import { Summary } from "../summary.entity";

export class RequestCategoryGroup {
    category: string;
    count: number;

    toEntity(summary : Summary, count : number) {
        this.category = summary.category;
        this.count = count;
    }
}