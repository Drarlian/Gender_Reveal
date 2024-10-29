import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { HeaderComponent } from '../../components/header/header.component';
import { Router } from '@angular/router';
import { UsersService } from '../../services/users/users.service';
import { UserInformations } from '../../interfaces/ISignin';

@Component({
  selector: 'app-success-page',
  standalone: true,
  imports: [CardModule, ButtonModule, CommonModule, HeaderComponent],
  templateUrl: './success-page.component.html',
  styleUrl: './success-page.component.scss'
})
export class SuccessPageComponent implements OnInit{
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
