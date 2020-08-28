const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Clone = require('../../util/clone');
const Cast = require('../../util/cast');
const Color = require('../../util/color');
const formatMessage = require('format-message');
const MathUtil = require('../../util/math-util');

const CUBIC = require('../../io/cubic');
const Base64Util = require('../../util/base64-util');
//const WebSocket = require('../../util/ReconnectingWebSocket');

//const CRC = require('crc-full').CRC;
//var crc = new CRC("CRC16_XMODEM", 16, 0x1021, 0x0000, 0x0000, false, false);

/* Icon svg to be displayed at the left edge of each extension block, encoded as a data URI. */
const blockIconURI = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pjxzdmcgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTI4IDEyODsiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDEyOCAxMjgiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6IzFDQTJCQjt9Cgkuc3Qxe2ZpbGw6I0VBQzEwMDt9Cjwvc3R5bGU+PGcgaWQ9Il94MzFfMl8zRF9QcmludGluZyIvPjxnIGlkPSJfeDMxXzFfVlJfR2VhciIvPjxnIGlkPSJfeDMxXzBfVmlydHVhbF9yZWFsaXR5Ii8+PGcgaWQ9Il94MzlfX0F1Z21lbnRlZF9yZWFsaXR5Ii8+PGcgaWQ9Il94MzhfX1RlbGVwb3J0Ii8+PGcgaWQ9Il94MzdfX0dsYXNzZXNzIi8+PGcgaWQ9Il94MzZfX0ZvbGRpbmdfcGhvbmUiLz48ZyBpZD0iX3gzNV9fRHJvbmUiLz48ZyBpZD0iX3gzNF9fUmV0aW5hX3NjYW4iLz48ZyBpZD0iX3gzM19fU21hcnR3YXRjaCIvPjxnIGlkPSJfeDMyX19CaW9uaWNfQXJtIi8+PGcgaWQ9Il94MzFfX0NoaXAiPjxnPjxyZWN0IGNsYXNzPSJzdDAiIGhlaWdodD0iNDgiIHdpZHRoPSIzMiIgeD0iNDgiIHk9IjM2Ii8+PGNpcmNsZSBjbGFzcz0ic3QxIiBjeD0iMjAiIGN5PSIyOCIgcj0iOCIvPjxjaXJjbGUgY2xhc3M9InN0MSIgY3g9IjIwIiBjeT0iOTIiIHI9IjgiLz48Y2lyY2xlIGNsYXNzPSJzdDEiIGN4PSIxMDgiIGN5PSI1MiIgcj0iOCIvPjxjaXJjbGUgY2xhc3M9InN0MSIgY3g9Ijk2IiBjeT0iMTAwIiByPSI4Ii8+PGc+PHBhdGggZD0iTTEwOCw0MGMtNS4yLDAtOS42LDMuMy0xMS4zLDhIODRWMzJoLThWMjBoLTh2MTJoLThWMjBoLTh2MTJoLTh2MTZIMjR2LTguN2M0LjctMS43LDgtNi4xLDgtMTEuM2MwLTYuNi01LjQtMTItMTItMTIgICAgIFM4LDIxLjQsOCwyOGMwLDUuMiwzLjMsOS42LDgsMTEuM1Y1NmgyOHY4SDE2djE2LjdjLTQuNywxLjctOCw2LjEtOCwxMS4zYzAsNi42LDUuNCwxMiwxMiwxMnMxMi01LjQsMTItMTJjMC01LjItMy4zLTkuNi04LTExLjMgICAgIFY3MmgyMHYxNmg4djEyaDhWODhoOHYxMmg4Vjg4aDhWNzJoOHYxNi43Yy00LjcsMS43LTgsNi4xLTgsMTEuM2MwLDYuNiw1LjQsMTIsMTIsMTJzMTItNS40LDEyLTEyYzAtNS4yLTMuMy05LjYtOC0xMS4zVjY0SDg0ICAgICB2LThoMTIuN2MxLjcsNC43LDYuMSw4LDExLjMsOGM2LjYsMCwxMi01LjQsMTItMTJTMTE0LjYsNDAsMTA4LDQweiBNMjAsMjRjMi4yLDAsNCwxLjgsNCw0cy0xLjgsNC00LDRzLTQtMS44LTQtNFMxNy44LDI0LDIwLDI0ICAgICB6IE0yMCw5NmMtMi4yLDAtNC0xLjgtNC00czEuOC00LDQtNHM0LDEuOCw0LDRTMjIuMiw5NiwyMCw5NnogTTk2LDEwNGMtMi4yLDAtNC0xLjgtNC00czEuOC00LDQtNHM0LDEuOCw0LDRTOTguMiwxMDQsOTYsMTA0eiAgICAgIE03Niw4MEg1MlY0MGgyNFY4MHogTTEwOCw1NmMtMi4yLDAtNC0xLjgtNC00czEuOC00LDQtNHM0LDEuOCw0LDRTMTEwLjIsNTYsMTA4LDU2eiIvPjxyZWN0IGhlaWdodD0iOCIgd2lkdGg9IjgiIHg9IjU2IiB5PSI2NCIvPjwvZz48L2c+PC9nPjwvc3ZnPg==';

