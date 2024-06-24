//초기 세팅을 위한 화면
/*익명 함수의 문제 : '이름이 없어서'실행이 안 될 수 있음
    >> 변수에 담아서 사용하면 이름이 있는 함수와 동일하게 사용할 수 있다.
*/
let boardInit;  //게임판 초기화 함수
let stateInit;  //게임판 현황 초기화 함수
let imgLocation //이미지 배치 함수
let start       //게임 시작 함수

//전역변수
let score = 0;      //점수
let time = 0;       //시간
let clickCount = 0; //클릭횟수
const imgName =["두리안.jpg", "람부탄.jpg", "망고.jpg", "바나나.jpg", "배.png",
                "수박.jpg", "용과.jpg", "자두.jpg", "파파야.jpg"
]   //두리안(=0번 인덱스)~파파야(=8번 인덱스)까지.

let imgPlace = [];  //이미지 배치 값(1,2,3,4,5...)
let selectImg = []; //선택 이미지 인덱스
let imgCount = 6;   //사용할 이미지 갯수

$(function(){
    boardInit();
    $("#start").click(start);
});

boardInit = function(){
    $(".item").each(function(i, v){
        /*.each : jQuery에서의 반복문(=for문) i는 인덱스, v는 div가 각각 들어옴
            this와 append에 의해 총 12개의 구문을 간단하게 표현할 수 있다.*/
        $(this).find("img").addClass("hide");
            // = 하위태그 명이 img인 것을 찾아 클래스명에 hide를 붙여라
        $(this).append(`<div class ="itemHide"></div>`);
    });
}

start = function(){
    stateInit();
    imgLocation();
    $(".item").on("click",(imgClick));
    timeStart();    //게임 진행 시간 시작
}

stateInit = function(){//게임 현황 초기화 함수
    //$("#state").show(); : 보이고 안 보이고 하는 표현은 jQuary니까 가능한거
    $("gameStart").addClass("hide");
    $("#state").removeClass("hide");
        //이상 게임 스타트가 되면 gameStart에 숨김처리 하고
        //state에는 class명에 hide를 붙인거 숨겨라
        //그리고 어지간해서는 클래스 명으로 처리하는걸 버릇 들여라
    $("#score").text(`점수 : ${score}`);
    $("#step").text(`${time}초`);
    $("#click").text(`클릭 횟수 : ${clickCount}/30`);
}

//이미지 배치 함수
imgLocation = function(){
    var temp=[];
    while(temp.length != imgCount){
        var tempNum = Math.floor(Math.random() * imgName.length);
        if(temp.indexOf(tempNum) == -1)
            temp.push(tempNum);
        //imgName의 인덱수 수만큼 랜덤하게 이미지를 뽑아내라 
        
    }
    console.log(temp);
    imgPlace=temp.concat(temp); //6개의 랜덤값을 2개 합쳐서 저장
        //.contat() = 2개의 배열을 1개로 합치는 방법
    imgPlace=shuffle();
    console.log(imgPlace);

    $(".item").each(function(i){
        $(this).find("img").attr("src","./static/image/"+imgName[ imgPlace[i] ] );
        $(this).find("img").removeClass("hide");
    });

    setTimeout(function(){
        $(".item>img").addClass("hide");
    } ,1000);
}



function shuffle(){
    for(var i=imgPlace.length -1; i>0; i--){
        //10부터 1까지 거꾸로.
        var j = Math.floor(Math.random() * (i+1));
        var t = imgPlace[i];
        imgPlace[i] = imgPlace[j];  //i와 j의 교환에는 제3의 변수가 필요
        imgPlace[j] = t;            //그 변수 역할로 t가

    }
    return imgPlace
}

