import { message as Message } from 'antd';
import { addCollectPlan, getCollectPlanList } from '@/services/CollectPlan';
import { guid } from '@/utils/common';

//获取采集计划列表
const getCollectPlanItem = async (taskId: string): Promise<any[]> => {
  const result = await getCollectPlanList(taskId).then();
  const { resultType, appendData, message } = result;
  if (resultType == 0) {
    const res = appendData.map(function (item: any) {
      item.taskId = taskId;
      item.planId = item.id;
      item.collectDep = item.collectDep?.split(',');
      if (item.collectDep.length > 0) {
        item.depCode = item.collectDep[item.collectDep.length - 1];
      }
      item.collectDepName = item.collectDepName;
      item.assignWorker = item.assignWorker;
      item.assignWorkerCode = item.assignWorkerCode;
      item.assignworkerstr = `单位：${item.collectDepName}  、采集人员：${item.assignWorker}、总重量：${item.totalWeight} (公斤)`;
      item.editCollapse = false;
      if (item.items?.length > 0) {
        item.items.map(function (childItem: any) {
          childItem.varityObject = { value: childItem?.varityCode };
          childItem.varityCode = childItem.varityCode;
          childItem.itemId = childItem.id;
          (childItem.useitemId = guid()),
            (childItem.varityName = childItem.varityName);
          childItem.levelCode = childItem.levelCode;
          childItem.levelName = childItem.levelName;
          childItem.weight = childItem.weight;
          childItem.editPlanItem = false;
        });
      }
      return item;
    });
    return [...res];
  } else {
    Message.error(message);
    return [];
  }
};

export default getCollectPlanItem;
