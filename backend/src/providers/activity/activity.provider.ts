import { ActivityLog } from "../../activity_log/entities/activity.entity";
import { DataSource } from 'typeorm';

export const activityProvider = [{
    provide: 'ACTIVITY_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(ActivityLog),
    inject: ['DATA_SOURCE'],
}]