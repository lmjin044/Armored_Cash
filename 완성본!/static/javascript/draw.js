$(document).ready(function() {
    const boardSize = 20;
    const $gameBoard = $("#gameBoard");

    let snake, apple, score, direction, speed, level, obstacles, timeSurvived, timeLeft, game, levelTimer;
    let gameStarted = false;

    const $timer = $("#timer");
    const $score = $("#score");
    const $titleScreen = $("#titleScreen");
    const $gameContainer = $("#gameContainer");
    const $gameOverScreen = $("#gameOverScreen");
    const $startButton = $("#startButton");
    const $restartButton = $("#restartButton");
    const $titleButton = $("#titleButton");

    // 게임 초기화 함수
    function initializeGame() {
        snake = [{ x: 9, y: 10 }];
        apple = { x: Math.floor(Math.random() * boardSize), y: Math.floor(Math.random() * boardSize) };
        score = 0;
        direction = undefined;
        speed = 200;
        level = 1;
        obstacles = [];
        timeSurvived = 0;
        timeLeft = 60;
        $score.text(`점수: ${score}`);
        $timer.text(timeLeft);
        gameStarted = false;

        initializeBoard(); // 게임 보드 초기화 호출
    }

    // 게임 보드 초기화 함수
    function initializeBoard() {
        $gameBoard.empty(); // 기존 게임 보드 비우기
        for (let i = 0; i < boardSize; i++) {
            let $row = $("<tr></tr>");
            for (let j = 0; j < boardSize; j++) {
                let $cell = $("<td></td>");
                $row.append($cell);
            }
            $gameBoard.append($row);
        }
    }

    // 게임 시작 함수
    function startGame() {
        initializeGame();
        $titleScreen.hide();
        $gameContainer.show();
        $gameOverScreen.hide();

        // 게임 시작 시 방향키 이벤트 리스너 추가
        $(document).on("keydown", directionControl);
        game = setInterval(draw, speed);
        levelTimer = setInterval(updateLevel, 1000);
        gameStarted = true; // 게임 시작 플래그 true로 설정
    }

    // 게임 종료 함수
    function gameOver() {
        clearInterval(game);
        clearInterval(levelTimer);
        $gameOverScreen.show();
        gameStarted = false; // 게임 시작 플래그 false로 설정
    }

    // 방향 제어 함수
    function directionControl(event) {
        if (!gameStarted) return; // 게임이 시작되지 않았으면 함수 종료

        if (event.which == 37 && direction != "RIGHT") direction = "LEFT";
        else if (event.which == 38 && direction != "DOWN") direction = "UP";
        else if (event.which == 39 && direction != "LEFT") direction = "RIGHT";
        else if (event.which == 40 && direction != "UP") direction = "DOWN";
    }

    // 충돌 체크 함수
    function collision(newHead, array) {
        for (let i = 0; i < array.length; i++) {
            if (newHead.x == array[i].x && newHead.y == array[i].y) return true;
        }
        return false;
    }

    // 레벨 업데이트 함수
    function updateLevel() {
        if (!gameStarted) return;

        timeSurvived++;
        timeLeft--;
        $timer.text(timeLeft);

        if (timeLeft <= 0) {
            timeLeft = 60;
            level++;
            alert(`Next level: ${level}`);
            if (level == 2) {
                speed /= 2;
                clearInterval(game);
                game = setInterval(draw, speed);
            } else if (level == 3) {
                generateObstacles();
            }
        }
    }

    // 그리기 함수
    // 숙제 : 수요일까지 함수에 관한 모든 부분에 주석을 달것.
    function draw() {
        if (!gameStarted) return; 
            // = 게임이 시작하지 않으면 동작하지 않도록 방지
        $gameBoard.find("td").removeClass("snake apple obstacle");
            // = 필드(gameBoard)의 td 영역에서 뱀, 사과, 방해물을 찾고 지운다.
            // 목적 : 해당 객체들이 화면에 그대로 남아있으면 새 시작에 방해 되므로
        for (let i = 0; i < snake.length; i++) {
            let $cell = $gameBoard.find("tr").eq(snake[i].y).find("td").eq(snake[i].x);
            $cell.addClass("snake");
            // = 반복문 : 스네이크를 tr에 위치한 snake[i].y에서 찾고, td에선 snake[i].x에서 추가
            //           snake 클래스에 더하도록 지정
        }

        $gameBoard.find("tr").eq(apple.y).find("td").eq(apple.x).addClass("apple");
            // = 스네이크를 추가하는 방식과 마찬가지로 사과도 추가(단 사과는 연장할 필요가 없으므로 배열 미사용)
        for (let i = 0; i < obstacles.length; i++) {
            $gameBoard.find("tr").eq(obstacles[i].y).find("td").eq(obstacles[i].x).addClass("obstacle");
            // = 장애물도 마찬가지지만 배열을 사용하는 이유는 동시에 2개 이상이 나올 수 있도록 하기 위함이며
            //   스네이크와 달리 클래스에 덧붙이지 않고 별개로 존재할 수 있게 한다. 

        }

        let snakeX = snake[0].x;
        let snakeY = snake[0].y;
            // = 각자 스네이크의 머리부분에 해당하는 x, y값(0은 스네이크 이름을 가진 배열의 첫 번째 인덱스)

        if (direction == "LEFT") snakeX--;
        if (direction == "UP") snakeY--;
        if (direction == "RIGHT") snakeX++;
        if (direction == "DOWN") snakeY++;
            // = 스네이크의 이동 방식을 설정(x 값이 -일때는 왼쪽, +는 오른쪽 / y값이 -일때는 위, +는 아래로)

        if (snakeX < 0 || snakeY < 0 || snakeX >= boardSize || snakeY >= boardSize) {
            gameOver();
            return;
        }   // = 게임 오버 조건을 정리함. 조건은 스네이크의 x와 y값 중 하나라도
            // 1) -이동(왼쪽, 위쪽)한 끝에 0에 도달하였는가?
            // 2) boardSize로 지정된 영역(오른쪽, 아래)의 값에 도달하였는가?
            // 1과 2에서 각기 지정된 조건 모두 합해 총 4개의 조건 중 하나라도 해당 될 경우(true)를 묻는다.

        if (snakeX == apple.x && snakeY == apple.y) {
            score++;
            $score.text(`점수: ${score}`);
            // = 스네이크의 머리(x와 y값 모두)가 사과의 x, y값 모두와 동일 한 지를 확인
            //   일치할 경우 score에 +값을 주며 '점수'로 지정한 텍스트에 반영한다.

            do {
                apple = { x: Math.floor(Math.random() * boardSize), y: Math.floor(Math.random() * boardSize) };
            } while (collision(apple, snake) || collision(apple, obstacles));
            // = 반복문 : 사과는 게임 중 지속-반복적으로 생성해야 함 
            //           랜덤한 x,y 좌표위로 사과를 생성하되 while 내에 설정된 조건(뱀, 장애물과 같은 위치인가?)을
            //           만족하지 않을 때까지. (뱀, 장애물의 생성위치와 충돌되지 않도록)

        } else {
            snake.pop();
            // = 그렇지 않으면(사과를 먹지 않으면) 스네이크의 길이를 유지
            //   이동할 경우 맨 뒤를 자르는 것으로 이동하는 것처럼 묘사를 한다.
        }

        let newHead = { x: snakeX, y: snakeY };
            // = 스네이크가 움직이는 새 기준이 될 머리의 위치를 지정
            //   스네이크의 머리를 각기 x, y로 지정하여 newHead라는 이름의 변수로 설정한다.

        if (collision(newHead, snake) || collision(newHead, obstacles)) {
            gameOver();
            return;
        }   // = newHead가 스네이크와 닿거나, 장애물과 닿았을 때 게임 오버 처리를 한다.

        snake.unshift(newHead);
    }       // = unshift : 배열이 시작하는 부분에 1개 이상의 요소를 추가하여 새 배열의 길이를 반환하는 역할
            //             지렁이가 움직일 때마다 newHead 배열의 시작 부분에 1개를 추가함
            //             snake.pop()이 꼬리를 잘라내고 이 구문은 머리를 추가하는 방식

    // 장애물 생성 함수
    function generateObstacles() {
        obstacles = [];
        for (let i = 0; i < 5; i++) {
            let obstacle = {
                x: Math.floor(Math.random() * boardSize),
                y: Math.floor(Math.random() * boardSize)
            };
            if (!collision(obstacle, snake) && !collision(obstacle, [apple])) {
                obstacles.push(obstacle);
            }
        }
    }

    // 게임 시작 버튼 클릭 이벤트 핸들러
    $startButton.click(function() {
        startGame();
    });

    // 게임 재시작 버튼 클릭 이벤트 핸들러
    $restartButton.click(function() {
        startGame();
    });

    // 타이틀로 돌아가기 버튼 클릭 이벤트 핸들러
    $titleButton.click(function() {
        $gameOverScreen.hide();
        $gameContainer.hide();
        $titleScreen.show();
    });
});