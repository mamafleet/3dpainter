/* script.js */
//conventient failure messages
const Fs = ([cF, rF, uF, dF] = ["create", "read", "update", "delete"].map(
  (op) => `failed to ${op} translation[s]`
));

/* wapi setup */
const wapi = wapiInit("https://auth.web10.app");
const sirs = [
  {
    service: "voxel",
    cross_origins: ["mamafleet.github.io", "localhost"],
    whitelist: [{ username: ".*", provider: ".*", read: true }],
  },
];
wapi.SMROnReady(sirs, []);
authButton.onclick = wapi.openAuthPortal;

function initApp() {
  authButton.innerHTML = "log out";
  authButton.onclick = () => {
    wapi.signOut();
    window.location.reload();
  };
  const t = wapi.readToken();
  message.innerHTML = `hello ${t["provider"]}/${t["username"]},<br>`;
  readLines();
}

if (wapi.isSignedIn()) initApp();
else wapi.authListen(initApp);

function loadVoxelPainting() {
  if (username.value == "") username.value = "praemium-cranium";

  if (painting.value == "") painting.value = "main";
  history.pushState(
    {},
    null,
    `${window.location.pathname}?user=${username.value}&painting=${painting.value}`
  );
  wapi
    .read("voxel", {painting:painting.value}, username.value, "api.web10.app")
    .then((response) => displayVoxelPainting(response.data))
    .catch((error) => console.log(error));
}

function createVoxel (position,texture) {
    wapi
      .create("voxel", { position: position, texture: texture })
      .catch(
        (error) => (message.innerHTML = `${cF} : ${error.response.data.detail}`)
      );
  }

function deleteVoxel(position) {
    wapi
      .delete("voxel", { position: position, painting: painting.value })
      .catch(
        (error) => (message.innerHTML = `${dF} : ${error.response.data.detail}`)
      );
  }

