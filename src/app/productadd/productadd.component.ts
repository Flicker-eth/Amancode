import { Component, OnInit } from '@angular/core';
import { NavigationService } from '../services/navigation.service';
import { productmapping } from '../models/models';
import { NgToastService } from 'ng-angular-popup';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productadd',
  templateUrl: './productadd.component.html',
  styleUrls: ['./productadd.component.css']
})
export class ProductaddComponent implements OnInit {
  formdata = {
    title: '',
    description: '',
    categoryId: '',
    offerId: '',
    price: 0,
    quantity: 0,
    imageName: ''
  };
  constructor(private nav:NavigationService,private toast:NgToastService,private router: Router) {

   }

  ngOnInit(): void {
  }

  submitForm() {
    // Handle form submission logic here
    const formData = new FormData();
    formData.append('title', this.formdata.title);
    formData.append('description', this.formdata.description);
    formData.append('categoryId', this.formdata.categoryId);
    formData.append('offerId', this.formdata.offerId);
    formData.append('price', this.formdata.price.toString());
    formData.append('quantity', this.formdata.quantity.toString());
    formData.append('imageName', this.formdata.imageName);
  
    // let product:productmapping  {
    //   title:this.formData.title.toString() ,
    //   description:this.formData.description,
    //   categoryId: this.formData.categoryId,
    //   offerId: this.formData.offerId,
    //   price: this.formData.price,
    //   quantity: this.formData.quantity,
    //   imageName: this.formData.imageName,
    // };

    this.nav.addproduct(formData).subscribe(
      response => {
        // Handle success response if needed
        this.toast.success({detail:"Product Added Sucessfully"});
        console.log('Product saved successfully:', response);
        this.router.navigate(['/admin-dash-board']);

      },
      error => {
        // Handle error response if needed
        this.toast.error({detail:"Something went wrong"});
        console.error('Failed to save product:', error);
        this.router.navigate(['/admin-dash-board']);

      }
    );
}
}