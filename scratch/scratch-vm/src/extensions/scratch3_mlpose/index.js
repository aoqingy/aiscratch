require('babel-polyfill');
const Runtime = require('../../engine/runtime');

const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Base64Util = require('../../util/base64-util');
const Clone = require('../../util/clone');
const Cast = require('../../util/cast');
const formatMessage = require('format-message');

const menuIconURI = "data:image/png;base64,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";
const blockIconURI = menuIconURI;

var tf = require('@tensorflow/tfjs');
var posenet = require('@tensorflow-models/posenet');


const MlPose_Name = {
    'en': 'Pose Detection',
    'zh-cn': '姿态检测',
};

const MlPose_IsLoaded = {
    'en': 'Is Loaded',
    'zh-cn': '已加载',
};

const MlPose_Detect = {
    'en': 'Detect Pose [IMGDATA]',
    'zh-cn': '检测姿态 [IMGDATA]',
};

const MlPose_getNose = {
    'en': 'Nose',
    'zh-cn': '鼻子',
};

const MlPose_getLeftEye = {
    'en': 'Left Eye',
    'zh-cn': '左眼',
};

const MlPose_getRightEye = {
    'en': 'Right Eye',
    'zh-cn': '右眼',
};

const MlPose_getLeftEar = {
    'en': 'Left Ear',
    'zh-cn': '左耳',
};

const MlPose_getRightEar = {
    'en': 'Right Ear',
    'zh-cn': '右耳',
};

const MlPose_getLeftShoulder = {
    'en': 'Left Shoulder',
    'zh-cn': '左肩',
};

const MlPose_getRightShoulder = {
    'en': 'Right Shoulder',
    'zh-cn': '右肩',
};

const MlPose_getLeftElbow = {
    'en': 'Left Elbow',
    'zh-cn': '左肘',
};

const MlPose_getRightElbow = {
    'en': 'Right Elbow',
    'zh-cn': '右肘',
};

const MlPose_getLeftWrist = {
    'en': 'Left Wrist',
    'zh-cn': '左腕',
};

const MlPose_getRightWrist = {
    'en': 'Right Wrist',
    'zh-cn': '右腕',
};

const MlPose_getLeftHip = {
    'en': 'Left Hip',
    'zh-cn': '左髋',
};

const MlPose_getRightHip = {
    'en': 'Right Hip',
    'zh-cn': '右髋',
};

const MlPose_getLeftKnee = {
    'en': 'Left Knee',
    'zh-cn': '左膝',
};

const MlPose_getRightKnee = {
    'en': 'Right Knee',
    'zh-cn': '右膝',
};

const MlPose_getLeftAnkle = {
    'en': 'Left Ankle',
    'zh-cn': '左踝',
};

const MlPose_getRightAnkle = {
    'en': 'Right Ankle',
    'zh-cn': '右踝',
};

const MlPose_getX = {
    'en': 'X [STRING]',
    'zh-cn': '横坐标 [STRING]',
};

const MlPose_getY = {
    'en': 'Y [STRING]',
    'zh-cn': '纵坐标 [STRING]',
};

const MlPose_whenDetected = {
    'en': 'When Detect Pose',
    'zh-cn': '当检测到姿态',
};

const AvailableLocales = ['en', 'zh-cn'];

class MlPose {
    constructor (runtime) {
        this.runtime = runtime;
        this.locale = this.setLocale();

        //this.runtime.ioDevices.video.enableVideo();
        this.mlInit();
    }

