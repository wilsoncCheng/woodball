<template>
    <div class="popup-wrap" id="currentPointPrompt" v-show="open" @click="closePopup">
        <div class="popup-box transform-out">
            <h2>賽事名稱</h2>
            <h2>第{{ $store.currentRound }}道</h2>
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

  

<style lang="scss">
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
    max-height: 700px;
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