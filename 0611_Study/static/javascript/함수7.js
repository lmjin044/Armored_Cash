
window.onload = function(){
    document.getElementById("calc").addEventListener( 'click', function(){
        buttonPress("");
    });
    var kor = Number(document.getElementById("kor").value);
    var mat = Number(document.getElementById("mat").value);
    var eng = Number(document.getElementById("eng").value);
    var his = Number(document.getElementById("his").value);
    
    총점계산(kor, mat, eng, his);
        //총점 계산을 먼저 실행하겠다는 명령어
} 

function buttonPress ( target ){

}

function 총점계산(a, b, c, d){    //총점 계산만 하는 함수
    var total = a + b + c + d;  
    평균계산( total );
}

function 평균계산( total ){    //평균 계산만 하는 함수
    var avg = total/4;
    출력( total, avg );
}

function 출력( calc ){    //총점과 평균을 화면에 출력하는 함수

    document.getElementById("total").innerText = `총점 : ${total}점`;
    document.getElementById("avg").innerText = `평균 : ${avg}점`;
}


