//키보드를 눌렀다 떼면 신호'만' 전달함
//키보드를 떼야 키값을 전달함
//계속 키보드 키를 눌러도 키가 입력이 되면 : 
// 눌렀다는 신호가 여러번 전달되면 입력 처리로 변경

$(function(){
    $("#detail").keyup(function(){
        if($("#detail").val().length >=5 ){            
            $("#save").removeAttr('disabled');
            //5자 이상 이상 입력해야 버튼이 활성화
        }else{
            $("#save").attr('disabled', 'disabled');
            //5자 미만일 경우 다시 비활성화 처리가 됨
        }
    }); 

    //각 기능의 역할을 알람태그와 함께 알아보자
    //keydown : 키보드를 어쨌든 눌렀으므로 알람은 뜨지만 input 태그엔 표시 안 됨
    //keypress : 엔터, 스페이스 등의 키만 눌렀을 때 알람이 뜸
    //keyup : 키보드를 눌렀을 때는 알람이 안 뜨고 input태그에 표시 된 후 알람이 옴
    //그러므로 위 셋의 차이를 이해하고 알잘딱하게 써야 한다

    $("#save").click(function(){
        //$("#save").on.click(function(){})으로 해도 됨
        let text = $("#detail").val();
        addList( text ); //input 태그에 입력값 ul 넣을거임(※참조)
            if ( text === ''){ // =input 태그에 아무것도 없음
                alert("내용을 입력하세요")
                $("#detail").focus();
                return;// =함수를 즉시 종료시키겠다
            }
    });

});

function addList( text ){ //※ 상위 함수에 포함하지 않음
    //$("#list").html('<li>' + text + '</li>'); = 이렇게 하면 1개씩만 덮어쓰기
    $("#list").append('<li>' + text + '</li>'); 
        //=append를 써야 여러개의 리스트를 추가 가능
}

//자바스크립트에 ul 태그를 붙이다보면 인식이 안될 수도 있다.