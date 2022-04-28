const URLRecipient = new URLSearchParams(window.location.search).get(
    "user"
  );
  if (URLRecipient) username.value = URLRecipient;


function readLines() {
    if (username.value == "")
  
    username.value = "praemium-cranium"
    history.pushState({}, null, `${window.location.pathname}?user=${username.value}`);
    wapi
      .read("translator", {}, username.value, "api.web10.app")
      .then((response) => displayTranslations(response.data))
      .catch((error) => console.log(error));
  }
  