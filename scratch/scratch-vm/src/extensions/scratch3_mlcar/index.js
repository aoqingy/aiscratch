// create by scratch3-extension generator
const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Base64Util = require('../../util/base64-util');
const {loadCostume} = require('../../import/load-costume.js');
const Cast = require('../../util/cast');
const log = require('../../util/log');
const formatMessage = require('format-message');
const SvgRenderer = require('scratch-svg-renderer');


const menuIconURI = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAACXBIWXMAABJ0AAASdAHeZh94AAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAATxElEQVR42mJceZbhP8MoGAWjYBQMAQAQQEyjQTAKRsEoGCoAIIBGC6xRMApGwZABAAE0WmCNglEwCoYMAAig0QJrFIyCUTBkAEAAjRZYo2AUjIIhAwACaLTAGgWjYBQMGQAQQKMF1igYBaNgyACAABotsEbBKBgFQwYABNBogTUKRsEoGDIAIIBGC6xRMApGwZABAAE0WmCNglEwCoYMAAig0QJrFIyCUTBkAEAAjRZYo2AUjIIhAwACaLTAGgWjYBQMGQAQQKMF1igYBaNgyACAABotsEbBKBgFQwYABNBogTUKRsEoGDIAIIBGC6xRMApGwZABAAE0WmCNglEwCoYMAAig0QJrFIyCUTBkAEAAjRZYo2AUjIIhAwACaLTAGgWjYBQMGQAQQKMF1igYBaNgyACAABotsEbBKBgFQwYABNBogTUKRsEoGDIAIIBGC6xRMApGwZABAAE0WmCNglEwCoYMAAig0QJrFIyCUTBkAEAAjRZYo2AUjIIhAwACaLTAGgWjYBQMGQAQQKMF1igYBaNgyACAABotsEbBKBgFQwYABNBogTUKRsEoGDIAIIBGC6xRMApGwZABAAE0WmCNglEwCoYMAAig0QJrFIyCUTBkAEAAjRZYo2AUjIIhAwACaLTAGgWjYBQMGQAQQKMF1igYBaNgyACAABotsEbBKBgFQwYABNBogTUKRsEoGDIAIIBGC6xRMApGwZABAAE0WmCNglEwCoYMAAig0QJrFIyCUTBkAEAAjRZYo2AUjIIhAwACaLTAGgWjYBQMGQAQQKMF1igYBaNgyACAABotsEbBKBgFQwYABNBogTUKRsEoGDIAIIBYBotDxHgd4Oxffz4wfPh+YTR2RsEoIAFICwQwSPMHMDz9uIHh6YcNw9KPAAE0aAosB9X9cPbrLwcZ9t9yGE2BQxAoCCcwKAIxMhiKcQmqQJHTJAgcuO3I8OrzgUHrZm3JBgYBTn1gHMSD+VefNwJxw7BKXwABxDKaxUYBNQE3mwKDKI/9aEAMQAELKqyQwesvB4adPwECaEgXWKzMAgyCXAZUMev9twsMv/9+IFmfocwEBgEK3fABaPf5JwUoYgKcBgyGshMo9tf5xwWj3esRAFTFCtAKq4ODujVILgAIoCFdYIEKK/RmO7mA3OY+qLCiRYuCjUWAKuaCzKEnYGMWYBgF9G/VSvP7o4jdejVhWPoVIIBGZwlHAVUBemvzw/eLo4FCYwAau0IG3349HLaD7gABNDqGRWUAGugkLpHVk2Tug7cLGb7+ekBQHWgsYzCNIZHTzR4FpLWuYIPsMHBlmA20IwOAABp2BRao704MoFWmJnZWhuQC690CIrusDQNaYIEyEDL4NVpg0RSooY1dgVpXD94uGLb+BQigYVdgETuFHmb0fzS10wBwscmjdgm/jQ74k9q9I7UyQw9/eqbtVecY6Ro+AAE0OoY1CqgGQDObo13CUUBLABBAdGthYVtQiC/hO6ph7/5gWwIwCgYHwDYjObqkYhRQEwAEEN0KLFIWFLIy848uPhyCQJQHszsO2mY1WAAoDRIzcTGQAOQ+YsZhQZU6KJ8gWrIfR0TlABBAo7OEo4CqBQI6AM1aDoaMBHKbt8598DIL0KA0aNqfmoUXyHzQ+BNoxm7rFUWyzQa5jdCgOWjBtI8OqvmgdVdXh/HsIAwABBDdCix8NQcoApC3FeCrLQb7IC6tBjyptUCWlgDbin9RYIE1GBYxwmbTQOnMQKYfjHddN6S4MAWlXdBuB+SlBaCC69TDBJr6Bb11RSiMQUMyyBUKaNvOUFwJDxBAdCuw8NUc4O0tSAUWKBGNbn4eegB9Lxu4hcUzOOIRdJIBMqBWFwo0qYBeUIMKL+KXoZBeQKIvZQAVVoQmN0Djx8jDLFefMwzJAgsggAbFLKEo72jhNNSBGI44BLUE0AuLgXAb+nILaq4Ev4BlEgh99flAtq6GEwAIoAEfwwI1U7HVzEMVgPYkktPFIzQgfOFJIbhFAKphzeSBtTewSX8bS0JVEErAWPlMl0oHT0sK1MoayK0ioDDBaPG/W0A180EtFdBwB3ILBsQGFZTUbMWA0gg5ravhBAACaMALrOHWuiI2gSKP54HG5cwUFoATOWilMqjgAp2ygKwGZC6owHJUOwBptfD7gxPwqQcJKF0b0QHqguFrRYHkBmopCqiARy/AQWFM7e4QaMAbvRICtbJefaZefIDMG8mtKxAACKABL7CIXZs1WAGoYCHnRAT0MTrYrA+o6wLC2MbxQBkfuRYHtUzdNM+jHNQGouk9W4Q+aYIOQP6hdmuDkoL0Pg22ruBqZYEGu6mxVQbbnsGR1roCAYAAGtAxLEJrs7CtnB5sAFSwgBIrDJMbDshjLLhmU0HdKsjM1kW0mrceWHBdGLDwwlYogFoxhLpl9ADoXShwd5BGe+2wVRQ6VBrLwnYiw0hrXYEAQAANaIGlgKd1BZIDtR5A4zXDHaB3i/EVfKACctd1A4bbryaiFe76DNzsCoOmwELvAoLUsNL5rCzsp3AepNniUVgrC711qUBhLwLkD2wnMozEbU8AATSgXUJc3UFQS8FMfj604IJEFC3XtZCTgGi5LgrUYiJnA6y10noCLQDqn/ENKoTQD48DtQBBrUFQKwDWcoTNFtLzJAFsrbr7NLYf1OpB7zWAWlmU+Btb62o4n8iADwAE0IC1sECJF32qGZEJ+NFaW/EM1sob6F5DjwLyWlewzIQ+M4ite0YrgG2wHTRITeuMDiuoqdXKQh+3hLWuRioACKABa2EhJ17kmhjebP/5ACXBgWpxR7UD4IHo0RMABg/AVgjBCipQa0NVLB+l20qvwXds7qLXmA+oQIH1EChtZWEblwSZjW4+vVrxA30TD0AADUiBhX4qJiiBIyds5C4gcqEFSvCDodACFabEniyKC4DOPkf3M2xJA3qNChqvosZBeNS+RQWUmdDHiEDdQdgYEYgG8ZHVUHuqn5ThBnp1o0D2gAoo5EoY1soaqV05agGAABqQAgu9Tw4aV0DPvLBCCzSQjD6VD6o9sZXyoCY/XQqsXw8oqmVABTa2yQSQf0G397hrXkBJ7KCEfvRewKDbSkFMKwbER24N0GJBJToAhRf6cAOxR0zTspUF2oIGqpxHewjkA4AAonuBhd66AtXA+PZ0HbkbAG5VwWppUMLDVVgM9uM1QOMRoEyObSnHqYeJ8EwM8zNsLA9Egwb5YX4fDEekYFsXBKow0MetwBkUmFGRxyVp3crCtpSAmivbyW1lgcIAV2WLr3Ik9thvQq1h5DiAtebJqawHEgAEEN0LLAOZCSSNK4BqI1AXEJSBQSvCB9NsIbEFNOj6cHyTDKDCCrmrAFs0ilxowbrH4I21wIKLVptryW0lwwsntNYDiP8ArQVNy1YWtn2DoEpxIMIK1HNAHycCFVikLPgk5rgZYgAoLSFXlCC3DcXjaAACiK4FFiiy0I+RISYyYIUWeiSLDpKTABA1KORiV5C7QDv4QXvo0Gc80TMS+tYa5EJryxUFBhvlDRgtMljBBWvRgPYVggpzerUwQbU1tv2KuDIA+uA7CIC6xCD/0aMgHagFliB70Tcrg9ig8bWRuOiTGgAggFjomZnRExMpkUZMjUTPG1pANTlkS4oBuHASBNK4WlDoANQcB41xECqsYQU1qHUGGv9ANx+U+GGFF3IhCNIHmhjA1nwHiVFaY2O7kRrfGBHEzoUo7gT5BZQeqFnLY7vibCDXLGFrXSK3skYB6QAggOhWYIE291J74yb6CZe0PtwPZB9oCwy+VhM+8PTjRvAJC6R2T0CtKBCGnYuPfzuTPrzbhav7SQnAti4IX+sKWR69VQbKuKAMTa1xkcHUusLXuhydMSQfAAQQ3RaOYrtKm9LZEnpvRQFlLFKOSYF0eReCC4n1FwUZjt6lbKYPlMBBLS7QEbyg42ZIHYwFqackk8COtiGldYUcdujbiUAFP2hBMK1aV6Dwvz/AhQKsdYkOdGh0XtZwBwABRMcTRxFdAmpt3ERPoNReZwQZfxBAaQVgaymgd0Hef7/A8Bp6HAwMCHLh3pgMuqgBffwJNh6GC4DUw/SAxswg++YM8Lb+KO1+obeSYYUCseZeAYddAooZoBYhNbqGuFpXg2EJAcgd6GlmtJVFHgAIILoVWE8/boBHGmhjLKUJCdsKYNC4DTWBKHiGzx880wPqzl191gAuJECFL6h1B7IPfVYKdjwMeouSUMsH/SgZUGFFjf2KsEWnoPCmpHUHKryx+QmUGYnt0oHcACqYQOepoxY29eBwJfeQP2zd1MF0VhTIb+hHz8BaWaMFFmkAIIDo1iWE7bECZXxqnD6JfiQvKIFSe40IG9LeRVBmhZ17BVpaASpgQPRgvzYKVFGACglKMi+ockAvZCAZ8SLJLSOQO9CPxwG33oBdTXKPxzGUmTBoW1fI7kEH1DjJYaQBgACi67IGUJeAWkflYhzJQuXu4CiAANBEg6Ma9rAFLckgB4D0gY4OQu0C88O3XZGyPEMbbXHmYGtdoVfY6G6FtbIovaKe9C50PVXto9eV9QABRNcCi1rNX2xHmrym0Q0lyICYS0HJPdOdcNgtJGq1NjXPdAf5H3JKBua4GGgvJbnrvkD6QPrRMwzIHtA4GaV7RQfrSZwgd8FaqrBCdbRLSBoACKAheZEqtiNNaLGSGXNjL+EMSqsV1aCuJzFmU2sxLaiwArV4sB19DBqPoXSQHKQf28weyD7QXkrQ9iRiwvvqc0QLBbaYdrCucQLNWILGAkH0SDzemBoAIICGZIGFvukW1NQeCdd00wvgK6xAYQ0qTKgBQOagb/QGARCflO4hqDAHjSeCWqAgtw/WggDkLlyr+6m1ZxB35UudvYQDDQACaMgVWNiOvaXFFVLoA8C0TEyDCYDGrEDdQGyFFaj1AipkqFUggMxB3+iN3D0EjXOB1psR22IaiheDIg+X0LJ7CArj4bCXECCAmIaag+m1mnmgzkcfSAAqpCGXWWAvrEgdECcGgMwDHZ2DC4DGfEZPmx0FMAAQQEOqwMJ2NAutLhUAnbAwXGpvYsMW1KLBtfAUtHaOVt1uUNji2zIEmmABXYNGzyUAXGwKo6XDIAQAATRkuoSgrgq21hW1mrWgY29AW2dAhR+2W0qILRRBTW9aANAeQjEiLp3lJjGjgbfbKCzAudAV1LICjQ/R+uZmWHcI19G/4BlEoBwoHEBxTssKBBQm9Dx/fhQQDwACaEgUWLim10GtK3ITLvrKY1A3yFvnPm71RNqDb2MyZTW+PNGnQRALQC0WQ7TD9ejRDcRXaH0DVgzWShtwugkUvrDDDMk5Gw2UjkALgkEb5ZFP9wBVSKAxNVC3WBHLiaUgQMyyllFAWwAQQIO+wMI1YwWu+clcuAgCoBYDsYULLe+yGygAyrj4tg/hO6uLlgBUAYEKSVCrD9dt0pQsXQAVVqB4J7ViAdk5OhM98AAggAZ9gYWtsIJ1BSkpRECzJKAWBr4r1skpGIm9nILUVcbEtiaxrW3CBkDH3OAqsEDbp0B+HqjlAbATV3F1VSlp9YHCkJxW8Oj5VYMDAATQoC+w0C8xgGUoShMQ7HA8UJcI27G6sNM8SS0YiR1TI7XAAmU04sxuICpDwga6kcMWdvLCYMicoPgBjSmCFgmD9hnCuoggN1PS0iGnksN3j8AooC8ACKBBX2CBxjVARw3DBsFhXRVqZYqhdkY8tcMWdFIq6IA5UAsOFK6DresLqjS2fFYAVyywEzwpAd9I8B8orY1unxlcACCABk2BhdyVQs80oEKFlUUAPAM22C5SPf+4AH6KAykAec8htsFc0HVfyGqIPToHlLmQzwV7T+AUVtByhffgI3MGb6akZsUCalkib9TFNvOK7XyyUTA4AEAAMa48y/B/KDgUtnBwdP/VKBgFIxcABNCQWYc1WlCNglEwCgACiGk0CEbBKBgFQwUABNBogTUKRsEoGDIAIIBGC6xRMApGwZABAAE0WmCNglEwCoYMAAig0QJrFIyCUTBkAEAAjRZYo2AUjIIhAwACaLTAGgWjYBQMGQAQQKMF1igYBaNgyACAABotsEbBKBgFQwYABNBogTUKRsEoGDIAIIBGC6xRMApGwZABAAE0WmCNglEwCoYMAAig0QJrFIyCUTBkAEAAjRZYo2AUjIIhAwACaLTAGgWjYBQMGQAQQKMF1igYBaNgyACAABotsEbBKBgFQwYABNBogTUKRsEoGDIAIIBGC6xRMApGwZABAAE0WmCNglEwCoYMAAig0QJrFIyCUTBkAEAAjRZYo2AUjIIhAwACaLTAGgWjYBQMGQAQQKMF1igYBaNgyACAABotsEbBKBgFQwYABNBogTUKRsEoGDIAIIBGC6xRMApGwZABAAE0WmCNglEwCoYMAAig0QJrFIyCUTBkAEAAjRZYo2AUjIIhAwACaLTAGgWjYBQMGQAQQKMF1igYBaNgyACAABotsEbBKBgFQwYABNBogTUKRsEoGDIAIIBGC6xRMApGwZABAAE0WmCNglEwCoYMAAig0QJrFIyCUTBkAEAAjRZYo2AUjIIhAwACaLTAGgWjYBQMGQAQQKMF1igYBaNgyACAABotsEbBKBgFQwYABNBogTUKRsEoGDIAIIBGC6xRMApGwZABAAE0WmCNglEwCoYMAAig0QJrFIyCUTBkAEAAjRZYo2AUjIIhAwACaLTAGgWjYBQMGQAQQKMF1igYBaNgyACAABotsEbBKBgFQwYABBgAJryZMQspQMUAAAAASUVORK5CYII=";
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

