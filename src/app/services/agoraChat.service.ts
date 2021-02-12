import { Injectable } from '@angular/core';
import { ChatAdapter, IChatController } from 'ng-chat';
import AgoraRTM from 'agora-rtm-sdk';
import { ApiService } from './api.service';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class AgoraChatService {
  admins;
  public client = AgoraRTM.createInstance('fe3b9d4909c241658c6de83acba70d7a');
  constructor(
    private apiService: ApiService,
    private authService: AuthService
  ) {
    this.getAdminId();
  }
  async getAdminId() {
    const response = await this.apiService.get(`/users/get-admins`).toPromise();
    this.admins = response;
    if (this.admins.length > 0) {
      this.initChat();
    }
  }

  initChat() {
    this.client.on('ConnectionStateChanged', (newState, reason) => {
      console.log(
        'on connection state changed to ' + newState + ' reason: ' + reason
      );
    });

    this.client.on('MessageFromPeer', (msg, peerId) => {
      console.log(msg, peerId);

      // text: text of the received message; peerId: User ID of the sender.
      /* Your code for handling the event of receiving a peer-to-peer message. */
    });

    this.client
      .login({ token: null, uid: this.authService.user._id })
      .then(() => {
        console.log('AgoraRTM client login success');
      })
      .catch((err) => {
        console.log('AgoraRTM client login failure', err);
      });
  }

  logout() {
    this.client.logout();
  }

  sendMessage(msg) {
    this.admins.forEach((admin) => {
      this.client
        .sendMessageToPeer(
          { text: msg.message }, // An RtmMessage object.
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
