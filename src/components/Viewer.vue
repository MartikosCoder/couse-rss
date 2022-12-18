<template>
    <main>
        <h1>{{ title }}</h1>
        <div class="items" v-if="items">
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

urlStore.listen(async (url) => {
    const response = await fetch(url);
    const text = await response.text();

    const xml = new window.DOMParser().parseFromString(text, "text/xml")
    title.value = xml.querySelector('channel title').innerHTML;

    const xml_items = xml.querySelectorAll('item');
    for(const item of xml_items) {
        items.value.push({
            id: item.querySelector('guid').innerHTML,
            title: item.querySelector('title').innerHTML,
            content: item.querySelector('description').innerHTML.replace('<![CDATA[', '').replace(']]>', ''),
            date: new Date(item.querySelector('pubDate').innerHTML)
        })
    }
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
}
</style>