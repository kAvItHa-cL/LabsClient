import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductCatalogService } from '../../services/product-catalog.service';
import { ProductCategoryModel } from '../../models/product-category.model';
import { ProductCatalogModel } from '../../models/product-catalog-model.model';
@Component({
  selector: 'app-product-catalog',
  templateUrl: './product-catalog.component.html',
  styleUrls: ['./product-catalog.component.css']
})
export class ProductCatalogComponent implements OnInit {
  categoryId: number;
  productCount: number = 0;
  testClickCount: string = "0";
  objProductCategoryList: ProductCategoryModel[];
  objProductCatalogList: ProductCatalogModel[];
  constructor(private _Activatedroute: ActivatedRoute, private _router: Router, private _productCatalogService: ProductCatalogService) {
    this.categoryId = this._Activatedroute.snapshot.params['id'];
    this._productCatalogService.getProductCategoryList().subscribe(data => this.objProductCategoryList = data);
    this._productCatalogService.getProductCatalogList(this.categoryId).subscribe(data => {
    this.objProductCatalogList = data;
      this.productCount = this.objProductCatalogList.length
    });
  }

  ngOnInit() {
  }

  ngDoCheck() {
    this.testClickCount=document.getElementById("testClickCount").textContent;
    if (this.testClickCount != "1") {      
      if (this.categoryId == 1) {
        document.getElementById("test-tab").click();
      }
    }
  }
  routing(id) {
    this._router.navigate(['/product-catalog', 'PRINT']);
  }
}
