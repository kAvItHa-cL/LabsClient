import {Deserializable} from "./deserializable.model";

export class ProductModel implements Deserializable {
  id: number;
  title : string;
  modelNumber : string;
  shortDescription :string;
  description: string;
  productCategoryID: number;
  vendorID: number;
  laboratoryID: number;
  departmentID: number;
  companyID: number;
  price: number;
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