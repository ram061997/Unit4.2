import { Component } from '@angular/core';
import { PlayersService } from '../players.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-result',
  templateUrl: './result.component.html',
  styleUrls: ['./result.component.scss']
})
export class ResultComponent {
  players: any[] = [];
  displayModal = "none";
  funcName: string | undefined;
  _id: string | undefined;

  form = new FormGroup({
    name: new FormControl('', Validators.required),
    position: new FormControl('', Validators.required),
    jersey: new FormControl('', Validators.required),
    age: new FormControl('', Validators.required),
    assists: new FormControl('', Validators.required),
    points: new FormControl('', Validators.required)
  });

  get f() {
    return this.form.controls;
  }

  resetForm() {
    this.form.reset();
  }
  
  constructor(private playersService: PlayersService) {
    this.getPlayers();
  }

  openPopup(funcName: string, id: string = "") {
    this.displayModal = "block";
    this.funcName = funcName;
    if (typeof id !== "undefined") {
      this._id = id;
    }
  }
  closePopup() {
    this.displayModal = "none";
    this.funcName = undefined;
    this._id = undefined;
    this.resetForm();
  }

  getPlayers(): void {
    this.playersService.getPlayers().subscribe((players: any) => {
      this.players = players;
    });
  }

  removePlayer(id: string): void {
    this.playersService.deletePlayer(id).subscribe((response: any) => {
      this.players = this.players.filter(val => val._id !== id);
    });
  }

  sendData(): void {
    if (this.form.status === 'VALID') {
      console.log(this.form.value);
    }

    if (this.funcName === "add") {
      console.log("In add")
      this.playersService.addPlayer(this.form.value).subscribe((response: any) => {
        this.players = this.players.concat(response);
        this.closePopup();
      })
    }
    else if (this.funcName === "update") {
      console.log("In update")
      this.playersService.updatePlayer(this._id, this.form.value).subscribe((response: any) => {
        this.players = this.players.filter(val => val._id !== this._id);
        this.players = this.players.concat(response);
        this.closePopup();
      })
    }
  }

}
