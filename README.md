
# wisebirds-project

## 프로젝트 화면
![캡쳐1](https://github.com/user-attachments/assets/e2443f16-48db-4c5c-97a9-91902acae378)
---

<br>

## 사용 라이브러리 및 FrameWork

|  |  |
| --- | --- |
| 프레임워크  | Vue 3 (3.5.13) |
| 상태 관리 | Pinia |
| 빌드 도구 | Vite |
| 스타일 | Tailwindcss |

<br>

## 디렉토리 구조 및 실행 순서

### 1. 디렉토리 구조

```bash
├── src**
│   ├── App.vue
│   ├── api                       - RestAPI 통신을 위한 api
│   │   ├── campaigns.js          - 캠페인 정보
│   │   └── users.js              - 사용자 정보
│   ├── components**
│   │   ├── BaseModal.vue         - Modal 기본 레이아웃 
│   │   ├── CreateUserModal.vue   - 사용자 생성 Modal
│   │   ├── ErrorModal.vue        - 에러 Modal
│   │   ├── ModifyUserModal.vue   - 사용자 수정 Modal
│   │   ├── Pagination.vue
│   │   └── TopMenu.vue           - 상단 메뉴
│   ├── lib**
│   │   └── constants.js          - 상수 정의
│   ├── router**
│   │   └── index.js              - 라우터 정의
│   ├── stores                    - 전역 상태관리 store
│   │   ├── main.js
│   │   ├── modal.js
│   │   └── user.js
│   ├── test                      - 백엔드 RestAPI 통신 Test용
│   │   ├── json                  - 백엔드 통신 test json 데이터
│   │   └── server.js             - 백엔드 통신 test web server
└── vite.config.js
```

---
### 2. 실행 순서

1. 프로젝트 루트 경로 이동 및 npm install

```bash
byunghwi@byunghwi:~/wisebirds-project$ npm install

added 356 packages, and audited 357 packages in 3s

97 packages are looking for funding
  run `npm fund` for details

9 moderate severity vulnerabilities

To address issues that do not require attention, run:
  npm audit fix

To address all issues possible (including breaking changes), run:
  npm audit fix --force

Some issues need review, and may require choosing
a different dependency.

Run `npm audit` for details.
```
<br>

2. test 디렉토리 이동 및 백엔드 RestAPI 통신 Test를 위한 웹 서버 실행

```bash
byunghwi@byunghwi:~/wisebirds-project/src/test$ node server.js
server is listening at localhost:8888
```

 ※ 아직 백엔드 API가 개발되지 않았다는 가정 하의 데이터 확인을 위한 서버로써, 사용자 생성/수정api는 해당 서버에 작성하지 않았습니다.

<br>

3. 별개 Terminal에서 프로젝트 개발 서버 실행

```bash
byunghwi@byunghwi:~/wisebirds-project$ npm run dev

> wisebirds-project@0.0.0 dev
> vite

  VITE v6.1.0  ready in 1164 ms

  ➜  Local:   http://localhost:8086/
  ➜  Network: use --host to expose
  ➜  press h + enter to show help

```  

<br>

4. [localhost:8086](http://localhost:8086) 브라우저 접속 

※ vite.config.js 에 **[ 2. 백엔드 RestAPI 통신 Test를 위한 웹 서버 실행 ]** 를 위한 **proxy** 설정이 되어있습니다.  
( /api 경로 호출 시 [localhost:8888](http://localhost:8888) 로 proxy)
