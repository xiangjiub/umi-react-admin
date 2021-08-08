declare namespace CollectPlanApi {
  type CreateCollectPlanParams = {
    taskId: string;
    collectDep: string;
    collectDepName: string;
    assignWorker: string;
    assignWorkerCode: string;
    items?: CollectPlanChild[];
  };

  interface CollectPlanChild {
    itemId: string;
    varityCode: string;
    varityName: string;
    levelCode: string;
    levelName: string;
    weight: number;
    require: string;
    editPlanItem: boolean;
  }
}
