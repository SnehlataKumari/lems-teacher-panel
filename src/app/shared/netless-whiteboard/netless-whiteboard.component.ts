import { Component, OnInit } from '@angular/core';
import { WhiteWebSdk } from 'white-web-sdk';
const netlessSdkToken =
  'NETLESSSDK_YWs9OHlvdnh2cjBsTVNxN0V2YSZub25jZT0xNjAzMjg0NjczNTg5MDAmcm9sZT0wJnNpZz04MDY5MWQ5YzJjOGM3ZDVlNDM0NTljYjIxYzViNDdmZmUzZDA1MjgwNzIyMWQyMDI1Mjg4YWJlNDY4NDhiMTll';
var whiteWebSdk = new WhiteWebSdk({
  appIdentifier: 'Wl-y8BOYEeuGij00necleg/fgsqEjRBCOnHSg', // Get App Identifier from the management console
});

/**
 * selector	Selection tool
pencil	pencil
rectangle	rectangle drawing tool
ellipse	Circle and ellipse drawing tools
eraser	Eraser, used to erase handwriting drawn by other teaching aids
text	Text tool
straight	Straight line drawing tool
arrow	Arrow drawing tool
laserPointer	Laser Pointer Tool
hand	Hand tool
 */

const teachingAids = [
  { name: 'selector', description: 'Selection tool', iconName: 'selector.svg' },
  { name: 'pencil', description: 'Pencil', iconName: 'pencil.svg'},
  { name: 'rectangle', description: 'Rectangle drawing tool', iconName: 'rectangle.svg' },
  { name: 'ellipse', description: 'Circle and ellipse drawing tools', iconName: 'ellipse.svg' },
  {
    name: 'eraser',
    description:
      'Eraser, used to erase handwriting drawn by other teaching aids', 
    iconName: 'eraser.svg'
  },
  { name: 'text', description: 'Text tool', iconName: 'text.svg' },
  { name: 'straight', description: 'Straight line drawing tool', iconName: 'straight.svg' },
  { name: 'arrow', description: 'Arrow drawing tool', iconName: 'arrow.svg' },
  { name: 'laserPointer', description: 'Laser Pointer Tool', iconName: 'laserPointer.svg' },
  { name: 'hand', description: 'Hand tool', iconName: 'hand.svg' },
];

@Component({
  selector: 'app-netless-whiteboard',
  templateUrl: './netless-whiteboard.component.html',
  styleUrls: ['./netless-whiteboard.component.css'],
})
export class NetlessWhiteboardComponent implements OnInit {
  whiteBoardRoom;
  teachingAids = teachingAids;
  constructor() {}

  ngOnInit(): void {}

  createWhiteBoardRoom() {
    var url = 'https://shunt-api.netless.link/v5/rooms';
    var requestInit = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        token: netlessSdkToken, // SDK Token issued must be prepared in advance
      },
    };

    window
      .fetch(url, requestInit)
      .then(function (response) {
        return response.json();
      })
      .then((roomJSON) => {
        // Create the room successfully, get the roomJSON describing the room information
        console.log(roomJSON);
        this.requestJoinWhiteBoardRoom(roomJSON.uuid);
      })
      .catch(function (err) {
        // Failed, print out Error to analyze why it failed
        console.error(err);
      });
  }

  requestJoinWhiteBoardRoom(roomUUID) {
    // var uuid = 'uuid of a specific room';
    var url = 'https://shunt-api.netless.link/v5/tokens/rooms/' + roomUUID;
    var requestInit = {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        token: netlessSdkToken, // SDK Token issued must be prepared in advance
      },
      body: JSON.stringify({
        lifespan: 0, // indicates that the Room Token will never expire
        role: 'admin', // indicates that Room Token has Admin authority
      }),
    };
    window
      .fetch(url, requestInit)
      .then(function (response) {
        return response.json();
      })
      .then((roomToken) => {
        // Successfully get the Room Token of the room
        this.joinRoomWhiteBoard(roomUUID, roomToken);
      })
      .catch(function (err) {
        console.error(err);
      });
  }

  joinRoomWhiteBoard(roomUUID, roomToken) {
    var joinRoomParams = {
      uuid: roomUUID,
      roomToken: roomToken,
    };

    whiteWebSdk
      .joinRoom(joinRoomParams)
      .then((room) => {
        // Join the room successfully, get the room object
        room.bindHtmlElement(
          document.getElementById('whiteboard') as HTMLDivElement
        );
        this.whiteBoardRoom = room;
      })
      .catch(function (err) {
        // failed to join the room
        console.error(err);
      });
  }

  disconnectRoom() {
    if (this.whiteBoardRoom) {
      this.whiteBoardRoom.disconnect().catch(function (err) {
        // Intercept the error and enter the exception handling process
      });
    }
  }

  setTool(toolName) {
    this.whiteBoardRoom.setMemberState({ currentApplianceName: toolName });
  }
}
