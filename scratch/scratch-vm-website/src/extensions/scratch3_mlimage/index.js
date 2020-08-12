require('babel-polyfill');
const Runtime = require('../../engine/runtime');

const menuIconURI = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAASwAAACWCAYAAABkW7XSAAAACXBIWXMAABJ0AAASdAHeZh94AAAABGdBTUEAALGOfPtRkwAAACBjSFJNAAB6JQAAgIMAAPn/AACA6QAAdTAAAOpgAAA6mAAAF2+SX8VGAAAX90lEQVR42mJceZbhP8MoGAWjYBQMAQAQQEyjQTAKRsEoGCoAIIBGC6xRMApGwZABAAE0WmCNglEwCoYMAAig0QJrFIyCUTBkAEAAjRZYo2AUjIIhAwACaLTAGgWjYBQMGQAQQKMF1igYBaNgyACAABotsEbBKBgFQwYABNBogTUKRsEoGDIAIIBGC6xRMApGwZABAAE0WmCNglEwCoYMAAig0QJrFIyCUTBkAEAAjRZYo2AUjIIhAwACaLTAGgWjYBQMGQAQQKMF1igYBaNgyACAABotsEbBKBgFQwYABNBogTUKRsEoGDIAIIBGC6xRMApGwZABAAE0WmCNglEwCoYMAAig0QJrFIyCUTBkAEAAjRZYo2AUjIIhAwACaLTAGgWjYBQMGQAQQKMF1igYBaNgyACAABotsEbBKBgFQwYABNBogTUKRsEoGDIAIIBGC6xRMApGwZABAAE0WmCNglEwCoYMAAig0QJrFIyCUTBkAEAAjRZYo2AUjIIhAwACaLTAGgWjYBQMGQAQQKMF1igYBaNgyACAABotsEbBKBgFQwYABNBogTUKRsEoGDIAIIBGC6xRMApGwZABAAE0WmCNglEwCoYMAAig0QJrFIyCUTBkAEAAjRZYo2AUjIIhAwACaLTAGgWjYBQMGQAQQKMF1igYBaNgyACAABotsEbBKBgFQwYABNBogTUKRsEoGDIAIIBGC6xRMApGwZABAAE0WmCNglEwCoYMAAig0QJrFIyCUTBkAEAAjRZYo2AUjIIhAwACaLTAGgWjYBQMGQAQQKMF1igYBaNgyACAABotsEbBKBgFQwYABNBogTUKRsEoGDIAIIBYRoNgaAFuNgWGX38/MPwGYlKAAKcBAxuLAJz/9ecDhq+/HgyLMIH57dXnA6MJZJgDgAAaLbCGGNCWbGBQEI5n+PD9IsNrYAa9/3YBkH0Brx5pgQAGa6X1KGJH7wUOygILVCCriRUwXHneQLBQBvkLpFaUx57h26+HDFuuKAz6+BPjdWBwUN0P57/+cpBh/y2H0YRNJAAIoGFTYLEyCzAIchkMGfe+/3aB5FYSLJNCWhX6YPzqywG8BRaoADCTX4Ai9uDtQoanHzYMynAxU1gALoAUhBMYbr2awHAVWHDhalUhF8JcbPJgPQ/eLqCLO0F2sQHTHMiNA1HocQHjlV5+HUwAIICGTYEFKqyQa67BDg7cdiS5CwMqrFiZ+eH8338/4i14QIW4tfIGFD2gltn5JwWDMkxA/gMVVhC38wNbk/XgAvfUwwQMtaBCGuQXUKENA6DWFj0yMaiwNJOfD2aLAguPUw8SyKp8yC0oYXaL8ThgDZvhDAACaLRLOISANH8ACp9QK8lQZgJKhoa0rhaQ3BKlx3gXqHAFuRcd4GphgQCodQPLvLBWJ61bWaDCylHtAFKc+DO4a15gOHI3gGDXnFIACh9VsXykwiseTI+kQgsggEYLrKFUYAmgFlgP3uHOmKBuICxBIwMDmX6S7b36vBFvwUENoCPZAO7WoduLr6AEFUzo+kB8UEFOyxYPyGzkVivIfjfN8wwXnhTSpIsIKsxBXWVQ4TjSAUAADdsCCzQIe5/EmhbU/aBVS0IRWPOjZ0hKuoMg/+HqUoK6RtgKq8FcECO3HGD+IybzgwbnkVtZoDAG+Z9WBSyoFbXzugHWAgRUGVC7iwjufgLtQm8pgwCtCsjBDAACaNgWWKCCh5REC8o0oDET0IA0KBFQu3kPGSiloMBC6w7iKoxBXSJyWlEDBcCtB3lMv4C6OcRkelArC1QZwMa+QAAUj6BWFq26aCB3Hb0LmaFED2tQIQbqMoLkKa38QGkSFDbIFRXE/o8MR+8FjMhlHAABNNolZECdSQO1TEB4MNVeoEyN0R3EUmAhD8giWgQXwdPmxGR+2PgM+iA9LcPBBm1SAARuv5pIUmYEVUzoEy4gc0EtIVp2DWEVm7USqh9ArSE3zQvgcCe30EQfr0KOD2oUhkMVAATQ6Ep3IECfSSOnO0nrLhOy+0Brd9ATLGh9Fi0KK2L1kwNAbkZuGcHC/gqJ3TlQ4QYq5JABqDUL6krRGoDsBoURyN2olQw/uFVNDgBVntgKK5AfdwEL4ZFaWIEAQACN+AILlDjQxwdAMz70mqYmBoC6PPi6gyA/gLpB6Bmf2MIGNqhLz8IK1BpEdzMlYQ8q5NALDVD3DFQo0hrAxrVAYYZoAS8ku2UKWnaCbBakCxg4aJej0BMABNCI7hKCMg22wWnQjA+lYNU5Rqp1V5FbIaDEC+sO4po9AqkhNuODzAC1rJALbVoXVqDWHPYlDI1kd6FAbgWNe6F3DUGFIqhFQuv1WSD7QWEGCssP3y5QtNQA2SwQGMldQHQAEEAjtsDCNt4zGAF6CwFWa+ObPQK1lCgpdEFmBuq/J6iOnG0loAIYvesJAk8/bqR4Zg/UPQMVeugtN1g806vQokZBT02zhhMACKARWWANlcIK12A7rkw/FPxjjWWQHdSVAy0FoAYAFXoCXAYYrU5yC60wo/80DRNQ65nadpCzi2KoAIAAGnEFFq7CCjQrSE53xADravKFVHEraNoc22A7KOODaGytq8FcWKF3PUntvhILQIUfNrtA8S4IbJmOjgUNXQAQQCOqwMK2bga560XqNDS2AXtQYUWtrRIg9+IcrwFmSli3D2QnqABD7gqBalmChbcQ6hgeMYU2Ofs1cRVW4PGZe9Tf0oI8BoRuJ2j2DdQCG2wTK6OAOAAQQCOmwMK2VQXUFYEt5gS1ZEAJnJhCC7bvDd08ahZWoJYgvi4fyI2g8RpQpgONa6GPdRHTJUDXA5p9pHYmxldYnXqYSLOuC6zQ8tF5gBGOoG4YaP8fKK4I2Q8KY0oA6EQHbEsUkNMgtZfQgPZ+DlcAEEDDvsACjfeAxk3QMwxokBfUSgHtPYMlKGIKLVyD3dQsrEBAh4jpeEoGqdFnH0Ezg9QurLCt7UIurOgxCA46IwtbgQmqqECtRdDaJnxnb1ESxrCV6qgVDeoJE6CW8esvB8DHxdB6D+RwAAABNOzXYRnIYh9jOgrtEoDGM5DHnGAzbNi6YyAxbIkflOipWViB7KFkGw+xLTjUMKFu4QHKrLgKK1CrhV5nOcFaWsjrmtC7iKBWGHp4UNqqBLXAQed1IfsflM4uoI2fgStUpQ3g8TXQzCyogCN3welIAAABNOxbWOgDsNi23MD2rSE33UFjXaBMd/5xAfj4XWyD66ABY5Beah6GB0rs1FjsSCjRoxfIoGOXqZVRQO7HtigUV/jTq9DCdeIBqFABFRigMAEVKJR0U0FpBlRYoVc4sBYlehijq4NtDYNt/qZFN30oA4AAGvYFFnJivQ1MALgSI6il9R7YDUSeQQR1mXCtZ6LVni70mUFyAamD49RY5gEqbEF7+NC329CzG4gvHYDiC19hCqqQQK0dcra/gAoibFuNCG1UBhVMILvQ9YEKMlClCcKglhnoKKHRM+sZGAACaERszYElVkIRDspMu64bEjQPlIBosacLdp75UA5nXAO+A1lYoY9JgWZQ0bfxwACociMlXsFHNQMLaVAFgV7ogJahgMbQ8KU7kF0gO7deUQQPLYAKOMzuezzYfFDXFVKhCYzYAgsggEZPa0BKeKA9e+gLNbGP/8SDp8ZBXUHQgCm1aj7QeBty6wo0MTDUDm0DdZG52RED+qAMCMqQoPACdc0HEoC696DJFFB8gfb+IU+4wApVYpdY4GpRIQpG0g49BBVcoFY+CIPG09CPzMHW6qLFMUiDHQAE0IgusECFE+hcbBBN6iA37BIIBoZ6eG0K2kMG6lZ+AyY+cs5rRy+cLgAzGLkFFvpeRmzLOqg9swkDoDVOoGUDv6AtW1BmRD6vfaAA8jVnsAmXpx83gMcnQZUPoRYgqAUMu6kHV3oBpQNYwUguALkDhEGVKMgu9NM6kMe6YMf/jJQZRoAAGlEFFigBgGpG0KmQhAoC2CZj2AAxoYQKyozYjkoh9iBB9M3AhI4HxtbVwWYPvj2HAmTcMgTKtKCWIKgwxeU+2LghOfcn0hJg666CKhZQ9x4XgG2PwlahoKcXyIwz9bq9oEIPVKGwPhEAt7iwpT9QvILGH38D0w8svQ7njdIAATSsCyxw4QRsQUFo4mp3UDcMFPHoM3+ghADCyF1HQq0ykDwowYOu9CIEQBkH1gIi9nhgfABkL3qXB1srEdTyIraVhXwCJqjgwrc5dzBmGlLHpnAV9OgFFSxtEFM4gwpN5MWoxLgJtjgYhHF1F0FxAoprEAZvJH/WMCy7iwABNOxbWLhmhNALKVABRUyzGpQIYGMNsBYbvu4OsQkZkhghBRbIbEpaJqCxFWyzjaDMBWqFIW9PAtkJ6hYRui4MvfADZWTQmBSxJwqAKgHQeB+hQgJ96xQxW4yINYuahRupBRVqtxERDr/+kKYX1l3EN4YGagmCWsDDEQAE0LAusECtFtCYArapZlAGBV1CCqJB116B9tWBWg2gxARKRMTUTpC78S6AEy0oU4MSEWhMDNTlhNXMxHYRPoDHvh6Cx8DIWdcFsh9XtwE2tgJakwbKiKCuGvIyBlCractnBawZD+QnkDw2M0lpsYDUktPqGqipfNjMMuioY2xHRpM7ZoR+cCG544igcHn12QGcZmG3gZM7nDCUAEAADfsWFuy8b1CGBUUytssJQBc8ICK8HiVxgiIeNJgO0gNKoLgyEEgO1kqDFSCk3sID2iJCamEFskMBWlBhW7+FPraC7cgakD7QGBpyxsHXpaTFgllIF1oBw56B7kKCwg52dRhoESel3Sz0cUNKCxaQflBcgNI5qOACxe1wvkkHIICGfYEFKmAInf6JaykDbCYQfbAV1hKCFWTYMi6oACM1cZMyYAtq+aCftoAO0PfJ4RuXAZkDSvSwGT1sq7WxmUlNwI1WYA2GMRhYF4xWfiTUTSa14GJ4OLzzM0AAjfh1WKAEROqSBpB6EAYVZKBWwPoP9F3IBz4IT2kDzhXxoG4GrPBB7oqACiH0q+6R+aDZP9DpAtjGRUCtTUq3rZDc+qDiqQPktNZAaQO0poyqfsTYhK1A9b2D9Lipe6AAQACN+AILFLGgFhioEACNZYESEDc0ERFTmFG7W0Ts+ArsvCf0zbXoBRWuc99h57YjH7+Cb9qeHueKg8b/aNXCIscsXBdlUBPQ4uRbetzUPVAAIIBGV7ojFQLIrYerz1G7X6DuFKgAA7UCkFsgr6jUpCcnA4LGVwzxrL8BjWuBxjXQW2LIA72Qs7QIZ0qQWbQ8qRMUvujupKTAGsnbV4YzAAigEVdgwVpSoLVRxI7DQGZkDmBkMNj2nME2vgIqYHGdLoG+uBF9TAW5pYZ8jhiotUGrsSuYm7GFOyUF4CgYfgAggEZcgYU+8wWaPQRN84MG0EEtFNC2GmIKM9iShsEE8K3NQT9dAv9JoIjWF6zLAmr9gFpZtOpqoG/6Bq2NG2gAGhBHbmlT1ILEcjEGun8/fLtANXcPVwAQQCOuwEKfEYRlbmx3+4EKJNgAJigRDNbBTFyrn2H+ABUyyFPdhFZxgwo+2BKQ30gD9aCuI7ZlIdQoaNHHCqndcv1FRssQW8uaXACqHPCGAY8DeJ3c6NlX+AFAAI2oAouUGUFQJkXdH1iP0ioDFV6wVhYp3Utqjvkogi+CxX32O6jWRt/zh222EJvZoIyKOC8e4XdQQYdv7x05ANuBhdQusKjVeiG39YhemYAGxpHXziEfzz1aaOEGAAE0ogosUC0LSiigqXtQE52cJQ2wVhkkASLWQCFvdKb16mxYdw5XoQMqUNHdgW+2EDxepbQeRS0MgAosUMEICydS9x8S0+JFz8ygMTRKM+1gOWYYVPijF8iwMAelF+RZQlK3O41EABBAI6rA+g0usBqwJm5QJoUNpINnA0m88w+2NoseN5aAt43cC8A4VRRbQQUrFGCbltFbYIS6ISA50GA7csYCLTIFzY5SuqASXIjKY5oxXKbkYSewooc77Fx38J5AYFcQefHvaKGFHwAE0OiyBgbEbBR6NwS5AIMtbcB/9dZFuo1xgdwMOh8dtMEXV0EFcjeoVYVtbAvfWh30BZygjIU+Rkbp9e+4WomwOxap0bJBL3jp3bICFVboLXjQTgHkeAJvogeGN3IFCWKD1sfhO1p5pAKAABotsPCNeyDNBMJmi2BrsWAnNSAXYvQ+Ahi2CRc9g+O6NxHWdSV0H99vLCcIQC5uRd0IDCq0QOFBaosI3y3Q1FjrRe01XeR0c7G1aEEVGrr/cF36CtJLzDVkIw0ABNBogUUigJ06ACookAsx0AkNrwegNkQurAhthMaV+NFbI9haOLC9ashjXSAAGpAHFeDEznARWk5BjYyJ7Vz893QYdIcdboht+QJsZwGubje+m6pBcUrtwwGHKgAIoGFbYMGOe6EXAK3fAu07w7X3jJYrr2FH6eLaCE1oHyCx4QQqpEGFHvoJDqAMCspshGYPQfbg2gMJ6qJSY2ZQQRhzQzgtLolFL6jQj3hBBqAu+xHoPZg4W7VAOVD4YTvKGnYNGWgN4X3oroaR2uICCKBhW2CBaipSr7oaagUyqOuBa/0VchcLX82M7R5EfAsPQeaB9CBnKlCBAGph4bMDVxcVNm6Fq1upAD3dFbYsAXbMD9bwQDkmCLXrPBDhD2vVktLNBR/b83ED1i4laDwM1KIFr4eDHjoJatUP5yOR0QFAAI12CYcowHUpKKyggp2GCb5oA9qCQj6YEJbhdND2GoL0EhrohS1pgF2CgGtGC2QHqOWH765FQht1QS1XkD/JvYwDNGZHra4UKXcCEDNWiK8lCzpQEV8hjxwmoDiAHXU0UOsC6QUAAmi0wBqiANSiQT5pAb2ggiVYQpcnYBYgDUS3BEA1O7buCex+RXyLWom9tIGSZSIgO0BdMXK7eaCww7bhnZCdoDChdGkGKExBYQy6QBXfdWKw3gRk7CsexR20uDtzoAFAAA3bAgtUw90fRIOUyIsvqQGQ12LhO18c1GUgtsCC3XVHaeEGaoHgu/wC+bhmQoDcDAfrppI7OwhqHZJyJjytrpaHHYVMaJwSV4Uy3ABAAA3bAovY67XoBbDtl6NGYj56LxC+jQZ7xiWcYanVKkAUfJgLImGZGjRLSWoXDTQOhL42DH2XAmynAahFRuhSDeIKvAvgAhxfAQG7G4Aa9hHjHlAhBGqVErp2DDa+NRwBQACNdgmHOCCUMEGFGfK1UtgyAr4Cj+wuK9IN0LDWLrmzW7Q8h4uQveiXmIJabqBWK+wCE3oDUPjBjhWCzYSDJhtgi09BhehwvTEHBAACiHHlWYb/o9l+FNACwAb2h/L6IZD7Qd0x0MzpYB/Mhl18MpyvrwcIoNECaxSMglEwZABAADGNBsEoGAWjYKgAgAAaLbBGwSgYBUMGAATQaIE1CkbBKBgyACCARgusUTAKRsGQAQABNFpgjYJRMAqGDAAIoNECaxSMglEwZABAAI0WWKNgFIyCIQMAAmi0wBoFo2AUDBkAEECjBdYoGAWjYMgAgAAaLbBGwSgYBUMGAATQaIE1CkbBKBgyACCARgusUTAKRsGQAQABNFpgjYJRMAqGDAAIoNECaxSMglEwZABAAI0WWKNgFIyCIQMAAmi0wBoFo2AUDBkAEECjBdYoGAWjYMgAgAAaLbBGwSgYBUMGAATQaIE1CkbBKBgyACCARgusUTAKRsGQAQABNFpgjYJRMAqGDAAIoNECaxSMglEwZABAAI0WWKNgFIyCIQMAAmi0wBoFo2AUDBkAEECjBdYoGAWjYMgAgAAaLbBGwSgYBUMGAATQaIE1CkbBKBgyACCARgusUTAKRsGQAQABNFpgjYJRMAqGDAAIoNECaxSMglEwZABAAI0WWKNgFIyCIQMAAmi0wBoFo2AUDBkAEECjBdYoGAWjYMgAgAAaLbBGwSgYBUMGAATQaIE1CkbBKBgyACCARgusUTAKRsGQAQABNFpgjYJRMAqGDAAIoNECaxSMglEwZABAAI0WWKNgFIyCIQMAAmi0wBoFo2AUDBkAEECjBdYoGAWjYMgAgAAaLbBGwSgYBUMGAATQaIE1CkbBKBgyACCARgusUTAKRsGQAQABNFpgjYJRMAqGDAAIoNECaxSMglEwZABAAI0WWKNgFIyCIQMAAmi0wBoFo2AUDBkAEECjBdYoGAWjYMgAgAADAAVGlVq8PnQ/AAAAAElFTkSuQmCC";
const blockIconURI = menuIconURI;

