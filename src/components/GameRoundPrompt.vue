<template>
    <div class="popup-wrap " id="GameRoundPrompt" v-show="open">
        <div class="popup-box transform-out">
            <h2 class=" font-bold text-3xl mb-6">{{ $store.gameLocation }} 第{{ $store.currentRound }}道</h2>
            <div class="overflow-y-auto max-h-[200px] mb-6">
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
                            <td v-for="ballRound in $store.players">{{ ballRound.player_point.length }}桿</td>
                        </tr>
                        <tr>
                            <td>累計桿數</td>
                            <td v-for="ballRound in $store.players">
                                {{ getPlayerTotalScore(ballRound) }}桿(<span v-show="getPlayerTotalScore(ballRound) - 4 *
                                    $store.currentRound >= 0
                                    ">+</span> {{ getPlayerTotalScore(ballRound) - 4 *
        $store.currentRound
    }})
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="button-group mt-4 mx-auto flex justify-between max-w-[400px]">
                <button @click="closePopup" type="button"
                    class="bg-stone-500 hover:bg-stone-700 text-white font-bold p-2 border border-stone-700">返回</button>
                <button @click="nextGame" type="button" id="nextRoundBTN"
                    class="bg-green-500 hover:bg-green-700 text-white font-bold p-2 border border-green-700"><span
                        v-if="$store.currentRound < $store.gameRound">下一道</span><span v-else>結算</span></button>
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
    if ($store.totalGameData.length >= $store.gameRound) {
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


.button-group {

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
</style>