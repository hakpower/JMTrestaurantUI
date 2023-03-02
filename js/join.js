async function join() {
  var m_id = $("#m_id").val();
  var password = $("#password").val();
  var password_re = $("#password_re").val();
  var name = $("#name").val();
  var email = $("#email").val();

  if (!m_id || m_id == "") {
    $("#m_id").focus();
    showAlert('아이디를 입력하세요.', 2);
    return false;
  }
  if (!password || password == "") {
    $("#password").focus();
    showAlert('비밀번호를 입력하세요.', 2);
    return false;
  }
  if (!password_re || password_re == "") {
    $("#password_re").focus();
    showAlert('비밀번호 확인 차 다시 입력하세요.', 2);
    return false;
  }
  if (password != password_re) {
    $("#password").focus();
    showAlert('비밀번호가 일치하지 않습니다.', 2);
    return false;
  }
  if (!name || name == "") {
    $("#name").focus();
    showAlert('이름을 입력하세요.', 2);
    return false;
  }
  if (!email || email == "") {
    $("#email").focus();
    showAlert('이메일을 입력하세요.', 2);
    return false;
  }

  var check = await isExists(m_id).then(function (value) {
    return value;
  });

  if (check) {
    showAlert('이미 존재하는 아이디입니다.', 2);
    return false;
  }

  $.ajax({
    url: "http://localhost:8080/JMTrestaurantAPI/api/member/add",
    dataType: "json",
    type: "post",
    data: {
      m_id: m_id,
      password: password,
      name: name,
      email: email,
      age: 30,
      gender: "M",
    },
    success: function (result) {
      if (result.status == "success") {
        if (result.resultCode) {
          location.replace("./login.html");
          localStorage.setItem('redirectShowAlert','joinComplete');
        }
      }
    },
  });
}

async function isExists(m_id) {
  var check = false;

  await $.ajax({
    url: "http://localhost:8080/JMTrestaurantAPI/api/member/detail",
    dataType: "json",
    type: "post",
    data: {
      m_id: m_id,
    },
    success: function (result) {
      if (result.status == "success") {
        if (result.data) {
          check = true;
        } else {
          check = false;
        }
      }
    },
    error: function () {
      check = true;
    },
  });

  return check;
}
