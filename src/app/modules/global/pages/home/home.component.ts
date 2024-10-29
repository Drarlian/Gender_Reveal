import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { Component, inject} from '@angular/core';
import { UserInformations } from '../../interfaces/ISignin';
import { UsersService } from '../../services/users/users.service';
import { ButtonModule } from 'primeng/button';
import { HeaderComponent } from '../../components/header/header.component';
import { ThemeService } from '../../services/theme/theme.service';
import { DialogModule } from 'primeng/dialog';
import { Router } from '@angular/router';
import { IOddInformations } from '../../interfaces/IUser';
import { LoadingComponent } from '../../components/loading/loading.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CardModule, ButtonModule, CommonModule, HeaderComponent, DialogModule, LoadingComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent{
  usersService = inject(UsersService);
  themeService = inject(ThemeService);
  router = inject(Router);

  userData!: UserInformations | null;
  oddsInformations!: IOddInformations[];

  wasStarted: boolean = false;
  actualOption: string = '';
  visible: boolean = false;
  
  isLoading: boolean = true;
  isError: boolean = false;

  async ngOnInit() {
    this.isLoading = true;

    // Pegando as informações iniciais do usuário.
    this.usersService.userInformations.subscribe((data) => {
      this.userData = data;
    })

    // Pegando as informações salvas do tema (opção).
    this.themeService.themeInformation.subscribe(info => this.actualOption = info);

    // Pegando os valores das odds.
    await this.getScoreBoardInformations();
  }

  async getScoreBoardInformations(){
    const response: IOddInformations[] | boolean = await this.usersService.getOddsInformations();

    if (typeof(response) == 'object') {
      this.oddsInformations = {...response};
      this.isLoading = false;
      this.isError = false;
    } else {
      console.log('teste')
      this.isError = true;
      this.isLoading = false;
    }
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
    
    this.usersService.changeOption(optionValue);
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
