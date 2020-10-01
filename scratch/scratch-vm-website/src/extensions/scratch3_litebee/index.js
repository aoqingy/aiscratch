const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Clone = require('../../util/clone');
const Cast = require('../../util/cast');
const Color = require('../../util/color');
const formatMessage = require('format-message');
const MathUtil = require('../../util/math-util');

const LITEBEE = require('../../io/litebee');
const Base64Util = require('../../util/base64-util');
//const WebSocket = require('../../util/ReconnectingWebSocket');

//const CRC = require('crc-full').CRC;
//var crc = new CRC("CRC16_XMODEM", 16, 0x1021, 0x0000, 0x0000, false, false);

/* Icon svg to be displayed at the left edge of each extension block, encoded as a data URI. */
const blockIconURI = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/Pjxzdmcgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgMTI4IDEyODsiIHZlcnNpb249IjEuMSIgdmlld0JveD0iMCAwIDEyOCAxMjgiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxzdHlsZSB0eXBlPSJ0ZXh0L2NzcyI+Cgkuc3Qwe2ZpbGw6IzFDQTJCQjt9Cgkuc3Qxe2ZpbGw6I0VBQzEwMDt9Cjwvc3R5bGU+PGcgaWQ9Il94MzFfMl8zRF9QcmludGluZyIvPjxnIGlkPSJfeDMxXzFfVlJfR2VhciIvPjxnIGlkPSJfeDMxXzBfVmlydHVhbF9yZWFsaXR5Ii8+PGcgaWQ9Il94MzlfX0F1Z21lbnRlZF9yZWFsaXR5Ii8+PGcgaWQ9Il94MzhfX1RlbGVwb3J0Ii8+PGcgaWQ9Il94MzdfX0dsYXNzZXNzIi8+PGcgaWQ9Il94MzZfX0ZvbGRpbmdfcGhvbmUiLz48ZyBpZD0iX3gzNV9fRHJvbmUiLz48ZyBpZD0iX3gzNF9fUmV0aW5hX3NjYW4iLz48ZyBpZD0iX3gzM19fU21hcnR3YXRjaCIvPjxnIGlkPSJfeDMyX19CaW9uaWNfQXJtIi8+PGcgaWQ9Il94MzFfX0NoaXAiPjxnPjxyZWN0IGNsYXNzPSJzdDAiIGhlaWdodD0iNDgiIHdpZHRoPSIzMiIgeD0iNDgiIHk9IjM2Ii8+PGNpcmNsZSBjbGFzcz0ic3QxIiBjeD0iMjAiIGN5PSIyOCIgcj0iOCIvPjxjaXJjbGUgY2xhc3M9InN0MSIgY3g9IjIwIiBjeT0iOTIiIHI9IjgiLz48Y2lyY2xlIGNsYXNzPSJzdDEiIGN4PSIxMDgiIGN5PSI1MiIgcj0iOCIvPjxjaXJjbGUgY2xhc3M9InN0MSIgY3g9Ijk2IiBjeT0iMTAwIiByPSI4Ii8+PGc+PHBhdGggZD0iTTEwOCw0MGMtNS4yLDAtOS42LDMuMy0xMS4zLDhIODRWMzJoLThWMjBoLTh2MTJoLThWMjBoLTh2MTJoLTh2MTZIMjR2LTguN2M0LjctMS43LDgtNi4xLDgtMTEuM2MwLTYuNi01LjQtMTItMTItMTIgICAgIFM4LDIxLjQsOCwyOGMwLDUuMiwzLjMsOS42LDgsMTEuM1Y1NmgyOHY4SDE2djE2LjdjLTQuNywxLjctOCw2LjEtOCwxMS4zYzAsNi42LDUuNCwxMiwxMiwxMnMxMi01LjQsMTItMTJjMC01LjItMy4zLTkuNi04LTExLjMgICAgIFY3MmgyMHYxNmg4djEyaDhWODhoOHYxMmg4Vjg4aDhWNzJoOHYxNi43Yy00LjcsMS43LTgsNi4xLTgsMTEuM2MwLDYuNiw1LjQsMTIsMTIsMTJzMTItNS40LDEyLTEyYzAtNS4yLTMuMy05LjYtOC0xMS4zVjY0SDg0ICAgICB2LThoMTIuN2MxLjcsNC43LDYuMSw4LDExLjMsOGM2LjYsMCwxMi01LjQsMTItMTJTMTE0LjYsNDAsMTA4LDQweiBNMjAsMjRjMi4yLDAsNCwxLjgsNCw0cy0xLjgsNC00LDRzLTQtMS44LTQtNFMxNy44LDI0LDIwLDI0ICAgICB6IE0yMCw5NmMtMi4yLDAtNC0xLjgtNC00czEuOC00LDQtNHM0LDEuOCw0LDRTMjIuMiw5NiwyMCw5NnogTTk2LDEwNGMtMi4yLDAtNC0xLjgtNC00czEuOC00LDQtNHM0LDEuOCw0LDRTOTguMiwxMDQsOTYsMTA0eiAgICAgIE03Niw4MEg1MlY0MGgyNFY4MHogTTEwOCw1NmMtMi4yLDAtNC0xLjgtNC00czEuOC00LDQtNHM0LDEuOCw0LDRTMTEwLjIsNTYsMTA4LDU2eiIvPjxyZWN0IGhlaWdodD0iOCIgd2lkdGg9IjgiIHg9IjU2IiB5PSI2NCIvPjwvZz48L2c+PC9nPjwvc3ZnPg==';

