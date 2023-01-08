import { atom } from 'nanostores';

interface RSSChannel {
    name: string,
    url: string
};

export const modalStore = atom(false);
export const urlStore = atom('');
export const rssStore = atom([] as Array<RSSChannel>);