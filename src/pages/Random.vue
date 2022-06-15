<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import { NButton, useNotification } from 'naive-ui';
import { reactive } from 'vue';
import { ALL_ANSWER_INDEX, ALL_ERROR_INDEX, ALL_ERROR_SUCCESS_INDEX } from "../constants";
import { useRoute } from "vue-router";
const notification = useNotification();
const route = useRoute();
// console.log(`route.params`, JSON.stringify(route.query.type));


const ResultChoice = ['A', 'B', 'C', 'D', 'E'];
const problem = reactive({
    problem: '',
    results: [],
    answer: [],
    hasAnswered: false,
    feedBack: {
        isOk: false,
        message: '',
    }
});
let curAnswerIndex = 0;
function calcErrorNeedToAnswer() {
    const needToA = Object.keys(window._ALLErrorData).reduce((pre, cur) => {
        const successCount = window._ALLErrorSuccessData[cur] || 0;
        if (window._ALLErrorData[cur] - successCount * successCount > 0) {
            pre.push(cur);
        }
        return pre;
    }, []);
    return needToA;
}
function getProblem() {
    let proIndex = -1;
    if (route.query.type === 'error' || window._ALLNeedToAnswerData.length === 0 || curAnswerIndex > 2) {
        curAnswerIndex = 0;
        const errNeedToA = calcErrorNeedToAnswer();
        if (errNeedToA.length === 0) {
            if (route.query.type === 'error') {
                notification.success({
                    content: '太棒了',
                    meta: '你的错题集已经全部答完了，快去看看其他的题目吧！'
                });
                problem.hasAnswered = true;
            }
            else {
                getProblem();
            }
            return;
        }
        const needIndex = Math.floor(Math.random() * errNeedToA.length);
        proIndex = errNeedToA[needIndex];
    } else if (route.query.type === 'all') {
        if (window._ALLNeedToAnswerData.length === 0) {
            console.log('你的题目已经全部答完了，快去看看错题集吧！');
            problem.hasAnswered = true;
            return;
        }
        const needIndex = Math.floor(Math.random() * window._ALLNeedToAnswerData.length);
        proIndex = window._ALLNeedToAnswerData[needIndex];
        window._ALLNeedToAnswerData.splice(needIndex, 1);
    } else {
        return;
    }
    curAnswerIndex++;
    const pro = window._AllData[proIndex];
    console.log(pro);
    problem.index = proIndex;
    problem.problem = pro.c;
    problem.results = pro.r.map((item, index) => {
        return {
            content: item,
            index: ResultChoice[index],
            choice: false,
        }
    });
    problem.hasAnswered = false;
    problem.answer = pro.a;
}
function saveData() {
    window._ALLAnswerData[problem.index] = (window._ALLAnswerData[problem.index] || 0) + 1;
    localStorage.setItem(ALL_ANSWER_INDEX, JSON.stringify(window._ALLAnswerData));

    if (!problem.feedBack.isOk) {
        window._ALLErrorData[problem.index] = (window._ALLErrorData[problem.index] || 0) + 1;
        localStorage.setItem(ALL_ERROR_INDEX, JSON.stringify(window._ALLErrorData));
    } else {
        if (window._ALLErrorData[problem.index]) {
            window._ALLErrorSuccessData[problem.index] = (window._ALLErrorSuccessData[problem.index] || 0) + 1;
            localStorage.setItem(ALL_ERROR_SUCCESS_INDEX, JSON.stringify(window._ALLErrorSuccessData));
        }
    }
}
function sure() {
    const answer = problem.results.filter(item => item.choice).map(item => item.index);
    if (JSON.stringify(answer) === JSON.stringify(problem.answer)) {
        problem.feedBack.isOk = true;
        problem.feedBack.message = '回答正确';
    } else {
        problem.feedBack.isOk = false;
        problem.feedBack.message = '正确答案是：' + problem.answer.join(' ');
    }
    problem.hasAnswered = true;
    saveData();
    logS();
}
function choiceClick(item) {
    if (problem.hasAnswered) {
        return;
    }
    if (problem.answer.length > 1) {
        item.choice = !item.choice;
        return;
    }
    const curChoice = item.choice;
    problem.results.forEach(item => {
        item.choice = false;
    });
    item.choice = !curChoice;
}
getProblem();
</script>

<template>
    <div class="page">
        <div class="title">
            {{ problem.problem }}
        </div>
        <div class="choice">
            <div class="item" :class="{ 'choice-item': item.choice }" v-for="(item, index) in problem.results"
                @click="choiceClick(item)">
                {{ item.index }} {{ item.content }}
            </div>
        </div>

        <div class="feedback" :class="{ 'feedback-success': problem.feedBack.isOk }" v-if="problem.hasAnswered">
            {{ problem.feedBack.message }}
        </div>
        <n-button v-if="!problem.hasAnswered" class="sure" @click="sure" type="primary">确定</n-button>
        <n-button v-else class="sure" @click="getProblem" :type="problem.feedBack.isOk ? 'success' : 'error'">下一题
        </n-button>
    </div>
</template>

<style scoped>
.page {
    height: 100vh;
    width: 100vw;
    display: flex;
    flex-direction: column;
}

.title {
    margin: 10vw 5vw;
    width: 90vw;
}

.choice {
    margin: 5vw;
    width: 90vw;

    display: flex;
    flex-direction: column;
}

.item {
    margin: 10px 0;
    line-height: 40px;
    padding: 0 10px;
    border-radius: 5px;
    border: 1px solid rgb(156, 236, 110);
}

.feedback {
    margin: 5vw;
    width: 90vw;
    border: #a92d00;
    background: #611b01;
    border-radius: 3vw;
    line-height: 10vw;
    padding: 3vw;
    color: #fff;
    box-sizing: border-box;
    text-align: center;
}

.feedback-success {
    border: #07ff03;
    background: #027200;
}

.choice-item {
    background: #202920;
    color: #fff;
}

.choice-err {
    background: #611b01;
    color: #fff;
}

.sure {
    margin: 5vw;
    width: 90vw;
}
</style>
