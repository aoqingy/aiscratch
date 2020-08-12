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

const IRIS_DATA = [
  [5.1, 3.5, 1.4, 0.2, 0], [4.9, 3.0, 1.4, 0.2, 0], [4.7, 3.2, 1.3, 0.2, 0],
  [4.6, 3.1, 1.5, 0.2, 0], [5.0, 3.6, 1.4, 0.2, 0], [5.4, 3.9, 1.7, 0.4, 0],
  [4.6, 3.4, 1.4, 0.3, 0], [5.0, 3.4, 1.5, 0.2, 0], [4.4, 2.9, 1.4, 0.2, 0],
  [4.9, 3.1, 1.5, 0.1, 0], [5.4, 3.7, 1.5, 0.2, 0], [4.8, 3.4, 1.6, 0.2, 0],
  [4.8, 3.0, 1.4, 0.1, 0], [4.3, 3.0, 1.1, 0.1, 0], [5.8, 4.0, 1.2, 0.2, 0],
  [5.7, 4.4, 1.5, 0.4, 0], [5.4, 3.9, 1.3, 0.4, 0], [5.1, 3.5, 1.4, 0.3, 0],
  [5.7, 3.8, 1.7, 0.3, 0], [5.1, 3.8, 1.5, 0.3, 0], [5.4, 3.4, 1.7, 0.2, 0],
  [5.1, 3.7, 1.5, 0.4, 0], [4.6, 3.6, 1.0, 0.2, 0], [5.1, 3.3, 1.7, 0.5, 0],
  [4.8, 3.4, 1.9, 0.2, 0], [5.0, 3.0, 1.6, 0.2, 0], [5.0, 3.4, 1.6, 0.4, 0],
  [5.2, 3.5, 1.5, 0.2, 0], [5.2, 3.4, 1.4, 0.2, 0], [4.7, 3.2, 1.6, 0.2, 0],
  [4.8, 3.1, 1.6, 0.2, 0], [5.4, 3.4, 1.5, 0.4, 0], [5.2, 4.1, 1.5, 0.1, 0],
  [5.5, 4.2, 1.4, 0.2, 0], [4.9, 3.1, 1.5, 0.1, 0], [5.0, 3.2, 1.2, 0.2, 0],
  [5.5, 3.5, 1.3, 0.2, 0], [4.9, 3.1, 1.5, 0.1, 0], [4.4, 3.0, 1.3, 0.2, 0],
  [5.1, 3.4, 1.5, 0.2, 0], [5.0, 3.5, 1.3, 0.3, 0], [4.5, 2.3, 1.3, 0.3, 0],
  [4.4, 3.2, 1.3, 0.2, 0], [5.0, 3.5, 1.6, 0.6, 0], [5.1, 3.8, 1.9, 0.4, 0],
  [4.8, 3.0, 1.4, 0.3, 0], [5.1, 3.8, 1.6, 0.2, 0], [4.6, 3.2, 1.4, 0.2, 0],
  [5.3, 3.7, 1.5, 0.2, 0], [5.0, 3.3, 1.4, 0.2, 0], [7.0, 3.2, 4.7, 1.4, 1],
  [6.4, 3.2, 4.5, 1.5, 1], [6.9, 3.1, 4.9, 1.5, 1], [5.5, 2.3, 4.0, 1.3, 1],
  [6.5, 2.8, 4.6, 1.5, 1], [5.7, 2.8, 4.5, 1.3, 1], [6.3, 3.3, 4.7, 1.6, 1],
  [4.9, 2.4, 3.3, 1.0, 1], [6.6, 2.9, 4.6, 1.3, 1], [5.2, 2.7, 3.9, 1.4, 1],
  [5.0, 2.0, 3.5, 1.0, 1], [5.9, 3.0, 4.2, 1.5, 1], [6.0, 2.2, 4.0, 1.0, 1],
  [6.1, 2.9, 4.7, 1.4, 1], [5.6, 2.9, 3.6, 1.3, 1], [6.7, 3.1, 4.4, 1.4, 1],
  [5.6, 3.0, 4.5, 1.5, 1], [5.8, 2.7, 4.1, 1.0, 1], [6.2, 2.2, 4.5, 1.5, 1],
  [5.6, 2.5, 3.9, 1.1, 1], [5.9, 3.2, 4.8, 1.8, 1], [6.1, 2.8, 4.0, 1.3, 1],
  [6.3, 2.5, 4.9, 1.5, 1], [6.1, 2.8, 4.7, 1.2, 1], [6.4, 2.9, 4.3, 1.3, 1],
  [6.6, 3.0, 4.4, 1.4, 1], [6.8, 2.8, 4.8, 1.4, 1], [6.7, 3.0, 5.0, 1.7, 1],
  [6.0, 2.9, 4.5, 1.5, 1], [5.7, 2.6, 3.5, 1.0, 1], [5.5, 2.4, 3.8, 1.1, 1],
  [5.5, 2.4, 3.7, 1.0, 1], [5.8, 2.7, 3.9, 1.2, 1], [6.0, 2.7, 5.1, 1.6, 1],
  [5.4, 3.0, 4.5, 1.5, 1], [6.0, 3.4, 4.5, 1.6, 1], [6.7, 3.1, 4.7, 1.5, 1],
  [6.3, 2.3, 4.4, 1.3, 1], [5.6, 3.0, 4.1, 1.3, 1], [5.5, 2.5, 4.0, 1.3, 1],
  [5.5, 2.6, 4.4, 1.2, 1], [6.1, 3.0, 4.6, 1.4, 1], [5.8, 2.6, 4.0, 1.2, 1],
  [5.0, 2.3, 3.3, 1.0, 1], [5.6, 2.7, 4.2, 1.3, 1], [5.7, 3.0, 4.2, 1.2, 1],
  [5.7, 2.9, 4.2, 1.3, 1], [6.2, 2.9, 4.3, 1.3, 1], [5.1, 2.5, 3.0, 1.1, 1],
  [5.7, 2.8, 4.1, 1.3, 1], [6.3, 3.3, 6.0, 2.5, 2], [5.8, 2.7, 5.1, 1.9, 2],
  [7.1, 3.0, 5.9, 2.1, 2], [6.3, 2.9, 5.6, 1.8, 2], [6.5, 3.0, 5.8, 2.2, 2],
  [7.6, 3.0, 6.6, 2.1, 2], [4.9, 2.5, 4.5, 1.7, 2], [7.3, 2.9, 6.3, 1.8, 2],
  [6.7, 2.5, 5.8, 1.8, 2], [7.2, 3.6, 6.1, 2.5, 2], [6.5, 3.2, 5.1, 2.0, 2],
  [6.4, 2.7, 5.3, 1.9, 2], [6.8, 3.0, 5.5, 2.1, 2], [5.7, 2.5, 5.0, 2.0, 2],
  [5.8, 2.8, 5.1, 2.4, 2], [6.4, 3.2, 5.3, 2.3, 2], [6.5, 3.0, 5.5, 1.8, 2],
  [7.7, 3.8, 6.7, 2.2, 2], [7.7, 2.6, 6.9, 2.3, 2], [6.0, 2.2, 5.0, 1.5, 2],
  [6.9, 3.2, 5.7, 2.3, 2], [5.6, 2.8, 4.9, 2.0, 2], [7.7, 2.8, 6.7, 2.0, 2],
  [6.3, 2.7, 4.9, 1.8, 2], [6.7, 3.3, 5.7, 2.1, 2], [7.2, 3.2, 6.0, 1.8, 2],
  [6.2, 2.8, 4.8, 1.8, 2], [6.1, 3.0, 4.9, 1.8, 2], [6.4, 2.8, 5.6, 2.1, 2],
  [7.2, 3.0, 5.8, 1.6, 2], [7.4, 2.8, 6.1, 1.9, 2], [7.9, 3.8, 6.4, 2.0, 2],
  [6.4, 2.8, 5.6, 2.2, 2], [6.3, 2.8, 5.1, 1.5, 2], [6.1, 2.6, 5.6, 1.4, 2],
  [7.7, 3.0, 6.1, 2.3, 2], [6.3, 3.4, 5.6, 2.4, 2], [6.4, 3.1, 5.5, 1.8, 2],
  [6.0, 3.0, 4.8, 1.8, 2], [6.9, 3.1, 5.4, 2.1, 2], [6.7, 3.1, 5.6, 2.4, 2],
  [6.9, 3.1, 5.1, 2.3, 2], [5.8, 2.7, 5.1, 1.9, 2], [6.8, 3.2, 5.9, 2.3, 2],
  [6.7, 3.3, 5.7, 2.5, 2], [6.7, 3.0, 5.2, 2.3, 2], [6.3, 2.5, 5.0, 1.9, 2],
  [6.5, 3.0, 5.2, 2.0, 2], [6.2, 3.4, 5.4, 2.3, 2], [5.9, 3.0, 5.1, 1.8, 2],
];

