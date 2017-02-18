class RomanConverter {

    convert(dec) {

        //roman numerals 0 - 99
        let ones = ["\u2001", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX"];
        let tens = ["", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"];
        let ten = [];
        let one = [];
        let romArr = [];

        //concat ones and tens
        for (let i = 0; i < dec.length; i++) {
            ten[i] = Math.floor(dec[i] / 10);
            one[i] = dec[i] % 10;
            /*every numerical representation of each unit has static numbers of digits (dependent on cols of table) 
            => fill with em spaces*/
            (parseInt(dec[dec.length - 1]) === 88)
                ? romArr[i] = ((tens[ten[i]] + ones[one[i]]) + "\u2001\u2001\u2001\u2001\u2001\u2001\u2001").slice(0, 8)
                : romArr[i] = ((tens[ten[i]] + ones[one[i]]) + "\u2001\u2001\u2001\u2001\u2001\u2001").slice(0, 7);
        }
        return new HtmlTable().create(romArr, dec, undefined);
    }
}