const MlCar_Name = {
    'en': 'Deep Car',
    'zh-cn': '机器人小车',
}

const MlCar_SetIPAddr = {
    'en': 'Set IP Addr [IPADDR]',
    'zh-cn': '配置IP [IPADDR]',
}

const MlCar_GetIPAddr = {
    'en': 'Get IP Addr',
    'zh-cn': 'IP地址',
}

const MlCar_ToggleCamera = {
    'en': 'Toggle Camera [STATE]',
    'zh-cn': '切换摄像头 [STATE]',
}

const MlCar_CameraStatus = {
    'en': 'Camera Status',
    'zh-cn': '摄像头状态',
}

const MlCar_TakeCamera = {
    'en': 'Take Camera',
    'zh-cn': '拍摄图像',
}

const MlCar_ShowVideo = {
    'en': 'Show Video with Interval [INTERVAL]',
    'zh-cn': '显示视频 刷新间隔 [INTERVAL]',
}

const MlCar_HideVideo = {
    'en': 'Hide Video',
    'zh-cn': '隐藏视频',
}

const MlCar_GoForward = {
    'en': 'Go Forward with Speed [SPEED]',
    'zh-cn': '向前走 速度 [SPEED]',
};

const MlCar_GoBackward = {
    'en': 'Go Backward with Speed [SPEED]',
    'zh-cn': '向后走 速度 [SPEED]',
};

