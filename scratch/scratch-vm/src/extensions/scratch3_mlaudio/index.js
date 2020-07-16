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

const MlAudio_Name = {
    'en': 'Audio Training',
    'zh-cn': '语音训练',
};

const MlAudio_IsLoaded = {
    'en': 'Loaded',
    'zh-cn': '已加载',
};

const MlAudio_CollectNoise = {
    'en': 'Collect Noise Sample',
    'zh-cn': '收集噪音样本',
};

const MlAudio_CollectSample = {
    'en': 'Collect Audio Sample [CLASS]',
    'zh-cn': '收集语音样本 [CLASS]',
};

const MlAudio_GetSampleClasses = {
    'en': 'Sample Classes',
    'zh-cn': '样本种类',
};

const MlAudio_GetSampleCount = {
    'en': 'Sample Count from [CLASS]',
    'zh-cn': '样本数 来自 [CLASS]',
};

const MlAudio_DeleteAllSamples = {
    'en': 'Delete All Samples',
    'zh-cn': '删除所有样本',
};

const MlAudio_DeleteSamples = {
    'en': 'Delete All Samples from [CLASS]',
    'zh-cn': '删除所有样本 来自 [CLASS]',
};

const MlAudio_DeleteSample = {
    'en': 'Delete Sample [NUMBER] from [CLASS]',
    'zh-cn': '删除样本 [NUMBER] 来自 [CLASS]',
};

const MlAudio_ListenSample = {
    'en': 'Listen Sample [NUMBER] from [CLASS]',
    'zh-cn': '听取样本 [NUMBER] 来自 [CLASS]',
};

const MlAudio_TrainSamples = {
    'en': 'Train Samples',
    'zh-cn': '训练样本',
};

const MlAudio_Predict = {
    'en': 'Predict Speech',
    'zh-cn': '预测语音',
};

const MlAudio_WhenFinished = {
    'en': 'When Finished',
    'zh-cn': '当预测完成',
};

const MlAudio_PredictClass = {
    'en': 'predictClass',
    'zh-cn': '预测类别',
};

const MlAudio_PredictConfidence = {
    'en': 'predictConfidence',
    'zh-cn': '预测准确率',
};

const MlAudio_WhenHeard = {
    'en': 'When Heard [STRING]',
    'zh-cn': '当听到 [STRING]',
};

class MlAudio {
    constructor(runtime) {
        this.runtime = runtime;
        this.locale = this._setLocale();

        this.mlInit();
        this.resultClass = '';
        this.resultConfidence = '';
        this.finished = false;
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
            id: 'mlaudio',
            name: MlAudio_Name[this.locale],
            menuIconURI: menuIconURI,
            blockIconURI: blockIconURI,
            blocks: [
                {
                    opcode: 'isloaded',
                    blockType: BlockType.REPORTER,
                    text: MlAudio_IsLoaded[this.locale]
                },
                {
                    opcode: 'collectNoise',
                    blockType: BlockType.COMMAND,
                    text: MlAudio_CollectNoise[this.locale]
                },
                {
                    opcode: 'collectSample',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        CLASS: {
                            type: ArgumentType.STRING,
                            defaultValue: ''
                        }
                    },
                    text: MlAudio_CollectSample[this.locale]
                },
                {
                    opcode: 'getSampleClasses',
                    blockType: BlockType.REPORTER,
                    text: MlAudio_GetSampleClasses[this.locale]
                },
                {
                    opcode: 'getSampleCount',
                    blockType: BlockType.REPORTER,
                    arguments: {
                        CLASS: {
                            type: ArgumentType.STRING,
                            defaultValue: ''
                        }
                    },
                    text: MlAudio_GetSampleCount[this.locale]
                },
                {
                    opcode: 'deleteAllSamples',
                    blockType: BlockType.COMMAND,
                    text: MlAudio_DeleteAllSamples[this.locale]
                },
                {
                    opcode: 'deleteSamples',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        CLASS: {
                            type: ArgumentType.STRING,
                            defaultValue: ''
                        }
                    },
                    text: MlAudio_DeleteSamples[this.locale]
                },
                {
                    opcode: 'deleteSample',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        CLASS: {
                            type: ArgumentType.STRING,
                            defaultValue: ''
                        },
                        NUMBER: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0
                        }
                    },
                    text: MlAudio_DeleteSample[this.locale]
                },
                {
                    opcode: 'listenSample',
                    blockType: BlockType.COMMAND,
                    arguments: {
                        CLASS: {
                            type: ArgumentType.STRING,
                            defaultValue: ''
                        },
                        NUMBER: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 0
                        }
                    },
                    text: MlAudio_ListenSample[this.locale]
                },
                {
                    opcode: 'trainSamples',
                    blockType: BlockType.COMMAND,
                    text: MlAudio_TrainSamples[this.locale]
                },
                {
                    opcode: 'predict',
                    blockType: BlockType.COMMAND,
                    text: MlAudio_Predict[this.locale]
                },
