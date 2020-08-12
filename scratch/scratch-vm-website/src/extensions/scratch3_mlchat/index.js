// create by scratch3-extension generator
const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');
const log = require('../../util/log');
const formatMessage = require('format-message');

const menuIconURI = "data:image/png;base64,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";
const blockIconURI = menuIconURI;

const Resampler = require('./resampler.js');

const BUFSIZE = 8192;

const MlChat_Name = {
    'en': 'Chat Robot',
    'zh-cn': '语音聊天',
};

const MlChat_ListenSpeech = {
    'en': 'Listen Speech [TIMEOUT]',
    'zh-cn': '语音输入 [TIMEOUT]',
};

const MlChat_WhenHeard = {
    'en': 'When Heard [SPEECH]',
    'zh-cn': '当听到 [SPEECH]',
};

const MlChat_SpeechText = {
    'en': 'Speech Text',
    'zh-cn': '语音文本',
};

const MlChat_TulingRobot = {
    'en': 'Chat Robot [QUESTION]',
    'zh-cn': '聊天机器人 [QUESTION]',
};

const MlChat_WhenChat = {
    'en': 'When Chat',
    'zh-cn': '当响应',
};

const MlChat_ChatResponse = {
    'en': 'Chat Response',
    'zh-cn': '聊天响应',
};

/*
const makeid = function () {
    var text = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < 5; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
};
*/

class MlChat {
    constructor(runtime) {
        this.runtime = runtime;
        this.fs = runtime.ioDevices.fs;
        this._context = null;
        this._resampler = null;
        this._onSpeechDone = null;
        this._onSpeechFail = null;
        this._chatResponse = null;
        this.initMicroPhone = this.initMicroPhone.bind(this);
        this._processAudioCallback = this._processAudioCallback.bind(this);
        this._resetListening = this._resetListening.bind(this);
        this._recognize = this._recognize.bind(this);
        this._recognizeSuccess = this._recognizeSuccess.bind(this);

        this.runtime.on('PROJECT_STOP_ALL', this._resetListening.bind(this));

        this.initMicroPhone();
        this.bufferArray = [];

        this.locale = this._setLocale();
        this._recognizeResult;
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

    initMicroPhone() {
        if (!this._context) {
            this._context = new (window.AudioContext || window.webkitAudioContext)();
            this._resampler = new Resampler(this._context.sampleRate, 16000, 1, BUFSIZE);
        }
        this._audioPromise = navigator.mediaDevices.getUserMedia({
            audio: true
        });

        this._audioPromise.then(stream => {
            this._micStream = stream;
        }).catch(e => {
            log.error(`Problem connecting to microphone:  ${e}`);
        });
    }

    getInfo() {
        return {
            id: 'mlchat',
            name: MlChat_Name[this.locale],
            menuIconURI: menuIconURI,
            blockIconURI: blockIconURI,
            blocks: [
                {
                    opcode: 'listenspeech',
                    blockType: BlockType.COMMAND,
                    text: MlChat_ListenSpeech[this.locale],
                    arguments: {
                        TIMEOUT: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 6
                        }
                    },
                },
                {
                    opcode: 'whenheard',
                    blockType: BlockType.HAT,
                    isEdgeActivated: false,
                    arguments: {
                        SPEECH: {
                            type: ArgumentType.STRING
                        }
                    },
                    text: MlChat_WhenHeard[this.locale]
                },
                {
                    opcode: 'speechout',
                    blockType: BlockType.REPORTER,
                    text: MlChat_SpeechText[this.locale]
                },
                '---',
                {
                    opcode: 'chatrobot',
                    blockType: BlockType.COMMAND,
                    text: MlChat_TulingRobot[this.locale],
                    arguments: {
                        QUESTION: {
                            type: ArgumentType.STRING,
                            defaultValue: '你好'
                        }
                    },
                },
                {
                    opcode: 'whenchat',
                    blockType: BlockType.HAT,
                    isEdgeActivated: false,
                    text: MlChat_WhenChat[this.locale]
                },
                {
                    opcode: 'chatout',
                    blockType: BlockType.REPORTER,
                    text: MlChat_ChatResponse[this.locale]
                }
            ]
        }
    }

    _processAudioCallback(e) {
        var resampled = this._resampler.resample(e.inputBuffer.getChannelData(0))
        this.bufferArray.push.apply(this.bufferArray, resampled);
    }

    _recognizeSuccess(txt) {
        this.result = txt;
        if (this._onSpeechDone) {
            this._onSpeechDone();
        }
        const words = [];
        this.runtime.targets.forEach(target => {
            target.blocks._scripts.forEach(id => {
                const b = target.blocks.getBlock(id);
                if (b.opcode === 'mlchat_whenheard') {
                    // Grab the text from the hat block's shadow.
                    const inputId = b.inputs.SPEECH.block;
                    const inputBlock = target.blocks.getBlock(inputId);
                    // Only grab the value from text blocks. This means we'll
                    // miss some. e.g. values in variables or other reporters.
                    if (inputBlock.opcode === 'text') {
                        const word = target.blocks.getBlock(inputId).fields.TEXT.value;
                        if (txt.indexOf(word) > -1) {
                            this.runtime.startHats('mlchat_whenheard', { TEXT: word });
                            words.push(word);
                        }
                    }
                }
            });
        });
    }

