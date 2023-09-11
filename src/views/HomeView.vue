<script>
import NumbersRow from '../views/NumbersRow.vue';
import profitShare from '../assets/results.json';
export default {
  data() {
    return {
      balance: 100000,
      costs: 0,
      numbersRows: [],
      profitShare: profitShare.data,
      profitShareView: [],
      profitToggleText: 'Show',
      hideProfitShareView: true,
      profitWinTotal: 0,
      MIN_NUMBERS: this.$MIN_NUMBERS,
      MAX_NUMBERS: this.$MAX_NUMBERS,
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
    generateNumbers(number = 7) {
      return this.$func.generateNumbers(number);
    },
    removeRows() {
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
        const numberInputs = number.querySelectorAll(".number-input");
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
    calculateProfit(numberCount = 0, extraCount = 0) {
      var sum = 0;
      let profitShare = this.profitShare;
      for (let i = 0; i < profitShare.length; i++) {
        const profit = profitShare[i];
        if ((parseInt(profit.numbers) == numberCount && parseInt(profit.extra_numbers) == 0) ||
          (parseInt(profit.numbers) == numberCount && parseInt(profit.extra_numbers) == extraCount)) {
          let amount = profit.amount;
          profitShare[i].winners = parseInt(profit.winners) + 1;
          let multipier = 1;
          amount = amount * multipier;
          sum += parseFloat(amount);
        }
      }
      this.profitShareView = profitShare;
      return sum;
    },
    calculateCorrectNumbers(inputs, numbers) {
      let count = 0
      // extra number check
      for (let i = 0; i < inputs.length; i++) {
        const numberInput = inputs[i];
        const numberValue = parseInt(numberInput.value);
        if (numbers.find((element) => element == numberValue ? true : false)) {
          numberInput.closest('.number-circle').classList.add('found');
          count++;
        }
      }
      return count;
    },
    toggleProfitSharing() {
      this.profitToggleText = 'Show';
      this.hideProfitShareView = !this.hideProfitShareView
      if (!this.hideProfitShareView) {
        this.profitToggleText = 'Hide';
      }
    },
    submit(event) {
      const form = event.target;
      this.profitWinTotal = 0;
      if (this.validate(form)) {
        this.removeFounds(form);
        const numbers = form.getElementsByClassName('number-row');
        const generatedNumbers = this.generateNumbers(7);
        const generatedExtraNumbers = this.generateNumbers(2, generatedNumbers);
        const rowsCalcTable = [];

        if (this.costs <= this.balance) {
          this.updateBalance(-this.costs);
          for (let i = 0; i < numbers.length; i++) {
            const number = numbers[i];
            const numberInputs = number.querySelectorAll("input[name='number[]']");
            const extraInputs = number.querySelectorAll("input[name='extra[]']");

            let numsFound = this.calculateCorrectNumbers(numberInputs, generatedNumbers);
            let extraNumsFound = this.calculateCorrectNumbers(extraInputs, generatedExtraNumbers);
            this.profitWinTotal += this.calculateProfit(numsFound, extraNumsFound);
            this.balance += this.profitWinTotal;
            rowsCalcTable[i] = this.profitWinTotal;
          }

          this.results = {
            rowsCalcTable: rowsCalcTable,
            numbers: generatedNumbers,
            extra: generatedExtraNumbers,
          };
        }
        else {
          alert('You ran out of money.');
        }
      }
      else {
        alert('Add the numbers into the inputs.');
      }
    }
  },
  components: {
    'numbersRow': NumbersRow
  },
  // created: function () {
  //   setInterval(function () {
  //     this.balance += 100;
  //   }.bind(this), 1000);
  // }
}
</script>
<template>
  <div class="row">
    <!-- Intro text start -->
    <div class="col-xl-12 col-lg-12">
      <div class="row">
        <div class="col-12 mb-4">
          <h1 class="mb-4">Game</h1>
          <h2 class="mb-4">How to play?</h2>
          <p>Add the new rows and give the numbers between {{ MIN_NUMBERS }} to {{ MAX_NUMBERS }} to each row input. Each
            number must be different in the
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
      </div>
    </div>
    <!-- Intro text ends -->
    <!-- Results start -->
    <div class="col-xl-6 col-lg-12">
      <div class="row">
        <div v-if="results" class="results col-lg-12 mb-4">
          <h2>Results</h2>
          <button class="btn btn-primary mt-4 mb-4" @click.stop="toggleProfitSharing">{{ profitToggleText }}</button>

          <div class="row">
            <div class="col-lg-12">
              <div v-for="result in results.numbers" class="result-circle">
                {{ result }}
              </div>
              <div class="results-extra-sign">+</div>
              <div v-for="result in results.extra" class="result-circle result-extra-circle">
                {{ result }}
              </div>
            </div>
          </div>

          <div v-if="profitShareView" class="row" :class="{ hidden: this.hideProfitShareView }">
            <div class="col-12">
              <table class="table">
                <thead>
                  <tr>
                    <th>Correct numbers + extra numbers</th>
                    <th>Prize</th>
                    <th>Winners</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in profitShareView">
                    <td>{{ item.numbers + ' + ' + item.extra_numbers }}</td>
                    <td>{{ formatPrice(item.amount) }}</td>
                    <td>{{ item.winners }}</td>
                  </tr>
                </tbody>
              </table>
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

      </div>
    </div>
    <!-- Results ends -->
    <!-- Play controls start -->
    <div class="col-xl-6 col-lg-12">
      <div class="row">
        <div class="col-lg-12 mb-4">
          <form action="" method="POST" @submit.prevent="submit($event)" autocomplete="off">
            <div class="form-group mb-4">
              <input type="button" class="btn btn-primary button-spaces" value="Add +1 row" @click="addRow(1)">
              <input type="button" class="btn btn-primary button-spaces" value="Add +5 rows" @click="addRow(5)">
              <input type="button" class="btn btn-primary button-spaces" value="Add +10 rows" @click="addRow(10)">
              <input type="button" class="btn btn-warning button-spaces" value="Remove all rows" @click="removeRows()">
            </div>
            <div class="form-group mb-4">
              <input type="submit" class="btn btn-success btn-lg" value="Play">
            </div>
            <div class="form-group number-rows mb-4">
              <div v-for="numberRow in numbersRows">
                <component v-bind:is='numberRow' number="1" @app-balance="updateBalance" @app-costs="updateCosts">
                </component>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <!-- Play controls ends -->

  </div>
</template>
