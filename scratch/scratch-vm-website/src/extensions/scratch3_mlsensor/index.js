const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Clone = require('../../util/clone');
const Cast = require('../../util/cast');
const Color = require('../../util/color');
const formatMessage = require('format-message');
const MathUtil = require('../../util/math-util');

const MLSENSOR = require('../../io/mlsensor');
const Base64Util = require('../../util/base64-util');
//const WebSocket = require('../../util/ReconnectingWebSocket');

//const CRC = require('crc-full').CRC;
//var crc = new CRC("CRC16_XMODEM", 16, 0x1021, 0x0000, 0x0000, false, false);

/* Icon svg to be displayed at the left edge of each extension block, encoded as a data URI. */
const blockIconURI = 'data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI5MCIgaGVpZ2h0PSIzMCIgdmlld0JveD0iMCwwLDkwLDMwIj48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTk1LC0xNjUpIj48ZyBkYXRhLXBhcGVyLWRhdGE9InsmcXVvdDtpc1BhaW50aW5nTGF5ZXImcXVvdDs6dHJ1ZX0iIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0ibm9uemVybyIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjAuNSIgc3Ryb2tlLWxpbmVjYXA9ImJ1dHQiIHN0cm9rZS1saW5lam9pbj0ibWl0ZXIiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWRhc2hhcnJheT0iIiBzdHJva2UtZGFzaG9mZnNldD0iMCIgc3R5bGU9Im1peC1ibGVuZC1tb2RlOiBub3JtYWwiPjxpbWFnZSB4PSIzOTAiIHk9IjMzMCIgdHJhbnNmb3JtPSJzY2FsZSgwLjUsMC41KSIgd2lkdGg9IjE4MCIgaGVpZ2h0PSI2MCIgeGxpbms6aHJlZj0iZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFMUUFBQUE4Q0FZQUFBRFBMcENIQUFBSm0wbEVRVlI0WHUxZFM4aTNReFNmRVNWS1lTT1hYTXBYeUlaeVdRZ0xoYVVpUWxFU0ZncmhTeWtydWNUQ2dvMnlRSW15UkZsZzVWS1dMbEVvbDJ4UWlnMFovZWM1di9lYlo5NDVjODdNOC95djczazNUKy8vbWV0NWZ2T2JNMmZPblBHdThTK0U4QTlsK1phZW45UHo1Y1hUZS8rUnBzZ1F3cTJVN2dVaC9RMHQ1V3JxM29RMElZUlhxUjNYTSsyNW4vcjkrdUlaUXJpUzB0MUZ6NnZvZVFXbCsyRVQrclh1TnZqV0JoaWdXeVZXVG0rQW5rZU9lU2xxUUljUW5xUE1EekpOK1plWTRoaE5VME1JNzFDNjY1ajBnY283U2xQZXRxVlI5UDhSNnRNdjlIeU42ZU83SkNlTzZVZlpRZ2dmMHcrSFpwYlpOOVNPeTlOeWwxaGZ4SS8zL3ZhMFBnUDB6RjlWVzV3Qldpc3BOdDFrUUdOa1g4WlU4VWxwaEhMTkNTSDhTTzlPWjlMOFJPV2RNYm5yaWdKQ0NBOHJrczJaNUdwaGhvck02NXo3Z0o1UDBQTTRwaEhQMCsrLzB2TXRrdDlJdHc0aC9FYnZUNXF6TTg2NTM2bStrek9HWGxaOXhabXBoYUVOMFBNaXdBQTlUWjZUQVEzcnh0Rk1PN0RxQnVPZUtyVDNTWHJQbGZjVnZYOWxXci9kWjhRY1ZldExDQ0hxN0R2MEYzVnc3LzJ6SzJMTXJXTm9BL1Iyb2QwQVhmcGVpYjJZVzJYL1RVeHcvT0s1UkIydEYwNHFLNEF4OUo1NFlWM2g1TTNwOHEwTUhYSGpuRU41WEgzUE1DLzZWQTREZE84NFdudStYb2JlZVVCTGk4SEkzTEFIR2tPdkhjaG9RQmVndmZkVlEwSGwrN1l5ZERGOUxyM0t6Tm5OMEFib2pjRm9VME1NMEl3Ty9SLzl6bzNjczRtaG83MXpCeGxhcFlNM1FTMUpYR0VnRllPMTFxdjRQckIvYzBWZlF5OXk2MVFyUThlZFplZmMrMElmdUoza2JvWTJRQThxbFdwcnVRTmduTG5RQUQwSWN4NUFKODR6dHpFZktkcUp2ZmZudDN6RUVJSTBRRVk2ZVV2WlU5Skt1bHF5WTRjTmtTblZMZkkrVFFWOHlCVEVNUjU4YXVLT1lHNW5saHFsWUdpcENPNTlLMFAzMW9OOGJReHRnTjZUZDc0RmJZQXVRM0hqQVMzdHdUZnBsb212QkdkWGhKamlqcVBXcjNycU1FZCtCVU1qS1RjRnRqWUY1akZ1eDdUb3ZaaTQ3MEtIalVCeXpxbjh4Zzh5UXh1Z0I2RGtpeVFEOURZeGRBT1Q0a1BmUi8yN1VhQ29PK245ZVV3NkxJNGViYVU2WmZxcVQ4Y2FHZm93dGIvby9RYTdzRUlGVk0yWVNUa2pyemlsREd2SklnSG0vc2tUNnJ1VUtvdCsxczY1UDdMS294ZGl2b2JZWjRvelFPLzdac3RtYUFOMGVaak1CbWhKMVVEMStXSkowbzFuSUlGSlJWUVpUTUhRc0VwY01xa1ZSekpIZjJYbkhFN3VjRE1YL0p3Zm9QUTVDY0dlZXk0eDFsck9Ga3ErTU53T3BHTG1hYko2bFJqYUFEMUdMQWF1QWJveWtqY08wQTJxeGs0eGRIS2Ftck1IQTlBWTZITnRzTVJUM2M0NW5IN25GcHZ3U3F1ZVZQSGVQMVRDVzlLL1phMU56cUo2dVJrbXgwdmVUQ20vZGtjeEVzNGVReHVnblFHNlQ1ZVNBTGsyUUd0VmpWMWphSndsclByZEp0OTZick1kaW01ZGc2aTJ4anVJcWcvVzY4ODFPR09oSFIwRzk1MVlGQ28rK0xLdEhBYm9lUWJEQUdoRnZBMnVPcTNkVTJMK0xwK1FlV1FRdlFNUndZanpXVmtxb0dGSGxSWlZTWDlocjhjVy9FZzN6cDJvRkFOMkxsR3V1eHdEOU9JTEdLRFhqY1BaNnQ4RHRPVEEzOFhRSVFRc0ZyNFhtaHp0ck53cWZiYnVNZ1dGRUw0VVZ1bnd1ZURDRGxSMTJRcnpqaHp3RzFTK2tid0srV0FWZUlQNkZXTU9PdWZtdG5KY1MrVnFRMkZnWnZtVTh1VTdmMU0vOVdEbFNFSTFjUUZrRE5DREJBelFZeVJzTEtBNUhSSWppaHVCMHM2YnBKdENQTktoektranR4aEJDSVVXdk5meSt1S0pIT2ZjaS9UTXJSeVRHTm81aHgzREw2aDh6dDdNZWQ5eEJ3UlVheHl0Y0pPMTFoMlVoNHU4bExjbnh3L2V2MGZsRE15cWpGb3J0WGZCMEFib1FVcGN3QnNEOUxEV3dNR0NqUWMwZHFyeXVCdFkzVGNkZ1VtWVQ0b3VLZzIydWQ1emgwV2xhS3A1dkpHNSt3TWZqWHNFWnM3bGdJaFM4Tm5ndmsrMDJuanZZM3pwL0M4SlQ0RUlWNmRRR3V6NFhVai9uMFpQU1ZjRzg0NmlnVHJuUUpoU2Z1aitpRHVPL2lHMkg3cFE5WnBjTUxRQnVqeDBETkNEWExZTDBBbWpZb1RGS0tMT3ViZnAyUlM1Wm9zWStpK0JHVWZSVkJYaGIrZWFVYWFXTTlLMUZXYkozdnFBbDYrcGdPamo0cjNQbzUzQzJpVjVGZmEyQS9tR05ZTUIybkdMTUFOMEhXSWJEMmpzNkYxTS9jQUpsSjFpNkFhbUhaMXRWRndod1gxK1dBT2dJLzVKQ2VGRmw4Zkh4dThvanh0d1hIMGo2NFlpbEp2RWpBRHV6NVFRVGx5UGx4aFpMT3pJWFRHd2krUHVtTlorNWxVTjN5dGhhQVAwV0VRRzZFRWVXd3ZvT0ZKZ0QxVDRBTXhxNTFTTWJPaGlrcjBXUlZWOVJDbzdoRGhGSFdlcVhDZFV0Qk9NZ3pVSUdIcGtCWUQxSVduSG1WVDJCVmtkMnY2QzJXUCtnaTdiR3Y4YTZiVTdldHdkS3lCS1NYVEhVb0pXcGg3ZHhaTXl0QUY2a0tnQmVzek0yd25vZlBqTXhkQzV2Yk1qMHMrc3pGem9KMmRmemhjOVdMM2o4R1plRkU2Z1hFUXZ1TnZDUnQ1eXlZd1krOG5OQ0ludW4rdWM4UzRhNTV6cXZzSUdueEdKVWZQM1hLQ1oxcGxCVzI5ejVDU1Y0N3NVODgwQXZlLzdHS0Mxa0sybld4dWdjMy9vL0l4WWNTOC84ZGJUNnBCZGZ0V0ttUWk2S2U1bzRYYm1jdTg1YVdkeHBQTW0zeTdxMHJsdlE4TFF1Vk5RY1lCd1dEQ0dkcTdMYkFlQlZ0d2JFVWJWQUQxR253RmF4K0NyWmVpT0hTcm9nbTlTZjdRK0RsM01uQXc0NmI1RStMZ2cwcENLb1JYbGc2SHZwclR3cVFDQndHZmpYbnIvRkQwNU4xL3RHVVB1QkpIMnpoTXVBbGFyRHEyOTVZeTcwOFVBWFJyNGlndEFEZEJqd1IxWVFFdStFcnFKaFU5VnRidEtoU3ZpY1l6c200b2RSczZyRDFhYTc2aE5PTEZ4UzJyVlVCeTBnUGNqRjBFZlhaYjgxRG1HMWpJOHR6Wm9aV2pWUGtaRjUxODVReHVnQno5aUEzU1pYYllMMElrT0NiL2ptK2czN201dmlWVHo5NVBPSWlyT0V1WStFWkxWUW1MR29wMDVtU25nOTh2NURlTmtEL3lXbSt6Y2xVVTZYcGtPVFZObU5UUldjdExCQUYzZWtzWkdpUUc2VEdtYnNTaXMyRUh4QWVGdEplbUVFbk9EV2FMdlJCNmZPTStzMVoyZGMrZGtPcTdFMEtnS1crZFN1L0dlTzV1SDk5eFpRczQ2QXp2L1k5VCtkZC8xdlZzN2hSVkFHYUFINFJpZ3RVTi9uRzYxaThMV05pWTdkdkNKNk5XMXBiTjBtQ0Zlb2pibVVUT0xncHJCcjdoVkpFalBXVS9RRC9nbmoyNVVxUGlFU0pHc2V0dlphdVhvcmFkcXpXRVBMaXEyaEZXclZHMnJEZENzcEF6UVpkRnNOa01yVkJNcHNNbm95RlREUU1wMStuaG5USVhoZWlOTmFadFVaYUNDbktwZWVvWDBIRU5yL1o5UG9ESzFOOGx5T25SK2dvZVR6NG4wSWlkZkEzUkpZb1dBNEFibyt0QXpRTGRTVXkxOTRpTnljNVp1cFhlTUxDRXlQcGd6eHFLYks1SlFnYUV4d3h6SzNoVlBuQlR5STg1R2JxNXRQYkVTclVZS3F4VFgzbUwramRHaHRhQTNRR3NsVlU2WGJMRWZMRUJQRTl2cWNtTnJ1ZlhzMytwYWFEV3RVZ0pTZUtaVnRxV3JMZ04wbDloMk50UC81YVhIUE5LYjJUMEFBQUFBU1VWT1JLNUNZSUk9Ii8+PC9nPjwvZz48L3N2Zz4=';

