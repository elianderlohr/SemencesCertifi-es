const _handleCertificates = (search) => {
  // get certificates from ajax endpoint

  var domain = window.location.hostname;

  $.ajax({
    url: `${
      domain.includes("localhost")
        ? "http://localhost:3000"
        : "https://api.semencescertifiees.elch.cc"
    }/laboratory/certificates`,
    type: "GET",
    xhrFields: {
      withCredentials: true,
    },
    data: {
      search: search,
    },
    success: function (certificates, textStatus, xhr) {
      if (xhr.status === 200) {
        const table = document.getElementById("ict4d-table");
        table.innerHTML = "";

        certificates.forEach((certificate) => {
          // const create row
          const row = `
                  <tr>
                      <td>${certificate.phone}</td>
                      <td>${certificate.species}</td>
                      <td>${certificate.campaign}</td>
                      <td>${certificate.creation_date}</td>
                      <td><a href="show?id=${certificate.id}">VIEW</a> - <a href="update?id=${certificate.id}">EDIT</a> - <a href="#" onclick="_deleteCertificate(${certificate.id})">DELETE</a></td>
                  </tr>`;
          table.innerHTML += row;
        });
      } else {
        alert("Login failed");
        window.location.href = "/lab";
      }
    },
    error: function (xhr, textStatus, errorThrown) {
      alert("Login failed");
      window.location.href = "/lab";
    },
  });

  document.getElementById("ict4d-add-new").addEventListener("click", () => {
    window.location.href = "new";
  });

  document.getElementById("ict4d-lab-logout").addEventListener("click", () => {
    var domain = window.location.hostname;

    $.ajax({
      url: `${
        domain.includes("localhost")
          ? "http://localhost:3000"
          : "https://api.semencescertifiees.elch.cc"
      }/laboratory/logout`,
      type: "POST",
      xhrFields: {
        withCredentials: true,
      },
      success: function (data, textStatus, xhr) {
        console.log(xhr);
        if (xhr.status === 200) {
          window.location.href = "/lab/";
        } else {
          console.log(xhr);
          alert(xhr.responseText);
        }
      },
      error: function (xhr, textStatus, errorThrown) {
        console.log(xhr);
        alert(xhr.responseText);
      },
    });
  });
};

const _deleteCertificate = (id) => {
  var domain = window.location.hostname;

  $.ajax({
    url: `${
      domain.includes("localhost")
        ? "http://localhost:3000"
        : "https://api.semencescertifiees.elch.cc"
    }/certificate/`,
    type: "DELETE",
    xhrFields: {
      withCredentials: true,
    },
    data: {
      id: id,
    },
    success: function (certificates, textStatus, xhr) {
      if (xhr.status === 200) {
        alert("Certificate deleted");
        window.location.reload();
      } else {
        alert("Deletion failed");
      }
    },
    error: function (xhr, textStatus, errorThrown) {
      alert("Deletion failed");
    },
  });
};

const _handlePage = () => {
  var domain = window.location.hostname;

  $.ajax({
    url: `${
      domain.includes("localhost")
        ? "http://localhost:3000"
        : "https://api.semencescertifiees.elch.cc"
    }/laboratory/signedin`,
    type: "GET",
    xhrFields: {
      withCredentials: true,
    },
    success: function (user, textStatus, xhr) {
      if (xhr.status === 200) {
        if (user.loggedIn) {
          document.getElementById("ict4d-username").innerHTML = user.username;
        } 
      }
    },
  });

  // get "search" param from current url
  const urlParams = new URLSearchParams(window.location.search);
  const search = urlParams.get("search");

  _handleCertificates(search);
};

_handlePage();