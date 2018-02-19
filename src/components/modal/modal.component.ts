import { Component, OnInit } from '@angular/core';
import CityService from '../../services/CityService';
import { Output } from '@angular/core';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.sass'],
  providers: [ CityService ]
})
export class ModalComponent{
  private closed: boolean = true;
  private cityName: string;

  @Output() cityAdded = new EventEmitter<void>();
  constructor(private cityService: CityService) {

   }

  openWindow(){
    this.closed = false;
  }

  closeWindow(event){
    this.closed = true;
    this.cityService.addCity(this.cityName);
    this.cityAdded.emit();
  }
  
}
