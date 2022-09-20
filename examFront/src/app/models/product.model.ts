import { FileHandle } from './file-handle.model';
export interface Product{
    productId:number,
    productName:string,
    productDescription:string,
    productDiscountPrice:number,
    productActualPrice:number,
    productImages:FileHandle[]
}