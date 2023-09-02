import Vue from 'vue';
export default class User extends Vue {
    constructor(balance) {
        super();
        this.balance = balance ? balance : 1000;
        this.costs = 0;
        return this;
    }

    getBalance() {
        return this.balance;
    }

    getCosts() {
        return this.costs;
    }

    addBalance(number) {
        this.balance += number;
        return this;
    }

    subBalance(number) {
        this.balance -= number;
        return this;
    }

    addCosts(number) {
        this.costs += number;
        return this;
    }

    subCosts(number) {
        this.costs -= number;
        return this;
    }

}