# Namhae Life 식사배달 웹앱

## 사용기술스택
![남해토스프로젝트기술스택](https://user-images.githubusercontent.com/55748886/173522181-5446aed3-440b-4f5b-bf21-6ced0ba89885.JPG)
- 프론트 : React, Redux, Typescript, MaterailUI, next.js
- 번들러 : Webpack 
- 백엔드 : nest.js,graphQL
- CI/CD : vercel, github

## 로컬 실행 환경 만들기

- Node.js v12 or v14
- Rush.js 설치

```bash
~$ npm install -g @microsoft/rush
# and
~$ rush update
```

### Client

API서버 연결과 관련된 dotenv 파일이 있어야 합니다.

`~/apps/client/.env` 파일을 만들고

```
NEXT_PUBLIC_API_URI="http://localhost:3000/graphql"

```

위 환경변수가 설정이 되어 있어야 합니다.

```bash
~/apps/client$ rushx dev
```

실행은 localhost:8000 으로 확인 할 수 있습니다.

### API server

데이터베이스 연결과 관련된 dotenv 파일이 있어야 합니다.

`~/apps/api/.env` 파일을 만들고

```
APP_NAMHAE_LIFE_DB_HOST
APP_NAMHAE_LIFE_DB_PORT
APP_NAMHAE_LIFE_DB_USERNAME
APP_NAMHAE_LIFE_DB_PASSWORD
APP_NAMHAE_LIFE_DB_NAME
```

위 환경변수가 설정이 되어 있어야 합니다.

```bash
~/apps/api$ rushx start:dev
```

실행은 localhost:3000/graphql 로 확인 할 수 있습니다.


## 업무보드
### [11.09.2021] (해결)
--- 프론트
- Update OrderMenuCard
- 홈버튼
- [x] Appbar에 추가완료 - 메인 페이지로 이동기능
- [x] OrderDrawer에 추가완료 - 클릭시 toggle click이벤트 발생
- 데스크탑, 모바일에서 매장사진 및 정보표시 반응형 디자인 수정
- OrderDrawer UI
- [x]  '주문내역' 글자 폰트사이즈 및 위치 수정
- [x]  '메뉴추가', '주문하기' 버튼 폰트사이즈 수정

### [10.26.2021] (해결)
--- 백엔드<br>
API
- Orders API 모듈 추가
- GraphQL Date 타입 관련 처리 추가
- Orders CRUD API 추가
- Order 오브젝트 하위 필드 menu 추가로 메뉴명, 가격 등 조회 가능

Client
- OrderDrawer 에서 orders 로 불러온 리스트 보여줌 (현재 모든 Orders 다 가져옴)
- 상점 상세 페이지에서 장바구니 버튼을 누를 때 OrderCreate 실행되며 OrderDrawer 에 추가됨
- 모든 GraphQL 쿼리 별도 파일로 분리

### [10.22.2021] (해결)
--- 프론트
{하드코딩으로 주문 Drawer에 표시될 메뉴 카드 레이아웃 추가}
 - branch명 : OrderDrawerHead
 - 카드레이아웃 그리드 작업
 - OrderMenu.tsx 파일생성
   - 메뉴가 장바구니 담길시, 메뉴를 클릭한 순서대로 ListItem order순서 매겨지는 함수작성(함수명 : updateCountOrder) 
   - 그리드 사용한 OrderMenu 컴포넌트 레이아웃작성 

--- 백엔드<br>
- api, client 각자 가지고 있던 prettier 설정을 프로젝트 루트로 옮김
- client 실행에 필요한 API 서버 주소 환경번수 추가
- storeUpdate, menuUpdate 뮤테이션 서비스 로직 버그 수정
- 더미 데이터 파일 제거
- client 앱에 GraphQL apollo-client 추가
- 사용하지 않는 pages/api 제거
- 데이터 가져오는 로직을 apollo-client 를 사용하여 GraphQL API 서버에서 가져오도록 수정


### [10.21.2021] (해결)
--- 백엔드
- vscode 워크스페이스 세팅 추가
- api 서버 가동 시 무의미한 Hello World! 스트링을 서버 정보를 나타내도록 추가
	- name: 패키지 이름
	- hash: 마지막 git hash
	- uptime: 프로세스 가동 시간
- Store 오브젝트 안에 menus 필드 추가

### [10.19.2021] (해결)
--- 프론트
- 검색가능하 이미지 메뉴 사진 업데이트
- 나머지 메뉴들 '이미지준비중' 이미지로 메뉴사진 대체<br>


--- 백엔드<br>
- eslint/prettier 설정 변경
	- singleQuote 를 주로사용하고 세미콜론 사용안함
- 데이터베이스와 API 서버를 연결하기 위한 세팅 추가
- Stores 테이블 추가
- graphql 스키마 및 세팅 추가
- API 서버 실행을 위한 README.md 업데이트
- Menus 모듈 추가
- Menus 관련 CRUD GraphQL mutation 추가
- Stores 관련 CRUD GraphQL mutation 추가
- 자동 생성된 Stores, Menus 테스트용 spec 파일 추가

- Stores 의 imageURL 필드이름을 id, storeId 필드들과의 통일성을 위해 ImageUrl 로 변경
- Stores 의 id, Menus 의 id, storeId 등의 타입을 number 에서 string 으로 변경
	- 일반 SQL 데이터베이스에서 ID는 보통 정수형 타입임
	- No-SQL 기반 데이터베이스(몽고DB, Redis 등)에서는 ID가 문자열 타입인 경우가 많음
	- GraphQL 의 ID 타입은 모든 경우에 대응하기 위해 문자열 타입으로 취급됨
	- GraphQL 스키마와 PostgreSQL 스키마를 Typescript에서 충돌 없이 사용하기 위해 string 타입으로 통일

### [10.18.2021] (해결)
--- 프론트
- [x] 메뉴 카드 하단에 '담기' 버튼을 추가
- '담기' 대신 카트아이콘버튼으로 대체

### [10.14.2021] (해결)
--- 백엔드
- Store, Menu 타입 types.tsx 로 분리함. 향후 DB 스키마로 활용 예정
- Store 타입에 holidays 필드 추가
- Menu 타입에 isAvailable 필드 삭제
- Menu 타입에 isLunch, isDinner 필드 추가
- 점심과 저녁을 구분하는 상수 const BREAK_TIME = 15 추가
- 각 메뉴의 주문 가능 여부를 가늠하는 isMenuAvailable() 함수 추가
