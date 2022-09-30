Node.js 팀 리포지토리

규칙

1. 미션의 경우 각자 브랜치를 만들어서 그 브랜치로 푸쉬하기

2. 트러블 슈팅의 경우 등록 된 이슈 템플릿에 맞춰서 등록 후 라벨 넣어주기


브랜치 사용법 (깃 브랜치 생성 & push 까즤~) 처음이면 참고 !
### 1) git 저장소 생성 (초기화)
git init
### 2) git 원격 저장소 연결
git remote add origin 
### 3) 브랜치 생성 후 바로 생성한 브랜치로 이동
git checkout -b <생성하고자 하는 나의 브랜치명> ('< >' 제외)
### 4) 모든 변경 사항을 다음 commit 에 반영
git add . (뒤에 .점 까지 찍어야함)
### 5) 메시지와 함께 commit 하기
git commit -m <commit 내용>
### 6) 원격 저장소에 push 하기
git push origin 브랜치 이름



https://eunhee-programming.tistory.com/256




