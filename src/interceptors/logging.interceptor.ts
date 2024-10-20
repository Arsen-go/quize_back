import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';

import { GqlExecutionContext } from '@nestjs/graphql';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = GqlExecutionContext.create(context);
    const req = ctx.getContext().req;

    return next.handle().pipe(
      tap((res) => {
        const apiName = ctx.getArgByIndex(3)?.fieldName;
        const responseTime = performance.now() - req.requestStartTime;
        console.log(`Request ends...${apiName} ${responseTime}ms`);
      }),
    );
  }
}
