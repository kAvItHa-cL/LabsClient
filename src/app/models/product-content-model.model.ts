export class ProductContentModel {
    id : number;
    description : string;
    productID : number;
    path : string;
    contentTypeID : number;
    order : number;
    isActive: boolean;
    createdBy: number;
    createdDate:Date;
    modifiedBy: number;
    modifiedDate:Date;
    deserialize(input: any) {
        Object.assign(this, input);
        return this;
      }
    
}
