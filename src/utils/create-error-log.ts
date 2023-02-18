// import { ErrorLog } from '@/core/database/models/error-log.model';

// export async function createErrorLog(errorLog: any): Promise<void> {
//   const count = await ErrorLog.count();

//   if (count > 100) {
//     ErrorLog.findOne({ order: [['createdAt', 'ASC']] }).then((row) =>
//       row.destroy(),
//     );
//   }

//   ErrorLog.create(errorLog).catch(console.error);
// }