/* Icon svg to be displayed in the category menu, encoded as a data URI. */
const menuIconURI = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaWQ9IkxheWVyXzFfMV8iIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDY0IDY0OyIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgNjQgNjQiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxnPjxnPjxwYXRoIGQ9Ik01MS4zMTQsMTQuOTI5bC00LjI0My00LjI0M2wtMi4zMzEsMS4zOTljLTAuMzUxLTAuMTY4LTAuNzExLTAuMzE4LTEuMDgxLTAuNDQ4TDQzLDloLTYgICAgbC0wLjY1OSwyLjYzN2MtMC4zNywwLjEzMS0wLjczLDAuMjgxLTEuMDgxLDAuNDQ4bC0yLjMzMS0xLjM5OWwtNC4yNDMsNC4yNDNsMS4zOTksMi4zMzFjLTAuMTY4LDAuMzUxLTAuMzE4LDAuNzExLTAuNDQ4LDEuMDgxICAgIEwyNywxOXY2bDIuNjM3LDAuNjU5YzAuMTMxLDAuMzcsMC4yODEsMC43MywwLjQ0OCwxLjA4MWwtMS4zOTksMi4zMzFsNC4yNDMsNC4yNDNsMi4zMzEtMS4zOTkgICAgYzAuMzUxLDAuMTY4LDAuNzExLDAuMzE4LDEuMDgxLDAuNDQ4TDM3LDM1aDZsMC42NTktMi42MzdjMC4zNy0wLjEzMSwwLjczLTAuMjgxLDEuMDgxLTAuNDQ4bDIuMzMxLDEuMzk5bDQuMjQzLTQuMjQzICAgIGwtMS4zOTktMi4zMzFjMC4xNjgtMC4zNTEsMC4zMTgtMC43MTEsMC40NDgtMS4wODFMNTMsMjV2LTZsLTIuNjM3LTAuNjU5Yy0wLjEzMS0wLjM3LTAuMjgxLTAuNzMtMC40NDgtMS4wODFMNTEuMzE0LDE0LjkyOXoiIHN0eWxlPSJmaWxsOiNGRkNCNTc7Ii8+PC9nPjxnPjxyZWN0IGhlaWdodD0iNCIgc3R5bGU9ImZpbGw6I0U1NjU2NTsiIHdpZHRoPSIyIiB4PSIzOSIgeT0iMiIvPjwvZz48Zz48cmVjdCBoZWlnaHQ9IjIwIiBzdHlsZT0iZmlsbDojRTU2NTY1OyIgd2lkdGg9IjIiIHg9IjM5IiB5PSI0MiIvPjwvZz48Zz48cmVjdCBoZWlnaHQ9IjIiIHN0eWxlPSJmaWxsOiNFNTY1NjU7IiB3aWR0aD0iMiIgeD0iMzkiIHk9IjM4Ii8+PC9nPjxnPjxwYXRoIGQ9Ik01NS4xMjIsOC41MTJDNTEuMDUsMy43MzgsNDQuODk5LDEsMzguMjQ5LDFoLTYuNDY4Yy0zLjQ3NSwwLTYuNjg1LDAuNjk5LTkuNTQyLDIuMDc5ICAgIEMxNC42ODksNi43MjMsMTAsMTQuMTYsMTAsMjIuNDg1YzAsMi41NjQtMS4xNDgsNC45NTMtMy4xNSw2LjU1NGwtMi4xNzgsMS43NDJsMC40ODYsMC43NThjMy4zNDgsNS4yMjIsNS44MzEsMTAuOTE1LDcuMzgsMTYuOTIxICAgIGwwLjMxMiwxLjIwOWMwLjUzNywyLjA4NCwxLjg3NSwzLjc3NSwzLjY3LDQuNjRjMS45ODcsMC45NTksNC4zMjYsMC45MSw2LjI3MS0wLjE0M2wxNC42OTktOC4yOTZsLTAuOTgyLTEuNzQybC0xNC42ODQsOC4yODcgICAgYy0xLjM2NiwwLjc0LTMuMDI0LDAuNzc0LTQuNDM2LDAuMDkzYy0xLjI2NC0wLjYwOS0yLjIxMy0xLjgyNi0yLjYwMy0zLjMzOWwtMC4zMTItMS4yMDljLTAuMDgzLTAuMzIyLTAuMTc5LTAuNjQtMC4yNjctMC45NjFIMTcgICAgdi0yaC0zLjM3OWMtMS41MTUtNC44MzktMy42Mi05LjQ2MS02LjI5OS0xMy43NzdMOC4xLDMwLjYwMWMyLjQ3OS0xLjk4MywzLjktNC45NDEsMy45LTguMTE2YzAtNy41NTIsNC4yNTctMTQuMjk3LDExLjEwOC0xNy42MDUgICAgQzI1LjY5MiwzLjYzMiwyOC42MSwzLDMxLjc4MSwzaDYuNDY4YzYuMDYzLDAsMTEuNjU5LDIuNDgyLDE1LjM1Miw2LjgxYzMuNTg5LDQuMjA2LDUuMDYyLDkuNjY4LDQuMTUyLDE1LjM4ICAgIGMtMC4zOTksMi41MDItMS4yNjMsNC44NDgtMi41NjQsNi45NzNDNDkuODMxLDQwLjkwNiw0Nyw1MC40NDMsNDcsNTkuNzQzVjYxSDI5di04aC0ydjEwaDIydi0zLjI1NyAgICBjMC04LjkzMSwyLjcyOS0xOC4xMDYsNy44OTQtMjYuNTM1YzEuNDM5LTIuMzUsMi4zOTQtNC45NDEsMi44MzQtNy43MDNDNjAuNzMyLDE5LjIwNSw1OS4wOTcsMTMuMTcsNTUuMTIyLDguNTEyeiIgc3R5bGU9ImZpbGw6IzNGM0EzNDsiLz48cmVjdCBoZWlnaHQ9IjIiIHN0eWxlPSJmaWxsOiMzRjNBMzQ7IiB3aWR0aD0iNiIgeD0iMTUiIHk9IjI2Ii8+PHBhdGggZD0iTTQ2LDIyYzAtMy4zMDktMi42OTEtNi02LTZzLTYsMi42OTEtNiw2czIuNjkxLDYsNiw2UzQ2LDI1LjMwOSw0NiwyMnogTTQwLDI2ICAgIGMtMi4yMDYsMC00LTEuNzk0LTQtNHMxLjc5NC00LDQtNHM0LDEuNzk0LDQsNFM0Mi4yMDYsMjYsNDAsMjZ6IiBzdHlsZT0iZmlsbDojM0YzQTM0OyIvPjxwYXRoIGQ9Ik0zNS4zMjYsMzMuMDQxYzAuMDU3LDAuMDI0LDAuMTE0LDAuMDQ5LDAuMTcxLDAuMDcxTDM2LjIxOSwzNmg3LjU2MmwwLjcyMi0yLjg4OCAgICBjMC4wNTctMC4wMjIsMC4xMTQtMC4wNDcsMC4xNzEtMC4wNzFsMi41NTMsMS41MzFsNS4zNDYtNS4zNDdsLTEuNTMtMi41NTJjMC4wMjMtMC4wNTcsMC4wNDctMC4xMTQsMC4wNy0wLjE3MUw1NCwyNS43ODF2LTcuNTYyICAgIGwtMi44ODgtMC43MjJjLTAuMDkyLTAuMjI3LTAuMTktMC40NTEtMC4yOTYtMC42NjlsLTEuODAzLDAuODY0YzAuMTUyLDAuMzE4LDAuMjg4LDAuNjQ2LDAuNDA3LDAuOTgybDAuMTc5LDAuNTA2bDIuNCwwLjZ2NC40MzggICAgbC0yLjQsMC42bC0wLjE3OSwwLjUwNmMtMC4xMTksMC4zMzYtMC4yNTUsMC42NjQtMC40MDcsMC45ODJsLTAuMjMzLDAuNDg1bDEuMjc0LDIuMTIzbC0zLjEzOSwzLjEzOGwtMi4xMjItMS4yNzNsLTAuNDg0LDAuMjMxICAgIGMtMC4zMiwwLjE1My0wLjY0NiwwLjI4OS0wLjk4MiwwLjQwN2wtMC41MDgsMC4xNzlMNDIuMjE5LDM0aC00LjQzOGwtMC42MDEtMi40MDFsLTAuNTA4LTAuMTc5ICAgIGMtMC4zMzYtMC4xMTgtMC42NjItMC4yNTQtMC45ODItMC40MDdsLTAuNDg0LTAuMjMxbC0yLjEyMiwxLjI3M2wtMy42OS0zLjY5bC0xLjQxNCwxLjQxNGw0Ljc5NCw0Ljc5NEwzNS4zMjYsMzMuMDQxeiIgc3R5bGU9ImZpbGw6IzNGM0EzNDsiLz48cGF0aCBkPSJNMjYsMTguMjE5djcuNTYybDIuODg4LDAuNzIyYzAuMDkyLDAuMjI3LDAuMTksMC40NTEsMC4yOTYsMC42NjlsMS44MDMtMC44NjQgICAgYy0wLjE1Mi0wLjMxOC0wLjI4OC0wLjY0Ni0wLjQwNy0wLjk4MkwzMC40LDI0LjgxOWwtMi40LTAuNnYtNC40MzhsMi40LTAuNmwwLjE3OS0wLjUwNmMwLjExOS0wLjMzNiwwLjI1NS0wLjY2NCwwLjQwNy0wLjk4MiAgICBsMC4yMzItMC40ODVsLTEuMjczLTIuMTIzbDMuMTM5LTMuMTM5bDIuMTIyLDEuMjczbDAuNDg0LTAuMjMxYzAuMzItMC4xNTMsMC42NDYtMC4yODksMC45ODItMC40MDdsMC41MDgtMC4xNzlMMzcuNzgxLDEwaDQuNDM4ICAgIGwwLjYwMSwyLjQwMWwwLjUwOCwwLjE3OWMwLjMzNiwwLjExOCwwLjY2MiwwLjI1NCwwLjk4MiwwLjQwN2wwLjQ4NCwwLjIzMWwyLjEyMi0xLjI3M2wzLjY5LDMuNjlsMS40MTQtMS40MTRsLTQuNzk0LTQuNzk1ICAgIGwtMi41NTMsMS41MzJjLTAuMDU3LTAuMDI0LTAuMTE0LTAuMDQ4LTAuMTcxLTAuMDcxTDQzLjc4MSw4aC03LjU2MmwtMC43MjIsMi44ODdjLTAuMDU3LDAuMDIzLTAuMTE0LDAuMDQ3LTAuMTcxLDAuMDcxICAgIGwtMi41NTMtMS41MzJsLTUuMzQ2LDUuMzQ3bDEuNTMsMi41NTNjLTAuMDIzLDAuMDU3LTAuMDQ3LDAuMTE0LTAuMDcsMC4xNzFMMjYsMTguMjE5eiIgc3R5bGU9ImZpbGw6IzNGM0EzNDsiLz48cmVjdCBoZWlnaHQ9IjIiIHN0eWxlPSJmaWxsOiMzRjNBMzQ7IiB3aWR0aD0iMiIgeD0iMzkiIHk9IjEyIi8+PHJlY3QgaGVpZ2h0PSIyIiBzdHlsZT0iZmlsbDojM0YzQTM0OyIgdHJhbnNmb3JtPSJtYXRyaXgoMC43MDcyIC0wLjcwNyAwLjcwNyAwLjcwNzIgLTEuMjA2OCAyOC4zNTc3KSIgd2lkdGg9IjIiIHg9IjMyLjYzNiIgeT0iMTQuNjM2Ii8+PHJlY3QgaGVpZ2h0PSIyIiBzdHlsZT0iZmlsbDojM0YzQTM0OyIgd2lkdGg9IjIiIHg9IjMwIiB5PSIyMSIvPjxyZWN0IGhlaWdodD0iMiIgc3R5bGU9ImZpbGw6IzNGM0EzNDsiIHRyYW5zZm9ybT0ibWF0cml4KDAuNzA3IC0wLjcwNzIgMC43MDcyIDAuNzA3IC0xMC4yMDQxIDMyLjA5OTMpIiB3aWR0aD0iMiIgeD0iMzIuNjM2IiB5PSIyNy4zNjQiLz48cmVjdCBoZWlnaHQ9IjIiIHN0eWxlPSJmaWxsOiMzRjNBMzQ7IiB3aWR0aD0iMiIgeD0iMzkiIHk9IjMwIi8+PHJlY3QgaGVpZ2h0PSIyIiBzdHlsZT0iZmlsbDojM0YzQTM0OyIgdHJhbnNmb3JtPSJtYXRyaXgoMC43MDcyIC0wLjcwNyAwLjcwNyAwLjcwNzIgLTYuNDc4OCA0MS4wODMpIiB3aWR0aD0iMiIgeD0iNDUuMzY0IiB5PSIyNy4zNjQiLz48cmVjdCBoZWlnaHQ9IjIiIHN0eWxlPSJmaWxsOiMzRjNBMzQ7IiB3aWR0aD0iMiIgeD0iNDgiIHk9IjIxIi8+PHJlY3QgaGVpZ2h0PSIyIiBzdHlsZT0iZmlsbDojM0YzQTM0OyIgdHJhbnNmb3JtPSJtYXRyaXgoMC43MDcgLTAuNzA3MiAwLjcwNzIgMC43MDcgMi41MjcyIDM3LjM3MTcpIiB3aWR0aD0iMiIgeD0iNDUuMzY0IiB5PSIxNC42MzYiLz48L2c+PC9nPjwvc3ZnPg==';

