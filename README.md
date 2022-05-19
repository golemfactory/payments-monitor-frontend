This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First step is to set the proper environment variables inside the .env.local file. These are necessary to properly communicate with the backend.

There's 3 variables

```
NEXTAUTH_SECRET=generateme
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_API_BASE=http://api.localhost/
```

`NEXTAUTH_SECRET` should be set to the same variable set in the backend [here](https://github.com/golemfactory/payments-monitor-backend/blob/362968fdd4d7e32b277811e8398ca36a0e53e580/.envs/.django_template#L7)

`NEXTAUTH_URL` should be set to the URL the frontend development server is running on. The default is http://localhost:3000

`NEXT_PUBLIC_API_BASE` should be set to the base URL of the backend.

And now you can run the development server via :

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
