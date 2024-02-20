import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Constants {
  public readonly API_ENDPOINT: string = 'https://www.omdbapi.com/';
  public readonly API_KEY: string = 'apikey=f3bf4082&';
}
