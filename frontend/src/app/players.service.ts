import { Injectable } from '@angular/core';
import { WebRequestService } from './web-request.service';

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  constructor(private webReqService: WebRequestService) { }

  getPlayers() {
    return this.webReqService.get('list');
  }

  addPlayer(data: any) {
    return this.webReqService.post('add', data);
  }

  deletePlayer(id: string) {
    return this.webReqService.delete(`delete/${id}`);
  }

  updatePlayer(id: string | undefined, data: any) {
    return this.webReqService.patch(`update/${id}`, data)
  }

  getByPosition(position: string) {
    return this.webReqService.get(`getByPosition/${position}`);
  }

  leastPoints() {
    return this.webReqService.get('leastPoints');
  }

  topThree() {
    return this.webReqService.get('topThree');
  }

  mostAssists() {
    return this.webReqService.get('mostAssists');
  }

  sortByAge() {
    return this.webReqService.get('sortByAge');
  }
}