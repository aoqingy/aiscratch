require('babel-polyfill');
const Runtime = require('../../engine/runtime');

const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Base64Util = require('../../util/base64-util');
const Clone = require('../../util/clone');
const Cast = require('../../util/cast');
const formatMessage = require('format-message');

const menuIconURI = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAACXBIWXMAABJ0AAASdAHeZh94AAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAAVT0lEQVR42mJceZbhP8MoGAWjYBQMAQAQQEyjQTAKRsEoGCoAIIBGC6xRMApGwZABAAE0WmCNglEwCoYMAAig0QJrFIyCUTBkAEAAjRZYo2AUjIIhAwACaLTAGgWjYBQMGQAQQKMF1igYBaNgyACAABotsEbBKBgFQwYABNBogTUKRsEoGDIAIIBGC6xRMApGwZABAAE0WmCNglEwCoYMAAig0QJrFIyCUTBkAEAAjRZYo2AUjIIhAwACaLTAGgWjYBQMGQAQQKMF1igYBaNgyACAABotsEbBKBgFQwYABNBogTUKRsEoGDIAIIBGC6xRMApGwZABAAE0WmCNglEwCoYMAAig0QJrFIyCUTBkAEAAjRZYo2AUjIIhAwACaLTAGgWjYBQMGQAQQKMF1igYBaNgyACAABotsEbBKBgFQwYABNBogTUKRsEoGDIAIIBGC6xRMApGwZABAAE0WmCNglEwCoYMAAig0QJrFIyCUTBkAEAAjRZYo2AUjIIhAwACaLTAGgWjYBQMGQAQQKMF1igYBaNgyACAABotsEbBKBgFQwYABNBogTUKRsEoGDIAIIBGC6xRMApGwZABAAE0WmCNglEwCoYMAAig0QJrFIyCUTBkAEAAjRZYo2AUjIIhAwACaLTAGgWjYBQMGQAQQKMF1igYBaNgyACAABotsEbBKBgFQwYABNBogTUKRsEoGDIAIIBGC6xRMApGwZABAAE0WmCNglEwCoYMAAig0QJrFIyCUTBkAEAAjRZYo2AUjIIhAwACaLTAGgWjYBQMGQAQQKMF1igYBaNgyACAABotsEbBKBgFQwYABNBogTUKRsEoGDIAIIBYRoNgaAExXgcU/qvPB0g2Q4DTgIGNRYAiM0bBKBgIABBAowXWEAMOqvtR+KvOMZJshqHsBAZRHnuKzCAXaEs2wNlffz1gePB2wWikUggUhBMYFIEYBs4/LmD48P3CsPQrQACNFlh0BNxsCgy//n5g+A3EIxVoS9bD2a+/HKRagWUmvwCYceNRxI7eC2R4+mED1QoFEBiMBSwoXSFXQMit5+EGAAJotMCisEsGAqI8DjjVgBITF5s8nH/gtuNoF4wGcYJeWIEAtSoGUGFlJj8fHp9XnzeMBvoAAYAAYhluCRe98MAFBLgMGNiYcddEyDUWNQFo/Gi0wKJdNxO91bXligLVCitYCxFUaJ16mICh1lHtAFXSDajluf+Ww2jEYgEAATSsCixQYYDc5Ris3cJRQD2gJlaAs5AAtWxBhRklLaIP3y4AW2ofGViZ+ZEKsXgGVmC369SDBLp070HpGjTuCAP3gd3SkTr2BxBAw2pZw1AYaAS17EYB9Qp/9NYVqHBBbX3VgzM8JWkK1NpBN1ea3x/comJlpv14EWhMClQow/BIrvQAAmhYtbDo3dUCNd2RAWhAHVQjoyd45Fr4/bcLBGtTUgZNsY2p/frzAV54gzIVNjvQuzLEgMFWs5spLEBp+YAKlV3XDRislTcA/agPF7cB8ncCxcltDcEKLUgBxY8UjvpgMUiB9oFg+sAHaDUEMdwAQAANu0H3px834h2b+vrzAXg6HRsAJTrkVhr6EgJ6DJijLzkgBNDdiD4GQoxZxNo3mMbesHUFQV0/UNyCumpumudRuoagwu3o3QCKW1r4Ci10QMo4VJjR/9HSiAgAEEDDrsCiJFGOgqEBQC1EA5l+jEL61qsJ8MLl6vNGlPFMUBfOUGYCw/knBVQvtEBdNMHRrj5dAEAAjW7NGQVDCoDGjNC7sKCuIKhVhd7a+vD9IoqYqlg+fD0VpYUWst0g/ujML30AQACNrsMaZAC0ShnfGBa2bio6AI1hwQC2Vew+Og9Q1obhWukOGh/D1uUkBNALFHwtJVxqsa3WhhVWyK0bEAAtMcDWzQe1tt00L6Cohy1RoGQsDuSuUw8TwS02UGFFzGQPyO3IrTB8QxOjADcACKDRAmuQAVJnOsmp2ZELK/RWCDUAsWNioIIEl1pshTZoHAp5MB0Ebr+aiHM1O6hAABUoyONZ1Cq0QHpfA8Oe2EIHVFghF/6gLuvoAlTSAUAAjXYJhzlAnwJH5w+VbUKgRaCgcSjUwv0iwTEpWGsI07z54BYSJWC0hUR/ABBAoy2sYQRAXTjYkgXQADSocAJ1iSCD0A3g1hj6OrAP36i/dg3XdD76NiXQ+A+uFiVytxbbPsFvvx4SPQsHa0khr1gHAdCYFhe7At4FoCA3jxZMgwcABNBogTXEASgzgwoh5K4SqCAAFViwdUqgbheoO4KtIKFFZsRVkIDWR6F2Ry/gLXRA4z6gVhB6YQXy35G7ASS1DnEVWrAFoKBCC9eYGaigB7XkRvKm9cECAAJo2BVYpC68JNVsagBSxp1gg7WgPZLYVjhj2/QLKqTQd/CDALbxIkpmt0BuA615I7bQEyNynydyYYE+ZgUrEMnZ1YCr0ALZARrnQh5XgtkPKmBBYQyqFECD+KOtrYEFAAE07AosUhdekgLQ1/6QC3DNyoEyibRAALiwAXXv0LtQpI6vgGYQQVtX8IUHKa0GkJuuPkfwYQPJoMW6oMIA31EuoMIefXYPn1psA+wgABqPomQLFq5CCwRA67ZA4Q9qbWlLNaDYDynULpBdWI4C6gCAABoddB90Xbz54IwDKmSILaxAXSRQdw/UQgCdAbX1iiK89QTKYCAx0JgPNuCtcx9cqGHbE4c8joSvxQnqVlkrrQdndlxAkcj1T6BCEVfLClRYUWNrEMiMXdcNMfYHwgomUGsK0kW8iNFyBbmN0rVco4B8ABBAo2NYgwhAtgZdxJpZcQFQ4USomwJq+YAyGa4CEFRAgra6gMZpkAsEQi0J9EIOX2sNX2FGTCH54O1CrJudyQWgMMO27xBU6MPCALaqHVkeVGiBKhVQVxi2sn4U0A8ABNBogTXIAGhtD3IGAbWM3gMLDpA4qABBX8hJzJgKtiUBmIUPJCOCWkK4jthF71qi79nEVdiAWmK4CktQoQfq/l0A2gnyC/r2F/Aq9ocJVD86CHbaKajQAg3sg2YMQV1b5LVRoAIYW6EFGx4AuQnbuVijgHYAIICGXYFFzYPP0Dek0mPz86svEPNhhRQlg7z4ZtlAGQ0kh16QgAolUAZdf1EAXmAiq0Ge5sdYIoGjRYarOwgyC7TqHjZJADv1AGTO0XsBwG7mBviYEbUmPLABUMsSFO7Y4hZWaIFOfEAvsEHhCgqL0QWg9AMAATQ6hjXIAKj7BuuaUVJYwba9YJtFBBUGIHtAR66AVoqjA+QMiO4GUaTjbJALEVxjZPi6g6CCEDYQD2rBIC/kBBUeoEKTXgPcoPDA1aWFFVqgbilqAX1xtFtIZwAQQKNdwmEIQOM8oDEpbLNyoIFrWEsClBFBhSPonCsb6Bop9EwIUovcsgCZCypMQYPjyObjKlxBhRWshYbeWoMNasO6W6DCFVRAYSsEQIXoQLdkYN0/iDsv4jwHaxTQDgAE0GgLawgBzEFu1FkuUCEC6mKBxnrQCyuQWtBsIbZZNlAhAWttoZ96gN7CARUuIDtA3TX0Fgo2gDyjhq4GlNnR7YONDZEDIIUobU8ABRVaoHA6SuLC1VFAHQAQQKMtrEEIwGNL7AoY22bQu1awwgQ0/gMauMa13grUGsC2khu98MC2Lw9UyKC3jLANoGMrsEDuQh7sB7XkQIPb6H5AP7uKlBNCQWECalHCWmmErvYCuwmo5xV0EoMcQMmZWqOAMgAQQKMF1iBtSYEyOqGZPViBBjqaGVfLAtQauALsSlHSGgBlUNA6K1wANLaDrUuIvAQBVOjhKiBAXT3IjUf28AIRtCgV1nWF7ZHE1lUE+Rt5Bk+aPwBvgQUqrGALgEFuAtkxOtM3dABAAI12CQchIKbmB3XxrkDHdGCDwsgD3yA2aFaTGnvgQAUAtsF5WOsNW4sD1JJBHvAndKEpaCkFzF+w2VhQSzNQ/wN4KQeokMG2NQndXGxn3CMD5EkDUME4einI0AIAATRaYA3BAgu0Xgh9wBfEhmwI/ghu8YAyIyijg5ZmOKodoNhNoEIJVJCACi7QGiaQGy48KcQ58Iy+wJPQbBpkKUMgeF0UrGUFaj0hj8Vhm22ELbZFLoTw3SqD3mql16UatFyWMZIAQAANiy4htVY/EwIKQglEX9RKCkBfwgDKsKD9huitBUKnVIIyPWgpAK6bkCkFIHcRsw4NvXUFKuCIWaKB3lp6+nEDijmgAgtbwYe+2BbUivqKpSDC1voi9Sp70CwpyB2w43pI6eajF7SjgHQAEEDDpMCiz+WptCgEIBka+wJRchepcg3wvXUGsqiFyn0yWzGQtVGIS0xBY1ygjI+e2UGLPpEH80GnQmBrOYHGt5ABqNtM6lo3UEsJdlwPqGUHKriIKfTQW32jG6jJAwABNDroPkgBJd049MyB7+x0cgC++wlBrRjkbheoUKCk2wUqjJDNA7Vu0M1Dn03FNY4liiZOausK3WxQq47QID88TthR44TQxvJRgB0ABNBogTVIATWPyMF3djq5XUNiW3f3KRwjAhUGyAUWttYTqJWEvPQCsoIetSWGPptIjttAZqAv6YBtpSI1PkdbWOQBgAAaFgUWaB0PPbqauKbvKQWgsamhBF7jyaSgwkRHsgGcsWEnn1JkF1rhCB54x7ILCLT3ErkwAbWEkFs+6AP2+JZZENO6wuU+YvTR4uKPkQIAAmiYFFgN9Cmw3i2g2/1zpFxzjt4KQG9JkGsWcpeS2MP3YK0i0JjSVQrXf2FrPYHcAXIPemED6hYit8RAavAVWGR1B9EmXIgdA0MfO6PFOfojBQAE0GiXcJACck+dAM1iIZ+MSsplDbiAo9oBkrqUoK4Wrhk9crug6LOF6AUWpNVXj9KqQT4dFb2wIaerSmgMDNedkrh2KCAD5PslR8e3cAOAABotsIYZABVYlLYkCI2/EMpQoAwJWhNGLQAaJ0IusNALI2zdauR1T6ACA7mFSE53EFvLFX38CpuZyJu/ES33BvDuBOSxuNGbo4kDAAE0unB0mBVW6JnjPg0WRhKT2ak5qIw+ToSttYfeNYOdsYWtdUXp7CAphQy2NYKwwxIpvRdxJAKAABptYQ0TADmRswGtm3RwWMxGoY9jwQoQ9AID5F9QYQYa1EYu5NC7ZOQU4uiFHsgOQuNzoAoE33HXoHE+UDeT0DE1sIXEo4CBASCARgusYVJYOaodwBgYp8ZkxGDZUoI+jgXacYBeYJ2HHrOMnPnRj2cGFTTkFOKkDtqD7EW/ZQn9/C8YG3RcD+hQxdFuIWEAEECjXcIhDmC3zKAXVqC9ftTIAOiDyJTOOFLSDQW1skB7GUED1NgKY5Aa9JYK+vHM5CxixXbdGr6lHbA7DdHBhScFWE8uBcUdaOU8+vjjKMAEAAE02sIaogCUKUDrndDPlwIBUMZGPxhvqLewQDOO5Mw6UmM5A7ZN17gqA1hhhV6BgApamB7QcTagghU97mCHF47eMo0bAATQaAuLhEQ6WAoq0FgVqBuBrbAi5xp3QuMwyGAoLXIFtT6RW0bEbsImlBZwtTJhXXP0cStQV/AKWosQVCiBjqtGB6BuL6TAI/7kVO4B3jtKTwAQQCOqhQW79p3QqQeghDfYZnBAmQa0ABHfBmx854xDDshzQOnKgJYn4BrPAYeB7ASyt6KQCyAnPVCndYhtZo/QyR6v0W7PAaUZ9FlJbK00kF2gY6OxHk2NowIBdU+//XqAoQ82rkXMLdMg9xE6A2w4AYAAGlEFFigzoN/rh9yNAhVi+K6Hp2frApYQQYUU+joibADU5SB0dC9k5T75J1uAMh811nXhjSN2BZqdvgEqeAgtgAWt73qFZ4YRW3cQdq8htvACFTr4KkfY7dzo3UjYLdMgOdAhg6B0CbsCDTmNYFvKMtS2epECAAJoRBVY+GorUKTjuxqe3O4Eqa0o0PS5KPhIYOJufwa5C9fFp8SMuZA6jjTSxlbQCyxQIQQLa1CFYgAsrLDFFagCBHXNiV2zhu0WalDlAJKDnFtPXCFOzpE5QwkABNCIG8Mid5YLdoQvrVuAoJqamMIK5A/QbBkx3QbkLiO5ANSCG2kXhsLO1sfWJQZ1W0GtdWxxBQpn0CUapCyfABUykLi8CO0uLoSfNU+KOffpdILqQAGAABpxs4S/SGwhgGfcHibQZQEmqAUDqk1xdVtAbgHVuiB15NSiID3Ettxg9oFaZvTc9P3+2wWUfXX0BujdKdBJIMh3PMIWpIJbP1gWhhLTNcfd5YaczQ/qYiKbQWwXD1TIDfdKBSCAGFeeZfg/kgos2OAzMYmHkqugKGlleevcxyikQDUnLdwCGlxHX2tFaFKCEgA6Yx65lUjpxmx6AVCLCrSMBLmbh7xgF1ax0apgB9mDs+UMLORBx0mPhIWnAAE04gqsoTJuAuqOgGrz4TYegTxLB/LbgyHehQEVZKBKZiSO7w0EAAig0QJrFIyCUTBkAEAAjS4cHQWjYBQMGQAQQKMF1igYBaNgyACAABotsEbBKBgFQwYABNBogTUKRsEoGDIAIIBGC6xRMApGwZABAAE0WmCNglEwCoYMAAig0QJrFIyCUTBkAEAAjRZYo2AUjIIhAwACaLTAGgWjYBQMGQAQQKMF1igYBaNgyACAABotsEbBKBgFQwYABNBogTUKRsEoGDIAIIBGC6xRMApGwZABAAE0WmCNglEwCoYMAAig0QJrFIyCUTBkAEAAjRZYo2AUjIIhAwACaLTAGgWjYBQMGQAQQKMF1igYBaNgyACAABotsEbBKBgFQwYABNBogTUKRsEoGDIAIIBGC6xRMApGwZABAAE0WmCNglEwCoYMAAig0QJrFIyCUTBkAEAAjRZYo2AUjIIhAwACaLTAGgWjYBQMGQAQQKMF1igYBaNgyACAABotsEbBKBgFQwYABNBogTUKRsEoGDIAIIBGC6xRMApGwZABAAE0WmCNglEwCoYMAAig0QJrFIyCUTBkAEAAjRZYo2AUjIIhAwACaLTAGgWjYBQMGQAQQKMF1igYBaNgyACAABotsEbBKBgFQwYABNBogTUKRsEoGDIAIIBGC6xRMApGwZABAAE0WmCNglEwCoYMAAig0QJrFIyCUTBkAEAAjRZYo2AUjIIhAwACaLTAGgWjYBQMGQAQQKMF1igYBaNgyACAABotsEbBKBgFQwYABNBogTUKRsEoGDIAIIBGC6xRMApGwZABAAE0WmCNglEwCoYMAAig0QJrFIyCUTBkAEAAjRZYo2AUjIIhAwACaLTAGgWjYBQMGQAQYAB/CmsiAI9jpgAAAABJRU5ErkJggg==";
const blockIconURI = menuIconURI;

