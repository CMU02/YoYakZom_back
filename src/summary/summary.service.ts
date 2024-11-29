import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Summary } from './summary.entity';
import { Repository } from 'typeorm';
import { RequestSummaryFindAll } from './dto/requestSummaryFindAll.dto';
import { RequestSummaryFindOne } from './dto/requestSummaryFindOne.dto';
import { RequestCreateSummary } from './dto/requestCreateSummary.dto';
import { RequestCategoryGroup } from './dto/requestCategoryGroup.dto';

@Injectable()
export class SummaryService {
    constructor(
        @InjectRepository(Summary)
        private summaryRepository : Repository<Summary>
    ) {}

    /**
     * Summary 리스트 조회
     * @link localhost:7002/summary
     */
    findAll(): Promise<RequestSummaryFindAll[]> {
        return this.summaryRepository.find({
            order: {
                created_at: 'desc' // 생성날짜부터 내림차순 정렬
            }
        }).then((summaries) => {
            return summaries.map((summary) => {
                const requestSummaryAll = new RequestSummaryFindAll();
                requestSummaryAll.toEntity(summary);

                return requestSummaryAll;
            });
        });
    }

    findAllPage(page : number, pagesize : number) : Promise<{ data : RequestSummaryFindAll[]; total : number}> {
        // 페이징 조건 설정
        const skip = (page - 1) * pagesize; // 건너뛸 데이터 수
        const take = pagesize; // 가져올 데이터 수

        return this.summaryRepository.findAndCount({
            skip,
            take,
        }).then(([summaries, total]) => {
            const data = summaries.map((summary) => {
                const requestSummaryAll = new RequestSummaryFindAll();
                requestSummaryAll.toEntity(summary);
                return requestSummaryAll;
            })

            return { data, total };
        })
    }



    /**
     * 특정 Summary 조회 및 조회수 증가
     * @param id 
     * @link localhost:7002/summary/1
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
     * 해당 카테고리 글 전체 찾기
     * @link localhost:7002/summary/category?category=IT
     * @param category 
     * @returns RequestSummaryFindAll[] if summaries are found, or null if not
     */
    findCategory(category : string) : Promise<RequestSummaryFindAll[] | null> {
        return this.summaryRepository.find({ where: { category } }).then((summaries) => {
            if (summaries.length > 0) {
                return summaries.map((summary) => {
                    const requestSummaryFindAll = new RequestSummaryFindAll();
                    requestSummaryFindAll.toEntity(summary);

                    return requestSummaryFindAll;
                });
            }

            return null;
        });
    }

    /**
     * 그룹별 카테고리 및 카테고리별 카운트 조회
     * @link localhost:7002/summary/category-group
     * @returns RequestCategoryGroup[] if summaries are found, or null if not
     */

    groupByCategory() : Promise<RequestCategoryGroup[] | null> {
        return this.summaryRepository.createQueryBuilder()
            .select("category")
            .addSelect("COUNT(*) as count")
            .groupBy("category")
            .getRawMany().then((result) => {
                if (result.length > 0) {
                    return result.map((summary) => {
                        const requestCategoryGroup = new RequestCategoryGroup();
                        requestCategoryGroup.toEntity(summary, summary.count);

                        return requestCategoryGroup;
                    });
                }

                return null;
            });
    } 

    /**
     * Summary 생성
     * @param requestSummary 
     * @link PostMethod localhost:7002/summary
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
