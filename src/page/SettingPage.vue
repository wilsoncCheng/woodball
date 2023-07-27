<template>
    <div class="home">
        <div class="home-container">
            <div class="contest">
                <div class="col space-between">
                    <div class="title">賽事名稱</div>
                    <div class="start-button">
                        <router-link @click="startGame" to="/game">前端測試按鈕 </router-link>
                    </div>
                    <div class="start-button">
                        <button type="submit" class="button" id="startGameBTN">開始<span class="button-word">{{
                            nowPlayerNumber
                        }}</span></button>
                    </div>
                </div>
                <div class="col">
                    <input class="gameNameTxt" type="text" v-model="gameName" id="gameNameTBX">
                </div>
            </div>
            <div class="play-round">
                <div class="col">
                    <div class="title">道數</div>
                </div>
                <div class="play-round-lists">
                    <div v-for="i in 3" :key="i" class="time-option">
                        <input type="radio" :value="i * 6" :id="i" v-model="gameRound" />
                        <label class="numberButton" :class="{ check: gameRound == i * 6 }" :for="i"
                            :id="`gameRound${i * 6}LB`">{{
                                i * 6 }}</label>
                    </div>
                </div>
            </div>
            <div class="play-ground">
                <div class="col space-between">
                    <div class="title">球場</div>
                    <div class="play-ground-lists">
                        <div class="play-ground-lists-item" v-for="(i, id) in  gameLocationOption" :key="id">
                            <input type="radio" :value="i" :id="id + i" v-model="gameLocation" />
                            <label class="location" :class="{ check: gameLocation == i }" :for="id + i">{{ i }}</label>
                        </div>
                    </div>
                </div>
                <div class="col">
                    <select v-model="gameLocationName" id="gameNameDDL">
                        <option value="">球賽地點</option>
                        <option value="球賽地點1">球賽地點1</option>
                        <option value="球賽地點2">球賽地點2</option>
                        <option value="球賽地點3">球賽地點3</option>
                    </select>
                </div>
            </div>
            <div class="player">
                <div class="col">
                    <p>選手一</p>
                </div>
                <div class="col space-between wrap">
                    <input type="text" class="playerTxt" v-model="playerData[0]" @change="handleInput"
                        :placeholder="`${loginTxt[0]}/${loginTxt[1]}`" id="player1TBX">
                    <input type="radio" value="name" id="p1Name" v-model="p1LoginWay" />
                    <label class="Luck" :class="{ Luck: p1LoginWay == 'name' }" for="p1Name" id="p1CertifiedLB">認證</label>
                </div>
            </div>
            <div class="player" v-if="nowPlayerNumber >= 2">
                <div class="col">
                    <p>選手二</p>
                </div>
                <div class="col space-between wrap">
                    <input type="text" class="playerTxt" v-model="playerData[1]" @change="handleInput"
                        :placeholder="`${loginTxt[0]}/${loginTxt[1]}`" id="player2TBX">
                    <input type="radio" value="name" id="p2Name" v-model="p2LoginWay" />
                    <label class="Luck" :class="{ Luck: p2LoginWay == 'name' }" for="p2Name" id="p2CertifiedLB">認證</label>
                </div>
            </div>
            <div class="player" v-if="nowPlayerNumber >= 3">
                <div class="col">
                    <p>選手三</p>
                </div>
                <div class="col space-between wrap">
                    <input type="text" class="playerTxt" v-model="playerData[2]" @input="handleInput"
                        :placeholder="`${loginTxt[0]}/${loginTxt[1]}`" id="player3TBX">
                    <input type="radio" value="name" id="p3Name" v-model="p3LoginWay" />
                    <label class="Luck" :class="{ Luck: p3LoginWay == 'name' }" for="p3Name" id="p3CertifiedLB">認證</label>
                </div>
            </div>
            <div class="player" v-if="nowPlayerNumber >= 4">
                <div class="col">
                    <p>選手四</p>
                </div>
                <div class="col space-between wrap">
                    <input type="text" class="playerTxt" v-model="playerData[3]" @input="handleInput"
                        :placeholder="`${loginTxt[0]}/${loginTxt[1]}`" id="player4TBX">
                    <input type="radio" value="name" id="p4Name" v-model="p4LoginWay" />
                    <label class="Luck" :class="{ Luck: p4LoginWay == 'name' }" for="p4Name" id="p4CertifiedLB">認證</label>
                </div>
            </div>
            <div class="player" v-if="nowPlayerNumber >= 5">
                <div class="col">
                    <p>選手五</p>
                </div>
                <div class="col space-between wrap">
                    <input type="text" class="playerTxt" v-model="playerData[4]" @input="handleInput"
                        :placeholder="`${loginTxt[0]}/${loginTxt[1]}`" id="player5TBX">
                    <input type="radio" value="name" id="p5Name" v-model="p5LoginWay" />
                    <label class="Luck" :class="{ Luck: p5LoginWay == 'name' }" for="p5Name" id="p5CertifiedLB">認證</label>
                </div>
            </div>
            <div class="box" @click="nowPlayerNumber++" v-show="nowPlayerNumber <= maxPlayerNumber - 1">
                <div class="plus">+</div>
            </div>
        </div>
    </div>
    <img src="../assets/images/Jesse.gif" class="gameImg" v-show="jesseAns" alt="">
    <img src="../assets/images/lwy.gif" class="gameImg" v-show="lwyAns" alt="">
    <img src="../assets/images/COCOWOW.gif" class="gameImg" v-show="wilsonAns" alt="">
    <img src="../assets/images/Battle(2).gif" class="gameImg" v-show="battle" alt="">