/* Icon svg to be displayed in the category menu, encoded as a data URI. */
const menuIconURI = 'data:image/png;base64,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';

const MlSensor_Name = {
    'en': 'Deep Sensor',
    'zh-cn': '传感器',
};

const MlSensor_LedOn = {
    'en': 'LED On Port[PORT]',
    'zh-cn': '点亮LED灯 [PORT]',
};

const MlSensor_LedOff = {
    'en': 'LED Off Port[PORT]',
    'zh-cn': '熄灭LED灯 [PORT]',
};

const MlSensor_LedRGB = {
    'en': 'Setting Up RGB Light Port[PORT] Number[NUMBER] Red[R] Green[G] Blue[B]',
    'zh-cn': '设置RGB全彩灯 端口[PORT] 编号[NUMBER] 红[R] 绿[G] 蓝[B]',
};

const MlSensor_Display1 = {
    'en': 'Display Port[PORT] Display(XX:YY) [XX]:[YY]',
    'zh-cn': '显示屏 端口[PORT] 显示(XX:YY) [XX]:[YY]',
};

const MlSensor_Display2 = {
    'en': 'Display Port[PORT] Display(XXYY) [XX][YY]',
    'zh-cn': '显示屏 端口[PORT] 显示(XXYY) [XX][YY]',
};

