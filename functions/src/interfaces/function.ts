import * as functions from "firebase-functions/lib";

export interface IFunction {
  name: string;
  function: functions.CloudFunction<any>;
}

export interface IService {
  status: number;
  data: object;
}
