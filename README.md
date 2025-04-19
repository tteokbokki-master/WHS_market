## 2025 WHS-3기 | Secure Coding 과제 | 36반 이용진

화이트햇 스쿨 3기 Secure Coding 과목의 과제로 진행된 프로젝트입니다.

<br/>

## 🛠 설치 및 준비 사항

- 이 프로젝트는 **Docker만 설치되어 있다면 별도 환경 설정 없이 실행할 수 있습니다.**
- Windows 사용자는 **Docker Desktop** 또는 **WSL 기반의 Docker 환경** 중 하나를 사용하면 됩니다.
- ⚠️ 다음 포트가 이미 사용 중이라면 컨테이너가 정상적으로 실행되지 않을 수 있습니다:

  - **51730** (클라이언트)
  - **3001** (서버 API)
  - **65432** (PostgreSQL)

- 위 포트들이 **비어 있는지 확인한 뒤 실행**해 주세요.

<br>

## 🐳 실행 방법

```bash
# 1. 프로젝트 클론
git clone https://github.com/tteokbokki-master/WHS_market

# 2. 폴더 이동
cd whs-market

# 3. 실행 권한 부여
chmod +x ./setup.sh

# 4. 도커 컴포즈 실행
./setup.sh
```

`./setup.sh`를 실행하면 아래 작업이 자동으로 진행됩니다.

- 클라이언트와 서버의 .env.example 파일을 복사해 .env 생성 (.env가 이미 존재하는 경우 생략)
- PostgreSQL용 db.env.example 파일을 복사해 db.env 생성 (db.env가 이미 존재하는 경우 생략)
- docker-compose.yml을 기반으로 모든 컨테이너(client, server, db) 빌드 및 실행

<br>

## 🚀 로컬 배포 주소 (Docker 기반)

