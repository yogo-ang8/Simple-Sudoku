import IRowColumnNumber from "./iRowColumnNumber";
export interface ICell {
    posibilities: Array<number>;
    value: number;
    blockNumber: number;
    rowColumnNumber: IRowColumnNumber;
    id: number;
}