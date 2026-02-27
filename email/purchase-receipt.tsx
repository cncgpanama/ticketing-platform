import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";
import { formatUSD } from "@/lib/utils";
const dateFormatter = new Intl.DateTimeFormat("en", { dateStyle: "medium" });

export type PurchaseReceiptData = {
  orderId: string;
  createdAt: Date;
  totalAmount: number;
  buyerEmail: string;
  attendees: {
    name: string;
    email: string;
    phone: string;
    ticketName: string;
  }[];
};

type PurchaseReceiptEmailProps = {
  receipt: PurchaseReceiptData;
};

PurchaseReceiptEmail.PreviewProps = {
  receipt: {
    orderId: crypto.randomUUID(),
    createdAt: new Date(),
    totalAmount: 120,
    buyerEmail: "buyer@example.com",
    attendees: [
      {
        name: "Jane Doe",
        email: "jane@example.com",
        phone: "+507 6000-0000",
        ticketName: "Early Bird",
      },
      {
        name: "John Doe",
        email: "john@example.com",
        phone: "Not provided",
        ticketName: "Standard",
      },
    ],
  },
} satisfies PurchaseReceiptEmailProps;

export default function PurchaseReceiptEmail({ receipt }: PurchaseReceiptEmailProps) {
  return (
    <Html>
      <Preview>Your KCD Panama ticket receipt</Preview>
      <Tailwind>
        <Head />
        <Body className="font-sans bg-white">
          <Container className="max-w-xl">
            <Heading>Purchase Receipt</Heading>
            <Text>
              Thanks for registering to the KCD Panama 2026! This receipt includes each attendee and their assigned ticket.
            </Text>
            <Section>
              <Text className="my-1">
                <strong>Order No:</strong> {receipt.orderId}
              </Text>
              <Text className="my-1">
                <strong>Purchase Date:</strong> {dateFormatter.format(receipt.createdAt)}
              </Text>
              <Text className="my-1">
                <strong>Buyer Email:</strong> {receipt.buyerEmail}
              </Text>
              <Text className="my-1">
                <strong>Total Paid:</strong> {formatUSD(receipt.totalAmount)}
              </Text>
            </Section>
            <Section className="rounded-lg px-2 mb-2">
              <Heading as="h2" className="text-lg mb-2 pb-1 inline-block" style={{ borderBottom: "1px solid #94EAFF" }}>
                Attendees
              </Heading>
              {receipt.attendees.map((attendee, index) => (
                <Section
                  key={`${attendee.email}-${attendee.ticketName}-${index}`}
                  className={`p-3 bg-[#94EAFF] rounded-lg my-4 mb-2`}
                >
                  <Text className="my-1">
                    <strong>Name:</strong> {attendee.name}
                  </Text>
                  <Text className="my-1">
                    <strong>Email:</strong> {attendee.email}
                  </Text>
                  <Text className="my-1">
                    <strong>Phone:</strong> {attendee.phone}
                  </Text>
                  <Text className="my-1">
                    <strong>Ticket:</strong> {attendee.ticketName}
                  </Text>
                </Section>
              ))}
            </Section>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