const ArgumentType = require('../../extension-support/argument-type');
const BlockType = require('../../extension-support/block-type');
const Base64Util = require('../../util/base64-util');
const Clone = require('../../util/clone');
const Cast = require('../../util/cast');
const Video = require('../../io/video');
const formatMessage = require('format-message');
//import * as tf from '@tensorflow/tfjs';
//import * as mobilenetModule from './mobilenet.js';
//import * as knnClassifier from '@tensorflow-models/knn-classifier';
const SvgRenderer = require('scratch-svg-renderer');

var tf = require('@tensorflow/tfjs');
var mobilenetModule = require('./mobilenet.js');
var knnClassifier = require('@tensorflow-models/knn-classifier');

const MlImage_Name = {
    'en': 'Image Classification',
    'zh-cn': '图像分类',
};

const MlImage_IsLoaded = {
    'en': 'is loaded',
    'zh-cn': '已加载',
};

const MlImage_Train = {
    'en': 'Train Image [IMGDATA] Class [LABEL]',
    'zh-cn': '训练图片 [IMGDATA] 类别 [LABEL]',
};

const MlImage_ClassCount = {
    'en': 'Class Count',
    'zh-cn': '所有类别数目',
};

const MlImage_ClassNames = {
    'en': 'Class Names',
    'zh-cn': '所有类别名称',
};

