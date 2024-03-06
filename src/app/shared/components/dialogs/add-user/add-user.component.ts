import { ChangeDetectorRef, Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/core/services/auth.service';
import { FirebaseService } from 'src/app/core/services/firebase.service';
import { ValidationService } from 'src/app/core/services/validation.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {

  addUserForm!: FormGroup;
  gender:any[] = [
    { id: 1, name: 'Male' },
    { id: 2, name: 'Female' },
    { id: 3, name: 'Other' }
  ];
  fileName: string = '';
  @ViewChild('fileInput') el!: ElementRef;
  imageUrl: any ;
  // imageUrl: any = './assets/icons/uploadIconAlarm.svg';
  editFile: boolean = true;
  removeUpload: boolean = false;

  constructor(
    private validationService: ValidationService,
    private readonly firebaseService: AuthService,
    private readonly dataService: FirebaseService,
    private readonly toastrService: ToastrService,
    public dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private cd: ChangeDetectorRef)
    {}

  ngOnInit() {
    this.addUserForm = new FormGroup({
      name: new FormControl<string>('', [
        Validators.required,
        Validators.maxLength(100),
      ]),
      email: new FormControl<string>('', [
        Validators.required,
        Validators.email,
      ]),
      userId: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(10),
      ]),
      gender: new FormControl<string>('', [
        Validators.required,
      ]),
      phoneNumber: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
    });
  }

  getErrorValidator(value: any, label: string) {
    return this.validationService.getErrorValidationMessages(value, this.addUserForm, label);
  }

  getGender(val:any){
    console.log('gender',val)
    this.addUserForm.get('gender')?.setValue(val);
  }

  createUser() {
    if (this.addUserForm.invalid) {
      return;
    }
    let user:any = this.addUserForm.value;
    this.dataService.create('users',user).then((res:any) => {
      this.toastrService.success('User added successfuly');
    })
    .catch((error:any) => this.toastrService.error(error.message));
  }

  closeDialog() {
    this.dialogRef.close();
  }

  uploadFile(event:any) {
    let reader = new FileReader(); 
    let file = event.target.files[0];
    this.fileName = file.name;
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        // this.imageUrl = reader.result;
        this.addUserForm.patchValue({
          file: reader.result
        });
        this.editFile = false;
        this.removeUpload = true;
      }
      this.cd.markForCheck();        
    }
  }

  removeUploadedFile() {
    this.el.nativeElement.value = null;
    this.imageUrl = 'https://i.pinimg.com/236x/d6/27/d9/d627d9cda385317de4812a4f7bd922e9--man--iron-man.jpg';
    this.editFile = true;
    this.removeUpload = false;
    this.addUserForm.patchValue({
      file: [null]
    });
  }

}
