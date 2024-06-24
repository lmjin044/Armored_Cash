$(function(){
    $("back").click(function(){
        $("#modal").hide();
    });

    $("#loginBt").click(function(){
        var id=$("#id");
        var pw=$("#pw");

        //아이디와 비번을 입력하지 않으면 로그인 진행 안되게 하기
        if(id.val() == '' || pw.val() == ''){
            alert("아이디 또는 비밀번호를 입력하세요");
            return;//둘 중 하나라도 입력하지 않으면 종료 처리할 것
        }

        //아이디와 비번 모두 입력 했으면 로그인 진행
        let user = JSON.parse(localStorage.getItem("user"));
        //아이디가 일치하는가?
        if(id.val() === user.id){
            //그럼 비밀번호는?
            if(pw.val() === user.pw){
                $(".member").html(`
                     <b>${user.id}</b>
                     <a href="javascript:window.location.reload()">
                     로그아웃</a>
                      `);
                $("#modal").hide();
                return;
            }
        }
        alert("아이디 또는 비밀번호가 올바르지 않습니다.")
    });


});


function login(){
    $("#modal").show();
}