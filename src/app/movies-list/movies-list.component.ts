import { Component, OnInit } from '@angular/core';

import { Movie } from '../models/movie';
import { MovieService} from '../movie.service';

import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EditMovieDetailComponent } from '../edit-movie-detail/edit-movie-detail.component';


@Component({
  selector: 'abc-movies-list',
  templateUrl: './movies-list.component.html',
  styleUrls: ['./movies-list.component.scss']
})
export class MoviesListComponent implements OnInit {

  movies: Movie[] = this.movieService.movieList;
  
  constructor(private movieService: MovieService, private modalService: NgbModal) { }

  ngOnInit() {
    this.fetchMovies();
  }

  fetchMovies(){
    this.movieService.getMovies().subscribe(movies =>{
      this.movieService.movieList = movies;
      this.movies = this.movieService.movieList;
    });
  }

  presentEditMovieModal(id){
    const modal = this.modalService.open(EditMovieDetailComponent,{
      size: 'lg'
    });
    modal.componentInstance.movieId = id;
  }

  deleteMovie(id){
    if(confirm("Are you sure you want to delete this movie from the list?")){
      this.movieService.deleteMovie(id).subscribe((res: any) => {
        location.reload()
      });
    }
  }
}