var tf = require('@tensorflow/tfjs');
var handlib = require('handtrackjs');


const MlHand_Name = {
    'en': 'Hand Detection',
    'zh-cn': '手势检测',
};

const MlHand_IsLoaded = {
    'en': 'Is Loaded',
    'zh-cn': '已加载',
};

const MlHand_Detect = {
    'en': 'Detect Hand [IMGDATA]',
    'zh-cn': '检测手势 [IMGDATA]',
};

const MlHand_getX = {
    'en': 'X',
    'zh-cn': 'X坐标',
};

const MlHand_getY = {
    'en': 'Y',
    'zh-cn': 'Y坐标',
};

const MlHand_getW = {
    'en': 'W',
    'zh-cn': '宽度',
};

const MlHand_getH = {
    'en': 'H',
    'zh-cn': '高度',
};

const MlHand_getScore = {
    'en': 'Score',
    'zh-cn': '准确率',
};

const MlHand_whenDetected = {
    'en': 'When Detect Hand',
    'zh-cn': '当检测到手势',
};

const AvailableLocales = ['en', 'zh-cn'];

class MlHand {
    constructor (runtime) {
        this.runtime = runtime;
        this.locale = this.setLocale();

        //this.runtime.ioDevices.video.enableVideo();
        this.mlInit();
        this.X = '';
        this.Y = '';
        this.W = '';
        this.H = '';
        this.S = '';
    }

