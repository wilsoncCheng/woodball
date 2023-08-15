<template>
    <div class="home w-full flex flex-col pt-4">
        <nav class="w-full flex justify-between p-4 bg-gray-800 text-white items-center">
            <div class="text-xl font-bold">木球競賽資訊系統</div>
            <div class="font-bold relative" v-if="$store.userEmail">
                <img src="../assets/images/user.png" class="user cursor-pointer w-12 bg-white rounded-full p-2"
                    @click="userToggle = !userToggle">
                <ul class="user-group right-0 w-36 absolute flex-col group bg-white rounded shadow-md p-2"
                    v-show="userToggle">
                    <li class="text-black py-2 px-4 hover:bg-gray-100 cursor-pointer">個人資料</li>
                    <li class="text-black py-2 px-4 hover:bg-gray-100 cursor-pointer" @click="$store.CLEAR_USER">登出</li>
                </ul>
            </div>
            <router-link v-else class="cursor-pointer font-bold hover:bg-gray-300" to="/login">
                登入
            </router-link>
        </nav>
        <div class="w-full navbar flex justify-between bg-gray-200">
            <div @click="startSetting" class="cursor-pointer font-bold p-4 hover:bg-gray-300" to="/setting">
                開始練習
            </div>
            <div class="cursor-pointer font-bold p-4 hover:bg-gray-300">
                報名練習
            </div>
            <div class="cursor-pointer font-bold p-4 hover:bg-gray-300">
                預定練習
            </div>
        </div>
        <div class="flex flex-wrap justify-center">
            <div v-if="cardsData.length !== 0" v-for="(card, index) in cardsData" :key="index"
                class=" cursor-pointer w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 p-4">
                <div class="rounded overflow-hidden shadow-lg">
                    <img class="w-full h-64 object-cover" src="https://via.placeholder.com/400x300" alt="Card Image" />
                    <div class="px-6 py-4 bg-white">
                        <div class="font-bold text-xl mb-2">{{ card.aName }}</div>
                        <p class="text-gray-700 text-base font-bold">
                            道數：{{ card.fairways }}<br />
                            地點：{{ card.fName }}<br />
                            開局人：{{ card.pName_Zh }}<br />
                            人數：{{ card.playerNum }}<br />
                            狀態：{{ card.aState == 1 ? '已完成' : '未完成' }}
                        </p>
                    </div>
                </div>
            </div>
            <div class="" v-else>尚無比賽資訊</div>
        </div>
    </div>
</template>

<script setup>
import { ref, onUnmounted, onMounted } from 'vue'
const userToggle = ref(false)
import { useUserStore } from '@/stores/user.js';
import { useRouter } from 'vue-router';
const router = useRouter()
const $store = useUserStore()
const cardsData = ref([])
const startSetting = () => {
    if ($store.userEmail) {
        router.push('/setting')
    } else {
        alert('請先登入')
    }
}
const fetchFields = async () => {
    try {
        // const response = await fetch('/app/api/Practice/List?Date1=2023/08/01&Date2=2023/08/31', { // 注意这里是 /test/api
        const response = await fetch('https://api.antqtech.com/Woodball/Practice/List?Date1=2023/08/01&Date2=2023/08/31', { // 注意这里是 /test/api
            method: 'POST'
        });

        if (!response.ok) {
            throw new Error(`API request failed with status: ${response.status}`);
        }

        const data = await response.json();
        cardsData.value.push(...data[0].data)
        // 处理响应数据
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};


// Call the fetchFields function when the component is mounted
onMounted(() => {
    fetchFields(); // Call the fetchFields function here
});
onUnmounted(() => {
    userToggle.value = false
})
</script>

<style lang="scss">
.home {
    max-width: 1140px;
    margin: 0 auto;
}
</style>