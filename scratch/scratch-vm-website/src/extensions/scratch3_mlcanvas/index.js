const ArgumentType = require('scratch-vm/src/extension-support/argument-type')
const BlockType = require('scratch-vm/src/extension-support/block-type')
const formatMessage = require('format-message');
const StageLayering = require('scratch-vm/src/engine/stage-layering')
const Cast = require('scratch-vm/src/util/cast')

const menuIconURI = 'data:image/png;base64,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';
const blockIconURI = menuIconURI;

const MlCanvas_Name = {
    'en': 'Drawing Toolkits',
    'zh-cn': '绘图工具',
};

const MlCanvas_Clear = {
    'en': 'Clear All',
    'zh-cn': '全部清除',
};

const MlCanvas_SetColor = {
    'en': 'Set Pen Color [COLOR]',
    'zh-cn': '设置画笔颜色 [COLOR]',
};

const MlCanvas_SetWidth = {
    'en': 'Set Pen Width [W]',
    'zh-cn': '设置画笔宽度 [W]',
};

const MlCanvas_DrawLine = {
    'en': 'Draw Line from [X1] [Y1] to [X2] [Y2]',
    'zh-cn': '画直线 从 [X1] [Y1] 到 [X2] [Y2]',
};

const MlCanvas_DrawRect = {
    'en': 'Draw Rect at [X] [Y] of [W] [H]',
    'zh-cn': '画矩形 于 [X] [Y] 尺寸为 [W] [H]',
};

const MlCanvas_DrawCircle = {
    'en': 'Draw Circle at [X] [Y] of [R]',
    'zh-cn': '画圆形 于 [X] [Y] 半径为 [R]',
};

const MlCanvas_SetSize = {
    'en': 'Set Font Size [SIZE]',
    'zh-cn': '设置字体大小 [SIZE]',
};

const MlCanvas_DrawText = {
    'en': 'Draw Text [MESSAGE] at [X] [Y]',
    'zh-cn': '画文本 [MESSAGE] 于 [X] [Y]',
};

const MlCanvas_DrawImage = {
    'en': 'Draw Image [IMGDATA] at [X] [Y] of [W] [H]',
    'zh-cn': '画图片 [IMGDATA] 于 [X] [Y] 尺寸为 [W] [H]',
};

