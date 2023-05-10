function isInt(n){
  return Number(n) === n && n % 1 === 0;
}

function isFloat(n){
  return Number(n) === n && n % 1 !== 0;
}

const _updateCertificate = () => {
  var domain = window.location.hostname;

  // ensure input-phone, input-pin, input-species, input-campaign, input-germination, input-variety, input-batch, input-purity are not empty
  if (document.getElementById("input-phone").value === "")
  {
    alert("Phone must not be empty");
    return;
  }

  if (document.getElementById("input-pin").value === "")
  {
    alert("PIN must not be empty");
    return;
  }

  if (document.getElementById("input-species").value === "")
  {
    alert("Species must not be empty");
    return;
  }

  if (document.getElementById("input-campaign").value === "")
  {
    alert("Campaign must not be empty");
    return;
  }

  if (document.getElementById("input-germination").value === "")
  {
    alert("Germination must not be empty");
    return;
  }

  if (document.getElementById("input-variety").value === "")
  {
    alert("Variety must not be empty");
    return;
  }

  if (document.getElementById("input-batch").value === "")
  {
    alert("Batch must not be empty");
    return;
  }

  // ensure pin is 4 digits
  if (document.getElementById("input-pin").value.length !== 4)
  {
    alert("PIN must be 4 digits");
    return;
  }

  // ensure language is en or fr
  if (document.getElementById("input-language").value !== "en" && document.getElementById("input-language").value !== "fr")
  {
    alert("Language must be en or fr");
    return;
  }

  // ensure document.getElementById("input-germination").value and document.getElementById("input-purity").value are using decimal .
  if (document.getElementById("input-germination").value.includes(","))
  {
    alert("Germination must use decimal .");
    return;
  }

  if (document.getElementById("input-purity").value.includes(","))
  {
    alert("Purity must use decimal .");
    return;
  }

  $.ajax({
    url: `${
      domain.includes("localhost")
        ? "http://localhost:3000"
        : "https://api.semencescertifiees.elch.cc"
    }/certificate`,
    type: "POST",
    xhrFields: {
      withCredentials: true,
    },
    data: {
      phone: document.getElementById("input-phone").value,
      pin: document.getElementById("input-pin").value,
      species: document.getElementById("input-species").value,
      campaign: document.getElementById("input-campaign").value,
      germination: parseFloat(document.getElementById("input-germination").value),
      variety: document.getElementById("input-variety").value,
      batch_number: parseInt(document.getElementById("input-batch").value),
      purity: parseFloat(document.getElementById("input-purity").value),
      language: document.getElementById("input-language").value,
    },
    success: function (certificate, textStatus, xhr) {
      console.log(xhr);
      if (xhr.status === 200) {
        alert("Certificate added");
        window.location.href = "/lab/certificates/show/?id=" + certificate.id;
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
};

const _setup = () => {

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

  // create input-purity on text change event
  document.getElementById("input-purity").addEventListener("input", () => {
    if (document.getElementById("input-purity").value !== "")
    {
      var purityParsed = parseFloat(document.getElementById("input-purity").value);

      if (purityParsed > 0.98)
      {
        document.getElementById("ict4d-accepted").innerHTML = "ACCEPTED/ACCEPTÉ";
        document.getElementById("ict4d-accepted").style.color = "green";
      }
      else
      {
        document.getElementById("ict4d-accepted").innerHTML = "REJECTED/REJETÉ";
        document.getElementById("ict4d-accepted").style.color = "red";
      }

    }
    else
    {
      document.getElementById("ict4d-accepted").value = "";
    }
  });

  document.getElementById("ict4d-add-new").addEventListener("click", () => {
    _updateCertificate();
  });
};

_setup();
