<template>
    <div class="popup-wrap flex flex-col" id="GameRoundPrompt" v-show="open">
        <div class="popup-box ">
            <h1 class="mb-6 font-bold text-4xl">{{ $store.gameLocation }} 總成績</h1>
            <div class=" overflow-x-auto">
                <table v-if="$store.totalGameData.length !== 0">
                    <thead>
                        <tr>
                            <th>球道</th>
                            <th v-for="round in $store.gameRound">{{ round }}</th>
                            <th v-show="$store.currentRound == $store.gameRound">總計</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="playerData in $store.players">
                            <td>{{ playerData.name }}</td>
                            <td v-for="playerDataList in playerData.every_game_total_poles">{{ playerDataList }}</td>
                            <td v-show="playerData.every_game_total_poles.length == $store.gameRound"> {{
                                getPlayerTotalScore(playerData)
                            }}桿({{
    getPlayerTotalScore(playerData)
    - 5 * $store.currentRound }})</td>
                        </tr>
                    </tbody>
                </table>
                <h1 class="mb-6 font-bold text-4xl" v-else>尚無比賽資料</h1>
            </div>
            <div class="close-btn popup-close" @click="closePopup(2)">x</div>

            <div class="button-group mt-8 mx-auto gap-5" v-show="$store.totalGameData.length >= $store.gameRound">
                <button type="button" @click="closePopup(1)"
                    class="bg-stone-500 hover:bg-stone-700 text-white font-bold p-4 border border-stone-700 min-w-[160px]">返回</button>

                <router-link to="/setting">
                    <button type="button" @click="GameOver" id="gameOverBTN"
                        class="bg-green-500 hover:bg-green-700 text-white font-bold p-4 border border-green-700 min-w-[160px]">完成</button>
                </router-link>

            </div>
        </div>
    </div>
</template>

<script setup>
import { usePlayersStore } from '@/stores/player.js'
import { defineProps, defineEmits } from 'vue';
const $store = usePlayersStore()
const props = defineProps(['open', 'data']);
const emit = defineEmits();
const closePopup = (param) => {
    emit('closeGameOverPrompt');
    if (param == 1) {
        $store.player_all_unfinish()
        $store.POP_TOTALGAMEROUND()
        $store.RECOVERY_GAME_ROUND_POINT()
    }
};
const GameOver = () => {
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

  

<style lang="scss">
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
    min-width: 60px;
    border-bottom: 1px solid #ddd;
}

tr>th,
td:first-child {
    max-width: 150px;
    min-width: 50px;
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
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0px;
    left: 0px;
    content: '';
    background: rgba(0, 0, 0, 0.85);
}

.popup-box {
    max-height: 90%;
    width: 80%;
    padding: 10px 75px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    min-height: 200px;
    position: relative;
    max-width: 720px;
    box-shadow: 0px 2px 16px rgba(0, 0, 0, 0.5);
    border-radius: 3px;
    background: #fff;
    text-align: center;

    th,
    td {
        text-align: center;
        white-space: nowrap;
    }

    thead {
        font-size: 20px;
        font-weight: bold;


    }

    tbody {
        font-size: 20px;
        font-weight: bold;
    }
}

.button-group {
    display: flex;
    justify-content: center;
    width: 100%;
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
</style>