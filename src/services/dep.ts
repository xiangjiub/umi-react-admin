import { request } from 'umi';
import { RequestEnum } from '@/utils/httpEnum';

const Api = {
  GetCountiesAndHubs: '/dep/GetCountiesAndHubs',
};

//获取县公司和仓储中心
export async function getCityAndHub() {
  return request(Api.GetCountiesAndHubs);
}

// export async function getdeplist(){
//     return request('/api/dep/list',{
//         method: RequestEnum.GET
//     })
// }
