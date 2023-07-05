import { Component, OnInit } from '@angular/core';
import { SuggestedProduct } from '../models/models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  suggestedProducts: SuggestedProduct[] = [
    {
      banerimage: '2.jpg',
      category: {
        id: 0,
        category: 'Food',
        subCategory: 'Cookies',
      },
    },
    {
      banerimage: '1.jpg',
      category: {
        id: 1,
        category: 'Food',
        subCategory: 'Bread',
      },
    },
    {
      banerimage: '3.jpg',
      category: {
        id: 1,
        category: 'Drink',
        subCategory: 'Juice',
      },
    },
  ];
  constructor() {}

  ngOnInit(): void {}
}
