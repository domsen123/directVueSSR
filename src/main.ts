import viteSSR from "vite-ssr/vue";
import devalue from "@nuxt/devalue";
import App from "./App.vue";
import { setAppConfig } from "./config";
import routes from "./routes";
import { createHead } from "@vueuse/head";

export default viteSSR(
  App,
  {
    transformState: (state) => (import.meta.env.SSR ? devalue(state) : state),
    routes,
  },
  async (ctx) => {
    const {
      app,
      initialState: { config },
    } = ctx;

    /* Sets the Application config
       See ./vite.config.ts in vite-ssr plugin for "initialState" (dev env.)
       See ./extension/index.ts for  for initialState (prod env.)
    */
    setAppConfig(config);

    // Install modules
    Object.values(import.meta.globEager("./modules/*.ts")).forEach((i) =>
      i.install?.(ctx)
    );

    // Create head
    const head = createHead();
    app.use(head);

    return { head };
  }
);
