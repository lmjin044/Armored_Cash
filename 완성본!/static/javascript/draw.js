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
    function draw() {
        if (!gameStarted) return;

        $gameBoard.find("td").removeClass("snake apple obstacle");

        for (let i = 0; i < snake.length; i++) {
            let $cell = $gameBoard.find("tr").eq(snake[i].y).find("td").eq(snake[i].x);
            $cell.addClass("snake");
        }

        $gameBoard.find("tr").eq(apple.y).find("td").eq(apple.x).addClass("apple");

        for (let i = 0; i < obstacles.length; i++) {
            $gameBoard.find("tr").eq(obstacles[i].y).find("td").eq(obstacles[i].x).addClass("obstacle");
        }

        let snakeX = snake[0].x;
        let snakeY = snake[0].y;

        if (direction == "LEFT") snakeX--;
        if (direction == "UP") snakeY--;
        if (direction == "RIGHT") snakeX++;
        if (direction == "DOWN") snakeY++;

        if (snakeX < 0 || snakeY < 0 || snakeX >= boardSize || snakeY >= boardSize) {
            gameOver();
            return;
        }

        if (snakeX == apple.x && snakeY == apple.y) {
            score++;
            $score.text(`점수: ${score}`);
            do {
                apple = { x: Math.floor(Math.random() * boardSize), y: Math.floor(Math.random() * boardSize) };
            } while (collision(apple, snake) || collision(apple, obstacles));
        } else {
            snake.pop();
        }

        let newHead = { x: snakeX, y: snakeY };

        if (collision(newHead, snake) || collision(newHead, obstacles)) {
            gameOver();
            return;
        }

        snake.unshift(newHead);
    }

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