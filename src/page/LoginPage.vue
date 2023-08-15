<template>
  <div class="login">
    <div class="card">
      <div class="card-top text-center" name="system">木球競賽資訊系統</div>
      <div class="card-body flex flex-col items-center">
        <div class="email w-full flex justify-center">
          <input class="textbox" type="text" v-model="email" placeholder="信箱" name="emailTBX">
        </div>
        <div class="password w-full flex justify-center">
          <input class="textbox" type="password" v-model="password" placeholder="密碼" name="passwordTBX">
        </div>
        <div class="col w-4/5">
          <div class="remember">
            <label for="rememberCBX" class="remember-label">
              <input type="checkbox" name="rememberCBX">
              <p>記住信箱</p>
            </label>
          </div>
          <div class="forget" name="forgetPasswordBTN">
            <a href="#">忘記密碼</a>
          </div>
          <!-- 註冊按鈕 -->
          <router-link to="/register">
            <div class="forget" name="forgetPasswordBTN">
              <a href="#">註冊</a>
            </div>
          </router-link>
        </div>
      </div>
      <button type="submit" name="loginBTN" class="card-bottom mx-auto w-full" @click="LoginHandler">登入</button>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user.js'
const $store = useUserStore()
const router = useRouter()
const email = ref(null)
const password = ref(null)
const LoginHandler = async () => {
  try {
    // const response = await fetch(`/app/api/Account/Login?PID=${email.value}&PPwd=${password.value}`, {
    const response = await fetch(`https://api.antqtech.com/Woodball/Account/Login?PID=${email.value}&PPwd=${password.value}`, {
      method: 'POST'
    });
    const data = await response.json();
    alert(data[0].msg)
    if (data[0].msg == '驗證成功～') {
      router.push('/')
      $store.SET_USER_EMAIL(email.value)
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
</script>
<style lang="scss" scoped>
.login {
  width: 550px;
  margin: auto;

  .card {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;

    &-top {
      width: 100%;
      background: #02A299;
      font-weight: bold;
      color: #fff;
      font-size: 26px;
      padding: 10px 0;
      letter-spacing: 2px;
    }

    &-body {
      width: 100%;
      background-color: rgba(22, 74, 99, 0.3);
      padding: 50px 0 40px 0;

      .textbox {
        border: none;
        font-weight: bold;
        font-size: 22px;
        margin: 0 auto 35px auto;
        padding: 8px;
        width: 80%;
        border-bottom: 1px solid #fff;

      }

      // ::placeholder {
      //   /* CSS 3 標準 */
      //   color: #fff;
      // }
    }

    .col {
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      font-size: 26px;
      font-weight: bold;
      padding: 0 20px;
      margin-top: 15px;

      .remember {
        &-label {
          display: flex;
          align-items: center;

          p {
            margin-left: 8px;
            color: #fff;
          }
        }
      }

      .forget {
        a {
          color: #fff;
          font-weight: bold;
        }
      }
    }

    &-bottom {
      background: #fff;
      width: calc(100% + 34px);
      border-top-left-radius: 0;
      border-top-right-radius: 0;
      color: #02A299;
      font-size: 26px;
      font-weight: bold;
      transition: all .3s;
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
      border: 1px solid transparent;
      padding: 0.6em 1.2em;
      cursor: pointer;
      position: relative;
    }

    &-bottom::before {
      content: "";
      position: absolute;
      width: 0;
      height: 0;
      border-width: 9px;
      border-style: solid;
      border-color: transparent white white transparent;
      left: -.5px;
      transition: all .5s;
      top: -18px;
      opacity: 1;
    }

    &-bottom::after {
      content: "";
      position: absolute;
      width: 0;
      height: 0;
      border-width: 9px;
      border-style: solid;
      border-color: transparent transparent white white;
      right: -.5px;
      top: -18px;
      transition: all .5s;

    }

    &-bottom:hover {
      background: #02A299;
      color: #fff;
    }

    &-bottom:hover::before {
      border-color: transparent #02A299 #02A299 transparent;
    }

    &-bottom:hover::after {
      border-color: transparent transparent #02A299 #02A299;
    }

  }
}

@media screen and (max-width:576px) {
  .login {
    width: 95%;
    margin: 0 auto;

    .card {
      width: 100%;
      margin: 0 auto;

      &-bottom {
        width: 100%;
      }

      &-bottom::before {
        display: none;
      }

      &-bottom::after {
        display: none;
      }
    }
  }
}
</style>
