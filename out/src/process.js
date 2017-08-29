"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
class Px2remProcess {
    constructor(options) {
        this.options = options;
        this.rePx = /([\d.]+)p(x)?/;
        this.rePxAll = /([\d.]+)px/g;
    }
    /**
     * 换px转换成rem
     *
     * @private
     * @param {string} pxStr
     */
    pxToRem(pxStr) {
        const px = parseFloat(pxStr);
        var remValue = +(px / this.options.rootFontSize).toFixed(this.options.fixedDigits);
        if(this.options.autoRemovePrefixZero) {
            if(remValue.toString().startsWith('0.')) {
                remValue = remValue.toString().substring(1);
            }
        }
        
        if(this.options.isNeedNotes) {
            remValue = remValue + 'rem' + ' /* ' + px + '/' + this.options.rootFontSize + ' */';
        }
        
        return {
            px: pxStr,
            pxValue: px,
            remValue: remValue,
            rem: remValue
        };
    }
    /**
     * px转rem
     *
     * @param {string} text 需要转换文本，例如：10px 12p
     * @return {Object} { px: '10px', pxValue: 10, rem: '1rem', remValue: 1 }
     */
    convert(text) {
        let match = text.match(this.rePx);
        if(!match) {
            return null;
        }

        return this.pxToRem(match[1]);
    }
    /** 批量转换 */
    convertAll(code) {
        if(!code) {
            return code;
        }
            
        return code.replace(this.rePxAll, (word) => {
            const res = this.pxToRem(word);
            if(res) {
                return res.rem;
            }

            return word;
        });
    }
}
exports.Px2remProcess = Px2remProcess;