function print(){
    let div = document.getElementById("result");
    
    div.innerHTML = makeRandom();
}

function makeRandom(){
    let 내용 = ''; 
    for(let i = 0; i < 5; i++){         //5줄 표현
        var line='';
        for(let j = 0; j < 4; j++){     //4칸 표현
            let randomNumber = Math.floor(Math.random() * 50) + 1;
            line = line+randomNumber;

        }
        내용= 내용 + line + "<br>";

    }
    return 내용;
}

window.onload=function(){

}



/*
for (let i = 0; i < 5; i++) {              //i(행)이 5번째 줄
    let line = '';
    for (let j = 0; j < 4; j++) {          //j(열)이 4번째 칸
        let randomNumber = Math.floor(Math.random() * 50) + 1;
    }
    console.log(line.trim());

}

//for : 몇 번 반복할 것인지 알고 있을 때
//while : 몇 번 반복할 것인지 모를 때
*/
//window.onload : 여기서 안 쓰는 이유 / 화면은 클릭해야 나타나니까