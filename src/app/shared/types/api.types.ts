/**
 * Tipos para las respuestas RAW de la API de Bold
 * Estos tipos reflejan exactamente la estructura que devuelve el API
 */

// Estados de transacción tal como vienen de la API
export type ApiTransactionStatus = 'SUCCESSFUL' | 'REJECTED' | 'PENDING';

// Métodos de pago tal como vienen de la API
export type ApiPaymentMethod = 
  | 'CARD' 
  | 'PSE' 
  | 'NEQUI' 
  | 'BANCOLOMBIA' 
  | 'DAVIPLATA';

// Tipos de venta tal como vienen de la API
export type ApiSalesType = 'TERMINAL' | 'PAYMENT_LINK';

// Franquicias de tarjeta
export type CardFranchise = 'VISA' | 'MASTERCARD' | 'AMEX' | 'DINERS';

/**
 * Estructura de una transacción tal como viene de la API
 */
export interface ApiTransaction {
  id: string;
  status: ApiTransactionStatus;
  paymentMethod: ApiPaymentMethod;
  salesType: ApiSalesType;
  createdAt: number; // timestamp en milisegundos
  transactionReference: number; // En la API es número
  amount: number; // Valor en centavos (ej: 7165725 = $71,657.25)
  franchise?: CardFranchise; // Solo presente en pagos con tarjeta
  deduction?: number; // Deducción Bold (opcional)
}

/**
 * Respuesta completa del endpoint de transacciones
 */
export interface ApiTransactionResponse {
  data: ApiTransaction[];
}
