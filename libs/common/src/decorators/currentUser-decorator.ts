import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserDocument } from '../../../../apps/auth/src/users/model/users.schema';


// we are accessing UserDocument here b/z whatever returned from LocalStrategy will be automatically added to the request object as a user property
//Execution context extends the ArguementsHost which gives the additional details about the current execution process
const getCurrentUserByContext = (context: ExecutionContext): UserDocument => {
  return context.switchToHttp().getRequest().user;
};

//to create custom  creating parameter decorators we use createParamDecorator
export const CurrentUser = createParamDecorator(
  (_data: unknown, context: ExecutionContext) =>
    getCurrentUserByContext(context),
);