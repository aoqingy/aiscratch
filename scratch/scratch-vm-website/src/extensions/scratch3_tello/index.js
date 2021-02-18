const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Clone = require('../../util/clone');
const Cast = require('../../util/cast');
const Color = require('../../util/color');
const formatMessage = require('format-message');
const MathUtil = require('../../util/math-util');

const TELLO = require('../../io/tello');
const Base64Util = require('../../util/base64-util');
//const WebSocket = require('../../util/ReconnectingWebSocket');

//const CRC = require('crc-full').CRC;
//var crc = new CRC("CRC16_XMODEM", 16, 0x1021, 0x0000, 0x0000, false, false);

/* Icon svg to be displayed at the left edge of each extension block, encoded as a data URI. */
const blockIconURI = 'data:image/png;base64,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';
/* Icon svg to be displayed in the category menu, encoded as a data URI. */
const menuIconURI = blockIconURI;

const MotorNumbers = ['M1', 'M2', 'M3', 'M4', 'M5', 'M6', 'M7', 'M8'];
const MotorSpeeds = ['0', '30', '60', '90'];
const FlyingOrientations = ['顺时针', '逆时针'];
const FlyingAngles = ['0', '30', '60', '90'];
const FlyingDistances = ['50', '100', '150', '200', '250'];
const FlyingSpeeds = ['20', '40', '60', '80', '100'];
const FlyingPositions = ['前', '后', '左', '右', '上', '下'];

/**
 * Class for the "TELLO" extension's blocks in Scratch 3.0
 * @param {Runtime} runtime - the runtime instantiating this block package.
 * @constructor
 */
class Scratch3TelloBlocks {

    constructor (runtime) {
        this._runtime = runtime;

        console.log("Before registering to runtime...");
        this._tello = null;
        this._runtime.registerPeripheralExtension('Tello', this);
        console.log("After registering to runtime...");

        this.reset = this.reset.bind(this);
        this._onConnect = this._onConnect.bind(this);
        this._onMessage = this._onMessage.bind(this);
        console.log("Tello constructor done!");
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
        if (this._tello) {
            this._tello.disconnect();
        }
        this._tello = new TELLO(this._runtime, 'Tello', {
        }, this._onConnect, this.reset, this._onMessage);
    }

    /**
     * Called by the runtime when user wants to connect to a certain EV3 peripheral.
     * @param {number} id - the id of the peripheral to connect to.
     */
    connect (id) {
        console.log("Entering connect...");
        console.log(id);
        if (this._tello) {
            this._tello.connectPeripheral(id);
        }
    }

