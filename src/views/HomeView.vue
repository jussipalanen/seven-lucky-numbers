<script>
import { ref } from 'vue';
import NumbersRow from '../views/NumbersRow.vue';
import profitShare from '../assets/results.json';
export default {
  data() {
    return {
      balance: 100000,
      costs: 0,
      numbersRows: [],
      profitShare: profitShare.data,
      profitWinTotal: 0,
    }
  },
  methods: {
    formatPrice(value) {
      if (typeof value !== "number") {
        return value;
      }
      const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 0
      });
      return formatter.format(value);
    },
    generateNumbers() {
      return this.$func.generateNumbers();
    },
    removeRows()
    {
      this.numbersRows = [];
      this.costs = 0;
    },
    addRow(numRows = 1) {

      const cost = 100;
      for (let index = 0; index < numRows; index++) {
        this.numbersRows.push(NumbersRow);
        this.costs += cost;
      }
    },
    updateCosts(value) {
      this.costs += value;
      if (this.costs < 0) {
        this.costs = 0;
      }
    },
    updateBalance(value) {
      this.balance += value;
      if (this.balance < 0) {
        this.balance = 0;
      }
    },
    validate(form) {
      const numbers = form.getElementsByClassName('number-row');
      let valid = true;

      if (numbers.length <= 0) {
        return false;
      }

      for (let i = 0; i < numbers.length; i++) {
        const number = numbers[i];
        const numberInputs = number.querySelectorAll("input[name='number[]']");
        for (let x = 0; x < numberInputs.length; x++) {
          const numberInput = numberInputs[x];
          if (!numberInput.value) {
            numberInput.classList.add('invalid');
            valid = false;
          }
        }
      }

      if (valid) {
        return true;
      }
      return false;
    },
    removeFounds(form) {
      const numberCircles = form.getElementsByClassName('number-circle');
      for (let i = 0; i < numberCircles.length; i++) {
        const el = numberCircles[i];
        el.classList.remove('found');
      }
    },
    calculateProfit(numberCount) {
      var sum = 0;
      const profitShare = this.profitShare;
      for (let i = 0; i < profitShare.length; i++) {
        const profit = profitShare[i];
        if (parseInt(profit.correct_numbers) == numberCount) {
          sum += parseFloat(profit.amount);
        }
      }
      return sum;
    },
    submit(event) {
      const form = event.target;
      this.profitWinTotal = 0;
      if (this.validate(form)) {
        this.removeFounds(form);
        const numbers = form.getElementsByClassName('number-row');
        const generatedNumbers = this.generateNumbers();
        this.results = generatedNumbers;
        this.updateBalance(-this.costs);
        for (let i = 0; i < numbers.length; i++) {
          const number = numbers[i];
          const numberInputs = number.querySelectorAll("input[name='number[]']");
          let numsFound = 0;
          for (let x = 0; x < numberInputs.length; x++) {
            const numberInput = numberInputs[x];
            const numberValue = parseInt(numberInput.value);
            if (generatedNumbers.find((element) => element == numberValue ? true : false)) {
              numberInput.closest('.number-circle').classList.add('found');
              numsFound++;
            }
          }
          this.profitWinTotal += this.calculateProfit(numsFound);
          this.balance += this.profitWinTotal;
        }
      }
    }
  },
  components: {
    'numbersRow': NumbersRow
  }
}
</script>
<template>
  <div class="row p-4">

    <div class="col-12 mb-4">
      <h1 class="mb-4">Game</h1>
      <h2 class="mb-4">How to play?</h2>
      <p>Add the new rows and give the numbers between 1 to 40 to each row input. Each number must be different in the
        single row and it cannot be the same.</p>
      <p>You can generate the numbers each row, if you want.</p>
      <p>If the rows are ready, then you can try your lucky and press the play button.</p>
    </div>

    <div class="col-12 mb-4">
      <h2>Balance</h2>
      <span class="balance">
        {{ formatPrice(balance) }}
      </span>
    </div>

    <div class="col-12 mb-4">
      <h2>Costs</h2>
      <span class="balance">
        {{ formatPrice(costs) }}
      </span>
    </div>


    <div v-if="results" class="results col-12 mb-4">
      <h2>Results</h2>

      <div class="row">
        <div class="col-12">
          <div v-for="result in results" class="result-circle">
            {{ result }}
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-12">
          <h2>
            You won: {{ formatPrice(profitWinTotal) }}
          </h2>
        </div>
      </div>
    </div>
    <hr>
    <div class="col-12 mb-4">
      <form action="" method="POST" @submit.prevent="submit($event)">
        <div class="form-group mb-4">
          <input type="button" class="btn btn-primary button-spaces" value="Add +1 row" @click="addRow(1)">
          <input type="button" class="btn btn-primary button-spaces" value="Add +5 rows" @click="addRow(5)">
          <input type="button" class="btn btn-primary button-spaces" value="Add +10 rows" @click="addRow(10)">
          <input type="button" class="btn btn-warning button-spaces" value="Remove all rows" @click="removeRows()">
          <input type="submit" class="btn btn-success" value="Play">
        </div>
        <div class="form-group number-rows mb-4">
          <div v-for="numberRow in numbersRows">
            <component v-bind:is='numberRow' number="1" @app-balance="updateBalance" @app-costs="updateCosts"></component>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
