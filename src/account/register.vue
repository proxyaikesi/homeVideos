<template>
  <div class="container">
    <div class="register">
      <div class="logo">
        <img
          src="../../public/cool.png"
          alt="Twitch Logo"
          class="twitch-logo"
        />
        <h2>立即加入 Twitch</h2>
      </div>
      <p>
        创建账户之后，您就可以参与浏览视频评论和关注您喜欢的创作者，并使用您自己的号发布作品。
      </p>
      <form @submit.prevent="registersubmit">
        <!-- 用户名输入框 -->
        <div class="form-group">
          <label>用户名</label>
          <input
            type="text"
            autocomplete="off"
            id="username"
            v-model="username"
            :class="inputClass"
            @focus="isFocusedUsername = true"
            @blur="isFocusedUsername = false"
            @input="checkUsername"
          />
          <div
            class="animated-text"
            :class="{
              active:
                !validateUsername() || usernameExists || isFocusedUsername,
            }"
          >
            <p
              :class="{
                Classnone:
                  validateUsername() && !isFocusedUsername && !usernameExists,
                Classgrey: validateUsername() && !usernameExists,
              }"
            >
              {{ message }}
            </p>
          </div>
        </div>

        <!-- 密码输入框 -->
        <div class="form-group">
          <label>Password</label>
          <input
            v-model="password"
            :class="passwordClass"
            @focus="handlePasswordFocus"
            @blur="handlePasswordBlur"
            :type="inputType"
          />
          <PasswordToggleButton
            @toggle="tooglepasswordVisibility"
          ></PasswordToggleButton>
          <div
            class="password-conditions"
            :class="{
              active: isActivePasswordConditions, // 满足条件后，即使失去焦点也保持显示
            }"
          >
            <div :class="{ Classnone: !isActivePasswordConditions }">
              <p>
                <img
                  src="../../public/icon_svg/wrong-icon.svg"
                  width="20"
                  height="20"
                  v-if="!passwordConditions.hasMinLength"
                  alt=""
                />
                <img src="../../public/icon_svg/yes-icon.svg" v-else alt="" />
                &nbsp;最少 8 个字符
              </p>
              <p>
                <img
                  src="../../public/icon_svg/wrong-icon.svg"
                  width="20"
                  height="20"
                  v-if="!passwordConditions.hasUpperCase"
                  alt=""
                />
                <img src="../../public/icon_svg/yes-icon.svg" v-else alt="" />
                &nbsp;一个大写字母
              </p>
              <p>
                <img
                  src="../../public/icon_svg/wrong-icon.svg"
                  width="20"
                  height="20"
                  v-if="!passwordConditions.hasNumber"
                  alt=""
                />
                <img src="../../public/icon_svg/yes-icon.svg" v-else alt="" />
                &nbsp;一个数字
              </p>
              <p>
                <img
                  src="../../public/icon_svg/wrong-icon.svg"
                  width="20"
                  height="20"
                  v-if="!passwordConditions.hasSpecialChar"
                  alt=""
                />
                <img src="../../public/icon_svg/yes-icon.svg" v-else alt="" />
                &nbsp;一个特殊字符
              </p>
              <p>
                <img
                  src="../../public/icon_svg/wrong-icon.svg"
                  width="20"
                  height="20"
                  v-if="!passwordConditions.notContainUsername"
                  alt=""
                />
                <img src="../../public/icon_svg/yes-icon.svg" v-else alt="" />
                &nbsp;不能包含您的用户名
              </p>
              <p>
                <img
                  src="../../public/icon_svg/wrong-icon.svg"
                  width="20"
                  height="20"
                  v-if="!passwordConditions.notContainTwitch"
                  alt=""
                />
                <img src="../../public/icon_svg/yes-icon.svg" v-else alt="" />
                &nbsp;不能包含“Twitch“
              </p>
              <p>
                <img
                  src="../../public/icon_svg/wrong-icon.svg"
                  width="20"
                  height="20"
                  v-if="!passwordConditions.notContainRepeatedOrSequentialChars"
                  alt=""
                />
                <img src="../../public/icon_svg/yes-icon.svg" v-else alt="" />
                &nbsp;不能包含重复或连续字符 (“aaa”或“123”)
              </p>
            </div>
          </div>
        </div>
        <!-- 确认密码输入框 -->
        <div class="form-group">
          <label>Confirm Password</label>
          <input
            :type="inputTypeConfirm"
            v-model="ConfirmPassword"
            :class="ConfirmPasswordClass"
            @focus="isConfirmPassword = true"
            @blur="isConfirmPassword = false"
          />
          <PasswordToggleButton
            @toggle="togglePasswordConfirmVisibility"
          ></PasswordToggleButton>
          <div
            class="ConfirmPassword-conditions"
            :class="{ active: isConfirmPassword || isConfirmDiv }"
          >
            <p
              :class="{
                active: isConfirmDiv,
                Classnone: !isConfirmPassword && !isConfirmDiv,
              }"
            >
              {{ ConfirmMessage }}
            </p>
          </div>
        </div>

        <p>Twitch 可能会拨打您的电话，或发送有关您账户相关信息的短信。</p>
        <p>
          点击注册，即表示您同意 Twitch 的服务条款，并知悉我们适用的隐私声明。
        </p>
        <br />
        <!-- 注册 -->
        <button :class="{ colorpurple: isFormValid }">注册</button>
        <!-- 或 -->
        <div class="border-101">
          <p><span>或</span></p>
        </div>
        <!-- 去登录 -->
        <div class="to-login">
          <router-link to="/login">已注册? &nbsp;去登录</router-link>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ElMessage } from "element-plus";
