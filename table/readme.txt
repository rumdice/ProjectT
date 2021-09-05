해당 폴더는 초기 설정 작업이 필요함.
다른 경로의 git repo의 변화를 감지하기
해당 repo의 특정 파일만 감지하기

로컬의 경우 이 폴더로 들어와서
git bash cmd로 작업하기

서버에서 구동할 경우 서버의 터미널에 직접 접근하여 동일 작업 필요.
서버 머신의 해당 폴더 tables 직접 설정 필요


1. 커맨드 실행 (초기 셋팅)
git init
git config core.sparseCheckout true
git remote add -f origin https://github.com/rumdice/UnityProject.git
echo "Table/*" >> .git/info/sparse-checkout
(필요 파일만 받게 수정 할 수 있는지 알아 볼 것)
git pull origin master

이후로는
git pull origin master


2. 설정 파일 수정
git credential 저장
vi .git/config

[credential]
        helper = store
		
파일 수정하고 저장


3. 기타 특이사항
error: cannot lock ref 'refs/remotes/origin 메시지가 뜨는데 일단 기대한 대로 동작함
