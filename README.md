This is a [Next.js](https://nextjs.org/) project bootstrapped
with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and
load Inter, a custom Google Font.

## How to modify the content?

### Static Text Content

- `lib/config/home.tsx` - Home page content
- `lib/config/pages.tsx` - Other pages content

## Deploy

### Automatic Testing Environment Deployment

We have set up an automated deployment process for the testing environment. When code is merged into either the `main`
or `develop` branch, the system automatically deploys the changes to the testing environment. You can find the
deployment workflow configuration in `.github/workflows/deploy_dev.yml`.

### Manual Production Environment Deployment

To deploy changes to the production environment, follow these steps:

1. Visit the project's GitHub page.
2. Navigate to the "Actions" tab.
3. Click on "Manual Deploy to Production."
4. Select "Run workflow" to initiate a manual deployment to the production environment.

## Testing

Our testing framework of choice is Cypress. Comprehensive testing information will be provided in this section as the
project progresses.

```bash
pnpm run build
pnpm run start

pnpm run test
# or
pnpm run test:headless
```

Feel free to update this README with more details as the project evolves. If you have any questions or need further
assistance, please don't hesitate to reach out. Happy coding!
