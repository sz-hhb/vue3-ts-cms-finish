import { ITable } from "@/base-ui/table/type";

export const contentTableConfig: ITable = {
  title: "菜单列表",
  createTitle: "新建菜单",
  propList: [
    { prop: "name", label: "菜单名称", minWidth: "130" },
    { prop: "type", label: "类型", minWidth: "60" },
    { prop: "url", label: "菜单url", minWidth: "150" },
    { prop: "icon", label: "菜单icon", minWidth: "100" },
    { prop: "permission", label: "按钮权限", minWidth: "100" },
    {
      prop: "createAt",
      label: "创建时间",
      minWidth: "180",
      slotName: "createAt",
    },
    {
      prop: "updateAt",
      label: "更新时间",
      minWidth: "180",
      slotName: "updateAt",
    },
    {
      label: "操作",
      minWidth: "150",
      slotName: "handler",
    },
  ],
  showIndexColumn: false,
  showSelectColumn: false,
  childrenProps: {
    rowKey: "id",
    treeProps: { children: "children" },
  },
  showFooter: false,
};
