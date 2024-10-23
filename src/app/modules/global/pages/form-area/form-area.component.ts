import { UsersService } from './../../services/users/users.service';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { HeaderComponent } from '../../components/header/header.component';
import { DialogModule } from 'primeng/dialog';
import { Router } from '@angular/router';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RippleModule } from 'primeng/ripple';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MessageService } from 'primeng/api';
import { LoadingComponent } from '../../components/loading/loading.component';


@Component({
  selector: 'app-form-area',
  standalone: true,
  imports: [CardModule, ButtonModule, CommonModule, HeaderComponent, DialogModule, RippleModule,
    InputGroupModule, InputGroupAddonModule, InputTextModule, FloatLabelModule, FormsModule, ReactiveFormsModule, LoadingComponent],
  templateUrl: './form-area.component.html',
  styleUrl: './form-area.component.scss'
})
export class FormAreaComponent implements OnInit{
  usersService = inject(UsersService);
  messageService = inject(MessageService);
  router = inject(Router);

  basicInfos!: FormGroup;
  isLoading: boolean = false;

  ngOnInit(): void {
    const script = document.createElement('script');
    script.src = 'https://sdk.mercadopago.com/js/v2';
    document.body.appendChild(script);

    this.basicInfos = new FormGroup({
      name: new FormControl(''),
      email: new FormControl('')
    })
  }

  async submitInfos(){
    if (this.basicInfos.value.name == "" || this.basicInfos.value.email == ""){
      this.messageService.add({severity: 'error', summary: 'Informações Incompletas!', detail: "Preencha todas as informações para prosseguir."});
    } else {
      this.isLoading = true;
      const preferenciIdResponse = await this.usersService.generatePreferenceId(this.basicInfos.value);  // Aqui faz a requisição no backend para obter o preference Id.
      this.isLoading = false;

      if (typeof(preferenciIdResponse) == 'string'){
        this.openMercadoPagoCheckout(preferenciIdResponse);
      } else {
        this.messageService.add({severity: 'error', summary: 'Erro na geração pagamento!', detail: "Aconteceu um erro inesperado durante a geração do pagamento."});
      }
    }
  }

  openMercadoPagoCheckout(id: string) {
    // Declaração para o TypeScript reconhecer 'MercadoPago'
    const mp = new (window as any).MercadoPago('TEST-1218ac65-d3b4-47f1-befd-8c408da85082', {
      locale: 'pt-BR'
    });

    // Abrir o checkout com a preferência gerada no backend
    mp.checkout({
      preference: {
        id  // Este ID é gerado pelo backend
      }
    }).open();
  }

  navigateTo(route: string){
    this.router.navigate([route]);
  }

  navigateToWithQuery(route: string, target: string){
    this.router.navigate([route], { queryParams: { target } });
  }
}