const IRIS_CLASS = {
    'en': ['Setosa', 'Versicolour', 'Virginica'],
    'zh-cn': ['山鸢尾', '变色鸢尾', '维吉尼亚鸢尾'],
};

const MlIris_Name = {
    'en': 'Iris Prediction',
    'zh-cn': '鸢尾花预测',
};

const MlIris_ClassCount = {
    'en': 'Class Count',
    'zh-cn': '类别数目',
};

const MlIris_ClassName = {
    'en': 'Class Name [NUMBER]',
    'zh-cn': '类别名称 [NUMBER]',
};

const MlIris_SampleCount = {
    'en': 'Sample Count',
    'zh-cn': '样本数目',
};

const MlIris_GetSample = {
    'en': 'Sample Data [NUMBER]',
    'zh-cn': '样本数据 [NUMBER]',
};

const MlIris_SepalLength = {
    'en': 'Sepal Length [DATA]',
    'zh-cn': '花萼长度 [DATA]',
};

const MlIris_SepalWidth = {
    'en': 'Sepal Width [DATA]',
    'zh-cn': '花萼宽度 [DATA]',
};

const MlIris_PetalLength = {
    'en': 'Petal Length [DATA]',
    'zh-cn': '花瓣长度 [DATA]',
};

const MlIris_PetalWidth = {
    'en': 'Petal Width [DATA]',
    'zh-cn': '花瓣宽度 [DATA]',
};

