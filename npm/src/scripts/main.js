import {GetBacon} from './utils';
import moment from 'moment';

const baconEl = document.querySelector('.bacon');
if (baconEl) {
    GetBacon()
        .then(res => {
            const markup = res.reduce((acc, val) => (acc += `<p>${val}</p>`), '');
            baconEl.innerHTML = markup;
        })
        .catch(err => (baconEl.innerHTML = err));

}


if (document.querySelector('.timer-wrap')) {
    // Timer selection init
    let timeInMins = document.getElementById('time-in-minutes');
    document.getElementById('dec-btn').addEventListener('click', () => {
        if (timeInMins.innerText > 0) {
            timeInMins.innerText = (timeInMins.innerText - 1).toString();
        }
    });
    document.getElementById('inc-btn').addEventListener('click', () => {
        timeInMins.innerText = (+timeInMins.innerText + 1).toString();
    });

    document.getElementById('start-btn').addEventListener('click', () => {
        const startBlock = document.getElementById('starter-block');
        const timerBlock = document.getElementById('timer-block');
        const timeLeft = document.getElementById('time-left');
        startBlock.classList.add('hidden');
        timerBlock.classList.remove('hidden');
        let duration = moment.duration(timeInMins.innerText, 'minutes');
        let timer = setInterval(() => {
            duration = moment.duration(duration.asSeconds() - 1, 'seconds');
            if(duration.asSeconds() <= 0){
                clearInterval(timer);
                startBlock.classList.remove('hidden');
                timerBlock.classList.add('hidden');
            } else {
                timeLeft.innerText = moment.utc(duration.asMilliseconds()).format('mm:ss');
            }
        }, 1000)
    });
}