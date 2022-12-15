document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {
  $(document).ready(function () {
    const rootUrl = "https://tolulopebamisile.000webhostapp.com/";

    const url = `${rootUrl}/wp-json/wp/v2/posts`;

    const tokenUrl = `${rootUrl}/wp-json/jwt-auth/v1/token`;

    const adminDet = {
      username: "admin",
      password: "Webhost1234##",
    };
    let token;
    loadData();

    $.post(tokenUrl, adminDet, function (data, status) {
      console.log("token: " + data.token);
      token = data.token;
    });

    function loadData() {
      $.getJSON(url, function (data) {
        console.log(data);

        $("#spinner").remove();

        $("#mainDiv").empty();

        for (let i = 0; i < data.length; i++) {
          const div = document.createElement("div");
          div.innerHTML = `
 <div class="card pt-1">
 <div class="card-body">
 <h4 class="card-title">${data[i].title.rendered}</h4>
 <p class="card-text textwrap">${data[i].content.rendered}</p>
 </div>
 </div>
 `;
          $("#mainDiv").append(div);
        }
      });
    }

    $("form").submit(function (event) {
      event.preventDefault();
      const formData = {
        title: $("input[name=title]").val(),
        content: $("textarea[name=content]").val(),
        status: "publish",
      };

      console.log(formData);
      $.ajax({
        url: url,
        method: "POST",
        data: JSON.stringify(formData),
        crossDomain: true,
        contentType: "application/json",
        headers: {
          Authorization: "Bearer " + token,
        },
        success: function (data) {
          console.log(data);
          /**
           * refreshes app-content to display latest posts
           */
          loadData();
        },
        error: function (error) {
          console.log(error);
        },
      });
    });

    return false;
  });
}
