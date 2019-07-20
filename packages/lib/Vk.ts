import { stringify } from 'querystring';
import fetch from 'node-fetch';

interface IConstructor {
  token: string;
  rps?: number;
  lang?: string;
  v?: number;
}

export class Vk {
  private readonly token: string;

  private readonly rps: number;

  private readonly lang: string;

  private readonly v: number;

  private currentRps: number;

  constructor({
    token, rps = 3, lang = 'ru', v = 5.101,
  }: IConstructor) {
    this.token = token;
    this.rps = rps;
    this.lang = lang;
    this.v = v;

    this.currentRps = 0;

    setInterval(() => {
      if (this.currentRps > 0) this.currentRps -= 1;
    }, 1000);
  }

  api(method: string, query?: object): Promise<any> {
    const request = async () => {
      const qs = stringify({
        ...query,
        access_token: this.token,
        lang: this.lang,
        v: this.v,
      });

      console.error(`https://api.vk.com/method/${method}?${qs}`);

      const raw = await fetch(`https://api.vk.com/method/${method}?${qs}`);

      const response = await raw.json();

      if (raw.ok) {
        console.error('RAW IS OK');
        return response;
      }

      throw response;
    };

    return new Promise((resolve, reject) => {
      const timerId = setInterval(async () => {
        if (this.currentRps < this.rps) {
          this.currentRps += 1;

          clearInterval(timerId);

          request()
            .then((response) => {
              resolve(response);
            })
            .catch((e) => {
              reject(e);
            });
        }
      }, 1000);
    });
  }
}
