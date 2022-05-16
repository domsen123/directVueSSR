import { static as expressStatic, type Application } from "express";
import { resolve } from "path";

export default ({ init }: { init: any }) => {
  init("routes.custom.before", ({ app }: { app: Application }) => {
    const tenantClient = resolve(__dirname, "client");
    const tenantServer = resolve(__dirname, "server");
    // This contains a list of static routes (assets)
    const { ssr } = require(resolve(tenantServer, "package.json"));

    // The manifest is required for preloading assets
    const manifest = require(resolve(tenantClient, "ssr-manifest.json"));

    // This is the server renderer we just built
    const { default: renderPage } = require(tenantServer);

    for (const asset of ssr.assets || []) {
      app.use(`/${asset}`, expressStatic(resolve(tenantClient, asset)));
    }

    app.get("*", async (req, res) => {
      const url = `${req.protocol}://${req.get("host")}${req.originalUrl}`;
      const { html, status, statusText, headers } = await renderPage(url, {
        manifest,
        preload: true,
        // Anything passed here will be available in the main hook
        request: req,
        response: res,
        initialState: {
          config: {
            mode: process.env.NODE_ENV,
            host: process.env.HOST ?? "0.0.0.0",
            port: process.env.PORT ? parseInt(process.env.PORT) : 8055,
            public_url: process.env.PUBLIC_URL ?? "http://localhost:8055",
          },
        },
      });
      res.type("html");
      res.writeHead(status || 200, statusText || headers, headers);
      res.end(html);
    });
  });
};
