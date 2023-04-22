type IInputType = "input" | "password" | "select" | "datepicker";

export interface IFormItem {
  field: string;
  type: IInputType;
  label: string;
  rules?: any[];
  placeholder?: any;
  options?: any[];
  otherOptions?: any;
  isHidden?: boolean;
}

export interface IForm {
  formItem: IFormItem[];
  labelWidth?: string;
  itemStyle?: any;
  colLayout?: any;
}
