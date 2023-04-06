import PocketBase from "/_/node_modules/pocketbase/dist/pocketbase.es.mjs";

(async () => {
  const pb = new PocketBase("https://db.unusann.us");

  pb.autoCancellation(false);

  pb.authStore.save(window.userToken, null);

  await pb.collection("users").authRefresh();

  location.replace("/_/");
})();