import { ref, computed, watch, reactive } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import PasswordToggleButton from "../components/PasswordToggleButton.vue";
const router = useRouter();
const ConfirmPassword = ref("");
const isFocusedUsername = ref(false);
const isFocusedPassword = ref(false);
const isConfirmPassword = ref(false);
const isConfirmDiv = ref(false);
const username = ref("");
const password = ref("");
const usernameExists = ref(false);
const message = ref("");
const ConfirmMessage = ref("");
const hasInteractedWithPassword = ref(false);
const passwordConditions = reactive({
  hasMinLength: false,
  hasUpperCase: false,
  hasNumber: false,
  hasSpecialChar: false,
  notContainUsername: false,
  notContainTwitch: false,
  notContainRepeatedOrSequentialChars: false,
});
const isPasswordVisible = ref(false);
const isPasswordConfirm = ref(false);
const tooglepasswordVisibility = (value) => {
  isPasswordVisible.value = value;
};
const togglePasswordConfirmVisibility = (value) => {
  isPasswordConfirm.value = value;
};
const inputType = computed(() => {
  return isPasswordVisible.value ? "text" : "password";
});
const inputTypeConfirm = computed(() => {
  return isPasswordConfirm.value ? "text" : "password";
});
const isFormValid = computed(() => {
  return (
    username.value !== "" &&
    password.value !== "" &&
    validateUsername() &&
    !usernameExists.value &&
    allPasswordConditionsMet.value &&
    password.value === ConfirmPassword.value
  );
});
const validatePassword = () => {
  passwordConditions.hasMinLength = password.value.length >= 8;
  passwordConditions.hasUpperCase = /[A-Z]/.test(password.value);
  passwordConditions.hasNumber = /\d/.test(password.value);
  passwordConditions.hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(
    password.value
  );
  passwordConditions.notContainUsername = !password.value.includes(
    username.value
  );
  passwordConditions.notContainTwitch = !password.value
    .toLowerCase()
    .includes("twitch");
  passwordConditions.notContainRepeatedOrSequentialChars =
    !/(.)\1{2,}/.test(password.value) &&
    !/(012|123|234|345|456|567|678|789|890)/.test(password.value);
};
watch(validatePassword);
const allPasswordConditionsMet = computed(() => {
  return (
    passwordConditions.hasMinLength &&
    passwordConditions.hasUpperCase &&
    passwordConditions.hasNumber &&
    passwordConditions.hasSpecialChar &&
    passwordConditions.notContainUsername &&
    passwordConditions.notContainTwitch &&
    passwordConditions.notContainRepeatedOrSequentialChars
  );
});
const validateUsername = () => {
  if (username.value == "") {
    message.value = "这是您对外注册显示的账号，成功后不可更改账号名称";
    return true;
  }
  if (!/^[a-zA-Z0-9]*$/.test(username.value)) {
    message.value = "*用户名只能包含字母、数字字符。";
    return false;
  }
  if (username.value.length < 4 || username.value.length > 25) {
    message.value = "*用户名必须介于 4 到 25 个字符之间。";
    return false;
  }
  return true;
};

