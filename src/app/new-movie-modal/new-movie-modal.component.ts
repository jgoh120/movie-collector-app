import { Component, OnInit } from '@angular/core';
import { NewMovieComponent } from '../new-movie/new-movie.component';
import { MovieService } from '../movie.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'abc-new-movie-modal',
  templateUrl: './new-movie-modal.component.html',
  styleUrls: ['./new-movie-modal.component.scss']
})
export class NewMovieModalComponent implements OnInit {

  movieForm: FormGroup

  constructor(public activeModal: NgbActiveModal, private movieService: MovieService, 
              private formBuilder: FormBuilder) { 
    this.movieForm = this.formBuilder.group({
      title: [''],
      posterUrl: [''],
      genre: [''],
      rating:['']
      })
    }

  ngOnInit(): void {
  }

  submitNewMovieModal() {
   // onSubmitNewMovie(){
      this.movieService.addMovie(this.movieForm.value).subscribe(() => {
      this.activeModal.close();
      window.location.reload();
    });
  }
}
