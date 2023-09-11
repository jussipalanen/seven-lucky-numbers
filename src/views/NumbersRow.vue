<script>
import NumberInput from './NumberInput.vue';
export default {
    data() {
        return {
            numberInputs: [],
            extraNumberInputs: [],
            maxInput: 7,
            maxExtraInput: 2,
        }
    },
    methods: {
        deleteRow(event) {
            const btn = event.target;
            btn.closest('.row').remove();
            this.$emit('app-costs', -100);
        },
        generateNumbers(event) {
            const defaultNumbers = this.initDefaultNumbers(event);
            this.initExtraNumbers(event, defaultNumbers);
        },
        initDefaultNumbers(event) {
            const el = event.target;
            const row = el.closest('.row');

            const randomNumbers = this.$func.generateNumbers(7);
            const numberInputs = row.querySelectorAll("input[name='number[]']");
            for (let x = 0; x < numberInputs.length; x++) {
                const number = randomNumbers[x];
                const input = numberInputs[x];
                input.value = number;
            }
            return randomNumbers;
        },
        initExtraNumbers(event, excludedNumbers) {
            const el = event.target;
            const row = el.closest('.row');
            const randomNumbers = this.$func.generateNumbers(2, excludedNumbers);
            const numberInputs = row.querySelectorAll("input[name='extra[]']");
            for (let x = 0; x < numberInputs.length; x++) {
                const number = randomNumbers[x];
                const input = numberInputs[x];
                input.value = number;
            }
            return randomNumbers;
        },
    },
    components: {
        'NumberInput': NumberInput
    },
    mounted() {

        // normal numbers
        for (let i = 0; i < this.maxInput; i++) {
            this.numberInputs.push(NumberInput)
        }

        // extra numbers
        for (let i = 0; i < this.maxExtraInput; i++) {
            this.extraNumberInputs.push(NumberInput)
        }

    },
}
</script>
<template>
    <div class="row number-row mb-4">
        <div class="col-xl-8 col-lg-12 pt-2">
            <div class="list-of-numbers mb-4">
                <div v-for="numberInput in numberInputs" class="number-circle">
                    <component :is="numberInput" number="" type="number[]"></component>
                </div>
            </div>
            <div class="number-circle-sign mb-4">
                +
            </div>
            <div class="list-of-numbers mb-4">
                <div v-for="numberInput in extraNumberInputs" class="number-circle extra-number">
                    <component :is="numberInput" number="" type="extra[]"></component>
                </div>
            </div>
        </div>
        <div class="col-xl-4 col-lg-12 text-left pt-2 pb-4">
            <input type="button" class="btn btn-primary btn-lg button-spaces" name="generate" value="Generate"
                @click="generateNumbers($event)">
            <input type="button" class="btn btn-danger btn-lg" name="delete" value="X" @click="deleteRow($event)">
        </div>
    </div>
</template>