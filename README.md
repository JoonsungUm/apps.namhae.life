# Namhae Life 식사배달 웹앱

## 로컬 실행 환경 만들기

- Node.js v12 or v14
- Rush.js 설치

```bash
~$ npm install -g @microsoft/rush
# and
~$ rush update
```

### Client

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
