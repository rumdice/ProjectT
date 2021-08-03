# 리모트의 브랜치 목록 갱신
git remote update

# 해당하는 브랜치로 이동 (지금은 구분 없음 main)
git checkout main

# 활성 브랜치 확인
git branch

# Update
git pull

# 컴파일을 위해 상위 폴더로 이동
cd ~/ProjectT/

# 기존에 컴파일된 파일 삭제
rm -rf ./out/

# Compile
tsc
