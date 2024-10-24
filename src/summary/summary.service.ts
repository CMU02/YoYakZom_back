import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Summary } from './summary.entity';
import { Repository } from 'typeorm';
import { RequestSummaryAll } from './dto/requestSummaryAll';
import { RequestSummaryOne } from './dto/requestSummaryOne';

@Injectable()
export class SummaryService {
    constructor(
        @InjectRepository(Summary)
        private summaryRepository : Repository<Summary>
    ) {}

    /**
     * Summary 리스트 조회
     */
    findAll(): Promise<RequestSummaryAll[]> {
        return this.summaryRepository.find().then((summaries) => {
            return summaries.map((summary) => {
                const requestSummaryAll = new RequestSummaryAll();
                requestSummaryAll.toEntity(summary);

                return requestSummaryAll;
            });
        });
    }

    /**
     * 특정 Summary 조회
     * @param id 
     */
    findOne(id : number): Promise<RequestSummaryOne | null> {
        return this.summaryRepository.findOne({ where: { id } }).then((summary) => {
            if (summary) {
                const requestSummaryOne = new RequestSummaryOne();
                requestSummaryOne.toEntity(summary);

                return requestSummaryOne;
            }

            return null;
        });
    }
}
