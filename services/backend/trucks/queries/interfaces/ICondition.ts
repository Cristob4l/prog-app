export interface ICondition {
  key: string;
  oper: WhereFilterOp;
  val: string | string[] | boolean | number | number[] | Date;
}

type WhereFilterOp = "<" | "<=" | "=" | "!=" | ">=" | ">";
