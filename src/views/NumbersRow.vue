<script>
import NumberInput from './NumberInput.vue';
export default {
    data() {
        return {
            numberInputs: [],
            maxInput: 7,
        }
    },
    methods: {
        deleteRow(event) {
            const btn = event.target;
            btn.closest('.row').remove();
            this.$emit('app-costs', -100);
        },
        generateNumbers(event) {
            const el = event.target;
            const row = el.closest('.row');
            const generatedNumbers = this.$func.generateNumbers();
            const numberInputs = row.querySelectorAll("input[name='number[]']");


            for (let x = 0; x < numberInputs.length; x++) {
                const number = generatedNumbers[x];
                const input = numberInputs[x];
                input.value = number;
            }
        },
    },
    components: {
        'NumberInput': NumberInput
    },
    mounted() {

        for (let i = 0; i < this.maxInput; i++) {
            this.numberInputs.push(NumberInput)
        }

    },
}
</script>
<template>
    <div class="row number-row mb-4">

        <div class="col-8">
            <div v-for="numberInput in numberInputs" class="number-circle">
                <component :is="numberInput" number=""></component>
            </div>
        </div>

        <div class="col-4 text-left pt-4 pb-4">
            <input type="button" class="btn btn-primary btn-lg button-spaces" name="generate" value="Generate"
                @click="generateNumbers($event)">
            <input type="button" class="btn btn-danger btn-lg" name="delete" value="X" @click="deleteRow($event)">
        </div>
    </div>
</template>