const CubicPorts = ['端口1', '端口2', '端口3', '端口4', '端口5', '端口6'];
const LightNumbers = ['全部', '第1个', '第2个', '第3个'];
const CubicStrongs = ['低', '中', '高'];
const CubicTones = ['do', 're', 'mi', 'fa', 'so', 'la', 'xi'];
const CubicFreqs = ['1', '2', '3', '4', '1/2', '1/4', '3/4'];
const MotorNumbers = ['编号1', '编号2'];


/**
 * Class for the "Cubic" extension's blocks in Scratch 3.0
 * @param {Runtime} runtime - the runtime instantiating this block package.
 * @constructor
 */
class Scratch3CubicBlocks {

    constructor (runtime) {
        this._runtime = runtime;
/*
        startTime = Date.now();
        this.lastMillis = 0;
        RGB1 = Cast.toRgbColorObject('#000000');
        RGB2 = Cast.toRgbColorObject('#000000');
        
        this.ws = new WebSocket("ws://localhost:8081");
        this.ws.binaryType = 'arraybuffer';
        
        this.ws.onmessage =  this._getWsData;
        this.ws.onopen =  this._openSocket;
        this.ws.onclose =  this._closeSocket;
        this.ws.onerror =  this._errorSocket;        
        
        this._sendWsData = this._sendWsData.bind(this);
        this._getWsData = this._getWsData.bind(this);
        this._openSocket = this._openSocket.bind(this);
        this._closeSocket = this._closeSocket.bind(this);
        this._errorSocket = this._errorSocket.bind(this);
*/
        console.log("Before registering to runtime...");
        this._cubic = null;
        this._runtime.registerPeripheralExtension('Cubic', this);
        console.log("After registering to runtime...");

        this.reset = this.reset.bind(this);
        this._onConnect = this._onConnect.bind(this);
        this._onMessage = this._onMessage.bind(this);
        console.log("Cubic constructor done!");
        //this._pollValues = this._pollValues.bind(this);

        this._temperature = 0;
        this._humidty = 0;
        this._key = 7;
        this._touch = 0x01;
        this._ctouch = 0x00;
        this._rotate = 0x00;
        this._light1 = 0x00;
        this._light2 = 0x01;
        this._sound1 = 0x00;
        this._sound2 = 0x00;
        this._avoid = 0x01;
        this._sonar = 1000;
    }

