import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LiveClassService } from 'src/app/services/live-class.service';
import { NetlessWhiteboardComponent } from '../netless-whiteboard/netless-whiteboard.component';

declare var AgoraRTC: any;
declare var $: any;
var rtc: any = {
  client: null,
  joined: false,
  published: false,
  localStream: null,
  remoteStreams: [],
  params: {}
};

function addView(id, show?) {
  if (!$("#" + id)[0]) {
    $("<div/>", {
      id: "remote_video_panel_" + id,
      class: "video-view",
    }).appendTo("#video");
    $("<div/>", {
      id: "remote_video_" + id,
      class: "video-placeholder",
    }).appendTo("#remote_video_panel_" + id);
    $("<div/>", {
      id: "remote_video_info_" + id,
      class: "video-profile " + (show ? "" : "hide"),
    }).appendTo("#remote_video_panel_" + id);
    $("<div/>", {
      id: "video_autoplay_" + id,
      class: "autoplay-fallback hide",
    }).appendTo("#remote_video_panel_" + id);
  }
}
function removeView(id) {
  if ($("#remote_video_panel_" + id)[0]) {
    $("#remote_video_panel_" + id).remove();
  }
}

@Component({
  selector: 'app-live-class-broadcast',
  templateUrl: './live-class-broadcast.component.html',
  styleUrls: ['./live-class-broadcast.component.css'],
})
export class LiveClassBroadcastComponent implements OnInit {
  role = 'host';
  whiteBoardRoom;
  liveClassId;
  liveClass;
  canBroadcastClass = false;
  broadcastClass = false;

  @ViewChild('whiteBoad') whiteboard: NetlessWhiteboardComponent;

  constructor(
    private activatedRoute: ActivatedRoute,
    private liveClassService: LiveClassService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.liveClassId = paramMap.get('liveClassId');
      this.geLiveClass();
    });
  }

  async geLiveClass() {
    this.liveClass = (await this.liveClassService.fetchLiveClassById(this.liveClassId))['data'];
    console.log(this.liveClass);
    
    this.canBroadcastClass = true;
  }

  initializeAgoraClient() {
    // Create a client
    rtc.client = AgoraRTC.createClient({ mode: 'live', codec: 'h264' });

    // Options for joining a channel
    const option = {
      appID: this.liveClass.agoraLiveClassConfig.appID,
      channel: this.liveClass.agoraLiveClassConfig.channelName,
      uid: this.liveClass.agoraLiveClassConfig.uid,
      token: this.liveClass.agoraLiveClassConfig.tokenA,
    };
    
    rtc.client.on('stream-added', function (evt) {
      var remoteStream = evt.stream;
      var id = remoteStream.getId();
      if (id !== rtc.params.uid) {
        rtc.client.subscribe(remoteStream, function (err) {
          console.log('stream subscribe failed', err);
        });
      }
      console.log('stream-added remote-uid: ', id);
    });

    rtc.client.on('stream-subscribed', function (evt) {
      var remoteStream = evt.stream;
      var id = remoteStream.getId();
      // Add a view for the remote stream.
      addView(id);
      // Play the remote stream.
      remoteStream.play('remote_video_' + id);
      console.log('stream-subscribed remote-uid: ', id);
    });

    rtc.client.on('stream-removed', function (evt) {
      var remoteStream = evt.stream;
      var id = remoteStream.getId();
      // Stop playing the remote stream.
      remoteStream.stop('remote_video_' + id);
      // Remove the view of the remote stream.
      removeView(id);
      console.log('stream-removed remote-uid: ', id);
    });

    // Initialize the client
    rtc.client.init(
      option.appID,
      function () {
        console.log('init success');

        // Join a channel
        const secretToken = option.token ? option.token : null;
        console.log(secretToken);

        rtc.client.join(
          secretToken,
          option.channel,
          option.uid ? +option.uid : null,
          function (uid) {
            console.log(
              'join channel: ' + option.channel + ' success, uid: ' + uid
            );
            rtc.params.uid = uid;

            // Create a local stream
            rtc.localStream = AgoraRTC.createStream({
              streamID: rtc.params.uid,
              audio: true,
              video: true,
              screen: false,
            });

            // Initialize the local stream
            rtc.localStream.init(
              function () {
                console.log('init local stream success');
                // play stream with html element id "local_stream"
                rtc.localStream.play('local_stream');

                // Publish the local stream
                rtc.client.publish(rtc.localStream, function (err) {
                  console.log('publish failed');
                  console.error(err);
                });
              },
              function (err) {
                console.error('init local stream failed ', err);
              }
            );
          },
          function (err) {
            console.error('client join failed', err);
          }
        );
      },
      (err) => {
        console.log('Live stream Error => ');

        console.error(err);
      }
    );

    // The value of role can be "host" or "audience".
    rtc.client.setClientRole(this.role);
  }

  leaveChannel() {
    this.broadcastClass= false;
    this.canBroadcastClass= true;
    // Leave the channel
    rtc.client.leave(
      function () {
        // Stop playing the local stream
        rtc.localStream.stop();
        // Close the local stream
        rtc.localStream.close();
        // Stop playing the remote streams and remove the views
        while (rtc.remoteStreams.length > 0) {
          var stream = rtc.remoteStreams.shift();
          var id = stream.getId();
          stream.stop();
          removeView(id);
        }
        console.log('client leaves channel success');
      },
      function (err) {
        console.log('channel leave failed');
        console.error(err);
      }
    );
    this.whiteboard.disconnectRoom();
  }

  startChannel() {
    this.broadcastClass = true;
    this.canBroadcastClass = false;
    this.initializeAgoraClient();
    this.whiteboard.createWhiteBoardRoom();
  }
  
}
