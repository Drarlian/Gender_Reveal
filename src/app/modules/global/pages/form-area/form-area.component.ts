import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit} from '@angular/core';
import { ISigninResponse } from '../../interfaces/ISignin';
import { UsersService } from '../../services/users/users.service';
import { ButtonModule } from 'primeng/button';
import { HeaderComponent } from '../../components/header/header.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { ThemeService } from '../../services/theme/theme.service';
import { DialogModule } from 'primeng/dialog';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RippleModule } from 'primeng/ripple';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';


@Component({
  selector: 'app-form-area',
  standalone: true,
  imports: [CardModule, ButtonModule, CommonModule, SidebarComponent, HeaderComponent, DialogModule, RippleModule, 
    InputGroupModule, InputGroupAddonModule, InputTextModule, FloatLabelModule, FormsModule, ReactiveFormsModule],
  templateUrl: './form-area.component.html',
  styleUrl: './form-area.component.scss'
})
export class FormAreaComponent implements OnInit{
  router = inject(Router);

  basicInfos!: FormGroup;

  ngOnInit(): void {
    this.basicInfos = new FormGroup({
      name: new FormControl(''),
      email: new FormControl('')
    })
  }

  navigateTo(route: string){
    this.router.navigate([route]);
  }

  navigateToWithQuery(route: string, target: string){
    this.router.navigate([route], { queryParams: { target } });
  }

}
