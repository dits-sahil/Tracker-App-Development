import { ChangeDetectorRef, Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { userRoleConfig } from 'src/app/core/constant/User.config';
import { AuthService } from 'src/app/core/services/auth.service';
import { FirebaseService } from 'src/app/core/services/firebase.service';
import { ValidationService } from 'src/app/core/services/validation.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent {

  addUserForm!: FormGroup;
  gender: any[] = [
    { id: 1, name: 'Male' },
    { id: 2, name: 'Female' },
    { id: 3, name: 'Other' }
  ];
  rolesArray: any[] = [
    { id: userRoleConfig.MANAGER, name: 'Manager' },
    { id: userRoleConfig.REGULARUSER, name: 'Regular User' }
  ];
  fileName: string = '';
  @ViewChild('fileInput') el!: ElementRef;
  imageUrl: any;
  // imageUrl: any = './assets/icons/uploadIconAlarm.svg';
  editFile: boolean = true;
  removeUpload: boolean = false;

  constructor(
    private storage: AngularFireStorage,
    private validationService: ValidationService,
    private readonly firebaseService: AuthService,
    private readonly dataService: FirebaseService,
    private readonly toastrService: ToastrService,
    public dialogRef: MatDialogRef<AddUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

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
      gender: new FormControl<string>('', [
        Validators.required,
      ]),
      role: new FormControl<string>('', [
        Validators.required,
      ]),
      phoneNumber: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
      profileImage: new FormControl<any>('', [])
    });
  }

  getErrorValidator(value: any, label: string) {
    return this.validationService.getErrorValidationMessages(value, this.addUserForm, label);
  }

  getGender(val: any) {
    this.addUserForm.get('gender')?.setValue(val);
  }
  getRole(val: any) {
    this.addUserForm.get('role')?.setValue(val);
  }

  async createUser() {
    if (this.addUserForm.invalid) {
      return;
    }

    let formData: any = this.addUserForm.value;

    try {
      if (formData.profileImage != '') {
        await this.uploadFileOnFirebase(formData.profileImage);
      } else {
        this.addUserOnF(formData)
      }



    } catch (error: any) {
      this.toastrService.error(error.message);
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  uploadFile(event: any) {

    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0] as File;
      this.addUserForm.get('profileImage')?.setValue(file);
    }
  }

  async uploadFileOnFirebase(image: any) {
    let selectedFile = image
    if (!selectedFile) {
      console.error('No file selected.');
      return;
    }

    const filePath = `images/${Date.now()}_${selectedFile.name}`;
    const fileRef = this.storage.ref(filePath);
    const uploadTask = this.storage.upload(filePath, selectedFile);

    uploadTask.percentageChanges().subscribe((percentage: any) => {
      console.log('uploading ', Math.round(percentage));
    });

    uploadTask.snapshotChanges().pipe(
      finalize(() => {
        fileRef.getDownloadURL().subscribe((url) => {
          this.addUserForm.get('profileImage')?.setValue(url);
          this.addUserOnF(this.addUserForm.value);
        });
      })
    ).subscribe();
  }

  addUserOnF(user: any) {

    this.firebaseService.createUser({ email: user.email, password: "abc123" }).then(async (e: any) => {
      this.firebaseService.signInWithToken();
      this.dataService.set('users', e.user.uid, user)
      this.toastrService.success('User added successfully');
    }).catch((err: any) => {
      console.log('err:', err)
    });
  }

}
