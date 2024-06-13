//1)할일, 시간, 상태 박스에 입력한 텍스트를 데이터로 전달하기
$(function(){
    $("#enroll").click(function(){
        let workText = $("#work").val();
        let timeText = $("#time").val();
        let stateText = $("#state").val();

//2)입력된 데이터의 부재가 발생할 경우 경고 안내 발생시키기
        if (workText === '') {
            alert("할 일을 입력하세요.");
            $("#work").focus();
            return;
        }

        if (timeText === '') {
            alert("시간을 입력하세요.");
            $("#time").focus();
            return;
        }

        if (stateText === '') {
            alert("상태를 입력하세요.");
            $("#state").focus();
            return;
        }

//2-1)'상태'부분은 완료 혹은 진행중만 입력할 수 있고 그 외에는 경고 안내 발생시키기        
        if (stateText !== '완료' && stateText !== '진행중') {
            alert("상태는 '완료' 또는 '진행중'만 입력할 수 있습니다.");
            $("#state").focus();
            return;
        }

//3)정상적으로 입력된 데이터를 리스트화 시키기    
        addList(workText, timeText, stateText);
        
        $("#work").val('');
        $("#time").val('');
        $("#state").val('');
    });

//4)리스트 처리가 완료 된 데이터들을 html 화면으로 출력시키기    
    function addList(work, time, state) {
        let newTodoItem = `
            <ul class="todoItem">
                <li class="todo">${work}</li>
                <li class="todoTime">${time}</li>
                <li class="todoState">${state}</li>
            </ul>
        `;
        $("#todoList").append(newTodoItem);
    }
});