const MlCar_TurnLeft = {
    'en': 'Turn Left with Speed [SPEED]',
    'zh-cn': '向左转 速度 [SPEED]',
};

const MlCar_TurnRight = {
    'en': 'Turn Right with Speed [SPEED]',
    'zh-cn': '向右转 速度 [SPEED]',
};

const MlCar_StopIt = {
    'en': 'Stop It',
    'zh-cn': '停下来',
};


class MlCar {
    constructor (runtime) {
        /**
         * The runtime instantiating this block package.
         * @type {Runtime}
         */
        this.runtime = runtime;
        this.ip_address = '';
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
            name: MlCar_Name[this.locale],
            menuIconURI: menuIconURI,
            blockIconURI: blockIconURI,
            blocks: [
                {
                    opcode: 'setipaddr',
                    blockType: BlockType.COMMAND,
                    text: MlCar_SetIPAddr[this.locale],
                    arguments: {
                        IPADDR: {
                            type: ArgumentType.STRING,
                            defaultValue: ''
                        }
                    }
                },
                {
                    opcode: 'getipaddr',
                    blockType: BlockType.REPORTER,
                    text: MlCar_GetIPAddr[this.locale]
                },
                '---',
                {
                    opcode: 'togglecamera',
                    blockType: BlockType.COMMAND,
                    text: MlCar_ToggleCamera[this.locale],
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
                        id: 'mlcar.cameraStatus',
                        default: MlCar_CameraStatus[this.locale],
                        description: 'Camera Status'
                    })
                },
                {
                    opcode: 'takecamera',
                    blockType: BlockType.COMMAND,
                    text: MlCar_TakeCamera[this.locale]
                },
                {
                    opcode: 'showvideo',
                    blockType: BlockType.COMMAND,
                    text: MlCar_ShowVideo[this.locale],
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
                    text: MlCar_HideVideo[this.locale]
                },
                '---',
                {
                    opcode: 'goforward',
                    blockType: BlockType.COMMAND,
                    text: MlCar_GoForward[this.locale],
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
                    text: MlCar_GoBackward[this.locale],
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
                    text: MlCar_TurnLeft[this.locale],
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
                    text: MlCar_TurnRight[this.locale],
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
                    text: MlCar_StopIt[this.locale],
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

    setipaddr (args, util) {
        console.log(args.IPADDR);
        var ipformat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;  
        console.log(args.IPADDR.match(ipformat));
        if(!args.IPADDR || args.IPADDR.match(ipformat))  
            this.ip_address = args.IPADDR;
    }

    getipaddr (args, util) {
        return this.ip_address;
    }

    buildtarget (target) {
        if (this.ip_address) {
            target = "https://" + this.ip_address + target;
        }
        console.log(target);
        return target;
    }

    togglecamera (args, util) {
        const state = args.STATE;
        if (state === PiCameraState.ON || state === PiCameraState.ON_FLIPPED) {
            const flipped = state === PiCameraState.ON_FLIPPED;
            fetch(this.buildtarget("/00000000-0000-0000-0000-000000015000/start_camera/"), {
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
            fetch(this.buildtarget("/00000000-0000-0000-0000-000000015000/stop_camera/"), {
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
        return new Boolean(this.camera_status).toString();
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
                fetch(this.buildtarget("/00000000-0000-0000-0000-000000015000/take_camera/"), {
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
            
            fetch(this.buildtarget("/00000000-0000-0000-0000-000000015000/take_camera/"), {
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
            fetch(this.buildtarget("/00000000-0000-0000-0000-000000015000/go_forward/"), {
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
            fetch(this.buildtarget("/00000000-0000-0000-0000-000000015000/go_backward/"), {
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
            fetch(this.buildtarget("/00000000-0000-0000-0000-000000015000/turn_left/"), {
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
            fetch(this.buildtarget("/00000000-0000-0000-0000-000000015000/turn_right/"), {
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
            fetch(this.buildtarget("/00000000-0000-0000-0000-000000015000/stop_it/"), {
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

module.exports = MlCar;
