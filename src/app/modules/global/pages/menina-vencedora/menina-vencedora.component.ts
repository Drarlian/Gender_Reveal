import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menina-vencedora',
  standalone: true,
  imports: [HeaderComponent, CardModule, CommonModule],
  templateUrl: './menina-vencedora.component.html',
  styleUrl: './menina-vencedora.component.scss'
})
export class MeninaVencedoraComponent {
  actualOption: string = '';

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
}
