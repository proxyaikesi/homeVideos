<template>
  <div class="login">
    <div class="login-cont">
      <div class="tv-top">
        <div class="tv-svg">
          <svg
            width="50"
            height="50"
            viewBox="0 0 24 28"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g fill-rule="evenodd">
              <path
                d="M19 6v6h-2V6h2zm-7 0h2v6h-2V6zM5 0 0 5v18h6v5l5-5h4l9-9V0H5zm17 13-4 4h-4l-4 4v-4H6V2h16v11z"
              ></path>
              <path
                fill="#FFF"
                d="m18 17 4-4V2H6v15h4v4l4-4h4zM12 6h2v6h-2V6zm7 0h-2v6h2V6z"
              ></path>
            </g>
          </svg>
        </div>
        <h4>登录 Internet media</h4>
      </div>
      <div
        class="server-message-alert"
        v-if="passwordInvalid && passwordTouched"
      >
        <img src="../../public/icon_svg/hhh.svg" alt="" />
        <div class="alert-text">
          <strong>该密码错误。请重试。</strong>
        </div>
      </div>
      <!-- form -->
      <form @submit.prevent="loginsubmit">
        <!-- form-group 用户名 -->
        <div class="form-group">
          <label>用户名</label>
          <input
            :class="CheckAccount"
            @focus="isFocusedUsername = true"
            @blur="isFocusedUsername = false"
            type="text"
            v-model="username"
            @input="checkUsername"
          />
          <!-- div 显示隐藏 -->
          <div
            class="cont-box"
            :class="{
              active:
                isFocusedUsername ||
                (usernameTouched && (!validateUsername() || !usernameExists)),
            }"
          >
            <!-- div里p标签里消失隐藏 -->
            <p
              :class="{
                ColorGrey:
                  (validateUsername() && usernameExists) ||
                  (!usernameTouched && !usernameTouched),
                Classnone:
                  !isFocusedUsername &&
                  !(
                    usernameTouched &&
                    (!validateUsername() || !usernameExists)
                  ),
              }"
            >
              {{ userMessage }}
            </p>
          </div>
        </div>
        <!-- form-group 密码 -->
        <div class="form-group">
          <label>密码</label>
          <input
            v-model="password"
            :class="CheckPassword"
            :type="inputType"
            @focus="handlePasswordFocus"
            @blur="handlePasswordBlur"
            @input="handlePasswordInput"
          />
          <!-- 密码 text 可见 -->
          <PasswordToggleButton
            @toggle="tooglepasswordVisibility"
          ></PasswordToggleButton>
          <!-- div显示隐藏 -->
          <div
            class="cont-box"
            :class="{
              active: isFocusedPassword || (passwordInvalid && passwordTouched),
            }"
          >
            <p
              class="Color-Pwd"
              :class="{
                'password-error': passwordInvalid && passwordTouched,
                Classnone:
                  CheckPassword == 'input-valid' &&
                  !isFocusedPassword &&
                  !passwordInvalid,
              }"
            >
              请填写密码
              <!--  !isFocusedPassword || (passwordInvalid && passwordTouched), -->
            </p>
          </div>
        </div>
        <!-- 登录 -->
        <button
          class="btn-login"
          :class="{
            colorpurple: usernameExists && password !== '' && !passwordInvalid,
          }"
        >
          登录
        </button>
        <!-- colorpurple: usernameExists && password !== '' && !passwordInvalidf, -->
      </form>
      <div class="border-101">
        <p><span>或</span></p>
      </div>
      <!-- 去注册 -->
      <div class="btn-register">
        <router-link to="/register">没有账户？ 注册</router-link>
      </div>
    </div>
  </div>
