export const func = {
    generateNumbers: () => {
        var numbers = [];
        for (let index = 0; index < 7; index++) {
            let rndNumber = Math.floor(Math.random() * 40) + 1;
            if (numbers.includes(rndNumber) === false) {
                numbers.push(rndNumber);
            }
            else {
                index--;
            }

            if (index < 0) {
                index = 0;
            }

        }
        numbers = numbers.sort(function (a, b) { return a - b });
        return numbers;
    },
    getRowCost: () =>
    {
        return 4;
    }

}