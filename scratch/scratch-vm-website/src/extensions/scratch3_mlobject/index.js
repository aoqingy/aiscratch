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
var cocossd = require('@tensorflow-models/coco-ssd');

const CLASSES = ['person', 'bicycle', 'car', 'motorcycle', 'airplane', 'bus', 'train', 'truck', 'boat', 'traffic light', 'fire hydrant', 'stop sign', 'parking meter', 'bench', 'bird', 'cat', 'dog', 'horse', 'sheep', 'cow', 'elephant', 'bear', 'zebra', 'giraffe', 'backpack', 'umbrella', 'handbag', 'tie', 'suitcase', 'frisbee', 'skis', 'snowboard', 'sports ball', 'kite', 'baseball bat', 'baseball glove', 'skateboard', 'surfboard', 'tennis racket', 'bottle', 'wine glass', 'cup', 'fork', 'knife', 'spoon', 'bowl', 'banana', 'apple', 'sandwich', 'orange', 'broccoli', 'carrot', 'hot dog', 'pizza', 'donut', 'cake', 'chair', 'couch', 'potted plant', 'bed', 'dining table', 'toilet', 'tv', 'laptop', 'mouse', 'remote', 'keyboard', 'cell phone', 'microwave', 'oven', 'toaster', 'sink', 'refrigerator', 'book', 'clock', 'vase', 'scissors', 'teddy bear', 'hair drier', 'toothbrush'];

const MlObject_Name = {
    'en': 'Object Detection',
    'zh-cn': '物体检测',
};

const MlObject_IsLoaded = {
    'en': 'is loaded',
    'zh-cn': '已加载',
};

const MlObject_ClassCount = {
    'en': 'Class Count',
    'zh-cn': '类别数目',
};

const MlObject_GetClassName = {
    'en': 'Class Name [NUMBER]',
    'zh-cn': '类别名称 [NUMBER]',
};

const MlObject_Predict = {
    'en': 'Predict [IMGDATA]',
    'zh-cn': '预测图片 [IMGDATA]',
};

const MlObject_PredictClass0 = {
    'en': 'predictClass0',
    'zh-cn': '预测类别一',
};

const MlObject_PredictPosition0 = {
    'en': 'predictPosition0',
    'zh-cn': '预测位置一',
};

const MlObject_PredictConfidence0 = {
    'en': 'predictConfidence0',
    'zh-cn': '预测准确率一',
};

const MlObject_PredictClass1 = {
    'en': 'predictClass1',
    'zh-cn': '预测类别二',
};

const MlObject_PredictPosition1 = {
    'en': 'predictPosition1',
    'zh-cn': '预测位置二',
};

const MlObject_PredictConfidence1 = {
    'en': 'predictConfidence1',
    'zh-cn': '预测准确率二',
};

const MlObject_PredictClass2 = {
    'en': 'predictClass2',
    'zh-cn': '预测类别三',
};

const MlObject_PredictPosition2 = {
    'en': 'predictPosition2',
    'zh-cn': '预测位置三',
};

const MlObject_PredictConfidence2 = {
    'en': 'predictConfidence2',
    'zh-cn': '预测准确率三',
};

const MlObject_getX = {
    'en': 'X [STRING]',
    'zh-cn': '横坐标 [STRING]',
};

const MlObject_getY = {
    'en': 'Y [STRING]',
    'zh-cn': '纵坐标 [STRING]',
};

const MlObject_getW = {
    'en': 'W [STRING]',
    'zh-cn': '宽度 [STRING]',
};

const MlObject_getH = {
    'en': 'H [STRING]',
    'zh-cn': '高度 [STRING]',
};

const MlObject_whenFinished = {
    'en': 'When finished',
    'zh-cn': '当预测完成',
}

/**
 * Class for the motion-related blocks in Scratch 3.0
 * @param {Runtime} runtime - the runtime instantiating this block package.
 * @constructor
 */
