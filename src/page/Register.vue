<template>
    <div class="min-h-screen flex items-center justify-center bg-transparent">
        <div class="bg-white p-8 shadow-md rounded-md w-96 max-h-500">
            <h2 class="text-2xl font-semibold mb-4 text-center">註冊</h2>
            <form @submit.prevent="register">
                <div class="mb-4">
                    <label class="block font-semibold mb-1">姓名</label>
                    <input v-model="name" class="w-full p-2 border rounded-md" type="text" />
                </div>
                <div class="mb-4">
                    <label class="block font-semibold mb-1">信箱</label>
                    <input v-model="email" class="w-full p-2 border rounded-md" type="email" />
                </div>
                <div class="mb-4">
                    <label class="block font-semibold mb-1">密碼</label>
                    <input v-model="password" class="w-full p-2 border rounded-md" type="password" />
                </div>
                <div class="mb-4">
                    <label class="block font-semibold mb-1">電話</label>
                    <input v-model="phone" class="w-full p-2 border rounded-md" type="tel" />
                </div>
                <button class="w-full bg-blue font-bold text-white py-2 rounded-md hover:bg-blue-600"
                    @click="RegisterHandler">註冊</button>

                <!-- 回到登入按鈕 -->
                <router-link to="/login">
                    <button class="w-full bg-gray-400 font-bold text-white mt-4 py-2 rounded-md hover:bg-gray-600"
                        @click="goToLogin">回到登入</button></router-link>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

import { useRouter } from 'vue-router';
const name = ref('');
const email = ref('');
const password = ref('');
const phone = ref('');

const router = useRouter();
const RegisterHandler = async () => {
    try {
        // const response = await fetch(`/app/api/Account/Register?Email=${email.value}&Verify=111111&Code=111111&Name=${name.value}&Phone=${phone.value}&Pwd=${password.value}`, {
        const response = await fetch(`https://api.antqtech.com/Woodball/Account/Register?Email=${email.value}&Verify=111111&Code=111111&Name=${name.value}&Phone=${phone.value}&Pwd=${password.value}`, {
            method: 'POST'
        });
        const data = await response.json();
        if (data.status == 400) {
            if (data.errors.Name) {
                alert(data.errors.Name)
            }
            if (data.errors.email) {
                alert(data.errors.email)
            }
            if (data.errors.password) {
                alert(data.errors.password)
            }
            if (data.errors.Phone) {
                alert(data.errors.Phone)
            }
        } else {
            alert(data[0].msg)
        }
        if (data[0].msg = '註冊成功~') {
            router.push('/login')
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};
</script>

<style scoped>
/* 您可以在這裡添加局部的樣式 */
</style>
