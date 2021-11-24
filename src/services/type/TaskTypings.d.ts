declare namespace TaskApi {
  type TaskPageParams = {
    current?: number;
    pageSize?: number;
    depCode?: string;
  };

  type CreateSampleTaskParams = {
    name: string;
    requirements: string;
    noticeId: string;
    sendTo: string;
    shippingAddress: string;
    contactName: string;
    contactPhone: string;
    depCode: string;
    depName: string;
  };

  type EditSampleTaskParams = {
    name: string;
    requirements: string;
    noticeId: string;
    sendTo: string;
    shippingAddress: string;
    contactName: string;
    contactPhone: string;
    depCode?: string;
    depName?: string;
    taskId: string;
  };

  //删除参数
  type DeleteTaskParams = {
    id: string;
    reason: string;
  };

  //发布参数
  type PushTaskParams = {
    taskId: string; // 任务id
  };

  type AddCollectPlanParams = {
    taskId: string | undefined;
    collectDep: string;
    collectFullDep: string;
    collectDepName: string;
    assignWorker: string;
    assignWorkerCode: string;
    items: any[];
  };
}

type CollectPlanChild = {
  itemId: string;
  varityCode: string;
  varityName: string;
  levelCode: string;
  levelName: string;
  weight: number;
  require: string;
  editPlanItem: boolean;
};
