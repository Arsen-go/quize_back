import { ExecutionContext, createParamDecorator } from '@nestjs/common';

import { GqlExecutionContext } from '@nestjs/graphql';

export const AccessToken = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);

    return ctx.getContext().req.accessToken;
  },
);
