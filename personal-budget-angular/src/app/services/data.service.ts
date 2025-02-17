import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { map, catchError } from 'rxjs/operators';


interface BudgetItem {
  title: string;
  budget: number;
}

@Injectable({
  providedIn: 'root' // ✅ Ensures service is available throughout the app
})
export class DataService {
  private budgetData = new BehaviorSubject<BudgetItem[]>([]);
  public budgetData$ = this.budgetData.asObservable();

  constructor(private http: HttpClient) {}

  fetchBudgetData(): Observable<BudgetItem[]> {
    console.log("📡 Calling API: http://localhost:3000/budget");

    return this.http.get<{ myBudget: BudgetItem[] }>('http://localhost:3000/budget').pipe(
      map(response => response.myBudget), // ✅ Extract only myBudget array
      tap(budget => {
        console.log("✅ API Response Received:", budget);
        this.budgetData.next(budget); // ✅ Emit extracted budget data
      }),
      catchError(error => {
        console.error("❌ API Error:", error);
        return of([]); // ✅ Return empty array on error
      })
    );
  }
}



