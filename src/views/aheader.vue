<template>
  <!-- 头部导航栏 -->
  <header class="header-layout">
    <!-- left浏览 -->
    <div class="left">
      <svg
        overflow="visible"
        width="40px"
        height="40px"
        version="1.1"
        viewBox="0 0 40 40"
        x="0px"
        y="0px"
        fill="currentcolor"
        @mouseenter="onMouseEnter"
        @mouseleave="onMouseLeave"
      >
        <g>
          <polygon
            fill="#a970ff"
            points="13 8 8 13 8 31 14 31 14 36 19 31 23 31 32 22 32 8"
            :style="polygonStyle"
          >
            <animate
              dur="150ms"
              begin="indefinite"
              fill="freeze"
              calcMode="spline"
              keyTimes="0; 1"
              keySplines="0.25 0.1 0.25 1"
              attributeName="points"
              from="13 8 8 13 8 31 14 31 14 36 19 31 23 31 32 22 32 8"
              to="16 5 8 13 8 31 14 31 14 36 19 31 23 31 35 19 35 5"
            ></animate>
            <animate
              dur="250ms"
              begin="indefinite"
              fill="freeze"
              calcMode="spline"
              keyTimes="0; 1"
              keySplines="0.25 0.1 0.25 1"
              attributeName="points"
              from="16 5 8 13 8 31 14 31 14 36 19 31 23 31 35 19 35 5"
              to="13 8 8 13 8 31 14 31 14 36 19 31 23 31 32 22 32 8"
            ></animate>
            <animate
              dur="50ms"
              begin="indefinite"
              fill="freeze"
              calcMode="spline"
              keyTimes="0; 1"
              keySplines="0.25 0.1 0.25 1"
              attributeName="points"
              to="13 8 8 13 8 31 14 31 14 36 19 31 23 31 32 22 32 8"
              from="16 5 8 13 8 31 14 31 14 36 19 31 23 31 35 19 35 5"
            ></animate>
            <animate
              dur="75ms"
              begin="indefinite"
              fill="freeze"
              calcMode="spline"
              keyTimes="0; 1"
              keySplines="0.25 0.1 0.25 1"
              attributeName="points"
              to="16 5 8 13 8 31 14 31 14 36 19 31 23 31 35 19 35 5"
              from="13 8 8 13 8 31 14 31 14 36 19 31 23 31 32 22 32 8"
            ></animate>
          </polygon>
          <polygon
            points="26 25 30 21 30 10 14 10 14 25 18 25 18 29 22 25"
            class="ScFace-sc-mx5axi-4 fDFkyX"
            fill="#ffffff"
            :style="polygonStyle"
          >
            <animateTransform
              dur="150ms"
              begin="indefinite"
              fill="freeze"
              calcMode="spline"
              keyTimes="0; 1"
              keySplines="0.25 0.1 0.25 1"
              attributeName="transform"
              type="translate"
              from="0 0"
              to="3 -3"
            ></animateTransform>
            <animateTransform
              dur="250ms"
              begin="indefinite"
              fill="freeze"
              calcMode="spline"
              keyTimes="0; 1"
              keySplines="0.25 0.1 0.25 1"
              attributeName="transform"
              type="translate"
              from="3 -3"
              to="0 0"
            ></animateTransform>
            <animateTransform
              dur="50ms"
              begin="indefinite"
              fill="freeze"
              calcMode="spline"
              keyTimes="0; 1"
              keySplines="0.25 0.1 0.25 1"
              attributeName="transform"
              type="translate"
              from="3 -3"
              to="0 0"
            ></animateTransform>
            <animateTransform
              dur="75ms"
              begin="indefinite"
              fill="freeze"
              calcMode="spline"
              keyTimes="0; 1"
              keySplines="0.25 0.1 0.25 1"
              attributeName="transform"
              type="translate"
              from="0 0"
              to="3 -3"
            ></animateTransform>
          </polygon>
          <g class="ScEyes-sc-mx5axi-5 fAMMxB">
            <path
              d="M20,14 L22,14 L22,20 L20,20 L20,14 Z M27,14 L27,20 L25,20 L25,14 L27,14 Z"
              class="ScBody-sc-mx5axi-3 dosCbL"
              fill="#a970ff"
              :style="polygonStyle"
            >
              <animateTransform
                dur="150ms"
                begin="indefinite"
                fill="freeze"
                calcMode="spline"
                keyTimes="0; 1"
                keySplines="0.25 0.1 0.25 1"
                attributeName="transform"
                type="translate"
                from="0 0"
                to="3 -3"
              ></animateTransform>
              <animateTransform
                dur="250ms"
                begin="indefinite"
                fill="freeze"
                calcMode="spline"
                keyTimes="0; 1"
                keySplines="0.25 0.1 0.25 1"
                attributeName="transform"
                type="translate"
                from="3 -3"
                to="0 0"
              ></animateTransform>
              <animateTransform
                dur="50ms"
                begin="indefinite"
                fill="freeze"
                calcMode="spline"
                keyTimes="0; 1"
                keySplines="0.25 0.1 0.25 1"
                attributeName="transform"
                type="translate"
                from="3 -3"
                to="0 0"
              ></animateTransform>
              <animateTransform
                dur="75ms"
                begin="indefinite"
                fill="freeze"
                calcMode="spline"
                keyTimes="0; 1"
                keySplines="0.25 0.1 0.25 1"
                attributeName="transform"
                type="translate"
                from="0 0"
                to="3 -3"
              ></animateTransform>
            </path>
          </g>
        </g>
      </svg>
      <router-link to="/index">浏览</router-link>
      <router-link to="/introduction">隐私中心</router-link>
      <img src="/icon_svg/other.svg" alt="" />
    </div>
    <!-- 搜索居中 -->
    <div class="center">
      <input type="text" placeholder="Search" class="searchipt" />
      <a class="NavSearch"
        ><img class="searchall" src="/search.png" alt=""
      /></a>
    </div>
    <!-- 用户right -->
    <div class="right">
      <!-- 未登录 -->
      <div class="user-show" v-if="!isAuthenticated">
        <router-link to="/login">登录</router-link>
        <router-link to="/register" class="Special-Purple">注册</router-link>
        <img class="user-profile" src="/imguser.png" />
      </div>
      <!-- 已登录显示区域 -->
      <div class="Login-display" v-if="user">
        <!-- 免费体验无广告观赏 -->
        <HoverBox customClass="different-class">
          <template v-slot:link-content>
            <img src="/icon_svg/liveBroadcast-icon.svg" class="icon" alt="" />
            <div>免费体验无广告观赏</div>
          </template>
          <div class="turbo-dropdown-logo">
            <img src="/icon_svg/turbo-dropdown-logo.svg" alt="" />
            <p class="">免费体验无广告观赏</p>
            <p>
              观众抱着各种各样的理由来到这里,只有独具慧眼,才能发现只属于您的忠实观众。
            </p>
            <p>创作者</p>
            <img src="/bleedingheart.png" alt="" />
          </div>
        </HoverBox>
        <!-- 闪电收藏 -->
        <HoverBox customClass="different-class">
          <template v-slot:link-content>
            <img src="/icon_svg/collect-icon.svg" class="icon" alt="" />

            <div>快捷访问</div>
          </template>
          <div class="quick_access">
            <div class="computer-img">
              <img src="/proud-highlight.gif" alt="" />
              <img src="/monitor-happy.png" alt="" />
            </div>
            <p>添加到电脑桌面</p>
            <p>下次可以在桌面快捷访问</p>
            <div class="Favorites">
              <img src="/icon_svg/Favorites-icon.svg" alt="" />
              <span>「ctrl+D」添加至收藏夹</span>
            </div>
          </div>
        </HoverBox>
        <!-- 消息通知 -->
        <HoverBox customClass="different-class">
          <template v-slot:link-content>
            <img src="/icon_svg/contribute_icon.svg" class="icon" alt="" />
            <div>通知</div>
          </template>
          <div class="message">
            <img src="/icon_svg/no_message.svg" alt="" />
            <p>暂无内容</p>
          </div>
        </HoverBox>
        <!-- 发布作品 -->
        <HoverBox customClass="different-class">
          <template v-slot:link-content>
            <!-- <img src="/icon_svg/contribute_icon.svg" class="icon" alt="" /> -->
            <img src="/icon_svg/PublishVideo-icon.svg" class="icon" alt="" />
            <div>发布</div>
          </template>
          <div class="Publish_works">
            <!-- <img src="/icon_svg/no_message.svg" alt="" /> -->
          </div>
        </HoverBox>
        <!-- 用户头像 -->
        <HoverBox :text="user.user" customClass="User-picture">
          <template v-slot:link-content>
            <span v-if="isTextLink">Text Link</span>
            <img
              class="head-scale"
              v-else
              :src="'http://localhost:8080' + user.avatar"
              alt=""
            />
          </template>
          <div class="header">
            <img
              class="avatar"
              :src="'http://localhost:8080' + user.avatar"
              alt="Avatar"
            />
            <div class="user-info">
              <div class="username">菲律宾人志 吴京出手</div>
              <div class="stats">
                <span>关注 68</span>
                <span class="divider"></span>
                <span>粉丝 33</span>
              </div>
            </div>
          </div>
          <div class="menu">
            <div class="menu-item">
              <img
                src="../../public/icon_svg/My_favorite.svg"
                class="icon"
                alt=""
              />
              <span>我的喜欢</span>
              <span class="count">1578</span>
              <img
                src="../../public/icon_svg/big.svg"
                width="20"
                class="arrow"
                alt=""
              />
            </div>
            <div class="menu-item">
              <img
                src="../../public/icon_svg/My_Collection.svg"
                class="icon"
                alt=""
              />
              <span>我的收藏</span>
              <span class="count">109</span>
              <img
                src="../../public/icon_svg/big.svg"
                width="20"
                class="arrow"
                alt=""
              />
            </div>
            <div class="menu-item">
              <img
                src="../../public/icon_svg/Viewing_History.svg"
                class="icon"
                alt=""
              />
              <span>观看历史</span>
              <span class="count">30天内</span>
              <img
                src="../../public/icon_svg/big.svg"
                width="20"
                class="arrow"
                alt=""
              />
            </div>
            <div class="menu-item">
              <img
                src="../../public/icon_svg/See_later.svg"
                class="icon"
                alt=""
              />
              <span>稍后再看</span>
              <span class="count">2</span>
              <img
                src="../../public/icon_svg/big.svg"
                width="20"
                class="arrow"
                alt=""
              />
            </div>
            <div class="menu-item">
              <img
                src="../../public/icon_svg/My_work.svg"
                class="icon"
                alt=""
              />

              <span>我的作品</span>
              <span class="count">0</span>
              <img src="../../public/icon_svg/big.svg" class="arrow" alt="" />
            </div>
            <div class="menu-item" @click="logout">
              <img src="../../public/icon_svg/log_out.svg" alt="" />
              <span>退出登录</span>
            </div>
          </div>
        </HoverBox>
      </div>
    </div>
  </header>
