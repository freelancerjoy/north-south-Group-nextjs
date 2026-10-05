// Keep browser requests on the frontend origin. Next.js proxies this path to
// the live API via next.config.mjs, so stale hosting env values cannot override it.
export const API_BASE_URL = "/api/v1";
