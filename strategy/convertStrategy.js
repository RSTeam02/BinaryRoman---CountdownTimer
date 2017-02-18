class ConvertStrategy {
    //pass strategy arg
    constructor(strategy) {
        this.strategy = strategy;
    }

    start(seq) {
        return this.strategy.convert(seq);
    }
}