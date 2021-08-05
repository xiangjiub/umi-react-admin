declare namespace TaskApi {
  type TaskPageParams = {
    current?: number;
    pageSize?: number;
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
    depCode: string;
    depName: string;
    taskId: string;
  };
}
