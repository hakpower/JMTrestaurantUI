function login() {
  var m_id = $("#m_id").val();
  var password = $("#password").val();

  if (!m_id || m_id == "") {
    $("#m_id").focus();
    showAlert("아이디를 입력하세요.", 2);
    return false;
  }
  if (!password || password == "") {
    $("#password").focus();
    showAlert("비밀번호를 입력하세요.", 2);
    return false;
  }

  localStorage.clear();

  $.ajax({
    url: apiHostname + "/JMTrestaurantAPI/api/member/login",
    dataType: "json",
    type: "post",
    data: {
      m_id: m_id,
      password: password,
    },
    success: function (result) {
      var auth_token = "";
      if (result.status == "success") {
        if (result.data) {
          auth_token = result.data;
          localStorage.setItem("auth_token", auth_token);
          localStorage.setItem("redirectShowAlert", "loginComplete");
          pageInit();
          location.replace("./restaurant/index.html");
        } else {
          showAlert("아이디 및 비밀번호를 다시 한번 확인해주세요.", 2);
        }
      }
    },
  });
}
