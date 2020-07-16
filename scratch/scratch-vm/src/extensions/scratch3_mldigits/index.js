require('babel-polyfill');
const Runtime = require('../../engine/runtime');

const menuIconURI = "data:image/png;base64,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";
const blockIconURI = menuIconURI;

const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Base64Util = require('../../util/base64-util');
const Clone = require('../../util/clone');
const Cast = require('../../util/cast');
const Video = require('../../io/video');
const formatMessage = require('format-message');
//import * as tf from '@tensorflow/tfjs';
const SvgRenderer = require('scratch-svg-renderer');

var tf = require('@tensorflow/tfjs');

const MlDigits_Name = {
    'en': 'Digital Recognition',
    'zh-cn': '数字识别',
}

const MlDigits_IsLoaded = {
    'en': 'is loaded',
    'zh-cn': '已加载',
};

const MlDigits_ClassCount = {
    'en': 'Class Count',
    'zh-cn': '类别数目',
};

const MlDigits_Predict = {
    'en': 'Predict [IMGDATA]',
    'zh-cn': '预测图片 [IMGDATA]',
};

const MlDigits_PredictClass = {
    'en': 'predictClass',
    'zh-cn': '预测类别',
};

const MlDigits_PredictConfidence = {
    'en': 'predictConfidence',
    'zh-cn': '预测准确率',
};

const MlDigits_WhenPredict = {
    'en': 'when predict class [CLASS] confidence [CONFIDENCE]',
    'zh-cn': '当预测类别 [CLASS] 准确率 [CONFIDENCE]',
};

/**
 * Class for the motion-related blocks in Scratch 3.0
 * @param {Runtime} runtime - the runtime instantiating this block package.
 * @constructor
 */
class MlDigits {
    constructor(runtime) {
        this.knn = null

        this.knnInit()
        /**
         * The runtime instantiating this block package.
         * @type {Runtime}
         */
        this.runtime = runtime;
        this.locale = this._setLocale();
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
    _buildMenu(info) {
        return info.map((entry, index) => {
            const obj = {};
            obj.text = entry.name;
            obj.value = entry.value || String(index + 1);
            return obj;
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
    getInfo() {
        return {
            id: 'mldigits',
            name: MlDigits_Name[this.locale],
            menuIconURI: menuIconURI,
            blockIconURI: blockIconURI,
            blocks: [
                {
                    opcode: 'isloaded',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'mldigits.isloaded',
                        default: MlDigits_IsLoaded[this.locale],
                        description: 'Model is loaded'
                    })
                },
                {
                    opcode: 'classCount',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'mldigits.classnumber',
                        default: MlDigits_ClassCount[this.locale],
                        description: 'class number'
                    })
                },
                {
                    opcode: 'predict',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'mldigits.predict',
                        default: MlDigits_Predict[this.locale],
                        description: 'predict'
                    }),
                    arguments: {
                        IMGDATA: {
                            type: ArgumentType.STRING,
                            defaultValue: ''
                        }
                    }
                },
                {
                    opcode: 'predictClass',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'mldigits.predictclass',
                        default: MlDigits_PredictClass[this.locale],
                        description: 'predict class'
                    })
                },
                {
                    opcode: 'predictConfidence',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'mldigits.predictconfidence',
                        default: MlDigits_PredictConfidence[this.locale],
                        description: 'predict confidence'
                    })
                },
                {
                    opcode: 'whenPredict',
                    blockType: BlockType.HAT,
                    text: formatMessage({
                        id: 'mldigits.whenPredict',
                        default: MlDigits_WhenPredict[this.locale],
                        description: 'whenPredict'
                    }),
                    arguments: {
                        CLASS: {
                            type: ArgumentType.STRING,
                            defaultValue: ""
                        },
                        CONFIDENCE: {
                            type: ArgumentType.STRING,
                            defaultValue: ""
                        }
                    }
                }
            ]
        };
    }

    isloaded() {
        return Boolean(this.model);
    }

    classCount(args, util) {
        return 10;
    }

    predict(args, util) {
        let img = new Image();
        //img.src = this.runtime.ioDevices.video.getFrame({
        //    format: Video.FORMAT_CANVAS,
        //    dimensions: [480, 360]
        //}).toDataURL("image/png")
        img.src = args.IMGDATA;
        img.onload = async () => {
            let tensor = tf.browser.fromPixels(img)
            .resizeNearestNeighbor([28, 28])
            .mean(2)
            .expandDims(2)
            .expandDims()
            .toFloat()
            .div(255.0);
            console.log(tensor);
        
            const guess = await this.model.predict(tensor);

            // Format res to an array
            const rawProb = Array.from(guess.dataSync());
            console.log(rawProb);
            
            // Get top K res with index and probability
            const rawProbWIndex = rawProb.map((probability, index) => {
                return {
                    index,
                    probability
                }
            });
            const sortProb = rawProbWIndex.sort((a, b) => b.probability - a.probability);
            const topKClassWIndex = sortProb.slice(0, 3);
            console.log(topKClassWIndex);
            this.resultClass = topKClassWIndex[0]['index'];
            this.resultConfidence = topKClassWIndex[0]['probability'];
            console.log(this.resultClass);
            console.log(this.resultConfidence);
        }
    }

    predictClass(args, util) {
        return this.resultClass;
    }

    predictConfidence(args, util) {
        return this.resultConfidence;
    }

    whenPredict(args, util) {
        if (this.resultClass === undefined || this.resultConfidence === undefined) {
            return false;
        }
        return (this.resultClass === args.CLASS) && (this.resultConfidence > args.CONFIDENCE);
    }

    async knnInit () {
        this.model = await tf.loadLayersModel("/00000000-0000-0000-0000-000000015000/model/digits/model.json");
        console.log(this.model.summary());
    }
}

module.exports = MlDigits;
