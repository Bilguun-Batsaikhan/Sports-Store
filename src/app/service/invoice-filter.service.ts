import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class InvoiceFilterService {
  // BehaviorSubject is a special type of Observable from RxJS that has some unique characteristics:

  // Key Features of BehaviorSubject:
  // Holds a Current Value: Unlike regular Observables, BehaviorSubject always stores the latest value
  // Immediate Emission: When a component subscribes, it immediately receives the current value
  // Stateful: It remembers the last emitted value even when no one is subscribed
  // Multi-cast: Multiple components can subscribe and all get the same values
  private selectedInvoiceIdSubject = new BehaviorSubject<string | null>(null);

  // Observable for components to subscribe to
  public selectedInvoiceId$: Observable<string | null> =
    this.selectedInvoiceIdSubject.asObservable();

  constructor() {}

  // Set the selected invoice ID
  setSelectedInvoiceId(invoiceId: string | null): void {
    this.selectedInvoiceIdSubject.next(invoiceId);
  }

  // Get current invoice ID
  getCurrentInvoiceId(): string | null {
    return this.selectedInvoiceIdSubject.value;
  }

  // Clear filter (show all orders)
  clearFilter(): void {
    this.selectedInvoiceIdSubject.next(null);
  }
}