class MlObject {
    constructor(runtime) {
        this.mlInit()
        /**
         * The runtime instantiating this block package.
         * @type {Runtime}
         */
        this.runtime = runtime;
        this.locale = this._setLocale();
        this.finished = false;
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
            id: 'mlobject',
            name: MlObject_Name[this.locale],
            menuIconURI: menuIconURI,
            blockIconURI: blockIconURI,
            blocks: [
                {
                    opcode: 'isloaded',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'mlobject.isloaded',
                        default: MlObject_IsLoaded[this.locale],
                        description: 'knn is loaded'
                    })
                },
                {
                    opcode: 'classCount',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'mlobject.classnumber',
                        default: MlObject_ClassCount[this.locale],
                        description: 'class number'
                    })
                },
                {
                    opcode: 'getClassName',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'mlobject.getclassname',
                        default: MlObject_GetClassName[this.locale],
                        description: 'get class name'
                    }),
                    arguments: {
                        NUMBER: {
                            type: ArgumentType.NUMBER,
                            defaultValue: '0'
                        }
                    }
                },
                {
                    opcode: 'predict',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'mlobject.predict',
                        default: MlObject_Predict[this.locale],
                        description: 'predict'
                    }),
                    arguments: {
                        IMGDATA: {
                            type: ArgumentType.STRING,
                            defaultValue: ""
                        }
                    }
                },
                {
                    opcode: 'predictClass0',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'mlobject.predictclass0',
                        default: MlObject_PredictClass0[this.locale],
                        description: 'predict class 0'
                    })
                },
                {
                    opcode: 'predictPosition0',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'mlobject.predictposition0',
                        default: MlObject_PredictPosition0[this.locale],
                        description: 'predict position 0'
                    })
                },
                {
                    opcode: 'predictConfidence0',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'mlobject.predictconfidence0',
                        default: MlObject_PredictConfidence0[this.locale],
                        description: 'predict confidence 0'
                    })
                },
                {
                    opcode: 'predictClass1',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'mlobject.predictclass1',
                        default: MlObject_PredictClass1[this.locale],
                        description: 'predict class 1'
                    })
                },
                {
                    opcode: 'predictPosition1',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'mlobject.predictposition1',
                        default: MlObject_PredictPosition1[this.locale],
                        description: 'predict position 1'
                    })
                },
                {
                    opcode: 'predictConfidence1',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'mlobject.predictconfidence1',
                        default: MlObject_PredictConfidence1[this.locale],
                        description: 'predict confidence 1'
                    })
                },                {
                    opcode: 'predictClass2',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'mlobject.predictclass2',
                        default: MlObject_PredictClass2[this.locale],
                        description: 'predict class 2'
                    })
                },
                {
                    opcode: 'predictPosition2',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'mlobject.predictposition2',
                        default: MlObject_PredictPosition2[this.locale],
                        description: 'predict position 2'
                    })
                },
                {
                    opcode: 'predictConfidence2',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'mlobject.predictconfidence2',
                        default: MlObject_PredictConfidence2[this.locale],
                        description: 'predict confidence 2'
                    })
                },                {
                    opcode: 'getX',
                    blockType: BlockType.REPORTER,
                    text: MlObject_getX[this.locale],
                    arguments: {
                        STRING: {
                            type: ArgumentType.STRING,
                            defaultValue: "0,0,0,0"
                        }
                    }
                },
                {
                    opcode: 'getY',
                    blockType: BlockType.REPORTER,
                    text: MlObject_getY[this.locale],
                    arguments: {
                        STRING: {
                            type: ArgumentType.STRING,
                            defaultValue: "0,0,0,0"
                        }
                    }
                },
                {
                    opcode: 'getW',
                    blockType: BlockType.REPORTER,
                    text: MlObject_getW[this.locale],
                    arguments: {
                        STRING: {
                            type: ArgumentType.STRING,
                            defaultValue: "0,0,0,0"
                        }
                    }
                },
                {
                    opcode: 'getH',
                    blockType: BlockType.REPORTER,
                    text: MlObject_getH[this.locale],
                    arguments: {
                        STRING: {
                            type: ArgumentType.STRING,
                            defaultValue: "0,0,0,0"
                        }
                    }
                },
                {
                    opcode: 'whenFinished',
                    blockType: BlockType.HAT,
                    text: MlObject_whenFinished[this.locale]
                }
            ]
        };
    }

    isloaded() {
        return Boolean(this.model)
    }

    classCount(args, util) {
        return 80;
    }

    getClassName(args, util) {
        return CLASSES[args.NUMBER];
    }

    predict(args, util) {
        let img = new Image();
        img.src = args.IMGDATA;
        img.onload = async () => {
            this.IMAGE_WIDTH = img.width;
            this.IMAGE_HEIGHT = img.height;

            this.resultClass0 = '';
            this.resultPosition0 = '';
            this.resultConfidence0 = '';
            this.resultClass1 = '';
            this.resultPosition1 = '';
            this.resultConfidence1 = '';
            this.resultClass2 = '';
            this.resultPosition2 = '';
            this.resultConfidence2 = '';

            const result = await this.model.detect(img);
            console.log(result);

            const rawProb = Array.from(result);
            // Get top K res with index and probability
            const rawProbWIndex = rawProb.map((probability, index) => {
                return {index, probability}
            });
            const sortProb = rawProbWIndex.sort((a, b) => b.probability - a.probability);
            const topKClassWIndex = sortProb.slice(0, 3);
            console.log(topKClassWIndex);
            if (result.length > 0) {
                this.resultClass0 = topKClassWIndex[0]['probability']['class'];
                //this.resultPosition0 = topKClassWIndex[0]['probability']['bbox'].join();
                var x0 = parseInt(topKClassWIndex[0]['probability']['bbox'][0]);
                var y0 = parseInt(topKClassWIndex[0]['probability']['bbox'][1]);
                var w0 = parseInt(topKClassWIndex[0]['probability']['bbox'][2]);
                var h0 = parseInt(topKClassWIndex[0]['probability']['bbox'][3]);
                x0 = parseInt(x0 * 480 / this.IMAGE_WIDTH) - 240;
                y0 = 180 - parseInt(y0 * 360 / this.IMAGE_HEIGHT);
                w0 = parseInt(w0 * 480 / this.IMAGE_WIDTH);
                h0 = parseInt(h0 * 360 / this.IMAGE_HEIGHT);
                this.resultPosition0 = Cast.toString(x0) + ',' + Cast.toString(y0) + ',' + Cast.toString(w0) + ',' + Cast.toString(h0);
                this.resultConfidence0 = topKClassWIndex[0]['probability']['score'].toFixed(2);
            }
            if (result.length > 1) {
                this.resultClass1 = topKClassWIndex[1]['probability']['class'];
                //this.resultPosition1 = topKClassWIndex[1]['probability']['bbox'].join();
                var x1 = parseInt(topKClassWIndex[1]['probability']['bbox'][0]);
                var y1 = parseInt(topKClassWIndex[1]['probability']['bbox'][1]);
                var w1 = parseInt(topKClassWIndex[1]['probability']['bbox'][2]);
                var h1 = parseInt(topKClassWIndex[1]['probability']['bbox'][3]);
                x1 = parseInt(x1 * 480 / this.IMAGE_WIDTH) - 240;
                y1 = 180 - parseInt(y1 * 360 / this.IMAGE_HEIGHT);
                w1 = parseInt(w1 * 480 / this.IMAGE_WIDTH);
                h1 = parseInt(h1 * 360 / this.IMAGE_HEIGHT);
                this.resultPosition1 = Cast.toString(x1) + ',' + Cast.toString(y1) + ',' + Cast.toString(w1) + ',' + Cast.toString(h1);
                this.resultConfidence1 = topKClassWIndex[1]['probability']['score'].toFixed(2);
            }
            if (result.length > 2) {
                this.resultClass2 = topKClassWIndex[2]['probability']['class'];
                //this.resultPosition2 = topKClassWIndex[2]['probability']['bbox'].join();
                var x2 = parseInt(topKClassWIndex[2]['probability']['bbox'][0]);
                var y2 = parseInt(topKClassWIndex[2]['probability']['bbox'][1]);
                var w2 = parseInt(topKClassWIndex[2]['probability']['bbox'][2]);
                var h2 = parseInt(topKClassWIndex[2]['probability']['bbox'][3]);
                x2 = parseInt(x2 * 480 / this.IMAGE_WIDTH) - 240;
                y2 = 180 - parseInt(y2 * 360 / this.IMAGE_HEIGHT);
                w2 = parseInt(w2 * 480 / this.IMAGE_WIDTH);
                h2 = parseInt(h2 * 360 / this.IMAGE_HEIGHT);
                this.resultPosition2 = Cast.toString(x2) + ',' + Cast.toString(y2) + ',' + Cast.toString(w2) + ',' + Cast.toString(h2);
                this.resultConfidence2 = topKClassWIndex[2]['probability']['score'].toFixed(2);
            }
            this.finished = true;
        }
    }

    predictClass0(args, util) {
        return this.resultClass0;
    }

    predictPosition0(args, util) {
        return this.resultPosition0;
    }

    predictConfidence0(args, util) {
        return this.resultConfidence0;
    }

    predictClass1(args, util) {
        return this.resultClass1;
    }

    predictPosition1(args, util) {
        return this.resultPosition1;
    }

    predictConfidence1(args, util) {
        return this.resultConfidence1;
    }

    predictClass2(args, util) {
        return this.resultClass2;
    }

    predictPosition2(args, util) {
        return this.resultPosition2;
    }

    predictConfidence2(args, util) {
        return this.resultConfidence2;
    }

    getX(args, util) {
        if (args.STRING === '') return '';
        var a = args.STRING.split(',');
        return parseInt(a[0]);
    }

    getY(args, util) {
        if (args.STRING === '') return '';
        var a = args.STRING.split(',');
        return parseInt(a[1]);
    }

    getW(args, util) {
        if (args.STRING === '') return '';
        var a = args.STRING.split(',');
        return parseInt(a[2]);
    }

    getH(args, util) {
        if (args.STRING === '') return '';
        var a = args.STRING.split(',');
        return parseInt(a[3]);
    }

    whenFinished(args, util) {
        setTimeout(() => {
            this.finished = false;
        }, 100);                        //HAT_TIMEOUT
        return this.finished === true;
    }

    async mlInit () {
        var ip = null;
        var ipformat = /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;
        if (window && window.location && window.location.host) {
            if (window.location.host.match(ipformat)) {             //For DeepCar (aoqingy)
                ip = "https://" + window.location.host;
            } else {                                                //For Cloud (aoqingy)
                var dnarr = window.location.host.split('.');
                dnarr[0] = 'api';
                ip = "https://" + dnarr.join('.');
            }
        } else {
            ip = "https://api.aiscratch.online";             //aoqingy
        }
        ip += "/00000000-0000-0000-0000-000000015000/model/object/model.json";
        console.log(ip);
        this.model = await cocossd.load({modelUrl: ip});
        console.log(this.model);
    }
}

module.exports = MlObject;
