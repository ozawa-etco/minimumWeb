const fetch = require('node-fetch');
const { performance } = require('perf_hooks');

const base_url = "https://script.google.com/macros/s/AKfycbyWm1LMHpwdcoAf7nt0Q_mf3m9H_YK8OL9Z14iZVab7EHNuRGZhZbF6RfYp2tPfJgs/exec";

const loop = 3;
let sumTime = 0;

(async () => {
    for (let i = 0; i < loop; i++) {

        //開始時間
        const startTime = performance.now();

        const response = await fetch(base_url, {
            method: "post",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            body: encodeURI(`email=test@test.local&body=aaa&channel=performance-test`)
        });
        const text = await response.text();
        console.log(text);

        //終了時間
        const endTime = performance.now();

        //レスポンス時間
        const responseTime = (endTime - startTime) / 1000;

        sumTime += responseTime;

        console.log(responseTime);
    }

    console.log("ave=" + sumTime / loop);


})();