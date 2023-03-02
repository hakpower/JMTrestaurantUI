function add() {
  var name = $("#name").val();
  var addr = $("#addr").val();
  var content = $("#content").val();

  if (!name || name == "") {
    $("#name").focus();
    showAlert('맛집 이름을 입력하세요.', 2);
    return false;
  }
  if (!addr || addr == "") {
    $("#addr").focus();
    showAlert('주소를 입력하세요.', 2);
    return false;
  }
  if (!content || content == "") {
    $("#content").focus();
    showAlert('소개글을 입력하세요.', 2);
    return false;
  }

  $.ajax({
    url: "http://localhost:8080/JMTrestaurantAPI/api/restaurant/add",
    dataType: "json",
    type: "post",
    data: {
      name: name,
      addr: addr,
      content: content,
    },
    headers: {
      auth_check: "yes",
      auth_token: localStorage.getItem("auth_token"),
    },
    success: function (result) {
      if (result.status == "success") {
        if (result.resultCode) {
          location.replace("./index.html");
          localStorage.setItem('redirectShowAlert','addComplete');
        }
      }
    },
  });
}
