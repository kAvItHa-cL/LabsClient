import {Deserializable} from "./deserializable.model";

export class ProductCategoryModel implements Deserializable {
  iD: number;
  description: string;
  isActive: boolean;
  createdBy: number;
  createdDate: Date;
  modifiedBy: number;
  modifiedDate: Date;
  
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
