//같은 html 내에서 실행되는 자바스크립트이므로 별개로 작성해도 문제없당

function timeStart(){
    setInterval(function(){
        time++;
        $("#step").text(`${time}초`);
    },1000);
}   //일종의 타이머 역할. 시간 계속 흐르는거 표현하는 목적

let clickStop = true;

function imgClick(){
    if(!clickStop) return; 
        //클릭 스탑이 거짓일 경우 시간이 흐르지 않는다.
    var idx = $(".item").index($(this));
        //몇 번째 div를 클릭했는지 인덱스 값으로 표시할 것
    var $clicking =  $(".item").eq(idx).find("img")
        //클릭한 div의 이미지 태그
        
    $clicking.removeClass("hide");
        //클릭한 이미지를 화면에 표시하는 방법 : hide 때문에 안 보이는거니까.
    $clicking.addClass("select");
    if(selectImg.length == 1){
        if(selectImg[0].div == idx) return; // 이미 클릭한 이미지는 다시 클릭해도 진행X

    }

    selectImg.push( {이미지:imgPlace[idx], div:idx} );
        //화면 클릭시 보이는 이미지 = imgPlace 배열 값을 imgName 배열의 인덱스로
        //imgPlace에 3이 있으면 imgName의 인덱스 중 3에 해당하는 이미지가 보이게끔
        //selectImg에 클릭한 인덱스와 div태그의 인덱스를 {} 방식을 이용해 저장
    if(selectImg.length === 2){
        //첫 번째~두 번째 선택한 이미지가 같으면 띄우고 다르면 1초 뒤에 감추기
        
        if(matching()){
            //두 이미지가 같을 경우
            $(".item").eq( selectImg[0].div).find("img").removeClass("select");
            $(".item").eq( selectImg[1].div).find("img").removeClass("select");
            //같은 이미지이므로 select 클래스(=빨간 테두리) 제거
            $(".item").eq( selectImg[0].div ).off("click");
            $(".item").eq( selectImg[1].div ).off("click");
            //똑같은 이미지를 선택했을 때 다시 클릭하지 않도록 클릭이벤트 해제

            selectImg = [];
                //비교가 끝날 적마다 다음을 위해 초기화 할 것

        }else{
            //두 이미지가 다를 경우 1초 뒤에 감추기
            clickStop = false;
            setTimeout(function(){
                $(".item").eq( selectImg[0].div).find("img").removeClass("select");
                $(".item").eq( selectImg[1].div).find("img").removeClass("select");
                $(".item").eq( selectImg[0].div).find("img").addClass("hide");
                $(".item").eq( selectImg[1].div).find("img").addClass("hide");
            },1000);
            selectImg = [];
            //비교가 끝날 적마다 다음을 위해 초기화 할 것
            clickStop = true;


        
        }
    }

    updateState();
}

function updateState(){
    clickCount++;
    $("#score").text(`점수 : ${score}점`);
    $("#click").text(`클릭횟수 : ${clickCount}/30`);

    if(clickCount == 31){
        $(".item").off("click");
        alert("횟수초과 게임 오버!");
    }
}

function matching(){//클릭한 2개 이미지 비교하기
    if(selectImg[0].이미지 === selectImg[1].이미지)
        return true;
    else
        return false;
}