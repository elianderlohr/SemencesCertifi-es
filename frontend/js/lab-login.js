const _login = () => {
    console.log("login")
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

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
            username: username,
            password: password,
        },
        success: function (user, textStatus, xhr) {
            if (xhr.status === 200) {
                window.location.href = "../lab";
            } else {
                alert("Error");
            }
        },
        error: function (xhr, textStatus, errorThrown) {
            alert(errorThrown);
        },
    });
};

const _setup = () => {
    document.getElementById("login_button").addEventListener("click", _login);
};

_setup();