const checkUsername = async () => {
  if (!validateUsername()) {
    return;
  }
  try {
    const response = await axios.post("http://localhost:3000/register", {
      username: username.value,
      type: "check",
    });
    usernameExists.value = response.data.exists;
    if (usernameExists.value) {
      message.value = "*此用户名不可用。";
    } else {
      message.value = "这是您对外注册显示的账号，成功后不可更改账号名称";
    }
  } catch (error) {
    console.error("Error checking username:", error.response);
  }
};

const registersubmit = async () => {
  if (username.value === "" || password.value === "") {
    ElMessage.error("请填写完所有信息再提交。");
    return;
  }
  // 2. 检查用户名是否有效
  if (!validateUsername()) {
    console.log("请正确填写用户名。");
    ElMessage.error("请正确填写用户名。");
    message.value = "请正确填写用户名。";
    return;
  }
  if (usernameExists.value) {
    ElMessage.error("用户名已存在，请选择另一个用户名。");
    return;
  }
  // 3. 检查密码是否满足条件
  if (!allPasswordConditionsMet.value) {
    ElMessage.error("请正确填写密码。");
    return;
  }
  if (password.value !== ConfirmPassword.value) {
    ElMessage.error("密码不匹配");
    return;
  }
  try {
    if (usernameExists.value) {
      ElMessage.error("用户名已存在，请选择另一个用户名。");
      return;
    }

    const response = await axios.post("http://localhost:3000/register", {
      username: username.value,
      password: password.value,
      type: "register",
    });
    if (response.data) {
      ElMessage.success("注册成功");
      // 注册成功，2秒后跳转到登录页面
      setTimeout(() => {
        router.push("/login");
      }, 2000);
    } else {
      console.error("注册失败", response.data.message);
    }
  } catch (err) {
    console.log(err);
  }
};

const inputClass = computed(() => {
  if (username.value && (!validateUsername() || usernameExists.value)) {
    return "input-invalid";
  } else if (username.value && validateUsername()) {
    return "input-valid";
  } else if (isFocusedUsername.value) {
    message.value = "这是您对外注册显示的账号，成功后不可更改账号名称";
    return "input-valid";
  } else {
    return "";
  }
});
const passwordClass = computed(() => {
  if (!hasInteractedWithPassword.value) {
    return "";
  } else if (!password.value || !allPasswordConditionsMet.value) {
    return "input-invalid";
  } else {
    return "input-valid";
  }
});
const ConfirmPasswordClass = computed(() => {
  if (ConfirmPassword.value == "") {
    isConfirmDiv.value = false;
    ConfirmMessage.value = "*请再次确认密码";
    return "input-valid";
  }
  if (password.value !== ConfirmPassword.value) {
    ConfirmMessage.value = "*密码不正确";
    isConfirmDiv.value = true;
    return "input-invalid";
  } else {
    ConfirmMessage.value = "*密码正确";
    isConfirmDiv.value = false;
    return "input-valid";
  }
});
const isActivePasswordConditions = computed(() => {
  return (
    hasInteractedWithPassword.value &&
    (isFocusedPassword.value || !allPasswordConditionsMet.value)
  );
});

const handlePasswordFocus = () => {
  isFocusedPassword.value = true;
  hasInteractedWithPassword.value = true;
};

