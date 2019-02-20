import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
	
  private isLoading$ : Observable<boolean>;
  
  constructor(private store: Store<{ loading: boolean }>) { }

  ngOnInit() {	  
	this.isLoading$  = this.store.pipe(select('loading'));
  }
    
}
