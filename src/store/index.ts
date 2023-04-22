import { createStore, Store, useStore as useVuexStore } from "vuex";
import login from "./login/login";
import system from "./main/system/system";
import { getPageListData } from "@/service/main/system/system";
import { IRootState, IStoreType } from "./types";

const store = createStore<IRootState>({
  state: () => {
    return {
      entireDepartment: [],
      entireRole: [],
    };
  },
  modules: {
    login,
    system,
  },
  mutations: {
    changeEntireDepartment(state, payload) {
      state.entireDepartment = payload;
    },
    changeEntireRole(state, payload) {
      state.entireRole = payload;
    },
  },
  actions: {
    async getInitialDataAction({ commit }) {
      const departmentResult = await getPageListData("/department/list", {
        offset: 0,
        size: 1000,
      });

      const { list: departmentList } = departmentResult.data;

      const roleResult = await getPageListData("/role/list", {
        offset: 0,
        size: 1000,
      });

      const { list: roleList } = roleResult.data;

      commit("changeEntireDepartment", departmentList);
      commit("changeEntireRole", roleList);
    },
  },
});

export function setUpStatus() {
  store.dispatch("login/loadingStatusAction");
  store.dispatch("getInitialDataAction");
}

export function useStore(): Store<IStoreType> {
  return useVuexStore();
}

export default store;
