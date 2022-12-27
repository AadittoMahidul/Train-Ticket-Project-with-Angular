import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TrainInputModel } from 'src/app/models/view-models/input/train-input-model';
import { NotifyService } from 'src/app/services/common/notify.service';
import { TrainService } from 'src/app/services/data/train.service';

@Component({
  selector: 'app-train-create',
  templateUrl: './train-create.component.html',
  styleUrls: ['./train-create.component.css']
})
export class TrainCreateComponent implements OnInit {

  train: TrainInputModel = { trainName: undefined, startingPoint: undefined, destination:undefined, isAvailable: undefined };

  trainForm: FormGroup = new FormGroup({
    trainName: new FormControl('', Validators.required),
    startingPoint: new FormControl(undefined, Validators.required),
    destination: new FormControl(undefined, Validators.required),
    isAvailable: new FormControl(undefined),
    picture: new FormControl(undefined, Validators.required)
  });
  save() {
    if (this.trainForm.invalid) return;
    Object.assign(this.train, this.trainForm.value)
    //console.log(this.train);
    var _self = this;
    
    this.trainService.insert(this.train)
      .subscribe({
        next: r => {
          _self.notifyService.message('Data saved', 'DISMISS');
          var file = this.trainForm.controls['picture'].value.files[0];
          var reader = new FileReader();
          
          reader.onload = function (e: any) {
            console.log(e);
            _self.trainService.uploadImage(<number>r.trainId, file)
              .subscribe({
                next: r => {
                  _self.notifyService.message('Picture uploaded', 'DISMISS');
                },
                error: err => {
                  _self.notifyService.message('Picture upload failed', 'DISMISS');
                }
              });
          }
          reader.readAsArrayBuffer(file);
        },
        error: err => {
        _self.notifyService.message('Failed to save train', 'DISMISS')
        }
      });


  }

  constructor(
    private trainService: TrainService,
    private notifyService: NotifyService
  ) { }

  ngOnInit(): void {

  }

}
