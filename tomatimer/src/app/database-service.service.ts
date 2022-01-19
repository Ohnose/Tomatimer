import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/compat/database';
import { BehaviorSubject, Observable } from 'rxjs';


export class Timesheet {
  startDate: Date;
  endDate: Date;

  constructor() {
    this.startDate = new Date();
    this.endDate = new Date();
  }

  updateEndDate(endDate: Date): void {
    this.endDate = endDate;
  }
}

export interface latestId {
  timeId: number;
}

@Injectable({
  providedIn: 'root'
})
export class DatabaseServiceService {

  private UUIDSubject:BehaviorSubject<string> = new BehaviorSubject<string>("");
  sendUUID: Observable<string> = this.UUIDSubject.asObservable();
  currentUUID: string = "";

  setCurrentUUID(UUID: string) {
    this.UUIDSubject.next(UUID);
    this.currentUUID = UUID;
  }

  resetCurrentUUID() {
    this.UUIDSubject.next("");
    this.currentUUID = "";
  }

  getCurrentTimesheetObservable(): AngularFireObject<latestId>  {
    return this.db.object('LatestTimeId/' + this.currentUUID);
  };

  setLatestTimeId(id: number) {
    this.db.object('LatestTimeId/' + this.currentUUID).set({timeId: id});
  }

  addTimerData(id: number, startTime: any, endTime: any, work: boolean, localUUID?: string) {
    if (localUUID || this.currentUUID) {
      let addition = localUUID ? localUUID : this.currentUUID; 
      let reference = this.db.object('UserTimeInfo/' + addition);
      let tempMap: {[key:string]: object} = {};
      tempMap[id.toString()] = {startDate: startTime, endDate: endTime, work: work}; 
      reference.update(tempMap).then(()=> {
        this.setLatestTimeId(id+1);
      }).catch((error)=> {
        console.error(error)
      });
    }
  }

  getDataObservable() {
    return this.db.list('UserTimeInfo/' + this.currentUUID);
  }

  constructor(public db: AngularFireDatabase) { }

}