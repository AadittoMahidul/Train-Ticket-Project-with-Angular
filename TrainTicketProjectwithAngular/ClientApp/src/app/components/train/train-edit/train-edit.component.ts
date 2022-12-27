import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { throwError } from 'rxjs';
import { Train } from 'src/app/models/data/train';
import { baseUrl } from 'src/app/models/shared/app-constants';
import { TrainInputModel } from 'src/app/models/view-models/input/train-input-model';
import { NotifyService } from 'src/app/services/common/notify.service';
import { TrainService } from 'src/app/services/data/train.service';

@Component({
  selector: 'app-train-edit',
  templateUrl: './train-edit.component.html',
  styleUrls: ['./train-edit.component.css']
})
export class TrainEditComponent implements OnInit {

  train: Train = null!;
  imgPath: string = baseUrl;
  trainForm: FormGroup = new FormGroup({
    trainName: new FormControl('', Validators.required),
    startingPoint: new FormControl(undefined, Validators.required),
    destination: new FormControl(undefined, Validators.required),
    isAvailable: new FormControl(undefined),
    picture: new FormControl(undefined, Validators.required)
  });

  file: File = null!;
  constructor(
    private trainService: TrainService,
    private notifyService: NotifyService,
    private activatedRoute: ActivatedRoute
  ) { }
  handleFileInputChange(event: any): void {
    if (event.target.files.length) {
      this.file = event.target.files[0];
      this.trainForm.controls['picture'].patchValue(this.file.name);
    }
    else {
      this.trainForm.controls['picture'].patchValue("");
    }

  }
  save() {
    if (this.trainForm.invalid) return;
    let _self = this;
    Object.assign(this.train, this.trainForm.value);
    console.log(this.train);
    let data: TrainInputModel = { trainId: this.train.trainId, trainName: this.train.trainName, startingPoint: this.train.startingPoint, destination: this.train.destination, isAvailable: this.train.isAvailable };
    this.trainService.update(data)
      .subscribe({
        next: r => {
          this.notifyService.message("Train  updated", "DISMISS");
          if (this.file) {
            _self. updateImage();
          }
        }
      })
  }
  updateImage() {
    let _self = this;
    var reader = new FileReader();

    reader.onload = function (e: any) {
      _self.trainService.uploadImage(<number>_self.train.trainId, _self.file)
        .subscribe({
          next: r => {
            _self.notifyService.message("Picture updated", "DISMISS");
          },
          error: err => {
            _self.notifyService.message("Picture update failed", "DISMISS");
            throwError(() => err);
          }
        })
    }
    reader.readAsArrayBuffer(_self.file);
  }
  ngOnInit(): void {
    let id: number = this.activatedRoute.snapshot.params['id'];
    this.trainService.getById(id)
      .subscribe({
        next: r => {
          this.train = r;
          this.trainForm.patchValue(this.train)
          console.log(this.train)
        },
        error: err => {
          this.notifyService.message('Failed to load train data', 'DISMISS')
          throwError(() => err);
        }
      });
  }
}