    getInfo() {
        return {
            id: 'mlhand',
            name: MlHand_Name[this.locale],
            menuIconURI: menuIconURI,
            blockIconURI: blockIconURI,
            blocks: [
                {
                    opcode: 'isloaded',
                    blockType: BlockType.REPORTER,
                    text: MlHand_IsLoaded[this.locale]
                },
                {
                    opcode: 'detect',
                    text: MlHand_Detect[this.locale],
                    blockType: BlockType.COMMAND,
                    arguments: {
                        IMGDATA: {
                            type: ArgumentType.STRING,
                            defaultValue: ''
                        }
                    }
                },
                {
                    opcode: 'getX',
                    blockType: BlockType.REPORTER,
                    text: MlHand_getX[this.locale]
                },
                {
                    opcode: 'getY',
                    blockType: BlockType.REPORTER,
                    text: MlHand_getY[this.locale]
                },
                {
                    opcode: 'getW',
                    blockType: BlockType.REPORTER,
                    text: MlHand_getW[this.locale]
                },
                {
                    opcode: 'getH',
                    blockType: BlockType.REPORTER,
                    text: MlHand_getH[this.locale]
                },
                {
                    opcode: 'getScore',
                    blockType: BlockType.REPORTER,
                    text: MlHand_getScore[this.locale]
                },
                {
                    opcode: 'whenDetected',
                    blockType: BlockType.HAT,
                    text: MlHand_whenDetected[this.locale]
                }
            ]
        };
    }