    _recognize() {
        const _recognizeSuccess = this._recognizeSuccess;
        const _onSpeechFail = this._onSpeechFail;
        this._resetListening();
        // var pcm = floatTo16BitPCM(this.bufferArray);
        // console.log("total", pcm);
        // build wav file
        var dataLength = this.bufferArray.length * 2; // 16bit
        var buffer = new ArrayBuffer(dataLength);
        var data = new DataView(buffer);
        var offset = 0;

        for (var i = 0; i < this.bufferArray.length; i++ , offset += 2) {
            var s = Math.max(-1, Math.min(1, this.bufferArray[i]));
            data.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
        }

        var blob = new Blob([data], { type: 'audio/wav' });
        var reader = new FileReader();
        var ip = null;
        var ipformat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        if (window.location.host.match(ipformat)) {         //For DeepCar (aoqingy)
            ip = "https://" + window.location.host;
        } else {                                            //For Cloud (aoqingy)
            var dnarr = window.location.host.split('.');
            dnarr[0] = 'api';
            ip = "https://" + dnarr.join('.');
        }
        console.log(ip);
        const _this = this;
        reader.onload = function () {
            var dataUrl = reader.result;
            var base64 = dataUrl.split(',')[1];
            // console.log(base64);
            const reqJson = {
                "format": "pcm",
                "rate": 16000,
                "dev_pid": 1537,
                "channel": 1,
                "token": "24.b21ac2bc95a3eb1668eb311da8f90bd4.2592000.1564995754.282335-16328058",
                "cuid": "kittenblock",
                "len": dataLength,
                "speech": base64
            }
            fetch(ip + "/00000000-0000-0000-0000-000000015000/audio_recognize/", {
                body: JSON.stringify(reqJson),
                headers: {
                    'content-type': 'application/json'
                },
                method: "POST"
            }).then(res => res.json()).then(ret => {
                ret = JSON.parse(ret);
                console.log(ret);
                if (ret.err_no === 0) {
                     _recognizeSuccess(ret.result[0]);
                } else {
                    if (_onSpeechFail) {
                        _onSpeechFail(ret.err_msg);
                    }
                }
            });
        };
        reader.readAsDataURL(blob);
    }

    _resetListening() {
        this.runtime.emitMicListening(false);
        // Note that this can be called before any Listen And Wait block did setup,
        // so check that things exist before disconnecting them.
        if (this._context) {
            this._context.suspend.bind(this._context);
        }
        // This is called on green flag to reset things that may never have existed
        // in the first place. Do a bunch of checks.
        if (this._scriptNode) {
            this._scriptNode.removeEventListener('audioprocess', this._processAudioCallback);
            this._scriptNode.disconnect();
        }
        if (this._sourceNode) {
            this._sourceNode.disconnect();
        }
    }

    listenspeech(args, util) {
        let timeout = parseInt(args.TIMEOUT, 10);
        timeout = timeout < 1 ? 1 : timeout;
        timeout = timeout > 60 ? 60 : timeout;
        this.runtime.emitMicListening(true);
        this.bufferArray = [];
        return new Promise((resolve, reject) => {
            this._sourceNode = this._context.createMediaStreamSource(this._micStream);
            this._scriptNode = this._context.createScriptProcessor(BUFSIZE, 1, 1);

            this._sourceNode.connect(this._scriptNode);
            this._scriptNode.addEventListener('audioprocess', this._processAudioCallback);
            this._scriptNode.connect(this._context.destination);
            setTimeout(this._recognize, timeout * 1000);
            this._onSpeechDone = resolve;
            this._onSpeechFail = reject;
        });
    }

    whenheard(args, util) {
        //const SPEECH = args.SPEECH;
        ///console.log("heart", args);
        return true;
    }

    speechout(args, util) {
        return this.result;
    }

    chatrobot(args, util) {
        var ip = null;
        var ipformat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        if (window.location.host.match(ipformat)) {         //For DeepCar (aoqingy)
            ip = "https://" + window.location.host;
        } else {                                            //For Cloud (aoqingy)
            var dnarr = window.location.host.split('.');
            dnarr[0] = 'api';
            ip = "https://" + dnarr.join('.');
        }
        console.log(ip);
        return new Promise((resolve, reject) => {
            fetch(ip + "/00000000-0000-0000-0000-000000015000/chat_robot/", {
                body: JSON.stringify({
                    "text": args.QUESTION,
                }),
                headers: {
                    'content-type': 'application/json'
                },
                method: "POST"
            }).then(res => res.json()).then(ret => {
                ret = JSON.parse(ret);
                console.log(ret);
                resolve('')
                this._chatResponse = ret.text;
                this.runtime.startHats('mlchat_whenchat', {});
            });
        });
    }

    whenchat(args, util) {
        return true;
    }
  
    chatout(args, util) {
        return this._chatResponse;
    }
}

module.exports = MlChat;
