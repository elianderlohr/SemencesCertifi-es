const _handleCertificates = () => {
  // get certificates from ajax endpoint

  var domain = window.location.hostname;

  $.ajax({
    url: `${
      domain.includes("localhost")
        ? "http://localhost:3000"
        : "https://api.semencescertifiees.elch.cc"
    }/farmer/certificates`,
    type: "GET",
    xhrFields: {
      withCredentials: true,
    },
    success: function (certificates, textStatus, xhr) {
      if (xhr.status === 200) {
        const table = document.getElementById("ict4d-table");
        table.innerHTML = "";

        if (certificates.length === 0) {
          const row = `
                <tr>
                    <td colspan="4">No certificates found</td>
                </tr>`;
          table.innerHTML += row;
        } else {
          certificates.forEach((certificate) => {

            let accepted = certificate.accepted;
            if (certificate.accepted === 1)
              accepted = "Accepted";
            else if (certificate.accepted === 0)
              accepted = "Rejected";
              
            // const create row
            const row = `
                <tr>
                    <td>${certificate.species}</td>
                    <td>${certificate.campaign}</td>
                    <td>${certificate.creation_date}</td>
                    <td>${accepted}</td>
                    <td><a href="cert?id=${certificate.id}">OPEN</a></td>
                </tr>`;
            table.innerHTML += row;
          });
        }
      } else {
        alert("Login failed");
        window.location.href = "/";
      }
    },
    error: function (xhr, textStatus, errorThrown) {
      alert("Login failed");
      window.location.href = "/";
    },
  });

  document
    .getElementById("ict4d-farmer-logout")
    .addEventListener("click", () => {
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

const _handlePage = () => {
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
          document.getElementById("ict4d-phone").innerHTML = user.phone;
        } 
      }
    },
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

    document.getElementById("ict4d-lan-loggedin").innerHTML = "Connecté en tant que:";

    document.getElementById("ict4d-lan-species").innerHTML = "Espèce";
    document.getElementById("ict4d-lan-campaign").innerHTML = "Campagne";
    document.getElementById("ict4d-lan-date").innerHTML = "Date de création";
    document.getElementById("ict4d-lan-action").innerHTML = "Action";
  } else {
    document.getElementById("ict4d-farmer-logout").innerHTML = "Logout";
    document.getElementById("ict4d-lan-overview").innerHTML = "Certification overview";

    document.getElementById("ict4d-lan-loggedin").innerHTML = "Logged in as:";

    document.getElementById("ict4d-lan-species").innerHTML = "Species";
    document.getElementById("ict4d-lan-campaign").innerHTML = "Campaign";
    document.getElementById("ict4d-lan-date").innerHTML = "Creation date";
    document.getElementById("ict4d-lan-action").innerHTML = "Action";
  }
};

_handleCertificates();
_handlePage();
_handleFrontPage();
