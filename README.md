<h1>Environment Setup</h1>
<h2>Git Clone</h2>
<div style="background-color: beige">
    <p>> mkdir project</p>
    <p>> git clone https://github.com/2023-AISCHOOL-APP/SomeLine.git</p>
</div>

<h2>React, Firebase</h2>
<div style="background-color: beige">
    <p>> cd someline/projectSomeLine</p>
    <p>> npm install</p>
    <span style="color: red">src 폴더에서 firebase-config.js 파일의 sdk 값을 변경해주세요!</span>
    <p>> npm start</p>
</div>

<h2>Flask, Machine Laearning, OepnAI API</h2>
<div style="background-color: beige">
    <span style="color: red">Python 3.8버전으로 했습니다.</span>
    <br>
    <p>> cd someline/backend/test</p>
    <p>> pip install Flask konlpy nltk joblib openai flask-cors scikit-learn
    </p>
    <p>> python -m konlpy download</p>
    <p style="color: red">openai API키 설정하세요. 설정을 안하면 챗봇 제외 사용 가능</p>
    <p>> python mltest.py</p>
</div>
