<template>
    <div class="player" :class="{ hover: currentPlayerIndex == player.id }">
        <div class="" v-if="player.isFinish !== true">
            <div class="pc-show">{{ player.id + 1 }}.{{ player.name }}<br>第{{ player.player_point.length }}桿</div><span
                class="mb-show">{{
                    player.id + 1 }}</span>
        </div>
        <div class="finishIcon" v-else>
            <div>{{ player.id + 1 }}.{{ player.name }}</div>{{
                player.player_point.length }}桿完成
        </div>
    </div>
</template>
<script>
export default {
    props: {
        player: {
            type: Object,
            required: true
        },
        currentPlayerIndex: {
            type: Number,
            required: true
        }
    }
}
</script>
<style lang="scss"  scoped>
.mb-show {
    display: none;
}

.player {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20%;
    min-width: 100px;
    color: #fff;
    padding: 30px 8px;
    border-radius: 10px;
    font-size: 25px;
    font-weight: bold;
    position: relative;
    background-color: transparent;
    border: 3px solid #fff;
}

.player:hover {
    background-color: #1b5762;
}

.hover {
    background-color: #133035;
}

@media screen and (max-width:820px) {
    .mb-show {
        display: block;
    }

    .player {
        width: 30%;
    }

    .pc-show {
        display: none;
    }
}
</style>