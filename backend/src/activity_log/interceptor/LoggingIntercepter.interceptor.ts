import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import {Response} from "express"
import { Observable } from 'rxjs';
import { ActivityLogService } from '../activity_log.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly activityLogService: ActivityLogService) {}

  async intercept(context: ExecutionContext, next: CallHandler,): Promise<Observable<any>> {
    
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest();

    // Lấy user từ request 
    const user = request.user;
    const method = request.method;
   const user_id = user.sub

    let actionDescription: string;

    // Kiểm tra method của request
    if (user && user_id) {
      switch (method) {
        case 'POST':
          actionDescription = `Thêm mới tại ${request.url}`;
          break;
        case 'PUT':
        case 'PATCH':
          actionDescription = `Chỉnh sửa tại ${request.url}`;
          break;
        case 'DELETE':
          actionDescription = `Xóa tại ${request.url}`;
          break;
        default:
          return next.handle();
      }

      await this.activityLogService.createLog(user_id, actionDescription);
    }

    return next.handle();
  }
}