    getInfo() {
        return {
            id: 'mlpose',
            name: MlPose_Name[this.locale],
            menuIconURI: menuIconURI,
            blockIconURI: blockIconURI,
            blocks: [
                {
                    opcode: 'isloaded',
                    blockType: BlockType.REPORTER,
                    text: MlPose_IsLoaded[this.locale]
                },
                {
                    opcode: 'detect',
                    text: MlPose_Detect[this.locale],
                    blockType: BlockType.COMMAND,
                    arguments: {
                        IMGDATA: {
                            type: ArgumentType.STRING,
                            defaultValue: ''
                        }
                    }
                },
                {
                    opcode: 'getNose',
                    blockType: BlockType.REPORTER,
                    text: MlPose_getNose[this.locale]
                },
                {
                    opcode: 'getLeftEye',
                    blockType: BlockType.REPORTER,
                    text: MlPose_getLeftEye[this.locale]
                },
                {
                    opcode: 'getRightEye',
                    blockType: BlockType.REPORTER,
                    text: MlPose_getRightEye[this.locale]
                },
                {
                    opcode: 'getLeftEar',
                    blockType: BlockType.REPORTER,
                    text: MlPose_getLeftEar[this.locale]
                },
                {
                    opcode: 'getRightEar',
                    blockType: BlockType.REPORTER,
                    text: MlPose_getRightEar[this.locale]
                },
                {
                    opcode: 'getLeftShoulder',
                    blockType: BlockType.REPORTER,
                    text: MlPose_getLeftShoulder[this.locale]
                },
                {
                    opcode: 'getRightShoulder',
                    blockType: BlockType.REPORTER,
                    text: MlPose_getRightShoulder[this.locale]
                },
                {
                    opcode: 'getLeftElbow',
                    blockType: BlockType.REPORTER,
                    text: MlPose_getLeftElbow[this.locale]
                },
                {
                    opcode: 'getRightElbow',
                    blockType: BlockType.REPORTER,
                    text: MlPose_getRightElbow[this.locale]
                },
                {
                    opcode: 'getLeftWrist',
                    blockType: BlockType.REPORTER,
                    text: MlPose_getLeftWrist[this.locale]
                },
                {
                    opcode: 'getRightWrist',
                    blockType: BlockType.REPORTER,
                    text: MlPose_getRightWrist[this.locale]
                },
                {
                    opcode: 'getLeftHip',
                    blockType: BlockType.REPORTER,
                    text: MlPose_getLeftHip[this.locale]
                },
                {
                    opcode: 'getRightHip',
                    blockType: BlockType.REPORTER,
                    text: MlPose_getRightHip[this.locale]
                },
                {
                    opcode: 'getLeftKnee',
                    blockType: BlockType.REPORTER,
                    text: MlPose_getLeftKnee[this.locale]
                },
                {
                    opcode: 'getRightKnee',
                    blockType: BlockType.REPORTER,
                    text: MlPose_getRightKnee[this.locale]
                },
                {
                    opcode: 'getLeftAnkle',
                    blockType: BlockType.REPORTER,
                    text: MlPose_getLeftAnkle[this.locale]
                },
                {
                    opcode: 'getRightAnkle',
                    blockType: BlockType.REPORTER,
                    text: MlPose_getRightAnkle[this.locale]
                },
                {
                    opcode: 'getX',
                    blockType: BlockType.REPORTER,
                    text: MlPose_getX[this.locale],
                    arguments: {
                        STRING: {
                            type: ArgumentType.STRING,
                            defaultValue: "0,0"
                        }
                    }
                },
                {
                    opcode: 'getY',
                    blockType: BlockType.REPORTER,
                    text: MlPose_getY[this.locale],
                    arguments: {
                        STRING: {
                            type: ArgumentType.STRING,
                            defaultValue: "0,0"
                        }
                    }
                },
                {
                    opcode: 'whenDetected',
                    blockType: BlockType.HAT,
                    text: MlPose_whenDetected[this.locale]
                }
            ]
        };
    }

    isloaded() {
        return Boolean(this.net);
    }

    detect (args) {
        this.results = null;
        let img = new Image();
        //img.src = this.runtime.ioDevices.video.getFrame({
        //    format: Video.FORMAT_CANVAS,
        //    dimensions: [480, 360]
        //}).toDataURL("image/png")
        img.src = args.IMGDATA;
        img.onload = async () => {
            this.IMAGE_WIDTH = img.width;
            this.IMAGE_HEIGHT = img.height;
            const img0 = tf.browser.fromPixels(img);
            const results = await this.net.estimateSinglePose(img0, {
                flipHorizontal: false
            });
            console.log(results);
            this.results = results;
        }
    }

    getNose(args, util) {
        try {
            if (parseFloat(this.results['keypoints'][0]['score']) < 0.5) {
                return '';
            }
            var x = parseInt(this.results['keypoints'][0]['position']['x']) * 480 / this.IMAGE_WIDTH - 240;
            var y = 180 - parseInt(this.results['keypoints'][0]['position']['y']) * 360 / this.IMAGE_HEIGHT;
            return x + ',' + y;
        } catch (e) {
            return '';
        }
    }

