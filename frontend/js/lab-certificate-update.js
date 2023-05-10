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
          document.getElementById("input-phone").value = certificate.phone;
          document.getElementById("input-species").value =
            certificate.species;
          document.getElementById("input-campaign").value =
            certificate.campaign;
          document.getElementById("input-germination").value =
            certificate.germination;
          document.getElementById("input-variety").value =
            certificate.variety;
          document.getElementById("input-batch").value = certificate.batch_number;
          document.getElementById("input-purity").value = certificate.purity;
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
  };

  const _updateCertificate = (id) => {
    var domain = window.location.hostname;

    $.ajax({
      url:
        `${
          domain.includes("localhost")
            ? "http://localhost:3000"
            : "https://api.semencescertifiees.elch.cc"
        }/certificate/update/`,
      type: "POST",
      xhrFields: {
        withCredentials: true,
      },
      data: {
        id: id,
        phone: document.getElementById("input-phone").value,
        pin: document.getElementById("input-pin").value,
        species: document.getElementById("input-species").value,
        campaign: document.getElementById("input-campaign").value,
        germination: document.getElementById("input-germination").value,
        variety: document.getElementById("input-variety").value,
        batch: document.getElementById("input-batch").value,
        purity: document.getElementById("input-purity").value,
      },
      success: function (certificate, textStatus, xhr) {
        if (xhr.status === 200) {
          alert("Certificate updated");
          window.location.href = "/lab/certificates/show/?id=" + id;
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
  };
  
  
  const _setup = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const id = urlParams.get('id');
  
      _handleCertificate(id);

      document.getElementById("ict4d-update").addEventListener("click", () => {
        _updateCertificate(id)
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
              window.location.href = "/lab";
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
  
  _setup();
