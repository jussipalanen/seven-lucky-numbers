export const func = {
    generateNumbers: (length = 7, excluded = []) => {
        var numbers = [];

        if (length == null || length < 1) { 
            length = 7 
        }

        let index = 0;
        while (index < length) 
        {
            let rndNumber = Math.floor(Math.random() * 40) + 1;
            if( excluded.includes(rndNumber) === false && numbers.includes(rndNumber) === false )
            {
                numbers.push(rndNumber);
                index++;
            }
        }
        numbers = numbers.sort(function (a, b) { return a - b });
        return numbers;
    },
    getRowCost: () => {
        return 4;
    }

}