    /**
     * Called by the runtime when user wants to disconnect from the EV3 peripheral.
     */
    disconnect () {
        console.log("Entering disconnect...")
        if (this._tello) {
            this._tello.disconnect();
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
        if (this._tello) {
            connected = this._tello.isConnected();
        }
        console.log(connected);
        return connected;
    }

    /**
     * When the Tello peripheral connects, start polling for sensor and motor values.
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
	
	unsignToSign(num) {
		if (num > 0xffff/2) {
			var a = ~0xffff;
			num = num | a;
		}
		return num;
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
        this._height  = this.unsignToSign(parseInt(data[1]) * 256 + parseInt(data[0]));	//高度
        this._rangle  = this.unsignToSign(parseInt(data[3]) * 256 + parseInt(data[2]));	//横滚角
        this._pangle  = this.unsignToSign(parseInt(data[5]) * 256 + parseInt(data[4]));	//俯仰角
        this._hangle  = this.unsignToSign(parseInt(data[7]) * 256 + parseInt(data[6]));	//航向角
        this._voltage = this.unsignToSign(parseInt(data[9]) * 256 + parseInt(data[8]));	//飞行电压
    }

    /**
     * Send a message to the peripheral BT socket.
     * @param {Uint8Array} message - the message to send.
     * @param {boolean} [useLimiter=true] - if true, use the rate limiter
     * @return {Promise} - a promise result of the send operation.
     */
    send (message) {
        if (!this.isConnected()) return Promise.resolve();
        return this._tello.sendMessage({
            message: Base64Util.uint8ArrayToBase64(message),
            encoding: 'base64'
        });
    }

    /**
     * @returns {object} metadata for this extension and its blocks.
     */
    getInfo () {
        return {
            id: 'Tello',
            name: formatMessage({
                id: 'Tello',
                default: 'Tello',
                description: 'Tello extension'
            }),
            menuIconURI: menuIconURI,
            blockIconURI: blockIconURI,
            showStatusButton: true,
            blocks: [
                {
                    opcode: 'takeoff',
                    blockType: BlockType.COMMAND,
                    text: '起飞'
                },
                {
                    opcode: 'land',
                    blockType: BlockType.COMMAND,                    
                    text: '降落'
                },
                {
                    opcode: 'up',
                    blockType: BlockType.COMMAND,
                    text: '向上飞行 距离[DISTANCE]',
                    arguments: {
                        DISTANCE: {
                            type: ArgumentType.NUMBER,
                            menu: 'FlyingDistances',
                            defaultValue: 0,
                        },
                    }
                },
                {
                    opcode: 'down',
                    blockType: BlockType.COMMAND,
                    text: '向下飞行 距离[DISTANCE]',
                    arguments: {
                        DISTANCE: {
                            type: ArgumentType.NUMBER,
                            menu: 'FlyingDistances',
                            defaultValue: 0,
                        },
                    }
                },
                {
                    opcode: 'left',
                    blockType: BlockType.COMMAND,
                    text: '向左飞行 距离[DISTANCE]',
                    arguments: {
                        DISTANCE: {
                            type: ArgumentType.NUMBER,
                            menu: 'FlyingDistances',
                            defaultValue: 0,
                        },
                    }
                },
                {
                    opcode: 'right',
                    blockType: BlockType.COMMAND,
                    text: '向右飞行 距离[DISTANCE]',
                    arguments: {
                        DISTANCE: {
                            type: ArgumentType.NUMBER,
                            menu: 'FlyingDistances',
                            defaultValue: 0,
                        },
                    }
                },
                {
                    opcode: 'forward',
                    blockType: BlockType.COMMAND,
                    text: '向前飞行 距离[DISTANCE]',
                    arguments: {
                        DISTANCE: {
                            type: ArgumentType.NUMBER,
                            menu: 'FlyingDistances',
                            defaultValue: 0,
                        },
                    }
                },
                {
                    opcode: 'back',
                    blockType: BlockType.COMMAND,
                    text: '向后飞行 距离[DISTANCE]',
                    arguments: {
                        DISTANCE: {
                            type: ArgumentType.NUMBER,
                            menu: 'FlyingDistances',
                            defaultValue: 0,
                        },
                    }
                },
                {
                    opcode: 'cw',
                    blockType: BlockType.COMMAND,
                    text: '顺时针旋转 角度[ANGLE]',
                    arguments: {
                        ANGLE: {
                            type: ArgumentType.NUMBER,
                            menu: 'flyingAngles',
                            defaultValue: 0,
                        },
                    }
                },
                {
                    opcode: 'ccw',
                    blockType: BlockType.COMMAND,
                    text: '逆时针旋转 角度[ANGLE]',
                    arguments: {
                        ANGLE: {
                            type: ArgumentType.NUMBER,
                            menu: 'flyingAngles',
                            defaultValue: 0,
                        },
                    }
                },
				{
                    opcode: 'speed',
                    blockType: BlockType.COMMAND,
                    text: '飞行速度[SPEED]',
                    arguments: {
                        SPEED: {
                            type: ArgumentType.NUMBER,
                            menu: 'flyingSpeeds',
                            defaultValue: 0,
                        },
                    }
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
                FlyingDistances: {
                    acceptReporters: false,
                    items: this._formatMenu(FlyingDistances)
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

    takeoff(args, util) {
        var params = new Uint8Array(1);
        params[0] = 0x01;
        this.send(params);
    }

    land(args, util) {
        var params = new Uint8Array(1);
        params[0] = 0x02;
        this.send(params);
    }

    up(args, util) {
        var params = new Uint8Array(2);
        params[0] = 0x03;
        params[1] = FlyingDistances[args.DISTANCE];
        this.send(params);
    }
	
    down(args, util) {
        var params = new Uint8Array(2);
        params[0] = 0x04;
        params[1] = FlyingDistances[args.DISTANCE];
        this.send(params);
    }

    left(args, util) {
        var params = new Uint8Array(2);
        params[0] = 0x05;
        params[1] = FlyingDistances[args.DISTANCE];
        this.send(params);
    }
	
    right(args, util) {
        var params = new Uint8Array(2);
        params[0] = 0x06;
        params[1] = FlyingDistances[args.DISTANCE];
        this.send(params);
    }

    forward(args, util) {
        var params = new Uint8Array(2);
        params[0] = 0x07;
        params[1] = FlyingDistances[args.DISTANCE];
        this.send(params);
    }
	
    back(args, util) {
        var params = new Uint8Array(2);
        params[0] = 0x08;
        params[1] = FlyingDistances[args.DISTANCE];
        this.send(params);
    }

    cw(args, util) {
        var params = new Uint8Array(2);
        params[0] = 0x9;
        params[1] = FlyingAngles[args.ANGLE];
        this.send(params);
    }
	
    ccw(args, util) {
        var params = new Uint8Array(2);
        params[0] = 0x10;
        params[1] = FlyingAngles[args.ANGLE];
        this.send(params);
    }

    speed(args, util) {
        var params = new Uint8Array(2);
        params[0] = 0x11;
        params[1] = FlyingSpeeds[args.SPEED];
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

module.exports = Scratch3TelloBlocks;