const MlIris_Label = {
    'en': 'Label [DATA]',
    'zh-cn': '标签 [DATA]',
};

const MlIris_TrainSample = {
    'en': 'Train Sample [STRING]',
    'zh-cn': '训练样本 [STRING]',
};

const MlIris_TrainedSampleCount = {
    'en': 'Trained Samples [STRING]',
    'zh-cn': '已训练样本数 [STRING]',
};

const MlIris_Reset = {
    'en': 'Reset [STRING]',
    'zh-cn': '重置 [STRING]',
};

const MlIris_Predict = {
    'en': 'Predict [X] [Y] [W] [H]',
    'zh-cn': '预测 [X] [Y] [W] [H]',
};

const MlIris_PredictClass = {
    'en': 'Predict Class',
    'zh-cn': '预测类别',
};

const MlIris_PredictConfidence = {
    'en': 'Predict Confidence',
    'zh-cn': '预测准确率',
};

/**
 * Class for the motion-related blocks in Scratch 3.0
 * @param {Runtime} runtime - the runtime instantiating this block package.
 * @constructor
 */
class MlIris {
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
            id: 'mliris',
            name: MlIris_Name[this.locale],
            menuIconURI: menuIconURI,
            blockIconURI: blockIconURI,
            blocks: [
                {
                    opcode: 'classCount',
                    blockType: BlockType.REPORTER,
                    text: MlIris_ClassCount[this.locale]
                },
                {
                    opcode: 'className',
                    blockType: BlockType.REPORTER,
                    text: MlIris_ClassName[this.locale],
                    arguments: {
                        NUMBER: {
                            type: ArgumentType.NUMBER,
                            defaultValue: ""
                        }
                    }
                },
                {
                    opcode: 'sampleCount',
                    blockType: BlockType.REPORTER,
                    text: MlIris_SampleCount[this.locale]
                },
                {
                    opcode: 'getSample',
                    blockType: BlockType.REPORTER,
                    text: MlIris_GetSample[this.locale],
                    arguments: {
                        NUMBER: {
                            type: ArgumentType.NUMBER,
                            defaultValue: ""
                        }
                    }
                },
                {
                    opcode: 'sepalLength',
                    blockType: BlockType.REPORTER,
                    text: MlIris_SepalLength[this.locale],
                    arguments: {
                        DATA: {
                            type: ArgumentType.STRING,
                            defaultValue: ""
                        }
                    }
                },
                {
                    opcode: 'sepalWidth',
                    blockType: BlockType.REPORTER,
                    text: MlIris_SepalWidth[this.locale],
                    arguments: {
                        DATA: {
                            type: ArgumentType.STRING,
                            defaultValue: ""
                        }
                    }
                },
                {
                    opcode: 'petalLength',
                    blockType: BlockType.REPORTER,
                    text: MlIris_PetalLength[this.locale],
                    arguments: {
                        DATA: {
                            type: ArgumentType.STRING,
                            defaultValue: ""
                        }
                    }
                },
                {
                    opcode: 'petalWidth',
                    blockType: BlockType.REPORTER,
                    text: MlIris_PetalWidth[this.locale],
                    arguments: {
                        DATA: {
                            type: ArgumentType.STRING,
                            defaultValue: ""
                        }
                    }
                },
                {
                    opcode: 'label',
                    blockType: BlockType.REPORTER,
                    text: MlIris_Label[this.locale],
                    arguments: {
                        DATA: {
                            type: ArgumentType.STRING,
                            defaultValue: ""
                        }
                    }
                },
                {
                    opcode: 'trainSample',
                    blockType: BlockType.COMMAND,
                    text: MlIris_TrainSample[this.locale],
                    arguments: {
                        STRING: {
                            type: ArgumentType.STRING,
                            defaultValue: ""
                        }
                    }
                },
                {
                    opcode: 'trainedSampleCount',
                    blockType: BlockType.REPORTER,
                    text: MlIris_TrainedSampleCount[this.locale],
                    arguments: {
                        STRING: {
                            type: ArgumentType.STRING,
                            defaultValue: "0"
                        }
                    }
                },
                {
                    opcode: 'resetTrain',
                    blockType: BlockType.COMMAND,
                    text: MlIris_Reset[this.locale],
                    arguments: {
                        STRING: {
                            type: ArgumentType.STRING,
                            defaultValue: "0"
                        }
                    }
                },
                {
                    opcode: 'predict',
                    blockType: BlockType.COMMAND,
                    text: MlIris_Predict[this.locale],
                    arguments: {
                        X: {
                            type: ArgumentType.NUMBER,
                            defaultValue: ''
                        },
                        Y: {
                            type: ArgumentType.NUMBER,
                            defaultValue: ''
                        },
                        W: {
                            type: ArgumentType.NUMBER,
                            defaultValue: ''
                        },
                        H: {
                            type: ArgumentType.NUMBER,
                            defaultValue: ''
                        }
                    }
                },
                {
                    opcode: 'predictClass',
                    blockType: BlockType.REPORTER,
                    text: MlIris_PredictClass[this.locale]
                },
                {
                    opcode: 'predictConfidence',
                    blockType: BlockType.REPORTER,
                    text: MlIris_PredictConfidence[this.locale]
                }
            ]
        };
    }

    classCount(args, util) {
        return 3;
    }

    className(args, util) {
        return IRIS_CLASS[this.locale][args.NUMBER];
    }

    sampleCount(args, util) {
        return 150;
    }

    getSample(args, util) {
        return IRIS_DATA[args.NUMBER];
    }

    sepalLength(args, util) {
        console.log(args.DATA);
        return args.DATA[0];
    }

    sepalWidth(args, util) {
        return args.DATA[1];
    }

    petalLength(args, util) {
        return args.DATA[2];
    }

    petalWidth(args, util) {
        return args.DATA[3];
    }

    label(args, util) {
        return args.DATA[4];
    }

    trainSample(args, util) {
        var data = args.STRING;
        var input = [data[0], data[1], data[2], data[3]];
        var label = data[4];
        console.log(input);
        console.log(label);
        this.classifier.addExample(tf.tensor1d(input), label);
    }

    trainedSampleCount(args, util) {
        let counts = this.classifier.getClassExampleCount();
        console.log(counts);
        return counts[args.STRING] || 0
    }
    
    resetTrain(args, util) {
        let counts = this.classifier.getClassExampleCount();
        let index = args.STRING;
        if (counts[index]) {
            this.classifier.clearClass(index);
        }
    }

    async predict(args, util) {
        var input = [Cast.toNumber(args.X), Cast.toNumber(args.Y), Cast.toNumber(args.W), Cast.toNumber(args.H)];
        let res = await this.classifier.predictClass(tf.tensor1d(input));
        this.resultClass = res.classIndex;
        this.resultConfidence = res.confidences[res.classIndex];
    }

    predictClass(args, util) {
        return this.resultClass;
    }

    predictConfidence(args, util) {
        return this.resultConfidence;
    }

    async knnInit () {
        this.classifier = knnClassifier.create();
    }
}

module.exports = MlIris;
