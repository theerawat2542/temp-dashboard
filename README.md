This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## insert env
### WMS_9774 Database
MYSQL_WMS_HOST=10.201.10.163
MYSQL_WMS_USERNAME=root
MYSQL_WMS_PASSWORD=6!bBGABQ3xZHdhmo
MYSQL_WMS_9771_DATABASE=cosmo_wms_9771
MYSQL_WMS_9773_DATABASE=cosmo_wms_9773
MYSQL_WMS_9774_DATABASE=cosmo_wms_9774

### 78 Database
MYSQL_78_HOST=10.35.10.78
MYSQL_78_USERNAME=root
MYSQL_78_PASSWORD=78mes@haier
MYSQL_78_DATABASE=htc_bigdata

### MES_9771 Database
MYSQL_MES_HOST=10.35.10.77
MYSQL_MES_USERNAME=mes_it
MYSQL_MES_PASSWORD=Haier@2022
MYSQL_MES_DATABASE=cosmo_im_9771

### localhost Database
MYSQL_HOST=localhost
MYSQL_USERNAME=root
MYSQL_PASSWORD=
MYSQL_DATABASE=test

### API_URL
NEXT_PUBLIC_API_URL=http://localhost:3000