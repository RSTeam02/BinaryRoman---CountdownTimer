/**
 * @rsTeam02
 * Multiconversion Clock => Control Unit
 */
class Controller {

    constructor(model) {

        this.model = model;
        this.model.setElapsed(1);
        this.view = new View();
        this.classCb = document.getElementsByClassName("cb");
        this.classRbConv = document.getElementsByClassName("rbConv");
        this.classBtn = document.getElementsByClassName("btn");
        this.buttonListener();
        this.setTimer(0)
        this.view.domLapView(this.getStrategy().start(this.model.convertHms(this.getTimer())));
        this.matrixListener();

    }

    matrixListener(msAdder = 0) {
        var classMat = document.getElementsByClassName("bin");

        for (let i = 0; i < classMat.length; i++) {
            document.getElementById(classMat[i].id).addEventListener("click", () => {
                if ([...classMat[i].id][0] === "0") {
                    msAdder += Math.pow(2, 6 - [...classMat[i].id][1]) * 3600000;
                } else if ([...classMat[i].id][0] === "1") {
                    msAdder += Math.pow(2, 6 - [...classMat[i].id][1]) * 60000;
                } else if ([...classMat[i].id][0] === "2") {
                    msAdder += Math.pow(2, 6 - [...classMat[i].id][1]) * 1000;
                } else {
                    msAdder += Math.pow(2, 6 - [...classMat[i].id][1]) * 100;
                }
                this.updateTable(msAdder);
            });
        }
    }

    updateTable(msAdder) {
        this.setTimer(msAdder);
        this.view.domLapView(this.getStrategy().start(this.model.convertHms(this.getTimer())));
        this.matrixListener(msAdder);
    }

    buttonListener() {
        var running = false;
        var delayed = 1;
        var start = 0;
        var classBtn = document.getElementsByClassName("btn");
        var btn = [];

        //start
        btn[0] = () => {
            if (!running) {
                classBtn[0].value = "stop";
                start = new Date().getTime();
                running = true;
                this.interval = setInterval(() => {
                    if (-this.model.elapsedLap > 0) {
                        this.updateView(start + this.getTimer(), delayed);
                    } else {
                        classBtn[0].value = "finished!";
                    }
                }, 75);
            } else {
                classBtn[0].value = "start";
                delayed = -this.model.elapsedLap;
                clearInterval(this.interval);
                running = false;
                this.setTimer(0);
            }
        }

        //reset
        btn[1] = () => {
            running = false;
            delayed = 0;
            this.setTimer(0);
            clearInterval(this.interval);
            classBtn[0].value = "start";
            this.model.setElapsed(1);
            this.view.domLapView(this.getStrategy().start(this.model.convertHms(this.getTimer())));
            this.matrixListener();
        }

        for (var i = 0; i < classBtn.length; i++) {
            classBtn[i].addEventListener('click', btn[i], false);
        }

    }

    updateView(start, delayed = 0) {
        this.model.startCountdown(start, delayed, (cb) => {
            this.view.domLapView(this.getStrategy().start(cb));
        });

    }

    setTimer(timer) {
        this.timer = timer;
    }

    getTimer() {
        return this.timer;
    }


    //dependent on conversion mode
    getStrategy() {
        var strategy = null;
        for (let i = 0; i < this.classRbConv.length; i++) {
            if (document.getElementById(this.classRbConv[i].id).checked) {
                document.getElementById("setTitle").innerHTML = document.getElementById(this.classRbConv[i].id).value;
                strategy = new ConvertStrategy(new Factory().execConvert(this.classRbConv[i].id));
            }
        }
        return strategy;
    }
}