class MlCanvas {
    constructor(runtime) {
        this.runtime = runtime

        //this.runtime.on('targetWasCreated', () => {
        this._createLayer()
        //})
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

    _createLayer() {
        if (!this.runtime.renderer) {
            console.log('!this.runtime.renderer')
            return
        }

        if (!this._penSkinId) {
            console.log('!this._penSkinId')
            this._penSkinId = this.runtime.renderer.createPenSkin()
            this._penDrawableId = this.runtime.renderer.createDrawable(
                StageLayering.SPRITE_LAYER
                //StageLayering.PEN_LAYER
            )
            this.runtime.renderer.updateDrawableProperties(this._penDrawableId, {
                skinId: this._penSkinId
            })
        }

        if (!this.skin) {
            console.log('!this.skin')
            this.skin = this.runtime.renderer._allSkins[this._penSkinId]

            const skinSize = this.skin.size
            this._centerX = skinSize[0] / 2
            this._centerY = skinSize[1] / 2
        }

        if (!this.context) {
            console.log('!this.context')
            this.context = this.skin._canvas.getContext('2d')
            this.context.font = '24px serif'
            this.context.fillStyle = 'rgb(0,0,0)'
        }
    }

    getInfo() {
        return {
            id: "mlcanvas",
            name: MlCanvas_Name[this.locale],
            menuIconURI: menuIconURI,
            blockIconURI: blockIconURI,
            blocks: [
                {
                    opcode: 'clear',
                    blockType: BlockType.COMMAND,
                    text: MlCanvas_Clear[this.locale]
                },
                {
                    opcode: 'setColor',
                    blockType: BlockType.COMMAND,
                    text: MlCanvas_SetColor[this.locale],
                    arguments: {
                        COLOR: {
                            type: ArgumentType.COLOR
                        }
                    }
                },
                {
                    opcode: 'setWidth',
                    blockType: BlockType.COMMAND,
                    text: MlCanvas_SetWidth[this.locale],
                    arguments: {
                        W: {
                            type: ArgumentType.STRING,
                            defaultValue: '1'
                        }
                    }
                },
                {
                    opcode: 'drawLine',
                    blockType: BlockType.COMMAND,
                    text: MlCanvas_DrawLine[this.locale],
                    arguments: {
                        X1: {
                            type: ArgumentType.STRING,
                            defaultValue: '0'
                        },
                        Y1: {
                            type: ArgumentType.STRING,
                            defaultValue: '0'
                        },
                        X2: {
                            type: ArgumentType.STRING,
                            defaultValue: '0'
                        },
                        Y2: {
                            type: ArgumentType.STRING,
                            defaultValue: '0'
                        }
                    }
                },
                {
                    opcode: 'drawRect',
                    blockType: BlockType.COMMAND,
                    text: MlCanvas_DrawRect[this.locale],
                    arguments: {
                        X: {
                            type: ArgumentType.STRING,
                            defaultValue: '0'
                        },
                        Y: {
                            type: ArgumentType.STRING,
                            defaultValue: '0'
                        },
                        W: {
                            type: ArgumentType.STRING,
                            defaultValue: '0'
                        },
                        H: {
                            type: ArgumentType.STRING,
                            defaultValue: '0'
                        }
                    }
                },
                {
                    opcode: 'drawCircle',
                    blockType: BlockType.COMMAND,
                    text: MlCanvas_DrawCircle[this.locale],
                    arguments: {
                        X: {
                            type: ArgumentType.STRING,
                            defaultValue: '0'
                        },
                        Y: {
                            type: ArgumentType.STRING,
                            defaultValue: '0'
                        },
                        R: {
                            type: ArgumentType.STRING,
                            defaultValue: '0'
                        }
                    }
                },
                {
                    opcode: 'setSize',
                    blockType: BlockType.COMMAND,
                    text: MlCanvas_SetSize[this.locale],
                    arguments: {
                        SIZE: {
                            type: ArgumentType.STRING,
                            defaultValue: '10'
                        }
                    }
                },
                {
                    opcode: 'drawText',
                    blockType: BlockType.COMMAND,
                    text: MlCanvas_DrawText[this.locale],
                    arguments: {
                        MESSAGE: {
                            type: ArgumentType.STRING,
                            defaultValue: 'Hello, World!'
                        },
                        X: {
                            type: ArgumentType.STRING,
                            defaultValue: '0'
                        },
                        Y: {
                            type: ArgumentType.STRING,
                            defaultValue: '0'
                        }
                    }
                },
                {
                    opcode: 'drawImage',
                    blockType: BlockType.COMMAND,
                    text: MlCanvas_DrawImage[this.locale],
                    arguments: {
                        IMGDATA: {
                            type: ArgumentType.STRING,
                            defaultValue: ''
                        },
                        X: {
                            type: ArgumentType.STRING,
                            defaultValue: '0'
                        },
                        Y: {
                            type: ArgumentType.STRING,
                            defaultValue: '0'
                        },
                        W: {
                            type: ArgumentType.STRING,
                            defaultValue: '0'
                        },
                        H: {
                            type: ArgumentType.STRING,
                            defaultValue: '0'
                        }
                    }
                }
            ]
        }
    }

    clear() {
        this.runtime.renderer.penClear(this._penSkinId)

        this.runtime.requestRedraw()
    }

    setColor(args) {
        this.context.strokeStyle = args.COLOR;
        this.context.fillStyle = args.COLOR;
    }

    setWidth(args) {
        this.context.lineWidth = args.W;
    }

    drawLine(args) {
        if (args.X1 === '' || args.Y1 === '' || args.X2 === '' || args.Y2 === '') return;
        const x1 = Cast.toNumber(this._centerX + parseInt(args.X1));
        const y1 = Cast.toNumber(this._centerY - parseInt(args.Y1));
        const x2 = Cast.toNumber(this._centerX + parseInt(args.X2));
        const y2 = Cast.toNumber(this._centerY - parseInt(args.Y2));
    
        this.context.beginPath();
        this.context.moveTo(x1, y1);
        this.context.lineTo(x2, y2);
        this.context.stroke();

        this.skin._canvasDirty = true;
        this.skin._silhouetteDirty = true;
        this.runtime.requestRedraw();
    }

    drawRect(args) {
        if (args.X === '' || args.Y === '' || args.W === '' || args.H === '') return;
        const x = Cast.toNumber(this._centerX + parseInt(args.X));
        const y = Cast.toNumber(this._centerY - parseInt(args.Y));
        const w = Cast.toNumber(args.W);
        const h = Cast.toNumber(args.H);
    
        this.context.beginPath();
        this.context.rect(x, y, w, h);
        this.context.stroke();

        this.skin._canvasDirty = true;
        this.skin._silhouetteDirty = true;
        this.runtime.requestRedraw();
    }

    drawCircle(args) {
        if (args.X === '' || args.Y === '' || args.R === '') return;
        const x = Cast.toNumber(this._centerX + parseInt(args.X));
        const y = Cast.toNumber(this._centerY - parseInt(args.Y));
        const r = Cast.toNumber(args.R);
    
        this.context.beginPath();
        this.context.arc(x, y, r, 0, 2*Math.PI);
        this.context.stroke();

        this.skin._canvasDirty = true;
        this.skin._silhouetteDirty = true;
        this.runtime.requestRedraw();
    }

    setSize(args) {
        var font = Cast.toString(parseInt(args.SIZE))+'px' + ' serif';
        //console.log(font);
        this.context.font = font;
    }

    drawText(args) {
        if (args.X === '' || args.Y === '' || args.MESSAGE === '') return;
        const message = Cast.toString(args.MESSAGE);
        const x = Cast.toNumber(args.X);
        const y = Cast.toNumber(args.Y);

        this.context.fillText(message, this._centerX + x, this._centerY - y);

        this.skin._canvasDirty = true;
        this.skin._silhouetteDirty = true;
        this.runtime.requestRedraw();
    }

    drawImage(args) {
        if (args.X === '' || args.Y === '' || args.W === '' || args.H === '') return;
        const x = Cast.toNumber(args.X);
        const y = Cast.toNumber(args.Y);
        const w = Cast.toNumber(args.W);
        const h = Cast.toNumber(args.H);

        let img = new Image();
        img.src = args.IMGDATA;
        img.onload = async () => {
            this.context.drawImage(img, 0, 0, img.width, img.height, this._centerX + x, this._centerY - y, w, h);

            this.skin._canvasDirty = true;
            this.skin._silhouetteDirty = true;
            this.runtime.requestRedraw();
        };
    }
}

module.exports = MlCanvas;
