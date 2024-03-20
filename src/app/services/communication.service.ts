import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommunicationService {

  private appraisalCreatedSource = new Subject<any>();

  appraisalCreated$ = this.appraisalCreatedSource.asObservable();

  emitAppraisalCreated(data: any) {
    this.appraisalCreatedSource.next(data);
  }
  
  constructor() { }
}
