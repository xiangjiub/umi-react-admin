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
    userName: '初始的数据值',
    userCode: '25455',
  };
}
