import { ChangeDetectorRef, Component, ElementRef, Inject, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { userRoleConfig } from 'src/app/core/constant/User.config';
import { AuthService } from 'src/app/core/services/auth.service';
import { FirebaseService } from 'src/app/core/services/firebase.service';
import { ValidationService } from 'src/app/core/services/validation.service';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize } from 'rxjs/operators';
import { StorageKeys } from 'src/app/core/constant/storageKeys';
import { StorageService } from 'src/app/core/services/storage.service';


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
    private firebaseService: AuthService,
    private dbService: FirebaseService,
    private toastrService: ToastrService,
    private storageService: StorageService,
    public dialogRef: MatDialogRef<AddUserComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.getFormType()
  }

  get userRoleConfig() {
    return userRoleConfig
  }
  getFormType() {
    if (this.data.evetType == 'update') {
      this.initializeForm();
      this.addUserForm.controls['email'].disable();
      this.getUserData()
    } else {
      this.initializeForm();
    }
  }

  getUserData() {
    this.dbService.getDataById('users', this.data.id).subscribe((res: any) => {
      let user = res
      this.addUserForm.patchValue({
        name: user.name,
        email: user.email,
        gender: user.gender,
        role: user.role,
        phoneNumber: user.phoneNumber,
        profileImage: user.profileImage,
      })
      this.imageUrl = user.profileImage
    });
  }
  initializeForm() {
    this.addUserForm = this.formBuilder.group({
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

  async userAction() {
    if (this.addUserForm.invalid) {
      this.addUserForm.markAllAsTouched();
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

  closeDialog(data?: any) {
    this.dialogRef.close(data);
  }

  uploadFile(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0] as File;
      this.fileName = file.name
      const reader = new FileReader();
      reader.onload = (e) => (this.imageUrl = reader.result);
      reader.readAsDataURL(file);
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
          this.saveOrUpdateFn(this.addUserForm.value);
        });
      })
    ).subscribe();
  }

  addUserOnF(user: any) {
    this.firebaseService.createUser({ email: user.email, password: "abc123" }).then(async (res: any) => {
      this.firebaseService.signInWithToken();
      let loggedInUser: any = JSON.parse(this.storageService.getStorage(StorageKeys.keys.USERDETAIL) || '')
      let registerUser: any = res.user;
      let uid: any = registerUser.uid;
      let timeStamp = Date.now()
      let dataNode = user.role == userRoleConfig.MANAGER ? 'manager' : 'regularUsers'
      user = { ...user, uid, createdOn: timeStamp, createdBy: loggedInUser.uid }
      this.dbService.set('users', uid, user)
      this.dbService.set(dataNode, uid, user)
      this.toastrService.success('User added successfully');
    }).catch((err: any) => {
      console.log('err:', err)
    });
  }

  updateUserFn(user:any) {
    let dataNode = user.role == userRoleConfig.MANAGER ? 'manager' : 'regularUsers'
    let uid = this.data.id
    this.dbService.update('users', uid, user)
    this.dbService.update(dataNode, uid, user)
    this.toastrService.success('User updated successfully');
  }

  saveOrUpdateFn(user: any) {
    if (this.data.evetType != 'update') {
      this.addUserOnF(user)
    } else {
      this.updateUserFn(user)
    }
  }


}
