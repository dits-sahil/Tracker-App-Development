import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { StorageKeys } from 'src/app/core/constant/storageKeys';
import { AuthService } from 'src/app/core/services/auth.service';
import { StorageService } from 'src/app/core/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  constructor(
    private readonly firebaseService: AuthService,
    private readonly router: Router,
    private storageService:StorageService
  ) {
    let user:any = storageService.getStorage(StorageKeys.keys.USERDETAIL);
    this.router.navigateByUrl('/admin')
    if (user.role == '1') this.router.navigateByUrl('/admin')
    if (user.role == '2') this.router.navigateByUrl('/manager')
    if (user.role == '3') this.router.navigateByUrl('/user')
  }
  logout() {
    this.firebaseService
      .logout()
      .then(() => this.router.navigate(['/', 'login']));
  }
}
