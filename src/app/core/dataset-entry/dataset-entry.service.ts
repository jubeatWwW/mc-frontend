import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import * as sidebarItems from './dataset-entry.json';
import { DatasetDetail } from './dto/dataset-detail.dto.js';
import { Dataset } from './dto/dataset.dto.js';

@Injectable({
  providedIn: 'root'
})
export class DatasetEntryService {

  sidebarItems = sidebarItems;
  valueChain;

  baseUrl = 'http://34.80.167.207:3002/api';
  constructor(private http: HttpClient) { }

  withCache<T>(apiRequestString: string) {
    const valueChainCache = sessionStorage.getItem(apiRequestString);
    if (valueChainCache) {
      return of(JSON.parse(valueChainCache));
    }

    return this.http.get<T>(`${this.baseUrl}/${apiRequestString}`)
      .pipe(
        tap((data) => {
          try {
            sessionStorage.setItem(apiRequestString, JSON.stringify(data));
          } catch (e) {
            console.error(e);
          }
        }),
      );
  }

  getValueChain() {
    return this.withCache<Object[]>('value-chain');
  }

  getCategory(category: string | number) {
    return this.withCache(`category/${category}`);
  }

  getDataset(dataset) {
    return this.withCache<Dataset>(`dataset-content/${dataset.reference}/${dataset.table_name}`);
  }

  getDatasetsDetailByCategory(category: string | number) {
    return this.withCache<DatasetDetail[]>(`dataset/category/${category}`);
  }
}
