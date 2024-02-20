import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Constants } from '../../config/constants';
import { lastValueFrom } from 'rxjs';
import { MoviesGetResponse } from '../../model/movies_get_res';
import { MovieGetID } from '../../model/movies_get_id';

@Injectable({
  providedIn: 'root',
})
export class MoviesService {
  constructor(private constants: Constants, private http: HttpClient) {}

  public async getMoviesSearch(search: string, options?: any) {
    const url =
      this.constants.API_ENDPOINT +
      '?' +
      this.constants.API_KEY +
      's=' +
      search;
    const response = await lastValueFrom(this.http.get(url));
    return response as MoviesGetResponse[];
  }

  public async getMovieID(id: string, option?: any) {
    const url =
      this.constants.API_ENDPOINT + '?' + this.constants.API_KEY + 'i=' + id;
    const response = await lastValueFrom(this.http.get(url));
    return response as MovieGetID[];
  }
}