const MlImage_SampleCount = {
    'en': 'Sample Count',
    'zh-cn': '所有样本数目',
};

const MlImage_GetSampleCount = {
    'en': 'Sample Count [LABEL]',
    'zh-cn': '样本数目 [LABEL]',
};

const MlImage_ResetAllClasses = {
    'en': 'Reset All Classes',
    'zh-cn': '重置所有类别',
};

const MlImage_ResetClass = {
    'en': 'ResetClass [LABEL]',
    'zh-cn': '重置类别 [LABEL]',
};

const MlImage_Predict = {
    'en': 'Predict Image [IMGDATA]',
    'zh-cn': '预测图片 [IMGDATA]',
};

const MlImage_PredictClass = {
    'en': 'predictClass',
    'zh-cn': '预测类别',
};

const MlImage_PredictConfidence = {
    'en': 'predictConfidence',
    'zh-cn': '预测准确率',
};

const MlImage_WhenPredict = {
    'en': 'when predict class [CLASS] confidence [CONFIDENCE]',
    'zh-cn': '当预测类别 [CLASS] 准确率 [CONFIDENCE]',
};

/**
 * Class for the motion-related blocks in Scratch 3.0
 * @param {Runtime} runtime - the runtime instantiating this block package.
 * @constructor
 */
