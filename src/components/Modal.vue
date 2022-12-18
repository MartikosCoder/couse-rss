<template>
    <div v-if="isModalOpen" class="modal" @click.capture="outsideCloseModal" ref="modal">
        <div class="modal-content">
            <span class="modal-close" @click="closeModal">&times;</span>
            <h2>Новый RSS канал</h2>
            <input type="text" required v-model="url">
            <button @click="addNewRSS">Добавить</button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { modalStore, rssStore } from '../store/index';
import { useStore } from '@nanostores/vue';

const isModalOpen = useStore(modalStore);

const url = ref('');
const modal = ref();

function outsideCloseModal(e) {
    if(e.target !== modal.value) return;
    closeModal();
}

function closeModal() {
    modalStore.set(false);
}

function addNewRSS() {
    if(!url.value) return;

    const rssUrls = rssStore.get();
    if(rssUrls.includes(url.value)) return;

    rssUrls.push(url.value);
    localStorage.setItem('urls', JSON.stringify(rssUrls));
    rssStore.notify();

    url.value = '';
    closeModal();
}
</script>

<style lang="scss" scoped>
.modal {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgb(0, 0, 0);
    background-color: rgba(0, 0, 0, 0.4);

    &-content {
        background-color: #fefefe;
        border: 1px solid #b6c2b7;

        margin: 15% auto;
        padding: 20px;

        width: 20%;
        min-width: 400px;

        display: flex;
        flex-direction: column;
        position: relative;
    }

    &-close {
        color: #b6c2b7;
        font-size: 2rem;
        font-weight: bold;

        position: absolute;
        right: 20px;
        top: 10px;

        transition: .2s;

        &:hover,
        &:focus {
            color: black;
            text-decoration: none;
            cursor: pointer;
        }
    }

    h2 {
        margin: 0 0 10px;
    }

    input {
        padding: 10px 15px;

        border: 2px solid #97b498;
        background: #e8f5e9;
        color: #000;

        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;

        font-size: 1rem;
        font-weight: 600;

        transition: .2s;
    }

    button {
        background-color: #00c853;
        border: 2px solid #009624;
        color: #000;

        display: inline-block;
        cursor: pointer;

        font-size: 1rem;
        font-weight: 600;

        padding: 10px 20px;
        margin-top: 10px;

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