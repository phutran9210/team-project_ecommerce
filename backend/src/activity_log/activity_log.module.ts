import { Module } from '@nestjs/common';
import { ActivityLogService } from './activity_log.service';
import { activityProvider } from '../providers/activity/activity.provider';
import { DatabaseModule } from '../../database/database.module';
import {ActivityController} from "./activity_log.controller"


@Module({
  imports : [DatabaseModule],
  controllers: [ActivityController],
  providers: [ActivityLogService,...activityProvider],
  exports: [ActivityLogService]
})
export class ActivityLogModule {}