</template>
<script setup>
import { usePlayersStore } from '@/stores/player.js'
import { ref, watch } from 'vue'
const $store = usePlayersStore()
const gameRound = ref(12)
const gameLocationName = ref('')
const gameLocation = ref("北部")
const gameLocationOption = ['北部', '中部', '南部', '其他']
const loginTxt = ['選手名稱', '會員電話']
const nowPlayerNumber = ref(1)
const maxPlayerNumber = 5
const playerData = ref([])
const p1LoginWay = ref('phone')
const p2LoginWay = ref('phone')
const p3LoginWay = ref('phone')
const p4LoginWay = ref('phone')
const p5LoginWay = ref('phone')
const gameName = ref(null)
//日期轉換
const currentDate = new Date();
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0');
const day = String(currentDate.getDate()).padStart(2, '0');
const formattedDate = year + month + day;
gameName.value = formattedDate + '練習賽'
const startGame = () => {
    setPlayer()
    $store.SET_GAME_NAME(gameName.value)
    $store.SET_GAME_NUM(gameRound.value)
    $store.SET_GAME_Location(gameLocationName.value)

}
const setPlayer = () => {
    $store.RESET_PLAYER()
    for (let i = 0; i < playerData.value.length; i++) {
        $store.addPlayer(playerData.value[i])
    }
}
//遊戲
const jesseAns = ref(null)
const wilsonAns = ref(null)
const lwyAns = ref(null)
const battle = ref(null)
const handleInput = () => {
    playerData.value = playerData.value.reduce((acc, crr) => acc.concat(crr.toLowerCase()), [])
    for (let i = 0; i < playerData.value.length; i++) {
        if (playerData.value[i].indexOf('jesse') !== -1 && jesseAns.value === null) {
            jesseAns.value = confirm('偵測到Jesse在遊戲中，是否變更遊戲難度為困難模式')
        }
        if (playerData.value[i].indexOf('wilson') !== -1 && wilsonAns.value === null) {
            wilsonAns.value = confirm('偵測到wilson在遊戲中，是否變更遊戲難度為快樂模式')
        }
        if (playerData.value[i].indexOf('羅') !== -1 && lwyAns.value === null) {
            lwyAns.value = confirm('偵測到羅文妤在遊戲中，是否變更遊戲難度為厭世模式')
        }
        if (wilsonAns.value !== null && jesseAns.value !== null) {
            battle.value = confirm('偵測到wilson和jesse在同一場遊戲中，是否開啟戰鬥模式')
        }
    }
}
watch(jesseAns, (newVal) => {
    if (newVal) {
        setTimeout(() => {
            jesseAns.value = false;
        }, 7000);
    }
});
watch(wilsonAns, (newVal) => {
    if (newVal) {
        setTimeout(() => {
            wilsonAns.value = false;
        }, 7000);
    }
});
watch(lwyAns, (newVal) => {
    if (newVal) {
        setTimeout(() => {
            lwyAns.value = false;
        }, 7000);
    }
});
watch(battle, (newVal) => {
    if (newVal) {
        setTimeout(() => {
            battle.value = false;
        }, 7000);
    }
});
</script>
<style lang="scss" >
.gameImg {
    position: absolute;
    width: 100%;
    height: 100vh;
    left: 0;
    top: 0;
}

.col .gameNameTxt {
    text-align: left;
    width: 70%;
}

.col .playerTxt {
    width: 80%;
}

