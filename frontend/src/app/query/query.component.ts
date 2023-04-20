import { Component, ElementRef, ViewChild } from '@angular/core';
import { PlayersService } from '../players.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-query',
  templateUrl: './query.component.html',
  styleUrls: ['./query.component.scss']
})
export class QueryComponent {
  allPlayers: any[] = [];
  players: any[] = [];
  displayModal = "none";
  @ViewChild('positions') positions !: ElementRef;

  constructor(private playersService: PlayersService) {
    this.playersService.getPlayers().subscribe((allPlayers: any) => {
      this.allPlayers = allPlayers;
    });
  }

  reset(): void {
    this.players = [];
    this.displayModal = "none";
  }

  open(): void {
    this.reset();
    this.displayModal = "block";
  }

  topThree(): void {
    this.reset();
    this.playersService.topThree().subscribe((players: any) => {
      this.players = players;
    });
  }

  leastPoints(): void {
    this.reset();
    this.playersService.leastPoints().subscribe((players: any) => {
      this.players = players;
    });
  }

  mostAssists(): void {
    this.reset();
    this.playersService.mostAssists().subscribe((players: any) => {
      this.players = players;
    });
  }

  sortByAge(): void {
    this.reset();
    this.playersService.sortByAge().subscribe((players: any) => {
      this.players = players;
    });
  }

  getByPosition(): void {
    this.reset();
    const position = this.positions.nativeElement.value;
    this.playersService.getByPosition(position).subscribe((players: any) => {
      this.players = players;
    });
  }

}