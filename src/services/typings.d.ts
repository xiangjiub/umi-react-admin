declare namespace API {
  type GetNoticePageParmas = {
    current?: number;
    pageSize?: number;
    statusId?: number;
  };

  type pushParmas = {
    id: string;
    reason: string;
  };
}
