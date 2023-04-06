import fastify from "fastify";
import formbodyPlugin from "@fastify/formbody";
import staticPlugin from "@fastify/static";
import nextPlugin from "@fastify/nextjs";
import path from "path";

const isDev = process.env.TUAARELEASEDEV === "true";

const app = fastify({ logger: isDev });

app.register(formbodyPlugin);

app.register(staticPlugin, {
  root: path.join(__dirname, "..", "../", "node_modules"),
  prefix: "/_/node_modules/",
  decorateReply: false,
});

app.register(staticPlugin, {
  root: path.join(__dirname, "..", "client", "public"),
  prefix: "/_/",
  decorateReply: false,
});

app.post("/_/login", (req, reply) => {
  reply.type("text/html");
  reply.send(
    `<script>window.userToken = "${
      (req.body as any).token
    }"</script><script type="module" src="/_/custom_js/login.js"></script>`
  );
});

app.register(nextPlugin, { dir: "src/client", dev: isDev }).after(() => {
  app.next("/_*");
});

app.listen({ port: 8876 });
