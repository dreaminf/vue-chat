<template>
  <b-navbar id="chat-navbar" toggleable="md" type="dark" variant="info">
    <b-navbar-brand href="#">
      Vue Chat
    </b-navbar-brand>
    <b-navbar-nav class="ml-auto">
      <b-nav-text>{{ user.name }}|</b-nav-text>
      <b-nav-item href="#" @click="onLogout" active>Logout</b-nav-item>
      <!-- v-on 缩写成@  事件调用-->
    </b-navbar-nav>
  </b-navbar>
</template>

<script>
import { mapState, mapActions, mapMutations } from "vuex";
// mapState 辅助函数 帮助我们生成计算属性   当映射的计算属性的名称与 state 的子节点名称相同时，我们也可以给 mapState 传一个字符串数组。
export default {
  name: "ChatNavBar",
  computed: {
    // 计算属性
    ...mapState(["user", "reconnect"])
    // user 映射this.user  为store.state.user
    // ... 为对象展开运算符 将此对象混入到外部对象中
  },

  methods: {
    ...mapActions(["logout", "login"]),
    ...mapMutations(["setReconnect"]),
    onLogout() {
      this.$router.push({ path: "/" });
      this.logout();
    },
    unload() {
      if (this.user.username) {
        this.setReconnect(true);
      }
    },
    mounted() {
      window.addEventListener("beforeunload", this.unload);
      if (this.reconnect) {
        this.login(this.user.username);
      }
    }
  }
};
</script>

<style>
#chat-navbar {
  margin-bottom: 15px;
}
</style>
