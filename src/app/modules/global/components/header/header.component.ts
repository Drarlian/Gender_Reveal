import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { AvatarModule } from 'primeng/avatar';
import { BadgeModule } from 'primeng/badge';
import { InputTextModule } from 'primeng/inputtext';
import { MenubarModule } from 'primeng/menubar';
import { RippleModule } from 'primeng/ripple';
import { MenuItem } from 'primeng/api';
import { NotificationsService } from '../../services/notifications/notifications.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [MenubarModule, BadgeModule, AvatarModule, InputTextModule, RippleModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
  private notificationsService = inject(NotificationsService);
  router = inject(Router);

  items: MenuItem[] | undefined;

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-home',
        navigateRoute: '/home'
      },
      {
        label: 'Placar',
        icon: 'pi pi-chart-bar',
        navigateRoute: '/placar'
      },
      // {
      //   label: 'Contato',
      //   icon: 'pi pi-envelope',
      //   navigateRoute: '/contact'
      // }
    ];
  }

  openNotification(){
    this.notificationsService.toggleVisibility();
  }

  navigateTo(route: string){
    this.router.navigate([route]);
  }

}
