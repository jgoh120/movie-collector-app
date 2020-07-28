import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { MovieService } from '../movie.service';
import { FormGroup, FormBuilder, FormControl, Validators } from "@angular/forms";

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'abc-edit-movie-detail',
  templateUrl: './edit-movie-detail.component.html',
  styleUrls: ['./edit-movie-detail.component.scss']
})
export class EditMovieDetailComponent implements OnInit {

  @Input()
  movieId: string;
  /*
  movieForm: FormGroup;
    id: '';
    title: '';
    posterUrl: string = '';
    genre: string = '';
    rating: number = null;  */

    movieForm: FormGroup

  constructor(private router: Router, private route: ActivatedRoute, 
              private movieService: MovieService, private formBuilder: FormBuilder,
              private activeModal: NgbActiveModal) {

                this.movieForm = this.formBuilder.group({
                  title: [''],
                  posterUrl: [''],
                  genre: [''],
                  rating:['']
                  })
              }

  ngOnInit(): void {
    console.log(this.movieId);
    this.getMovieById(this.movieId);
    this.movieForm = this.formBuilder.group({
      id: [null, Validators.required],
      title: [null, Validators.required],
      posterUrl: [null, Validators.required],
      genre: [null, Validators.required],
      rating:[null, Validators.required]
    });
  }

  getMovieById(id: any){
    this.movieService.getMovieById(id).subscribe((data: any)=>{
      this.movieForm.setValue({
        id: data._id,
        title: data.title,
        genre: data.genre,
        rating: data.rating,
        posterUrl: data.posterUrl
      });
    });
  }

  onFormSubmit(){
    this.movieService.updateMovie(this.movieId, this.movieForm.value)
    .subscribe((res: any) => {
      this.activeModal.close();
      location.reload()
      /*this.movieService.getMovies().subscribe(movies =>{
        this.movieService.movieList = movies;
      });*/
    });
  }

}
