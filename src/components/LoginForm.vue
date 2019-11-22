<template>
  <div class="login-form">
    <h5 class="text-center">Chat Login</h5>
    <hr />
    <b-form @submit.prevent="onSubmit">
      <!-- 
Vue.js 为 v-on 提供了事件修饰符。之前提过，修饰符是由点开头的指令后缀来表示的。

.stop阻止单击事件继续传播
.prevent提交事件不再重载页面
.capture添加事件监听器时使用事件捕获模式  即内部元素触发的事件先在此处理，然后才交由内部元素进行处理
.self即事件不是从内部元素触发的 
.once点击事件将只会触发一次
.passive滚动事件的默认行为 (即滚动行为) 将会立即触发  而不会等待 `onScroll` 完成  这其中包含 `event.preventDefault()

       -->
      <b-alert variant="danger" :show="hasError">{{ error }}</b-alert>
      <!-- v-if 是“真正”的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建。

v-if 也是惰性的：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。

相比之下，v-show 就简单得多——不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 进行切换。

一般来说，v-if 有更高的切换开销，而 v-show 有更高的初始渲染开销（相当于css 切换display）。因此，如果需要非常频繁地切换，则使用 v-show 较好；如果在运行时条件很少改变，则使用 v-if 较好。 -->
      <b-form-group id="userInputGroup" label="User Name" label-for="userInput">
        <b-form-input
          id="userInput"
          type="text"
          placeholder="Enter user name"
          v-model="userId"
          autocomplete="off"
          :disabled="loading"
          required
        ></b-form-input>
      </b-form-group>
      <b-button
        type="submit"
        variant="primary"
        class="ld-ext-right"
        v-bind:class="{ running: loading }"
        :disabled="isValid"
      >
        <!-- v-bind:class 一个对象，以动态地切换 class：
        ： 是v-bind 的缩写
        v-model 双向数据绑定-->
        Login
        <div class="ld ld-ring ld-spin"></div>
      </b-button>
    </b-form>
  </div>
</template>

<script>
// 局部注册组件-如果你通过 Babel 和 webpack 使用 ES2015 模块，那么代码看起来更像：
import { mapState, mapGetters, mapActions } from "vuex";
export default {
  name: "login-form",
  data() {
    return { userId: "" };
  }, //一个组件的data选项必须是一个函数 data:function(){}
  computed: {
    isValid: function() {
      const result = this.userId.length < 3;
      return result ? result : this.loading;
    },
    ...mapState(["loading", "error"]),
    ...mapGetters(["hasError"])
  },
  methods: {
    ...mapActions(["login"]),
    async onSubmit() {
      //async表示函数里有异步操作，await表示紧跟在后面的表达式需要等待结果。ES2017 标准引入了 async 函数，使得异步操作变得更加方便。
      // async函数完全可以看作多个异步操作，包装成的一个 Promise 对象，而await命令就是内部then命令的语法糖。
      const result = await this.login(this.userId);
      if (result) {
        this.$router.push("chat"); // 调用 编程式 路由
      }
    }
  }
};
</script>