.home {
    margin: 20px 0;
    width: 90%;
    min-width: 360px;

    &-container {
        width: 100%;
        font-weight: bold;
        display: flex;
        justify-content: center;
        flex-direction: column;

        .wrap {
            flex-wrap: wrap;
        }


        .space-between {
            justify-content: space-between;
        }

        .contest {
            padding: 20px;
            background: #fff;
            border-radius: 18px;
            text-align: left;
            font-size: 24px;
            margin-bottom: 16px;
            position: relative;

            .start-button {
                .button {
                    display: flex;
                    align-items: center;
                    position: absolute;
                    right: 20px;
                    top: 50%;
                    transform: translateY(-50%);
                    border: 1px solid #6e6cfc;
                    outline: none;
                    font-size: 20px;
                    border: none;
                    border-radius: 10px;
                    background: rgb(209 66 56 / 95%);
                    font-weight: bold;
                    color: #fff;
                    padding: 18px 50px;
                    transition: all .3s;
                }

                >button:hover {
                    background: rgb(209 98 90 / 95%);
                    scale: 1.05;
                }

                .button-word {
                    display: flex;
                    width: 25px;
                    margin-left: 3px;
                    border-radius: 100%;
                    border: 2px solid #fff;
                    height: 25px;
                    align-items: center;
                    justify-content: center;
                }
            }
        }

        .play-round {

            padding: 20px;
            background: #fff;
            border-radius: 18px;
            text-align: left;
            font-size: 24px;
            margin-bottom: 16px;

            &-lists {
                display: flex;
                margin: 0;
                font-size: 22px;
                width: 100%;
                justify-content: space-between;

                .time-option {
                    width: 30%;
                }

                .numberButton {
                    cursor: pointer;
                    height: 100px;
                    background: rgba(50, 176, 143, 0.708);
                    border-radius: 15px;
                    color: #fff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .numberButton:hover {
                    background: rgba(10, 101, 77, 0.708);
                }

                .check {
                    background: rgb(13 67 53 / 71%);
                }
            }
        }

        .play-ground {

            padding: 20px;
            background: #fff;
            border-radius: 18px;
            text-align: left;
            font-size: 24px;
            margin-bottom: 16px;


            &-lists {
                display: flex;
                margin: 0;
                width: 100%;
                justify-content: space-around;
                max-width: 500px;
                flex: 1;

                &-item {
                    width: 20%;
                    min-width: 100px;
                }

                .location {
                    width: 100%;
                    cursor: pointer;
                    height: 40px;
                    font-size: 22px;
                    background: rgba(50, 176, 143, 0.708);
                    border-radius: 15px;
                    color: #fff;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .location:hover {
                    background: rgba(10, 101, 77, 0.708);
                }

                .check {
                    background: rgb(13 67 53 / 71%);
                }
            }
        }

        .player {
            width: 100%;
            padding: 20px;
            background: #fff;
            border-radius: 18px;
            text-align: left;
            font-size: 24px;
            margin-bottom: 16px;

            p {
                color: black;
            }

            .w-48 {
                width: 48%;
            }

            .mr-2 {
                margin-right: 2%;
            }

            .loginGap {
                gap: 20px;
            }

            .Luck {
                cursor: pointer;
                width: 19%;
                min-width: 95px;
                height: 50px;
                font-size: 24px;
                background: rgba(50, 176, 143, 0.708);
                border-radius: 5px;
                color: #fff;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .loginWay {
                cursor: pointer;
                min-width: 250px;
                height: 50px;
                font-size: 24px;
                background: rgba(50, 176, 143, 0.708);
                border-radius: 5px;
                color: #fff;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .loginWay:hover {
                background: rgba(10, 101, 77, 0.708);
            }

            .check {
                background: rgba(10, 101, 77, 0.708);
            }
        }

        .box {
            width: 100%;
            height: 140px;
            border: 2px dashed rgba(0, 0, 0, 0.5);
            background-color: rgba(255, 255, 255, 0.5);
            display: flex;
            border-radius: 18px;
            cursor: pointer;
            justify-content: center;
            align-items: center;
        }

        .box:hover {
            background-color: rgba(255, 255, 255, 0.7);

        }

        .plus {
            font-size: 60px;
            font-weight: bold;
        }
    }
}

@media screen and (max-width:600px) {
    .home-container {
        .player {
            width: initial;

            .Luck {
                width: 100%;
            }
        }

        .play-ground .col {
            flex-direction: column;

            .title {
                align-self: flex-start;
            }

            .play-ground-lists {
                flex-wrap: wrap;
                gap: 20px;

                .location {
                    height: 60px;
                }
            }
        }

        .contest .start-button>button {
            position: relative;
            right: 0;
            top: 0;
            transform: none;
        }
    }
}
</style>