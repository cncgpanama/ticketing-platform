"use server";

import { environment } from "@/lib/constants/environment";

type MerchantTransaction = {
  codOper?: string;
  amount?: number;
  authStatus?: string;
  status?: number;
};

type MerchantTransactionsResponse = {
  headerStatus?: {
    code?: number;
    description?: string;
  };
  message?: string | null;
  data?: MerchantTransaction[];
  success?: boolean;
};

export async function verifyMerchantTransactionByOperCode(input: {
  operCode: string;
  expectedAmount: number;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const baseUrl = environment.PAGUELOFACIL_BASE_URL;
    const token = environment.PAGUELOFACIL_TOKEN;

    if (!baseUrl || !token) {
      return {
        success: false,
        error:
          "Payment provider is not configured correctly. Please contact support.",
      };
    }

    const url = new URL(
      "/PFManagementServices/api/v1/MerchantTransactions",
      baseUrl
    );
    url.searchParams.set("filter", `codOper::${input.operCode}`);

    const response = await fetch(url.toString(), {
      method: "GET",
      headers: {
        Accept: "application/json, text/plain, */*",
        Authorization: token,
      },
      cache: "no-store",
    });

    const payload = (await response.json()) as MerchantTransactionsResponse;
    console.log({payload});
    
    const providerCode = payload?.headerStatus?.code;

    if (!response.ok || providerCode !== 200 || payload?.success === false) {
      return {
        success: false,
        error:
          payload?.headerStatus?.description ||
          payload?.message ||
          "Payment provider could not verify the transaction.",
      };
    }

    const transactions = payload?.data ?? [];

    if (transactions.length !== 1) {
      return {
        success: false,
        error: "Payment transaction was not found for the provided operation code.",
      };
    }

    const transaction = transactions[0];

    if (transaction.codOper !== input.operCode) {
      return {
        success: false,
        error: "Payment operation code mismatch.",
      };
    }

    const transactionAmount = Number(transaction.amount);
    if (
      !Number.isFinite(transactionAmount) ||
      Math.abs(transactionAmount - input.expectedAmount) > 0.0001
    ) {
      return {
        success: false,
        error: "Payment amount does not match the order total.",
      };
    }

    const isApproved =
      transaction.status === 1 || transaction.authStatus === "00";

    if (!isApproved) {
      return {
        success: false,
        error: "Payment transaction is not approved.",
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Error verifying merchant transaction:", error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : "Failed to verify payment transaction",
    };
  }
}
