<template>
    <div class="game">
        <div class="game-container">
            <div class="game-header">
                <div class="game-title">{{ $store.gameLocation }} 第{{ $store.currentRound }}道/共{{ $store.gameRound }}道
                </div>
                <div class="game-right">
                    <div class="button-group">
                        <button type="button" @click="GameOverPromptToggle"
                            class="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 border border-indigo-700 ">查看成績</button>
                        <router-link to="/setting">
                            <button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-red-700"
                                @click="$store.RESET_ALL_GAME">離開</button>
                        </router-link>
                    </div>
                </div>
            </div>
            <div class="player-lists">
                <div class="player-lists-view-section">
                    <div class="player-lists-container">
                        <playerButton :player="player" :currentPlayerIndex="currentPlayerIndex"
                            @click="change_playing_player_handler(player)" v-for="(player, id) in players" :key="id">
                        </playerButton>
                    </div>
                </div>
            </div>
            <div class="game-body">
                <div class="w-60">
                    <div class="title text-orange"><span class="">{{ $store.getPlayerById(currentPlayerIndex)?.name
                    }}</span> 第<span v-if="$store.getPlayerById(currentPlayerIndex)?.isFinish !== true">{{
    $store.getPlayerById(currentPlayerIndex)?.player_point.length
}}</span><span v-else>{{
    $store.getPlayerById(currentPlayerIndex)?.player_point.length
}}
                        </span>桿
                    </div>
                    <button type="button" @click="record_data_handler(currentPlayerIndex, 1)"
                        class="next-ball">/<br>計下一桿</button>
                    <div class="check-section">
                        <button type="button" @click="record_data_handler(currentPlayerIndex, 2)"
                            class="ob button_contain">OB</button>
                        <button type="button" @click="record_data_handler(currentPlayerIndex, 3)"
                            class="ob button_contain pc-show">左OB</button>
                        <button type="button" @click="record_data_handler(currentPlayerIndex, 4)"
                            class="ob button_contain pc-show">右OB</button>
                        <button type="button" @click="recovery_handler(currentPlayerIndex)"
                            class="ob button_contain mb-show">復原</button>
                    </div>
                </div>
                <div class="w-40">
                    <div class="col space-between button-group mx-auto gap-3">
                        <button type="button" @click="recovery_handler(currentPlayerIndex)"
                            class="recovery button_contain pc-show w-[50%]">復原</button>
                        <button type="button" @click="record_data_handler(currentPlayerIndex, 5)"
                            class="foul button_contain pc-show w-[50%]">犯規</button>
                    </div>
                    <button type="button" class=" history button_contain" @click="InformationPromptOpen">
                        查看紀錄
                    </button>
                    <button
                        :class="{ bg_finished: $store.players[currentPlayerIndex].isFinish, bg_finish: !$store.players[currentPlayerIndex].isFinish }"
                        type="button" v-if="!allPlayerFinish" @click="record_data_handler(currentPlayerIndex, 9)"
                        class="finish button_contain" id="roundFinishBTN">
                        完成
                    </button>
                    <button type="button" v-else-if="allPlayerFinish && $store.currentRound !== $store.gameRound"
                        @click="next_round_handler(currentPlayerIndex, 9)" class="finish button_contain bg_finished"
                        id="roundFinishBTN">
                        下一道
                    </button>
                    <button type="button" v-else @click="next_round_handler(currentPlayerIndex, 9)"
                        class="finish button_contain bg_finished" id="roundFinishBTN">
                        結算
                    </button>
                </div>
                <CurrentPointPrompt :open="CurrentPointPromptOpen" @closeInformationPrompt="InformationPromptClose"
                    :data="players[currentPlayerIndex]">
                </CurrentPointPrompt>
                <GameRoundPrompt :open="GameRoundPromptOpen" @gameOver="GameOverPromptToggle"
                    @closeGameRoundPrompt="GameRoundPromptClose" :data="players">
                </GameRoundPrompt>
                <GameOverPrompt :open="GameOverPromptOpen" @closeGameOverPrompt="GameOverPromptClose"
                    @AllGameOverPrompt="GameOverToggle" :data="$store.totalGameData">
                </GameOverPrompt>
            </div>
            <AlertPrompt :errorMsg="propsMsg" />
        </div>
    </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import { usePlayersStore } from '@/stores/player.js'
