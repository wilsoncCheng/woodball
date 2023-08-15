<template>
    <div class="setting">
        <div class="setting-container">
            <div class="contest">
                <div class="col space-between">
                    <div class="start-button">
                        <button type="submit" @click="startGame" name="loginBTN"
                            class="card-button button mx-auto">登入</button>
                    </div>
                </div>
                <div class="col">
                    <input class="gameNameTxt" type="text" v-model="gameName" id="gameNameTBX">
                </div>
            </div>
            <div class="play-round">
                <div class="col">
                    <div class="title">道數{{ $PlayerStore.gamePlayerName }}1</div>
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
                        <option value="" disabled>球賽地點</option>
                        <option :value="gameLocationOption.fid"
                            v-for="(gameLocationOption, id) in gameLocationOptionList?.[0].data" :key="id">
                            {{ gameLocationOption.fName }}
                        </option>
                    </select>
                </div>
            </div>
            <div class="player">
                <div class="col">

                    <p>選手一</p>
                </div>
                <div class="col space-between wrap">
                    <input type="text" class="playerTxt" :readonly="p1LoginWay" v-model="playerData[0]"
                        @change="handleInput" :placeholder="`${loginTxt[0]}/${loginTxt[1]}`" id="player1TBX">
                    <input type="radio" value="name" id="p1Name" v-model="p1LoginWay" />
                    <button type="button" @click="verifyEmailHandler(1, 0)" class="unLuck" :class="{ Luck: p1LoginWay }"
                        id="p1CertifiedLB">認證</button>
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
                    <button type="button" @click="verifyEmailHandler(2, 1)" class="unLuck" :class="{ Luck: p2LoginWay }"
                        id="p2CertifiedLB">認證</button>
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
                    <button type="button" @click="verifyEmailHandler(3, 2)" class="unLuck" :class="{ Luck: p3LoginWay }"
                        id="p3CertifiedLB">認證</button>
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
                    <button type="button" @click="verifyEmailHandler(4, 3)" class="unLuck" :class="{ Luck: p4LoginWay }"
                        id="p4CertifiedLB">認證</button>
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
                    <button type="button" @click="verifyEmailHandler(5, 4)" class="unLuck" :class="{ Luck: p5LoginWay }"
                        id="p5CertifiedLB">認證</button>
                </div>
            </div>
            <div class="box" @click="nowPlayerNumber++" v-show="nowPlayerNumber <= maxPlayerNumber - 1">
                <div class="plus">+</div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { useRouter } from 'vue-router';
import { usePlayersStore } from '@/stores/player.js'
import { useUserStore } from '@/stores/user.js'
import { ref, onMounted } from 'vue'
const router = useRouter();
const $UserStore = useUserStore()
const $PlayerStore = usePlayersStore()
const gameLocationOptionList = ref(null)
const gameRound = ref(12)
const gameLocationName = ref('')
const gameLocation = ref("北部")
const gameLocationOption = ['北部', '中部', '南部', '其他']
const loginTxt = ['選手信箱', '會員電話']
const nowPlayerNumber = ref(1)
const maxPlayerNumber = 5
const playerData = ref([])
const p1LoginWay = ref(false)
const p2LoginWay = ref(false)
const p3LoginWay = ref(false)
const p4LoginWay = ref(false)
const p5LoginWay = ref(false)
const gameName = ref(null)
onMounted(() => {
    fetchFields()
    playerData.value.push($UserStore.userEmail)
})
const fetchFields = async () => {
    try {
        // const response = await fetch('/app/api/Practice/SelField', {
        const response = await fetch('https://api.antqtech.com/Woodball/Practice/SelField', {
            method: 'POST'
        });

        if (!response.ok) {
            throw new Error(`API request failed with status: ${response.status}`);
        }
        const data = await response.json();
        gameLocationOptionList.value = data
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

const verifyEmailHandler = async (player, number) => {
    try {
        // const response = await fetch(`/app/api/Practice/VerifyPlayer?PlayerID=${playerData.value[number]}`, {
        const response = await fetch(`https://api.antqtech.com/Woodball/Practice/VerifyPlayer?PlayerID=${playerData.value[number]}`, {
            method: 'POST'
        });
        const data = await response.json();
        alert(data[0].msg);
        if (data[0].msg == '驗證成功～') {
            switch (player) {
                case 1:
                    p1LoginWay.value = true;
                    break;
                case 2:
                    p2LoginWay.value = true;
                    break;
                case 3:
                    p3LoginWay.value = true;
                    break;
                case 4:
                    p4LoginWay.value = true;
                    break;
                case 5:
                    p5LoginWay.value = true;
                    break;
                default:
                    // 如果 player 不是 1 到 5 之間的數字，可以在這裡處理默認的情況
                    break;
            }
        }

    } catch (error) {
        console.error('Error fetching data:', error);
        alert('無此信箱');
    }
};

const currentDate = new Date();
const year = currentDate.getFullYear();
const month = String(currentDate.getMonth() + 1).padStart(2, '0');
const day = String(currentDate.getDate()).padStart(2, '0');
const formattedDate = year + month + day;
gameName.value = formattedDate + '練習賽'
const gamePlayerName = ref([])
const response = async () => {
    try {
        // const response = await fetch(`/app/api/Practice/Start?PracticeName=${gameName.value}&Fairways=${gameRound.value}&FID=${gameLocationName.value}`, {
        const response = await fetch(`https://api.antqtech.com/Woodball/Practice/Start?PracticeName=${gameName.value}&Fairways=${gameRound.value}&FID=${gameLocationName.value}`, {
            method: 'POST',
            body: JSON.stringify(playerData.value)
        });
        const data = await response.json();
        gamePlayerName.value = data[0].player
        $PlayerStore.SET_GAME_ID(data[0].aid)
        $PlayerStore.RESET_PLAYER()
        for (let i = 0; i < gamePlayerName.value.length; i++) {
            $PlayerStore.addPlayer(gamePlayerName.value[i].pName)
        }
        router.push('/game')
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};
const startGame = () => {
    response()
    $PlayerStore.SET_GAME_NAME(gameName.value)
    $PlayerStore.SET_GAME_NUM(gameRound.value)
    $PlayerStore.SET_GAME_LOCATION(gameName.value)

}
</script>
<style lang="scss" >
.card-button {
    background-color: red;
}

.col .gameNameTxt {
    text-align: left;
    width: 70%;
}

.col .playerTxt {
    width: 80%;
}

.setting {
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

            .unLuck {
                cursor: pointer;
                width: 19%;
                min-width: 95px;
                height: 50px;
                font-size: 24px;
                background: rgba(45, 138, 115, 0.708);
                border-radius: 5px;
                color: #fff;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            .Luck {
                background: rgba(18, 57, 47, 0.708);
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
    .col .playerTxt {
        width: 100%;
    }

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