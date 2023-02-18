import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import * as cache from 'memory-cache';

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = GqlExecutionContext.create(context);
    const cacheKey = ctx.getArgByIndex(3)?.fieldName;
    const cachedData = cache.get(cacheKey);

    if (cachedData) {
      return of(cachedData);
    }

    return next.handle().pipe(
      map((data) => {
        cache.put(cacheKey, data, 300000); // 5 minutes
        return data;
      }),
    );
  }
}
