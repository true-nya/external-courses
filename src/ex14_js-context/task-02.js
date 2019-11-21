class Hangman {
    constructor(word) {
        this.word = word.toLowerCase();
        this.replaceWord = new Array(this.word.length).fill('_');
        this.errorCount = 6;
        this.wrongSymbols = [];
    }
    guess(symbol) {
        if (this.errorCount) {
            if (this.word.indexOf(symbol.toLowerCase()) === -1) {
                this.errorCount -= 1;
                this.wrongSymbols.push(symbol.toLowerCase());
                console.log('wrong letter, errors left ' + this.errorCount + ' | ' + this.wrongSymbols.join(','));
            } else {
                for (let i = 0; i < this.word.length; i++) {
                    if (symbol.toLowerCase() === this.word[i]) {
                        this.replaceWord[i] = this.word[i];
                    }
                }
                if (this.replaceWord.join('') !== this.word) {
                    console.log(this.replaceWord.join(''));
                } else {
                    console.log(this.word + '| You won!');
                }
            }
        } else {
            console.log('you have no more chances')
        }
        return this;
    }
    getGuessedString() {
        console.log(this.replaceWord.join(""));
        return this.replaceWord.join("");
    }
    getErrorsLeft() {
        console.log(this.errorCount);
        return this.errorCount;
    }
    getWrongSymbols() {
        console.log(this.wrongSymbols);
        return this.wrongSymbols;
    }
    getStatus() {
        console.log(this.replaceWord.join("") + "| errors left" + this.errorCount);
        return this.replaceWord.join("") + "| errors left " + this.errorCount;
    }
    startAgain(newWord) {
        this.word = newWord.toLowerCase();
        this.replaceWord = new Array(this.word.length).fill('_');
        this.errorCount = 6;
        this.wrongSymbols.splice(0, this.wrongSymbols.length);
    }
}

module.exports = new Hangman("webpurple");