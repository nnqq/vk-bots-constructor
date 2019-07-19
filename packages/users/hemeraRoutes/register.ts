import { IHemeraPath } from '../../lib/hemera';
import { handlerDecorator } from '../../lib/decorators/handlerDecorator';

export const path: IHemeraPath = {
  topic: 'users',
  cmd: 'register',
};

export interface IParams {
  code: string;
}

export interface IResponse {
  message: string;
}

export const handler = handlerDecorator(async (params: IParams): Promise<IResponse> => {
  const { code } = params;
  return {
    message: `${code}+123`,
  };
});
