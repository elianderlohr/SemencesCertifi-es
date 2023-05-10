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

          document.getElementById("ict4d-accepted").innerHTML = certificate.accepted === 1 ? "ACCEPTED/ACCEPTÉ" : "REJECTED/REJETÉ";
          document.getElementById("ict4d-accepted").style.color = certificate.accepted === 1 ? "green" : "red";
          
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
  };
  
  const _setup = () => {
      const urlParams = new URLSearchParams(window.location.search);
      const id = urlParams.get('id');

      _handleCertificate(id);

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
  
  _setup();
  