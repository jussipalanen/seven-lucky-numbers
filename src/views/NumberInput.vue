<script>
export default {
    data() {
        return {
            number: null,
            type: 'number[]',
        }
    },
    props: ['number', 'type'],
    methods: {
        setNumber( number )
        {
            this.number = number;
        },
        setMinMax(number) {
            if (number > this.$MAX_NUMBERS) {
                return this.$MAX_NUMBERS;
            }
            else if (number < 1) {
                return 1;
            }
            return number;
        },
        findNewNumber( numbers )
        {
            for (let number = 1; number <= this.$MAX_NUMBERS; number++) 
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
            const numberInputs = row.querySelectorAll(".number-input");
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
    <input type="text" :name="type" :value="number" class="form-control number-input" @change="checkNumbers($event)">
</template>