const MlSensor_DHT = {
    'en': 'Read Temperature & Humidity Sensor Port[PORT]',
    'zh-cn': '读取温湿度传感器 端口[PORT]',
};

const MlSensor_DHTT = {
    'en': 'Temperature',
    'zh-cn': '温度',
};

const MlSensor_DHTH = {
    'en': 'Humidity',
    'zh-cn': '湿度',
};

const MlSensor_KEY = {
    'en': 'Read Key Press Sensor Port[PORT]',
    'zh-cn': '读取按键传感器 端口[PORT]',
};

const MlSensor_KEYV = {
    'en': 'Key Value',
    'zh-cn': '按键',
};

const MlSensor_TOUCH = {
    'en': 'Read Touch Sensor Port[PORT]',
    'zh-cn': '读取触碰传感器 端口[PORT]',
};

const MlSensor_TOUCHV = {
    'en': 'Touch Value',
    'zh-cn': '触碰',
};

const MlSensor_CTOUCH = {
    'en': 'Read Capacitive Touch Sensor Port[PORT]',
    'zh-cn': '读取电容触碰传感器 端口[PORT]',
};

const MlSensor_CTOUCHV = {
    'en': 'Capacitive Touch',
    'zh-cn': '电容触碰',
};

const MlSensor_ROTATE = {
    'en': 'Read Rotation Sensor Port[PORT]',
    'zh-cn': '读取旋转传感器 端口[PORT]',
};

const MlSensor_ROTATEV = {
    'en': 'Rotation Value',
    'zh-cn': '旋转',
};