</template>
<script>
import { computed, onMounted, ref, reactive } from "vue";
import { useStore } from "vuex";
import HoverBox from "../components/HoverBox.vue";

import axios from "axios";
export default {
  components: {
    HoverBox,
  },
  setup() {
    const store = useStore();
    const isAuthenticated = computed(() => store.getters.isAuthenticated);
    const user = computed(() => store.getters.user);
    const loading = ref(true);
    const error = ref(null);
    const logout = async () => {
      await store.dispatch("logout");
      window.location.reload();
    };
    const polygonStyle = ref({ transform: "translate(0px, 0px)" });
    // 鼠标移入事件处理器
    const onMouseEnter = () => {
      polygonStyle.value.transform = "translate(3px, -3px)";
    };
    // 鼠标移出事件处理器
    const onMouseLeave = () => {
      polygonStyle.value.transform = "translate(0px, 0px)";
    };
    onMounted(async () => {
      if (isAuthenticated.value) {
        try {
          const token = localStorage.getItem("token");
          const response = await axios.get("http://localhost:3000/user", {
            headers: {
              Authorization: `Bearer ${token}`, // 发送包含令牌的请求头
            },
          });
          store.commit("setUser", response.data); // 将用户信息存储在 Vuex 中
          loading.value = false;
        } catch (err) {
          console.error("获取用户信息失败", err);
          error.value = err.message || "未知错误";
          loading.value = false;
        }
      } else {
        loading.value = false;
      }
    });
    return {
      isAuthenticated,
      user,
      logout,
      onMouseEnter,
      onMouseLeave,
      polygonStyle,
    };
  },
};
</script>

