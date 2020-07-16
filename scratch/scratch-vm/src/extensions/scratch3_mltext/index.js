require('babel-polyfill');
const Runtime = require('../../engine/runtime');

const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Cast = require('../../util/cast');
const log = require('../../util/log');
const formatMessage = require('format-message');

const menuIconURI = "data:image/png;base64,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";
const blockIconURI = menuIconURI;

//import * as tf from '@tensorflow/tfjs';
var tf = require('@tensorflow/tfjs');
var knnClassifier = require('@tensorflow-models/knn-classifier');

const MlText_Name = {
    'en': 'Text Classification',
    'zh-cn': '文本分类',
};

const MlText_TrainSample = {
    'en': 'Train Data [DATA] LABEL [LABEL]',
    'zh-cn': '训练 数据 [DATA] 标签 [LABEL]',
};

const MlText_TrainedClassCount = {
    'en': 'Trained Class Count',
    'zh-cn': '已训练类别数',
};

const MlText_TrainedSampleCount = {
    'en': 'Trained Samples [LABEL]',
    'zh-cn': '已训练样本数 [LABEL]',
};

const MlText_TrainedSamples = {
    'en': 'Trained Samples [LABEL]',
    'zh-cn': '已训练样本 [LABEL]',
};

const MlText_ResetClass = {
    'en': 'Reset [LABEL]',
    'zh-cn': '重置 [LABEL]',
};

const MlText_ResetAllClasses = {
    'en': 'Reset All',
    'zh-cn': '全部重置',
};

const MlText_Predict = {
    'en': 'Predict [DATA]',
    'zh-cn': '预测 [DATA]',
};

const MlText_Result = {
    'en': 'Predict Result',
    'zh-cn': '预测结果',
};

const MlText_Confidence = {
    'en': 'Predict Confidence',
    'zh-cn': '预测准确率',
};

/**
 * Class for the motion-related blocks in Scratch 3.0
 * @param {Runtime} runtime - the runtime instantiating this block package.
 * @constructor
 */
class MlText {
    constructor(runtime) {
        this.knnInit()
        /**
         * The runtime instantiating this block package.
         * @type {Runtime}
         */
        this.runtime = runtime;
        this.locale = this._setLocale();
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
    getInfo() {
        return {
            id: 'mltext',
            name: MlText_Name[this.locale],
            menuIconURI: menuIconURI,
            blockIconURI: blockIconURI,
            blocks: [
                {
                    opcode: 'trainSample',
                    blockType: BlockType.COMMAND,
                    text: MlText_TrainSample[this.locale],
                    arguments: {
                        DATA: {
                            type: ArgumentType.STRING,
                            defaultValue: ""
                        },
                        LABEL: {
                            type: ArgumentType.STRING,
                            defaultValue: ""
                        }
                    }
                },
                {
                    opcode: 'trainedClassCount',
                    blockType: BlockType.REPORTER,
                    text: MlText_TrainedClassCount[this.locale]
                },
                {
                    opcode: 'trainedSampleCount',
                    blockType: BlockType.REPORTER,
                    text: MlText_TrainedSampleCount[this.locale],
                    arguments: {
                        LABEL: {
                            type: ArgumentType.STRING,
                            defaultValue: ""
                        }
                    }
                },
                {
                    opcode: 'trainedSamples',
                    blockType: BlockType.REPORTER,
                    text: MlText_TrainedSamples[this.locale],
                    arguments: {
                        LABEL: {
                            type: ArgumentType.STRING,
                            defaultValue: ""
                        }
                    }
                },
                {
                    opcode: 'resetClass',
                    blockType: BlockType.COMMAND,
                    text: MlText_ResetClass[this.locale],
                    arguments: {
                        LABEL: {
                            type: ArgumentType.STRING,
                            defaultValue: ""
                        }
                    }
                },
                {
                    opcode: 'resetAllClasses',
                    blockType: BlockType.COMMAND,
                    text: MlText_ResetAllClasses[this.locale]
                },
                {
                    opcode: 'predict',
                    blockType: BlockType.COMMAND,
                    text: MlText_Predict[this.locale],
                    arguments: {
                        DATA: {
                            type: ArgumentType.STRING,
                            defaultValue: ''
                        }
                    }
                },
                {
                    opcode: 'getResult',
                    blockType: BlockType.REPORTER,
                    text: MlText_Result[this.locale]
                },
                {
                    opcode: 'getConfidence',
                    blockType: BlockType.REPORTER,
                    text: MlText_Confidence[this.locale]
                }
            ]
        };
    }

    trainSample(args, util) {
        var data = args.DATA.split(',');
        var label = args.LABEL;
        console.log(data);
        console.log(label);
        this.classifier.addExample(tf.tensor1d(data), label);
    }

    trainedClassCount(args, util) {
        return this.classifier.getNumClasses();
    }

    trainedSampleCount(args, util) {
        let counts = this.classifier.getClassExampleCount();
        console.log(counts);
        return counts[args.LABEL] || 0;
    }

    trainedSamples(args, util) {
        let samples = this.classifier.getClassifierDataset();
        console.log(samples);
        return samples[args.LABEL] || '';
    }

    resetClass(args, util) {
        this.classifier.clearClass(args.LABEL);
    }

    resetAllClasses(args, util) {
        this.classifier.clearAllClasses();
    }

    async predict(args, util) {
        var data = args.DATA.split(',');
        let res = await this.classifier.predictClass(tf.tensor1d(data));
        console.log(this.classifier.getClassExampleCount(), res);
        this.trainResult = res.classIndex;
        this.trainConfidence = res.confidences[res.classIndex];
    }

    getResult(args, util) {
        return IRIS_CLASS[this.locale][this.trainResult];
    }

    getConfidence(args, util) {
        return this.trainConfidence;
    }

    async knnInit () {
        this.classifier = knnClassifier.create();
    }
}

module.exports = MlText;