    /**
     * Called by the runtime when user wants to scan for an EV3 peripheral.
     */
    scan () {
        console.log("Entering scan...");
        if (this._cubic) {
            this._cubic.disconnect();
        }
        this._cubic = new CUBIC(this._runtime, 'Cubic', {
        }, this._onConnect, this.reset, this._onMessage);
    }

    /**
     * Called by the runtime when user wants to connect to a certain EV3 peripheral.
     * @param {number} id - the id of the peripheral to connect to.
     */
    connect (id) {
        console.log("Entering connect...");
        console.log(id);
        if (this._cubic) {
            this._cubic.connectPeripheral(id);
        }
    }

    /**
     * Called by the runtime when user wants to disconnect from the EV3 peripheral.
     */
    disconnect () {
        console.log("Entering disconnect...")
        if (this._cubic) {
            this._cubic.disconnect();
        }
        this.reset();
    }

    /**
     * Reset all the state and timeout/interval ids.
     */
    reset () {
        console.log("Entering reset...");
    }

    /**
     * Called by the runtime to detect whether the EV3 peripheral is connected.
     * @return {boolean} - the connected state.
     */
    isConnected () {
        console.log("Entering isConnected...")
        var connected = false;
        if (this._cubic) {
            connected = this._cubic.isConnected();
        }
        console.log(connected);
        return connected;
    }

