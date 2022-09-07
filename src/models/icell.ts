import { IPosibility } from './iPosibility';
import IRowColumnNumber from "./iRowColumnNumber";
export interface ICell {
    posibilities: Array<IPosibility>;
    value: number;
    blockNumber: number;
    rowColumnNumber: IRowColumnNumber
}