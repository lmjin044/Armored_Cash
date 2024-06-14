$(function(){
    $("#start").click(start);     //1)start 버튼을 클릭하면 start 함수를 시전할거
});

let endCount = 0;                   //2-2)카운트를 세기 위한 전역변수를 설정

let playMin = 0;                    //2-4)시간 경과를 위한 분 단위 전역변수 설정
let playSec = 0;                    //2-5)시간 경과를 위한 초 단위 전역변수 설정
    //분 초를 왜 전역으로? : 게임을 진행함과 동시에 시간 또한 흘러야 함
    //(setInterval, setTimeout 을 사용하기 위함 : setInterval은 시간이 계속 흐름)
let time = 0;                       //2-6)setInterval의 핸들값(=기준)
let bingo = [];                     //3-1)25개 숫자 저장할 배열 선언

function bingoCheck(){
    //☆jQuery에서 CSS 넣는 방법 : .css.('속성', '값');
    $(this).css('background', 'blue');  //5-3)클릭한 칸의 속성이 변경되도록 함 그 1
    $(this).css('color', 'white');      //그 2

}

//클릭한 td에 표시된 숫자를 배열에서 0으로 변경
//배열에서 0이 지정된 곳 = 클릭한 숫자

var idx = $(".num").index(this);     //클릭한 td의 인덱스는 몇 번째?
bingo[idx] = 0;                      //해당 td위치와 같은 bingo의 배열을 0으로 변경
    //예시 : 4번째 td 클릭시 해당 인덱스값은 3 >> bingo[3] = 0으로 하겠다는 그런거



function start() {                  //2)빙고 게임을 위한 숫자를 배치 /  
    $(".num").click(bingoCheck);    //5)클릭 시 색 변화 시키기(시작을 한 후에 영향 있도록)
    $("#start").hide();             //1)빙고 시작 버튼 감추기
        //혹은 $(this).hide(); << this = 현재 함수를 실행한 객체 
    $("#screen").show();            //2)빙고진행상황 보이기
        //아직 시작하지 않았으므로 완성 빙고는 0, 플레이타임은 초단위로 보여줘야 함
    $("#ok").text(endCount);        //2-1)빙고가 1줄 씩 완성되면 카운트가 1씩 올라야 함

    $("#playTime").text('00:00');  //2-9)1초 지나야 setInterval이 실행되기 때문에 00:00 표기용
    time = setInterval(function(){ //2-7)실시간으로 시간이 흘러가기 위한 함수
        playSec++;                 //2-10).8에서 설정한 1초만큼 1씩 증가를 시킨다.
        if(playSec == 60){         //2-13)초가 60이 되는 순간 
            playMin++;              //1분이 되고
            playSec = 0;            //초는 다시 0처리
        }
        var secText = playSec<=9 ? '0'+playSec : playSec;
        var minText = playMin<=9 ? '0'+playMin : playMin;
            //2-12)초, 분 둘 다 9를 넘어가기 전에는 0을 붙여 표현하도록 변수를 만듬.
        var timeText = `${minText}:${secText}`;   //2-11)분과 초의 합으로 타이머를 구성해야 함
        $("#playTime").text(timeText);     //2-3)플레이타임의 시간 경과를 표시해야 한다.                                           
    }, 1000);                      //2-8)텍스트 내 변수의 내용을 1초마다 지속적으로 변화시킬것
        //※함수에서의 시간은 mS(밀리세컨드 = 1/1000초) 기준임.
        
    init();                         //3)25개의 숫자를 배열에 저장하기
    draw();                         //4)화면에 출력하기
};

function init(){                    //3.1)저장할 25개 랜덤 숫자 형성하기
    while(bingo.length!=25) {
        var tmp = Math.floor(Math.random() * 50) + 1;
        if(bingo.indexOf(tmp) == -1);
        bingo.push(tmp)
    }
}

function draw(){                    //4.1)미리 만들어둔 5X5칸에 배치해 출력
    var td = $(".num");             //4-2)class 호출 할 때는 . 쓴다! (id가 #)
    for(var i=0; i<td.length; i++){ //4-3)td.length = 25를 console.log로 확인
        td.eq(i).text(bingo[i]);    //4-4)객체형 배열로 정의
        
    }  /*td[i].text(bingo[i]); 로만 하면 오류 뜸.
       */

    //좌상단 기준 인덱스 값은 0~24으로 되어있음
}


