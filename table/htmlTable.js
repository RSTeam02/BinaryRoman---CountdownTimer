class HtmlTable {

    create(numArr, dec, firstRow) {
        let str = "";

        if (firstRow !== undefined) {
            //dependent on number of digits, adjust first row 
            str += "<tr>";
            for (let i = numArr[numArr.length - 1].length; i >= 0; i--) {
                (i === numArr[numArr.length - 1].length)
                    ? str += `<th id="btmRight"></th>`
                    : str += `<th id="bottom">${firstRow[i]}</th>`;
            }
            str += "</tr>";
        }
        //rows for binary numbers of each time unit
        for (let i = 0; i < numArr.length; i++) {
            str += "<tr>";
            for (let j = 0; j <= numArr[i].length; j++) {
                //first column (j = 0) contains time units in dec, else binary numbers
                (j === 0)
                    ? str += `<th class="dec">${dec[i]}</th>`
                    : str += `<td id = "${i}${j}" class="bin">${numArr[i][j - 1]}</td>`;
            }
            str += "</tr>";
        }
        return str;
    }
}