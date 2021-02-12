import { Component, OnInit, ViewChild } from '@angular/core';
import AgoraRTM from 'agora-rtm-sdk';
import { ChatAdapter, IChatController } from 'ng-chat';
import { ApiService } from 'src/app/services/api.service';
import { AuthService } from 'src/app/services/auth.service';
import { MyChatAdapter } from './MyChatAdapter';

const client = AgoraRTM.createInstance('fe3b9d4909c241658c6de83acba70d7a');

@Component({
  selector: 'app-live-chat-support',
  templateUrl: './live-chat-support.component.html',
  styleUrls: ['./live-chat-support.component.css'],
})
export class LiveChatSupportComponent implements OnInit {
  agoraConfig;
  admins;
  public adapter: ChatAdapter = new MyChatAdapter();
  @ViewChild('ngChatInstance')
  protected ngChatInstance: IChatController;

  constructor(
    private authService: AuthService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.getAdminId();
  }

  async getAdminId() {
    const response = await this.apiService.get(`/users/get-admins`).toPromise();
    console.log(response);
    this.agoraConfig = response['data'];
    if (this.agoraConfig) {
      this.initChat();
    }
  }

  initChat() {
    client.on('ConnectionStateChanged', (newState, reason) => {
      console.log(
        'on connection state changed to ' + newState + ' reason: ' + reason
      );
    });

    client.on('MessageFromPeer', (msg, peerId) => {
      console.log(msg, peerId);

      // text: text of the received message; peerId: User ID of the sender.
      /* Your code for handling the event of receiving a peer-to-peer message. */
    });

    client
      .login({ token: null, uid: this.authService.user._id })
      .then(() => {
        console.log('AgoraRTM client login success');
      })
      .catch((err) => {
        console.log('AgoraRTM client login failure', err);
      });
  }

  logout() {
    client.logout();
  }

  sendMessage(msg) {
    this.admins.forEach((admin) => {
      client
        .sendMessageToPeer(
          { text: msg }, // An RtmMessage object.
          admin._id // The user ID of the remote user.
        )
        .then((sendResult) => {
          if (sendResult.hasPeerReceived) {
            /* Your code for handling the event that the remote user receives the message. */
          } else {
            /* Your code for handling the event that the message is received by the server but the remote user cannot be reached. */
          }
        })
        .catch((error) => {
          /* Your code for handling the event of a message send failure. */
        });
    });
  }
}
