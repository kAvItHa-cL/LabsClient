import { ProductModel } from "./product.model";
import { ProductContentModel } from "./product-content-model.model";

export class ProductCatalogModel {
    product:ProductModel;    
    productContent: ProductContentModel[];
    deserialize(input: any) {
        Object.assign(this, input);
        return this;
      }
}
