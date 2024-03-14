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
  managersArray: any[] = []
  fileName: string = '';
  @ViewChild('fileInput') el!: ElementRef;
  imageUrl: any;
  editFile: boolean = true;
  removeUpload: boolean = false;
  isReadOnly: boolean = true
  userType: any = ''
  selectedRole: any
  parent: any = ''
  constructor(
    private storage: AngularFireStorage,
    private validationService: ValidationService,
    private authService: AuthService,
    private dbService: FirebaseService,
    private toastrService: ToastrService,
    private storageService: StorageService,
    public dialogRef: MatDialogRef<any>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.getFormType()
    this.getManagersList()
  }

  get userRoleConfig() {
    return userRoleConfig
  }

  get getLoggedInUserId() {
    return this.authService.loggedInUserId()
  }

  get getLoggedInUserRole() {
    return this.authService.loggedInUserRole()
  }

  getFormType() {
    if (this.data.evetType == 'update') {
      this.isReadOnly = true
      this.initializeForm();
      this.getUserData()

    } else {
      this.initializeForm();
    }

  }

  getUserData() {
    this.dbService.getDataById('users', this.data.id).subscribe((res: any) => {
      let user = res
      this.selectedRole = user.role
      this.addUserForm.patchValue({
        name: user.name,
        email: user.email,
        gender: user.gender,
        role: user.role,
        phoneNumber: user.phoneNumber,
        profileImage: user.profileImage,
        parent: user.parent,
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
      parent: new FormControl<string>('', [

      ]),
      role: new FormControl<string>('', [
      ]),
      phoneNumber: new FormControl<string>('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
      ]),
      profileImage: new FormControl<any>('', [])
    });

    if (this.getLoggedInUserRole == this.userRoleConfig.MANAGER) {
      this.setManagerData();
    }
  }

  getErrorValidator(value: any, label: string) {
    return this.validationService.getErrorValidationMessages(value, this.addUserForm, label);
  }

  getGender(val: any) {
    this.addUserForm.get('gender')?.setValue(val);
  }

  getRole(val: any) {
    this.addUserForm.get('role')?.setValue(val);
    if (val == userRoleConfig.REGULARUSER) {
      let parentControl: any = this.addUserForm.controls['parent'];
      parentControl.setValue('');
      parentControl.setValidators([Validators.required]);
      parentControl.updateValueAndValidity();
    }
    if (val == userRoleConfig.MANAGER) {
      let id = this.getLoggedInUserId;
      this.addUserForm.get('parent')?.setValue(id);
    }
    this.selectedRole = val
  }

  getParent(val: any) {
    this.addUserForm.get('parent')?.setValue(val);
    this.parent = val
  }

  async userAction() {
    if (this.addUserForm.invalid) {
      this.addUserForm.markAllAsTouched();
      return;
    }
    let formData: any = this.addUserForm.value;
    try {
      if (formData.profileImage != '' && typeof formData.profileImage == 'object') {
        await this.uploadFileOnFirebase(formData.profileImage);
      } else {
        this.saveOrUpdateFn(formData)
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
    this.authService.createUser({ email: user.email, password: "abc123" }).then(async (res: any) => {
      this.authService.signInWithToken();
      let loggedInUser: any = JSON.parse(this.storageService.getStorage(StorageKeys.keys.USERDETAIL) || '')
      let registerUser: any = res.user;
      let uid: any = registerUser.uid;
      let timeStamp = Date.now()
      user = { ...user, uid, createdOn: timeStamp, createdBy: loggedInUser.uid }
      this.dbService.set('users', uid, user)
      this.closeDialog();
      this.toastrService.success('User added successfully');
    }).catch((err: any) => {
      console.log('err:', err)
    });
  }

  setManagerData() {
    this.addUserForm.get('role')?.setValue(this.userRoleConfig.REGULARUSER);
    this.addUserForm.get('parent')?.setValue(this.getLoggedInUserId);
  }

  updateUserFn(user: any) {
    let uid = this.data.id
    this.dbService.update('users', uid, user)
    this.closeDialog();
    this.toastrService.success('User updated successfully');
  }

  saveOrUpdateFn(user: any) {
    if (this.data.evetType != 'update') {
      this.addUserOnF(user)
    } else {
      this.updateUserFn(user)
    }
  }

  getManagersList() {
    this.dbService.getAll('users', 'role', this.userRoleConfig.MANAGER, 'equalTo').subscribe(
      {
        next: (res: any) => {
          if (res) {
            let mangersArr: any = []
            res.map((items: any) => mangersArr = [...mangersArr, { id: items.uid, name: items.name }])
            this.managersArray = mangersArr
          }
        },
        error: (err: any) => console.log(err),
        complete: () => console.log('complete'),
      }
    )
  }


}
