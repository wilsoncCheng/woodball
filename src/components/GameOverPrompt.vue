<template>
    <div class="popup-wrap" id="GameRoundPrompt" v-show="open">
        <div class="popup-box transform-out">
            <h1>遊戲全部結束</h1>
            <table>
                <thead>
                    <tr>
                        <th>球道</th>
                        <th v-for="round in $store.currentRound">{{ round }}</th>
                        <th>總計</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="playerData in $store.players">
                        <td>{{ playerData.name }}</td>
                        <td v-for="playerDataList in playerData.every_game_total_poles">{{ playerDataList }}</td>
                        <td> {{ getPlayerTotalScore(playerData) }}桿({{ getPlayerTotalScore(playerData)
                            - 5 * $store.currentRound }})</td>
                    </tr>
                </tbody>
            </table>
            <div class="button-group mt-4">
                <button type="button" @click="closePopup"
                    class="bg-stone-500 hover:bg-stone-700 text-white font-bold p-4 border border-stone-700 ">返回</button>

                <router-link to="/setting">
                    <button type="button" @click="GameOver" id="gameOverBTN"
                        class="bg-green-500 hover:bg-green-700 text-white font-bold p-4 border border-green-700">完成</button>
                </router-link>

            </div>
            <div class="close-btn popup-close" @click="closePopup">x</div>
        </div>
    </div>
</template>

<script setup>
import { usePlayersStore } from '@/stores/player.js'
import { defineProps, defineEmits } from 'vue';
const $store = usePlayersStore()
const props = defineProps(['open', 'data']);
const emit = defineEmits();
const closePopup = () => {
    emit('closeGameOverPrompt');
    $store.player_all_unfinish()
};
const GameOver = () => {
    alert('Wilson做這個系統真的好辛苦')
    emit('AllGameOverPrompt');
    $store.RESET_ALL_GAME
}
const getPlayerTotalScore = (playerData) => {
    return playerData.every_game_total_poles.reduce(
        (acc, crr) => acc + crr,
        0
    );
};
</script>

  

<style lang="scss" scoped>
.noRecord {
    font-size: 44px;
    font-weight: bold;

}

table {
    width: 100%;
    border-collapse: collapse;
}

th,
td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}

tr>th,
td:first-child {
    max-width: 150px;
}

th {
    background-color: #f2f2f2;
    font-weight: bold;
}

tr:hover {
    background-color: #f5f5f5;
}

.wrap {
    text-align: center;
}


.popup-wrap {
    width: 100%;
    font-size: 24px;
    height: 100%;
    position: fixed;
    top: 0px;
    left: 0px;
    content: '';
    background: rgba(0, 0, 0, 0.85);
}

.popup-box {
    width: 100%;
    min-width: 360px;
    padding: 50px 75px;
    transform: translate(-50%, -50%) scale(0.5);
    position: absolute;
    top: 50%;
    left: 50%;
    box-shadow: 0px 2px 16px rgba(0, 0, 0, 0.5);
    border-radius: 3px;
    background: #fff;
    text-align: center;

    h1 {
        font-size: 48px;
        font-weight: bold;
    }

    h2 {
        font-size: 60px;
        font-weight: bold;
    }

    th,
    td {
        text-align: center;

    }

    thead {
        font-size: 40px;
        font-weight: bold;


    }

    tbody {
        font-size: 40px;
        font-weight: bold;
    }
}

.button-group {
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    width: 100%;
    max-width: 400px;

    >button {
        min-width: 160px;
        min-height: auto;
    }
}

.close-btn {
    width: 50px;
    height: 50px;
    cursor: pointer;
    display: inline-block;
    position: absolute;
    top: 10px;
    right: 10px;
    border-radius: 100%;
    background: #d75f70;
    font-weight: bold;
    text-decoration: none;
    color: #fff;
    line-height: 40px;
    font-size: 32px;
}

.transform-in,
.transform-out {
    display: block;
    transition: all ease 0.5s;
}

.transform-in {
    transform: translate(-50%, -50%) scale(1);
}

.transform-out {
    transform: translate(-50%, -50%) scale(0.5);
}
</style>