const handlePasswordBlur = () => {
  isFocusedPassword.value = false;
};
</script>
<style scoped lang="scss">
.input-invalid {
  outline: 3px solid #ff4f4d !important;
  box-shadow: none !important;
}
.container {
  height: calc(100vh - 50px);
  display: flex;
  justify-content: center;
  align-items: center;
  .register {
    width: 440px;
    padding: 30px;
    background: #18181b;
    .logo {
      display: flex;
      align-items: center;
      justify-content: center;
      .twitch-logo {
        width: 80px;
        height: 80px;
      }
      h2 {
        margin-left: 1rem;
        color: #efeff1;
      }
    }
    p {
      text-align: left;
      color: #adadb8;
      font-size: 13px;
    }
    form {
      .form-group {
        display: flex;
        flex-direction: column;
        margin-top: 2rem;
        label {
          margin-bottom: 7px;
          text-align: left;
          color: #f7f7f8;
          font-weight: 700;
          font-size: 14px;
        }
        input {
          width: 100%;
          height: 28px;
          background: #18181b;
          outline: none;
          border: none;
          font-size: 13px;
          color: #efeff1;
          border-radius: 3px;
          text-indent: 6px;
          box-shadow: inset 0 0 0 1px rgba(222, 222, 227, 0.4);
        }
        .input-valid:focus {
          outline: 3px solid #a970ff !important; /* 这里使用 `!important` 覆盖默认样式 */
        }
        .Classnone {
          display: none;
        }
        .animated-text {
          height: 0px;
          overflow: hidden;
          transition: height 0.25s linear 0.1s;
          p {
            margin: 0px;
            font-size: 12px;
            color: #ff8280;
            padding-top: 7px;
          }
          .Classgrey {
            color: #adadb8;
          }
        }
        .animated-text.active {
          height: 23px;
          overflow: hidden;
        }
        .password-conditions {
          height: 0px;
          overflow: hidden;
          transition: height 0.25s linear 0.1s;

          div {
            p {
              display: flex;
              align-items: center;
              margin: 6px 0;
              color: #adadb8;
            }
            p.valid {
              color: #adadb8;
            }
          }
        }
        .password-toggle-button {
          position: absolute;
          right: -3px;
          top: 24px;
          padding: 0px 4px 1px 4px;
          :deep(svg) {
            margin-top: 4px;
          }
        }
        .password-toggle-button:hover {
          background: rgba(83, 83, 95, 0.48);
        }
        .password-conditions.active {
          height: 190px;
          margin-top: 5px;
          transition: height 0.25s linear 0.1s;
        }
        .ConfirmPassword-conditions {
          height: 0;
          overflow: hidden;
          transition: height 0.25s linear 0.1s;
          p {
            margin: 0;
            padding-top: 9px;
            color: #adadb8;
          }
          p.active {
            color: #ff8280;
          }
        }
        .ConfirmPassword-conditions.active {
          height: 30px;
          transition: height 0.25s linear 0.1s;
        }
      }
      .form-group:nth-of-type(n + 2) {
        position: relative;
      }
      button {
        color: #adadb8;
        width: 100%;
        height: 30px;
        border: none;
        border-radius: 4px;
        font-weight: 600;
        cursor: pointer;
        background-color: rgba(83, 83, 95, 0.38);
      }
      .colorpurple {
        background-color: #9147ff;
      }
      .colorpurple:hover {
        background-color: #772ce8;
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
            top: 8px;
          }
        }
      }
      .to-login {
        width: 100%;
        height: 30px;
        line-height: 30px;
        text-decoration: none;

        border-radius: 4px;
        margin-top: 18px;
        cursor: pointer;
        a {
          text-decoration: none;
          font-size: 14px;
          color: #bf94ff;
          font-weight: 600;
        }
      }
      .to-login:hover {
        background-color: rgba(83, 83, 95, 0.48);
      }
      .to-login:hover a {
        color: #efeff1;
      }
    }
  }
}
</style>
