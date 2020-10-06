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
var ocrlib = require('tesseract.js');


const MlOcr_Name = {
    'en': 'Text Recognition',
    'zh-cn': '文字识别',
};

const MlOcr_IsLoaded = {
    'en': 'Is Loaded',
    'zh-cn': '已加载',
};

const MlOcr_Detect = {
    'en': 'Recognize Text [IMGDATA] [LANGUAGE]',
    'zh-cn': '识别文字 [IMGDATA] [LANGUAGE]',
};

const MlOcr_GetData = {
    'en': 'Data',
    'zh-cn': '数据',
};

const AvailableLocales = ['en', 'zh-cn'];

class MlOcr {
    constructor (runtime) {
        this.runtime = runtime;
        this.locale = this.setLocale();

        //this.runtime.ioDevices.video.enableVideo();
        this.mlInit();
    }

    get LANG_INFO () {
        return [
            {name: 'EN',    value: 'EN'},
            {name: 'CN',    value: 'CN'}
        ];
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

    getInfo() {
        return {
            id: 'mlocr',
            name: MlOcr_Name[this.locale],
            menuIconURI: menuIconURI,
            blockIconURI: blockIconURI,
            blocks: [
                {
                    opcode: 'isloaded',
                    blockType: BlockType.REPORTER,
                    text: MlOcr_IsLoaded[this.locale]
                },
                {
                    opcode: 'detect',
                    text: MlOcr_Detect[this.locale],
                    blockType: BlockType.COMMAND,
                    arguments: {
                        IMGDATA: {
                            type: ArgumentType.STRING,
                            defaultValue: ''
                        },
                        LANGUAGE: {
                            type: ArgumentType.STRING,
                            menu: 'LANG_MENU',
                            defaultValue: 'EN'
                        }
                    }
                },
                {
                    opcode: 'getData',
                    blockType: BlockType.REPORTER,
                    text: MlOcr_GetData[this.locale]
                }
            ],
            menus: {
                LANG_MENU: {
                    acceptReporters: true,
                    items: this._buildMenu(this.LANG_INFO)
                }
            }
        };
    }

    isloaded() {
        return Boolean(this.worker);
    }

    async detect (args) {
        await this.worker.load();
        if (args.LANGUAGE === 'EN') {
            await this.worker.loadLanguage('eng');
            await this.worker.initialize('eng');        
        } else {
            await this.worker.loadLanguage('chi_sim');
            await this.worker.initialize('chi_sim');
        }
        const { data: { text } } = await this.worker.recognize(args.IMGDATA, {
            //classify_bln_numeric_mode: 1
        });
        console.log(text);
        this.rdata = text;                    //note: this should be in the same block as recognize (aoqingy)
    }

    getData(args, util) {
        //console.log(this.rdata);
        return this.rdata;
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
        console.log(ip);
        this.worker = ocrlib.createWorker({
            workerPath: ip + '/00000000-0000-0000-0000-000000015000/model/ocr/worker.min.js',
            corePath: ip + '/00000000-0000-0000-0000-000000015000/model/ocr/core/tesseract-core.wasm.js',
            langPath: ip + '/00000000-0000-0000-0000-000000015000/model/ocr/',
            cachePath: ip + '/00000000-0000-0000-0000-000000015000/model/ocr/',
        });
        console.log(this.worker);
    }
}

module.exports = MlOcr;
