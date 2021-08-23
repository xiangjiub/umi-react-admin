import { ProFormSelect } from '@ant-design/pro-form';

export default function UseVarity() {
  return (
    <ProFormSelect
      width="md"
      fieldProps={{
        labelInValue: true,
      }}
      // request={async () => {
      // let params = await getCityAndHub();

      // let res: any[] = [];
      // params.map((item: any) => {
      //     let temp: any = {};
      //     temp['label'] = item.DepName;
      //     temp['value'] = item.DepCode;
      //     res.push(temp);
      // });
      // return res;
      // }}
      request={async () => [
        { label: '红大', value: '102' },
        { label: '云烟', value: '103' },
      ]}
      label="品种"
      placeholder="请选择品种"
      name="varity"
      rules={[{ required: true, message: '请选择品种!' }]}
    />
  );
}
