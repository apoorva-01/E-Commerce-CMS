# Make My Commerce — E-Commerce CMS

> A full-stack e-commerce content management system that lets non-technical users run an online store — products, orders, customers, shipping, payments, and analytics — without writing a line of code.

Built on top of the open-source [Next.js Commerce](https://github.com/vercel/commerce) storefront, extended with a custom MongoDB backend, a complete merchant admin dashboard, authentication, and real payment & shipping integrations.

![Make My Commerce](https://github.com/apoorva-01/E-Commerce-CMS/releases/download/demo-media/banner.png)

---

## Demo

https://github.com/apoorva-01/E-Commerce-CMS/releases/download/demo-media/Video.mp4

---

## Overview

Make My Commerce gives store owners a single dashboard to manage an entire online business. The storefront is server-rendered with Next.js; the management layer — data models, REST APIs, admin UI, and third-party integrations — is custom-built on MongoDB.

It supports **physical, digital, and supplier-sourced products** as distinct types, multiple payment providers, and automated shipping, so a merchant can configure and operate a store end-to-end from the admin panel.

---

## Features

### Storefront (customer-facing)

- Product catalog with search and category browsing
- Cart and wishlist
- Customer accounts: registration, login (JWT), profile, saved addresses and cards
- Checkout with multiple payment options
- Order placement and order history

### Admin / CMS (merchant-facing)

- **Products:** add and edit physical, digital, and supplier products, each with its own data model and flow
- **Orders:** view, confirm, change status, and browse order history
- **Customers:** manage customer records
- **Analytics & sales:** dashboards and charts for store performance
- **Shipping:** configure shipping zones and rates, with automated fulfilment via Shiprocket
- **Store settings:** payment providers, taxes, policies, SEO, categories, checkout, and store details
- **Media & email:** image/document uploads (Cloudinary) and transactional email
- **Admin auth:** separate admin user accounts with verification

---

## Tech Stack

| Layer | Technologies |
| --- | --- |
| Framework | Next.js, React, TypeScript |
| Backend | Node.js, Next.js API routes, MongoDB (Mongoose) |
| UI | Material UI (MUI), Tailwind CSS, Emotion |
| Auth | JWT, bcrypt |
| Payments | Razorpay, Stripe, PayPal |
| Shipping | Shiprocket |
| Media | Cloudinary |
| Analytics | DevExpress charts, Danfo.js |

---

## Architecture

The project layers a **custom CMS and backend** on top of the Next.js Commerce starter:

- **`models/`** — Mongoose schemas: `Customer`, `Cart`, `Order`, `Wishlist`, `Shipping`, `Store`, and three product types (`PhysicalProduct`, `DigitalProduct`, `SupplierProduct`).
- **`pages/api/`** — REST API: customer auth and account routes, plus a full `admin/` suite (products, orders, customers, sales, shipping, store config, uploads, email, and Shiprocket fulfilment).
- **`pages/admin/`** — the merchant dashboard UI.
- **`framework/`** — the Next.js Commerce provider layer (storefront base).

A notable design decision is splitting products into **separate physical, digital, and supplier models** rather than forcing one schema — their lifecycles differ (digital products have no shipping or inventory; supplier products carry sourcing data), which keeps each flow clean at the cost of handling a polymorphic product type across cart, orders, and admin.

---

## Getting Started

### Prerequisites

- Node.js 16+
- A MongoDB database (local or Atlas)

### Installation

```bash
git clone https://github.com/apoorva-01/E-Commerce-CMS.git
cd E-Commerce-CMS
yarn install      # or: npm install
```

### Environment variables

Create a `.env.local` file in the project root:

```bash
# Database
MONGODB_URI=your_mongodb_connection_string

# Auth
JWT_SECRET=your_jwt_secret

# Payments
RAZORPAY_KEY=your_razorpay_key
RAZORPAY_SECRET=your_razorpay_secret
PAYPAL_CLIENT_ID=your_paypal_client_id

# Integrations
GOOGLE_API_KEY=your_google_api_key
STORE_OBJECT_ID=your_store_object_id
```

### Run

```bash
yarn dev          # start the dev server (http://localhost:3502)
yarn build        # production build
yarn start        # run the production build
yarn lint         # lint
```

> The dev server runs on port **3502** (configured in `package.json`).

---

## Project Structure

```
├── components/      # Reusable UI components
├── framework/       # Next.js Commerce provider layer (storefront base)
├── layouts/         # Page layouts
├── lib/             # Helpers and utilities
├── models/          # Mongoose data models
├── pages/
│   ├── admin/       # Merchant admin dashboard
│   ├── api/         # REST API (customer + admin)
│   └── ...          # Storefront pages
├── styles/          # Global styles
└── utils/           # Shared utilities
```

---

## Author

**Apoorva Verma**

- GitHub: [@apoorva-01](https://github.com/apoorva-01/)
- LinkedIn: [apoorva0510](https://www.linkedin.com/in/apoorva0510/)
- Portfolio: [apoorva-verma.netlify.app](https://apoorva-verma.netlify.app/)

---

## License

This project is open source. The storefront foundation is derived from the MIT-licensed Next.js Commerce project; see that project for its license terms.
