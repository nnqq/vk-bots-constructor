import { stringify } from 'querystring';
import fetch from 'node-fetch';
import { logger } from './logger';

interface IConstructor {
  token: string;
  lang?: string;
  v?: number;
}

interface IVkSuccess {
  response: any;
}

interface IVkError {
  error: {
    /* eslint-disable camelcase */
    error_code: number;
    error_msg: string;
    request_params: Array<{
      key: string;
      value: string;
    }>
    /* eslint-enable camelcase */
  }
}

type IVkResponse = IVkSuccess | IVkError;

const isVkError = (res: IVkResponse): res is IVkError => {
  if (typeof (res as IVkError).error !== 'undefined'
    && typeof (res as IVkError).error.error_code !== 'undefined'
    && typeof (res as IVkError).error.error_msg !== 'undefined') return true;

  return false;
};

export class Vk {
  private readonly token: string;

  private readonly lang: string;

  private readonly v: number;

  constructor({
    token, lang = 'ru', v = 5.101,
  }: IConstructor) {
    this.token = token;
    this.lang = lang;
    this.v = v;
  }

  async api(method: string, query?: object): Promise<IVkSuccess['response']> {
    const qs = stringify({
      ...query,
      access_token: this.token,
      lang: this.lang,
      v: this.v,
    });

    const raw = await fetch(`https://api.vk.com/method/${method}?${qs}`, {
      method: 'POST',
    });

    const res: IVkResponse = await raw.json();

    if (isVkError(res)) {
      logger.error(res);
      throw new Error(res.error.error_msg);
    }

    return res.response;
  }
}
