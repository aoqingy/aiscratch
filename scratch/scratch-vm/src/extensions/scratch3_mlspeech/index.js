require('babel-polyfill');
const Runtime = require('../../engine/runtime');

// create by scratch3-extension generator
const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Base64Util = require('../../util/base64-util');
const Clone = require('../../util/clone');
const Cast = require('../../util/cast');
const Video = require('../../io/video');
const log = require('../../util/log');
const formatMessage = require('format-message');

const menuIconURI = "data:image/png;base64,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";
const blockIconURI = menuIconURI;

var tf = require('@tensorflow/tfjs');
var speechCommands = require('@tensorflow-models/speech-commands');


const MlSpeech_Name = {
    'en': 'Speech Commands',
    'zh-cn': '语音命令',
};

const MlSpeech_IsLoaded = {
    'en': 'Loaded',
    'zh-cn': '已加载',
};

const MlSpeech_ListenSpeech = {
    'en': 'Listen Speech',
    'zh-cn': '监听语音',
};

const MlSpeech_WhenFinished = {
    'en': 'When Finished',
    'zh-cn': '当监听完成',
};

const MlSpeech_PredictClass = {
    'en': 'predictClass',
    'zh-cn': '预测类别',
};

const MlSpeech_PredictConfidence = {
    'en': 'predictConfidence',
    'zh-cn': '预测准确率',
};

const MlSpeech_WhenHeard = {
    'en': 'When Heard [STRING]',
    'zh-cn': '当听到 [STRING]',
};

class MlSpeech {
    constructor(runtime) {
        this.runtime = runtime;
        this.locale = this._setLocale();

        this.mlInit();
        this.resultClass = '';
        this.resultConfidence = '';
        this.finished = false;
    }

    /**
     * An array of info on video state options for the "turn video [STATE]" block.
     * @type {object[]}
     * @param {string} name - the translatable name to display in the video state menu
     * @param {string} value - the serializable value stored in the block
     */
    get SPEECH_COMMAND_INFO () {
        //zero, one, two, three, four, five, six, seven, eight, nine, up, down, left, right, go, stop, yes, no
        return [
            {name: 'zero',   value: 'zero'   },
            {name: 'one',    value: 'one'    },
            {name: 'two',    value: 'two'    },
            {name: 'three',  value: 'three'  },
            {name: 'four',   value: 'four'   },
            {name: 'five',   value: 'five'   },
            {name: 'six',    value: 'six'    },
            {name: 'seven',  value: 'seven'  },
            {name: 'eight',  value: 'eight'  },
            {name: 'nine',   value: 'nine'   },
            {name: 'up',     value: 'up'     },
            {name: 'down',   value: 'down'   },
            {name: 'left',   value: 'left'   },
            {name: 'right',  value: 'right'  },
            {name: 'go',     value: 'go'     },
            {name: 'stop',   value: 'stop'   },
            {name: 'yes',    value: 'yes'    },
            {name: 'no',     value: 'no'     },
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

    getInfo() {
        return {
            id: 'mlspeech',
            name: MlSpeech_Name[this.locale],
            menuIconURI: menuIconURI,
            blockIconURI: blockIconURI,
            blocks: [
                {
                    opcode: 'isloaded',
                    blockType: BlockType.REPORTER,
                    text: MlSpeech_IsLoaded[this.locale]
                },
                {
                    opcode: 'listenspeech',
                    blockType: BlockType.COMMAND,
                    text: MlSpeech_ListenSpeech[this.locale]
                },
/*
                {
                    opcode: 'whenfinished',
                    blockType: BlockType.HAT,
                    text: MlSpeech_WhenFinished[this.locale]
                },
*/
                {
                    opcode: 'predictClass',
                    blockType: BlockType.REPORTER,
                    text: MlSpeech_PredictClass[this.locale]
                },
                {
                    opcode: 'predictConfidence',
                    blockType: BlockType.REPORTER,
                    text: MlSpeech_PredictConfidence[this.locale]
                },
                {
                    opcode: 'whenheard',
                    blockType: BlockType.HAT,
                    arguments: {
                        STRING: {
                            type: ArgumentType.STRING,
                            menu: 'SPEECH_COMMAND',
                            defaultValue: 'zero'
                        }
                    },
                    text: MlSpeech_WhenHeard[this.locale]
                }
            ],
            menus: {
                SPEECH_COMMAND: {
                    acceptReporters: false,
                    items: this._buildMenu(this.SPEECH_COMMAND_INFO)
                }
            }
        }
    }

    isloaded() {
        return Boolean(this.recognizer);
    }

    async listenspeech(args, util) {
        this.resultClass = '';
        this.resultConfidence = '';
        this.finished = false;
        const words = this.recognizer.wordLabels();
        console.log(words);
        console.log(this.recognizer);
        await this.recognizer.listen(({scores}) => {
            // 将分数转换为(score,word)对列表
            scores = Array.from(scores).map((s, i) => ({score: s, word: words[i]}));
            // 找到最可能的单词
            scores.sort((s1, s2) => s2.score - s1.score);
            console.log(scores);
            this.resultClass = scores[0].word;
            this.resultConfidence = scores[0].score;
            this.recognizer.stopListening();
            this.finished = true;
        }, {probabilityThreshold: 0.75});
    }

    whenfinished(args, util) {
        return this.finished === true;
    }

    predictClass(args, util) {
        return this.resultClass;
    }

    predictConfidence(args, util) {
        return this.resultConfidence;
    }
    
    whenheard(args, util) {
        return args.STRING === this.resultClass;
    }

    async mlInit () {
        let ip = location.host;
        this.recognizer = speechCommands.create('BROWSER_FFT', null, 'https://' + ip + '/00000000-0000-0000-0000-000000015000/model/speech/model.json', 'https://' + ip + '/00000000-0000-0000-0000-000000015000/model/speech/metadata.json');
        //this.recognizer = speechCommands.create('BROWSER_FFT');                //使用网络上的模型
        await this.recognizer.ensureModelLoaded();
        console.log(this.recognizer);
    }

}

module.exports = MlSpeech;
