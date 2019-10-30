export interface AnyObjInter {
  [key: string]: any;
}

export interface JsonpInter {
  url: string;
  data: object;
  callback: string;
  success: Function;
}

export interface AjaxInter {
  method: string;
  url: string;
  params: string | object;
  data: string | object;
  async: boolean;
  responseType: string;
  error: Function;
  success: Function;
  contentType: string;
  withCredentials: boolean
}
