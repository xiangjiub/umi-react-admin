import { ProFormSelect } from '@ant-design/pro-form';

export default function UseLevel() {
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
        { label: 'C2F', value: '101' },
        { label: 'B2F', value: '104' },
      ]}
      label="等级"
      placeholder="请选择等级"
      name="level"
      rules={[{ required: true, message: '请选择等级!' }]}
    />
  );
}
