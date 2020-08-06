import { Component, OnInit, Input } from '@angular/core';
import { MovieService } from '../movie.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'abc-edit-movie-detail',
  templateUrl: './edit-movie-detail.component.html',
  styleUrls: ['./edit-movie-detail.component.scss']
})
export class EditMovieDetailComponent implements OnInit {

  @Input()
  movieId: string;

  form: FormGroup;

  constructor(
    private movieService: MovieService,
    private formBuilder: FormBuilder,
    private activeModal: NgbActiveModal
  ) {

    this.form = this.formBuilder.group({
      title: ['', [Validators.required]],
      posterUrl: ['', [Validators.required]],
      genre: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.populatFormWithMovieData(this.movieId);
  }

  async populatFormWithMovieData(id: string) {
    const movie = await this.movieService.getById(id);
    this.form.patchValue(movie);
  }

  async updateMovie() {
    await this.movieService.update(this.movieId, this.form.value);
    this.activeModal.close();
    window.location.reload();
  }
}
