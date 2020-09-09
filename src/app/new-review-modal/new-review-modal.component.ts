import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ReviewService } from '../review.service';

//import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'abc-new-review-modal',
  templateUrl: './new-review-modal.component.html',
  styleUrls: ['./new-review-modal.component.scss']
})
export class NewReviewModalComponent implements OnInit {

  @Input()
  movieId: string;

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private modal: NgbActiveModal,
    private reviewService: ReviewService
  ) {
    this.form = this.formBuilder.group({
      header: ['', [Validators.required]],
      description: ['', [Validators.required]],
      rating: [3]
    });
  }

  ngOnInit(): void {
  }

  createReview() {

    const header = this.form.get('header').value;
    const description = this.form.get('description').value;
    const rating = this.form.get('rating').value;

    this.reviewService.create(this.movieId, { header, description, rating });
    this.modal.close();
  }

  close(){
    this.modal.close();
  }

}
