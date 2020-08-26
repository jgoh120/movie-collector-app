import { Component, OnInit } from '@angular/core';
import { MovieService, NewMovie } from '../movie.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'abc-new-movie-modal',
  templateUrl: './new-movie-modal.component.html',
  styleUrls: ['./new-movie-modal.component.scss']
})
export class NewMovieModalComponent implements OnInit {

  form: FormGroup

  constructor(
    private modal: NgbActiveModal,
    private movieService: MovieService,
    private formBuilder: FormBuilder
  ) {

    this.form = this.formBuilder.group({
      title: ['', [Validators.required]],
      posterUrl: ['', [Validators.required]],
      genre: ['', [Validators.required]]
    });

  }

  ngOnInit(): void {
  }

  async createMovie() {
    const movie = this.form.value as NewMovie;
    await this.movieService.create(movie);

    this.modal.close();
  }

  close(){
    this.modal.close();
  }

}
