const _handleCertificate = (id) => {
  // get certificates from ajax endpoint

  var domain = window.location.hostname;

  $.ajax({
    url:
      `${
        domain.includes("localhost")
          ? "http://localhost:3000"
          : "https://api.semencescertifiees.elch.cc"
      }/certificate/view/` + id,
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

        document.getElementById("ict4d-date").innerHTML =
          certificate.creation_date;

          document.getElementById("ict4d-accepted").innerHTML = certificate.accepted === 1 ? "ACCEPTED/ACCEPTÉ" : "REJECTED/REJETÉ";
        document.getElementById("ict4d-accepted").style.color =
          certificate.accepted === 1 ? "green" : "red";
      } else {
        alert("Login failed");
        window.location.href = "";
      }
    },
    error: function (xhr, textStatus, errorThrown) {
      alert("Login failed");
      window.location.href = "";
    },
  });
};

const _handleLanguage = (lan) => {
  if (lan === "fr") {
    document.getElementById("ict4d-lan-overview").innerHTML =
      "Aperçu de la certification";

    document.getElementById("ict4d-lan-id").innerHTML = "Identité publique:";
    document.getElementById("ict4d-lan-species").innerHTML = "Espèce:";
    document.getElementById("ict4d-lan-campaign").innerHTML = "Campagne:";
    document.getElementById("ict4d-lan-germ").innerHTML = "Germination:";
    document.getElementById("ict4d-lan-variety").innerHTML = "Variété:";
    document.getElementById("ict4d-lan-batch").innerHTML = "Lot:";
    document.getElementById("ict4d-lan-purity").innerHTML = "Pureté:";
    document.getElementById("ict4d-lan-date").innerHTML = "Date de création:";
    document.getElementById("ict4d-lan-accepted").innerHTML = "Aacceptée:";

    document.getElementById("ict4d-lan-lan").innerHTML = "Langue:";
    document.getElementById("ict4d-french").innerHTML = "Français";
    document.getElementById("ict4d-english").innerHTML = "English";
  } else {
    document.getElementById("ict4d-lan-overview").innerHTML =
      "Certification overview";

    document.getElementById("ict4d-lan-id").innerHTML = "Public ID:";
    document.getElementById("ict4d-lan-species").innerHTML = "Species:";
    document.getElementById("ict4d-lan-campaign").innerHTML = "Campaign:";
    document.getElementById("ict4d-lan-germ").innerHTML = "Germination:";
    document.getElementById("ict4d-lan-variety").innerHTML = "Variety:";
    document.getElementById("ict4d-lan-batch").innerHTML = "Batch:";
    document.getElementById("ict4d-lan-purity").innerHTML = "Purity:";
    document.getElementById("ict4d-lan-date").innerHTML = "Creation date:";
    document.getElementById("ict4d-lan-accepted").innerHTML = "Accepted:";

    document.getElementById("ict4d-lan-lan").innerHTML = "Language:";
    document.getElementById("ict4d-french").innerHTML = "French";
    document.getElementById("ict4d-english").innerHTML = "Anglais";
  }
};

const _setup = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  document.getElementById("ict4d-english").addEventListener("click", () => {
    console.log("english");
    _handleLanguage("en");
  });

  document.getElementById("ict4d-french").addEventListener("click", () => {
    console.log("french");
    _handleLanguage("fr");
  });

  _handleCertificate(id);
};

_setup();
