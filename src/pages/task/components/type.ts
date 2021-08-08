export interface FormDataType {
  assignWorker: string; // 采集人
  workerName: string; // 采集人名称
  collectDep: string; // 采集单位编码
  collectDepName: string; // 采集单位名称
}

export interface CollectPlanChild {
  itemId: string;
  varityObject: any;
  varityCode: string | undefined;
  varityName: string;
  levelCode: string | undefined;
  levelName: string;
  collectedWeight: number;
  weight: number;
  require?: string;
  editPlanItem: boolean; // 明细中 编辑、不在编辑状态的维护
  useitemId: string; // 这两个都用于维护控件
}
export interface CollectPlan {
  taskId: string;
  planId: string;
  collectDep: string;
  depCode: string; //烟点编码
  collectDepName: string;
  assignWorker: string;
  assignWorkerCode: string;
  assignworkerstr: string;
  editCollapse: boolean; //  编辑、不在编辑状态的控制
  items: CollectPlanChild[];
}
