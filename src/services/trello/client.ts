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
    let url = `${BASE_API_URL}/boards/${this.boardId}/cards/${cardId}`;

    url = this.addAuth(url);

    for (const obj of Object.entries(update)) {
      url += `&${obj[0]}=${obj[1]}`;
    }

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
    return axios.request({ method, url, data });
  }

  private addAuth(url: string): string {
    const key = config.get('services.trello.appKey');
    const token = config.get('services.trello.apiToken');

    return url + `?key=${key}&token=${token}`;
  }
}
