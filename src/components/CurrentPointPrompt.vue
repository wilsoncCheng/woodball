<template>
    <div class="popup-wrap" id="currentPointPrompt" v-show="open" @click="closePopup">
        <div class="popup-box transform-out">
            <h2 class="font-bold text-4xl">{{ $store.gameLocation }}</h2>
            <h2 class="font-bold text-4xl">第{{ $store.currentRound }}道</h2>
            <h1> {{ data.name }}</h1>
            <div class="table-container">
                <table>
                    <thead>
                        <tr>
                            <th>桿數</th>
                            <th>紀錄</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(list, id) in data.player_point" :key="id">
                            <td>第{{ id + 1 }}桿</td>
                            <td :class="{ foul: list !== 1 && list !== 9, 'origin-center rotate-45': list === 9 }">{{
                                playerRule[list]
                            }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="close-btn popup-close" @click="closePopup">x</div>
        </div>
    </div>
</template>
  
<script setup>
import { usePlayersStore } from '@/stores/player.js'
import playerRule from '@/assets/playerRule/playerRule.js';
import { defineProps, defineEmits } from 'vue';
const $store = usePlayersStore()
const emits = defineEmits()
const closePopup = () => {
    emits('closeInformationPrompt');
};

const { open, data } = defineProps(['open', 'data']);
</script>

  

<style lang="scss" scoped>
.noRecord {
    font-size: 44px;
    font-weight: bold;

}

table {
    width: 100%;
    border-collapse: collapse;

    thead {
        width: 100%;
    }
}

.table-container {
    width: 100%;
    max-height: 400px;
    overflow-y: auto;
    position: relative;
}

th,
td {
    padding: 8px;
    text-align: left;
    border-bottom: 1px solid #ddd;
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



.foul {
    color: red;
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