<style scoped lang="scss">
polygon {
  stroke-width: 2;
  transition: transform 0.2s ease-in-out; /* 添加过渡效果 */
}
.header-layout {
  display: flex;
  padding: 0 20px;
  background-color: #18181b;
  height: 50px;
  .left {
    flex-shrink: 1 !important;
    width: 100% !important;
    display: flex !important;

    svg {
      margin-top: 5px;
      cursor: pointer;
    }
    img {
      width: 22px;
      padding: 0.3rem;
    }
    a {
      width: 80px;
      height: 50px;
      color: #bf94ff;
      text-align: center;
      font-family: --font-display;
      font-size: 1.2rem;
      font-weight: 600;
      text-decoration: none;
      display: block;
      line-height: 50px;
    }
  }
  .right {
    .Login-display {
      display: flex;
      align-items: center;
      justify-content: center;
      .turbo-dropdown-logo {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: -10px;
        p:first-of-type {
          font-size: 20px;
          font-weight: 600;
          color: #efeff1;
        }
        p:nth-of-type(2) {
          font-size: 14px;
          font-weight: 600;
          color: #efeff1;
        }
        p:nth-of-type(3) {
          font-size: 26px;
          font-weight: 600;
          color: #efeff1;
        }
      }
      .message {
        p {
          color: rgba(255, 255, 255, 0.9);
          font-weight: 800;
        }
      }
      .quick_access {
        .computer-img {
          position: relative;
          img:first-of-type {
            position: absolute;
            width: 150px;
          }
        }
        p:first-of-type {
          color: rgba(255, 255, 255, 1);
          font-weight: bold;
          margin: 10px 0 5px;
        }
        p:nth-of-type(2) {
          color: rgba(255, 255, 255, 0.6);
          font-size: 12px;
          margin: 0;
        }
        .Favorites {
          height: 60px;
          background-color: #872acd;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 20px -10px -10px;
          span {
            color: #efefef;
            font-size: 14px;
            font-weight: 600;
          }
        }
      }
      .navbar {
        a {
          .head-scale {
            width: 32px;
            height: 32px;
            border-radius: 50%;
            &:hover {
              transform: scale(1.1);
            }
          }
          div {
            font-size: 14px;
            font-weight: 600;
            align-items: center;
            display: flex;
            color: #efeff1;
          }
          img.icon {
            padding-right: 4px;
          }
        }
        .dropdown {
          .dropdown-cont {
            .header {
              display: flex;
              align-items: center;
              margin-bottom: 20px;
              .avatar {
                width: 50px;
                height: 50px;
                border-radius: 50%;
                margin-right: 10px;
              }
              .user-info {
                .username {
                  font-size: 16px;
                  font-weight: bold;
                  color: #efeff1;
                }
                .stats {
                  font-size: 14px;
                  color: #888;
                  margin-top: 5px;
                  span {
                    margin-right: 10px;
                    color: rgba(255, 255, 255, 0.6);
                    cursor: pointer;
                    font-weight: 600;
                    &:hover {
                      color: rgba(255, 255, 255, 1);
                    }
                  }
                  .divider {
                    height: 10px;
                    display: inline-block;
                    border-right: 1px solid rgba(255, 255, 255, 0.6);
                  }
                }
              }
            }
            .menu {
              .menu-item {
                display: flex;
                align-items: center;
                padding: 5px 0;
                margin: 5px 0;
                cursor: pointer;
                background-color: rgba(83, 83, 95, 0.48);
                border-radius: 7px;

                &:hover {
                  background-color: rgba(65, 66, 76, 1);
                }
                img.icon {
                  margin: 0 7px;
                }
                img.arrow {
                  width: 20px;
                  margin-right: 5px;
                }
                span:first-of-type {
                  margin-right: auto;
                }
                span:nth-of-type(2) {
                  margin-right: 10px;
                }
                span {
                  color: #efeff1;
                  font-weight: 600;
                  font-size: 15px;
                }
              }
            }
          }
        }
      }
    }
  }
  .right {
    flex-shrink: 1 !important;
    width: 100% !important;
    display: flex !important;
    justify-content: flex-end !important;
    .user-show {
      display: flex;
      position: relative;
      align-items: center;
      a.Special-Purple {
        color: #ffffff;
        background: #9147ff;
      }
      a.Special-Purple:hover {
        background: #772ce8;
      }
      img {
        width: 32px;
        height: 32px;
        border-radius: 50%;
      }
      img.user-profile {
        cursor: pointer;
      }
      img.user-profile:hover {
        background: rgba(83, 83, 95, 0.48);
        width: 32px;
        height: 32px;
        border-radius: 5px;
      }
      a {
        font-weight: 600;
        text-decoration: none;
        display: block;
        height: 32px;
        background: rgba(83, 83, 95, 0.38);
        color: #efeff1;
        border-radius: 5px;
        font-size: 15px;
        line-height: 32px;
        padding: 0 15px;
        margin-right: 22px;
        cursor: pointer;
      }
      a:hover {
        background: rgba(83, 83, 95, 0.48);
      }
    }
  }
  .center {
    flex-shrink: 1 !important;
    width: 100% !important;
    display: flex !important;
    justify-content: center !important;
    input {
      width: 356px;
      height: 32px;
      padding: 0px;
      color: #fff;
      outline: none;
      margin-top: 6px;
      background-color: #18181b;
      border: 2px solid #333;
      border-top-left-radius: 6px;
      border-bottom-left-radius: 6px;
      text-indent: 10px;
    }
    a {
      width: 34px;
      height: 36px;
      line-height: 36px;
      background-color: #2f2f35;
      border-top-right-radius: 6px;
      border-bottom-right-radius: 6px;
      margin-top: 7px;
      img {
        width: 25px;
        height: 25px;
        padding: 4px 1px;
        display: inline-block;
      }
    }
  }
}
</style>
