import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { ApiTransactionResponse } from '../types/api.types';
import { TransactionResponse } from '../types/transaction.types';
import { mapApiTransactions } from '../utils/mappers';
import { API_BASE_URL } from '../constants/app.constants';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) {}

  /**
   * Obtiene todas las transacciones desde el API
   * Transforma la respuesta de la API (MAYÚSCULAS) al formato interno (lowercase)
   */
  fetchTransactions(): Observable<TransactionResponse> {
    return this.http.get<ApiTransactionResponse>(API_BASE_URL, {
      headers: {
        'Content-Type': 'application/json',
      }
    }).pipe(
      map((apiResponse: ApiTransactionResponse) => {
        // Transformar al formato interno
        const transformedData = mapApiTransactions(apiResponse.data);
        
        return {
          data: transformedData,
        };
      }),
      catchError((error) => {
        console.error('Error fetching transactions:', error);
        return throwError(() => new Error(`Error fetching transactions: ${error.status} ${error.statusText}`));
      })
    );
  }
}
