import { Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { MovieGetID } from '../../model/movies_get_id';
import { MoviesService } from '../../services/api/movies.service';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-detail',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    RouterModule,
  ],
  templateUrl: './detail.component.html',
  styleUrl: './detail.component.scss',
})
export class DetailComponent {
  imdbID = '';
  data: any;
  movieID: MovieGetID[] = [];

  constructor(
    private activeatedRoute: ActivatedRoute,
    private location: Location,
    private moviesService: MoviesService
  ) {}

  ngOnInit() {
    this.imdbID =
      this.activeatedRoute.snapshot.queryParamMap.get('imdbID') || '';
    this.loadData();
  }

  async loadData() {
    this.data = (await this.moviesService.getMovieID(
      this.imdbID
    )) as MovieGetID[];
    if (this.data.Response == 'False') {
      this.movieID = new Array();
    } else {
      this.movieID.push(this.data);
    }
  }
}
