﻿// create by scratch3-extension generator
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


const EV3Sensor_Name = {
    'en': 'EV3 Sensor',
    'zh-cn': '乐高传感器',
}

const EV3SensorColor_Detect = {
    'en': 'Detect Color [PORT]',
    'zh-cn': '检测颜色 [PORT]'
};

const EV3SensorColor_Color = {
    'en': 'Color Value',
    'zh-cn': '颜色值'
};

const EV3SensorColor_WhenDetected = {
    'en': 'When Detected [COLOR]',
    'zh-cn': '当检测到颜色 [COLOR]'
};

const EV3SensorTouch_Detect = {
    'en': 'Detect Touch [PORT]',
    'zh-cn': '检测触碰 [PORT]'
};

const EV3SensorTouch_Status = {
    'en': 'Touch Status',
    'zh-cn': '触碰状态'
};

const EV3SensorTouch_WhenDetected = {
    'en': 'When Detected [STATUS]',
    'zh-cn': '当检测到触碰 [STATUS]'
};

const EV3SensorGyro_Detect = {
    'en': 'Detect Gyro [PORT]',
    'zh-cn': '检测陀螺仪 [PORT]'
};

const EV3SensorGyro_Angel = {
    'en': 'Gyro Angel',
    'zh-cn': '陀螺仪角度'
};

const EV3SensorGyro_Speed = {
    'en': 'Gyro Speed',
    'zh-cn': '陀螺仪速度'
};

const EV3SensorGyro_Reset = {
    'en': 'Reset Gyro [PORT]',
    'zh-cn': '重置陀螺仪 [PORT]'
};

const EV3SensorUltrasonic_Detect = {
    'en': 'Detect Ultrasonic [PORT]',
    'zh-cn': '检测超声波 [PORT]'
};

const EV3SensorUltrasonic_Distance = {
    'en': 'Ultrasonic Distance',
    'zh-cn': '超声波距离'
};


class EV3Sensor {
    constructor (runtime) {
        /**
         * The runtime instantiating this block package.
         * @type {Runtime}
         */
        this.runtime = runtime;
        this.locale = this._setLocale();
    }

    get COLOR_COMMAND_INFO () {
        //zero, one, two, three, four, five, six, seven, eight, nine, up, down, left, right, go, stop, yes, no
        return [
            {name: '未知', value: '0'},
            {name: '黑色', value: '1'},
            {name: '蓝色', value: '2'},
            {name: '绿色', value: '3'},
            {name: '黄色', value: '4'},
            {name: '红色', value: '5'},
            {name: '白色', value: '6'},
            {name: '褐色', value: '7'},
        ];
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


    getInfo() {
        return {
            id: 'ev3motor',
            name: EV3Sensor_Name[this.locale],
            menuIconURI: menuIconURI,
            blockIconURI: blockIconURI,
            blocks: [
                {
                    opcode: 'colorsensor_detect',
                    blockType: BlockType.COMMAND,
                    text: EV3SensorColor_Detect[this.locale],
                    arguments: {
                        PORT: {
                            type: ArgumentType.STRING,
                            defaultValue: 1
                        }
                    },
                },
                {
                    opcode: 'colorsensor_color',
                    blockType: BlockType.REPORTER,
                    text: EV3SensorColor_Color[this.locale]
                },
                {
                    opcode: 'colorsensor_whendetected',
                    blockType: BlockType.HAT,
                    arguments: {
                        COLOR: {
                            type: ArgumentType.STRING,
                            menu: 'COLOR_COMMAND',
                            defaultValue: '0'
                        }
                    },
                    text: EV3SensorColor_WhenDetected[this.locale]
                },
                '---',
                {
                    opcode: 'touchsensor_detect',
                    blockType: BlockType.COMMAND,
                    text: EV3SensorTouch_Detect[this.locale],
                    arguments: {
                        PORT: {
                            type: ArgumentType.STRING,
                            defaultValue: 1
                        }
                    },
                },
                {
                    opcode: 'touchsensor_status',
                    blockType: BlockType.REPORTER,
                    text: EV3SensorTouch_Status[this.locale]
                },
                {
                    opcode: 'touchsensor_whendetected',
                    blockType: BlockType.HAT,
                    arguments: {
                        COLOR: {
                            type: ArgumentType.STRING,
                            menu: 'TOUCH_COMMAND',
                            defaultValue: '0'
                        }
                    },
                    text: EV3SensorTouch_WhenDetected[this.locale]
                },
                '---',
                {
                    opcode: 'gyrosensor_detect',
                    blockType: BlockType.COMMAND,
                    text: EV3SensorGyro_Detect[this.locale],
                    arguments: {
                        PORT: {
                            type: ArgumentType.STRING,
                            defaultValue: 1
                        }
                    },
                },
                {
                    opcode: 'gyrosensor_angel',
                    blockType: BlockType.REPORTER,
                    text: EV3SensorGyro_Angel[this.locale]
                },
                {
                    opcode: 'gyrosensor_speed',
                    blockType: BlockType.REPORTER,
                    text: EV3SensorGyro_Speed[this.locale]
                },
                {
                    opcode: 'gyrosensor_reset',
                    blockType: BlockType.COMMAND,
                    text: EV3SensorGyro_Reset[this.locale],
                    arguments: {
                        PORT: {
                            type: ArgumentType.STRING,
                            defaultValue: 1
                        }
                    },
                },
                '---',
                {
                    opcode: 'ultrasonicsensor_detect',
                    blockType: BlockType.COMMAND,
                    text: EV3SensorUltrasonic_Detect[this.locale],
                    arguments: {
                        PORT: {
                            type: ArgumentType.STRING,
                            defaultValue: 1
                        }
                    },
                },
                {
                    opcode: 'ultrasonicsensor_distance',
                    blockType: BlockType.REPORTER,
                    text: EV3SensorUltrasonic_Distance[this.locale]
                },
            ],
            menus: {
                COLOR_COMMAND: {
                    acceptReporters: false,
                    items: this._buildMenu(this.COLOR_COMMAND_INFO)
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


    colorsensor_detect(args, util) {
    }

    colorsensor_color(args, util) {
    }

    colorsensor_whendetected(args, util) {
    }

    touchsensor_detect(args, util) {
    }

    touchsensor_status(args, util) {
    }

    touchsensor_whendetected(args, util) {
    }

    gyrosensor_detect(args, util) {
    }

    gyrosensor_angel(args, util) {
    }

    gyrosensor_speed(args, util) {
    }

    gyrosensor_reset(args, util) {
    }

    ultrasonicsensor_detect(args, util) {
    }

    ultrasonicsensor_distance(args, util) {
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

module.exports = EV3Sensor;