    /**
     * When the Cubic peripheral connects, start polling for sensor and motor values.
     * @private
     */
    _onConnect () {
        console.log("Entering _onConnect...");
    }

    toHexString(byteArray) {
      return Array.from(byteArray, function(byte) {
        return ('0' + (byte & 0xFF).toString(16)).slice(-2);
      }).join('')
    }
    /**
     * Message handler for incoming EV3 reply messages, either a list of connected
     * devices (sensors and motors) or the values of the connected sensors and motors.
     * @param {object} params - incoming message parameters
     * @private
     */
    _onMessage (params) {
        console.log("Entering _onMessage...");
        const message = params.message;
        const data = Base64Util.base64ToUint8Array(message);
        console.log(this.toHexString(data));
        if (data[0] == 0x05) {
            this._temperature = parseInt(data[1]);
            this._humidity = parseInt(data[2]);
            console.log("temperature: " + this._temperature + ", humidity: " + this._humidity);
        }
        if (data[0] == 0x06) {
            this._key = parseInt(data[1]);
            console.log("key: " + this._key);
        }
        if (data[0] == 0x07) {
            this._touch = parseInt(data[1]);
            console.log("touch: " + this._touch);
        }
        if (data[0] == 0x08) {
            this._ctouch = parseInt(data[1]);
            console.log("ctouch: " + this._ctouch);
        }
        if (data[0] == 0x09) {
            this._rotate = parseInt(data[2]) * 128 + parseInt(data[1]);
            console.log("rotate: " + this._rotate);
        }
        if (data[0] == 0x0A) {
            if (data.length == 3) {
                this._light1 = parseInt(data[2]) * 128 + parseInt(data[1]);
            } else if (data.length == 2) {
                this._light2 = parseInt(data[1]);
            } else {
            }
            console.log("light1: " + this._light1);
            console.log("light2: " + this._light2);
        }
        if (data[0] == 0x0B) {
            if (data.length == 3) {
                this._sound1 = parseInt(data[2]) * 128 + parseInt(data[1]);
            } else if (data.length == 2) {
                this._sound2 = parseInt(data[1]);
            } else {
            }
            console.log("sound1: " + this._sound1);
            console.log("sound2: " + this._sound2);
        }
        if (data[0] == 0x0C) {
            this._avoid = parseInt(data[1]);
            console.log("avoid: " + this._avoid);
        }
        if (data[0] == 0x0D) {
            this._sonar = (parseInt(data[3]) * 16384 + parseInt(data[2]) * 128 + parseInt(data[1])) / 1000;
            console.log("sonar: " + this._sonar);
        }
        if (data[0] == 0x0E) {
            this._rockerx = parseInt(data[1]);
            if (data[2] == 0x00) {
                this._rockerx = -this._rockerx;
            }
            this._rockery = parseInt(data[3]);
            if (data[4] == 0x00) {
                this._rockery = -this._rockery;
            }
            if (data[5] == 0x00 && data[6] == 0x00) {
                this._rocker = true;
            } else {
                this._rocker = false;
            }
            console.log("sonar: " + this._sonar);
        }
    }

