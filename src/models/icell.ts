import { IPosibility } from './iposibility';
export interface ICell{
    posibilities:Array<IPosibility>;
    id:number;
    value?:number;
}