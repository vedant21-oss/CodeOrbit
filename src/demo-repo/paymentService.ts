/**
 * CodeOrbit Demo Repository — Payment Service
 * MISSING TESTS: Edge case coverage for null payment ID, duplicate payment attempt, and timeout
 */

export interface PaymentRequest {
  id: string;
  amount: number;
  currency: string;
}

export interface PaymentResult {
  success: boolean;
  transactionId?: string;
  error?: string;
}

export class PaymentService {
  public static async processPayment(req: PaymentRequest): Promise<PaymentResult> {
    if (!req.id) {
      return { success: false, error: "Invalid payment ID" };
    }
    if (req.amount <= 0) {
      return { success: false, error: "Amount must be greater than zero" };
    }
    return { success: true, transactionId: `tx_${Math.floor(Math.random() * 100000)}` };
  }
}
