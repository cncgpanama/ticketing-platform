export class PaymentCallbackError extends Error {
    context?: Record<string, unknown>;

    constructor(message: string, context?: Record<string, unknown>) {
        super(message);
        this.name = "PaymentCallbackError";
        this.context = context;
    }
}