/* Icon svg to be displayed in the category menu, encoded as a data URI. */
const menuIconURI = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjxzdmcgaWQ9IkxheWVyXzFfMV8iIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDY0IDY0OyIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIwIDAgNjQgNjQiIHhtbDpzcGFjZT0icHJlc2VydmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiPjxnPjxnPjxwYXRoIGQ9Ik01MS4zMTQsMTQuOTI5bC00LjI0My00LjI0M2wtMi4zMzEsMS4zOTljLTAuMzUxLTAuMTY4LTAuNzExLTAuMzE4LTEuMDgxLTAuNDQ4TDQzLDloLTYgICAgbC0wLjY1OSwyLjYzN2MtMC4zNywwLjEzMS0wLjczLDAuMjgxLTEuMDgxLDAuNDQ4bC0yLjMzMS0xLjM5OWwtNC4yNDMsNC4yNDNsMS4zOTksMi4zMzFjLTAuMTY4LDAuMzUxLTAuMzE4LDAuNzExLTAuNDQ4LDEuMDgxICAgIEwyNywxOXY2bDIuNjM3LDAuNjU5YzAuMTMxLDAuMzcsMC4yODEsMC43MywwLjQ0OCwxLjA4MWwtMS4zOTksMi4zMzFsNC4yNDMsNC4yNDNsMi4zMzEtMS4zOTkgICAgYzAuMzUxLDAuMTY4LDAuNzExLDAuMzE4LDEuMDgxLDAuNDQ4TDM3LDM1aDZsMC42NTktMi42MzdjMC4zNy0wLjEzMSwwLjczLTAuMjgxLDEuMDgxLTAuNDQ4bDIuMzMxLDEuMzk5bDQuMjQzLTQuMjQzICAgIGwtMS4zOTktMi4zMzFjMC4xNjgtMC4zNTEsMC4zMTgtMC43MTEsMC40NDgtMS4wODFMNTMsMjV2LTZsLTIuNjM3LTAuNjU5Yy0wLjEzMS0wLjM3LTAuMjgxLTAuNzMtMC40NDgtMS4wODFMNTEuMzE0LDE0LjkyOXoiIHN0eWxlPSJmaWxsOiNGRkNCNTc7Ii8+PC9nPjxnPjxyZWN0IGhlaWdodD0iNCIgc3R5bGU9ImZpbGw6I0U1NjU2NTsiIHdpZHRoPSIyIiB4PSIzOSIgeT0iMiIvPjwvZz48Zz48cmVjdCBoZWlnaHQ9IjIwIiBzdHlsZT0iZmlsbDojRTU2NTY1OyIgd2lkdGg9IjIiIHg9IjM5IiB5PSI0MiIvPjwvZz48Zz48cmVjdCBoZWlnaHQ9IjIiIHN0eWxlPSJmaWxsOiNFNTY1NjU7IiB3aWR0aD0iMiIgeD0iMzkiIHk9IjM4Ii8+PC9nPjxnPjxwYXRoIGQ9Ik01NS4xMjIsOC41MTJDNTEuMDUsMy43MzgsNDQuODk5LDEsMzguMjQ5LDFoLTYuNDY4Yy0zLjQ3NSwwLTYuNjg1LDAuNjk5LTkuNTQyLDIuMDc5ICAgIEMxNC42ODksNi43MjMsMTAsMTQuMTYsMTAsMjIuNDg1YzAsMi41NjQtMS4xNDgsNC45NTMtMy4xNSw2LjU1NGwtMi4xNzgsMS43NDJsMC40ODYsMC43NThjMy4zNDgsNS4yMjIsNS44MzEsMTAuOTE1LDcuMzgsMTYuOTIxICAgIGwwLjMxMiwxLjIwOWMwLjUzNywyLjA4NCwxLjg3NSwzLjc3NSwzLjY3LDQuNjRjMS45ODcsMC45NTksNC4zMjYsMC45MSw2LjI3MS0wLjE0M2wxNC42OTktOC4yOTZsLTAuOTgyLTEuNzQybC0xNC42ODQsOC4yODcgICAgYy0xLjM2NiwwLjc0LTMuMDI0LDAuNzc0LTQuNDM2LDAuMDkzYy0xLjI2NC0wLjYwOS0yLjIxMy0xLjgyNi0yLjYwMy0zLjMzOWwtMC4zMTItMS4yMDljLTAuMDgzLTAuMzIyLTAuMTc5LTAuNjQtMC4yNjctMC45NjFIMTcgICAgdi0yaC0zLjM3OWMtMS41MTUtNC44MzktMy42Mi05LjQ2MS02LjI5OS0xMy43NzdMOC4xLDMwLjYwMWMyLjQ3OS0xLjk4MywzLjktNC45NDEsMy45LTguMTE2YzAtNy41NTIsNC4yNTctMTQuMjk3LDExLjEwOC0xNy42MDUgICAgQzI1LjY5MiwzLjYzMiwyOC42MSwzLDMxLjc4MSwzaDYuNDY4YzYuMDYzLDAsMTEuNjU5LDIuNDgyLDE1LjM1Miw2LjgxYzMuNTg5LDQuMjA2LDUuMDYyLDkuNjY4LDQuMTUyLDE1LjM4ICAgIGMtMC4zOTksMi41MDItMS4yNjMsNC44NDgtMi41NjQsNi45NzNDNDkuODMxLDQwLjkwNiw0Nyw1MC40NDMsNDcsNTkuNzQzVjYxSDI5di04aC0ydjEwaDIydi0zLjI1NyAgICBjMC04LjkzMSwyLjcyOS0xOC4xMDYsNy44OTQtMjYuNTM1YzEuNDM5LTIuMzUsMi4zOTQtNC45NDEsMi44MzQtNy43MDNDNjAuNzMyLDE5LjIwNSw1OS4wOTcsMTMuMTcsNTUuMTIyLDguNTEyeiIgc3R5bGU9ImZpbGw6IzNGM0EzNDsiLz48cmVjdCBoZWlnaHQ9IjIiIHN0eWxlPSJmaWxsOiMzRjNBMzQ7IiB3aWR0aD0iNiIgeD0iMTUiIHk9IjI2Ii8+PHBhdGggZD0iTTQ2LDIyYzAtMy4zMDktMi42OTEtNi02LTZzLTYsMi42OTEtNiw2czIuNjkxLDYsNiw2UzQ2LDI1LjMwOSw0NiwyMnogTTQwLDI2ICAgIGMtMi4yMDYsMC00LTEuNzk0LTQtNHMxLjc5NC00LDQtNHM0LDEuNzk0LDQsNFM0Mi4yMDYsMjYsNDAsMjZ6IiBzdHlsZT0iZmlsbDojM0YzQTM0OyIvPjxwYXRoIGQ9Ik0zNS4zMjYsMzMuMDQxYzAuMDU3LDAuMDI0LDAuMTE0LDAuMDQ5LDAuMTcxLDAuMDcxTDM2LjIxOSwzNmg3LjU2MmwwLjcyMi0yLjg4OCAgICBjMC4wNTctMC4wMjIsMC4xMTQtMC4wNDcsMC4xNzEtMC4wNzFsMi41NTMsMS41MzFsNS4zNDYtNS4zNDdsLTEuNTMtMi41NTJjMC4wMjMtMC4wNTcsMC4wNDctMC4xMTQsMC4wNy0wLjE3MUw1NCwyNS43ODF2LTcuNTYyICAgIGwtMi44ODgtMC43MjJjLTAuMDkyLTAuMjI3LTAuMTktMC40NTEtMC4yOTYtMC42NjlsLTEuODAzLDAuODY0YzAuMTUyLDAuMzE4LDAuMjg4LDAuNjQ2LDAuNDA3LDAuOTgybDAuMTc5LDAuNTA2bDIuNCwwLjZ2NC40MzggICAgbC0yLjQsMC42bC0wLjE3OSwwLjUwNmMtMC4xMTksMC4zMzYtMC4yNTUsMC42NjQtMC40MDcsMC45ODJsLTAuMjMzLDAuNDg1bDEuMjc0LDIuMTIzbC0zLjEzOSwzLjEzOGwtMi4xMjItMS4yNzNsLTAuNDg0LDAuMjMxICAgIGMtMC4zMiwwLjE1My0wLjY0NiwwLjI4OS0wLjk4MiwwLjQwN2wtMC41MDgsMC4xNzlMNDIuMjE5LDM0aC00LjQzOGwtMC42MDEtMi40MDFsLTAuNTA4LTAuMTc5ICAgIGMtMC4zMzYtMC4xMTgtMC42NjItMC4yNTQtMC45ODItMC40MDdsLTAuNDg0LTAuMjMxbC0yLjEyMiwxLjI3M2wtMy42OS0zLjY5bC0xLjQxNCwxLjQxNGw0Ljc5NCw0Ljc5NEwzNS4zMjYsMzMuMDQxeiIgc3R5bGU9ImZpbGw6IzNGM0EzNDsiLz48cGF0aCBkPSJNMjYsMTguMjE5djcuNTYybDIuODg4LDAuNzIyYzAuMDkyLDAuMjI3LDAuMTksMC40NTEsMC4yOTYsMC42NjlsMS44MDMtMC44NjQgICAgYy0wLjE1Mi0wLjMxOC0wLjI4OC0wLjY0Ni0wLjQwNy0wLjk4MkwzMC40LDI0LjgxOWwtMi40LTAuNnYtNC40MzhsMi40LTAuNmwwLjE3OS0wLjUwNmMwLjExOS0wLjMzNiwwLjI1NS0wLjY2NCwwLjQwNy0wLjk4MiAgICBsMC4yMzItMC40ODVsLTEuMjczLTIuMTIzbDMuMTM5LTMuMTM5bDIuMTIyLDEuMjczbDAuNDg0LTAuMjMxYzAuMzItMC4xNTMsMC42NDYtMC4yODksMC45ODItMC40MDdsMC41MDgtMC4xNzlMMzcuNzgxLDEwaDQuNDM4ICAgIGwwLjYwMSwyLjQwMWwwLjUwOCwwLjE3OWMwLjMzNiwwLjExOCwwLjY2MiwwLjI1NCwwLjk4MiwwLjQwN2wwLjQ4NCwwLjIzMWwyLjEyMi0xLjI3M2wzLjY5LDMuNjlsMS40MTQtMS40MTRsLTQuNzk0LTQuNzk1ICAgIGwtMi41NTMsMS41MzJjLTAuMDU3LTAuMDI0LTAuMTE0LTAuMDQ4LTAuMTcxLTAuMDcxTDQzLjc4MSw4aC03LjU2MmwtMC43MjIsMi44ODdjLTAuMDU3LDAuMDIzLTAuMTE0LDAuMDQ3LTAuMTcxLDAuMDcxICAgIGwtMi41NTMtMS41MzJsLTUuMzQ2LDUuMzQ3bDEuNTMsMi41NTNjLTAuMDIzLDAuMDU3LTAuMDQ3LDAuMTE0LTAuMDcsMC4xNzFMMjYsMTguMjE5eiIgc3R5bGU9ImZpbGw6IzNGM0EzNDsiLz48cmVjdCBoZWlnaHQ9IjIiIHN0eWxlPSJmaWxsOiMzRjNBMzQ7IiB3aWR0aD0iMiIgeD0iMzkiIHk9IjEyIi8+PHJlY3QgaGVpZ2h0PSIyIiBzdHlsZT0iZmlsbDojM0YzQTM0OyIgdHJhbnNmb3JtPSJtYXRyaXgoMC43MDcyIC0wLjcwNyAwLjcwNyAwLjcwNzIgLTEuMjA2OCAyOC4zNTc3KSIgd2lkdGg9IjIiIHg9IjMyLjYzNiIgeT0iMTQuNjM2Ii8+PHJlY3QgaGVpZ2h0PSIyIiBzdHlsZT0iZmlsbDojM0YzQTM0OyIgd2lkdGg9IjIiIHg9IjMwIiB5PSIyMSIvPjxyZWN0IGhlaWdodD0iMiIgc3R5bGU9ImZpbGw6IzNGM0EzNDsiIHRyYW5zZm9ybT0ibWF0cml4KDAuNzA3IC0wLjcwNzIgMC43MDcyIDAuNzA3IC0xMC4yMDQxIDMyLjA5OTMpIiB3aWR0aD0iMiIgeD0iMzIuNjM2IiB5PSIyNy4zNjQiLz48cmVjdCBoZWlnaHQ9IjIiIHN0eWxlPSJmaWxsOiMzRjNBMzQ7IiB3aWR0aD0iMiIgeD0iMzkiIHk9IjMwIi8+PHJlY3QgaGVpZ2h0PSIyIiBzdHlsZT0iZmlsbDojM0YzQTM0OyIgdHJhbnNmb3JtPSJtYXRyaXgoMC43MDcyIC0wLjcwNyAwLjcwNyAwLjcwNzIgLTYuNDc4OCA0MS4wODMpIiB3aWR0aD0iMiIgeD0iNDUuMzY0IiB5PSIyNy4zNjQiLz48cmVjdCBoZWlnaHQ9IjIiIHN0eWxlPSJmaWxsOiMzRjNBMzQ7IiB3aWR0aD0iMiIgeD0iNDgiIHk9IjIxIi8+PHJlY3QgaGVpZ2h0PSIyIiBzdHlsZT0iZmlsbDojM0YzQTM0OyIgdHJhbnNmb3JtPSJtYXRyaXgoMC43MDcgLTAuNzA3MiAwLjcwNzIgMC43MDcgMi41MjcyIDM3LjM3MTcpIiB3aWR0aD0iMiIgeD0iNDUuMzY0IiB5PSIxNC42MzYiLz48L2c+PC9nPjwvc3ZnPg==';