    /**
     * Send a message to the peripheral BT socket.
     * @param {Uint8Array} message - the message to send.
     * @param {boolean} [useLimiter=true] - if true, use the rate limiter
     * @return {Promise} - a promise result of the send operation.
     */
    send (message) {
        if (!this.isConnected()) return Promise.resolve();
        return this._cubic.sendMessage({
            message: Base64Util.uint8ArrayToBase64(message),
            encoding: 'base64'
        });
    }

    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo () {
        return {
            id: 'Cubic',
            name: formatMessage({
                id: 'Cubic',
                default: 'Cubic',
                description: 'Cubic extension'
            }),
            menuIconURI: menuIconURI,
            blockIconURI: blockIconURI,
            showStatusButton: true,
            blocks: [
                {
                    opcode: 'ledon',
                    blockType: BlockType.COMMAND,
                    text: '点亮LED灯 [PORT]',
                    arguments: {
                        PORT: {
                            type: ArgumentType.NUMBER,
                            menu: 'cubicPorts',
                            defaultValue: 0,
                        },
                    }
                },
                {
                    opcode: 'ledoff',
                    blockType: BlockType.COMMAND,                    
                    text: '熄灭LED灯 [PORT]',
                    arguments: {
                        PORT: {
                            type: ArgumentType.NUMBER,
                            menu: 'cubicPorts',
                            defaultValue: 0,
                        },
                    }
                },
                {
                    opcode: 'ledrgb',
                    blockType: BlockType.COMMAND,
                    text: '设置RGB全彩灯 端口[PORT] 编号[NUMBER] 红[R] 绿[G] 蓝[B]',
                    arguments: {
                        PORT: {
                            type: ArgumentType.NUMBER,
                            menu: 'cubicPorts',
                            defaultValue: 0,
                        },
                        NUMBER: {
                            type: ArgumentType.NUMBER,
                            menu: 'lightNumbers',
                            defaultValue: 0,
                        },
                        R: {
                            type: ArgumentType.STRING,
                            defaultValue: '0'
                        },
                        G: {
                            type: ArgumentType.STRING,
                            defaultValue: '0'
                        },
                        B: {
                            type: ArgumentType.STRING,
                            defaultValue: '0'
                        }
                    }
                },
                '---',
                {
                    opcode: 'display1',
                    blockType: BlockType.COMMAND,
                    text: '显示屏 端口[PORT] 显示(XX:YY) [XX]:[YY]',
                    arguments: {
                        PORT: {
                            type: ArgumentType.NUMBER,
                            menu: 'cubicPorts',
                            defaultValue: 0,
                        },
                        XX: {
                            type: ArgumentType.STRING,
                            defaultValue: '00'
                        },
                        YY: {
                            type: ArgumentType.STRING,
                            defaultValue: '00'
                        }
                    }
                },
                {
                    opcode: 'display2',
                    blockType: BlockType.COMMAND,
                    text: '显示屏 端口[PORT] 显示(XXYY) [XX][YY]',
                    arguments: {
                        PORT: {
                            type: ArgumentType.NUMBER,
                            menu: 'cubicPorts',
                            defaultValue: 0,
                        },
                        XX: {
                            type: ArgumentType.STRING,
                            defaultValue: '00'
                        },
                        YY: {
                            type: ArgumentType.STRING,
                            defaultValue: '00'
                        }
                    }
                },
                '---',
                {
                    opcode: 'dht1',
                    blockType: BlockType.COMMAND,
                    text: '读取温湿度传感器 端口[PORT]',
                    arguments: {
                        PORT: {
                            type: ArgumentType.NUMBER,
                            menu: 'cubicPorts',
                            defaultValue: 0,
                        },
                    }
                },
                {
                    opcode: 'dht2',
                    blockType: BlockType.REPORTER,
                    text: '温度',
                },
                {
                    opcode: 'dht3',
                    blockType: BlockType.REPORTER,
                    text: '湿度',
                },
                {
                    opcode: 'key1',
                    blockType: BlockType.COMMAND,
                    text: '读取按键传感器 端口[PORT]',
                    arguments: {
                        PORT: {
                            type: ArgumentType.NUMBER,
                            menu: 'cubicPorts',
                            defaultValue: 0,
                        },
                    }
                },
                {
                    opcode: 'key2',
                    blockType: BlockType.REPORTER,
                    text: '按键',
                },
                {
                    opcode: 'touch1',
                    blockType: BlockType.COMMAND,
                    text: '读取触碰传感器 端口[PORT]',
                    arguments: {
                        PORT: {
                            type: ArgumentType.NUMBER,
                            menu: 'cubicPorts',
                            defaultValue: 0,
                        },
                    }
                },
                {
                    opcode: 'touch2',
                    blockType: BlockType.REPORTER,
                    text: '触碰',
                },
                {
                    opcode: 'ctouch1',
                    blockType: BlockType.COMMAND,
                    text: '读取电容触碰传感器 端口[PORT]',
                    arguments: {
                        PORT: {
                            type: ArgumentType.NUMBER,
                            menu: 'cubicPorts',
                            defaultValue: 0,
                        },
                    }
                },
                {
                    opcode: 'ctouch2',
                    blockType: BlockType.REPORTER,
                    text: '电容触碰',
                },
                {
                    opcode: 'rotate1',
                    blockType: BlockType.COMMAND,
                    text: '读取旋转传感器 端口[PORT]',
                    arguments: {
                        PORT: {
                            type: ArgumentType.NUMBER,
                            menu: 'cubicPorts',
                            defaultValue: 0,
                        },
                    }
                },
                {
                    opcode: 'rotate2',
                    blockType: BlockType.REPORTER,
                    text: '旋转',
                },
                {
                    opcode: 'light1',
                    blockType: BlockType.COMMAND,
                    text: '读取光敏传感器 端口[PORT]',
                    arguments: {
                        PORT: {
                            type: ArgumentType.NUMBER,
                            menu: 'cubicPorts',
                            defaultValue: 0,
                        },
                    }
                },
                {
                    opcode: 'light2',
                    blockType: BlockType.REPORTER,
                    text: '光值',
                },
                {
                    opcode: 'light3',
                    blockType: BlockType.REPORTER,
                    text: '有光',
                },
                {
                    opcode: 'sound1',
                    blockType: BlockType.COMMAND,
                    text: '读取声音传感器 端口[PORT]',
                    arguments: {
                        PORT: {
                            type: ArgumentType.NUMBER,
                            menu: 'cubicPorts',
                            defaultValue: 0,
                        },
                    }
                },
                {
                    opcode: 'sound2',
                    blockType: BlockType.REPORTER,
                    text: '音量',
                },
                {
                    opcode: 'sound3',
                    blockType: BlockType.REPORTER,
                    text: '有声',
                },
                {
                    opcode: 'avoid1',
                    blockType: BlockType.COMMAND,
                    text: '读取红外避障传感器 端口[PORT]',
                    arguments: {
                        PORT: {
                            type: ArgumentType.NUMBER,
                            menu: 'cubicPorts',
                            defaultValue: 0,
                        },
                    }
                },
                {
                    opcode: 'avoid2',
                    blockType: BlockType.REPORTER,
                    text: '障碍',
                },
                {
                    opcode: 'sonar1',
                    blockType: BlockType.COMMAND,
                    text: '读取超声波传感器 端口[PORT]',
                    arguments: {
                        PORT: {
                            type: ArgumentType.NUMBER,
                            menu: 'cubicPorts',
                            defaultValue: 0,
                        },
                    }
                },
                {
                    opcode: 'sonar2',
                    blockType: BlockType.REPORTER,
                    text: '距离',
                },
                {
                    opcode: 'rocker1',
                    blockType: BlockType.COMMAND,
                    text: '读取摇杆传感器 端口[PORT]',
                    arguments: {
                        PORT: {
                            type: ArgumentType.NUMBER,
                            menu: 'cubicPorts',
                            defaultValue: 0,
                        },
                    }
                },
                {
                    opcode: 'rockerx',
                    blockType: BlockType.REPORTER,
                    text: 'X坐标',
                },
                {
                    opcode: 'rockery',
                    blockType: BlockType.REPORTER,
                    text: 'Y坐标',
                },
                {
                    opcode: 'rocker2',
                    blockType: BlockType.REPORTER,
                    text: '摇杆被按下',
                },
                {
                    opcode: 'buzzer1',
                    blockType: BlockType.COMMAND,
                    text: '音乐蜂鸣器停止 端口[PORT]',
                    arguments: {
                        PORT: {
                            type: ArgumentType.NUMBER,
                            menu: 'cubicPorts',
                            defaultValue: 0,
                        },
                    }
                },
                {
                    opcode: 'buzzer2',
                    blockType: BlockType.COMMAND,
                    text: '音乐蜂鸣器报警 端口[PORT]',
                    arguments: {
                        PORT: {
                            type: ArgumentType.NUMBER,
                            menu: 'cubicPorts',
                            defaultValue: 0,
                        },
                    }
                },
                {
                    opcode: 'buzzer3',
                    blockType: BlockType.COMMAND,
                    text: '音乐蜂鸣器 端口[PORT] [STRONGTH] 音调[TONE] 节拍[FREQ]',
                    arguments: {
                        PORT: {
                            type: ArgumentType.NUMBER,
                            menu: 'cubicPorts',
                            defaultValue: 0,
                        },
                        STRONGTH: {
                            type: ArgumentType.NUMBER,
                            menu: 'cubicStrongs',
                            defaultValue: 0,
                        },
                        TONE: {
                            type: ArgumentType.NUMBER,
                            menu: 'cubicTones',
                            defaultValue: 0,
                        },
                        FREQ: {
                            type: ArgumentType.NUMBER,
                            menu: 'cubicFreqs',
                            defaultValue: 0,
                        },
                    }
                },
                {
                    opcode: 'motor1',
                    blockType: BlockType.COMMAND,
                    text: '停止直流电机控制器 端口[PORT] 编号[NUMBER]',
                    arguments: {
                        PORT: {
                            type: ArgumentType.NUMBER,
                            menu: 'cubicPorts',
                            defaultValue: 0,
                        },
                        NUMBER: {
                            type: ArgumentType.NUMBER,
                            menu: 'motorNumbers',
                            defaultValue: 0,
                        },
                    }
                },
                {
                    opcode: 'motor2',
                    blockType: BlockType.COMMAND,
                    text: '正转直流电机控制器 端口[PORT] 编号[NUMBER] 速度[SPEED]',
                    arguments: {
                        PORT: {
                            type: ArgumentType.NUMBER,
                            menu: 'cubicPorts',
                            defaultValue: 0,
                        },
                        NUMBER: {
                            type: ArgumentType.NUMBER,
                            menu: 'motorNumbers',
                            defaultValue: 0,
                        },
                        SPEED: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 100,
                        },
                    }
                },
                {
                    opcode: 'motor3',
                    blockType: BlockType.COMMAND,
                    text: '反转直流电机控制器 端口[PORT] 编号[NUMBER] 速度[SPEED]',
                    arguments: {
                        PORT: {
                            type: ArgumentType.NUMBER,
                            menu: 'cubicPorts',
                            defaultValue: 0,
                        },
                        NUMBER: {
                            type: ArgumentType.NUMBER,
                            menu: 'motorNumbers',
                            defaultValue: 0,
                        },
                        SPEED: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 100,
                        },
                    }
                },
           ],
            
