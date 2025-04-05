export interface ProductType {
  id: number;
  name: string;
  title: string;
  description: string;
  price: number;
  imageUrl: string;
}

export const productList: ProductType[] = [
  {
    id: 1,
    name: '무선 키보드',
    title: '편안한 타건감의 무선 키보드',
    description: '2.4GHz 무선 연결, 저소음 키캡, 긴 배터리 수명으로 사무실과 가정 모두에 적합합니다.',
    price: 29000,
    imageUrl:
      'https://i.namu.wiki/i/8bVK4ZYAm1S_BeXemaTtE96T3fzGPHO6dC5iFuiWE5fkwffObZEqt8I63YFkIMZIKV5iLJaPSaNh7XH10Ig68g.webp',
  },
  {
    id: 2,
    name: '게이밍 마우스',
    title: '정밀한 컨트롤을 위한 게이밍 마우스',
    description: '16000 DPI까지 지원하며 RGB 조명과 인체공학적 설계로 최고의 게이밍 경험을 제공합니다.',
    price: 33000,
    imageUrl:
      'https://i.namu.wiki/i/8bVK4ZYAm1S_BeXemaTtE96T3fzGPHO6dC5iFuiWE5fkwffObZEqt8I63YFkIMZIKV5iLJaPSaNh7XH10Ig68g.webp',
  },
  {
    id: 3,
    name: '27인치 모니터',
    title: '광시야각 FHD 27인치 모니터',
    description: 'IPS 패널과 75Hz 주사율로 선명한 화질과 부드러운 화면 전환을 경험하세요.',
    price: 189000,
    imageUrl:
      'https://i.namu.wiki/i/8bVK4ZYAm1S_BeXemaTtE96T3fzGPHO6dC5iFuiWE5fkwffObZEqt8I63YFkIMZIKV5iLJaPSaNh7XH10Ig68g.webp',
  },
  {
    id: 4,
    name: 'USB 허브',
    title: '4포트 USB 3.0 고속 허브',
    description: '노트북과 데스크탑에서 동시에 사용 가능하며, 데이터 전송 속도가 빠릅니다.',
    price: 12900,
    imageUrl:
      'https://i.namu.wiki/i/8bVK4ZYAm1S_BeXemaTtE96T3fzGPHO6dC5iFuiWE5fkwffObZEqt8I63YFkIMZIKV5iLJaPSaNh7XH10Ig68g.webp',
  },
  {
    id: 5,
    name: '게이밍 체어',
    title: '장시간 게임에도 편안한 체어',
    description: '허리 지지 쿠션과 넓은 등받이로 편안한 자세 유지에 최적화된 게이밍 의자입니다.',
    price: 149000,
    imageUrl:
      'https://i.namu.wiki/i/8bVK4ZYAm1S_BeXemaTtE96T3fzGPHO6dC5iFuiWE5fkwffObZEqt8I63YFkIMZIKV5iLJaPSaNh7XH10Ig68g.webp',
  },
  {
    id: 6,
    name: '스마트 워치',
    title: '건강관리와 알림을 한 번에',
    description: '심박수, 수면 모니터링 기능과 다양한 운동 모드를 지원합니다.',
    price: 87000,
    imageUrl:
      'https://i.namu.wiki/i/8bVK4ZYAm1S_BeXemaTtE96T3fzGPHO6dC5iFuiWE5fkwffObZEqt8I63YFkIMZIKV5iLJaPSaNh7XH10Ig68g.webp',
  },
  {
    id: 7,
    name: '블루투스 스피커',
    title: '풍부한 사운드의 블루투스 스피커',
    description: '10W 출력의 스테레오 사운드, 방수 기능으로 야외에서도 안심하고 사용 가능!',
    price: 45000,
    imageUrl:
      'https://i.namu.wiki/i/8bVK4ZYAm1S_BeXemaTtE96T3fzGPHO6dC5iFuiWE5fkwffObZEqt8I63YFkIMZIKV5iLJaPSaNh7XH10Ig68g.webp',
  },
  {
    id: 8,
    name: '태블릿 거치대',
    title: '자유로운 각도 조절 태블릿 스탠드',
    description: '360도 회전과 각도 조절 가능, 알루미늄 재질로 견고하게 고정됩니다.',
    price: 9800,
    imageUrl:
      'https://i.namu.wiki/i/8bVK4ZYAm1S_BeXemaTtE96T3fzGPHO6dC5iFuiWE5fkwffObZEqt8I63YFkIMZIKV5iLJaPSaNh7XH10Ig68g.webp',
  },
  {
    id: 9,
    name: 'C타입 충전기',
    title: '고속 충전 지원 C타입 어댑터',
    description: 'PD 3.0 지원으로 빠르고 안정적인 충전, 다양한 기기와 호환됩니다.',
    price: 10900,
    imageUrl:
      'https://i.namu.wiki/i/8bVK4ZYAm1S_BeXemaTtE96T3fzGPHO6dC5iFuiWE5fkwffObZEqt8I63YFkIMZIKV5iLJaPSaNh7XH10Ig68g.webp',
  },
  {
    id: 10,
    name: '노트북 받침대',
    title: '인체공학 각도 조절 노트북 스탠드',
    description: '장시간 사용 시에도 목과 어깨에 부담을 줄여주는 알루미늄 받침대입니다.',
    price: 23900,
    imageUrl:
      'https://i.namu.wiki/i/8bVK4ZYAm1S_BeXemaTtE96T3fzGPHO6dC5iFuiWE5fkwffObZEqt8I63YFkIMZIKV5iLJaPSaNh7XH10Ig68g.webp',
  },
];
