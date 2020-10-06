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

const CLASSES = ['flashlight', 'belt', 'mushroom', 'pond', 'strawberry', 'pineapple', 'sun', 'cow', 'ear', 'bush', 'pliers', 'watermelon', 'apple', 'baseball', 'feather', 'shoe', 'leaf', 'lollipop', 'crown', 'ocean', 'horse', 'mountain', 'mosquito', 'mug', 'hospital', 'saw', 'castle', 'angel', 'underwear', 'traffic_light', 'cruise_ship', 'marker', 'blueberry', 'flamingo', 'face', 'hockey_stick', 'bucket', 'campfire', 'asparagus', 'skateboard', 'door', 'suitcase', 'skull', 'cloud', 'paint_can', 'hockey_puck', 'steak', 'house_plant', 'sleeping_bag', 'bench', 'snowman', 'arm', 'crayon', 'fan', 'shovel', 'leg', 'washing_machine', 'harp', 'toothbrush', 'tree', 'bear', 'rake', 'megaphone', 'knee', 'guitar', 'calculator', 'hurricane', 'grapes', 'paintbrush', 'couch', 'nose', 'square', 'wristwatch', 'penguin', 'bridge', 'octagon', 'submarine', 'screwdriver', 'rollerskates', 'ladder', 'wine_bottle', 'cake', 'bracelet', 'broom', 'yoga', 'finger', 'fish', 'line', 'truck', 'snake', 'bus', 'stitches', 'snorkel', 'shorts', 'bowtie', 'pickup_truck', 'tooth', 'snail', 'foot', 'crab', 'school_bus', 'train', 'dresser', 'sock', 'tractor', 'map', 'hedgehog', 'coffee_cup', 'computer', 'matches', 'beard', 'frog', 'crocodile', 'bathtub', 'rain', 'moon', 'bee', 'knife', 'boomerang', 'lighthouse', 'chandelier', 'jail', 'pool', 'stethoscope', 'frying_pan', 'cell_phone', 'binoculars', 'purse', 'lantern', 'birthday_cake', 'clarinet', 'palm_tree', 'aircraft_carrier', 'vase', 'eraser', 'shark', 'skyscraper', 'bicycle', 'sink', 'teapot', 'circle', 'tornado', 'bird', 'stereo', 'mouth', 'key', 'hot_dog', 'spoon', 'laptop', 'cup', 'bottlecap', 'The_Great_Wall_of_China', 'The_Mona_Lisa', 'smiley_face', 'waterslide', 'eyeglasses', 'ceiling_fan', 'lobster', 'moustache', 'carrot', 'garden', 'police_car', 'postcard', 'necklace', 'helmet', 'blackberry', 'beach', 'golf_club', 'car', 'panda', 'alarm_clock', 't-shirt', 'dog', 'bread', 'wine_glass', 'lighter', 'flower', 'bandage', 'drill', 'butterfly', 'swan', 'owl', 'raccoon', 'squiggle', 'calendar', 'giraffe', 'elephant', 'trumpet', 'rabbit', 'trombone', 'sheep', 'onion', 'church', 'flip_flops', 'spreadsheet', 'pear', 'clock', 'roller_coaster', 'parachute', 'kangaroo', 'duck', 'remote_control', 'compass', 'monkey', 'rainbow', 'tennis_racquet', 'lion', 'pencil', 'string_bean', 'oven', 'star', 'cat', 'pizza', 'soccer_ball', 'syringe', 'flying_saucer', 'eye', 'cookie', 'floor_lamp', 'mouse', 'toilet', 'toaster', 'The_Eiffel_Tower', 'airplane', 'stove', 'cello', 'stop_sign', 'tent', 'diving_board', 'light_bulb', 'hammer', 'scorpion', 'headphones', 'basket', 'spider', 'paper_clip', 'sweater', 'ice_cream', 'envelope', 'sea_turtle', 'donut', 'hat', 'hourglass', 'broccoli', 'jacket', 'backpack', 'book', 'lightning', 'drums', 'snowflake', 'radio', 'banana', 'camel', 'canoe', 'toothpaste', 'chair', 'picture_frame', 'parrot', 'sandwich', 'lipstick', 'pants', 'violin', 'brain', 'power_outlet', 'triangle', 'hamburger', 'dragon', 'bulldozer', 'cannon', 'dolphin', 'zebra', 'animal_migration', 'camouflage', 'scissors', 'basketball', 'elbow', 'umbrella', 'windmill', 'table', 'rifle', 'hexagon', 'potato', 'anvil', 'sword', 'peanut', 'axe', 'television', 'rhinoceros', 'baseball_bat', 'speedboat', 'sailboat', 'zigzag', 'garden_hose', 'river', 'house', 'pillow', 'ant', 'tiger', 'stairs', 'cooler', 'see_saw', 'piano', 'fireplace', 'popsicle', 'dumbbell', 'mailbox', 'barn', 'hot_tub', 'teddy-bear', 'fork', 'dishwasher', 'peas', 'hot_air_balloon', 'keyboard', 'microwave', 'wheel', 'fire_hydrant', 'van', 'camera', 'whale', 'candle', 'octopus', 'pig', 'swing_set', 'helicopter', 'saxophone', 'passport', 'bat', 'ambulance', 'diamond', 'goatee', 'fence', 'grass', 'mermaid', 'motorbike', 'microphone', 'toe', 'cactus', 'nail', 'telephone', 'hand', 'squirrel', 'streetlight', 'bed', 'firetruck'];

