//store action 管理
import chatkit from "../chatkit";

function handleError(commit, error) {
  const message = error.message || error.info.error_description;
  commit("setError", message);
}
// Vuex 的状态存储是响应式的。当 Vue 组件从 store 中读取状态的时候，若 store 中的状态发生变化，那么相应的组件也会相应地得到高效更新。

// 你不能直接改变 store 中的状态。改变 store 中的状态的唯一途径就是显式地提交 (commit) mutation。

export default {
  async login({ commit, state }, userId) {
    try {
      commit("setError", "");
      commit("setLoading", true);
      const currentUser = await chatkit.connectUser(userId);
      commit("setUser", {
        username: currentUser.id,
        name: currentUser.name
      });
      const rooms = currentUser.rooms.map(room => ({
        id: room.id,
        name: room.name
      }));
      commit("setRooms", rooms);
      const activeRoom = state.activeRoom || rooms[0];
      commit("setActiveRoom", {
        id: activeRoom.id,
        name: activeRoom.name
      });
      await chatkit.subscribeToRoom(activeRoom.id);
      console.log(state.user);
      return true;
      // commit("setRecontent", false);
    } catch (error) {
      handleError(commit, error);
    } finally {
      commit("setLoading", false);
    }
  },
  async changeRoom({ commit }, roomId) {
    try {
      const { id, name } = await chatkit.subscribeToRoom(roomId);
      commit("setActiveRoom", { id, name });
    } catch (error) {
      handleError(commit, error);
    }
  },
  async sendMessage({ commit }, message) {
    try {
      commit("setError", "");
      commit("setSending", true);
      const messageId = await chatkit.sendMessage(message);
      return messageId;
    } catch (error) {
      handleError(commit, error);
    } finally {
      commit("setSending", false);
    }
  },
  async logout({ commit }) {
    commit("reset");
    chatkit.disconnectUser();
    window.localStorage.clear();
  }
};