    getLeftEye(args, util) {
        try {
            if (parseFloat(this.results['keypoints'][1]['score']) < 0.5) {
                return '';
            }
            var x = parseInt(this.results['keypoints'][1]['position']['x']) * 480 / this.IMAGE_WIDTH - 240;
            var y = 180 - parseInt(this.results['keypoints'][1]['position']['y']) * 360 / this.IMAGE_HEIGHT;
            return x + ',' + y;
        } catch (e) {
            return '';
        }
    }

    getRightEye(args, util) {
        try {
            if (parseFloat(this.results['keypoints'][2]['score']) < 0.5) {
                return '';
            }
            var x = parseInt(this.results['keypoints'][2]['position']['x']) * 480 / this.IMAGE_WIDTH - 240;
            var y = 180 - parseInt(this.results['keypoints'][2]['position']['y']) * 360 / this.IMAGE_HEIGHT;
            return x + ',' + y;
        } catch (e) {
            return '';
        }
    }

    getLeftEar(args, util) {
        try {
            if (parseFloat(this.results['keypoints'][3]['score']) < 0.5) {
                return '';
            }
            var x = parseInt(this.results['keypoints'][3]['position']['x']) * 480 / this.IMAGE_WIDTH - 240;
            var y = 180 - parseInt(this.results['keypoints'][3]['position']['y']) * 360 / this.IMAGE_HEIGHT;
            return x + ',' + y;
        } catch (e) {
            return '';
        }
    }

    getRightEar(args, util) {
        try {
            if (parseFloat(this.results['keypoints'][4]['score']) < 0.5) {
                return '';
            }
            var x = parseInt(this.results['keypoints'][4]['position']['x']) * 480 / this.IMAGE_WIDTH - 240;
            var y = 180 - parseInt(this.results['keypoints'][4]['position']['y']) * 360 / this.IMAGE_HEIGHT;
            return x + ',' + y;
        } catch (e) {
            return '';
        }
    }

    getLeftShoulder(args, util) {
        try {
            if (parseFloat(this.results['keypoints'][5]['score']) < 0.5) {
                return '';
            }
            var x = parseInt(this.results['keypoints'][5]['position']['x']) * 480 / this.IMAGE_WIDTH - 240;
            var y = 180 - parseInt(this.results['keypoints'][5]['position']['y']) * 360 / this.IMAGE_HEIGHT;
            return x + ',' + y;
        } catch (e) {
            return '';
        }
    }

    getRightShoulder(args, util) {
        try {
            if (parseFloat(this.results['keypoints'][6]['score']) < 0.5) {
                return '';
            }
            var x = parseInt(this.results['keypoints'][6]['position']['x']) * 480 / this.IMAGE_WIDTH - 240;
            var y = 180 - parseInt(this.results['keypoints'][6]['position']['y']) * 360 / this.IMAGE_HEIGHT;
            return x + ',' + y;
        } catch (e) {
            return '';
        }
    }

    getLeftElbow(args, util) {
        try {
            if (parseFloat(this.results['keypoints'][7]['score']) < 0.5) {
                return '';
            }
            var x = parseInt(this.results['keypoints'][7]['position']['x']) * 480 / this.IMAGE_WIDTH - 240;
            var y = 180 - parseInt(this.results['keypoints'][7]['position']['y']) * 360 / this.IMAGE_HEIGHT;
            return x + ',' + y;
        } catch (e) {
            return '';
        }
    }

    getRightElbow(args, util) {
        try {
            if (parseFloat(this.results['keypoints'][8]['score']) < 0.5) {
                return '';
            }
            var x = parseInt(this.results['keypoints'][8]['position']['x']) * 480 / this.IMAGE_WIDTH - 240;
            var y = 180 - parseInt(this.results['keypoints'][8]['position']['y']) * 360 / this.IMAGE_HEIGHT;
            return x + ',' + y;
        } catch (e) {
            return '';
        }
    }

    getLeftWrist(args, util) {
        try {
            if (parseFloat(this.results['keypoints'][9]['score']) < 0.5) {
                return '';
            }
            var x = parseInt(this.results['keypoints'][9]['position']['x']) * 480 / this.IMAGE_WIDTH - 240;
            var y = 180 - parseInt(this.results['keypoints'][9]['position']['y']) * 360 / this.IMAGE_HEIGHT;
            return x + ',' + y;
        } catch (e) {
            return '';
        }
    }

    getRightWrist(args, util) {
        try {
            if (parseFloat(this.results['keypoints'][10]['score']) < 0.5) {
                return '';
            }
            var x = parseInt(this.results['keypoints'][10]['position']['x']) * 480 / this.IMAGE_WIDTH - 240;
            var y = 180 - parseInt(this.results['keypoints'][10]['position']['y']) * 360 / this.IMAGE_HEIGHT;
            return x + ',' + y;
        } catch (e) {
            return '';
        }
    }