const MlSensor_PHOTO = {
    'en': 'Read Photosensitive Sensor Port[PORT]',
    'zh-cn': '读取光敏传感器 端口[PORT]',
};

const MlSensor_PHOTOD = {
    'en': 'Light Value',
    'zh-cn': '光值',
};

const MlSensor_PHOTOB = {
    'en': 'Has Light',
    'zh-cn': '有光',
};

const MlSensor_SOUND = {
    'en': 'Read Sound Sensor Port[PORT]',
    'zh-cn': '读取声音传感器 端口[PORT]',
};

const MlSensor_SOUNDD = {
    'en': 'Sound Volume',
    'zh-cn': '音量',
};

const MlSensor_SOUNDB = {
    'en': 'Has Sound',
    'zh-cn': '有声',
};

const MlSensor_AVOID = {
    'en': 'Read Obstacle Avoiding Sensor Port[PORT]',
    'zh-cn': '读取红外避障传感器 端口[PORT]',
};

const MlSensor_AVOIDV = {
    'en': 'Has Obstacle',
    'zh-cn': '障碍',
};

const MlSensor_SONAR = {
    'en': 'Read Sonar Sensor Port[PORT]',
    'zh-cn': '读取超声波传感器 端口[PORT]',
};

const MlSensor_SONARV = {
    'en': 'Distance Value',
    'zh-cn': '距离',
};

const MlSensor_ROCKER = {
    'en': 'Read Rocker Sensor Port[PORT]',
    'zh-cn': '读取摇杆传感器 端口[PORT]',
};

const MlSensor_ROCKERX = {
    'en': 'X Coordinate',
    'zh-cn': 'X坐标',
};

const MlSensor_ROCKERY = {
    'en': 'Y Coordinate',
    'zh-cn': 'Y坐标',
};

const MlSensor_ROCKERB = {
    'en': 'Is Rocker Pressed',
    'zh-cn': '摇杆被按下',
};

const MlSensor_MOTORS = {
    'en': 'Stop Motor Control Port[PORT] Number[NUMBER]',
    'zh-cn': '停止直流电机控制器 端口[PORT] 编号[NUMBER]',
};

const MlSensor_MOTORP = {
    'en': 'Rotate Motor Positive Port[PORT] Number[NUMBER]',
    'zh-cn': '正转直流电机控制器 端口[PORT] 编号[NUMBER] 速度[SPEED]',
};

const MlSensor_MOTORN = {
    'en': 'Rotate Motor Negative Port[PORT] Number[NUMBER]',
    'zh-cn': '反转直流电机控制器 端口[PORT] 编号[NUMBER] 速度[SPEED]',
};

const MlSensor_BUZZERS = {
    'en': 'Stop Buzzer Port[PORT]',
    'zh-cn': '音乐蜂鸣器停止 端口[PORT]',
};

const MlSensor_BUZZERA = {
    'en': 'Buzzer Alarm Port[PORT] HZ[HZ]',
    'zh-cn': '音乐蜂鸣器报警 端口[PORT] 赫兹[HZ]',
};

const MlSensor_BUZZERM = {
    'en': 'Buzzer Music Port[PORT] Tone[TONE] Freq[FREQ]',
    'zh-cn': '音乐蜂鸣器演奏 端口[PORT] 音调[TONE] 节拍[FREQ]',
};


const CubicPorts   = ['端口1', '端口2', '端口3', '端口4', '端口5', '端口6'];
const CubicLights  = ['全部', '第1个', '第2个', '第3个'];
const CubicTones   = ['do', 're', 'mi', 'fa', 'so', 'la', 'xi', 'do-', 're-', 'mi-', 'fa-', 'so-', 'la-', 'xi-', 'do+', 're+', 'mi+', 'fa+', 'so+', 'la+', 'xi+'];
const CubicFreqs   = ['1', '2', '3', '4', '1/2', '3/2', '1/4', '3/4'];
const CubicMotors  = ['编号1', '编号2'];


/**
 * Class for the "Cubic" extension's blocks in Scratch 3.0
 * @param {Runtime} runtime - the runtime instantiating this block package.
 * @constructor
 */
class Scratch3CubicBlocks {

    constructor (runtime) {
        this._runtime = runtime;
        this.locale = this._setLocale();
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
        this._mlsensor = null;
        this._runtime.registerPeripheralExtension('mlsensor', this);
        console.log("After registering to runtime...");

        this.reset = this.reset.bind(this);
        this._onConnect = this._onConnect.bind(this);
        this._onMessage = this._onMessage.bind(this);
        //this._pollValues = this._pollValues.bind(this);

        this.dhtRead = false;
        this.dhttValue = 0;
        this.dhthValue = 0;
        this.keyRead = false;
        this.keyValue = 7;
        this.touchRead = false;
        this.touchValue = 0x01;
        this.ctouchRead = false;
        this.ctouchValue = 0x00;
        this.rotateRead = false;
        this.rotateValue = 0x00;
        this.lightRead = false;
        this.lightdValue = 0x00;			//十进制值
        this.lightbValue = 0x01;			//二进制值
        this.soundRead = false;
        this.sounddValue = 0x00;
        this.soundbValue = 0x00;
        this.avoidRead = false;
        this.avoidValue = 0x01;
        this.sonarRead = false;
        this.sonarValue = 1000;
        this.rockerRead = false;
        this.rockerxValue = 0;
        this.rockeryValue = 0;
        this.rockerbValue = false;			//二进制值，摇杆是否被按下
    }

