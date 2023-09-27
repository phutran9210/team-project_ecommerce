import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { ActivityLog } from './entities/activity.entity';

@Injectable()
export class ActivityLogService {
  constructor(
    @Inject('ACTIVITY_REPOSITORY')
    private activityRepository: Repository<ActivityLog>,
  ) {}

  async createLog(userId: string, action: string): Promise<ActivityLog> {
    const log = this.activityRepository.create({
      user_id: userId,
      action_log: action,
    });
    return await this.activityRepository.save(log);
  }

  async findAllLog(page: number, rowsPerPage: number) {
    const [logs, totalLogs] = await this.activityRepository
      .createQueryBuilder('activity')
      .leftJoin('activity.user', 'user')
      .addSelect(['user.user_id', 'user.username'])
      .orderBy('activity.created_at', 'DESC')
      .skip(page * rowsPerPage)
      .take(rowsPerPage)
      .getManyAndCount();

    const response = {
      result: logs,
      hasMoreLogs: logs.length === rowsPerPage,
      totalLogs: totalLogs,
    };
    return response;
  }
}