    isloaded() {
        return Boolean(this.model);
    }

    detect (args) {
        this.X = '';
        this.Y = '';
        this.W = '';
        this.H = '';
        this.S = '';
        let img = new Image();
        //img.src = this.runtime.ioDevices.video.getFrame({
        //    format: Video.FORMAT_CANVAS,
        //    dimensions: [480, 360]
        //}).toDataURL("image/png");
        img.src = args.IMGDATA;
        img.onload = async () => {
            this.IMAGE_WIDTH = img.width;
            this.IMAGE_HEIGHT = img.height;
            //const img0 = tf.browser.fromPixels(img);
            this.model.detect(img).then(predictions => {
                try {
                    console.log(predictions);
                    if (predictions.length > 0) {
                        x0 = parseInt(predictions[0]['bbox'][0]);
                        y0 = parseInt(predictions[0]['bbox'][1]);
                        w0 = parseInt(predictions[0]['bbox'][2]);
                        h0 = parseInt(predictions[0]['bbox'][3]);
                        this.X = parseInt(x0 * 480 / this.IMAGE_WIDTH) - 240;
                        this.Y = 180 - parseInt(y0 * 360 / this.IMAGE_HEIGHT);
                        this.W = parseInt(w0 * 480 / this.IMAGE_WIDTH);
                        this.H = parseInt(h0 * 360 / this.IMAGE_HEIGHT);
                        this.S = parseFloat(predictions[0]['score']).toFixed(2);
                    }
                } catch(e) {
                    console.log(e);
                }
            });
        }
    }

    getX(args, util) {
        return this.X;
    }

    getY(args, util) {
        return this.Y;
    }

    getW(args, util) {
        return this.W;
    }

    getH(args, util) {
        return this.H;
    }

    getScore(args, util) {
        return this.S;
    }

    whenDetected(args, util) {
        if (this.X === '' || this.Y === '' || this.W === '' || this.H === '') {
            return false;
        } else {
            return true;
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
        await handlib.load().then(model => {
            console.log(model);
            this.model = model;
        });
    }
}

module.exports = MlHand;
