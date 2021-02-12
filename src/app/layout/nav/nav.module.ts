import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgChatModule } from 'ng-chat';

import { NavRoutingModule } from './nav-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, SidebarComponent],
  imports: [CommonModule, NavRoutingModule, NgChatModule],
  exports: [HeaderComponent, FooterComponent, SidebarComponent],
})
export class NavModule {}
