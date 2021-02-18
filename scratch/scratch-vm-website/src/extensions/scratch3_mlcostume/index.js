require('babel-polyfill');
const Runtime = require('../../engine/runtime');

const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Base64Util = require('../../util/base64-util');
const formatMessage = require('format-message');
const {loadCostume} = require('../../import/load-costume.js');
const SvgRenderer = require('scratch-svg-renderer');
// const formatMessage = require('format-message');

const menuIconURI = "data:image/png;base64,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";
const blockIconURI = menuIconURI;

const MlCostume_Name = {
    'en': 'Costume and Backdrop',
    'zh-cn': '造型与背景',
};

const MlCostume_Save = {
    'en': 'Save Backdrop to Costume',
    'zh-cn': '保存背景为造型',
};

const MlCostume_Costume = {
    'en': 'Costume Image',
    'zh-cn': '造型图片',
};

const MlCostume_Backdrop = {
    'en': 'Backdrop Image',
    'zh-cn': '背景图片',
};

const MlCostume_Window = {
    'en': 'Image Window [IMGDATA] [X1] [Y1] [X2] [Y2]',
    'zh-cn': '图片窗口 [IMGDATA] [X1] [Y1] [X2] [Y2]',
};

//const MlCostume_Log = {
//    'en': 'Log Image Data [DATA]',
//    'zh-cn': '记录图片数据 [DATA]',
//};

const MlCostume_Download = {
    'en': 'Download Image [DATA]',
    'zh-cn': '下载图片 [DATA]',
};

class MlCostume {
    constructor (runtime) {
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

    getInfo () {
        return {
            id: 'mlcostume',
            name: MlCostume_Name[this.locale],
            menuIconURI: menuIconURI,
            blockIconURI: blockIconURI,
            blocks: [
                {
                    opcode: 'saveScreenshotToCostume',
                    text: MlCostume_Save[this.locale],
                    blockType: BlockType.COMMAND,
                    //filter: ['sprite']
                },
                {
                    opcode: 'getCostumeImage',
                    text: MlCostume_Costume[this.locale],
                    blockType: BlockType.REPORTER,
                    //filter: ['sprite']
                },
                {
                    opcode: 'getBackdropImage',
                    text: MlCostume_Backdrop[this.locale],
                    blockType: BlockType.REPORTER,
                    //filter: ['stage']
                },
                {
                    opcode: 'getImageWindow',
                    blockType: BlockType.REPORTER,
                    text: MlCostume_Window[this.locale],
                    arguments: {
                        IMGDATA: {
                            type: ArgumentType.STRING,
                            defaultValue: ''
                        },
                        X1: {
                            type: ArgumentType.NUMBER,
                            defaultValue: -240
                        },
                        Y1: {
                            type: ArgumentType.NUMBER,
                            defaultValue: -180
                        },
                        X2: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 240
                        },
                        Y2: {
                            type: ArgumentType.NUMBER,
                            defaultValue: 180
                        }
                    }
                },
                //{
                //    opcode: 'logImageData',
                //    text: MlCostume_Log[this.locale],
                //    blockType: BlockType.COMMAND,
                //    filter: ['sprite'],
                //    arguments: {
                //        DATA: {
                //            type: ArgumentType.STRING,
                //            defaultValue: ''
                //        }
                //    }
                //},
                {
                    opcode: 'downloadImageData',
                    text: MlCostume_Download[this.locale],
                    blockType: BlockType.COMMAND,
                    //filter: ['sprite'],
                    arguments: {
                        DATA: {
                            type: ArgumentType.STRING,
                            defaultValue: ''
                        }
                    }
                }
            ]
        };
    }

