<template>
    <header>
        <div class="select">
            <select disabled>
                <option disabled selected>Выберите RSS канал</option>
            </select>
            <div class="select_arrow" />
        </div>
        <button>Получить новости</button>
        <button>Добавить канал</button>
        <button>Удалить канал</button>
    </header>
</template>

<script lang="ts" setup>

</script>

<style lang="scss" scoped>
header {
    display: flex;

    padding: 10px 4vw;
    align-items: center;
    justify-content: space-between;

    background-color: #e8f5e9;
    border-bottom: 1px solid #b6c2b7;

    font-size: 1rem;

    .select {
        position: relative;
        display: inline-block;
        width: 35%;

        select {
            width: 100%;

            cursor: pointer;
            padding: 10px 15px;

            border: 2px solid #97b498;
            background: #c8e6c9;
            color: #000;

            appearance: none;
            -webkit-appearance: none;
            -moz-appearance: none;

            font-size: 1rem;
            font-weight: 600;

            transition: .2s;

            &::-ms-expand {
                display: none
            }

            &:hover,
            &:focus {
                background: #fff;
            }

            &:disabled {
                opacity: 0.5;
                pointer-events: none;
            }

            &:disabled~.select_arrow {
                border-color: #97b498;
            }
        }
    }

    .select_arrow {
        position: absolute;

        top: 15px;
        right: 20px;

        border: solid #000;
        border-width: 0 2px 2px 0;

        display: inline-block;
        padding: 3px;

        transform: rotate(45deg);
        -webkit-transform: rotate(45deg);
    }

    button {
        width: 21%;

        background-color: #00c853;
        border: 2px solid #009624;
        color: #000;

        display: inline-block;
        cursor: pointer;
        
        font-size: 1rem;
        font-weight: 600;

        padding: 10px 20px;

        transition: .2s;

        &:hover {
            background-color: #009624;
            color: #e8f5e9;
        }

        &:active {
            position: relative;
            top: 1px;
        }
    }
}
</style>