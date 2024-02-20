import { Component, ViewChild } from '@angular/core';
import { MoviesService } from '../../services/api/movies.service';
import { MovieGetID } from '../../model/movies_get_id';
import { SearchShow } from '../../model/search_show';
import { MoviesGetResponse } from '../../model/movies_get_res';
import top10 from '../../../assets/top10.json';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  PageEvent,
  MatPaginatorModule,
  MatPaginator,
} from '@angular/material/paginator';
import { JsonPipe } from '@angular/common';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    CommonModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    JsonPipe,
    RouterModule,
  ],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  selectedOption = 'name';
  search = '';
  data: any;
  movieID: MovieGetID[] = [];
  moviesSearch: SearchShow[] = [];
  notFound = false;
  length = 0;
  page = 1;
  hiddenPaginator = true;
  top10 = top10;
  top10Movies: any;
  isSearch = false;

  constructor(private moviesService: MoviesService) {}

  ngOnInit(): void {
    this.loadTop10();
  }

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  toSearch() {
    this.paginator.pageIndex = 0;
    this.page = 1;
    this.isSearch = true;
    if (this.selectedOption == 'id') {
      this.loadDataID(this.search);
    } else if (this.selectedOption == 'name') {
      this.loadDataSearch(this.search);
    }
  }

  async loadDataSearch(url: string) {
    this.movieID = new Array();
    this.moviesSearch = new Array();
    this.hiddenPaginator = true;
    this.data = (await this.moviesService.getMoviesSearch(
      url
    )) as MoviesGetResponse[];
    if (this.data.Response == 'True') {
      this.moviesSearch = this.data.Search;
      this.length = Number(this.data.totalResults);
      this.hiddenPaginator = false;
      this.notFound = false;
    } else if (this.data.Response == 'False') {
      console.error();
      this.notFound = true;
    }

    // if (this.length > 10) {
    //   this.hiddenPaginator = false;
    // }
  }

  async loadDataID(url: string) {
    this.movieID = new Array();
    this.moviesSearch = new Array();
    this.hiddenPaginator = true;
    this.data = (await this.moviesService.getMovieID(url)) as MovieGetID[];
    if (this.data.Response == 'False') {
      this.notFound = true;
      this.movieID = new Array();
    } else {
      this.movieID.push(this.data);
      this.notFound = false;
    }
  }

  async loadTop10() {
    this.top10Movies = new Array();
    for (const item of this.top10) {
      let temp = (await this.moviesService.getMovieID(
        item.imdbID
      )) as SearchShow[];
      this.top10Movies.push(temp);
    }
  }

  onPageChange($event: PageEvent) {
    this.page = $event.pageIndex + 1;
    this.loadDataSearch(this.search + '&page=' + this.page);
  }

  reloadPage() {
    window.location.href = window.location.href;
  }
}
