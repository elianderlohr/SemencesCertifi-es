const _handleSignedIn = () => {

    var domain = window.location.hostname;

    $.ajax({
        url: `${
          domain.includes("localhost")
            ? "http://localhost:3000"
            : "https://api.semencescertifiees.elch.cc/"
        }laboratory/signedin`,
        type: "GET",
        xhrFields: {
          withCredentials: true,
        },
        success: function (user, textStatus, xhr) {

            if (xhr.status === 200) {
                alert("You are signed in");
            } else {
                alert("You are not signed in");
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            alert("Error");
        },
    });
};

// run the function on page load
_handleSignedIn();