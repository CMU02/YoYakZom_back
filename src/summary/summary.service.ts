import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Summary } from './summary.entity';
import { Repository } from 'typeorm';
import { RequestSummaryFindAll } from './dto/requestSummaryFindAll.dto';
import { RequestSummaryFindOne } from './dto/requestSummaryFindOne.dto';
import { RequestCreateSummary } from './dto/requestCreateSummary.dto';

@Injectable()
export class SummaryService {
    constructor(
        @InjectRepository(Summary)
        private summaryRepository : Repository<Summary>
    ) {}

    /**
     * Summary 리스트 조회
     */
    findAll(): Promise<RequestSummaryFindAll[]> {
        return this.summaryRepository.find().then((summaries) => {
            return summaries.map((summary) => {
                const requestSummaryAll = new RequestSummaryFindAll();
                requestSummaryAll.toEntity(summary);

                return requestSummaryAll;
            });
        });
    }

    /**
     * 특정 Summary 조회 및 조회수 증가
     * @param id 
     */
    async findOne(id : number): Promise<RequestSummaryFindOne | null> {
        await this.summaryRepository.increment({ id }, 'view_count', 1); // 조회수 증가

        return this.summaryRepository.findOne({ where: { id } }).then((summary) => {
            if (summary) {
                const requestSummaryFindOne = new RequestSummaryFindOne();
                requestSummaryFindOne.toEntity(summary);

                return requestSummaryFindOne;
            }

            return null;
        });
    }

    /**
     * Summary 생성
     * @param requestSummary 
     * @returns RequestSummaryFindOne
     */
    create(requestSummary : RequestCreateSummary) : Promise<RequestSummaryFindOne> {
        return this.summaryRepository.save(requestSummary).then((summary) => {
            const requestSummaryFindOne = new RequestSummaryFindOne();
            requestSummaryFindOne.toEntity(summary);

            return requestSummaryFindOne;
        });
    }
}
