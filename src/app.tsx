import { PageLoading } from '@ant-design/pro-layout';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

// export const getInitialState = () =>{
//   return '初始的数据值'
// }

export async function getInitialState() {
  return {
    // WorkerCode: '34000000002375',
    // WorkerName: '州公司管理员',
    // DepCode: '34',
    // DepName: '州公司',

    WorkerCode: '34340365007532',
    WorkerName: '郭进文',
    DepCode: '343403A',
    DepName: '城关收购线',
  };
}
