<template>
  <div class="login">
    <div class="card">
      <div class="card-top" name="system">木球競賽資訊系統</div>
      <div class="card-body">
        <div class="email">
          <input class="textbox" type="text" placeholder="信箱" name="emailTBX">
        </div>
        <div class="password">
          <input class="textbox" type="password" placeholder="密碼" name="passwordTBX">
        </div>
        <div class="col">
          <div class="remember">
            <label for="rememberCBX" class="remember-label">
              <input type="checkbox" name="rememberCBX">
              <p>記住信箱</p>
            </label>
          </div>

          <div class="forget" name="forgetPasswordBTN">
            <a href="#">忘記密碼</a>
          </div>
        </div>
      </div>
      <!-- <button type="submit" name="loginBTN" class="card-bottom mx-auto">登入</button> -->
      <router-link to="/setting" class="w-full">
        <button type="submit" name="loginBTN" class="card-bottom mx-auto">登入</button>
      </router-link>
    </div>
  </div>
</template>
<script setup>
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
        margin-bottom: 35px;
        padding: 8px;
        width: 70%;
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
