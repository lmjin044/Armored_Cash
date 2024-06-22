$(document).ready(function() {
    const boardSize = 20;
    const $gameBoard = $("#gameBoard");

    // 게임 보드를 생성
    for (let i = 0; i < boardSize; i++) {
        let $row = $("<tr></tr>");
        for (let j = 0; j < boardSize; j++) {
            let $cell = $("<td></td>");
            $row.append($cell);
        }
        $gameBoard.append($row);
    }

    let snake = [{ x: 9, y: 10 }];
    let apple = { x: Math.floor(Math.random() * boardSize), y: Math.floor(Math.random() * boardSize) };
    let score = 0;
    let direction;
    let speed = 200;
    let level = 1;
    let obstacles = [];
    let timeSurvived = 0;
    const levelTime = 60;
    let timeLeft = 60; // 타이머 시간
    const $timer = $("#timer");

    $(document).keydown(directionControl);

    function directionControl(event) {
        if (event.which == 37 && direction != "RIGHT") direction = "LEFT";
        else if (event.which == 38 && direction != "DOWN") direction = "UP";
        else if (event.which == 39 && direction != "LEFT") direction = "RIGHT";
        else if (event.which == 40 && direction != "UP") direction = "DOWN";
    }

    function collision(newHead, array) {
        for (let i = 0; i < array.length; i++) {
            if (newHead.x == array[i].x && newHead.y == array[i].y) return true;
        }
        return false;
    }

    function updateLevel() {
        timeSurvived++;
        timeLeft--; // 타이머 감소
        $timer.text(timeLeft); // 타이머 업데이트

        if (timeLeft <= 0) {
            timeLeft = 60; // 타이머 리셋
            level++;
            alert(`Next level: ${level}`); // 다음 단계 알림
            if (level == 2) {
                speed /= 2;
                clearInterval(game);
                game = setInterval(draw, speed);
            } else if (level == 3) {
                generateObstacles();
            }
        }
    }

    function draw() {
        // 게임 보드 초기화
        $gameBoard.find("td").removeClass("snake apple obstacle");

        // 뱀을 그리기
        for (let i = 0; i < snake.length; i++) {
            let $cell = $gameBoard.find("tr").eq(snake[i].y).find("td").eq(snake[i].x);
            $cell.addClass("snake");
        }

        // 음식을 그리기
        $gameBoard.find("tr").eq(apple.y).find("td").eq(apple.x).addClass("apple");

        // 장애물을 그리기
        for (let i = 0; i < obstacles.length; i++) {
            $gameBoard.find("tr").eq(obstacles[i].y).find("td").eq(obstacles[i].x).addClass("obstacle");
        }

        let snakeX = snake[0].x;
        let snakeY = snake[0].y;

        if (direction == "LEFT") snakeX--;
        if (direction == "UP") snakeY--;
        if (direction == "RIGHT") snakeX++;
        if (direction == "DOWN") snakeY++;

        // 경계 체크
        if (snakeX < 0 || snakeY < 0 || snakeX >= boardSize || snakeY >= boardSize) {
            clearInterval(game);
            clearInterval(levelTimer);
            alert("Game Over");
            return;
        }

        if (snakeX == apple.x && snakeY == apple.y) {
            score++;
            do {
                apple = { x: Math.floor(Math.random() * boardSize), y: Math.floor(Math.random() * boardSize) };
            } while (collision(apple, snake) || collision(apple, obstacles));
        } else {
            snake.pop();
        }

        let newHead = { x: snakeX, y: snakeY };

        if (collision(newHead, snake) || collision(newHead, obstacles)) {
            clearInterval(game);
            clearInterval(levelTimer);
            alert("Game Over");
            return;
        }

        snake.unshift(newHead);
    }

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

    let game = setInterval(draw, speed);
    let levelTimer = setInterval(updateLevel, 1000);
});