    getLeftHip(args, util) {
        try {
            if (parseFloat(this.results['keypoints'][11]['score']) < 0.5) {
                return '';
            }
            var x = parseInt(this.results['keypoints'][11]['position']['x']) * 480 / this.IMAGE_WIDTH - 240;
            var y = 180 - parseInt(this.results['keypoints'][11]['position']['y']) * 360 / this.IMAGE_HEIGHT;
            return x + ',' + y;
        } catch (e) {
            return '';
        }
    }

    getRightHip(args, util) {
        try {
            if (parseFloat(this.results['keypoints'][12]['score']) < 0.5) {
                return '';
            }
            var x = parseInt(this.results['keypoints'][12]['position']['x']) * 480 / this.IMAGE_WIDTH - 240;
            var y = 180 - parseInt(this.results['keypoints'][12]['position']['y']) * 360 / this.IMAGE_HEIGHT;
            return x + ',' + y;
        } catch (e) {
            return '';
        }
    }

    getLeftKnee(args, util) {
        try {
            if (parseFloat(this.results['keypoints'][13]['score']) < 0.5) {
                return '';
            }
            var x = parseInt(this.results['keypoints'][13]['position']['x']) * 480 / this.IMAGE_WIDTH - 240;
            var y = 180 - parseInt(this.results['keypoints'][13]['position']['y']) * 360 / this.IMAGE_HEIGHT;
            return x + ',' + y;
        } catch (e) {
            return '';
        }
    }

    getRightKnee(args, util) {
        try {
            if (parseFloat(this.results['keypoints'][14]['score']) < 0.5) {
                return '';
            }
            var x = parseInt(this.results['keypoints'][14]['position']['x']) * 480 / this.IMAGE_WIDTH - 240;
            var y = 180 - parseInt(this.results['keypoints'][14]['position']['y']) * 360 / this.IMAGE_HEIGHT;
            return x + ',' + y;
        } catch (e) {
            return '';
        }
    }

    getLeftAnkle(args, util) {
        try {
            if (parseFloat(this.results['keypoints'][15]['score']) < 0.5) {
                return '';
            }
            var x = parseInt(this.results['keypoints'][15]['position']['x']) * 480 / this.IMAGE_WIDTH - 240;
            var y = 180 - parseInt(this.results['keypoints'][15]['position']['y']) * 360 / this.IMAGE_HEIGHT;
            return x + ',' + y;
        } catch (e) {
            return '';
        }
    }

    getRightAnkle(args, util) {
        try {
            if (parseFloat(this.results['keypoints'][16]['score']) < 0.5) {
                return '';
            }
            var x = parseInt(this.results['keypoints'][16]['position']['x']) * 480 / this.IMAGE_WIDTH - 240;
            var y = 180 - parseInt(this.results['keypoints'][16]['position']['y']) * 360 / this.IMAGE_HEIGHT;
            return x + ',' + y;
        } catch (e) {
            return '';
        }
    }

    getX(args, util) {
        try {
            if (args.STRING === '') return '';
            var a = args.STRING.split(',');
            return parseInt(a[0]);
        } catch (e) {
            return '';
        }
    }

    getY(args, util) {
        try {
            if (args.STRING === '') return '';
            var a = args.STRING.split(',');
            return parseInt(a[1]);
        } catch (e) {
            return '';
        }
    }

    whenDetected(args, util) {
        try {
            if (parseFloat(this.results['keypoints'][0]['score']) < 0.5) {
                return false;
            }
            var x = this.results['keypoints'][0]['position']['x'];
            var y = this.results['keypoints'][0]['position']['y'];
            return true;
        } catch (e) {
            return false;
        }
    }

    setLocale() {
        let locale = formatMessage.setup().locale;
        if (AvailableLocales.includes(locale)) {
            return locale;
        } else {
            return 'en';
        }
    }

    async mlInit () {
        this.net = await posenet.load({
            architecture: 'MobileNetV1',
            outputStride: 16,
            inputResolution: { width: 480, height: 360 },
            multiplier: 0.75,
            modelUrl: "/00000000-0000-0000-0000-000000015000/model/pose/model.json"
        });
        console.log(this.net)
    }
}

module.exports = MlPose;
