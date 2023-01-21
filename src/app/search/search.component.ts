import { Component, OnInit,EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  entersearchvalue:string=""
  @Output()
  searchtextchange:EventEmitter<string>=new EventEmitter<string>();
  onsearchtextchanged(){
    this.searchtextchange.emit(this.entersearchvalue);
  }
}
