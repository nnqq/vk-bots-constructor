interface IRequest {
  [key: string]: any;
}

export const handlerDecorator = (func: Function) => (req: IRequest) => func(req.params);
