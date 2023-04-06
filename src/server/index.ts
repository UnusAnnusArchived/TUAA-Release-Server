import fastify from "fastify";
import next from "@fastify/nextjs";

const app = fastify();

app.register(next, { dir: "src/client", dev: process.env.TUAARELEASEDEV === "true" }).after(() => {
  fastify.next("/test");
});

app.get("/", async (req, res) => {
  res.type("text/html");
  return "<h1>test</h1>";
});

app.listen({ port: 8876 });