</template>
<script setup>
import PasswordToggleButton from "../components/PasswordToggleButton.vue";
import { ElMessage } from "element-plus";
import "element-plus/dist/index.css";
import { ref, computed } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
const store = useStore();
const router = useRouter();
const username = ref("");
const password = ref("");
const isFocusedUsername = ref(false);
const isFocusedPassword = ref(false);
const userMessage = ref("请填写用户名");
const usernameExists = ref(false);
const usernameTouched = ref(false);
const passwordInvalid = ref(false);
const passwordTouched = ref(false);
const isPasswordVisible = ref(false);
const tooglepasswordVisibility = (value) => {
  isPasswordVisible.value = value;
};
const inputType = computed(() => {
  console.log(isPasswordVisible.value, "9");
  return isPasswordVisible.value ? "text" : "password";
});
// 验证用户名符合
const validateUsername = () => {
  if (username.value == "") {
    userMessage.value = "请填写用户名";
    return true;
  }
  if (!/^[a-zA-Z0-9]*$/.test(username.value)) {
    userMessage.value = "*用户名只能包含字母、数字字符。";
    return false;
  }
  if (username.value.length < 4 || username.value.length > 25) {
    userMessage.value = "*用户名必须介于 4 到 25 个字符之间。";
    return false;
  }
  return true;
};
// input @input="checkUsername"
const checkUsername = async () => {
  usernameTouched.value = true;
  if (!validateUsername()) {
    return;
  }
  passwordInvalid.value = false;
  // 登录用户名查重请求
  try {
    const response = await axios.post("http://localhost:3000/login", {
      username: username.value,
      type: "check",
    });
    usernameExists.value = response.data.exists;
    if (usernameExists.value) {
      userMessage.value = "*此用户名已存在可登录";
    } else {
      userMessage.value = "此用户不存在，请注册。";
      console.log(usernameExists.value);
    }
  } catch (error) {
    console.log("error", error.response.data.message);
  }
};
// 登录条件
const loginsubmit = async () => {
  if (username.value === "" || password.value === "") {
    ElMessage.error("请填写完所有信息再提交。");
    return;
  }
  if (!validateUsername()) {
    ElMessage.error("请正确填写用户名。");
    return;
  }
  if (!usernameExists.value) {
    ElMessage.error("此用户不存在，请注册。");
    return;
  }
  try {
    await store.dispatch("login", {
      username: username.value,
      password: password.value,
      type: "password", // 确保 type 参数设置为 'password'
    });
    router.push("/new"); // 登录成功后跳转到受保护的页面
  } catch (error) {
    console.error("登录失败", error);
    ElMessage.error({
      message: error.response.data.message,
      position: "bottom-right", // 注意 position 的值是字符串，不是 "bottom-right:90px"
      offset: 200, // 用 offset 属性来设置具体位置的偏移
    });
    passwordInvalid.value = true; // 设置密码错误状态
  }
  // 登录账号密码请求
  // try {
  //   const response = await axios.post("http://localhost:3000/login", {
  //     username: username.value,
  //     password: password.value,
  //     type: "password",
  //   });
  //   localStorage.setItem("token", response.data.token); // 存储 token

  //   // await store.dispatch("login", {
  //   //   username: username.value,
  //   //   password: password.value,
  //   //   type: "password",
  //   // });
  //   ElMessage.success("登录成功");
  //   // router.push("/"); // 跳转到主页或其他页面
  // } catch (error) {
  //   console.log(error.response.data.message);
  //   passwordInvalid.value = true; // 设置密码错误状态
  //   // 获取并存储用户信息
  //   await store.dispatch("fetchUserInfo");
  //   // router.push("/");
  //   // 跳转到主页或其他页面
  //   ElMessage.error({
  //     message: error.response.data.message,
  //     position: "bottom-right", // 注意 position 的值是字符串，不是 "bottom-right:90px"
  //     offset: 200, // 用 offset 属性来设置具体位置的偏移
  //   });
  // }
};
// 这里修改了handlePasswordFocus 函数
const handlePasswordFocus = () => {
  isFocusedPassword.value = true;
  // 只有在密码框没有输入任何内容时才重置密码错误状态
  if (password.value === "") {
    passwordInvalid.value = false;
  }
};

const handlePasswordBlur = () => {
  isFocusedPassword.value = false;
  if (password.value === "") {
    passwordInvalid.value = false; // 密码框失去焦点时如果密码为空，隐藏提示
  }
};

const handlePasswordInput = () => {
  passwordTouched.value = true; // 标记密码框已经输入过
  passwordInvalid.value = false; // 当输入时重置密码错误状态
};
// 密码class input边框 切换
const CheckPassword = computed(() => {
  return passwordInvalid.value ? "input-invalid" : "input-valid";
});
// 用户名class input边框 切换
const CheckAccount = computed(() => {
  if (username.value === "") {
    usernameTouched.value = false;
    usernameTouched.value;
    return "input-valid ";
  }
  if (!validateUsername() || !usernameExists.value) {
    return "input-invalid";
  }
  if (usernameExists.value) {
    return "input-valid";
  }
});
</script>
<style scoped lang="scss">
.password-error {
  color: #ff4f4d !important;
}
.input-invalid {
  outline: 3px solid #ff4f4d !important;
  box-shadow: none !important;
}

