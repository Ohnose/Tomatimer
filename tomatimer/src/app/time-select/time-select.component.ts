import { Component, OnInit, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-time-select',
  templateUrl: './time-select.component.html',
  styleUrls: ['./time-select.component.css']
})
export class TimeSelectComponent implements OnInit {

  @Output() timeSelectedMessage = new EventEmitter<number[]>();

  constructor() { }

  ngOnInit(): void {
  }

  standardClick() {
    this.timeSelectedMessage.emit([25, 5]);
  }

  extraClick() {
    this.timeSelectedMessage.emit([50, 10]);
  }

  customClick() {
    this.timeSelectedMessage.emit([-1, -1]);
  }

}
