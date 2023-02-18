// import { QueryCounts } from '@/constants/query-counts';
// import { createPerformanceLog } from '@/utils/create-performance-log';
// import {
//   Injectable,
//   NestInterceptor,
//   ExecutionContext,
//   CallHandler,
// } from '@nestjs/common';
// import { GqlExecutionContext } from '@nestjs/graphql';
// import { Observable } from 'rxjs';
// import { tap } from 'rxjs/operators';

// @Injectable()
// export class LoggingInterceptor implements NestInterceptor {
//   intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
//     const ctx = GqlExecutionContext.create(context);
//     const req = ctx.getContext().req;

//     return next.handle().pipe(
//       tap((res) => {
//         const apiName = ctx.getArgByIndex(3)?.fieldName;
//         const responseTime = Date.now() - req.startTime;
//         console.log(`Request ends... ${responseTime}ms`);

//         createPerformanceLog({
//           queryCount: res.queryCount ? res.queryCount : QueryCounts[apiName],
//           responseTime,
//           user: req.user,
//           path: apiName || '',
//           method: req.method,
//         }).catch(console.error);
//       }),
//     );
//   }
// }
