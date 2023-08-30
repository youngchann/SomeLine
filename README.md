<h1>Environment Setup</h1>
<h2>Git Clone</h2>
<pre><code>mkdir project</code></pre>
<pre><code>git clone https://github.com/2023-AISCHOOL-APP/SomeLine.git</code></pre>

<h2>React, Firebase</h2>
<pre><code>cd someline/projectSomeLine</code></pre>
<pre><code>npm install</code></pre>
<p style="color: red">src 폴더에서 firebase-config.js 파일의 sdk 값을 변경해주세요!</p>
<pre><code>npm start</code></pre>

<h2>Flask, Machine Laearning, OepnAI API</h2>
<p style="color: red">Python 3.8버전으로 했습니다.</p>
<pre><code>cd someline/backend/test</code></pre>
<pre><code>pip install Flask konlpy nltk joblib openai flask-cors scikit-learn</code></pre>
<pre><code>python -m konlpy download</code></pre>
<p style="color: red">openai API키 설정하세요. 설정을 안하면 챗봇 제외 사용 가능</p>
<pre><code>python mltest.py</code></pre>
