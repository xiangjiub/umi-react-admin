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

  interface DeleteNoticeAssignParams {
    noticeId: string; //通知id
    assignId: string; //通知人员id
  }

  interface AddNoticeAssignParams {
    noticeId: string; //通知id
    depCode: string; //通知单位
    depName: string;
    workerCode: string; //通知人员
    workerName: string;
  }

  interface UpdateNoticeParams {
    id: string;
    title: string;
    priority: string;
    attachment: string;
  }
}
