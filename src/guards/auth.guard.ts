// import { OrgSettings } from '@/core/database/models/org-settings.model';
// import {
//   Injectable,
//   CanActivate,
//   ExecutionContext,
//   UnauthorizedException,
// } from '@nestjs/common';
// import { GqlExecutionContext } from '@nestjs/graphql';
// import * as fetch from 'node-fetch';
// import { setupUserLogin } from '@Guards/utils/setup-user-login';
// import { Member } from '@/core/database/models/member.model';
// import { getMemberColor } from '@Constants/people-colors';

// @Injectable()
// export class AuthGuard implements CanActivate {
//   async canActivate(context: ExecutionContext): Promise<boolean> {
//     const req = GqlExecutionContext.create(context).getContext()?.req;
//     req.startTime = Date.now();

//     return fetch(`${process.env.GET_ME}`, {
//       headers: {
//         Accept: 'application/json',
//         'Content-Type': 'application/json',
//         Authorization: `${req.headers?.authorization}`,
//       },
//     })
//       .then(async (res) => {
//         if (!res) throw new UnauthorizedException('Unauthorized');

//         const user = await res.json();

//         if (!user?.data) {
//           throw new UnauthorizedException('Unauthorized');
//         }

//         req.user = { ...user.data, apiToken: user.apiToken };

//         await Member.findOne({
//           where: {
//             userId: req.user.userID,
//           },
//         }).then((row) => {
//           if (row)
//             return row.update({
//               firstName: user.data.firstName,
//               lastName: user.data.lastName,
//               emailAddress: user.data.emailAddress,
//               online: true,
//             });

//           return Member.create({
//             userId: user.data.userID,
//             firstName: user.data.firstName,
//             lastName: user.data.lastName,
//             emailAddress: user.data.emailAddress,
//             online: true,
//             color: getMemberColor(),
//           });
//         });

//         if (user.data.orgID) {
//           setupUserLogin({ user: user.data }).catch(console.error);
//         }

//         return true;
//       })
//       .catch(() => {
//         throw new UnauthorizedException('Unauthorized');
//       });
//   }
// }
