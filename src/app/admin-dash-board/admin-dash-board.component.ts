import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../services/navigation.service';
import { Product } from '../models/models';
import { UtilityService } from '../services/utility.service';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-admin-dash-board',
  templateUrl: './admin-dash-board.component.html',
  styleUrls: ['./admin-dash-board.component.css']
})
export class AdminDashBoardComponent implements OnInit {
  productList: Product[] | undefined;
  userRole: string | undefined;

  constructor(private navigationService: NavigationService,public utilityService: UtilityService,private router: Router,private toast:NgToastService) { }

  ngOnInit(): void {
    this.userRole = this.utilityService.getUserRole();
    this.navigationService.getProductList().subscribe(
      (products: Product[]) => {
        this.productList = products;
        console.log(this.productList); // Example: Log the retrieved product list
      },
      (error: any) => {
        console.error(error); // Handle error if any
      }
    );
    }
    editProduct(product: Product): void {
  
      this.navigationService.deleteproduct(product.id);
    }
  
    deleteProduct(product: Product):void {
      console.log("delete product called",product.id);
      this.navigationService.deleteproduct(product.id).subscribe(
        (res:any) => {
        
          console.log(res); 
          this.toast.success({detail:"Deleted SucessFully"})
          this.router.navigate(['/admin-dash-board']);
          
        },
        (error: any) => {
          this.toast.error({detail:"Somthing Went wrong"});
          console.error(error); // Handle error if any
        }
      );
    }

}
