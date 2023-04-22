import { IForm } from "@/base-ui/form/type";

export const searchFormConfig: IForm = {
  formItem: [
    {
      field: "name",
      type: "input",
      label: "角色名",
      placeholder: "请输入角色名",
    },
    {
      field: "intro",
      type: "input",
      label: "权限介绍",
      placeholder: "请输入角色介绍",
    },
    {
      field: "createAt",
      type: "datepicker",
      label: "创建时间",
      placeholder: "请选择时间范围",
      otherOptions: {
        type: "daterange",
        startPlaceholder: "开始时间",
        endPlaceholder: "结束时间",
      },
    },
  ],
  labelWidth: "120px",
  itemStyle: { padding: "10px 40px" },
  colLayout: { span: 8 },
};