            menus: {
                cubicPorts: {
                    acceptReporters: false,
                    items: this._formatMenu(CubicPorts)
                },
                lightNumbers: {
                    acceptReporters: false,
                    items: this._formatMenu(LightNumbers)
                },
                cubicStrongs: {
                    acceptReporters: false,
                    items: this._formatMenu(CubicStrongs)
                },
                cubicTones: {
                    acceptReporters: false,
                    items: this._formatMenu(CubicTones)
                },
                cubicFreqs: {
                    acceptReporters: false,
                    items: this._formatMenu(CubicFreqs)
                },
                motorNumbers: {
                    acceptReporters: false,
                    items: this._formatMenu(MotorNumbers)
                },
            }
        };
    }        

    ledon(args, util) {
        var params = new Uint8Array(3);
        params[0] = 0x01;
        params[1] = parseInt(args.PORT);
        params[2] = 0x01;
        this.send(params);
    }

    ledoff(args, util) {
        var params = new Uint8Array(3);
        params[0] = 0x01;
        params[1] = parseInt(args.PORT);
        params[2] = 0x00;
        this.send(params);
    }

    ledrgb(args, util) {
        var params = new Uint8Array(6);
        params[0] = 0x03;
        params[1] = parseInt(args.PORT);
        params[2] = parseInt(args.NUMBER);
        params[3] = parseInt(args.R);
        params[4] = parseInt(args.G);
        params[5] = parseInt(args.B);
        this.send(params);
    }

    display1(args, util) {
        var params = new Uint8Array(5);
        params[0] = 0x04;
        params[1] = parseInt(args.PORT);
        params[2] = parseInt(args.XX);
        params[3] = parseInt(args.YY);
        params[4] = 0x01;
        this.send(params);
    }

    display2(args, util) {
        var params = new Uint8Array(5);
        params[0] = 0x04;
        params[1] = parseInt(args.PORT);
        params[2] = parseInt(args.XX);
        params[3] = parseInt(args.YY);
        params[4] = 0x00;
        this.send(params);
    }

    dht1(args, util) {
        var params = new Uint8Array(2);
        params[0] = 0x05;
        params[1] = parseInt(args.PORT);
        this._temperature = 0;
        this.send(params);
    }

    dht2(args, util) {
        return this._temperature;
    }

    dht3(args, util) {
        return this._humidity;
    }

    key1(args, util) {
        var params = new Uint8Array(2);
        params[0] = 0x06;
        params[1] = parseInt(args.PORT);
        this._key = 7;
        this.send(params);
    }

    key2(args, util) {
        return this._key;
    }

    touch1(args, util) {
        var params = new Uint8Array(2);
        params[0] = 0x07;
        params[1] = parseInt(args.PORT);
        this._touch = 0x01;
        this.send(params);
    }

    touch2(args, util) {
        if (this._touch == 0x00){
            return true;
        } else {
            return false;
        }
    }

    ctouch1(args, util) {
        var params = new Uint8Array(2);
        params[0] = 0x08;
        params[1] = parseInt(args.PORT);
        this._ctouch = 0x00;
        this.send(params);
    }

    ctouch2(args, util) {
        if (this._ctouch == 0x01){
            return true;
        } else {
            return false;
        }
    }

    rotate1(args, util) {
        var params = new Uint8Array(2);
        params[0] = 0x09;
        params[1] = parseInt(args.PORT);
        this._rotate = 0x00;
        this.send(params);
    }

    rotate2(args, util) {
        return this._rotate;
    }

    light1(args, util) {
        var params = new Uint8Array(2);
        params[0] = 0x0A;
        params[1] = parseInt(args.PORT);
        this._light1 = 0x00;
        this._light2 = 0x01;
        this.send(params);
    }

    light2(args, util) {
        return this._light1;
    }

    light3(args, util) {
        if (this._light2 == 0x00) {
            return true;
        } else {
            return false;
        }
    }

    sound1(args, util) {
        var params = new Uint8Array(2);
        params[0] = 0x0B;
        params[1] = parseInt(args.PORT);
        this._sound1 = 0x00;
        this._sound2 = 0x00;
        this.send(params);
    }

    sound2(args, util) {
        return this._sound1;
    }

    sound3(args, util) {
        if (this._sound2 == 0x00) {
            return false;
        } else {
            return true;
        }
    }

    avoid1(args, util) {
        var params = new Uint8Array(2);
        params[0] = 0x0C;
        params[1] = parseInt(args.PORT);
        this._avoid = 0x01;
        this.send(params);
    }

    avoid2(args, util) {
        if (this._avoid == 0x00) {
            return true;
        } else {
            return false;
        }
    }

    sonar1(args, util) {
        var params = new Uint8Array(2);
        params[0] = 0x0D;
        params[1] = parseInt(args.PORT);
        this._sonar = 1000;
        this.send(params);
    }

    sonar2(args, util) {
        return this._sonar;
    }

    rocker1(args, util) {
        var params = new Uint8Array(2);
        params[0] = 0x0E;
        params[1] = parseInt(args.PORT);
        this._rocker = false;
        this.send(params);
    }

    rockerx(args, util) {
        return this._rockerx;
    }

    rockery(args, util) {
        return this._rockery;
    }

    rocker2(args, util) {
        return this._rocker;
    }

    buzzer1(args, util) {
        var params = new Uint8Array(3);
        params[0] = 0x0F;
        params[1] = parseInt(args.PORT);
        params[2] = 0x00;
        this.send(params);
    }

    buzzer2(args, util) {
        var params = new Uint8Array(3);
        params[0] = 0x0F;
        params[1] = parseInt(args.PORT);
        params[2] = 0x01;
        this.send(params);
    }

    buzzer3(args, util) {
        var params = new Uint8Array(6);
        params[0] = 0x0F;
        params[1] = parseInt(args.PORT);
        params[2] = 0x02;
        params[3] = parseInt(args.STRONGTH);
        params[4] = parseInt(args.TONE);
        params[5] = parseInt(args.FREQ);
        this.send(params);
    }

    motor1(args, util) {
        var params = new Uint8Array(4);
        params[0] = 0x10;
        params[1] = parseInt(args.PORT);
        params[2] = parseInt(args.NUMBER);
        params[3] = 0x00;
        this.send(params);
    }

    motor2(args, util) {
        var params = new Uint8Array(5);
        params[0] = 0x10;
        params[1] = parseInt(args.PORT);
        params[2] = parseInt(args.NUMBER);
        params[3] = 0x01;
        params[4] = parseInt(args.SPEED);
        this.send(params);
    }

    motor3(args, util) {
        var params = new Uint8Array(5);
        params[0] = 0x10;
        params[1] = parseInt(args.PORT);
        params[2] = parseInt(args.NUMBER);
        params[3] = 0x02;
        params[4] = parseInt(args.SPEED);
        this.send(params);
    }

    /**
     * Formats menus into a format suitable for block menus, and loading previously
     * saved projects:
     * [
     *   {
     *    text: label,
     *    value: index
     *   },
     *   {
     *    text: label,
     *    value: index
     *   },
     *   etc...
     * ]
     *
     * @param {array} menu - a menu to format.
     * @return {object} - a formatted menu as an object.
     * @private
     */
    _formatMenu (menu) {
        const m = [];
        for (let i = 0; i < menu.length; i++) {
            const obj = {};
            obj.text = menu[i];
            obj.value = i.toString();
            m.push(obj);
        }
        return m;
    }
}

module.exports = Scratch3CubicBlocks;
