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
}
