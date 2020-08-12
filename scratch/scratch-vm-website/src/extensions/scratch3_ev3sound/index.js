// create by scratch3-extension generator
const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Base64Util = require('../../util/base64-util');
const {loadCostume} = require('../../import/load-costume.js');
const Cast = require('../../util/cast');
const log = require('../../util/log');
const formatMessage = require('format-message');
const SvgRenderer = require('scratch-svg-renderer');


const menuIconURI = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNDBweCIgaGVpZ2h0PSI0MHB4IiB2aWV3Qm94PSIwIDAgNDAgNDAiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8IS0tIEdlbmVyYXRvcjogU2tldGNoIDUwLjIgKDU1MDQ3KSAtIGh0dHA6Ly93d3cuYm9oZW1pYW5jb2RpbmcuY29tL3NrZXRjaCAtLT4KICAgIDx0aXRsZT5ldjMtYmxvY2staWNvbjwvdGl0bGU+CiAgICA8ZGVzYz5DcmVhdGVkIHdpdGggU2tldGNoLjwvZGVzYz4KICAgIDxkZWZzPjwvZGVmcz4KICAgIDxnIGlkPSJldjMtYmxvY2staWNvbiIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGcgaWQ9ImV2MyIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNS41MDAwMDAsIDMuNTAwMDAwKSIgZmlsbC1ydWxlPSJub256ZXJvIj4KICAgICAgICAgICAgPHJlY3QgaWQ9IlJlY3RhbmdsZS1wYXRoIiBzdHJva2U9IiM3Qzg3QTUiIGZpbGw9IiNGRkZGRkYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIgeD0iMC41IiB5PSIzLjU5IiB3aWR0aD0iMjgiIGhlaWdodD0iMjUuODEiIHJ4PSIxIj48L3JlY3Q+CiAgICAgICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUtcGF0aCIgc3Ryb2tlPSIjN0M4N0E1IiBmaWxsPSIjRTZFN0U4IiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHg9IjIuNSIgeT0iMC41IiB3aWR0aD0iMjQiIGhlaWdodD0iMzIiIHJ4PSIxIj48L3JlY3Q+CiAgICAgICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUtcGF0aCIgc3Ryb2tlPSIjN0M4N0E1IiBmaWxsPSIjRkZGRkZGIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIHg9IjIuNSIgeT0iMTQuNSIgd2lkdGg9IjI0IiBoZWlnaHQ9IjEzIj48L3JlY3Q+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik0xNC41LDEwLjUgTDE0LjUsMTQuNSIgaWQ9IlNoYXBlIiBzdHJva2U9IiM3Qzg3QTUiIGZpbGw9IiNFNkU3RTgiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCI+PC9wYXRoPgogICAgICAgICAgICA8cmVjdCBpZD0iUmVjdGFuZ2xlLXBhdGgiIGZpbGw9IiM0MTQ3NTciIHg9IjQuNSIgeT0iMi41IiB3aWR0aD0iMjAiIGhlaWdodD0iMTAiIHJ4PSIxIj48L3JlY3Q+CiAgICAgICAgICAgIDxyZWN0IGlkPSJSZWN0YW5nbGUtcGF0aCIgZmlsbD0iIzdDODdBNSIgb3BhY2l0eT0iMC41IiB4PSIxMy41IiB5PSIyMC4xMyIgd2lkdGg9IjIiIGhlaWdodD0iMiIgcng9IjAuNSI+PC9yZWN0PgogICAgICAgICAgICA8cGF0aCBkPSJNOS4wNiwyMC4xMyBMMTAuNTYsMjAuMTMgQzEwLjgzNjE0MjQsMjAuMTMgMTEuMDYsMjAuMzUzODU3NiAxMS4wNiwyMC42MyBMMTEuMDYsMjEuNjMgQzExLjA2LDIxLjkwNjE0MjQgMTAuODM2MTQyNCwyMi4xMyAxMC41NiwyMi4xMyBMOS4wNiwyMi4xMyBDOC41MDc3MTUyNSwyMi4xMyA4LjA2LDIxLjY4MjI4NDcgOC4wNiwyMS4xMyBDOC4wNiwyMC41Nzc3MTUzIDguNTA3NzE1MjUsMjAuMTMgOS4wNiwyMC4xMyBaIiBpZD0iU2hhcGUiIGZpbGw9IiM3Qzg3QTUiIG9wYWNpdHk9IjAuNSI+PC9wYXRoPgogICAgICAgICAgICA8cGF0aCBkPSJNMTguOTEsMjAuMTMgTDIwLjQyLDIwLjEzIEMyMC42OTYxNDI0LDIwLjEzIDIwLjkyLDIwLjM1Mzg1NzYgMjAuOTIsMjAuNjMgTDIwLjkyLDIxLjYzIEMyMC45MiwyMS45MDYxNDI0IDIwLjY5NjE0MjQsMjIuMTMgMjAuNDIsMjIuMTMgTDE4LjkyLDIyLjEzIEMxOC4zNjc3MTUzLDIyLjEzIDE3LjkyLDIxLjY4MjI4NDcgMTcuOTIsMjEuMTMgQzE3LjkxOTk3MjYsMjAuNTgxNTk3IDE4LjM2MTYyNDUsMjAuMTM1NDg0IDE4LjkxLDIwLjEzIFoiIGlkPSJTaGFwZSIgZmlsbD0iIzdDODdBNSIgb3BhY2l0eT0iMC41IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxOS40MjAwMDAsIDIxLjEzMDAwMCkgcm90YXRlKC0xODAuMDAwMDAwKSB0cmFuc2xhdGUoLTE5LjQyMDAwMCwgLTIxLjEzMDAwMCkgIj48L3BhdGg+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik04LjIzLDE3LjUgTDUsMTcuNSBDNC43MjM4NTc2MywxNy41IDQuNSwxNy4yNzYxNDI0IDQuNSwxNyBMNC41LDE0LjUgTDEwLjUsMTQuNSBMOC42NSwxNy4yOCBDOC41NTQ2Njk2MSwxNy40MTc5MDgyIDguMzk3NjUwMDYsMTcuNTAwMTU2NiA4LjIzLDE3LjUgWiIgaWQ9IlNoYXBlIiBmaWxsPSIjN0M4N0E1IiBvcGFjaXR5PSIwLjUiPjwvcGF0aD4KICAgICAgICAgICAgPHBhdGggZD0iTTE4LjE1LDE4Ljg1IEwxNy42NSwxOS4zNSBDMTcuNTUyMzQxNiwxOS40NDQwNzU2IDE3LjQ5ODAzMzksMTkuNTc0NDE0MiAxNy41LDE5LjcxIEwxNy41LDIwIEMxNy41LDIwLjI3NjE0MjQgMTcuMjc2MTQyNCwyMC41IDE3LDIwLjUgTDE2LjUsMjAuNSBDMTYuMjIzODU3NiwyMC41IDE2LDIwLjI3NjE0MjQgMTYsMjAgQzE2LDE5LjcyMzg1NzYgMTUuNzc2MTQyNCwxOS41IDE1LjUsMTkuNSBMMTMuNSwxOS41IEMxMy4yMjM4NTc2LDE5LjUgMTMsMTkuNzIzODU3NiAxMywyMCBDMTMsMjAuMjc2MTQyNCAxMi43NzYxNDI0LDIwLjUgMTIuNSwyMC41IEwxMiwyMC41IEMxMS43MjM4NTc2LDIwLjUgMTEuNSwyMC4yNzYxNDI0IDExLjUsMjAgTDExLjUsMTkuNzEgQzExLjUwMTk2NjEsMTkuNTc0NDE0MiAxMS40NDc2NTg0LDE5LjQ0NDA3NTYgMTEuMzUsMTkuMzUgTDEwLjg1LDE4Ljg1IEMxMC42NTgyMTY3LDE4LjY1MjE4NjMgMTAuNjU4MjE2NywxOC4zMzc4MTM3IDEwLjg1LDE4LjE0IEwxMi4zNiwxNi42NSBDMTIuNDUwMjgwMywxNi41NTI4NjE3IDEyLjU3NzM5NjEsMTYuNDk4MzgzNSAxMi43MSwxNi41IEwxNi4yOSwxNi41IEMxNi40MjI2MDM5LDE2LjQ5ODM4MzUgMTYuNTQ5NzE5NywxNi41NTI4NjE3IDE2LjY0LDE2LjY1IEwxOC4xNSwxOC4xNCBDMTguMzQxNzgzMywxOC4zMzc4MTM3IDE4LjM0MTc4MzMsMTguNjUyMTg2MyAxOC4xNSwxOC44NSBaIiBpZD0iU2hhcGUiIGZpbGw9IiM3Qzg3QTUiIG9wYWNpdHk9IjAuNSI+PC9wYXRoPgogICAgICAgICAgICA8cGF0aCBkPSJNMTAuODUsMjMuNDUgTDExLjM1LDIyLjk1IEMxMS40NDc2NTg0LDIyLjg1NTkyNDQgMTEuNTAxOTY2MSwyMi43MjU1ODU4IDExLjUsMjIuNTkgTDExLjUsMjIuMyBDMTEuNSwyMi4wMjM4NTc2IDExLjcyMzg1NzYsMjEuOCAxMiwyMS44IEwxMi41LDIxLjggQzEyLjc3NjE0MjQsMjEuOCAxMywyMi4wMjM4NTc2IDEzLDIyLjMgQzEzLDIyLjU3NjE0MjQgMTMuMjIzODU3NiwyMi44IDEzLjUsMjIuOCBMMTUuNSwyMi44IEMxNS43NzYxNDI0LDIyLjggMTYsMjIuNTc2MTQyNCAxNiwyMi4zIEMxNiwyMi4wMjM4NTc2IDE2LjIyMzg1NzYsMjEuOCAxNi41LDIxLjggTDE3LDIxLjggQzE3LjI3NjE0MjQsMjEuOCAxNy41LDIyLjAyMzg1NzYgMTcuNSwyMi4zIEwxNy41LDIyLjU5IEMxNy40OTgwMzM5LDIyLjcyNTU4NTggMTcuNTUyMzQxNiwyMi44NTU5MjQ0IDE3LjY1LDIyLjk1IEwxOC4xNSwyMy40NSBDMTguMzQwNTcxNCwyMy42NDQ0MjE4IDE4LjM0MDU3MTQsMjMuOTU1NTc4MiAxOC4xNSwyNC4xNSBMMTYuNjQsMjUuNjUgQzE2LjU0OTcxOTcsMjUuNzQ3MTM4MyAxNi40MjI2MDM5LDI1LjgwMTYxNjUgMTYuMjksMjUuOCBMMTIuNzEsMjUuOCBDMTIuNTc3Mzk2MSwyNS44MDE2MTY1IDEyLjQ1MDI4MDMsMjUuNzQ3MTM4MyAxMi4zNiwyNS42NSBMMTAuODUsMjQuMTUgQzEwLjY1OTQyODYsMjMuOTU1NTc4MiAxMC42NTk0Mjg2LDIzLjY0NDQyMTggMTAuODUsMjMuNDUgWiIgaWQ9IlNoYXBlIiBmaWxsPSIjN0M4N0E1IiBvcGFjaXR5PSIwLjUiPjwvcGF0aD4KICAgICAgICAgICAgPHBhdGggZD0iTTIxLjUsMjcuNSBMMjYuNSwyNy41IEwyNi41LDMxLjUgQzI2LjUsMzIuMDUyMjg0NyAyNi4wNTIyODQ3LDMyLjUgMjUuNSwzMi41IEwyMS41LDMyLjUgTDIxLjUsMjcuNSBaIiBpZD0iU2hhcGUiIHN0cm9rZT0iI0NDNEMyMyIgZmlsbD0iI0YxNUEyOSIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIj48L3BhdGg+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4=';
const blockIconURI = menuIconURI;

