import { ToastrModule } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductService } from 'src/app/services/product.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.scss'],
})
export class ProductsListComponent implements OnInit {
  productList: Product[];

  constructor(private productService: ProductService, private toastr : ToastrModule) {}
  ngOnInit() {
    return this.productService.getProducts()
      .snapshotChanges().subscribe(item => {
        this.productList = [];
        item.forEach(element => {
          let x = element.payload.toJSON();
          x!["$key"] = element.key;
          this.productList.push(x as Product);
        });
      });

  }

  onEdit(product: Product){
    this.productService.selectedProduct = Object.assign({},product);
  }

  onDeletet($key: string){


    //if (confirm('Are you sure you want to delete')) {

      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.productService.deleteProduct($key);
          Swal.fire(
            'Deleted!',
            'Your Product has been deleted.',
            'success'
          )
        }
      })



  }
}
