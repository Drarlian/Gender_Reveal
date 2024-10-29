import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { HeaderComponent } from '../../components/header/header.component';
import { UserInformations } from '../../interfaces/ISignin';
import { UsersService } from '../../services/users/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-page',
  standalone: true,
  imports: [CardModule, ButtonModule, CommonModule, HeaderComponent],
  templateUrl: './error-page.component.html',
  styleUrl: './error-page.component.scss'
})
export class ErrorPageComponent {
  usersService = inject(UsersService);
  router = inject(Router);

  userData!: UserInformations | null;

  // canViewPage: boolean = false;
  
  ngOnInit(): void {
    this.usersService.userInformations.subscribe((data) => {
      this.userData = data;
    })

    // if (this.userData){
    //   this.canViewPage = true;
    // } else {
    //   this.navigateTo('/home');
    // }
  }

  navigateTo(route: string){
    this.router.navigate([route]);
  }
}
