<template>
    <div class="home w-full flex flex-col pt-4">
        <nav class="w-full flex justify-between p-4 bg-gray-800 text-white">
            <div class="text-xl font-bold">木球資訊系統</div>
            <div class="font-bold relative">
                <img src="../assets/images/user.png" class="user cursor-pointer w-12 bg-white rounded-full p-2"
                    @click="userToggle = !userToggle">
                <ul class="user-group right-0 w-36 absolute flex-col group bg-white rounded shadow-md p-2"
                    v-show="userToggle">
                    <li class="text-black py-2 px-4 hover:bg-gray-100 cursor-pointer">個人資料</li>
                    <li class="text-black py-2 px-4 hover:bg-gray-100 cursor-pointer">登出</li>
                </ul>
            </div>
        </nav>
        <div class="w-full navbar flex justify-between bg-gray-200">
            <router-link class="cursor-pointer font-bold p-4 hover:bg-gray-300" to="/setting">
                開始練習
            </router-link>
            <div class="cursor-pointer font-bold p-4 hover:bg-gray-300">
                報名練習
            </div>
            <div class="cursor-pointer font-bold p-4 hover:bg-gray-300">
                預定練習
            </div>
        </div>
        <div class="flex flex-wrap justify-center">
            <div v-for="(card, index) in cardsData" :key="index" class="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 p-4">
                <div class=" rounded overflow-hidden shadow-lg">
                    <img class="w-full h-64 object-cover" :src="card.image" alt="Card Image" />
                    <div class="px-6 py-4 bg-white">
                        <div class="font-bold text-xl mb-2">{{ card.name }}</div>
                        <p class="text-gray-700 text-base font-bold">
                            時間：{{ card.time }}<br />
                            地點：{{ card.location }}<br />
                            人數：{{ card.attendees }} / {{ card.capacity }}<br />
                            狀態：{{ card.status }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onUnmounted } from 'vue'
const userToggle = ref(false)
onUnmounted(() => {
    userToggle.value = false
})
const cardsData = [
    {
        image: "https://via.placeholder.com/400x300",
        name: "賽事名稱1",
        time: "2023-08-15 10:00 AM",
        location: "台北市木球場",
        attendees: 50,
        capacity: 100,
        status: "進行中",
    },
    {
        image: "https://via.placeholder.com/400x300",
        name: "賽事名稱2",
        time: "2023-08-20 3:00 PM",
        location: "新北市木球場",
        attendees: 80,
        capacity: 100,
        status: "已結束",
    },
    {
        image: "https://via.placeholder.com/400x300",
        name: "賽事名稱3",
        time: "2023-08-25 1:30 PM",
        location: "桃園市木球場",
        attendees: 20,
        capacity: 100,
        status: "報名中",
    },
];
</script>

<style lang="scss">
.home {
    max-width: 1140px;
    margin: 0 auto;
}
</style>