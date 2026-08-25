# handoff.build-hello-page-end-to-end
- PR #9 updated on feature/build-hello-page-end-to-end-be.
- Frontend now reads NEXT_PUBLIC_API_URL with /api fallback and server-renders stored display text.
- Backend migration and /v1/display-text contract already in place; no backend code changed this round.
- Frontend build passes.
- Review risk: runtime must provide NEXT_PUBLIC_API_URL or /api proxy path.
