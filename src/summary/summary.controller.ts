import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { SummaryService } from './summary.service';
import { RequestCreateSummary } from './dto/requestCreateSummary.dto';

@Controller('summary')
export class SummaryController {
    constructor(private readonly summaryService: SummaryService) {}

    @Get()
    findAll() {
        return this.summaryService.findAll();
    }

    @Get('category')
    findCategory(@Query() query: {category: string}) {
        return this.summaryService.findCategory(query.category);
    }

    @Get('category-group')
    findCategoryGroup() {
        return this.summaryService.groupByCategory();
    }

    @Get('/:id')
    findOne(@Param('id') id : number) {
        return this.summaryService.findOne(id);
    }

    @Post()
    create(@Body() requestSummary : RequestCreateSummary) {
        return this.summaryService.create(requestSummary);
    }
}
