$(function(){
    //회원가입 버튼 클릭 이벤트 등록
    //$("#signup").on('click',requiredCheck);
    $("#signup").on('click',function(){
        //체크박스들을 선택했을 경우 값이 어떻게 나오는가? : 배열로 나옴
        //:checked를 쓰지 않으면 선택값과 관계없이 무조건 첫번째 선택지
        /*
        let interest=$("input[name=interest]:checked").val();
        alert(interest);
        $("#signupForm").submit();*/

        let itr = $("input[name=interest]:checked");
        let value=[];
        for(var i=0; i<itr.length; i++){
            value.push( $(itr[i]).val()  );
        }

        alert("체크한 관심분야는? : " + value);
    });

    $("#portrait").on("change", function(e){
        //현재 선택한 파일에 대한 정보를 받을것
        var file =e.target.files[0];
            //input태그에 선택한 파일 정보(파일명, 유형, 수정일자, 크기 등)
        var reader = new FileReader();
            //자바스크립트에서 파일을 열기 위한 객체
        reader.onload=function(e){
            var path = e.target.result;

            $("#preview").css("background","url("+path+") no-repeat center");
            $("#preview").css("background-size", "cover")
        }

        reader.readAsDataURL(file);


//        console.log(e.target.result);
    });
});

function requiredCheck(){
    //필수 입력 요소를 모두 입력했는지를 확인
    //아이디 전부 끌고 오면 길어지기도 하고 읽기도 힘들어지니까 변수처리
    var id=$("#userId");
    var pw=$("#userPw");
    var re=$("#pwRd");
    var email=$("#email");
    var tel=$("#tel");
    var addr=$("#addr")

    if(id.var()==''){  
        alert("아이디를 입력하세요");
        id.focus();
    }else if(pw.var()==''){
        alert("비밀번호를 입력하세요");
        pw.focus(); re.val("");
    }else if(re.var()){
        alert("비밀번호확인을 입력하세요");
        re.focus();
    }else if(pw.var() != re.var()){
        alert("비밀번호가 맞지 않습니다");
        pw.var(""); re.var("");
        pw.focus();
    }else if(email.var()==''){
        alert("이메일을 입력하세요")
        email.focus();
    }else if(tel.var()==''){
        alert("연락처를 입력하세요")
        tel.focus();
    }else if(addr.var()==''){
        alert("주소를 입력하세요")
        addr.focus();
    }else{
        //위 if식이 모두 거짓일 경우 :
        //모두 거짓이다 = 모두 입력했다.
        $("#signupForm").submit();
    }

//button 태그로 하는 경우 포기해야 되는 것 : 이메일 형식 검증 기능
//더 정확히 말하면 form태그에서 제공하는 자동 검증 기능


}