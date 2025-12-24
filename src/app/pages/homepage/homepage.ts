import { Component } from '@angular/core';
import { Card } from 'primeng/card';
import { TranslatePipe } from '@ngx-translate/core';
import { SearchCriteria } from '../../components/search-criteria/search-criteria';

@Component({
  selector: 'app-homepage',
  imports: [
    Card,
    TranslatePipe,
    SearchCriteria
  ],
  templateUrl: './homepage.html',
  styleUrl: './homepage.scss'
})
export class Homepage {

}
