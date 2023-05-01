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

        certificates.forEach((certificate) => {
            // const create row
            const row = `
                <tr>
                    <td>${certificate.species}</td>
                    <td>${certificate.campaign}</td>
                    <td>${certificate.creation_date}</td>
                    <td><a href="cert?id=${certificate.id}">OPEN</a></td>
                </tr>`;
            table.innerHTML += row;
        });

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
          window.location.href = "";
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

_handleCertificates();
