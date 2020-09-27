import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ReviewService } from '../review.service';

@Component({
  selector: 'abc-edit-review-modal',
  templateUrl: './edit-review-modal.component.html',
  styleUrls: ['./edit-review-modal.component.scss']
})
export class EditReviewModalComponent implements OnInit {

  @Input()
  reviewId: string;
  
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
    this.populateFormWithReviewData(this.movieId, this.reviewId);
  }

  async populateFormWithReviewData(movieId: string, id: string) {
    const review = await this.reviewService.getById(movieId, id);
    this.form.patchValue(review);
  }

  async updateReview() {
    await this.reviewService.update(this.movieId, this.reviewId,this.form.value);
    this.modal.close();
  }

  close(){
    this.modal.close();
  }

}
