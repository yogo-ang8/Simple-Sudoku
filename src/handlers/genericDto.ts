//import fetch from "node-fetch";
import { IDto, IHasId } from "./dto-interfaces";


export class GenericDto<T extends IHasId> implements IDto<T>{
    constructor(public url: string) { }
    async getAll(): Promise<T[]> {
        var fs = require("fs");
        var text = await fs.readFileSync(this.url);
        //const response = await require(this.url);// fetch(this.url);
        //const body = await response.text();
        const objs: T[] = JSON.parse(text);
        return objs;
    }

    async getById(id: number): Promise<T | undefined> {
        var items = await this.getAll();
        return items ? items.find((i) => (i.id === id)) : undefined;
    }
}