declare namespace API {
  type GetNoticePageParmas = {
    current?: number;
    pageSize?: number;
    statusId?: number;
  };

  type pushParmas = {
    id: string | undefined;
    reason: string;
  };

  type AddNoticeParams = {
    title: string;
    priority: string;
    attachment: string;
    assigns?: assignsItem[];
  };

  type assignsItem = {
    depCode: string;
    workerCode: string;
    workerName: string;
  };
}
