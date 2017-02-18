define(["../factory/factory","../strategy/convertStrategy","../table/htmlTable","../converter/romanConverter","../mvc/countdown", "../converter/binaryConverter", "../mvc/view", "../mvc/controller"], function () {
    
    new Controller(new Countdown());
});