.ColorGrey {
  color: #adadb8 !important;
}
.Classnone {
  display: none;
}
* {
  margin: 0;
  padding: 0px;
}

.login {
  height: calc(100vh - 50px);
  display: flex;
  justify-content: center;
  align-items: center;
  .login-cont {
    width: 440px;
    padding: 30px;
    background: #18181b;
    .tv-top {
      display: inline-flex;
      justify-content: center;
      align-items: center;
      h4 {
        margin: 0px;
        font-size: 1.5rem;
        font-weight: 600;
        color: #fff;
        margin-left: 20px;
      }
      .tv-svg {
        fill: #a970ff;
        width: 50px;
        height: 50px;
      }
    }
    .server-message-alert {
      border: 1px solid #e91916;
      background-color: #26262c;
      border-radius: 0.4rem;
      border-left: 0.4rem solid #e91916;
      display: flex !important;
      margin-top: 2rem !important;

      padding: 1rem 2rem 1rem 1rem !important;

      .alert-text {
        height: 30px;
        line-height: 30px;
        margin-left: 15px;
        strong {
          font-weight: 700;
          font-size: 0.9rem;
          color: #efeff1;
        }
      }
    }
    form {
      .form-group {
        display: flex;
        flex-direction: column;
        margin-top: 2rem;
        position: relative;
        label {
          margin-bottom: 7px;
          text-align: left;
          color: #f7f7f8;
          font-weight: 700;
          font-size: 14px;
        }
        input {
          width: 440px;
          height: 30px;
          padding: 0px;
          border-radius: 3px;
          border: 0px;
          box-shadow: inset 0 0 0 1px hsla(240, 8%, 88%, 0.4);
          background-color: #18181b;
          outline: none;
          text-indent: 6px;
          color: #fff;
        }
        input:hover {
          box-shadow: inset 0 0 0 2px rgba(222, 222, 227, 0.4);
        }
        input.input-valid:focus {
          outline: 3px solid #a970ff !important;
          box-shadow: none;
        }
        .password-toggle-button {
          position: absolute;
          right: 1px;
          top: 26px;
          padding: 0px 4px 1px 4px;
          :deep(svg) {
            margin-top: 4px;
          }
        }
        .password-toggle-button:hover {
          background: rgba(83, 83, 95, 0.48);
        }
        .cont-box {
          height: 0px;
          overflow: hidden;
          transition: height 0.25s linear 0.1s;
          p {
            margin: 0px;
            font-size: 12px;
            color: #ff4f4d;
            padding-top: 7px;
            text-align: left;
          }
          p.Color-Pwd {
            color: #adadb8;
          }
        }
        .cont-box.active {
          height: 23px;
          overflow: hidden;
        }
      }
      .btn-login {
        color: #adadb8;
        width: 100%;
        height: 30px;
        border: none;
        border-radius: 4px;
        font-weight: 600;
        cursor: pointer;
        background-color: rgba(83, 83, 95, 0.38);
        margin-top: 40px;
      }
      .colorpurple {
        background-color: #9147ff;
      }
      .colorpurple:hover {
        background-color: #772ce8;
      }
    }
    .border-101 {
      display: block;
      margin-bottom: 2rem;
      margin-top: 2rem;
      p {
        border-bottom: 1px solid rgba(83, 83, 95, 0.48);
        color: #adadb8;
        position: relative;
        text-align: center !important;
        span {
          background-color: #18181b;
          padding: 0 10px;
          position: relative;
          font-size: 14px;
          top: 8px;
        }
      }
    }
    .btn-register {
      width: 440px;
      height: 30px;
      line-height: 30px;
      color: #bf94ff;
      font-size: 13px;
      font-weight: 600;
      margin: 20px auto 0px;
      border-radius: 5px;
      cursor: pointer;
      a {
        text-decoration: none;
        font-size: 14px;
        color: #bf94ff;
        font-weight: 600;
      }
    }
    .btn-register:hover {
      background: #35353b;
      border-radius: 5px;
      color: #fff;
    }
    .btn-register:hover a {
      color: #efeff1;
    }
  }
}
</style>