class MlImage {
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
     * Dimensions the video stream is analyzed at after its rendered to the
     * sample canvas.
     * @type {Array.<number>}
     */
    static get DIMENSIONS() {
        return [480, 360];
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
            id: 'mlimage',
            name: MlImage_Name[this.locale],
            menuIconURI: menuIconURI,
            blockIconURI: blockIconURI,
            blocks: [
                {
                    opcode: 'isloaded',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'mlimage.isloaded',
                        default: MlImage_IsLoaded[this.locale],
                        description: 'knn is loaded'
                    })
                },
                {
                    opcode: 'train',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'mlimage.train',
                        default: MlImage_Train[this.locale],
                        description: 'Train'
                    }),
                    arguments: {
                        IMGDATA: {
                            type: ArgumentType.STRING,
                            defaultValue: ""
                        },
                        LABEL: {
                            type: ArgumentType.STRING,
                            defaultValue: ""
                        }
                    },
                    filter: ['sprite']
                },
                {
                    opcode: 'classCount',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'mlimage.classcount',
                        default: MlImage_ClassCount[this.locale],
                        description: 'class count'
                    })
                },
                {
                    opcode: 'classNames',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'mlimage.classnames',
                        default: MlImage_ClassNames[this.locale],
                        description: 'class names'
                    })
                },
                {
                    opcode: 'sampleCount',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'mlimage.samplecount',
                        default: MlImage_SampleCount[this.locale],
                        description: 'sample count'
                    })
                },
                {
                    opcode: 'getSampleCount',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'mlimage.getsamplecount',
                        default: MlImage_GetSampleCount[this.locale],
                        description: 'get sample count'
                    }),
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
                    text: formatMessage({
                        id: 'mlimage.resetallclasses',
                        default: MlImage_ResetAllClasses[this.locale],
                        description: 'reset all classes'
                    })
                },
                {
                    opcode: 'resetClass',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'mlimage.resetclass',
                        default: MlImage_ResetClass[this.locale],
                        description: 'reset class'
                    }),
                    arguments: {
                        LABEL: {
                            type: ArgumentType.STRING,
                            defaultValue: ""
                        }
                    }
                },
                {
                    opcode: 'predict',
                    blockType: BlockType.COMMAND,
                    text: formatMessage({
                        id: 'mlimage.predict',
                        default: MlImage_Predict[this.locale],
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
                        id: 'mlimage.predictclass',
                        default: MlImage_PredictClass[this.locale],
                        description: 'predict class'
                    })
                },
                {
                    opcode: 'predictConfidence',
                    blockType: BlockType.REPORTER,
                    text: formatMessage({
                        id: 'mlimage.predictconfidence',
                        default: MlImage_PredictConfidence[this.locale],
                        description: 'predict confidence'
                    })
                },
                {
                    opcode: 'whenPredict',
                    blockType: BlockType.HAT,
                    text: formatMessage({
                        id: 'mlimage.whenPredict',
                        default: MlImage_WhenPredict[this.locale],
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
        return Boolean(this.mobilenet);
    }

    train(args, util) {
        let img = new Image();
        img.src = args.IMGDATA;
        img.onload = async () => {
            const img0 = tf.browser.fromPixels(img);
            const logits0 = this.mobilenet.infer(img0, 'conv_preds');
            this.classifier.addExample(logits0, args.LABEL);
        }
    }

    classCount(args, util) {
        var count = this.classifier.getNumClasses();
        return count;
    }

    classNames(args, util) {
        let samples = this.classifier.getClassExampleCount();
        return Object.keys(samples).join(',');
    }

    sampleCount(args, util) {
        let samples = this.classifier.getClassExampleCount();
        let counts = Object.values(samples);
        
        var count = 0;
        for (var i = 0; i < counts.length; i++) {
            count += counts[i];
        }
        return count;
    }

    getSampleCount(args, util) {
        let samples = this.classifier.getClassExampleCount();
        return samples[args.LABEL] || '';
    }
    
    resetAllClasses(args, util) {
        this.classifier.clearAllClasses();
    }

    resetClass(args, util) {
        try {
            this.classifier.clearClass(args.LABEL);
        } catch (e) {
            return;
        }
    }

    predict(args, util) {
        this.resultClass = null;
        this.resultConfidences = null;
        let img = new Image();
        img.src = args.IMGDATA;
        img.onload = async () => {
            const img0 = tf.browser.fromPixels(img);
            const logits0 = this.mobilenet.infer(img0, 'conv_preds');
            let res = await this.classifier.predictClass(logits0);
            this.resultClass = res.label;
            this.resultConfidences = res.confidences;
        }
    }

    predictClass(args, util) {
        return this.resultClass;
    }

    predictConfidence(args, util) {
        return (this.resultConfidences && this.resultConfidences[this.resultClass]) || 0;
    }

    whenPredict(args, util) {
        if (this.resultClass === null || this.resultConfidences === null) {
            return false;
        }
        var confidence = (this.resultConfidences && this.resultConfidences[this.resultClass]) || 0;
        return (this.resultClass === args.CLASS) && (confidence > args.CONFIDENCE);
    }

    async knnInit () {
        this.classifier = knnClassifier.create();
        this.mobilenet = await mobilenetModule.load();
        //this.mobilenet = await tf.loadLayersModel("/00000000-0000-0000-0000-000000015000/model/knn/model.json");
        //console.log(this.mobilenet.summary());
    }
}

module.exports = MlImage;
