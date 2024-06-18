const com = ["scissors.png", "rock.png", "paper.png"];
let record = []
    //전적 저장용
let comHd = 0;
    //컴퓨터 쪽 이미지 보이기 위한 setInterval용 값
let comSelect = 0;
    //컴퓨터 가위바위보 값

$(function(){
    let storageData = JSON.parse(localStorage.getItem("record"));
    if(storageData){
        record=storageData;

        //전적배열 초기화 세팅
        //각각 유저, 컴퓨터, 결과의 내용을 저장할 영역

    }else{
        console.log("storage 저장 데이터 없음");
    }

    $("#comImg").attr('src', './static/image/' + com[0]);
        //가위가 표시되도록 이미지 경로를 불러오는 방법
    $("#game").click(startAndStop);
        //시작을 눌렀을 때 게임이 시작되도록 하는 방법
    $("#record").click(gameRecord);
        
});

function gameRecord(){
    $("#modal").show(); 
        //모달 창 보이기
    $("#data").empty(); 
    // 기존 데이터를 초기화
        for(var i = 0; i<record[0].length; i++){
            $("#data").append(`
                <tr>
                    <td class="user"><img src = "./static/image/${record[0][i]}></td>
                    <td class="com"><img src = "./static/image/${record[1][i]}></td>
                    <td class="outcoome">${record[2][i]}</td>
                </tr>
                `);
            //이렇게 해야 기존 데이터 다음에 추가가 가능함
        }

    $("#modalBackground").click(function(){
        $("#modal").hide();
        }); //모달 창 감추기

}


function startAndStop(){
    if($(this).text() == "종료"){    //=게임 시작 후
        $(this).text("시작");
        clearInterval(comHd);
            //setInterval로 변화하는 이미지의 종료
        $(".userImg").off('click');
            //마찬가지로 종료 시에 유저의 가위바위보 클릭 이벤트 해제
    }else{
        $(this).text("종료");       //=게임 시작 전
        comStart(); 
            //컴퓨터의 이미지 변경(+셋인터벌)
        $(".userImg").click(userSelect);
            //유저의 가위바위보 선택(클릭) 이벤트
    }   
}

//시작을 누르면 종료가 되고 다시 종료 상태의 버튼을 누르면 시작으로 돌아오게

function userSelect(){
    var idx = $(".userImg").index($(this)); 
        //내가 클릭한 가위바위보 찾기
        //= 배열로 가져온 userImg 클래스 중 클릭한 인덱스가 몇 번인지 찾기

        $(this).css('border', '1px solid black');
            //내가 클릭한 이미지 표시
        clearInterval(comHd);
            //컴퓨터의 이미지 변경 하는 것도 동시에 멈춰져야 함

        outcome(idx, comSelect);
            //승,패,무 표시하기

        setTimeout(function(){
            comStart();
                //다시 컴퓨터의 가위바위보 이미지 변경

            $(".userImg").eq(idx).css('border', '');
                //특정 스타일 해제할 때 사용 
                //전부 삭제는 $(this).removeAttr('style')
            $(".result").remove();
                //remove : 태그를 전부 제거
        }, 3000);
        //지정된 시간 이후에 한 번 실행하고 끝나도록 하는 것
}



function outcome(u, c){ //u=유저, c=컴퓨터 / 0=가위 1=바위 2=보
    var result = "승";
    var minus= u-c;
        //-2, 1유저승 <->0은 비김 . -1, 2는 유저패
    switch(minus){
        case 0: result ="무"; break;
        case -1:
        case 2: result ="패"; break;
        }

        //이하 영역은 전적 버튼을 누르면 보여지게 만들 자리
        
        record[0].push(com[u]);  // = 유저이력을 저장
        record[1].push(com[c]);   // = 컴퓨터 이력을 저장
        record[2].push(result);   // = 승부결과 이력을 저장

        localSave();    //브라우저에 데이터로 저장하는 방법

    $("body").append(`<div class = "result"> ${result} </div>`);
}


function comStart(){
    comHd = setInterval(function(){
        if(comSelect == 2 ) comSelect = -1;                
            //이미지 인덱스가 2가 되었을 때 다시 0으로 돌아가야 한다
            //-1을 주는 이유는 이미 아래 +1 명령이 있어서 0으로 전제를 두면 시작은 1임
            //증감연산자가 앞 혹은 뒤에 붙는 것에 따라 if 구문에 쓰이는 조건도 달라짐
        $("#comImg").attr('src', './static/image/' + com[++comSelect]); 
            //인덱스 값이 0이나 1이면 인덱스 값을 1씩 더해 이미지를 출력해라

    },100 );     //지정된 시간(밀리세컨드)에 한 번씩 실행

}

function localSave(){
    let recordJSON = JSON.stringify(record);
        //숫자를 문자열로 바꿀 때는? 숫자 +""
    localStorage.setItem("record", recordJSON);
    /*
    localStorage.setItem("name", "data");
        //이 함수를 이용해 브라우저 내에 상황을 저장할 수 있다.
        //name에 data가 저장되는 방식   =문자열만 데이터로 저장
        //인터넷 기록 삭제가 되어야 데이터가 삭제 됨
        //JSON.stringify() = JSON이라는 문자열로 변환시켜 줌
        //잘 사용하지 않는 이유 : 너무 많은 데이터를 저장해 사용자 컴퓨터에 부담됨
    */

}
