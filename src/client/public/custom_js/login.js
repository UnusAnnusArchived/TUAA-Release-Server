import PocketBase from "/_/public/node_modules/pocketbase/dist/pocketbase.es.mjs";

if (window.userToken === "canceled") {
  location.replace("/_");
} else {
  (async () => {
    const pb = new PocketBase("https://db.unusann.us");

    pb.autoCancellation(false);

    pb.authStore.save(window.userToken, null);

    await pb.collection("users").authRefresh();

    location.replace("/_");
  })().catch((err) => {
    console.log(err);
    document.write("<h1>An error has occurred!</h1>");
    document.write(`<code>${err}</code>`);
    document.write("<p>More info has been logged to console.</p>");
  });
}
