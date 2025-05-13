export {};

declare global {
  interface SepayWebhookRequest {
    id: number;
    content: string;
    transferType: 'in' | 'out';
    transferAmount: number;
  }
}