    /**
     * Called by the runtime when user wants to scan for an EV3 peripheral.
     */
    scan () {
        console.log("Entering scan...");
        if (this._mlsensor) {
            this._mlsensor.disconnect();
        }
        this._mlsensor = new MLSENSOR(this._runtime, 'mlsensor', {
        }, this._onConnect, this.reset, this._onMessage);
    }

    /**
     * Called by the runtime when user wants to connect to a certain EV3 peripheral.
     * @param {number} id - the id of the peripheral to connect to.
     */
    connect (id) {
        console.log("Entering connect...");
        console.log(id);
        if (this._mlsensor) {
            this._mlsensor.connectPeripheral(id);
        }
    }

    /**
     * Called by the runtime when user wants to disconnect from the EV3 peripheral.
     */
    disconnect () {
        console.log("Entering disconnect...")
        if (this._mlsensor) {
            this._mlsensor.disconnect();
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
        if (this._mlsensor) {
            connected = this._mlsensor.isConnected();
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
            this.dhttValue = parseInt(data[1]);
            this.dhthValue = parseInt(data[2]);
            this.dhtRead = true;
            console.log("temperature: " + this.dhttValue + ", humidity: " + this.dhthValue);
        }
        if (data[0] == 0x06) {
            this.keyValue = parseInt(data[1]);
            this.keyRead = true;
            console.log("key: " + this.keyValue);
        }
        if (data[0] == 0x07) {
            this.touchValue = parseInt(data[1]);
            this.touchRead = true;
            console.log("touch: " + this.touchValue);
        }
        if (data[0] == 0x08) {
            this.ctouchValue = parseInt(data[1]);
            this.ctouchRead = true;
            console.log("ctouch: " + this.ctouchValue);
        }
        if (data[0] == 0x09) {
            this.rotateValue = parseInt(data[2]) * 128 + parseInt(data[1]);
            this.rotateRead = true;
            console.log("rotate: " + this.rotateValue);
        }
        if (data[0] == 0x0A) {
            if (data.length == 3) {
                this.lightdValue = parseInt(data[2]) * 128 + parseInt(data[1]);
            } else if (data.length == 2) {
                this.lightbValue = parseInt(data[1]);
            }
            this.lightRead = true;
            console.log("light: " + this.lightdValue + ', ' + this.lightbValue);
        }
        if (data[0] == 0x0B) {
            if (data.length == 3) {
                this.sounddValue = parseInt(data[2]) * 128 + parseInt(data[1]);
            } else if (data.length == 2) {
                this.soundbValue = parseInt(data[1]);
            }
            this.soundRead = true;
            console.log("sound: " + this.sounddValue + ', ' + this.soundbValue);
        }
        if (data[0] == 0x0C) {
            this.avoidValue = parseInt(data[1]);
            this.avoidRead = true;
            console.log("avoid: " + this.avoidValue);
        }
        if (data[0] == 0x0D) {
            this.sonarValue = (parseInt(data[3]) * 16384 + parseInt(data[2]) * 128 + parseInt(data[1])) / 1000;
            this.sonarRead = true;
            console.log("sonar: " + this.sonarValue);
        }
        if (data[0] == 0x0E) {							//aoqingy
            this.rockerxValue = parseInt(data[1]);
            if (data[2] == 0x00) {
                this.rockerxValue = -this.rockerxValue;
            }
            this.rockeryValue = parseInt(data[3]);
            if (data[4] == 0x00) {
                this.rockeryValue = -this.rockeryValue;
            }
            if (data[5] == 0x00 && data[6] == 0x00) {
                this.rockerbValue = true;
            } else {
                this.rockerbValue = false;
            }
            this.rockerRead = true;
            console.log("rocker: " + this.rockerxValue + ', ' + this.rockeryValue + ', ' + this.rockerbValue);
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
        return this._mlsensor.sendMessage({
            message: Base64Util.uint8ArrayToBase64(message),
            encoding: 'base64'
        });
    }

    _setLocale () {
        let now_locale = '';
        switch (formatMessage.setup().locale){
        case 'en':
            now_locale='en';
            break;
        case 'zh-cn':
            now_locale= 'zh-cn';
            break;
        default:
            now_locale='en';
            break;
        }
        return now_locale;
    }

    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo () {
        return {
            id: 'mlsensor',
            name: MlSensor_Name[this.locale],
            menuIconURI: menuIconURI,
            blockIconURI: blockIconURI,
            showStatusButton: true,
            blocks: [
                {
                    opcode: 'ledon',
                    blockType: BlockType.COMMAND,
                    text: MlSensor_LedOn[this.locale],
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
                    text: MlSensor_LedOff[this.locale],
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
                    text: MlSensor_LedRGB[this.locale],
                    arguments: {
                        PORT: {
                            type: ArgumentType.NUMBER,
                            menu: 'cubicPorts',
                            defaultValue: 0,
                        },
                        NUMBER: {
                            type: ArgumentType.NUMBER,
                            menu: 'cubicLights',
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
                    text: MlSensor_Display1[this.locale],
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
                    text: MlSensor_Display2[this.locale],
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
                    opcode: 'dht',
                    blockType: BlockType.COMMAND,
                    text: MlSensor_DHT[this.locale],
                    arguments: {
                        PORT: {
                            type: ArgumentType.NUMBER,
                            menu: 'cubicPorts',
                            defaultValue: 0,
                        },
                    }
                },
                {
                    opcode: 'dhtt',
                    blockType: BlockType.REPORTER,
                    text: MlSensor_DHTT[this.locale],
                },
                {
                    opcode: 'dhth',
                    blockType: BlockType.REPORTER,
                    text: MlSensor_DHTH[this.locale],
                },
                {
                    opcode: 'key',
                    blockType: BlockType.COMMAND,
                    text: MlSensor_KEY[this.locale],
                    arguments: {
                        PORT: {
                            type: ArgumentType.NUMBER,
                            menu: 'cubicPorts',
                            defaultValue: 0,
                        },
                    }
                },
                {
                    opcode: 'keyv',
                    blockType: BlockType.REPORTER,
                    text: MlSensor_KEYV[this.locale],
                },
                {
                    opcode: 'touch',
                    blockType: BlockType.COMMAND,
                    text: MlSensor_TOUCH[this.locale],
                    arguments: {
                        PORT: {
                            type: ArgumentType.NUMBER,
                            menu: 'cubicPorts',
                            defaultValue: 0,
                        },
                    }
                },
                {
                    opcode: 'touchv',
                    blockType: BlockType.REPORTER,
                    text: MlSensor_TOUCHV[this.locale],
                },
                {
                    opcode: 'ctouch',
                    blockType: BlockType.COMMAND,
                    text: MlSensor_CTOUCH[this.locale],
                    arguments: {
                        PORT: {
                            type: ArgumentType.NUMBER,
                            menu: 'cubicPorts',
                            defaultValue: 0,
                        },
                    }
                },
                {
                    opcode: 'ctouchv',
                    blockType: BlockType.REPORTER,
                    text: MlSensor_CTOUCHV[this.locale],
                },
                {
                    opcode: 'rotate',
                    blockType: BlockType.COMMAND,
                    text: MlSensor_ROTATE[this.locale],
                    arguments: {
                        PORT: {
                            type: ArgumentType.NUMBER,
                            menu: 'cubicPorts',
                            defaultValue: 0,
                        },
                    }
                },
                {
                    opcode: 'rotatev',
                    blockType: BlockType.REPORTER,
                    text: MlSensor_ROTATEV[this.locale],
                },
                {
                    opcode: 'light',
                    blockType: BlockType.COMMAND,
                    text: MlSensor_PHOTO[this.locale],
                    arguments: {
                        PORT: {
                            type: ArgumentType.NUMBER,
                            menu: 'cubicPorts',
                            defaultValue: 0,
                        },
                    }
                },
                {
                    opcode: 'lightd',
                    blockType: BlockType.REPORTER,
                    text: MlSensor_PHOTOD[this.locale],
                },
                {
                    opcode: 'lightb',
                    blockType: BlockType.REPORTER,
                    text: MlSensor_PHOTOB[this.locale],
                },
                {
                    opcode: 'sound',
                    blockType: BlockType.COMMAND,
                    text: MlSensor_SOUND[this.locale],
                    arguments: {
                        PORT: {
                            type: ArgumentType.NUMBER,
                            menu: 'cubicPorts',
                            defaultValue: 0,
                        },
                    }
                },
                {
                    opcode: 'soundd',
                    blockType: BlockType.REPORTER,
                    text: MlSensor_SOUNDD[this.locale],
                },
                {
                    opcode: 'soundb',
                    blockType: BlockType.REPORTER,
                    text: MlSensor_SOUNDB[this.locale],
                },
                {
                    opcode: 'avoid',
                    blockType: BlockType.COMMAND,
                    text: MlSensor_AVOID[this.locale],
                    arguments: {
                        PORT: {
                            type: ArgumentType.NUMBER,
                            menu: 'cubicPorts',
                            defaultValue: 0,
                        },
                    }
                },
                {
                    opcode: 'avoidv',
                    blockType: BlockType.REPORTER,
                    text: MlSensor_AVOIDV[this.locale],
                },
                {
                    opcode: 'sonar',
                    blockType: BlockType.COMMAND,
                    text: MlSensor_SONAR[this.locale],
                    arguments: {
                        PORT: {
                            type: ArgumentType.NUMBER,
                            menu: 'cubicPorts',
                            defaultValue: 0,
                        },
                    }
                },
                {
                    opcode: 'sonarv',
                    blockType: BlockType.REPORTER,
                    text: MlSensor_SONARV[this.locale],
                },
                {
                    opcode: 'rocker',
                    blockType: BlockType.COMMAND,
                    text: MlSensor_ROCKER[this.locale],
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
                    text: MlSensor_ROCKERX[this.locale],
                },
                {
                    opcode: 'rockery',
                    blockType: BlockType.REPORTER,
                    text: MlSensor_ROCKERY[this.locale],
                },
                {
                    opcode: 'rockerb',
                    blockType: BlockType.REPORTER,
                    text: MlSensor_ROCKERB[this.locale],
                },
                '---',
                {
                    opcode: 'buzzera',
                    blockType: BlockType.COMMAND,
                    text: MlSensor_BUZZERA[this.locale],
                    arguments: {
                        PORT: {
                            type: ArgumentType.NUMBER,
                            menu: 'cubicPorts',
                            defaultValue: 0,
                        },
                        HZ: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 2000,
                        },
                    }
                },
                {
                    opcode: 'buzzerm',
                    blockType: BlockType.COMMAND,
                    text: MlSensor_BUZZERM[this.locale],
                    arguments: {
                        PORT: {
                            type: ArgumentType.NUMBER,
                            menu: 'cubicPorts',
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
                    opcode: 'buzzers',
                    blockType: BlockType.COMMAND,
                    text: MlSensor_BUZZERS[this.locale],
                    arguments: {
                        PORT: {
                            type: ArgumentType.NUMBER,
                            menu: 'cubicPorts',
                            defaultValue: 0,
                        },
                    }
                },
                '---',
                {
                    opcode: 'motorp',
                    blockType: BlockType.COMMAND,
                    text: MlSensor_MOTORP[this.locale],
                    arguments: {
                        PORT: {
                            type: ArgumentType.NUMBER,
                            menu: 'cubicPorts',
                            defaultValue: 0,
                        },
                        NUMBER: {
                            type: ArgumentType.NUMBER,
                            menu: 'cubicMotors',
                            defaultValue: 0,
                        },
                        SPEED: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 100,
                        },
                    }
                },
                {
                    opcode: 'motorn',
                    blockType: BlockType.COMMAND,
                    text: MlSensor_MOTORN[this.locale],
                    arguments: {
                        PORT: {
                            type: ArgumentType.NUMBER,
                            menu: 'cubicPorts',
                            defaultValue: 0,
                        },
                        NUMBER: {
                            type: ArgumentType.NUMBER,
                            menu: 'cubicMotors',
                            defaultValue: 0,
                        },
                        SPEED: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 100,
                        },
                    }
                },
                {
                    opcode: 'motors',
                    blockType: BlockType.COMMAND,
                    text: MlSensor_MOTORS[this.locale],
                    arguments: {
                        PORT: {
                            type: ArgumentType.NUMBER,
                            menu: 'cubicPorts',
                            defaultValue: 0,
                        },
                        NUMBER: {
                            type: ArgumentType.NUMBER,
                            menu: 'cubicMotors',
                            defaultValue: 0,
                        },
                    }
                },
           ],
            
            menus: {
                cubicPorts: {
                    acceptReporters: false,
                    items: this._formatMenu(CubicPorts)
                },
                cubicLights: {
                    acceptReporters: false,
                    items: this._formatMenu(CubicLights)
                },
                cubicTones: {
                    acceptReporters: false,
                    items: this._formatMenu(CubicTones)
                },
                cubicFreqs: {
                    acceptReporters: false,
                    items: this._formatMenu(CubicFreqs)
                },
                cubicMotors: {
                    acceptReporters: false,
                    items: this._formatMenu(CubicMotors)
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

    dht(args, util) {
        if (util.stackTimerNeedsInit()) {
            util.startStackTimer(1000);

            var params = new Uint8Array(2);
            params[0] = 0x05;
            params[1] = parseInt(args.PORT);
            this.dhtRead = false;
            this.send(params);

            util.yield();
        } else if (!util.stackTimerFinished() && !this.dhtRead) {
            util.yield();
        }
    }

    dhtt(args, util) {
        return this.dhttValue;
    }

    dhth(args, util) {
        return this.dhthValue;
    }

    key(args, util) {
        if (util.stackTimerNeedsInit()) {
            util.startStackTimer(1000);

            var params = new Uint8Array(2);
            params[0] = 0x06;
            params[1] = parseInt(args.PORT);
            this.keyRead = false;
            this.send(params);

            //this._runtime.requestRedraw();
            util.yield();
        } else if (!util.stackTimerFinished() && !this.keyRead) {
            util.yield();
        }
    }

    keyv(args, util) {
        return this.keyValue;
    }

    touch(args, util) {
        if (util.stackTimerNeedsInit()) {
            util.startStackTimer(1000);

            var params = new Uint8Array(2);
            params[0] = 0x07;
            params[1] = parseInt(args.PORT);
            this.touchRead = false;
            this.send(params);
 
            //this._runtime.requestRedraw();
            util.yield();
        } else if (!util.stackTimerFinished() && !this.touchRead) {
            util.yield();
        }
   }

    touchv(args, util) {
        if (this.touchValue == 0x00){
            return true;
        } else {
            return false;
        }
    }

    ctouch(args, util) {
        if (util.stackTimerNeedsInit()) {
            util.startStackTimer(1000);

            var params = new Uint8Array(2);
            params[0] = 0x08;
            params[1] = parseInt(args.PORT);
            this.ctouchRead = false;
            this.send(params);

            //this._runtime.requestRedraw();
            util.yield();
        } else if (!util.stackTimerFinished() && !this.ctouchRead) {
            util.yield();
        }
    }

    ctouchv(args, util) {
        if (this.ctouchValue == 0x01){
            return true;
        } else {
            return false;
        }
    }

    rotate(args, util) {
        if (util.stackTimerNeedsInit()) {
            util.startStackTimer(1000);

            var params = new Uint8Array(2);
            params[0] = 0x09;
            params[1] = parseInt(args.PORT);
            this.rotateRead = false;
            this.send(params);

            //this._runtime.requestRedraw();
            util.yield();
        } else if (!util.stackTimerFinished() && !this.rotateRead) {
            util.yield();
        }
    }

    rotatev(args, util) {
        return this.rotateValue;
    }

    light(args, util) {
        if (util.stackTimerNeedsInit()) {
            util.startStackTimer(1000);

            var params = new Uint8Array(2);
            params[0] = 0x0A;
            params[1] = parseInt(args.PORT);
            this.lightRead = false;
            this.send(params);

            //this._runtime.requestRedraw();
            util.yield();
        } else if (!util.stackTimerFinished() && !this.lightRead) {
            util.yield();
        }
    }

    lightd(args, util) {
        return this.lightdValue;
    }

    lightb(args, util) {
        if (this.lightbValue == 0x00) {
            return true;
        } else {
            return false;
        }
    }

    sound(args, util) {
        if (util.stackTimerNeedsInit()) {
            util.startStackTimer(1000);

            var params = new Uint8Array(2);
            params[0] = 0x0B;
            params[1] = parseInt(args.PORT);
            this.soundRead = false;
            this.send(params);

            //this._runtime.requestRedraw();
            util.yield();
        } else if (!util.stackTimerFinished() && !this.soundRead) {
            util.yield();
        }
    }

    soundd(args, util) {
        return this.sounddValue;
    }

    soundb(args, util) {
        if (this.soundbValue == 0x00) {
            return false;
        } else {
            return true;
        }
    }

    avoid(args, util) {
        if (util.stackTimerNeedsInit()) {
            util.startStackTimer(1000);

            var params = new Uint8Array(2);
            params[0] = 0x0C;
            params[1] = parseInt(args.PORT);
            this.avoidRead = false;
            this.send(params);

            //this._runtime.requestRedraw();
            util.yield();
        } else if (!util.stackTimerFinished() && !this.avoidRead) {
            util.yield();
        }
    }

    avoidv(args, util) {
        if (this.avoidValue == 0x00) {
            return true;
        } else {
            return false;
        }
    }

    sonar(args, util) {
        if (util.stackTimerNeedsInit()) {
            util.startStackTimer(1000);

            var params = new Uint8Array(2);
            params[0] = 0x0D;
            params[1] = parseInt(args.PORT);
            this.sonarRead = false;
            this.send(params);

            //this._runtime.requestRedraw();
            util.yield();
        } else if (!util.stackTimerFinished() && !this.sonarRead) {
            util.yield();
        }
    }

    sonarv(args, util) {
        return this.sonarValue;
    }

    rocker(args, util) {
        if (util.stackTimerNeedsInit()) {
            util.startStackTimer(1000);

            var params = new Uint8Array(2);
            params[0] = 0x0E;
            params[1] = parseInt(args.PORT);
            this.rockerRead = false;
            this.send(params);

            //this._runtime.requestRedraw();
            util.yield();
        } else if (!util.stackTimerFinished() && !this.rockerRead) {
            util.yield();
        }
    }

    rockerx(args, util) {
        return this.rockerxValue;
    }

    rockery(args, util) {
        return this.rockeryValue;
    }

    rockerb(args, util) {
        return this.rockerbValue;
    }

    buzzers(args, util) {
        var params = new Uint8Array(3);
        params[0] = 0x0F;
        params[1] = parseInt(args.PORT);
        params[2] = 0x00;
        this.send(params);
    }

    buzzera(args, util) {
        var params = new Uint8Array(5);
        params[0] = 0x0F;
        params[1] = parseInt(args.PORT);
        params[2] = 0x01;
        params[3] = parseInt(args.HZ%256);
        params[4] = parseInt(args.HZ/256)
        this.send(params);
    }

    buzzerm(args, util) {
        var params = new Uint8Array(5);
        params[0] = 0x0F;
        params[1] = parseInt(args.PORT);
        params[2] = 0x02;
        params[3] = parseInt(args.TONE);
        params[4] = parseInt(args.FREQ);
        this.send(params);
    }

    motors(args, util) {
        var params = new Uint8Array(4);
        params[0] = 0x10;
        params[1] = parseInt(args.PORT);
        params[2] = parseInt(args.NUMBER);
        params[3] = 0x00;
        this.send(params);
    }

    motorp(args, util) {
        var params = new Uint8Array(5);
        params[0] = 0x10;
        params[1] = parseInt(args.PORT);
        params[2] = parseInt(args.NUMBER);
        params[3] = 0x01;
        params[4] = parseInt(args.SPEED);
        this.send(params);
    }

    motorn(args, util) {
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
