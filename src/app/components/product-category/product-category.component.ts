import { Component, OnInit } from '@angular/core';
import { ProductCatalogService } from '../../services/product-catalog.service';
import { ProductCategoryModel } from '../../models/product-category.model';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {

  objProductCategoryList:ProductCategoryModel[];
  constructor(private _productCatalogService:ProductCatalogService) {
    this._productCatalogService.getProductCategoryList().subscribe(data =>this.objProductCategoryList=data);
  }

  ngOnInit() {
  }

}