    _getImageAsJpeg (imagedata) {
        return new Promise(function (resolve) {
            var image = new Image();
            image.src = imagedata;
            image.onload = function () {
                var canvas = document.createElement('canvas');
                //console.log('Resizing image to dimensions needed for classifying');
                canvas.width = 480;
                canvas.height = 360;

                var context = canvas.getContext('2d');
                context.fillStyle = "#FFFFFF";
                context.fillRect(0, 0, canvas.width, canvas.height);

                context.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.width, canvas.height);

                var jpegdata = canvas.toDataURL('image/jpeg');
                //if (jpegdata.indexOf('data:image/jpeg;base64,') === 0) {
                //    jpegdata = jpegdata.substr('data:image/jpeg;base64,'.length);
                //}
                resolve(jpegdata);
            };
        });
    }

    _getCostumeImage (costume) {
        if (costume && costume.asset) {
            return this._getImageAsJpeg(costume.asset.encodeDataURI());
        }

        if (costume && costume.assetId) {
            const costumeimage = this.runtime.storage.builtinHelper.get(costume.assetId);
            if (costumeimage && costumeimage.dataFormat === 'png') {
                var pngdata = Base64Util.arrayBufferToBase64(costumeimage.data);
                return this._getImageAsJpeg('data:image/png;base64,' + pngdata);
            }
            else if (costumeimage && costumeimage.dataFormat === 'jpg') {
                var jpgdata = Base64Util.arrayBufferToBase64(costumeimage.data);
                return this._getImageAsJpeg('data:image/jpeg;base64,' + jpgdata);
            }
            else if (costumeimage && costumeimage.dataFormat === 'svg') {
                var svgxml = String.fromCharCode(...costumeimage.data);
                svgxml = svgxml.replace(/"/g, '\'');
                return this._getImageAsJpeg('data:image/svg+xml,' + encodeURIComponent(svgxml));
            }
            console.log('Unexpected costume image, format: ' + costumeimage.dataFormat);
        }

        return '';
    }

    getCostumeImage (args, util) {
        return this._getCostumeImage(util.target.getCurrentCostume());
    }


    _getStageCanvas () {
        var allCanvases = document.getElementsByTagName('canvas');
        for (var i = 0; i < allCanvases.length; i++) {
            var canvas = allCanvases[i];
            // if (canvas.className.startsWith('stage_stage_')) {
            if (canvas.width > 0 && canvas.className.indexOf('paper-canvas_paper-canvas') === -1) {
                return canvas;
            }
        }
    }

    // Return the image data for a screenshot of the entire stage
    _getStageScreenshot() {
        // get the backdrop image
        this.runtime.renderer.draw();
        var originalCanvas = this._getStageCanvas();
        const WIDTH = originalCanvas.width;
        const HEIGHT = originalCanvas.height;

        // make a new off-screen canvas to copy to
        var copyCanvas = document.createElement('canvas');
        copyCanvas.width = WIDTH;
        copyCanvas.height = HEIGHT;
        var copyContext = copyCanvas.getContext('2d');

        // copy a section of the backdrop to the copy canvas
        copyContext.drawImage(originalCanvas, 0, 0, WIDTH, HEIGHT, 0, 0, WIDTH, HEIGHT);

        // return the canvas data
        const screenshot = copyCanvas.toDataURL('image/jpeg');
        return screenshot;
    }

    // This returns the backdrop image
    //  (i.e. the composite of all sprites - what is visible on
    //   the stage/backdrop)
    //  at the location of the sprite.
    //
    // So the returned image will be from the same size and location
    //  as what you get from getCostumeImage
    //  but will be based on the image you'd get from getBackdropImage
    //
    // It's sort of a hybrid between the two functions
    getBackdropCostumeImage (args, util) {
        // where is the sprite's top left corner and how big is it?
        var target = util.target;
        var costume = target.getCurrentCostume();
        var sizeRatio = target.size / 100;
        var width = costume.size[0] * sizeRatio;
        var height = costume.size[1] * sizeRatio;
        var x = target.x - costume.rotationCenterX;
        var y = target.y + costume.rotationCenterY;

        // convert the Scratch size and coordinates into canvas coords
        //  Scratch coordinates are:
        //      x=-240 (left)    to  x=+240 (right)
        //      y=-180 (bottom)  to  y=+180 (top)
        //  Canvas coordinates (default view) are:
        //      x=0 (left)       to  x=+960 (right)
        //      y=720 (bottom)   to  y=0 (top)
        //  (the scale factor is different when full-screen, but the
        //   top-left is always 0,0 and the y value increases as you
        //   go down)

        var originalCanvas = this._getStageCanvas();
        // assume that the factor will be the same for both width and height
        var scaleFactor = originalCanvas.width / 480;

        x = scaleFactor * ( x + 240 );
        y = -scaleFactor * ( y - 180 );
        width *= scaleFactor;
        height *= scaleFactor;

        // make a new off-screen canvas to copy to
        //console.log('Resizing backdrop to dimensions needed for classifying');
        var RESIZE_WIDTH = 224;
        var RESIZE_HEIGHT = 224;
        var copyCanvas = document.createElement('canvas');
        copyCanvas.width = RESIZE_WIDTH;
        copyCanvas.height = RESIZE_HEIGHT;
        var copyContext = copyCanvas.getContext('2d');

        // get the backdrop image
        this.runtime.renderer.draw();

        // copy a section of the backdrop to the copy canvas
        copyContext.drawImage(originalCanvas, x, y, width, height, 0, 0, RESIZE_WIDTH, RESIZE_HEIGHT);

        // get the base64-encoded version of the copy canvas
        var jpegdata = copyCanvas.toDataURL('image/jpeg');
        if (jpegdata.indexOf('data:image/jpeg;base64,') === 0) {
            jpegdata = jpegdata.substr('data:image/jpeg;base64,'.length);
        }
        return jpegdata;
    }

    getBackdropImage () {
        this.runtime.renderer.draw();
        const canvas = this._getStageCanvas();
        var jpegdata = canvas.toDataURL('image/jpeg');
        //if (jpegdata.indexOf('data:image/jpeg;base64,') === 0) {
        //    jpegdata = jpegdata.substr('data:image/jpeg;base64,'.length);
        //}
        return jpegdata;
    }

    getImageWindow (args) {
        return new Promise(function (resolve) {                    //For reference (aoqingy)
            var img = new Image();
            img.src = args.IMGDATA;
            img.onload = async () => {
                // (X1, Y2) (X2, Y2)
                // (X1, Y1) (X2, Y1)
                var X = 240 + parseInt(args.X1);
                var Y = 180 - parseInt(args.Y2);
                var W = parseInt(args.X2) - parseInt(args.X1);
                var H = parseInt(args.Y2) - parseInt(args.Y1);
                X = Math.floor(X * img.width / 480);
                Y = Math.floor(Y * img.height / 360);
                W = Math.ceil(W * img.width / 480);
                H = Math.ceil(H * img.height / 360);
                console.log(X);
                console.log(Y);
                console.log(W);
                console.log(H);

                var canvas = document.createElement('canvas');
                canvas.width = W;
                canvas.height = H;
                
                var context = canvas.getContext('2d');
                context.drawImage(img, X, Y, W, H, 0, 0, W, H);
                
                var rdata = canvas.toDataURL('image/jpeg');
                resolve(rdata);
            }
        });
    }

    //
    // step 1) Take a screenshot of the entire stage,
    //  (i.e. the composite of all sprites - what is visible on
    //   the stage/backdrop)
    //
    // step 2) Add the screenshot to the sprite as a new costume
    //
    // step 3) Switch to the new costume
    //
    saveScreenshotToCostume (args, util) {
        const _storage = this.runtime.storage;
        const _runtime = this.runtime;
        const target = util.target;

        const BitmapAdapter = SvgRenderer.BitmapAdapter;
        const bitmapAdapter = new BitmapAdapter();

        return bitmapAdapter.importBitmap(this._getStageScreenshot(), 'image/jpeg')
            .then((dataBuffer) => {
                const name = 'webcam';
                const type = _storage.AssetType.ImageBitmap;
                const dataFormat = _storage.DataFormat.JPG;

                const asset = _storage.createAsset(type, dataFormat, dataBuffer, null, true);

                const assetId = asset.assetId;
                const md5 = assetId + '.' + dataFormat;

                const costume = { name, dataFormat, asset, md5, assetId };

                return loadCostume(md5, costume, _runtime);
            })
            .then((costume) => {
                target.addCostume(costume);
                target.setCostume(target.getCostumes().length - 1);
            })
            .catch(e => {
                console.log('Failed to save screenshot to costume');
            });
    }

    //logImageData (args, util) {
    //    console.log(args.DATA);
    //}

    downloadImageData (args, util) {
        var saveByteArray = (function () {
            var a = document.createElement("a");
            document.body.appendChild(a);
            a.style = "display: none";
            return function (data, name) {
                //var blob = new Blob([new Uint8Array(data)], {type: "application/octet-stream"});
                //var url = window.URL.createObjectURL(blob);
                url = data;
                a.href = url;
                a.download = name;
                a.click();
                window.URL.revokeObjectURL(url);
            };
        }());
 
        var today = new Date();
        var D = ['00','01','02','03','04','05','06','07','08','09'];
        var year = today.getFullYear();
        var month = D[(today.getMonth()+1)]||(today.getMonth()+1);
        var date = D[today.getDate()]||today.getDate();
        var hour = D[today.getHours()]||today.getHours();
        var minute = D[today.getMinutes()]||today.getMinutes();
        var second = D[today.getSeconds()]||today.getSeconds();
        saveByteArray(args.DATA, 'snap' + year + month + date + hour + minute + second + '.jpg');
    }

}

module.exports = MlCostume;
