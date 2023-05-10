const _handleCertificate = (id) => {
  // get certificates from ajax endpoint

  var domain = window.location.hostname;

  $.ajax({
    url:
      `${
        domain.includes("localhost")
          ? "http://localhost:3000"
          : "https://api.semencescertifiees.elch.cc"
      }/certificate/` + id,
    type: "GET",
    xhrFields: {
      withCredentials: true,
    },
    success: function (certificate, textStatus, xhr) {
      if (xhr.status === 200) {
        document.getElementById("ict4d-publicid").innerHTML =
          certificate.view_id;
        document.getElementById("ict4d-species").innerHTML =
          certificate.species;
        document.getElementById("ict4d-campaign").innerHTML =
          certificate.campaign;
        document.getElementById("ict4d-germination").innerHTML =
          certificate.germination;
        document.getElementById("ict4d-variety").innerHTML =
          certificate.variety;
        document.getElementById("ict4d-batch").innerHTML = certificate.batch_number;
        document.getElementById("ict4d-purity").innerHTML = certificate.purity;

        document.getElementById("ict4d-date").innerHTML = certificate.creation_date;

        document.getElementById("ict4d-accepted").innerHTML = certificate.accepted === 1 ? "ACCEPTED/ACCEPTÉ" : "REJECTED/REJETÉ";
        document.getElementById("ict4d-accepted").style.color = certificate.accepted === 1 ? "green" : "red";

        document.getElementById("ict4d-link").innerHTML = "https://semencescertifiees.elch.cc/view/?id=" + certificate.view_id;
        document.getElementById("ict4d-link").addEventListener("click", () => {
            // copy to clipboard
            const url = "https://semencescertifiees.elch.cc/view/?id=" + certificate.view_id;
            navigator.clipboard.writeText(url);
        });


      } else {
        alert(xhr.responseText);
        window.location.href = "/farmer";
      }
    },
    error: function (xhr, textStatus, errorThrown) {
      alert(xhr.responseText);
      window.location.href = "/farmer";
    },
  });
};

const _setup = () => {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get('id');

    _handleCertificate(id);

    document.getElementById("ict4d-farmer-logout").addEventListener("click", () => {
      var domain = window.location.hostname;
  
      $.ajax({
        url: `${
          domain.includes("localhost")
            ? "http://localhost:3000"
            : "https://api.semencescertifiees.elch.cc"
        }/farmer/logout`,
        type: "POST",
        xhrFields: {
          withCredentials: true,
        },
        success: function (data, textStatus, xhr) {
          if (xhr.status === 200) {
            window.location.href = "/";
          } else {
            alert("Logout failed");
          }
        },
        error: function (xhr, textStatus, errorThrown) {
          alert("Logout failed");
        },
      });
    });
};

const _handleFrontPage = () => {
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
          console.log("You are signed in");

          const language = user.language;

          _handleLanguage(language);
        } else {
          console.log("You are NOT signed in");
          _handleLanguage("");
        }
      } else {
        console.log("You are NOT signed in");
        _handleLanguage("");
      }
    },
    error: function (xhr, textStatus, errorThrown) {
      console.log("You are NOT signed in");
      _handleLanguage("");
    },
  });
};

const _handleLanguage = (lan) => {

  if (lan === "") {
    // get language from url "lan"
    const urlParams = new URLSearchParams(window.location.search);
    lan = urlParams.get("lan");
  }

  if (lan === "fr") {
    document.getElementById("ict4d-farmer-logout").innerHTML = "Déconnexion";
    document.getElementById("ict4d-lan-overview").innerHTML = "Aperçu de la certification";

    document.getElementById("ict4d-lan-id").innerHTML = "Identité publique:";
    document.getElementById("ict4d-lan-species").innerHTML = "Espèce:";
    document.getElementById("ict4d-lan-campaign").innerHTML = "Campagne:";
    document.getElementById("ict4d-lan-germ").innerHTML = "Germination:";
    document.getElementById("ict4d-lan-variety").innerHTML = "Variété:";
    document.getElementById("ict4d-lan-batch").innerHTML = "Lot:";
    document.getElementById("ict4d-lan-purity").innerHTML = "Pureté:";
    document.getElementById("ict4d-lan-date").innerHTML = "Date de création:";
    document.getElementById("ict4d-lan-accepted").innerHTML = "Aacceptée:";

    document.getElementById("ict4d-lan-share").innerHTML = "Partager:";
  } else {
    document.getElementById("ict4d-farmer-logout").innerHTML = "Logout";
    document.getElementById("ict4d-lan-overview").innerHTML = "Certification overview";

    document.getElementById("ict4d-lan-id").innerHTML = "Public ID:";
    document.getElementById("ict4d-lan-species").innerHTML = "Species:";
    document.getElementById("ict4d-lan-campaign").innerHTML = "Campaign:";
    document.getElementById("ict4d-lan-germ").innerHTML = "Germination:";
    document.getElementById("ict4d-lan-variety").innerHTML = "Variety:";
    document.getElementById("ict4d-lan-batch").innerHTML = "Batch:";
    document.getElementById("ict4d-lan-purity").innerHTML = "Purity:";
    document.getElementById("ict4d-lan-date").innerHTML = "Creation date:";
    document.getElementById("ict4d-lan-accepted").innerHTML = "Accepted:";

    document.getElementById("ict4d-lan-share").innerHTML = "Share:";
  }
};


_setup();
_handleFrontPage();
