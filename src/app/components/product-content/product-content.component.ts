import { Component, OnInit } from '@angular/core';
import { ProductCatalogModel } from '../../models/product-catalog-model.model';
import { ProductCatalogService } from '../../services/product-catalog.service';
import { Router } from '@angular/router';
import { ProductModel } from '../../models/product.model';
import { ProductContentModel } from '../../models/product-content-model.model';


@Component({
  selector: 'app-product-content',
  templateUrl: './product-content.component.html',
  styleUrls: ['./product-content.component.css']
})
export class ProductContentComponent implements OnInit {
  objProductCatalogModel : ProductCatalogModel;
  objProductModel : ProductModel;
  obProductContentModel : ProductContentModel;
  constructor(private _productCatalogService:ProductCatalogService,private _router:Router) 
  { 
      this.objProductCatalogModel = new ProductCatalogModel();
      this.objProductModel = new ProductModel();
      this.obProductContentModel = new ProductContentModel();
  }

  ngOnInit() {
  }

  getProductContentList(productID)
  {
    
    this._productCatalogService.getProductContentList(productID)
    .subscribe((data)=>{
      this.objProductCatalogModel = data; 
      console.log('res is ', this.objProductCatalogModel.product.description);
    })


  }

}
