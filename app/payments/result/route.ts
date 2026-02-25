import { NextResponse } from "next/server";
import { prisma } from "@/db/prisma";
import { updateOrderToPaid } from "@/lib/actions/order.actions";
import { verifyMerchantTransactionByOperCode } from "@/lib/actions/payment.actions";
import { PaymentCallbackError } from "@/lib/errors/payment-callback-error";
import { defaultLocale, hasLocale } from "@/lib/i18n/config";


export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const totalPagado = searchParams.get("TotalPagado");
  const estado = searchParams.get("Estado");
  const oper = searchParams.get("Oper");
  const orderId = searchParams.get("orderId");
  const langParam = searchParams.get("lang");
  const lang = langParam && hasLocale(langParam) ? langParam : defaultLocale;

  let success = false;
  const logContext = {
    oper,
    orderId,
    estado,
    totalPagado,
  };

  try {
    if (estado !== "Aprobada" || !oper || !orderId) {
      throw new PaymentCallbackError("Invalid callback params");
    }

    if (!/^\d+$/.test(orderId)) {
      throw new PaymentCallbackError("Invalid orderId format", { orderId });
    }

    if (!totalPagado) {
      throw new PaymentCallbackError("Missing callback amount");
    }

    const receivedAmount = Number(totalPagado);
    if (Number.isNaN(receivedAmount)) {
      throw new PaymentCallbackError("Invalid callback amount", { totalPagado });
    }

    const orderIdAsBigInt = BigInt(orderId);
    const order = await prisma.order.findUnique({
      where: { id: orderIdAsBigInt },
    });

    if (!order) {
      throw new PaymentCallbackError("Order not found");
    }

    if (order.order_status === "paid") {
      success = true;
      console.info("[payments/result] Order already marked as paid", {
        ...logContext,
        orderDbId: order.id.toString(),
      });
      return NextResponse.redirect(
        new URL(`/${lang}/payments/status?success=true`, request.url)
      );
    }

    const expectedAmount = Number(order.total_amount);
    if (expectedAmount !== receivedAmount) {
      throw new PaymentCallbackError("Amount mismatch", {
        expectedAmount,
        receivedAmount,
      });
    }

    const verificationResult = await verifyMerchantTransactionByOperCode({
      operCode: oper,
      expectedAmount,
    });

    if (!verificationResult.success) {
      throw new PaymentCallbackError("Provider verification failed", {
        providerError: verificationResult.error,
      });
    }

    const result = await updateOrderToPaid({
      orderId: order.id.toString(),
      paymentId: oper,
      paymentMethod: "PagueloFacil",
    });

    if (!result.success) {
      throw new PaymentCallbackError("Failed to update order status", {
        orderDbId: order.id.toString(),
        updateError: result.error,
      });
    }

    success = result.success;
    console.info("[payments/result] Order paid successfully", {
      ...logContext,
      orderDbId: order.id.toString(),
    });
  } catch (error) {
    if (error instanceof PaymentCallbackError) {
      console.error("[payments/result] Callback validation failed", {
        ...logContext,
        ...error.context,
        errorMessage: error.message,
      });
    } else {
      console.error("[payments/result] Unhandled error while processing callback", {
        ...logContext,
        error,
      });
    }
  }

  const statusUrl = new URL(`/${lang}/payments/status`, request.url);
  statusUrl.searchParams.set("success", success ? "true" : "false");

  return NextResponse.redirect(statusUrl);
}