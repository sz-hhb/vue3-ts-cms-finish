import { IRootState } from "@/store/types";
import { Module } from "vuex";
import { ISystemState } from "./types";
import {
  getPageListData,
  deletePageData,
  createPageData,
  editPageData,
} from "@/service/main/system/system";
import { firstLetterToUppercase } from "@/utils/format";

const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  state: () => {
    return {
      usersCount: 0,
      usersList: [],
      roleCount: 0,
      roleList: [],
      goodsCount: 0,
      goodsList: [],
      menuCount: 0,
      menuList: [],
    };
  },
  getters: {
    pageDataListGetter(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}List`];
      };
    },
    pageListCountGetter(state) {
      return (pageName: string) => {
        return (state as any)[`${pageName}Count`];
      };
    },
  },
  mutations: {
    changeUsersList(state, payload: any[]) {
      state.usersList = payload;
    },
    changeUsersCount(state, payload: number) {
      state.usersCount = payload;
    },
    changeRoleList(state, payload: any[]) {
      state.roleList = payload;
    },
    changeRoleCount(state, payload: number) {
      state.roleCount = payload;
    },
    changeGoodsList(state, payload: any[]) {
      state.goodsList = payload;
    },
    changeGoodsCount(state, payload: number) {
      state.goodsCount = payload;
    },
    changeMenuList(state, payload: any[]) {
      state.menuList = payload;
    },
    changeMenuCount(state, payload: number) {
      state.menuCount = payload;
    },
  },
  actions: {
    async getPageListActon({ commit }, payload: any) {
      const pageName = payload.pageName;

      const pathUrl = `/${pageName}/list`;

      const pageResult = await getPageListData(pathUrl, payload.queryInfo);

      const { list, totalCount } = pageResult.data;

      commit(`change${firstLetterToUppercase(pageName)}Count`, totalCount);
      commit(`change${firstLetterToUppercase(pageName)}List`, list);
    },
    async deletePageDataAction({ dispatch }, payload: any) {
      const { pageName, id } = payload;

      const pathUrl = `/${pageName}/${id}`;

      await deletePageData(pathUrl);

      dispatch("getPageListActon", {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10,
        },
      });
    },
    async createPageDataAction({ dispatch }, payload: any) {
      const { pageName, newData } = payload;

      const pathUrl = `/${pageName}`;

      await createPageData(pathUrl, newData);

      dispatch("getPageListActon", {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10,
        },
      });
    },
    async editPageDataAction({ dispatch }, payload: any) {
      const { pageName, editData, id } = payload;

      const pathUrl = `/${pageName}/${id}`;

      await editPageData(pathUrl, editData);

      dispatch("getPageListActon", {
        pageName,
        queryInfo: {
          offset: 0,
          size: 10,
        },
      });
    },
  },
};

export default systemModule;