const MotorNumbers = ['M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8'];
const MotorSpeeds = ['0', '30', '60', '90'];
const FlyingOrientations = ['顺时针', '逆时针'];
const FlyingAngles = ['0', '30', '60', '90'];
const FlyingHeights = ['50', '100', '150', '200', '250'];
const FlyingSpeeds = ['缓慢', '普通', '快速'];
const FlyingPositions = ['前', '后', '左', '右', '上', '下'];

/**
 * Class for the "LiteBee" extension's blocks in Scratch 3.0
 * @param {Runtime} runtime - the runtime instantiating this block package.
 * @constructor
 */
class Scratch3LiteBeeBlocks {

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
        this._litebee = null;
        this._runtime.registerPeripheralExtension('LiteBee', this);
        console.log("After registering to runtime...");

        this.reset = this.reset.bind(this);
        this._onConnect = this._onConnect.bind(this);
        this._onMessage = this._onMessage.bind(this);
        console.log("LiteBee constructor done!");
        //this._pollValues = this._pollValues.bind(this);

        this._hangle = 0;
        this._rangle = 0;
        this._pangle = 0;
        this._voltage = 0;
        this._height = 0;
    }

    /**
     * Called by the runtime when user wants to scan for an EV3 peripheral.
     */
    scan () {
        console.log("Entering scan...");
        if (this._litebee) {
            this._litebee.disconnect();
        }
        this._litebee = new LITEBEE(this._runtime, 'LiteBee', {
        }, this._onConnect, this.reset, this._onMessage);
    }

    /**
     * Called by the runtime when user wants to connect to a certain EV3 peripheral.
     * @param {number} id - the id of the peripheral to connect to.
     */
    connect (id) {
        console.log("Entering connect...");
        console.log(id);
        if (this._litebee) {
            this._litebee.connectPeripheral(id);
        }
    }

    /**
     * Called by the runtime when user wants to disconnect from the EV3 peripheral.
     */
    disconnect () {
        console.log("Entering disconnect...")
        if (this._litebee) {
            this._litebee.disconnect();
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
        if (this._litebee) {
            connected = this._litebee.isConnected();
        }
        console.log(connected);
        return connected;
    }

    /**
     * When the LiteBee peripheral connects, start polling for sensor and motor values.
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
    }

    /**
     * Send a message to the peripheral BT socket.
     * @param {Uint8Array} message - the message to send.
     * @param {boolean} [useLimiter=true] - if true, use the rate limiter
     * @return {Promise} - a promise result of the send operation.
     */
    send (message) {
        if (!this.isConnected()) return Promise.resolve();
        return this._litebee.sendMessage({
            message: Base64Util.uint8ArrayToBase64(message),
            encoding: 'base64'
        });
    }

    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo () {
        return {
            id: 'LiteBee',
            name: formatMessage({
                id: 'LiteBee',
                default: 'LiteBee',
                description: 'LiteBee extension'
            }),
            menuIconURI: menuIconURI,
            blockIconURI: blockIconURI,
            showStatusButton: true,
            blocks: [
                {
                    opcode: 'calibrate',
                    blockType: BlockType.COMMAND,
                    text: '校准'
                },
                {
                    opcode: 'landon',
                    blockType: BlockType.COMMAND,
                    text: '起飞'
                },
                {
                    opcode: 'landoff',
                    blockType: BlockType.COMMAND,                    
                    text: '降落'
                },
                {
                    opcode: 'speed',
                    blockType: BlockType.COMMAND,
                    text: '电机转速调整 电机编号[NUMBER] 速度[SPEED]',
                    arguments: {
                        NUMBER: {
                            type: ArgumentType.NUMBER,
                            menu: 'motorNumbers',
                            defaultValue: 0,
                        },
                        SPEED: {
                            type: ArgumentType.NUMBER,
                            menu: 'motorSpeeds',
                            defaultValue: 0,
                        },
                    }
                },
                {
                    opcode: 'fly0',
                    blockType: BlockType.COMMAND,
                    text: '飞机旋转飞行 方向[ORIENTATION] 角度[ANGLE]',
                    arguments: {
                        ORIENTATION: {
                            type: ArgumentType.NUMBER,
                            menu: 'flyingOrientations',
                            defaultValue: 0,
                        },
                        ANGLE: {
                            type: ArgumentType.NUMBER,
                            menu: 'flyingAngles',
                            defaultValue: 0,
                        },
                    }
                },
                {
                    opcode: 'fly1',
                    blockType: BlockType.COMMAND,
                    text: '飞机垂直飞行 高度[HEIGHT]',
                    arguments: {
                        HEIGHT: {
                            type: ArgumentType.NUMBER,
                            menu: 'flyingHeights',
                            defaultValue: 0,
                        },
                    }
                },
                {
                    opcode: 'fly2',
                    blockType: BlockType.COMMAND,
                    text: '飞机自由飞行 速度[SPEED] 方位[POSITION]',
                    arguments: {
                        SPEED: {
                            type: ArgumentType.NUMBER,
                            menu: 'flyingSpeeds',
                            defaultValue: 0,
                        },
                        POSITION: {
                            type: ArgumentType.NUMBER,
                            menu: 'flyingPositions',
                            defaultValue: 0,
                        },
                    }
                },
                {
                    opcode: 'stop',
                    blockType: BlockType.COMMAND,
                    text: '停下来'
                },
                {
                    opcode: 'info',
                    blockType: BlockType.COMMAND,
                    text: '获取当前参数'
                },
                {
                    opcode: 'headingangle',
                    blockType: BlockType.REPORTER,
                    text: '航向角'
                },
                {
                    opcode: 'rollangle',
                    blockType: BlockType.REPORTER,
                    text: '横滚角'
                },
                {
                    opcode: 'pitchangle',
                    blockType: BlockType.REPORTER,
                    text: '俯仰角'
                },
                {
                    opcode: 'voltage',
                    blockType: BlockType.REPORTER,
                    text: '飞机电压'
                },
                {
                    opcode: 'height',
                    blockType: BlockType.REPORTER,
                    text: '当前高度'
                },
           ],
            
            menus: {
                motorNumbers: {
                    acceptReporters: false,
                    items: this._formatMenu(MotorNumbers)
                },
                motorSpeeds: {
                    acceptReporters: false,
                    items: this._formatMenu(MotorSpeeds)
                },
                flyingOrientations: {
                    acceptReporters: false,
                    items: this._formatMenu(FlyingOrientations)
                },
                flyingAngles: {
                    acceptReporters: false,
                    items: this._formatMenu(FlyingAngles)
                },
                flyingHeights: {
                    acceptReporters: false,
                    items: this._formatMenu(FlyingHeights)
                },
                flyingSpeeds: {
                    acceptReporters: false,
                    items: this._formatMenu(FlyingSpeeds)
                },
                flyingPositions: {
                    acceptReporters: false,
                    items: this._formatMenu(FlyingPositions)
                },
            }
        };
    }        

    calibrate(args, util) {
        var params = new Uint8Array(1);
        params[0] = 0x0A;
        this.send(params);
    }

    landon(args, util) {
        var params = new Uint8Array(1);
        params[0] = 0x10;
        this.send(params);
    }

    landoff(args, util) {
        var params = new Uint8Array(1);
        params[0] = 0x11;
        this.send(params);
    }

    speed(args, util) {
        var params = new Uint8Array(3);
        params[0] = 0x01;
        params[1] = args.NUMBER;
        params[2] = args.SPEED;
        this.send(params);
    }

    fly0(args, util) {
        var params = new Uint8Array(3);
        params[0] = 0x12;
        params[1] = args.ORIENTATION;
        params[2] = args.ANGLE;
        this.send(params);
    }
    fly1(args, util) {
        var params = new Uint8Array(2);
        params[0] = 0x0F;
        params[1] = args.HEIGHT;
        this.send(params);
    }

    fly2(args, util) {
        var params = new Uint8Array(3);
        params[0] = 0x13;
        params[1] = args.POSITION;
        params[2] = args.SPEED;
        this.send(params);
    }

    stop(args, util) {
        var params = new Uint8Array(2);
        params[0] = 0x13;
        params[1] = 0x07;
        this.send(params);
    }

    info(args, util) {
        var params = new Uint8Array(1);
        params[0] = 0x0E;
        this.send(params);
    }

    headingangle(args, util) {
        return this._hangle;
    }

    rollangle(args, util) {
        return this._rangle;
    }

    pitchangle(args, util) {
        return this._pangle;
    }

    voltage(args, util) {
        return this._voltage;
    }

    height(args, util) {
        return this._height;
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

module.exports = Scratch3LiteBeeBlocks;
