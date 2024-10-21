import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { Component, inject} from '@angular/core';
import { ISigninResponse } from '../../interfaces/ISignin';
import { UsersService } from '../../services/users/users.service';
import { ButtonModule } from 'primeng/button';
import { HeaderComponent } from '../../components/header/header.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { ThemeService } from '../../services/theme/theme.service';
import { DialogModule } from 'primeng/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardModule, ButtonModule, CommonModule, SidebarComponent, HeaderComponent, DialogModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent{
  usersService = inject(UsersService);
  themeService = inject(ThemeService);
  router = inject(Router);

  userData!: ISigninResponse | null;

  wasStarted: boolean = false;
  actualOption: string = '';
  visible: boolean = false;

  ngOnInit() {
    this.usersService.userInformations.subscribe((data) => {
      this.userData = data;
    })

    this.themeService.themeInformation.subscribe(info => this.actualOption = info);
  }

  getActualOption(){
    switch (this.actualOption){
      case 'boy':
        return '../../../../../assets/images/options/img-boy-option.jpeg'
      case 'girl':
        return '../../../../../assets/images/options/img-girl-option.jpeg'
      case 'neutral':
        return '../../../../../assets/images/options/img-neutral-option.jpeg'
      default:
        return '../../../../../assets/images/options/img-neutral-option.jpeg'
    }
  }

  toggleOption(optionValue: string){
    this.themeService.toggleThemeOption(optionValue);
    this.actualOption = optionValue;
    this.visible = true;
  }

  toggleStarted(){
    this.wasStarted = true;
  }

  customOpen(){
    this.visible = true;
  }

  customClose(){
    this.visible = false;
  }

  gotToNewPage(){
    // EXECUTAR A TROCA DA ESCOLHA DO SEXO NO USERSERVICE DO USUARIO.

    this.navigateTo('form-area');
  }

  navigateTo(route: string){
    this.router.navigate([route]);
  }

  navigateToWithQuery(route: string, target: string){
    this.router.navigate([route], { queryParams: { target } });
  }
}
