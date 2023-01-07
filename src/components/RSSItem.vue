<template>
    <div class="article">
        <h2 class="article__title">{{ item.title }} <a v-if="item.link" class="article__link" :href="item.link">Перейти к новости</a></h2>
        <span class="article__date">Дата публикации: {{ compDate }}</span>
        <div class="article__content" v-html="item.content"></div>
    </div>
</template>

<script lang="ts" setup>
import { PropType, computed } from 'vue';

interface RSSItem {
    id: string,
    title: string,
    content: string,
    date: Date,
    link: string
}

const props = defineProps({
    item: {
        type: Object as PropType<RSSItem>,
        required: true
    }
})

const compDate = computed(() => props.item.date.toLocaleString())
</script>

<style lang="scss" scoped>
.article {
    border: 2px solid #97b498;
    border-radius: 10px;
    padding: 10px;

    &__title {
        font-size: 1.4rem;
        margin: 0;
        display: flex;
        justify-content: space-between;
    }

    &__date {
        font-size: .9rem;
    }

    &__content {
        font-size: 1.1rem;
    }
}
</style>