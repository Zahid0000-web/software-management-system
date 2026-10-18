# Better Training Network

The public training-network website is served at `/`. The existing admin panel
remains available at `/login` and `/dashboard`.

## Local development

Install the frontend dependencies and start Vite:

```sh
npm install
npm run dev
```

Start the existing API in a second terminal:

```sh
npm --prefix Backend install
npm --prefix Backend run dev
```

Vite proxies `/api/*` to `http://localhost:5001` during development. Set
`VITE_API_URL` only when the API is hosted on a different origin; otherwise the
frontend uses same-origin `/api` requests.

## Deployment

The Vercel configuration deploys the frontend and `Backend` as services.
Requests to `/api/*` are sent to the backend service; all other routes go to
the frontend. Configure the database connection in the deployment environment
instead of committing credentials.
