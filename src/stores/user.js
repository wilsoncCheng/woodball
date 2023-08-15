import { defineStore } from 'pinia'
import { ref } from 'vue'
export const useUserStore = defineStore('user', () => {
    const userEmail = ref(null)
    //SET DATA
    const SET_USER_EMAIL = (email) => {
        userEmail.value = email
    }
    const CLEAR_USER = () => {
        userEmail.value = null
    }
    return { SET_USER_EMAIL, userEmail, CLEAR_USER }
})