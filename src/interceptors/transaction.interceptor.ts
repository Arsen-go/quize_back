// import {
//   CallHandler,
//   ExecutionContext,
//   HttpException,
//   Injectable,
//   NestInterceptor,
// } from '@nestjs/common';
// import { catchError, tap } from 'rxjs/operators';
// import { databaseProviders } from '@/core/database/database.providers';
// import { GqlExecutionContext } from '@nestjs/graphql';
// import { Observable } from 'rxjs';
// import { Transaction } from 'sequelize';

// @Injectable()
// export class TransactionInterceptor implements NestInterceptor {
//   async intercept(
//     context: ExecutionContext,
//     next: CallHandler,
//   ): Promise<Observable<any>> {
//     const ctx = GqlExecutionContext.create(context);
//     const req = ctx.getContext().req;
//     const sequelize = await databaseProviders[0].useFactory();
//     const transaction: Transaction = await sequelize.transaction({
//       logging: true,
//     });
//     req.transaction = transaction;

//     return next.handle().pipe(
//       tap(async () => {
//         await transaction.commit();
//       }),
//       catchError(async (err) => {
//         await transaction.rollback();
//         throw new HttpException({ message: err }, err.status || 500);
//       }),
//     );
//   }
// }
