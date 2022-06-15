<script setup>
import { NInput, NButton, NRadio } from 'naive-ui';
import { ref } from "vue";
const searchValue = ref('');
const checkedValue = ref('all')
const allData = window._AllData.map((r, index) => {
    return {
        ...r,
        answered: !!window._ALLAnswerData[index],
        errored: !!window._ALLErrorData[index],
        errorSuccessed: !!window._ALLErrorSuccessData[index],
    };
});
const allList = ref(allData);
const ResultChoice = ['A', 'B', 'C', 'D', 'E'];

// const allDataStatic = reactive({
//     total: window._AllData.length,
//     answered: Object.keys(window._ALLAnswerData).length,
//     errored: Object.keys(window._ALLErrorData).length,
//     errorSuccessed: Object.keys(window._ALLErrorSuccessData).length,
// });

// const router = useRouter();
// function toRandom(type = 'all') {
//     router.push({
//         path: '/random',
//         query: {
//             type,
//         },
//     });
// }
function search() {
    allList.value = allData.filter(item => {
        let isFilter = true;
        if (checkedValue.value !== 'all') {
            isFilter = item[checkedValue.value];
        }
        let isSearch = true;
        if (searchValue.value) {
            isSearch = (item.c + item.r.join('')).includes(searchValue.value);
        }
        return isFilter && isSearch;
    });
}
function expandItem(item) {
    item.expand = !item.expand;
}
function handleChange(e) {
    checkedValue.value = e.target.value;
    console.log(checkedValue.value);
    search();
}
</script>

<template>
    <div class="page">
        <div class="search-container">
            <n-input v-model:value="searchValue" type="text" placeholder="输入题目关键词" />
            <n-button type="primary" round style="margin-left: 3vw;" @click="search">
                搜索
            </n-button>
        </div>
        <div class="filter-container">
            <n-radio :checked="checkedValue === 'all'" value="all" name="filter" @change="handleChange">
                所有
            </n-radio>
            <n-radio :checked="checkedValue === 'answered'" value="answered" name="filter" @change="handleChange">
                答过的
            </n-radio>
            <n-radio :checked="checkedValue === 'errored'" value="errored" name="filter" @change="handleChange">
                答错的
            </n-radio>
            <n-radio :checked="checkedValue === 'errorSuccessed'" value="errorSuccessed" name="filter"
                @change="handleChange">
                答错又对的
            </n-radio>
        </div>
        <div class="list">
            <div class="list-item" :class="{ 'list-item-expand': item.expand }" v-for="item in allList" :key="item.i"
                @click="expandItem(item)">
                {{ item.c }}
                <br>
                <br>
                <div v-for="(res, resi) in item.r" :key="resi">
                    {{ ResultChoice[resi] }} {{ res }}
                </div>
                <br>
                答案：{{ item.a.join(' ') }}
            </div>
        </div>
    </div>
</template>

<style scoped>
.page {
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
}

.search-container {
    margin: 5vw;
    width: 90vw;
    display: flex;
}

.filter-container {
    width: 90vw;
    margin: 0 5vw;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.list {
    margin: 0 5vw 5vw;
    height: 90vh;
    width: 90vw;
    flex-direction: column;
    overflow-y: scroll;
}

.list-item {
    padding: 0 3vw;
    height: 10vw;
    line-height: 10vw;
    background: antiquewhite;
    margin: 1vw 0;
    border-radius: 1vw;
    overflow: hidden;
}

.list-item-expand {
    padding: 3vw;
    height: auto;
    line-height: 5vw;
}
</style>
