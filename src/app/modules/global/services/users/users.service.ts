import { inject, Injectable } from '@angular/core';
import { UserInformations } from '../../interfaces/ISignin';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../../../../../environments/environment';
import { IOddInformations } from '../../interfaces/IUser';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = environment.apiUrl;

  private http = inject(HttpClient);
  private messageService = inject(MessageService);

  private user = new BehaviorSubject<UserInformations | null>(null);
  userInformations = this.user.asObservable();

  private option = new BehaviorSubject<string>("girl");
  optionInformation = this.user.asObservable();

  constructor() {
    // const localUser = this.localStorageService.getLocalStorage('USER-BASIC-TEMPLATE');

    // if (localUser){
    //   this.user.next(localUser);
    // }
  }

  changeUserInfos(infos: {name: string, email: string, option: string}){
    this.user.next({user: infos, token: this.user.value?.token ? this.user.value?.token : ''})
  }

  changeOption(newOption: string){
    this.option.next(newOption);
  }

  async generatePreferenceId(infos: {name: string, email: string}){
    return new Promise<string | boolean>((resolve, _) => {this.http.post<{preferenceId: string}>(`${this.apiUrl}/generate-preference-id`, {...infos, option: this.option.value}).subscribe({
      next: (data) => {
        if (data.preferenceId){
          resolve(data.preferenceId);
        } else {
          resolve(false);
        }
      },
      error: (error: any) => {
        console.log(error)
        this.messageService.add({severity: 'error', summary: 'Erro na geração pagamento!', detail: error.error.message});
        resolve(false);
      }
    })})
  }

  async getOddsInformations(){
    // ${this.apiUrl}
    return new Promise<IOddInformations[] | boolean>((resolve, _) => {this.http.get(`${this.apiUrl}/get-actual-odds`).subscribe({
      next: (data: any) => {
        if (data){
          resolve(data);
       } else {
        resolve(false);
       }
      },
      error: (error: any) => {
        resolve(false);
      }
    })})
  }

  // METODOS ESPECIFICOS:
  getTokenAuthorization() {
    // return new HttpHeaders({
    //   'Content-type':  'application/json',
    //   'Authorization' : this.user.value?.token ? this.user.value?.token: ''
    // })
  }
}
