import { BinaryConverter } from "../converter/binaryConverter.js";
import { RomanConverter } from "../converter/romanConverter.js";


export class Factory {
    //dependent on selected conversion mode via radiobutton
    execConvert(mode) {
        switch (mode) {
            case "bin":
                return new BinaryConverter();
            case "rom":
                return new RomanConverter();
            default:
                return null;
        }
    }
}