
export interface IDto<T> {
    url: string;
    getAll(): Promise<Array<T>> | undefined;
    getById(id: number): Promise<T | undefined>;
}
export interface IHasId {
    id: number;
}
export interface IProduct extends IHasId {
    name: string;
    icon: string;
    description?: string;
    validate(): boolean;
}
export interface ICustomer extends IHasId {
    name: string;
}