/**
 * States the PiCamera sensing activity can be set to.
 * @readonly
 * @enum {string}
 */
const PiCameraState = {
    /** PiCamera turned off. */
    OFF: 'off',

    /** PiCamera turned on with default y axis mirroring. */
    ON: 'on',
	ON_FLIPPED: 'on-flipped'
};

const EV3Sound_Name = {
    'en': 'EV3 Sound',
    'zh-cn': '乐高声音',
}

const EV3Sound_ToggleCamera = {
    'en': 'Toggle Camera [STATE]',
    'zh-cn': '切换摄像头 [STATE]',
}

const EV3Sound_CameraStatus = {
    'en': 'Camera Status',
    'zh-cn': '摄像头状态',
}

const EV3Sound_TakeCamera = {
    'en': 'Take Camera',
    'zh-cn': '拍摄图像',
}

const EV3Sound_ShowVideo = {
    'en': 'Show Video with Interval [INTERVAL]',
    'zh-cn': '显示视频 刷新间隔 [INTERVAL]',
}

const EV3Sound_HideVideo = {
    'en': 'Hide Video',
    'zh-cn': '隐藏视频',
}

const EV3Sound_GoForward = {
    'en': 'Go Forward with Speed [SPEED]',
    'zh-cn': '向前走 速度 [SPEED]',
};

