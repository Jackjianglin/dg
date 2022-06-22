<script setup>
import { useRouter } from 'vue-router';
import { reactive } from "vue";

const allDataStatic = reactive({
    total: 0,
    answered: 0,
    errored: 0,
    errorSuccessed: 0,
});

function initData(params) {
    allDataStatic.total = window._AllData.length;
    allDataStatic.answered = Object.keys(window._ALLAnswerData).length;
    allDataStatic.errored = Object.keys(window._ALLErrorData).length;
    allDataStatic.errorSuccessed = Object.keys(window._ALLErrorSuccessData).length;
}
initData();


const router = useRouter();
function toRandom(type = 'all') {
    router.push({
        path: '/random',
        query: {
            type,
        },
    });
}
function toPage(page) {
    router.push({
        path: '/' + page,
    });
}

function cleanHistory() {
    window.cleanHistory();
    initData();
    console.log('cleanHistory');
}
</script>

<template>
    <div class="page">
        <div class="cards">
            <div class="card" @click="toRandom('all')">
                <div class="card-content">
                    <div class="title">
                        顺序刷题
                    </div>
                    <div class="subtitle">
                        <span style="font-size: 24px;">{{ allDataStatic.answered }}</span> / {{ allDataStatic.total }}
                    </div>
                </div>
            </div>
            <div class="card" @click="toRandom('error')">
                <div class="card-content">
                    <div class="title">
                        错题集
                    </div>
                    <div class="subtitle">
                        <span style="font-size: 24px;">{{ allDataStatic.errorSuccessed }} </span> / {{
                                allDataStatic.errored
                        }}
                    </div>
                </div>
            </div>
            <div class="card" @click="toPage('all')">
                <div class="card-content">
                    <div class="title">
                        所有题目
                    </div>
                    <div class="subtitle">
                        {{ allDataStatic.total }}
                    </div>
                </div>
            </div>
            <div class="card" @click="cleanHistory">
                <div class="card-content">
                    <div class="title">
                        清理记录
                    </div>
                </div>
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

.cards {
    width: 100vw;
    /* display: flex;
    flex-direction: row;
    flex-wrap: wrap; */
}

.card {
    width: 30vw;
    height: 30vw;
    background: rgb(69, 137, 114);
    margin: 10vw;
    transform: rotate(45deg);
    border-radius: 10px;
    transition: 0.5s;
}

.card:active {
    transform: scale(0.9) rotate(45deg);
}

.card-content {
    height: 100%;
    width: 100%;
    transform: rotate(-45deg);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}

.title {
    font-size: 6vw;
    font-weight: bold;
    color: rgb(211, 211, 211);
}

.subtitle {
    margin-top: 1vw;
    font-size: 3vw;
    color: rgb(193, 193, 193);
}
</style>