const MlGuess_Name = {
    'en': 'Draw and Guess',
    'zh-cn': '你画我猜',
};

const MlGuess_IsLoaded = {
    'en': 'is loaded',
    'zh-cn': '已加载',
};

const MlGuess_ClassCount = {
    'en': 'Class Count',
    'zh-cn': '类别数目',
};

const MlGuess_GetClassName = {
    'en': 'Class Name [STRING]',
    'zh-cn': '类别名称 [STRING]',
};

const MlGuess_Predict = {
    'en': 'Predict [IMGDATA]',
    'zh-cn': '预测图片 [IMGDATA]',
};

const MlGuess_PredictClass = {
    'en': 'predictClass',
    'zh-cn': '预测类别',
};

const MlGuess_PredictConfidence = {
    'en': 'predictConfidence',
    'zh-cn': '预测准确率',
};

const MlGuess_WhenPredict = {
    'en': 'when predict class [CLASS] confidence [CONFIDENCE]',
    'zh-cn': '当预测类别[CLASS] 准确率 [CONFIDENCE]',
};

/**
 * Class for the motion-related blocks in Scratch 3.0
 * @param {Runtime} runtime - the runtime instantiating this block package.
 * @constructor
 */
class MlGuess {
    constructor(runtime) {
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
            id: 'mlguess',
            name: MlGuess_Name[this.locale],
            menuIconURI: menuIconURI,
            blockIconURI: blockIconURI,
            blocks: [
                {
                    opcode: 'isloaded',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'mlguess.isloaded',
                        default: MlGuess_IsLoaded[this.locale],
                        description: 'knn is loaded'
                    })
                },
                {
                    opcode: 'classCount',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'mlguess.classnumber',
                        default: MlGuess_ClassCount[this.locale],
                        description: 'class number'
                    })
                },
                {
                    opcode: 'getClassName',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'mlguess.getclassname',
                        default: MlGuess_GetClassName[this.locale],
                        description: 'get class name'
                    }),
                    arguments: {
                        STRING: {
                            type: ArgumentType.STRING,
                            defaultValue: ""
                        }
                    }
                },
                {
                    opcode: 'predict',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'mlguess.predict',
                        default: MlGuess_Predict[this.locale],
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
                    opcode: 'predictClass',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'mlguess.predictclass',
                        default: MlGuess_PredictClass[this.locale],
                        description: 'predict class'
                    })
                },
                {
                    opcode: 'predictConfidence',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'mlguess.predictconfidence',
                        default: MlGuess_PredictConfidence[this.locale],
                        description: 'predict confidence'
                    })
                },
                {
                    opcode: 'whenPredict',
                    blockType: BlockType.HAT,
                    text: formatMessage({
                        id: 'mlguess.whenPredict',
                        default: MlGuess_WhenPredict[this.locale],
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
        return Boolean(this.model)
    }

    classCount(args, util) {
        return 345;
    }

    getClassName(args, util) {
        return CLASSES[args.STRING];
    }

    predict(args, util) {
        let img = new Image();
        //let img = document.createElement('img')
        img.src = args.IMGDATA;
        //img.width = 480
        //img.height = 360
        img.onload = async () => {
            const img0 = await tf.browser.toPixels(tf.browser.fromPixels(img).resizeNearestNeighbor([28, 28]));
            console.log(img0);

            let inputs = [];
            // Group data into [[[i00] [i01], [i02], [i03], ..., [i027]], .... [[i270], [i271], ... , [i2727]]]]
            let oneRow = [];
            for (let i = 0; i < 784; i++) {
                let bright = img0[i * 4];
                let onePix = [parseFloat((255 - bright) / 255)];
                oneRow.push(onePix);
                if (oneRow.length === 28) {
                    inputs.push(oneRow);
                    oneRow = [];
                }
            }
            console.log(inputs);

            const guess = this.model.predict(tf.tensor([inputs]));
            //let res = await this.classifier.predictClass(logits0);
            console.log(guess);
            // Format res to an array
            const rawProb = Array.from(guess.dataSync());
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
            this.resultClass = CLASSES[topKClassWIndex[0]['index']];
            this.resultConfidence = topKClassWIndex[0]['probability'];
            console.log(this.resultClass);
            console.log(this.resultConfidence);
            console.log(CLASSES[topKClassWIndex[1]['index']]);
            console.log(CLASSES[topKClassWIndex[2]['index']]);
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
            return false
        }
        return (this.resultClass === args.CLASS) && (this.resultConfidence > args.CONFIDENCE);
    }

    async knnInit () {
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
        ip += "/00000000-0000-0000-0000-000000015000/model/guess/model.json";
        console.log(ip);
        this.model = await tf.loadLayersModel(ip);
        console.log(this.model.summary());
    }
}

module.exports = MlGuess;