| **서비스** | **주소**                                          |
| ---------- | ------------------------------------------------- |
| 클라이언트 | [http://localhost:51730](http://localhost:51730/) |
| 서버 (API) | [http://localhost:3001](http://localhost:3001/)   |

- 클라이언트는 브라우저에서 확인 가능하며, 서버는 Postman 등으로 API 테스트를 수행할 수 있습니다.
- **위 주소는 Docker 컨테이너 실행 후 로컬에서 접근 가능한 개발용 URL입니다.**

<br>

## 🔐 테스트 계정

| **아이디** | **비밀번호** |
| ---------- | ------------ |
| admin      | admin123!    |

- 이 계정은 관리자 권한을 가진 테스트 계정입니다.
- 별도로 회원가입하지 않아도 바로 로그인해 사용할 수 있습니다.
- 일반 사용자로 서비스를 이용하고 싶다면, 클라이언트에서 회원가입 후 로그인하면 됩니다.

<br>

## 🛑 컨테이너 종료 및 재실행

```bash
# 컨테이너 정지 및 종료
docker-compose down

# 컨테이너 + 데이터 완전 삭제
docker-compose down -v

# 모든 컨테이너 다시 실행
./setup.sh
```

- `docker-compose down`: 컨테이너만 종료, DB 데이터와 업로드 파일은 유지됩니다.
- `docker-compose down -v`: 컨테이너와 데이터도 모두 삭제됩니다. 초기화에 사용됩니다.
- `./setup.sh`: .env 복사 및 전체 컨테이너 빌드/실행을 다시 수행합니다.

일반적으로는 down으로 종료 후, 나중에 `./setup.sh`로 다시 실행하면 됩니다.

<br>

## 📖 API 명세서

### 🔑 로그인/회원가입/유저 API

| **Method** | **Route**            | **Description**  | **Header**            | **Body**                                       |
| ---------- | -------------------- | ---------------- | --------------------- | ---------------------------------------------- |
| POST       | /auth/register       | 회원가입         | x                     | { "username": "string","password": "string" }  |
| GET        | /auth/check-username | 아이디 중복 검사 | x                     | 쿼리 파라미터 `?username=example`              |
| POST       | /auth/login          | 로그인           | x                     | { "username": "string", "password": "string" } |
| POST       | /auth/logout         | 로그아웃         | Cookie: access_token= | x                                              |
| GET        | /auth/me             | 쿠키 jwt 검증    | Cookie: access_token= | x                                              |
| PUT        | /auth/password       | 비밀번호 수정    | Cookie: access_token= | { "newPassword": "string" }                    |
| PUT        | /auth/introduce      | 자기소개 수정    | Cookie: access_token= | { "introduce": "string" }                      |
| GET        | /auth/profile/:id    | 특정 유저 정보   | x                     | x                                              |

<br>

### 🚨 신고 API

| **Method** | **Route**         | **Description** | **Header**            | **Body**                                    |
| ---------- | ----------------- | --------------- | --------------------- | ------------------------------------------- |
| POST       | /reports/products | 상품신고        | Cookie: access_token= | { content: string; productId: number }      |
| POST       | /reports/users    | 유저신고        | Cookie: access_token= | { content: string; reportedUserId: number } |

<br>

### 💬 채팅 API

| **Method** | **Route**                                    | **Description**              | **Header**            | **Body**                                                  |
| ---------- | -------------------------------------------- | ---------------------------- | --------------------- | --------------------------------------------------------- |
| POST       | /chats                                       | 1:1 채팅 메시지 저장         | Cookie: access_token= | { receiveId: number; productId: number; message: string } |
| GET        | /chats?with={withUserId}&product={productId} | 특정 상대와의 채팅 내역 조회 | Cookie: access_token= | x                                                         |
| GET        | /chats/rooms?product={productId}             | 채팅 방 목록 조회            | Cookie: access_token= | x                                                         |

<br>

### 💵 송금 API

| **Method** | **Route**        | **Description**   | **Header**            | **Body**                              |
| ---------- | ---------------- | ----------------- | --------------------- | ------------------------------------- |
| POST       | /wallet/transfer | 유저 간 송금      | Cookie: access_token= | { receiveId: number; amount: number } |
| GET        | /wallet          | 내 지갑 잔액 확인 | Cookie: access_token= | x                                     |

<br>

### **⚙️ 관리자 API**

| **Method** | **Route**                 | **Description**         | **Header**            | **Body**                                                                |
| ---------- | ------------------------- | ----------------------- | --------------------- | ----------------------------------------------------------------------- |
| GET        | /admin/users              | 모든 유저 목록 조회     | Cookie: access_token= | x                                                                       |
| PATCH      | /admin/users/:id          | 유저 소개/정지기간 수정 | Cookie: access_token= | { introduce?: string, banUntil?: string (ISO 형식), username?: string } |
| DELETE     | /admin/users/:id          | 유저 삭제               | Cookie: access_token= | x                                                                       |
| GET        | /admin/products           | 전체 상품 목록 조회     | Cookie: access_token= | x                                                                       |
| DELETE     | /admin/products/:id       | 상품 삭제               | Cookie: access_token= | x                                                                       |
| GET        | /admin/reports/users      | 유저 신고 목록 조회     | Cookie: access_token= | x                                                                       |
| GET        | /admin/reports/products   | 상품 신고 목록 조회     | Cookie: access_token= | x                                                                       |
| DELETE     | /admin/report/user/:id    | 유저 신고 삭제          | Cookie: access_token= | x                                                                       |
| DELETE     | /admin/report/product/:id | 상품 신고 삭제          | Cookie: access_token= | x                                                                       |

<br>

### 🛍️ 상품 정보 API

| **Method** | **Route**             | **Description** | **Header**            | **Body**                                                                                        |
| ---------- | --------------------- | --------------- | --------------------- | ----------------------------------------------------------------------------------------------- |
| POST       | /products             | 상품등록        | x                     | { "title": string, "name": string, "description": string, "price": number, "imageUrl": string } |
| GET        | /products             | 상품조회        | x                     | x                                                                                               |
| GET        | /products/:id         | 상품상세조회    | x                     | x                                                                                               |
| DELETE     | /products/:id         | 특정상품삭제    | Cookie: access_token= | x                                                                                               |
| GET        | /products/my-products | 내 상품 조회    | Cookie: access_token= | x                                                                                               |
| GET        | /search               | 상품검색        | x                     | 쿼리파라미터 `?q=`                                                                              |
