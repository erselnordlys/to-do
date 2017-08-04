<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div id="schedule" v-if="vis">

        <div v-for="item in todo">{{item.name}}</div>
        {{selectedMonth}}
        {{sortedTasks}}
        <day
                v-bind:isWeekend="(item == 'sat') || ( item == 'sun')"
                v-for="(item, index) in daysOfWeek"
                v-bind:dayOfWeek="item"
                v-bind:dayOfMonth="(index + 1)"
                v-bind:obj="receiveTaskTime"
                @change="dragDayTask">
        </day>

        <!--v-bind:arrayOfSortedObjects="sortedTasks"-->
        <!--v-bind:selectedMonth="selectedMonth"-->


    </div>
</template>

<script>
    import Day from './Day.vue';
    import {todoRef} from '../../firebase-module';
    import {counterRef} from '../../firebase-module';


    var selMonth = [];
    var sortable; // sorted tasks for selected month
    var main;
    export default main = {
        name: 'Schedule',
        data () {
            return {
                weekDay: ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'],
                startDayOfWeek: [6, 2, 2, 5, 0, 3, 5, 1, 4, 6, 2, 4],
                sel: Number
            }
        },

        props: ['vis', 'receiveTaskTime', 'selectedMonth'],

        methods: {
            dragDayTask: function (obj) {
                this.$emit('dragDayTask', obj);
            },

            sortTasks: function () {
                // define current month and start sorting function
                let myFunc = this.sortTasksByMonth;

                let promise = new Promise(function (resolve, reject) {

                    // get month number from database
                    counterRef.once('value', function (snap) {
                        let monthNum = (snap.val().selected);
                        resolve(monthNum);
                    });
                });

                promise.then(
                    result => {
                        console.log(result);

                        // sort tasks by selected month
                        let sorted = [];
                        todoRef.once('value', function (snap) {
                            for (let key in snap.val()) {
                                console.log('iterration');

                                // look for objects with selected month in db
                                if (snap.val()[key].month == result) {
                                    console.log('fits');
                                    sorted.push(snap.val()[key]);
                                }
                            }
                        });

                        console.log(sorted);
                        return sorted;
                    },
                    error => { console.log('error') }
                 );
            },

            sortTasksByMonth: function (month) {
                console.log('sorting started' + month);
                let sorted = [];

                todoRef.once('value', function (snap) {
                    for (let key in snap.val()) {
                        console.log('iterration');

                        // look for objects with selected month in db
                        if (snap.val()[key].month == month) {
                            console.log('fits');
                            sorted.push(snap.val()[key]);
                        }
                    }
                    console.log('sorted')
                })
                    .then(function (snap) {
                        sortable = sorted;
                        console.log(sortable);
                    });
            }

        },
        components: {
            day: Day
        },

        computed: {
            daysOfWeek: function () {
                let nums = [];

                // define the length of months
                let lengthOfMonth;
                if ([0, 2, 4, 6, 7, 9, 11].indexOf(this.selectedMonth) >= 0) {
                    lengthOfMonth = 31;
                } else if ([3, 5, 8, 10].indexOf(this.selectedMonth) >= 0) {
                    lengthOfMonth = 30;
                } else if (this.selectedMonth == 1) {
                    lengthOfMonth = 28;
                }

                // append days of week on each
                let j = this.startDayOfWeek[this.selectedMonth];
                for (let i = 0; i < lengthOfMonth; i++) {
                    nums.push(this.weekDay[j]);
                    j++;
                    j = j % this.weekDay.length;
                }

                return nums;
            },

            sortedTasks: function () {
                let monthNum;
                return new Promise(function (resolve, reject) {

                    // get month number from database
                    counterRef.once('value', function (snap) {
                        monthNum = (snap.val().selected);
                        //  resolve(monthNum);
                    })
                    .then(
                            result => {
                                //sort tasks by selected month
                            let sorted = [];
                            todoRef.once('value', function (snap) {
                                for (let key in snap.val()) {
                                    console.log('iterration');

                                    // look for objects with selected month in db
                                    if (snap.val()[key].month == monthNum) {
                                        console.log('fits');
                                        sorted.push(snap.val()[key]);
                                    }
                                }
                            });

                                console.log(sorted);
                                resolve(sorted);
                    },
                    error => { console.log('error') }
                        );
                }) ;

            }
        },

        firebase: {
                todo: {
                    source: todoRef,
                    n: 111
                }
        }
    }

//    console.log(main.computed.sel);
//    window.onload = main.methods.sortTasks();
</script>

<style scoped>

    #schedule {
        height: auto;
        min-height: 558px;
        max-width: 800px;
        width: auto;
        flex-grow: 1;
        min-width: 400px;

        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;

        border: 1px solid black;
        border-radius: 3px;
    }

    button {
        position: absolute;
        left: 50%;
    }

</style>