import { ActivityLogService } from './activity_log.service';
import { Get, Controller, UseGuards, Query } from '@nestjs/common';
import { JwtAuthGuardCheck } from '../guard/JwtAuthGuardCheck.guard';
import { PaginationDto } from './dto/payload.dto';

@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityLogService) {}

  @Get()
  @UseGuards(JwtAuthGuardCheck)
  async getActivity(@Query() payload: PaginationDto) {
    return await this.activityService.findAllLog(
      payload.page,
      payload.rowsPerPage,
    );
  }
}
