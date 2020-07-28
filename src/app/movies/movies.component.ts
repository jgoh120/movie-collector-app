import { Component, OnInit, NgModule, Input, Output} from '@angular/core';
import { Movie } from '../models/movie';
import { MovieService} from '../movie.service';


import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewMovieComponent } from '../new-movie/new-movie.component';
import { NewMovieModalComponent } from '../new-movie-modal/new-movie-modal.component';
import { EditMovieDetailComponent } from '../edit-movie-detail/edit-movie-detail.component';


@Component({
  selector: 'abc-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {
  //Movie = new Movie(1,"","","",0);

  movies: Movie[] = this.movieService.movieList;
  // movies: Movie[] = [
  //   {
  //     title: 'Avengers: End Game',
  //     genre: 'Action',
  //     rating: 4.8,
  //     posterUrl: 'https://is3-ssl.mzstatic.com/image/thumb/Video113/v4/6e/47/f6/6e47f680-ac54-21ff-a37a-3aab1a9970b0/DIS_AV_ENDGAME_FINAL_ENGLISH_US_WW_WW_ARTWORK_EN_2000x3000_1OWPBJ00000GQ6.lsr/268x0w.jpg'
  //   },
  //   ...
  // ];

  constructor(private movieService: MovieService, private modalService: NgbModal) { }

  isLogin: boolean=true;
  loginUserID: String = ""
  
  ngOnInit() {
    if(localStorage.getItem('currentUser') == null){
      this.isLogin = false;
    } 
    else {
      var currentUser = localStorage.getItem('currentUser');
      var loginUser = JSON.parse(currentUser);
      this.loginUserID = loginUser.userID;
      //console.log(this.loginUserID);
    }
    this.fetchMovies();
  }

  fetchMovies(){
    this.movieService.getMovies().subscribe(movies =>{
      this.movieService.movieList = movies;
      this.movies = this.movieService.movieList;
    });
  }

  presentNewMovieModal(){
    const modal = this.modalService.open(NewMovieModalComponent,{
      size: 'lg'
    });
  }

  presentEditMovieModal(id){
    const modal = this.modalService.open(EditMovieDetailComponent,{
      size: 'lg'
    });
    modal.componentInstance.movieId = id;
  }
  deleteMovie(id){
    if(confirm("Are you sure you want to delete?")){
      this.movieService.deleteMovie(id).subscribe((res: any) => {
        location.reload()
      });
    }
  }

}


