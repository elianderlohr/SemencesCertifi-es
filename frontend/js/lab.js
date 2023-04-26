const _setup = () => {

    var domain = window.location.hostname;

    $.ajax({
        url: `${
          domain.includes("localhost")
            ? "http://localhost:3000/"
            : "https://api.semencescertifiees.elch.cc/"
        }laboratory/signedin`,
        type: "GET",
        xhrFields: {
          withCredentials: true,
        },
        success: function (user, textStatus, xhr) {

            if (xhr.status === 200) {
                if (user.loggedIn)
                    document.getElementById("signed-in").innerHTML = "You are signed in";
                else
                    document.getElementById("signed-in").innerHTML = "You are not signed in";
            } else {
                alert("Error");
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            alert(errorThrown);
        },
    });

    
}

_setup();