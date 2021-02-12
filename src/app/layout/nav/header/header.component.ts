import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ChatAdapter,
  ChatParticipantStatus,
  ChatParticipantType,
  IChatController,
  User,
} from 'ng-chat';
import { AuthService } from 'src/app/services/auth.service';
import { MyChatAdapter } from './MyChatAdapter';
declare var n: any;
declare var $: any;
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  // public adapter: ChatAdapter;
  @ViewChild('ngChatInstance')
  protected ngChatInstance: IChatController;

  constructor(public authService: AuthService, public adapter: MyChatAdapter) {}

  ngOnInit(): void {
    setTimeout(function () {
      $('.navbar-toggler').click(function () {
        $('body').toggleClass('right-bar-enabled');
      });
    }, 100);
  }

  openChatSupport() {
    this.ngChatInstance.triggerOpenChatWindow({
      participantType: ChatParticipantType.User,
      id: 'CHAT_SUPPORT',
      displayName: 'Chat Support',
      avatar: null,
      status: ChatParticipantStatus.Online,
    });
  }

  async onLogout() {
    return this.authService.afterLogout();
  }
}
