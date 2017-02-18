class BinaryConverter {

    convert(dec) {
        //powers of 2
        let utfExp = ["2\u2070", "2\u00B9", "2\u00B2", "2\u00B3", "2\u2074", "2\u2075", "2\u2076"];
        let binArr = [];

        //dec to bin conversions
        for (let i = 0; i < dec.length; i++) {
            /*every numerical representation of each unit has static numbers of digits (dependent on cols of table) 
            => fill with zeros*/
            (parseInt(dec[dec.length - 1]) >= 64)
                ? binArr[i] = ("000000" + parseInt(dec[i]).toString(2)).slice(-7)
                : binArr[i] = ("00000" + parseInt(dec[i]).toString(2)).slice(-6);
        }
        return new HtmlTable().create(binArr, dec, utfExp);
    }
}