<template xmlns:v-on="http://www.w3.org/1999/xhtml" xmlns:v-bind="http://www.w3.org/1999/xhtml">
    <div id="choice">
        <select>
            <option>1</option>
            <option>2</option>
            <option>3</option>
            <option>4</option>
            <option>5</option>
            <option>6</option>
            <option>7</option>
            <option>8</option>
            <option>9</option>
            <option>10</option>
        </select>
    </div>
</template>

<script>

    export default {
        name: '',
        data () {
            return {}
        }
    }
</script>


<style scoped>

    select {
        font: inherit;
        -webkit-appearance: none;
        height: 30px;
        width: 30px;
        padding-left: 5px;

    }
    option {
        outline: none;
    }

    option:focus {
        outline: none;
    }
</style>