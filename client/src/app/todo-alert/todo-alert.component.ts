import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-todo-alert',
  templateUrl: './todo-alert.component.html',
  styleUrls: ['./todo-alert.component.scss']
})
export class TodoAlertComponent implements OnInit {
  @Input() alerts: Observable<{type: string, message: string}>;

  private alertsSubscription: any
  private allowAlerts = ['success', 'warning', 'danger']

  isDisplay = false;
  alertmessage: string;
  alertClass: string;

  constructor() { }

  ngOnInit() {
    this.alertsSubscription = this.alerts.subscribe((alert) => {


      if ( ! this.allowAlerts.includes(alert.type) ) {
        this.isDisplay = false;
        return;
      }

      this.alertmessage = alert.message;
      this.alertClass = `alert alert-${alert.type}`;

      if (alert.type === 'success') {
          this.isDisplay = true;
          this.display();

          return;
      }
      this.isDisplay = true;      
    })
  }

  ngOnDestroy() {
    this.alertsSubscription.unsubscribe();
  }

  private display() {
    setTimeout(() => this.isDisplay = false, 3000);    
  }

}
