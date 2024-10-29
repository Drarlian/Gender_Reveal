import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { HeaderComponent } from '../../components/header/header.component';
import { ChartModule } from 'primeng/chart';
import { UsersService } from '../../services/users/users.service';
import { IOddInformations } from '../../interfaces/IUser';
import { LoadingComponent } from '../../components/loading/loading.component';

@Component({
  selector: 'app-scoreboard',
  standalone: true,
  imports: [CardModule, ButtonModule, CommonModule, HeaderComponent, ChartModule, LoadingComponent],
  templateUrl: './scoreboard.component.html',
  styleUrl: './scoreboard.component.scss'
})
export class ScoreboardComponent implements OnInit{
  private usersService = inject(UsersService);

  scoreboardInformations!: IOddInformations[];
  isLoading: boolean = true;

  isError: boolean = false;

  data: any;

  options: any;

  async ngOnInit() {
    await this.getScoreBoardInformations();
  }

  async getScoreBoardInformations(){
    this.isLoading = true;
    const response: IOddInformations[] | boolean = await this.usersService.getOddsInformations();

    if (typeof(response) == 'object') {
      this.scoreboardInformations = {...response};
      this.isLoading = false;
      this.isError = false;

      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');
  
      this.data = {
        labels: ['M', 'F', 'N'],
        datasets: [
          {
            data: [this.scoreboardInformations[0].qtd, this.scoreboardInformations[1].qtd, this.scoreboardInformations[2].qtd],
            backgroundColor: ['#8ddfd2', '#9079C0', '#B0BEBF'],
            hoverBackgroundColor: ['#8ddfd2', '#9079C0', '#B0BEBF']
          }
        ]
      };
  
      this.options = {
        plugins: {
          legend: {
            labels: {
              usePointStyle: true,
              color: textColor
            }
          }
        }
      };
    } else {
      this.isError = true;
      this.isLoading = false;
    }
  }
}
