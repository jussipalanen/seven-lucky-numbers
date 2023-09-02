<script>
export default {
    data() {
        return {
            number: null,
        }
    },
    props: ['number'],
    methods: {
        setNumber( number )
        {
            this.number = number;
        },
        setMinMax(number) {
            if (number > 40) {
                return 40;
            }
            else if (number < 1) {
                return 1;
            }
            return number;
        },
        findNewNumber( numbers )
        {
            for (let number = 1; number <= 40; number++) 
            {
                if( numbers.includes(number) === false )
                {
                    return number
                }
            }
            return null;
        },
        checkNumbers(event) {
            let el = event.target;
            let value = this.setMinMax(parseInt(el.value));
            el.value = value;
            const row = el.closest('.row');
            const numberInputs = row.querySelectorAll("input[name='number[]']");
            const reservedNumbers = [];
            for (let x = 0; x < numberInputs.length; x++) {
                const numberInput = numberInputs[x];
                let numberValue = this.setMinMax(parseInt(numberInput.value));
                if( numberValue && reservedNumbers.includes(numberValue) )
                {
                    numberValue = this.findNewNumber( reservedNumbers );
                    numberInput.value = numberValue;
                }
                reservedNumbers.push(numberValue);
            }
        },
    },
}
</script>
<template>
    <input type="text" name="number[]" :value="number" class="form-control" @change="checkNumbers($event)">
</template>