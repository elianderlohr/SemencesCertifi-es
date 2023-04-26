const _handleSignedIn = () => {

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
                    document.getElementById("test").innerHTML = "You are signed in";
                else
                    document.getElementById("test").innerHTML = "You are not signed in";
            } else {
                alert("Error");
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            alert(errorThrown);
        },
    });
};

const _login = () => {
    var domain = window.location.hostname;

    $.ajax({
        url: `${
            domain.includes("localhost")
                ? "http://localhost:3000/"
                : "https://api.semencescertifiees.elch.cc/"
        }laboratory/login`,
        type: "POST",
        xhrFields: {
            withCredentials: true,
        },
        data: {
            username: "lb1",
            password: "test",
        },
        success: function (user, textStatus, xhr) {
            if (xhr.status === 200) {
                _handleSignedIn();
            } else {
                alert("Error");
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            alert(errorThrown);
        },
    });
};

// run the function on page load
_login();