const EV3Sound_GoBackward = {
    'en': 'Go Backward with Speed [SPEED]',
    'zh-cn': '向后走 速度 [SPEED]',
};

const EV3Sound_TurnLeft = {
    'en': 'Turn Left with Speed [SPEED]',
    'zh-cn': '向左转 速度 [SPEED]',
};

const EV3Sound_TurnRight = {
    'en': 'Turn Right with Speed [SPEED]',
    'zh-cn': '向右转 速度 [SPEED]',
};

const EV3Sound_StopIt = {
    'en': 'Stop It',
    'zh-cn': '停下来',
};


class EV3Sound {
    constructor (runtime) {
        /**
         * The runtime instantiating this block package.
         * @type {Runtime}
         */
        this.runtime = runtime;
		this.camera_status = false;
		this.locale = this._setLocale();
		this._lastUpdate = null;
		
		this.originCanvas = this.runtime.renderer._gl.canvas;  // 右上侧canvas
		this.canvas = document.createElement('canvas');  // 创建用于绘制canvas
		this.canvas.width = 480;
		this.canvas.height = 360;
		this.originCanvas.parentElement.style.position = 'relative';
		this.canvas.style.position = 'absolute';
		this.canvas.style.top = '0';
		this.canvas.style.left = '0';

		this.timeout = null;
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
     * States the PiCamera sensing activity can be set to.
     * @readonly
     * @enum {string}
     */
    static get PiCameraState () {
        return PiCameraState;
    }

    /**
     * An array of info on PiCamera state options for the "turn PiCamera [STATE]" block.
     * @type {object[]}
     * @param {string} name - the translatable name to display in the PiCamera state menu
     * @param {string} value - the serializable value stored in the block
     */
    get PICAMERA_STATE_INFO () {
        return [
            {
                name: formatMessage({
                    id: 'mlcar.camera_off',
                    default: 'off',
                    description: 'Option for the "turn picamera [STATE]" block'
                }),
                value: PiCameraState.OFF
            },
            {
                name: formatMessage({
                    id: 'mlcar.camera_on',
                    default: 'on',
                    description: 'Option for the "turn picamera [STATE]" block'
                }),
                value: PiCameraState.ON
            },
            {
                name: formatMessage({
                    id: 'mlcar.camera_on_flipped',
                    default: 'on-flipped',
                    description: 'Option for the "turn picamera [STATE]" block'
                }),
                value: PiCameraState.ON_FLIPPED
            }
        ];
    }


	getInfo() {
		return {
			id: 'mlcar',
			name: EV3Sound_Name[this.locale],
			menuIconURI: menuIconURI,
			blockIconURI: blockIconURI,
			blocks: [
				{
                    opcode: 'togglecamera',
                    blockType: BlockType.COMMAND,
                    text: EV3Sound_ToggleCamera[this.locale],
                    arguments: {
                        STATE: {
                            type: ArgumentType.NUMBER,
                            menu: 'PICAMERA_STATE',
                            defaultValue: PiCameraState.OFF
                        }
                    }
				},
				{
					opcode: 'camerastatus',
					blockType: BlockType.REPORTER,
					text: formatMessage({
                        id: 'mlcar.camerastatus',
                        default: EV3Sound_CameraStatus[this.locale],
                        description: 'Camera Status'
                    })
				},
				{
                    opcode: 'takecamera',
                    blockType: BlockType.COMMAND,
                    text: EV3Sound_TakeCamera[this.locale]
				},
				{
                    opcode: 'showvideo',
                    blockType: BlockType.COMMAND,
                    text: EV3Sound_ShowVideo[this.locale],
					arguments: {
						INTERVAL: {
							type: ArgumentType.NUMBER,
							defaultValue: 1000
						}
					},
				},
				{
                    opcode: 'hidevideo',
                    blockType: BlockType.COMMAND,
                    text: EV3Sound_HideVideo[this.locale]
				},
				'---',
				{
					opcode: 'goforward',
					blockType: BlockType.COMMAND,
					text: EV3Sound_GoForward[this.locale],
					arguments: {
						SPEED: {
							type: ArgumentType.NUMBER,
							defaultValue: 100
						}
					},
				},
				{
					opcode: 'gobackward',
					blockType: BlockType.COMMAND,
					text: EV3Sound_GoBackward[this.locale],
					arguments: {
						SPEED: {
							type: ArgumentType.NUMBER,
							defaultValue: 100
						}
					},
				},
				{
					opcode: 'turnleft',
					blockType: BlockType.COMMAND,
					text: EV3Sound_TurnLeft[this.locale],
					arguments: {
						SPEED: {
							type: ArgumentType.NUMBER,
							defaultValue: 100
						}
					},
				},
				{
					opcode: 'turnright',
					blockType: BlockType.COMMAND,
					text: EV3Sound_TurnRight[this.locale],
					arguments: {
						SPEED: {
							type: ArgumentType.NUMBER,
							defaultValue: 100
						}
					},
				},
				{
					opcode: 'stopit',
					blockType: BlockType.COMMAND,
					text: EV3Sound_StopIt[this.locale],
				},
			],
            menus: {
                PICAMERA_STATE: {
                    acceptReporters: true,
                    items: this._buildMenu(this.PICAMERA_STATE_INFO)
                }
            }
		}
	}

    /**
     * Create data for a menu in scratch-blocks format, consisting of an array
     * of objects with text and value properties. The text is a translated
     * string, and the value is one-indexed.
     * @param {object[]} info - An array of info objects each having a name
     *   property.
     * @return {array} - An array of objects with text and value properties.
     * @private
     */
    _buildMenu (info) {
        return info.map((entry, index) => {
            const obj = {};
            obj.text = entry.name;
            obj.value = entry.value || String(index + 1);
            return obj;
        });
    }

    togglecamera (args, util) {
        const state = args.STATE;
        if (state === PiCameraState.ON || state === PiCameraState.ON_FLIPPED) {
			const flipped = state === PiCameraState.ON_FLIPPED;
			fetch("/00000000-0000-0000-0000-000000015000/start_camera/", {
				body: JSON.stringify({
					'flipped': flipped
				}),
				headers: {
					'content-type': 'application/json'
				},
				method: "POST"
			}).then(res => res.json()).then(ret => {
				this.camera_status = true;
			});
		} else {
			fetch("/00000000-0000-0000-0000-000000015000/stop_camera/", {
				body: {},
				headers: {
					'content-type': 'application/json'
				},
				method: "POST"
			}).then(res => res.json()).then(ret => {
				this.camera_status = false;
			});
		}
    }

	camerastatus(args, util) {
		return this.camera_status;
	}

	_loop(interval) {
        this.timeout = setTimeout(this._loop.bind(this, interval), Math.max(this.runtime.currentStepTime, interval));
        const time = Date.now();
        if (this._lastUpdate === null) {
            this._lastUpdate = time;
        }
        const offset = time - this._lastUpdate;

        if (offset > interval) {
			if (this.camera_status === true) {
				var context = this.canvas.getContext('2d');
				fetch("/00000000-0000-0000-0000-000000015000/take_camera/", {
					body: {},
					headers: {
						'content-type': 'application/json'
					},
					method: "POST"
				}).then(res => res.json()).then(ret => {
					var img = new Image();
					img.src = ret;
					img.onload = function() {
						context.clearRect(0, 0, 480, 360);
						context.drawImage(img, 0, 0);
					}
				})
			}
		}
	}

	showvideo(args, util) {
		if (this.timeout != null) {
			return;
		}
		var interval = args.INTERVAL;
		if (args.INTERVAL < 33) {
			interval = 33;
			
		}
		this.originCanvas.parentElement.append(this.canvas);
		this._loop(interval);
	}

	hidevideo(args, util) {
		if (this.timeout === null) {
			return;
		}
		this.originCanvas.parentElement.removeChild(this.canvas);
		clearTimeout(this.timeout);
		this.timeout = null;
	}

    takecamera (args, util) {
        if (this.camera_status === true) {
			const _storage = this.runtime.storage;
			const _runtime = this.runtime;
			const target = util.target;
			
			const BitmapAdapter = SvgRenderer.BitmapAdapter;
			const bitmapAdapter = new BitmapAdapter();
			
			fetch("/00000000-0000-0000-0000-000000015000/take_camera/", {
				body: {},
				headers: {
					'content-type': 'application/json'
				},
				method: "POST"
			}).then(res => res.json()).then(ret => {
				bitmapAdapter.importBitmap(ret, 'image/jpeg').then((dataBuffer) => {
					const name = 'deepcar';
					const type = _storage.AssetType.ImageBitmap;
					const dataFormat = _storage.DataFormat.JPG;

					const asset = _storage.createAsset(type, dataFormat, dataBuffer, null, true);

					const assetId = asset.assetId;
					const md5 = assetId + '.' + dataFormat;

					const costume = { name, dataFormat, asset, md5, assetId };

					return loadCostume(md5, costume, _runtime);
				})
				.then((costume) => {
					target.addCostume(costume);
					target.setCostume(target.getCostumes().length - 1);
				})
				.catch(e => {
					console.log('Failed to save screenshot to costume');
				});
			});
		}
    }

	goforward(args, util) {
		return new Promise((resolve, reject) => {
			fetch("/00000000-0000-0000-0000-000000015000/go_forward/", {
				body: JSON.stringify({
					"text": args.SPEED,
				}),
				headers: {
					'content-type': 'application/json'
				},
				method: "POST"
			}).then(res => res.json()).then(ret => {
				resolve('')
			});
		});
	}


	gobackward(args, util) {
		return new Promise((resolve, reject) => {
			fetch("/00000000-0000-0000-0000-000000015000/go_backward/", {
				body: JSON.stringify({
					"text": args.SPEED,
				}),
				headers: {
					'content-type': 'application/json'
				},
				method: "POST"
			}).then(res => res.json()).then(ret => {
				resolve('')
			});
		});
	}

	turnleft(args, util) {
		return new Promise((resolve, reject) => {
			fetch("/00000000-0000-0000-0000-000000015000/turn_left/", {
				body: JSON.stringify({
					"text": args.SPEED,
				}),
				headers: {
					'content-type': 'application/json'
				},
				method: "POST"
			}).then(res => res.json()).then(ret => {
				resolve('')
			});
		});
	}

	turnright(args, util) {
		return new Promise((resolve, reject) => {
			fetch("/00000000-0000-0000-0000-000000015000/turn_right/", {
				body: JSON.stringify({
					"text": args.SPEED,
				}),
				headers: {
					'content-type': 'application/json'
				},
				method: "POST"
			}).then(res => res.json()).then(ret => {
				resolve('')
			});
		});
	}

	stopit(args, util) {
		return new Promise((resolve, reject) => {
			fetch("/00000000-0000-0000-0000-000000015000/stop_it/", {
				body: JSON.stringify({}),
				headers: {
					'content-type': 'application/json'
				},
				method: "POST"
			}).then(res => res.json()).then(ret => {
				resolve('')
			});
		});
	}

}

module.exports = EV3Sound;
