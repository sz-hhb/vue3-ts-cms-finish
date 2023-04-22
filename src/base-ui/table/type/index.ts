export interface IPropList {
  prop?: string;
  label: string;
  minWidth: string;
  slotName?: string;
}

export interface ITable {
  title: string;
  createTitle: string;
  propList: IPropList[];
  showIndexColumn: boolean;
  showSelectColumn: boolean;
  childrenProps?: any;
  showFooter?: boolean;
}
