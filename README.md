# CNCG Panama Ticketing Platform

## Overview

A platform used by CNCG Panama to manage the ticket ordering process for their events.

## Prerequisites

- Node.js 20+
- npm or pnpm
- PostgreSQL database

### Environment Variables

Copy and rename the `.env.template` file to fill the required variables

```
cp .env.template .env
```

| Variable                  | Required       | Default                                                                                  | Description                                                 |
| ------------------------- | -------------- | ---------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| `DATABASE_URL`            | Yes            |                                                                                          | PostgreSQL connection string used by Prisma.                |
| `PAGUELOFACIL_BASE_URL`   | No             | `https://sandbox.paguelofacil.com`                                                       | PagueloFacil API base URL.                                  |
| `PAGUELOFACIL_CCLW`       | Yes (payments) |                                                                                          | PagueloFacil merchant key/token.                            |
| `PAGUELOFACIL_RETURN_URL` | Yes (payments) | 68747470733A2F2F7469636B65742E6B636470616E616D612E636F6D2F7061796D656E74732F726573756C74 | return url hex encoded after a payment is completed         |
| `PAGUELOFACIL_EXPIRES_IN` | No             | 3600                                                                                     | Payment link expiration in seconds.                         |
| `PAGUELOFACIL_CTAX`       | No             | 7                                                                                        | Payment tax percentage                                      |
| `PAGUELOFACIL_TOKEN`      | Yes            |                                                                                          | PagueloFacil transactions request token                       |
| `RESEND_API_KEY`          | Yes            |                                                                                          | Resend email service API Key |                     |
| `SENDER_EMAIL`          | Yes            |  onboarding@resend.dev                                                                     | Resend sender email (default is for testing single receipt only)  |                     |
| `ATTENDEE_FORM_FIELDS`    | No             |                                                                                          | prefilled registration filled for quick development/testing |

## Getting Started

### Clone the repository and copy environment variables

```
git clone https://github.com/cncgpanama/ticketing-platform.git
cd ticketing-platform
cp .env.template .env
```

### Install dependencies and generate the Prisma client

```
npm install
npm run db:client
```

### Apply migrations and seed the database

```
npm run db:migrate
npm run db:seed
```

> [!TIP]
> You can preview the database with prisma studio

```
npm run db:studio
```

### Run the application in development mode (default port 3000)

```
npm run dev
```

## Community

Join the CNCF Panama Chapter:
https://community.cncf.io/cloud-native-panama/
