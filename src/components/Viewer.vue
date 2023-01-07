<template>
    <main>
        <h1>{{ title }}</h1>
        <div class="loader" v-show="loading">
            <div class="loader__spinner"></div>
        </div>
        <div class="items" v-show="items && !loading">
            <RSSItem v-for="item in items" :key="item.id" :item="item" />
        </div>
    </main>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { urlStore } from '../store/index';
import RSSItem from './RSSItem.vue';

const title = ref(null);
const items = ref([]);
const loading = ref(false);

urlStore.listen(async (url) => {
    title.value = null;
    items.value = [];
    
    loading.value = true;

    try {
        const response = await fetch(url);
        const text = await response.text();

        const xml = new window.DOMParser().parseFromString(text, "text/xml")
        title.value = xml.querySelector('channel title').innerHTML;

        const xml_items = xml.querySelectorAll('item');
        console.log(xml_items);
        for (const item of xml_items) {
            items.value.push({
                id: item.querySelector('guid').innerHTML,
                title: item.querySelector('title').innerHTML,
                content: item.querySelector('description').innerHTML.replace('<![CDATA[', '').replace(']]>', ''),
                date: new Date(item.querySelector('pubDate').innerHTML),
                link: item.querySelector('link')?.innerHTML || ''
            })
        }
    } catch (error) {
        alert("Не удалось загрузить данные с RSS сервера...");
    }

    loading.value = false;
});

</script>

<style lang="scss" scoped>
main {
    display: flex;
    flex-direction: column;

    padding: 10px 4vw;

    h1 {
        margin: 10px 0;
    }

    .items {
        display: flex;
        flex-direction: column;
        gap: 10px;

        margin: 10px 0;
    }

    .loader {
        position: absolute;
        top: 50%;
        left: 50%;

        &__spinner {
            width: 56px;
            height: 56px;
            border-radius: 50%;
            border: 9px solid #009624;
            animation: spinner-first 0.8s infinite linear alternate, spinner-second 1.6s infinite linear;
        }
    }

    @keyframes spinner-first {
        0% {
            clip-path: polygon(50% 50%, 0 0, 50% 0%, 50% 0%, 50% 0%, 50% 0%, 50% 0%);
        }

        12.5% {
            clip-path: polygon(50% 50%, 0 0, 50% 0%, 100% 0%, 100% 0%, 100% 0%, 100% 0%);
        }

        25% {
            clip-path: polygon(50% 50%, 0 0, 50% 0%, 100% 0%, 100% 100%, 100% 100%, 100% 100%);
        }

        50% {
            clip-path: polygon(50% 50%, 0 0, 50% 0%, 100% 0%, 100% 100%, 50% 100%, 0% 100%);
        }

        62.5% {
            clip-path: polygon(50% 50%, 100% 0, 100% 0%, 100% 0%, 100% 100%, 50% 100%, 0% 100%);
        }

        75% {
            clip-path: polygon(50% 50%, 100% 100%, 100% 100%, 100% 100%, 100% 100%, 50% 100%, 0% 100%);
        }

        100% {
            clip-path: polygon(50% 50%, 50% 100%, 50% 100%, 50% 100%, 50% 100%, 50% 100%, 0% 100%);
        }
    }

    @keyframes spinner-second {
        0% {
            transform: scaleY(1) rotate(0deg);
        }

        49.99% {
            transform: scaleY(1) rotate(135deg);
        }

        50% {
            transform: scaleY(-1) rotate(0deg);
        }

        100% {
            transform: scaleY(-1) rotate(-135deg);
        }
    }
}
</style>