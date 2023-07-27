<template>
    <div class="popup-wrap" id="GameRoundPrompt" v-show="open">
        <div class="popup-box transform-out">
            <h2>賽事名稱 第{{ $store.currentRound }}道</h2>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        <th v-for="player in $store.players">{{ player.name }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>球道桿數</td>
                        <td v-for="ballRound in $store.players">{{ ballRound.player_point.length }}</td>
                    </tr>
                    <tr>
                        <td>累計分數</td>
                        <td v-for="ballRound in $store.players">
                            {{ getPlayerTotalScore(ballRound) }}(<span v-show="getPlayerTotalScore(ballRound) - 4 *
                                $store.currentRound >= 0
                                ">+</span> {{ getPlayerTotalScore(ballRound) - 4 *
        $store.currentRound
    }})
                        </td>
                    </tr>
                </tbody>
            </table>
            <div class="button-group mt-4">
                <button @click="closePopup" type="button"
                    class="bg-stone-500 hover:bg-stone-700 text-white font-bold p-4 border border-stone-700 ">返回</button>
                <button @click="nextGame" type="button" id="nextRoundBTN"
                    class="bg-green-500 hover:bg-green-700 text-white font-bold p-4 border border-green-700">下一道</button>
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
    emit('closeGameRoundPrompt');
    $store.player_all_unfinish()
    $store.RECOVERY_GAME_ROUND_POINT()
};
const nextGame = () => {
    emit('closeGameRoundPrompt');
    $store.record_game_round()
    if ($store.totalGameData.length == $store.gameRound) {
        emit('gameOver');
    }
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