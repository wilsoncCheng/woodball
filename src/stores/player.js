import { defineStore } from 'pinia';
import { ref } from 'vue'
export const usePlayersStore = defineStore('players', () => {
  const totalGameData = ref([])
  const players = ref([]);
  const gameName = ref(null)
  const gameRound = ref(null)
  const gameLocation = ref(null)
  const gameID = ref(null)
  const currentRound = ref(1)
  let playerId = 0;
  const addPlayer = (name) => {
    const player = {
      id: playerId,
      name,
      every_game_total_poles: [],
      player_point: [1],
      isFinish: false
    };
    players.value.push(player);
    playerId++;
  };
  //SET DATA
  const SET_GAME_ID = (params) => {
    gameID.value = params
  }
  const RESET_PLAYER = () => {
    players.value = []
  }
  const SET_GAME_NAME = (params) => {
    gameName.value = params
  }
  const SET_GAME_NUM = (params) => {
    gameRound.value = params
  }
  const SET_GAME_LOCATION = (params) => {
    gameLocation.value = params
  }
  //COMPUTED
  const getPlayerById = (Id) => {
    return players.value.find((player) => player.id === Id);
  };
  //FUNCTION
  const record_game_round = () => {
    const playersCopy = JSON.parse(JSON.stringify(players.value)); // 深度複製
    totalGameData.value.push(playersCopy);
    reset_game_round();
    if (currentRound.value >= gameRound.value) {
      return;
    }
    currentRound.value++;
  };
  const POP_TOTALGAMEROUND = () => {
    totalGameData.value.pop()
  }
  const RESET_ALL_GAME = () => {
    totalGameData.value = []
    players.value = []
    gameName.value = null
    gameRound.value = null
    gameLocation.value = null
    currentRound.value = 1
    playerId = 0
  }
  const reset_game_round = () => {
    for (let i = 0; i < players.value.length; i++) {
      players.value[i].player_point = [1]
      players.value[i].isFinish = false
    }
  };
  const player_finish_toggle = (player) => {
    player.isFinish = !player.isFinish
  };
  const SET_GAME_ROUND_POINT = () => {
    for (let i = 0; i < players.value.length; i++) {
      players.value[i].every_game_total_poles[currentRound.value - 1] = players.value[i].player_point.length
    }
  }
  const RECOVERY_GAME_ROUND_POINT = () => {
    for (let i = 0; i < players.value.length; i++) {
      players.value[i].every_game_total_poles.pop()
    }
  }
  const record_player_data = (player, type) => {
    if (type == 9) {
      player.player_point.pop()
    }
    player.player_point.push(type)
  };
  const recovery_player_data = (player) => {
    if (player.player_point.length == 1 && player.player_point.indexOf(9) == -1) return
    if (player.player_point[player.player_point.length - 1] == 9) {
      player_finish_toggle(player)
      player.player_point.pop();
      player.player_point.push(1);
      return
    }
    player.player_point.pop()
  };
  const player_all_unfinish = () => {
    for (let i = 0; i < players.value.length; i++) {
      recovery_player_data(players.value[i])
      players.value[i].isFinish = false
    }
  };

  return { SET_GAME_ID, gameID, POP_TOTALGAMEROUND, RESET_ALL_GAME, RECOVERY_GAME_ROUND_POINT, SET_GAME_ROUND_POINT, RESET_PLAYER, reset_game_round, record_game_round, totalGameData, gameName, player_all_unfinish, gameRound, gameLocation, currentRound, SET_GAME_NAME, SET_GAME_NUM, SET_GAME_LOCATION, players, playerId, addPlayer, getPlayerById, recovery_player_data, record_player_data, player_finish_toggle };
});
