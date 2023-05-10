const _handleFrontPage = () => {
  const ict4dLogin = document.getElementById("ict4d-login");
  const ict4dOpen = document.getElementById("ict4d-open");

  var domain = window.location.hostname;

  $.ajax({
    url: `${
      domain.includes("localhost")
        ? "http://localhost:3000"
        : "https://api.semencescertifiees.elch.cc"
    }/farmer/signedin`,
    type: "GET",
    xhrFields: {
      withCredentials: true,
    },
    success: function (user, textStatus, xhr) {
      if (xhr.status === 200) {
        if (user.loggedIn) {
          ict4dLogin.style.display = "none";
          ict4dOpen.style.display = "block";
          console.log("You are signed in");

          const language = user.language;

          _handleLanguage(language);
        } else {
          ict4dLogin.style.display = "block";
          ict4dOpen.style.display = "none";
          console.log("You are NOT signed in");
        }
      } else {
        ict4dLogin.style.display = "block";
        ict4dOpen.style.display = "none";
        console.log("You are NOT signed in");
      }
    },
    error: function (xhr, textStatus, errorThrown) {
      ict4dLogin.style.display = "block";
      ict4dOpen.style.display = "none";
      console.log("You are NOT signed in");
    },
  });

  document.getElementById("ict4d-show-certs").addEventListener("click", (e) => {
    e.preventDefault();

    window.location.href = "farmer";
  });
};

const _handleLogin = () => {
    const form = document.getElementById("ict4d-login-form");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const phone = document.getElementById("phone").value;
        const pin = document.getElementById("pin").value;

        var domain = window.location.hostname;

        $.ajax({
            url: `${
                domain.includes("localhost")
                    ? "http://localhost:3000"
                    : "https://api.semencescertifiees.elch.cc"
            }/farmer/login`,
            type: "POST",
            data: {
                phone: phone.toString(),
                pin: pin.toString(),
            },
            xhrFields: {
                withCredentials: true,
            },
            success: function (user, textStatus, xhr) {
                if (xhr.status === 200) {
                    window.location.href = "farmer";
                } else {
                    alert("Login failed");
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                alert("Login failed");
            },
        });
    });
};

const _handleLanguage = (lan) => {
  // get language from url "lan"
  if (lan === "") {
    // get language from url "lan"
    const urlParams = new URLSearchParams(window.location.search);
    lan = urlParams.get("lan");
  }

  if (lan === "fr") {
    document.getElementById("lan-phone").innerHTML = "Téléphone";
    document.getElementById("lan-pin").innerHTML = "PIN";
    document.getElementById("lan-login").innerHTML = "Connexion";
    document.getElementById("lan-show-certs").innerHTML = "Voir les certificats";
    document.getElementById("lan-impressum").innerHTML = "Impressum";
    document.getElementById("lan-lab-login").innerHTML = "Connexion laboratoire";	
    document.getElementById("lan-fr").innerHTML = "Français";
    document.getElementById("lan-en").innerHTML = "English";
  } else {
    document.getElementById("lan-phone").innerHTML = "Phone";
    document.getElementById("lan-pin").innerHTML = "PIN";
    document.getElementById("lan-login").innerHTML = "Login";
    document.getElementById("lan-show-certs").innerHTML = "Show certificates";
    document.getElementById("lan-impressum").innerHTML = "Impressum";
    document.getElementById("lan-lab-login").innerHTML = "Laboratory login";
    document.getElementById("lan-fr").innerHTML = "Français";
    document.getElementById("lan-en").innerHTML = "English";
  }
};

// run the function on page load
_handleFrontPage();
_handleLogin();
_handleLanguage("");