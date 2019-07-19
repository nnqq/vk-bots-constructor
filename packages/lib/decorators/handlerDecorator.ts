export const handlerDecorator = (func: Function) => (req: any) => func(req.params);
