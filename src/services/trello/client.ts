import axios from 'axios';
const config = require('../../config');

const BASE_API_URL = 'https://api.trello.com/1';

type HttpMethod = 'get' | 'delete' | 'post' | 'put';

export class TrelloClient {
  constructor(private boardId: string) {}

  public getLists(): Promise<any> {
    return this.resource('lists');
    'get | put';
  }

  public getCards(): Promise<any> {
    return this.resource('cards');
  }

  public updateCard(cardId: string, update: any): Promise<any> {
    // TODO: add support for multi attrs update
    let url = `${BASE_API_URL}/cards/${cardId}/${Object.keys(update)[0]}`;

    url = this.addAuth(url);
    url += `&value=${Object.values(update)}`;

    return this.request('put', url);
  }

  private async resource(name: string): Promise<any> {
    let fullUrl = `${BASE_API_URL}/boards/${this.boardId}/${name}`;
    const response = await axios.get(this.addAuth(fullUrl));

    return response.data;
  }

  private async request(
    method: HttpMethod,
    url: string,
    data: any = {}
  ): Promise<any> {
    let response = {};
    try {
      response = await axios.request({ method, url, data });
    } catch (error) {
      console.error(error);
    }
    return response;
  }

  private addAuth(url: string): string {
    const key = config.get('services.trello.appKey');
    const token = config.get('services.trello.apiToken');

    return url + `?key=${key}&token=${token}`;
  }
}
