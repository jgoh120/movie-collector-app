import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
//import { HttpEvent } from '@angular/common/http';
import { MovieService } from '../movie.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

// import { movie.service, MovieService } from './../../app/movie.service'
import { MoviesComponent } from '../movies/movies.component';

@Component({
  selector: 'abc-new-movie',
  templateUrl: './new-movie.component.html',
  styleUrls: ['./new-movie.component.scss']
})
export class NewMovieComponent implements OnInit {
  
  movieForm: FormGroup;
    id: '';
    title: '';
    posterUrl: string = '';
    genre: string = '';
    rating: number = null;

    constructor(private router: Router, private movieService: MovieService, private formBuilder: FormBuilder) { }

    ngOnInit(): void {
      this.movieForm = this.formBuilder.group({
          title: [null, Validators.required],
          posterUrl: [null],
          genre: [null, Validators.required],
          rating:[null, Validators.required]
      });
    } 

  onSubmitNewMovie(){
    this.movieService.addMovie(this.movieForm.value)
      .subscribe((res: any) => {
        //const id = res._id;
        this.router.navigate(['/movies']);
      });
  }

}
