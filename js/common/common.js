$(function(){
    pageInit();

    if(localStorage.getItem('redirectShowAlert')){
        switch(localStorage.getItem('redirectShowAlert')){
            case 'loginComplete':
                showAlert('환영합니다!!', 1);
                break;
            case 'joinComplete':
                showAlert('축하합니다!! 가입이 완료되었습니다!!', 1);
                break;
            case 'addComplete':
                showAlert('맛집을 추가 완료하였습니다.', 1);
                break;
            case 'editComplete':
                showAlert('해당 맛집을 수정 완료하였습니다.', 1);
                break;
            case 'removeComplete':
                showAlert('해당 맛집을 삭제 완료하였습니다.', 2);
                break;
        }
        localStorage.setItem('redirectShowAlert',null);
    }
});

function pageInit(){
    $('.login_status').css('display','inline-block');

    if(localStorage.getItem('auth_token')){
        $('.login_status_n').css('display','none');
    }else{
        $('.login_status_y').css('display','none');
    }
};

function logout(){
    localStorage.clear();
    pageInit();
    showAlert('안녕히 가십시오.', 1);
}

function showAlert(msg, status, cb=null){
    $('#header>.alertContainer').remove();
    $('#header').append('<div class="alertContainer"><span class="msg">'+msg+'</span></div>');
    $('#header>.alertContainer').css('opacity','1');
    switch(status){
        case 1:
            $('#header>.alertContainer').css('background','linear-gradient(to top, white 1%, #05ef6db8 20%)');
            break;
        case 2:
            $('#header>.alertContainer').css('background','linear-gradient(to top, white 1%, #f90000b8 20%)');
            break;
        default:
            $('#header>.alertContainer').css('background','linear-gradient(to top, white 1%, #05ef6db8 20%)');
            break;
    }
    
    setTimeout(function(){
        $('#header>.alertContainer').animate({'opacity':'0'},1000,'swing',function(){
            if(cb){
                cb();
            }
        });
    },2000);
}