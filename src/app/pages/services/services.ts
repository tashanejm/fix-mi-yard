import { Component, signal, WritableSignal } from '@angular/core';
import { Card } from 'primeng/card';
import { SearchCriteria } from '../../components/search-criteria/search-criteria';
import { ServicesResult } from './services-result/services-result';

@Component({
  selector: 'app-services',
  imports: [
    Card,
    SearchCriteria,
    ServicesResult
  ],
  templateUrl: './services.html',
  styleUrl: './services.scss'
})
export class Services {
  protected readonly selection: WritableSignal<string> = signal('');
}
