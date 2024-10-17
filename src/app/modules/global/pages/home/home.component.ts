import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { Component, inject} from '@angular/core';
import { ISigninResponse } from '../../interfaces/ISignin';
import { UsersService } from '../../services/users/users.service';
import { ButtonModule } from 'primeng/button';
import { HeaderComponent } from '../../components/header/header.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { ThemeService } from '../../services/theme/theme.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardModule, ButtonModule, CommonModule, SidebarComponent, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent{
  usersService = inject(UsersService);
  themeService = inject(ThemeService);

  userData!: ISigninResponse | null;

  actualOption: string = '';

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
  }
}