import playerButton from '@/components/playerButton.vue'
import CurrentPointPrompt from '@/components/CurrentPointPrompt.vue';
import GameRoundPrompt from '@/components/GameRoundPrompt.vue';
import GameOverPrompt from '@/components/GameOverPrompt.vue';
import AlertPrompt from '@/components/AlertPrompt.vue'
const $store = usePlayersStore()
const currentPlayerIndex = ref(0)
const players = ref($store.players)
const CurrentPointPromptOpen = ref(false)
const GameRoundPromptOpen = ref(false)
const GameOverPromptOpen = ref(false)
const propsMsg = ref(null)
const allPlayerFinish = computed(() => {
    return $store.players.reduce((acc, crr) => {
        if (crr.isFinish == false) {
            acc = false
        }
        return acc
    }, true)
})
const InformationPromptOpen = () => {
    CurrentPointPromptOpen.value = true
}
const InformationPromptClose = () => {
    CurrentPointPromptOpen.value = false
}
const GameRoundPromptOpenToggle = () => {
    GameRoundPromptOpen.value = true
}
const GameRoundPromptClose = () => {
    GameRoundPromptOpen.value = false
}
const GameOverPromptToggle = () => {
    GameOverPromptOpen.value = true
}
const GameOverPromptClose = () => {
    GameOverPromptOpen.value = false
}
const GameOverToggle = () => {
    alert('遊戲愉快')
    GameOverPromptOpen.value = false
}
const change_playing_player_handler = (player) => {
    currentPlayerIndex.value = player.id
}
const record_data_handler = (playerId, type) => {
    if (propsMsg.value) return
    const player = $store.getPlayerById(playerId)

    const lastPlayerPoint = player.player_point.slice(-1)[0];

    if (lastPlayerPoint !== 1 && type !== 1) {
        if (lastPlayerPoint === 9 && type === 9) {
            propsMsg.value = '本玩家已經完成';
        } else {
            propsMsg.value = '需先記下一桿！';
        }
        setTimeout(() => {
            propsMsg.value = '';
        }, 3000);
        return;
    }

    if (player.isFinish == true) return
    $store.record_player_data(player, type)
    if (type == 9) {
        $store.player_finish_toggle(player)
    }
}
const next_round_handler = () => {
    allPlayerFinishHandler()
    $store.SET_GAME_ROUND_POINT()
}
const allPlayerFinishHandler = () => {
    for (let i = 0; i < $store.players.length; i++) {
        if ($store.players[i].isFinish !== true) return
    }
    console.log('all Player Finish')
    GameRoundPromptOpenToggle()
}
const recovery_handler = (playerId) => {
    const player = $store.getPlayerById(playerId)
    if (player.player_point.length == 0) return
    $store.recovery_player_data(player)
}
</script>
<style lang="scss" scoped>
.mb-show {
    display: none;
}


.game {
    width: 100%;
    min-width: 360px;

    &-container {
        padding: 10px;
        margin: 15px auto;
        background-color: transparent;
        width: 90%;
        position: relative;
        border-radius: 15px;
    }

    &-header {
        margin-bottom: 2%;
        display: flex;
        flex-direction: row;
        justify-content: center;

        .game-title {
            color: #fff;
            font-size: 30px;
            font-weight: bold;
        }
    }

    &-right {
        position: absolute;
        right: 0;
        top: 0;

        .button-group {
            display: flex;

            .return {
                font-weight: bold;
                background-color: rgb(127, 141, 185);
                color: #fff;
                padding: 10px;
                font-size: 24px;
                border-radius: 0;
            }

            .leave {
                font-size: 24px;
                padding: 10px;
                font-weight: bold;
                border-radius: 0;
                background-color: red;
                color: #fff;

            }
        }
    }

    .player-lists {
        display: flex;
        justify-content: center;
        margin: 0 auto;
        flex-wrap: wrap;
        position: relative;

        &-view-section {
            margin-bottom: 8px;
            display: flex;
            justify-content: flex-start;
            width: 100%;
        }

        &-container {
            width: 100%;
            display: flex;
            justify-content: flex-start;
            gap: 10px;
        }
    }

    &-body {
        display: flex;
        gap: 15px;

        button {
            min-height: 160px;
        }

        .w-60 {
            width: 60%;

            .title {
                margin-bottom: 8px;
                font-size: 66px;
                line-height: 109px;
                font-weight: bold;
                text-align: center;
            }

            .next-ball {
                background-color: transparent;
                border: 3px #fff solid;
                border-radius: 15px;
                padding: 10px;
                width: 100%;
                margin-bottom: 8px;
                font-weight: bold;
                font-size: 30px;
                color: #fff;
            }

            .check-section {
                width: 100%;
                justify-content: space-between;
                display: flex;
                gap: 10px;

                .ob {
                    width: calc(1 / 3 * 100%);
                    height: 60px;
                    font-weight: bold;
                    font-size: 30px;
                    border-radius: 15px;
                }
            }

            .ob:hover {
                background-color: #1b5762;
            }

            .next-ball:hover {
                background-color: #1b5762;
            }
        }

        .w-40 {
            width: 40%;

            .button-group {
                width: 100%;

                .recovery {
                    padding: 30px 0;
                    font-weight: bold;
                    min-height: auto;
                    font-size: 30px;
                    border-radius: 15px;
                }

                .foul {
                    font-size: 30px;
                    font-weight: bold;
                    padding: 30px 0;
                    border-radius: 15px;
                    min-height: auto;
                }
            }

            .history {
                width: 100%;
                padding: 12px 0;
                max-height: 56px;
                margin-bottom: 8px;
                border-radius: 15px;
                font-weight: bold;
                font-size: 30px;
            }

            .finish {
                width: 100%;
                border-radius: 15px;
                font-weight: bold;
                height: 100%;
                border: none;
                max-height: 56px;
                transition: .3s all;
                font-size: 30px;
            }


            .bg_finish {
                color: #1b5762;
                background-color: #cbe2f9;

            }

            .bg_finish:hover {
                background-color: #1b5762;
                color: #a8dee7;

            }

            .bg_finished {
                background: rgb(255 120 73);
                color: #000;
            }
        }
    }
}

@media screen and (max-width:820px) {
    .arrow {
        display: block;
    }

    .pc-show {
        display: none;
    }

    .mb-show {
        display: block;
    }

    .game {
        &-container {
            width: 95%;
        }

        .player-lists-container {
            flex-wrap: wrap;
            max-width: 500px;
            margin: 0 auto;
            justify-content: center;
        }

        &-body {
            flex-direction: column;

            .w-60 {
                width: initial;

                .title {
                    font-size: 40px;

                }

                .check-section .ob {
                    width: 50%;
                }
            }

            .w-40 {
                width: initial;
            }
        }
    }
}

@media screen and (max-width:576px) {
    .game {
        &-right .button-group {
            flex-direction: column;
        }

    }
}
</style>