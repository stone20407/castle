document.addEventListener("DOMContentLoaded", () => {
    const mazeContainer = document.getElementById('maze');
    const ball = document.getElementById('ball');
    let ballPosition = { x: 2.2, y: 2.1 };
    const quizImages = {
        1: {image:'question1.jpg', answer: 'no'},
        2: {image: 'question2.jpg', answer: 'no'},
        3: 'question3.jpg',
        4: 'question4.jpg1',
        5: 'question5.jpg' }

    // 공을 초기 위치로 설정
    function setBallPosition(x, y) {
      ball.style.left = `${x * 8}px`;
      ball.style.top = `${y * 8}px`;
    }

    setBallPosition(ballPosition.x, ballPosition.y);

    // 키보드 이벤트로 공 움직이기
    document.addEventListener('keydown', (event) => {
      const key = event.key;
      let newX = ballPosition.x;
      let newY = ballPosition.y;

      if (key === 'ArrowUp' || key === 'w') {
        newY -= 1;
      } else if (key === 'ArrowDown' || key === 's') {
        newY += 1;
      } else if (key === 'ArrowLeft' || key === 'a') {
        newX -= 1;
      } else if (key === 'ArrowRight' || key === 'd') {
        newX += 1;
      }

      const nextCell = mazeArray[Math.floor(newY)][Math.floor(newX)];

      // 트랩에 도달했는지 확인
      if (typeof nextCell === 'object' && nextCell.hasOwnProperty('trap')) {
          showQuiz(nextCell.trap);
      }
  
      // 이동 가능한 경우에만 공을 새 위치로 이동시킵니다.
      if (typeof nextCell === 'number' && nextCell !== 1) {
          ballPosition.x = newX;
          ballPosition.y = newY;
          setBallPosition(newX, newY);
      } else if (typeof nextCell === 'object' && !nextCell.hasOwnProperty('wall')) {
          ballPosition.x = newX;
          ballPosition.y = newY;
          setBallPosition(newX, newY);
      }
  
      // 'bye' 셀에 도달했을 때 처리
      if (typeof nextCell === 'object' && nextCell.hasOwnProperty('bye')) {
          alert('축하합니다! 미로를 탈출했습니다!');
      }
  });

    // 퀴즈를 보여주는 함수
    function showQuiz(trapId) {
      const quizContainer = document.getElementById('quiz-container');
      const quizImage = document.getElementById('quiz-image');

      quizImage.src = quizImages[trapId];
      quizContainer.style.display = 'block';
    }
    const initialPosition = { x: 2.2, y: 2.1 };  // 공의 초기 위치

    function setBallPosition(x, y) {
    ball.style.left = `${x * 8}px`;
    ball.style.top = `${y * 8}px`;
}


    // 퀴즈 버튼 이벤트 핸들러
    document.getElementById('yes-button').addEventListener('click', () => {
      alert('정답입니다! 공이 시작지점으로 다시 되돌아 갑니다.');

      ballPosition.x = initialPosition.x;
      ballPosition.y = initialPosition.y;
      setBallPosition(ballPosition.x, ballPosition.y);

      // 다음 스테이지 로직 추가
      hideQuiz();
    });

    document.getElementById('no-button').addEventListener('click', () => {
      alert('틀렸습니다! 다시 시도하세요.');
      // 잘못된 답변 처리 로직 추가

    });

    // 퀴즈를 숨기는 함수
    function hideQuiz() {
      const quizContainer = document.getElementById('quiz-container');
      quizContainer.style.display = 'none';
    }
  });
