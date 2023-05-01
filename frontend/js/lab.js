const _handleFrontPage = () => {
    const ict4dLogin = document.getElementById("ict4d-login");
    const ict4dOpen = document.getElementById("ict4d-open");
  
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
            ict4dLogin.style.display = "none";
            ict4dOpen.style.display = "block";
            console.log("You are signed in");
          } else {
            ict4dLogin.style.display = "block";
            ict4dOpen.style.display = "none";
            console.log("You are NOT signed in");
          }
        } else {
          ict4dLogin.style.display = "block";
          ict4dOpen.style.display = "none";
          console.log("You are NOT signed in");
        }
      },
      error: function (xhr, textStatus, errorThrown) {
        ict4dLogin.style.display = "block";
        ict4dOpen.style.display = "none";
        console.log("You are NOT signed in");
      },
    });

    
    document.getElementById("ict4d-show-cert").addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = "certificates";
    });
}

const _handleLogin = () => {
    const form = document.getElementById("ict4d-login-form");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;

        var domain = window.location.hostname;

        $.ajax({
            url: `${
                domain.includes("localhost")
                    ? "http://localhost:3000"
                    : "https://api.semencescertifiees.elch.cc"
            }/laboratory/login`,
            type: "POST",
            data: {
                username: username.toString(),
                password: password.toString(),
            },
            xhrFields: {
                withCredentials: true,
            },
            success: function (user, textStatus, xhr) {
                if (xhr.status === 200) {
                    window.location.href = "certificates/";
                } else {
                    alert("Login failed");
                }
            },
            error: function (xhr, textStatus, errorThrown) {
                alert("Login failed");
            },
        });
    });
};

_handleFrontPage();
_handleLogin();