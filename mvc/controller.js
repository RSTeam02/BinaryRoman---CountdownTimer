/**
 * @rsTeam02
 * Multiconversion Clock => Control Unit
 */

import { Countdown } from "./countdown.js";
import { View } from "./view.js";
import { ConvertStrategy } from "../strategy/convertStrategy.js";
import { Factory } from "../factory/factory.js";


export class Controller {

    constructor() {

        this.model = new Countdown();
        this.view = new View();
        this.factory = new Factory();
        this.model.setDefault();
        this.classRbConv = document.getElementsByClassName("rbConv");
        this.buttonListener();
        this.setTimer(0);
        this.view.domLapView(this.getStrategy().start(this.model.convertHms(this.getTimer())));
        this.matrixListener();

    }

    matrixListener(msAdder = 0) {
        let res = 0;
        $(".bin").on("click", (event) => {
            var currentId = parseInt(event.currentTarget.id);

            if (Math.floor(currentId / 10) === 0) {
                res += this.op(msAdder, Math.pow(2, 6 - currentId % 10) * 3600000);
            } else if (Math.floor(currentId / 10) === 1) {
                res += this.op(msAdder, Math.pow(2, 6 - currentId % 10) * 60000);
            } else if (Math.floor(currentId / 10) === 2) {
                res += this.op(msAdder, Math.pow(2, 6 - currentId % 10) * 1000);
            } else {
                res += this.op(msAdder, Math.pow(2, 6 - currentId % 10) * 100);
            }
            this.updateTable(res);

        });
    }

    op(a, b) {
        if (document.getElementById("plus").checked) {
            a += b;
        } else {
            a -= b;
            if (a <= 0) {
                a = 0;
            }
        }
        return a;
    }

    updateTable(msAdder) {
        this.setTimer(msAdder);
        this.view.domLapView(this.getStrategy().start(this.model.convertHms(this.getTimer())));
        this.matrixListener(msAdder);
    }

    buttonListener() {
        var running = false;
        var finished = false;
        var stopped = false;
        var delayed = 1;
        var resetPush = 1;
        var start = 0;

        $("#startBtn").on("click", () => {
            resetPush = 1;
            if (this.getTimer() > 0) {
                if (!running) {
                    $("#startBtn").prop('value', 'stop');
                    start = new Date().getTime();
                    running = true;
                    finished = false;

                    this.interval = setInterval(() => {
                        if (-this.model.elapsedLap >= 50) {
                            (stopped)
                                ? this.updateView(start, delayed)
                                : this.updateView(start + this.getTimer(), delayed);
                        } else {
                            $("#startBtn").prop('value', 'finished');
                            clearInterval(this.interval);
                            alert("finished");
                            finished = true;
                        }
                    }, 100);

                } else {
                    if (!finished) {
                        $("#startBtn").prop('value', 'start');
                        delayed = -this.model.elapsedLap;
                        clearInterval(this.interval);
                        running = false;
                        stopped = true;
                    }
                }
            }
        });


        $("#resetBtn").on("click", () => {
            stopped = running = false;
            delayed = 0;

            this.model.setDefault();

            if (resetPush === 2) {
                this.setTimer(0);
                resetPush = 1;
            }

            clearInterval(this.interval);
            $("#startBtn").prop('value', 'start');
            resetPush++;
            this.view.domLapView(this.getStrategy().start(this.model.convertHms(this.getTimer())));
            this.matrixListener();
        });
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

    getStrategy() {     
        let currRadioVal = $('input[name=conv]:checked').val();
        let currRadioId = $('input[type=radio][name=conv]:checked').attr('id')
        let factory = new Factory();
        $("#setTitle").html(currRadioVal);
        
        return new ConvertStrategy(new Factory().execConvert(currRadioId));
    }
}