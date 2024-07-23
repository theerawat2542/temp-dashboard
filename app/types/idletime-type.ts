import { CoordinateType } from "../lib/utility/coordination";

export interface IdleTimeI extends CoordinateType {
  Production_Line_Code: string;
  Work_Cell_Code: string;
  Work_Cell_Desc: string;
  colum_index: number;
  ARRIVE_TIME: string;
  idleTime: number;
}
