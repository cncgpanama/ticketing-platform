import { environment } from "@/lib/constants/environment";
import { Resend } from "resend";
import type { OrderWithDetails } from "@/lib/actions/order.actions";
import PurchaseReceiptEmail from "./purchase-receipt";
// eslint-disable-next-line @typescript-eslint/no-require-imports
require("dotenv").config();

const resend = new Resend(process.env.RESEND_API_KEY as string);

export const sendPurchaseReceipt = async ({ order }: { order: OrderWithDetails }) => {
  const attendeeByTicketId = new Map(order.attendees.map((attendee) => [attendee.ticketId, attendee]));
  const attendees = order.orderItems.map((item) => {
    const attendee = attendeeByTicketId.get(item.ticketId);
    const firstName = attendee?.firstName ?? "Attendee";
    const lastName = attendee?.lastName ?? "";
    return {
      name: `${firstName} ${lastName}`.trim(),
      email: attendee?.email ?? order.buyer.email,
      phone: attendee?.phone ?? "Not provided",
      ticketName: item.ticketType.name,
    };
  });

  await resend.emails.send({
    from: `CNCG Panama <${environment.SENDER_EMAIL}>`,
    to: order.buyer.email,
    subject: `Order Confirmation ${order.id}`,
    react: (
      <PurchaseReceiptEmail
        receipt={{
          orderId: order.id,
          createdAt: order.createdAt,
          totalAmount: Number(order.totalAmount),
          buyerEmail: order.buyer.email,
          attendees,
        }}
      />
    ),
  });
};
