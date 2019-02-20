import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { GalleryComponent } from './components/gallery/gallery.component';
import { GiftsComponent } from './components/gifts/gifts.component';
import { RsvpComponent } from './components/rsvp/rsvp.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { AdminComponent } from './components/admin/admin.component';
import { LoadingComponent } from './components/loading/loading.component';

import { LoadingInterceptor } from './interceptors/loading.interceptor';

import { loadingReducer } from './reducers/loading.reducer';
import { getGuestsReducer } from './reducers/get-guests.reducer';
import { addGuestsReducer } from './reducers/add-guests.reducer';
import { GetGuestsEffects } from './effects/get-guests.effects';
import { AddGuestsEffects } from './effects/add-guests.effects';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    GalleryComponent,
    GiftsComponent,
    RsvpComponent,
    NavigationComponent,
    AdminComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
	FormsModule,
	HttpClientModule,
    RouterModule.forRoot([
		{path: '', redirectTo: 'home', pathMatch: 'full' },
		{path : 'home', component: HomeComponent },
		{path : 'gallery', component : GalleryComponent},
		{path : 'gifts', component : GiftsComponent},
		{path: 'rsvp', component : RsvpComponent},
		{path: 'asgtl1f6a/admin', component : AdminComponent}
	]),
	StoreModule.forRoot({ 
		loading: loadingReducer,
		getGuests : getGuestsReducer,
		addGuests : addGuestsReducer
	}),
	EffectsModule.forRoot([
		GetGuestsEffects,
		AddGuestsEffects
	])
  ],
  providers: [
	  {
		  provide: HTTP_INTERCEPTORS,
		  useClass: LoadingInterceptor,
          multi: true
	  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