/*
                {
                    opcode: 'whenfinished',
                    blockType: BlockType.HAT,
                    text: MlAudio_WhenFinished[this.locale]
                },
*/
                {
                    opcode: 'predictClass',
                    blockType: BlockType.REPORTER,
                    text: MlAudio_PredictClass[this.locale]
                },
                {
                    opcode: 'predictConfidence',
                    blockType: BlockType.REPORTER,
                    text: MlAudio_PredictConfidence[this.locale]
                },
                {
                    opcode: 'whenheard',
                    blockType: BlockType.HAT,
                    arguments: {
                        STRING: {
                            type: ArgumentType.STRING,
                            defaultValue: ''
                        }
                    },
                    text: MlAudio_WhenHeard[this.locale]
                }
            ]
        }
    }

    isloaded() {
        return Boolean(this.recognizer);
    }

    collectNoise(args, util) {
        const collectExampleOptions = {};
        collectExampleOptions.includeRawAudio = true;
        this.recognizer.collectExample("_background_noise_", collectExampleOptions);
        console.log(this.recognizer);
    }

    collectSample(args, util) {
        const collectExampleOptions = {};
        collectExampleOptions.includeRawAudio = true;
        this.recognizer.collectExample(args.CLASS, collectExampleOptions);
        console.log(this.recognizer);
    }

    getSampleClasses(args, util) {
        try {
            return Object.keys(this.recognizer.countExamples()).join();
        } catch (e) {
            return '';
        }
    }

    deleteAllSamples(args, util) {
        try {
            const allexamples = this.recognizer.countExamples();
            for (var i in allexamples) {
                const samples = this.recognizer.getExamples(i);
                for (var j in samples) {
                    this.recognizer.removeExample(samples[j]['uid']);
                }
            }
            //this.recognizer.clearExamples();
        } catch (e) {
        }
    }

    deleteSamples(args, util) {
        try {
            const samples = this.recognizer.getExamples(args.CLASS);
            for (var j in samples) {
                this.recognizer.removeExample(samples[j]['uid']);
            }
        } catch (e) {
        }
    }

    deleteSample(args, util) {
        try {
            const samples = this.recognizer.getExamples(args.CLASS);
            this.recognizer.removeExample(samples[args.NUMBER]['uid']);
        } catch (e) {
        }
    }

    getSampleCount(args, util) {
        try {
            const samples = this.recognizer.getExamples(args.CLASS);
            return samples.length;
        } catch (e) {
            return 0;
        }
    }

    listenSample(args, util) {
        try {
            const samples = this.recognizer.getExamples(args.CLASS);
            const buffer = samples[args.NUMBER]['example']['rawAudio']['data'];
                    
            const context = new AudioContext();
            const sampleRate = context.sampleRate;            //44100 or 48000
            const audioBuffer = context.createBuffer(1, buffer.length, sampleRate);
            const audioBufferData = audioBuffer.getChannelData(0);
            audioBufferData.set(buffer);
            const source = context.createBufferSource();
            source.buffer = audioBuffer;
            source.connect(context.destination);
            source.start();
        } catch (e) {
        }
    }

    async trainSamples(args, util) {
        await this.recognizer.train({
            epochs: 25,
            callback: {
                onEpochEnd: async (epoch, logs) => {
                    console.log(`Epoch ${epoch}: loss=${logs.loss}, accuracy=${logs.acc}`);
                }
            }
        });
    }

    async predict(args, util) {
        this.resultClass = '';
        this.resultConfidence = '';
        const words = this.recognizer.wordLabels();
        await this.recognizer.listen(({scores}) => {
            // 将分数转换为(score,word)对列表
            scores = Array.from(scores).map((s, i) => ({score: s, word: words[i]}));
            // 找到最可能的单词
            scores.sort((s1, s2) => s2.score - s1.score);
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
        if (args.STRING == this.resultClass) {
            return true;
        } else {
            return false;
        }
    }

    async mlInit () {
        let ip = location.host;
        const baseRecognizer = speechCommands.create('BROWSER_FFT', null, 'https://' + ip + '/00000000-0000-0000-0000-000000015000/model/audio/model.json', 'https://' + ip + '/00000000-0000-0000-0000-000000015000/model/audio/metadata.json');
        //const baseRecognizer = speechCommands.create('BROWSER_FFT');                    //使用网络上的模型
        await baseRecognizer.ensureModelLoaded();
        this.recognizer = baseRecognizer.createTransfer('mlaudio');
        console.log(this.recognizer);
    }

}

module.exports = MlAudio;
