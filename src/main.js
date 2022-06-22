import { createApp, defineAsyncComponent } from 'vue'
import { createRouter, createWebHashHistory } from "vue-router";
import App from './App.vue';
import AllData from './assets/result3.json';
window._AllData = AllData;
window._AllData.forEach((r, i) => r.i = i);

import { ALL_ANSWER_INDEX, ALL_ERROR_INDEX, ALL_ERROR_SUCCESS_INDEX } from "./constants";

window.arrSubtraction = function arrSubtraction(a, b) {
    if (Array.isArray(a) && Array.isArray(b)) {
        return a.filter((i) => !b.includes(i));
    }
    throw new new TypeError("arguments must be array")();
}

function initStaticData() {
    window._ALLAnswerData = localStorage.getItem(ALL_ANSWER_INDEX) ? JSON.parse(localStorage.getItem(ALL_ANSWER_INDEX)) : {};
    window._ALLErrorData = localStorage.getItem(ALL_ERROR_INDEX) ? JSON.parse(localStorage.getItem(ALL_ERROR_INDEX)) : {};
    window._ALLErrorSuccessData = localStorage.getItem(ALL_ERROR_SUCCESS_INDEX) ? JSON.parse(localStorage.getItem(ALL_ERROR_SUCCESS_INDEX)) : {};
    window._ALLNeedToAnswerData = arrSubtraction(Object.keys(AllData), Object.keys(window._ALLAnswerData));
}
initStaticData();
window.logS = function name() {
    console.log(`答过题 数目：${Object.keys(window._ALLAnswerData).length}`, window._ALLAnswerData);
    console.log(`答错题 数目：${Object.keys(window._ALLErrorData).length}`, window._ALLErrorData);
    console.log(`答错又对题 数目：${Object.keys(window._ALLErrorSuccessData).length}`, window._ALLErrorSuccessData);
    console.log(`需要去答题 数目：${Object.keys(window._ALLNeedToAnswerData).length}`, window._ALLNeedToAnswerData);
}
logS();
const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        {
            path: '/',
            component: defineAsyncComponent(() => import('./pages/Home.vue'))
        },
        {
            path: '/random',
            component: defineAsyncComponent(() => import('./pages/Random.vue'))
        },
        {
            path: '/all',
            component: defineAsyncComponent(() => import('./pages/All.vue'))
        },
        {
            path: '/about',
            component: defineAsyncComponent(() => import('./pages/About.vue'))
        },
        {
            path: '/setting',
            component: defineAsyncComponent(() => import('./pages/Setting.vue'))
        },
    ],
});


createApp(App)
    .use(router)
    .mount('#app');

