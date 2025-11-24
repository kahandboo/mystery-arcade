>프리코스 기간 동안 구현했던 자동차 경주 게임과 로또 게임을 아스키 코드를 활용해 도트 그래픽으로 시각화한 웹 프로젝트입니다.

## 📖 프로젝트 개요
단순한 콘솔/텍스트 기반의 과제를 넘어, **카지노에서 탈출한다**는 스토리텔링을 더해 시각적인 웹 게임으로 재해석했습니다.
프레임워크 없이 **순수 바닐라 자바스크립트**만으로 SPA(Single Page Application) 구조와 화려한 CSS 애니메이션을 구현했습니다.

## 주요 기능

### 1. 🗺️ 인터랙티브 맵 시스템
- **NPC 상호작용**: 관리자 및 의문의 남자와의 대화를 통해 탈출 힌트를 얻을 수 있습니다.
- **아이템 시스템**: 자판기에서 구매한 아이템을 사용하여 오브젝트와 상호작용이 가능합니다.
- **맵 이동**: 키보드/터치를 이용한 캐릭터 이동 및 게임기 진입 구현.

### 2. 🏎️ 자동차 경주 게임 (Racing Car)
- **윈도우 95 테마**: 원색(빨강, 노랑, 파랑, 초록)을 활용
- **실시간 중계**: 트랙 위를 달리는 자동차 애니메이션과 전광판 텍스트 출력, 실시간 순위 출력으로 경주 과정 시각화.

### 3. 🎱 로또 게임 (Lotto)
- **사이버펑크 테마**: 마젠타-민트 컬러를 활용
- **편의성 강화**: `[자동]` 버튼을 통한 자동 번호 생성 및 직관적인 6구 입력 시스템.
- **공장 자동화 컨셉**: 로또 번호가 생성되고 검증되는 과정을 프로그레스 바와 볼 애니메이션으로 시각화.

### 4. 🎬 멀티 엔딩 스토리
- 플레이어의 선택에 따라 갈리는 **Normal Ending**과 **True Ending** 구현.

## 기술적 특징

### 💻 Tech Stack
- **Languages**: JavaScript (ES6+), HTML5, CSS3
- **Style**: Custom CSS (Flexbox, Grid, Keyframe Animations), Pixel Art Font (`Press Start 2P`, `VT323`, `NeoDunggeunmo`)

### 🏗️ 설계 포인트
1.  **SPA (Single Page Application) 구현**
    - `racing-car.html`, `lotto.html`에서 페이지 새로고침 없이 `BettingScreen`, `ResultScreen` 등을 동적으로 렌더링하도록 컨트롤러를 설계했습니다.
    
2.  **도메인 로직과 뷰의 분리**
    - **Domain**: `Lotto`, `PurchaseAmount`, `Player` 등 핵심 비즈니스 로직은 순수 JS 클래스로 구현하여 의존성을 낮췄습니다.
    - **View**: `renderBettingScreen`, `renderRaceScreen` 등 화면을 그리는 함수는 도메인 객체를 주입받아 사용하도록 설계했습니다.

3.  **객체 지향적 상태 관리**
    - `Player` 클래스를 통해 유저의 코인, 아이템, 히스토리를 `localStorage`와 연동하여 영속적으로 관리합니다.

## 디렉토리 구조
```bash
root/
    ├── map.html
    ├── lotto.html
    ├── racing-car.html
    css/
    ├── map-screen.css
    ├── lotto/             
    └── racingCar/
    src/
    ├── Map.js              # 메인 맵 화면 컨트롤러
    ├── Lotto.js            # 로또 게임 화면 컨트롤러
    ├── RacingCar.js        # 자동차 경주 게임 화면 컨트롤러
    ├── data/               # 스토리 대화 (dialogues.js)
    ├── games/              # 비즈니스 로직 (Lotto, racingCar)
    ├── models/             # 상태 관리 (Player)
    ├── screens/            # 화면 렌더링 로직 (SPA Views)
    │   ├── mapScreen.js    # 맵 이동 및 상호작용
    │   ├── racing/         # 자동차 경주 게임 화면
    │   └── lotto/          # 로또 게임 화면
    └── utils/              # 아스키 코드 변환(converter.js)
```

## 실행 방법

1. 이 레포지토리를 클론합니다.

``` Bash
git clone https://github.com/kahandboo/mystery-arcade.git
```
2. 프로젝트 루트에서 index.html을 실행합니다. (Live Server 권장)

## 개발 기록
- 설계 및 트러블 슈팅 로그: https://sepia-elk-8e1.notion.site/294ba9b2e24f800d8787e73f97806f4b?source=copy_link