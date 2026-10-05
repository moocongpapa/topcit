// Original study content; public references are linked, not republished.
window.TOPCIT_STUDY = {
  "checkedAt": "2026-10-05",
  "chapters": [
    {
      "id": "book-trace-lab",
      "module": "m1",
      "title": "실전 01 · 코드를 손으로 실행하기",
      "summary": "변수 표를 그려 참조, 반복 범위, 재귀의 종료를 추적합니다.",
      "lessons": [
        {
          "h": "별칭과 얕은 복사",
          "text": "대입은 같은 객체에 이름을 하나 더 붙일 수 있습니다. 바깥 리스트만 복사하면 내부 리스트는 공유됩니다. 코드 추적은 변수 이름보다 객체와 연결선을 기준으로 합니다.",
          "bullets": [
            "b = a는 같은 리스트를 참조합니다.",
            "b = a[:]는 바깥 리스트만 복사합니다.",
            "중첩 객체까지 독립시킬 필요가 있을 때 deepcopy를 검토합니다."
          ],
          "example": "a = [[1], [2]]\nb = a[:]\nb[0].append(9)\n# a == [[1, 9], [2]], b도 같은 내용",
          "trap": "얕은 복사 후 내부 원소를 수정한 결과와 바깥 원소를 교체한 결과는 다릅니다.",
          "review": {
            "question": "얕은 복사에서 b[0] = [9]와 b[0].append(9)는 어떻게 다른가요?",
            "answer": "첫 연산은 b의 참조 하나를 교체하므로 a의 바깥 리스트는 그대로입니다. 두 번째는 공유된 내부 리스트를 수정하므로 a에서도 보입니다."
          }
        },
        {
          "h": "반복 범위와 누적값",
          "text": "시작값, 종료 조건, 증감 순서를 각각 기록합니다. 누적합과 카운터를 별도 열로 두면 루프 횟수와 마지막 변수 값을 혼동하지 않습니다.",
          "bullets": [
            "range(1, 5)는 1·2·3·4입니다.",
            "continue는 현재 반복의 나머지를 건너뜁니다.",
            "break는 가장 안쪽 반복문을 종료합니다."
          ],
          "example": "s = 0\nfor i in range(1, 6):\n    if i % 2 == 0: continue\n    s += i\n# 1 + 3 + 5 = 9",
          "trap": "마지막 인덱스가 n이라고 해서 반복 횟수가 n인 것은 아닙니다.",
          "review": {
            "question": "i=1부터 i<n까지 i*=2이면 반복 횟수는 어떤 차수인가요?",
            "answer": "i가 1,2,4,8로 증가하므로 O(log n)입니다. n이 1 이하이면 반복하지 않을 수 있습니다."
          }
        },
        {
          "h": "재귀와 호출 스택",
          "text": "재귀는 종료 조건과 더 작은 문제로 진행하는 규칙이 모두 필요합니다. 호출 전에 하는 작업과 반환 후에 하는 작업의 순서를 구분합니다.",
          "bullets": [
            "기저 조건을 먼저 확인합니다.",
            "호출 깊이와 전체 호출 횟수는 다를 수 있습니다.",
            "큰 입력에서는 반복문이나 명시적 스택을 검토합니다."
          ],
          "example": "def f(n):\n    if n == 0: return 0\n    return n + f(n-1)\n# f(3) = 3 + 2 + 1 + 0 = 6",
          "trap": "재귀 깊이 제한의 구체적 값은 실행 환경에 따라 달라질 수 있습니다.",
          "review": {
            "question": "같은 부분 문제를 반복 계산하는 재귀를 어떻게 개선하나요?",
            "answer": "부분 문제 결과를 캐시에 저장하는 메모이제이션이나 작은 문제부터 계산하는 동적 계획법을 사용합니다."
          }
        }
      ],
      "sources": [
        {
          "title": "Python 자료구조",
          "url": "https://docs.python.org/3/tutorial/datastructures.html"
        }
      ]
    },
    {
      "id": "book-algorithm-lab",
      "module": "m1",
      "title": "실전 02 · 알고리즘 선택과 경계 조건",
      "summary": "구현할 때 자주 빠뜨리는 경계 조건을 함께 연습합니다.",
      "lessons": [
        {
          "h": "이진 탐색의 구간 불변식",
          "text": "정렬된 배열에서 반열린 구간 [lo, hi)를 유지하면 빈 배열과 끝 경계를 함께 다루기 쉽습니다. lower_bound는 target 이상인 첫 위치를 찾습니다.",
          "bullets": [
            "lo=0, hi=len(a)로 시작합니다.",
            "a[mid] < target이면 lo=mid+1입니다.",
            "그 외에는 hi=mid로 줄입니다."
          ],
          "example": "while lo < hi:\n    mid = (lo + hi) // 2\n    if a[mid] < target: lo = mid + 1\n    else: hi = mid\n# [2,4,4,9]에서 target=4 → 1",
          "trap": "반환 위치가 len(a)이면 target 이상인 원소가 없습니다.",
          "review": {
            "question": "중복 원소가 있는 배열에서 일반 이진 탐색과 lower_bound의 차이는?",
            "answer": "일반 탐색은 일치하는 임의 위치를 반환할 수 있고, lower_bound는 target 이상인 첫 위치를 반환합니다."
          }
        },
        {
          "h": "BFS·Dijkstra·위상 정렬",
          "text": "간선 비용이 모두 같으면 BFS로 최단 간선 수를 구합니다. 음수 간선이 없는 일반 가중치 그래프는 Dijkstra를 검토합니다. 선행 관계가 있는 DAG의 처리 순서는 위상 정렬로 구합니다.",
          "bullets": [
            "BFS 방문 표시는 보통 큐에 넣을 때 합니다.",
            "Dijkstra의 최단 거리가 확정되는 조건을 설명합니다.",
            "위상 정렬에서 처리한 정점 수가 전체보다 적으면 사이클을 의심합니다."
          ],
          "example": "A→B(1), A→C(4), B→C(2)\nA에서 C까지 최소 비용 = 1+2 = 3",
          "trap": "가중치가 서로 다른 그래프에서 BFS 방문 순서가 최소 비용을 보장하지 않습니다.",
          "review": {
            "question": "선수 과목 순서를 정하는 문제에 적합한 방법은?",
            "answer": "선행 관계를 방향 간선으로 만든 뒤 위상 정렬합니다. 사이클이 있으면 모든 선행 조건을 만족하는 순서가 존재하지 않습니다."
          }
        },
        {
          "h": "탐욕법과 동적 계획법",
          "text": "탐욕법은 현재의 최선 선택이 전체 최적해로 이어진다는 근거가 필요합니다. 동적 계획법은 상태, 초기값, 전이식, 계산 순서를 정의합니다.",
          "bullets": [
            "동전 종류에 따라 큰 동전부터 고르는 방식이 실패합니다.",
            "dp[x]를 금액 x의 최소 동전 수로 정의할 수 있습니다.",
            "불가능한 상태는 충분히 큰 값으로 초기화합니다."
          ],
          "example": "동전 {1,3,4}, 금액 6\n탐욕: 4+1+1 (3개)\n최적: 3+3 (2개)\ndp[x] = min(dp[x-c]+1)",
          "trap": "예시 몇 개의 성공만으로 탐욕법의 정당성을 증명할 수 없습니다.",
          "review": {
            "question": "DP 답안에서 상태 정의를 생략하면 어떤 문제가 있나요?",
            "answer": "배열 값의 의미와 전이식의 근거를 검증할 수 없습니다. 상태·초기값·전이·계산 순서·최종 반환값을 함께 적습니다."
          }
        }
      ],
      "sources": []
    },
    {
      "id": "book-design-lab",
      "module": "m1",
      "title": "실전 03 · UML·DFD 답안 만들기",
      "summary": "요구사항을 관계, 메시지, 데이터 흐름으로 바꾸는 연습입니다.",
      "lessons": [
        {
          "h": "클래스 관계와 다중성",
          "text": "다중성은 반대쪽 객체 하나가 연결할 수 있는 현재쪽 객체 수를 뜻합니다. 일반화의 빈 삼각형은 상위 클래스를 향하고, 합성의 채운 마름모는 전체 쪽에 놓습니다.",
          "bullets": [
            "0..1은 선택적 한 개, 1..*는 최소 한 개입니다.",
            "공유 가능한 객체를 무조건 합성으로 그리지 않습니다.",
            "속성과 연산을 구분하고 가시성을 표기합니다."
          ],
          "example": "회원 1 ── 0..* 예약\n예약 1 ── 1..* 예약항목\n예약항목 * ── 1 좌석",
          "trap": "단순히 소유한다는 문구만으로 수명까지 묶인 합성을 단정하지 않습니다.",
          "review": {
            "question": "예약 없는 회원도 허용하면 회원 한 명의 예약 다중성은?",
            "answer": "0..*입니다. 반대편 회원 쪽의 1은 예약 하나가 회원 한 명에 속한다는 뜻입니다."
          }
        },
        {
          "h": "시퀀스 다이어그램",
          "text": "시퀀스 다이어그램은 참여자의 생명선과 시간 순서의 메시지를 표현합니다. 정상 경로와 실패 경로를 분기 조건으로 나누고 외부 호출의 결과를 반영합니다.",
          "bullets": [
            "위에서 아래로 시간 흐름을 읽습니다.",
            "alt는 대안 분기, loop는 반복입니다.",
            "DB 저장 전에 외부 승인이 필요한지 요구사항을 확인합니다."
          ],
          "example": "고객→주문API: 결제 요청\n주문API→결제사: 승인 요청\nalt 승인 성공: 주문 확정\nelse 승인 실패: 실패 응답",
          "trap": "메시지 이름만 나열하지 말고 어떤 조건에서 어느 경로로 가는지 표시합니다.",
          "review": {
            "question": "결제 실패 시 주문이 확정되지 않음을 어떻게 표현하나요?",
            "answer": "alt 프레임에 승인 성공/실패 가드를 두고 확정 메시지는 성공 경로에만 둡니다."
          }
        },
        {
          "h": "DFD와 흐름도의 구분",
          "text": "DFD는 데이터의 이동과 변환을 표현하고 흐름도는 처리·판단·반복 순서를 표현합니다. DFD의 외부 개체와 저장소 사이 데이터 이동은 처리 과정을 통해 모델링합니다.",
          "bullets": [
            "프로세스는 데이터를 변환하는 동작입니다.",
            "데이터 흐름 이름은 이동하는 데이터입니다.",
            "상위·하위 DFD의 입출력 균형을 확인합니다."
          ],
          "example": "고객 → [주문 접수] → 주문 저장소\n흐름 이름: 주문서, 검증된 주문\n처리 이름: 주문 접수",
          "trap": "DFD 화살표에 처리 순서나 제어 조건만 쓰면 데이터 흐름의 의미가 사라집니다.",
          "review": {
            "question": "DFD와 시퀀스 다이어그램의 관점 차이는?",
            "answer": "DFD는 데이터 변환과 이동을, 시퀀스는 객체나 서비스 사이 메시지의 시간 순서를 중심으로 표현합니다."
          }
        }
      ],
      "sources": [
        {
          "title": "TOPCIT 공식 UML·ERD 연습 도구",
          "url": "https://www.topcit.or.kr/board/preview.do"
        }
      ]
    },
    {
      "id": "book-testing-lab",
      "module": "m1",
      "title": "실전 04 · 테스트 설계와 커버리지",
      "summary": "정답 번호를 외우기보다 입력과 기대 결과를 직접 만듭니다.",
      "lessons": [
        {
          "h": "동등 분할과 경계값",
          "text": "동등 분할은 같은 방식으로 처리될 입력 집합을 나누고 대표값을 선택합니다. 경계값 분석은 오류가 생기기 쉬운 경계와 인접값을 검사합니다.",
          "bullets": [
            "정상 범위뿐 아니라 비정상 범위도 나눕니다.",
            "필수 입력의 빈 값도 별도 집합으로 고려합니다.",
            "출력과 오류 메시지까지 기대 결과에 포함합니다."
          ],
          "example": "허용 수량: 정수 2~8\n경계와 인접값: 1,2,3,7,8,9\n추가: 빈 값, 소수, 문자열",
          "trap": "조건이 정수인지 실수인지 먼저 확인해야 인접값을 정할 수 있습니다.",
          "review": {
            "question": "입력 2~8에서 1과 9를 시험하는 이유는?",
            "answer": "허용 구간 바로 바깥을 거부하는지 확인하기 위해서입니다. 2와 8은 경계 포함 여부를 확인합니다."
          }
        },
        {
          "h": "조건·결정·MC/DC",
          "text": "결정 커버리지는 전체 판단의 참·거짓을, 조건 커버리지는 각 논리 조건의 참·거짓을 확인합니다. MC/DC는 다른 조건을 고정해 한 조건만 바꾸었을 때 전체 결과가 바뀜을 보여줍니다.",
          "bullets": [
            "A AND B에서 TT는 참이고 FT·TF는 거짓입니다.",
            "TT↔FT는 A의 독립 영향을 보여줍니다.",
            "TT↔TF는 B의 독립 영향을 보여줍니다."
          ],
          "example": "A AND B: {TT, FT, TF}\nA 독립성: TT/FT\nB 독립성: TT/TF",
          "trap": "MC/DC가 언제나 모든 조합을 요구하는 것은 아닙니다. 단락 평가 여부도 구분합니다.",
          "review": {
            "question": "A AND B의 전체 조합 4개 없이 MC/DC를 만족하는 집합은?",
            "answer": "TT, FT, TF입니다. 각각의 조건이 독립적으로 결과를 바꾸는 쌍이 있습니다."
          }
        },
        {
          "h": "회귀·재테스트·인수 기준",
          "text": "결함 수정 확인은 재테스트이고 변경의 주변 영향을 찾는 것은 회귀 테스트입니다. 인수 기준은 사용자가 기대한 업무 결과를 검증 가능한 조건으로 적습니다.",
          "bullets": [
            "주어진 조건·행동·결과로 사례를 구성합니다.",
            "정상·실패·재시도·중복 요청을 포함합니다.",
            "단위·통합·시스템·인수 테스트의 범위를 구분합니다."
          ],
          "example": "Given 재고 1개\nWhen 두 고객이 동시에 1개씩 구매\nThen 성공은 1건이고 재고는 0이다",
          "trap": "성공 화면 확인만으로 재고 일관성과 중복 결제를 검증할 수 없습니다.",
          "review": {
            "question": "재테스트를 통과해도 회귀 테스트가 필요한 이유는?",
            "answer": "수정한 결함이 해결됐더라도 공통 함수나 의존 기능에 새로운 결함을 만들 수 있기 때문입니다."
          }
        }
      ],
      "sources": [
        {
          "title": "ISTQB CTFL 공식 학습 범위",
          "url": "https://istqb.org/certifications/certified-tester-foundation-level-ctfl-v4-0/"
        }
      ]
    },
    {
      "id": "book-sql-lab",
      "module": "m2",
      "title": "실전 05 · JOIN·NULL·윈도 SQL",
      "summary": "행이 몇 개 나오는지 예측한 뒤 SQL을 작성합니다.",
      "lessons": [
        {
          "h": "LEFT JOIN과 NULL",
          "text": "LEFT JOIN은 오른쪽에서 일치하는 행이 없어도 왼쪽 행을 남깁니다. 오른쪽 열에 대한 조건을 WHERE에 넣으면 NULL로 채운 행이 제거될 수 있습니다.",
          "bullets": [
            "COUNT(*)는 결과 행을 셉니다.",
            "COUNT(o.id)는 o.id가 NULL인 행을 제외합니다.",
            "NULL 비교에는 IS NULL을 씁니다."
          ],
          "example": "SELECT c.id, COUNT(o.id) AS n\nFROM customers c LEFT JOIN orders o\n  ON o.customer_id=c.id AND o.status='PAID'\nGROUP BY c.id;",
          "trap": "주문 없는 고객의 주문 수를 COUNT(*)로 세면 1이 될 수 있습니다.",
          "review": {
            "question": "모든 고객을 유지하면서 완료 주문만 연결할 조건은 어디에 두나요?",
            "answer": "오른쪽 주문의 완료 상태 조건을 ON에 둡니다. WHERE로 필터하면 주문 없는 고객이 제거될 수 있습니다."
          }
        },
        {
          "h": "그룹 집계와 중복 증폭",
          "text": "WHERE는 집계 전 행을, HAVING은 집계 후 그룹을 거릅니다. 일대다 테이블 여러 개를 동시에 조인하면 곱으로 늘어난 행 때문에 합계가 부풀 수 있습니다.",
          "bullets": [
            "먼저 결과의 한 행이 무엇을 뜻하는지 정합니다.",
            "하위 테이블을 각각 집계한 뒤 연결하는 대안을 검토합니다.",
            "DISTINCT는 근본적인 조인 오류를 감추는 용도로 쓰지 않습니다."
          ],
          "example": "SELECT team, SUM(amount) AS total\nFROM sales WHERE status='DONE'\nGROUP BY team HAVING SUM(amount)>=500;",
          "trap": "주문 2개와 쿠폰 3개를 고객으로 조인하면 6행이 될 수 있습니다.",
          "review": {
            "question": "WHERE SUM(amount)>500이 일반적인 그룹 쿼리에서 잘못된 이유는?",
            "answer": "WHERE 단계에서는 그룹 집계 결과가 아직 없습니다. 그룹 합계 조건은 HAVING에 둡니다."
          }
        },
        {
          "h": "윈도 함수와 순위",
          "text": "윈도 함수는 행을 유지한 채 같은 파티션의 집계나 순위를 계산합니다. RANK는 동점 다음 번호를 건너뛰고 DENSE_RANK는 순위 번호를 연속으로 부여합니다.",
          "bullets": [
            "ROW_NUMBER는 행마다 번호를 줍니다.",
            "정확히 N행을 고를 때 동점 해소 기준을 정합니다.",
            "누적합에는 명시적 ROWS 프레임을 쓸 수 있습니다."
          ],
          "example": "SELECT id, team, score,\n ROW_NUMBER() OVER (PARTITION BY team\n ORDER BY score DESC, id) AS rn\nFROM results;",
          "trap": "순위를 WHERE에서 바로 필터하지 말고 CTE나 서브쿼리를 한 번 감쌉니다.",
          "review": {
            "question": "점수 100,100,80에서 RANK와 DENSE_RANK 결과는?",
            "answer": "RANK는 1,1,3이고 DENSE_RANK는 1,1,2입니다. ROW_NUMBER의 동점 순서는 추가 정렬 기준이 없으면 확정할 수 없습니다."
          }
        }
      ],
      "sources": [
        {
          "title": "PostgreSQL 테이블 표현식",
          "url": "https://www.postgresql.org/docs/current/queries-table-expressions.html"
        },
        {
          "title": "PostgreSQL 윈도 함수",
          "url": "https://www.postgresql.org/docs/current/tutorial-window.html"
        }
      ]
    },
    {
      "id": "book-db-lab",
      "module": "m2",
      "title": "실전 06 · DB 설계와 동시성",
      "summary": "종속성, 잠금, 실행 계획을 사례로 연결합니다.",
      "lessons": [
        {
          "h": "키와 함수 종속",
          "text": "후보키는 모든 속성을 결정하면서 더 줄일 수 없는 속성 집합입니다. 복합키 일부에 일반 속성이 의존하면 부분 종속을 의심하고, 키가 아닌 결정자를 통해 일반 속성이 결정되면 이행 종속을 검토합니다.",
          "bullets": [
            "후보키는 여러 개일 수 있습니다.",
            "선택된 후보키가 기본키입니다.",
            "분해 후 원래 사실을 손실 없이 복원할 수 있어야 합니다."
          ],
          "example": "등록(학번, 강좌번호, 학생명, 성적)\n키=(학번,강좌번호), 학번→학생명\n학생(학번,학생명) + 등록(학번,강좌번호,성적)",
          "trap": "테이블을 많이 나누는 것 자체가 정규화의 목적은 아닙니다.",
          "review": {
            "question": "학생명이 학번에만 의존할 때 복합키 테이블의 문제는?",
            "answer": "부분 함수 종속으로 학생명이 반복되며 갱신 이상이 생깁니다. 학생과 등록 사실을 분리합니다."
          }
        },
        {
          "h": "갱신 유실과 교착상태",
          "text": "동시에 읽은 옛 값을 각자 덮어쓰면 갱신 유실이 발생할 수 있습니다. 원자적 갱신, 행 잠금, 버전 검사를 상황에 맞게 사용합니다. 서로 반대 순서로 자원을 잠그면 교착상태 위험이 커집니다.",
          "bullets": [
            "재고 감소는 조건을 포함한 원자적 UPDATE를 검토합니다.",
            "일관된 잠금 순서는 순환 대기를 줄입니다.",
            "실패한 트랜잭션의 재시도 정책이 필요합니다."
          ],
          "example": "UPDATE stock SET qty=qty-1\nWHERE item_id=7 AND qty>0;\n-- 영향받은 행이 1개인지 확인한 뒤 커밋",
          "trap": "SELECT로 재고를 읽은 뒤 조건 없이 옛 값에서 1을 빼 저장하면 경쟁 조건이 생깁니다.",
          "review": {
            "question": "낙관적 동시성 제어에서 version 조건을 두는 이유는?",
            "answer": "읽은 뒤 다른 작업이 수정했는지 확인하기 위해서입니다. UPDATE의 영향 행이 0이면 충돌로 판단하고 다시 읽거나 재시도합니다."
          }
        },
        {
          "h": "인덱스와 실행 계획",
          "text": "인덱스는 읽기를 줄일 수 있지만 쓰기와 저장 비용을 늘립니다. 복합 인덱스의 열 순서, 선택도, 정렬·범위 조건을 실제 실행 계획으로 확인합니다.",
          "bullets": [
            "대부분 행을 읽는 쿼리는 전체 스캔이 더 유리할 수 있습니다.",
            "불필요한 열과 중복 인덱스를 줄입니다.",
            "예상 행 수와 실제 행 수 차이는 통계 문제의 단서입니다."
          ],
          "example": "WHERE tenant_id=3 AND created_at>=DATE '2026-01-01'\n후보 인덱스: (tenant_id, created_at)",
          "trap": "인덱스가 존재한다는 이유만으로 항상 사용된다고 단정하지 않습니다.",
          "review": {
            "question": "인덱스를 추가했는데 느려질 수 있는 작업은?",
            "answer": "INSERT·UPDATE·DELETE는 인덱스도 유지해야 하므로 비용이 늘 수 있습니다. 읽기 이득과 쓰기 부담을 함께 비교합니다."
          }
        }
      ],
      "sources": [
        {
          "title": "PostgreSQL 동시성 제어",
          "url": "https://www.postgresql.org/docs/current/mvcc.html"
        },
        {
          "title": "PostgreSQL 인덱스",
          "url": "https://www.postgresql.org/docs/current/indexes.html"
        }
      ]
    },
    {
      "id": "book-ai-lab",
      "module": "m2",
      "title": "실전 07 · AI 지표와 데이터 검증",
      "summary": "작은 혼동행렬로 직접 계산하고 데이터 누수를 찾아냅니다.",
      "lessons": [
        {
          "h": "혼동행렬과 임계값",
          "text": "TP는 실제 양성을 양성으로 맞힌 수, FP는 음성을 양성으로 오인한 수입니다. 정밀도는 양성 예측의 신뢰도, 재현율은 실제 양성을 찾아낸 비율입니다.",
          "bullets": [
            "정밀도=TP/(TP+FP)",
            "재현율=TP/(TP+FN)",
            "F1=2PR/(P+R), 분모가 0인 경우 처리 기준을 정합니다."
          ],
          "example": "TP=24, FP=6, FN=16\n정밀도=24/30=0.8\n재현율=24/40=0.6\nF1≈0.686",
          "trap": "불균형 데이터에서 높은 정확도만으로 좋은 모델이라고 판단하지 않습니다.",
          "review": {
            "question": "양성 임계값을 낮추면 일반적으로 무엇이 늘 수 있나요?",
            "answer": "양성으로 예측하는 건수가 늘어 재현율이 높아질 수 있지만 거짓 양성도 늘 수 있습니다. 실제 효과는 검증 데이터로 확인합니다."
          }
        },
        {
          "h": "분할·전처리·누수",
          "text": "학습과 평가를 분리한 뒤 학습 데이터에서만 전처리 통계를 구합니다. 같은 환자·사용자의 반복 기록이나 미래 정보가 양쪽에 섞이면 성능을 과대평가할 수 있습니다.",
          "bullets": [
            "시간 예측은 과거→미래 순서로 검증합니다.",
            "그룹 단위 분할이 필요한지 확인합니다.",
            "최종 테스트 세트는 튜닝에 반복 사용하지 않습니다."
          ],
          "example": "1. train/test 분할\n2. scaler.fit(train)\n3. train/test 각각 transform\n4. 학습 후 test 평가",
          "trap": "라벨을 직접 넣지 않아도 미래에만 알 수 있는 변수가 있으면 누수입니다.",
          "review": {
            "question": "고객 이탈 예측에 해지 처리일을 사용하면 왜 문제인가요?",
            "answer": "예측 시점에는 알 수 없는 미래 결과를 설명 변수에 넣으므로 데이터 누수입니다."
          }
        },
        {
          "h": "RAG와 모델 개선",
          "text": "RAG는 검색 문맥을 넣어 답변을 생성하고 파인튜닝은 학습으로 모델 파라미터를 조정합니다. 검색 품질과 생성 품질을 나누어 평가해야 실패 원인을 찾을 수 있습니다.",
          "bullets": [
            "검색: 관련 문서 포함 여부와 권한 필터",
            "생성: 근거 일치, 인용 정확성, 답변 거절",
            "운영: 지연, 비용, 문서 최신성, 삭제 반영"
          ],
          "example": "문서 검색 실패 → 청킹·검색어·재순위화 점검\n문서는 맞지만 답이 틀림 → 근거성·프롬프트·모델 점검",
          "trap": "외부 문서의 지시문을 실행 권한으로 해석하면 안 됩니다.",
          "review": {
            "question": "RAG가 붙으면 환각이 반드시 사라지나요?",
            "answer": "아닙니다. 검색 오류와 근거를 벗어난 생성이 모두 가능하므로 근거성 평가와 불확실할 때 답하지 않는 정책이 필요합니다."
          }
        }
      ],
      "sources": [
        {
          "title": "scikit-learn 전처리와 데이터 누수",
          "url": "https://scikit-learn.org/stable/common_pitfalls.html"
        },
        {
          "title": "scikit-learn 분류 지표",
          "url": "https://scikit-learn.org/stable/modules/model_evaluation.html"
        }
      ]
    },
    {
      "id": "book-os-lab",
      "module": "m3",
      "title": "실전 08 · 운영체제 계산 훈련",
      "summary": "시간축과 메모리 상태를 표로 그려 계산합니다.",
      "lessons": [
        {
          "h": "스케줄링 시간 계산",
          "text": "반환시간은 종료−도착, 대기시간은 반환−CPU 실행시간입니다. 예제에 I/O가 없다는 가정에서 이 식으로 대기시간을 계산합니다.",
          "bullets": [
            "FCFS는 도착 순서입니다.",
            "비선점 SJF는 선택 시 준비된 작업 중 실행시간이 짧은 것을 고릅니다.",
            "RR은 타임퀀텀과 문맥교환 비용을 확인합니다."
          ],
          "example": "모두 0에 도착, 실행시간 A=5 B=2 C=1\nFCFS A→B→C 대기: 0,5,7\n평균 대기=4",
          "trap": "작업의 도착 시각이 다르면 전체 작업을 처음부터 길이순으로만 정렬할 수 없습니다.",
          "review": {
            "question": "반환시간 12, CPU 실행시간 7, I/O 없음이면 대기시간은?",
            "answer": "12−7=5입니다."
          }
        },
        {
          "h": "페이지 교체와 LRU",
          "text": "페이지 폴트는 요청 페이지가 현재 물리 메모리에 없을 때 발생합니다. LRU는 마지막 사용 시점이 가장 오래된 페이지를 교체합니다.",
          "bullets": [
            "프레임의 초기 상태를 명시합니다.",
            "읽기 적중도 최근 사용 시점을 갱신합니다.",
            "FIFO는 들어온 순서이고 LRU는 사용 순서입니다."
          ],
          "example": "3프레임, 참조 1,2,3,1,4\n1·2·3에서 폴트 3회\n1 적중 후 4가 들어오며 2 교체\n총 4회",
          "trap": "적중했을 때 FIFO 순서는 바뀌지 않지만 LRU의 최근 사용 순서는 바뀝니다.",
          "review": {
            "question": "LRU가 2를 교체하는 이유는?",
            "answer": "1은 다시 사용했고 3보다 2의 마지막 사용이 오래됐기 때문입니다."
          }
        },
        {
          "h": "병렬화와 캐시의 한계",
          "text": "개선할 수 없는 부분은 전체 성능 향상의 상한을 만듭니다. 캐시는 적중시간과 미스 확률, 미스 추가 비용을 함께 계산합니다.",
          "bullets": [
            "Amdahl 가속비=1/((1-p)+p/s)",
            "평균 접근시간=적중시간+미스율×미스 추가 비용",
            "단위 ns·ms와 비율 %를 먼저 통일합니다."
          ],
          "example": "80%를 4배 빠르게 하면\n1/(0.2+0.8/4)=2.5배",
          "trap": "미스 패널티가 추가 비용인지 전체 미스 접근시간인지 문항 정의를 확인합니다.",
          "review": {
            "question": "전체의 절반만 무한히 빠르게 하면 최대 가속비는?",
            "answer": "1/(0.5+0)=2배입니다."
          }
        }
      ],
      "sources": []
    },
    {
      "id": "book-network-lab",
      "module": "m3",
      "title": "실전 09 · 네트워크 계산과 요청 흐름",
      "summary": "주소 계산에서 웹 응답까지 연결해 설명합니다.",
      "lessons": [
        {
          "h": "CIDR와 서브넷",
          "text": "IPv4는 32비트입니다. /p의 주소 수는 2^(32-p)이고 일반적인 서브넷에서 네트워크·브로드캐스트 두 주소를 제외합니다. /31 점대점과 /32는 별도 해석이 필요합니다.",
          "bullets": [
            "/26은 64주소 단위입니다.",
            "네트워크 주소는 호스트 비트를 0으로 만듭니다.",
            "브로드캐스트 주소는 호스트 비트를 1로 만듭니다."
          ],
          "example": "192.168.1.130/26\n블록: 128~191\n네트워크 .128, 브로드캐스트 .191\n일반 호스트 .129~.190 (62개)",
          "trap": "/24보다 /26이 더 많은 호스트를 갖는 것은 아닙니다.",
          "review": {
            "question": "/28의 전체 주소 수와 일반 호스트 수는?",
            "answer": "16개와 14개입니다."
          }
        },
        {
          "h": "신뢰성·흐름제어·혼잡제어",
          "text": "TCP는 순서 번호·확인 응답·재전송으로 신뢰성을 제공합니다. 흐름제어는 수신자가 감당할 양을, 혼잡제어는 네트워크 상황을 고려합니다.",
          "bullets": [
            "수신 윈도는 수신 버퍼와 관련됩니다.",
            "혼잡 윈도는 송신 측 네트워크 혼잡 판단과 관련됩니다.",
            "UDP 위에도 응용 계층에서 신뢰성 기능을 구현할 수 있습니다."
          ],
          "example": "TCP: 연결 설정→데이터 전송→연결 종료\n데이터 유실: 타임아웃/중복 ACK 등을 통한 재전송",
          "trap": "UDP를 쓴다는 사실만으로 모든 상위 프로토콜이 신뢰성을 제공하지 않는다고 단정하지 않습니다.",
          "review": {
            "question": "흐름제어와 혼잡제어가 보호하는 대상은?",
            "answer": "흐름제어는 수신 측 처리 여력, 혼잡제어는 네트워크의 전송 여력입니다."
          }
        },
        {
          "h": "DNS·TLS·HTTP",
          "text": "주소 확인, 전송 연결, TLS 협상과 인증서 검증, HTTP 요청·응답을 구분합니다. 연결 재사용과 캐시가 있으면 일부 단계는 생략될 수 있습니다.",
          "bullets": [
            "DNS A는 IPv4, AAAA는 IPv6 주소 레코드입니다.",
            "TLS는 전송 중 기밀성과 무결성을 제공합니다.",
            "401은 인증 관련, 403은 요청 거부를 나타냅니다."
          ],
          "example": "새 HTTPS 연결의 단순 모델:\nDNS → TCP → TLS → HTTP\nHTTP/3는 QUIC 기반이므로 TCP 단계 모델과 다릅니다.",
          "trap": "HTTPS가 서버 내부 저장 데이터와 모든 응용 취약점까지 보호하지는 않습니다.",
          "review": {
            "question": "HTTPS만 적용하면 SQL 삽입 공격도 막을 수 있나요?",
            "answer": "아닙니다. 전송 암호화와 SQL 구조·데이터 분리는 서로 다른 통제입니다."
          }
        }
      ],
      "sources": [
        {
          "title": "RFC 9293 · TCP",
          "url": "https://www.rfc-editor.org/rfc/rfc9293"
        },
        {
          "title": "RFC 9110 · HTTP 의미",
          "url": "https://www.rfc-editor.org/rfc/rfc9110"
        }
      ]
    },
    {
      "id": "book-security-lab",
      "module": "m3",
      "title": "실전 10 · 공격과 통제를 짝짓기",
      "summary": "대책의 이름과 함께 어느 경로를 차단하는지 답합니다.",
      "lessons": [
        {
          "h": "XSS·CSRF·SQL 삽입",
          "text": "XSS는 악성 스크립트가 사용자 브라우저에서 실행되는 문제, CSRF는 인증된 사용자의 브라우저가 원치 않는 요청을 보내는 문제입니다. SQL 삽입은 입력이 SQL 구조에 영향을 주는 문제입니다.",
          "bullets": [
            "XSS: 문맥에 맞는 출력 인코딩과 안전한 DOM API",
            "CSRF: 토큰·SameSite 등 요청 출처와 의도 검증",
            "SQL 삽입: 파라미터 바인딩, 동적 식별자는 허용 목록"
          ],
          "example": "게시글에 스크립트 → XSS\n외부 페이지가 송금 요청 유발 → CSRF\n입력으로 WHERE 의미 변경 → SQL 삽입",
          "trap": "입력 검증 하나만으로 모든 공격 경로를 해결했다고 쓰지 않습니다.",
          "review": {
            "question": "HttpOnly 쿠키가 XSS 피해를 전부 막나요?",
            "answer": "아닙니다. 스크립트의 쿠키 읽기를 제한하지만 사용자의 브라우저에서 요청을 보내는 등 다른 피해는 가능합니다."
          }
        },
        {
          "h": "암호화·해시·서명",
          "text": "암호화는 키로 복호화할 수 있고 해시는 일반적으로 원문 복원을 목적으로 하지 않습니다. 전자서명은 개인키로 생성하고 대응하는 공개키로 검증합니다.",
          "bullets": [
            "기밀성: 암호화",
            "변조 탐지와 출처 검증: 적절히 검증된 서명",
            "비밀번호: Salt와 비밀번호 전용 해시, 평문 복구 기능 배제"
          ],
          "example": "배포 파일 + 서명\n수신자는 신뢰하는 공개키로 서명 검증\n파일이 바뀌면 검증 실패",
          "trap": "전자서명 자체가 문서 내용을 숨기지는 않습니다. 공개키의 신뢰도 함께 확인해야 합니다.",
          "review": {
            "question": "암호화된 파일과 서명된 파일은 목적이 어떻게 다른가요?",
            "answer": "암호화는 내용을 숨기는 목적이고, 서명은 변경 여부와 서명 키 소유자의 출처를 검증하는 목적입니다."
          }
        },
        {
          "h": "침해사고와 복구 검증",
          "text": "사고 대응은 탐지, 범위 확인, 격리, 원인 제거, 복구, 재발 방지로 연결합니다. 증거를 보존하면서 공격자의 접근 경로와 영향을 받은 자산을 파악합니다.",
          "bullets": [
            "로그·시각·수집자를 기록합니다.",
            "정상 백업도 복원 시험을 거쳐야 합니다.",
            "계정·키 탈취 시 관련 접근을 회수하고 영향 범위를 확인합니다."
          ],
          "example": "랜섬웨어 의심 → 영향 장비 격리\n증거 보존 → 침입 경로 제거\n검증된 백업 복구 → 재연결 전 무결성 확인",
          "trap": "백업 성공 메시지가 실제 복구 성공을 보장하지 않습니다.",
          "review": {
            "question": "사고 장비를 즉시 초기화하기 전에 고려할 것은?",
            "answer": "증거와 로그 보존, 영향 범위, 격리, 복구 순서입니다. 증거를 잃으면 원인과 확산 경로를 분석하기 어렵습니다."
          }
        }
      ],
      "sources": [
        {
          "title": "OWASP XSS 예방",
          "url": "https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html"
        },
        {
          "title": "OWASP CSRF 예방",
          "url": "https://cheatsheetseries.owasp.org/cheatsheets/Cross-Site_Request_Forgery_Prevention_Cheat_Sheet.html"
        }
      ]
    },
    {
      "id": "book-pm-lab",
      "module": "m4",
      "title": "실전 11 · 일정·EVM·투자 계산",
      "summary": "공식을 대입한 뒤 수치가 뜻하는 의사결정까지 설명합니다.",
      "lessons": [
        {
          "h": "주공정과 여유시간",
          "text": "프로젝트 완료 시점은 가장 긴 선행 경로의 길이로 결정됩니다. 전진 계산은 ES·EF, 후진 계산은 LS·LF를 구하고 총 여유는 LS−ES로 계산합니다.",
          "bullets": [
            "병렬 경로 기간을 모두 더하지 않습니다.",
            "주공정은 여러 개일 수 있습니다.",
            "단축 후 새 주공정이 생길 수 있습니다."
          ],
          "example": "A(2) 후 B(4), C(3) 병렬, 모두 끝나면 D(2)\nA-B-D=8, A-C-D=7\n전체 8, C의 총 여유 1",
          "trap": "짧은 경로의 작업만 줄이면 완료 시점이 바뀌지 않을 수 있습니다.",
          "review": {
            "question": "위 네트워크에서 C를 1일 줄이면 전체 기간은?",
            "answer": "여전히 8일입니다. A-B-D 경로가 전체 완료 시점을 결정합니다."
          }
        },
        {
          "h": "EVM과 완료예상원가",
          "text": "EV는 완료한 작업의 예산 가치, PV는 계획 가치, AC는 실제 비용입니다. EAC는 현재 비용 효율이 계속된다는 가정 등 계산 전제를 명시해야 합니다.",
          "bullets": [
            "CV=EV−AC, SV=EV−PV",
            "CPI=EV/AC, SPI=EV/PV",
            "동일 비용 효율 지속 가정: EAC=BAC/CPI"
          ],
          "example": "BAC=1000, EV=400, AC=500, PV=450\nCPI=0.8, SPI≈0.889\nEAC=1250, ETC=EAC−AC=750",
          "trap": "SPI는 금액 기반 비율입니다. 지연 일수를 SPI만으로 직접 환산하지 않습니다.",
          "review": {
            "question": "CPI가 0.8이라는 것은 무엇을 뜻하나요?",
            "answer": "실제 비용 1단위당 예산상 작업 가치 0.8단위를 얻었다는 뜻으로 비용 효율이 계획보다 낮습니다."
          }
        },
        {
          "h": "ROI·회수기간·NPV",
          "text": "ROI는 문항에서 정의한 순편익과 투자비용을 구분해서 계산합니다. 단순 회수기간은 현금흐름이 일정할 때 초기투자/연간 순현금유입입니다. NPV는 미래 현금을 현재 가치로 할인합니다.",
          "bullets": [
            "총편익이면 비용을 빼 순편익을 구합니다.",
            "불규칙한 현금흐름은 누적 회수액을 계산합니다.",
            "NPV=각 기간 현금흐름의 현재가치 합−초기투자"
          ],
          "example": "투자 200, 1년 후 순현금유입 230, 할인율 10%\nNPV=230/1.1−200≈9.09",
          "trap": "이미 순편익이라고 주어진 값에서 같은 비용을 다시 빼지 않습니다.",
          "review": {
            "question": "초기투자 600, 매년 순현금유입 150의 단순 회수기간은?",
            "answer": "600/150=4년입니다. 이 단순 계산은 화폐의 시간가치를 반영하지 않습니다."
          }
        }
      ],
      "sources": [
        {
          "title": "PMI EVM 분석",
          "url": "https://www.pmi.org/learning/library/evm-data-analysis-executive-action-8520"
        }
      ]
    },
    {
      "id": "book-business-lab",
      "module": "m4",
      "title": "실전 12 · 서술·통합 답안 훈련",
      "summary": "추상적인 용어를 사례의 목표·제약·검증으로 연결합니다.",
      "lessons": [
        {
          "h": "전략에서 KPI까지",
          "text": "사업 목표를 먼저 정한 뒤 병목, 대안, 우선순위, 성과 지표를 연결합니다. SWOT의 강점·약점은 내부, 기회·위협은 외부 환경의 관점입니다.",
          "bullets": [
            "목표: 상담 대기시간 감소",
            "대안: FAQ 개선, 상담원 배치, AI 보조",
            "KPI: 대기시간 중앙값·95백분위수(p95), 재문의율"
          ],
          "example": "목표: 대기 10분→5분\n제약: 예산 2000만 원, 민감정보 외부 반출 제한\n검증: 2주 파일럿에서 대기시간·오답률 비교",
          "trap": "도입 건수 같은 활동 지표만으로 사업 효과를 증명할 수 없습니다.",
          "review": {
            "question": "AI 상담 도입 성공을 비용 절감만으로 평가하면 빠지는 것은?",
            "answer": "응답 정확성, 고객 만족, 재문의, 개인정보, 장애 대응 등 서비스 품질과 위험입니다."
          }
        },
        {
          "h": "변경·이해관계자·의사결정",
          "text": "요청, 영향 분석, 승인, 기준선 갱신, 구현, 검증의 연결을 유지합니다. 의사결정권자와 수행 담당자를 구분하고 의견 수렴과 전달 대상을 명시합니다.",
          "bullets": [
            "변경의 일정·비용·품질·위험 영향을 계산합니다.",
            "RACI의 A는 최종 책임, R은 실행 책임입니다.",
            "회의록에는 결정·담당자·기한을 남깁니다."
          ],
          "example": "요청: 배포 3일 전 신규 인증 추가\n영향: 회귀시험 2일, 연동 3일\n대안: 출시 연기 / 기능 다음 릴리스\n승인 후 계획과 추적표 갱신",
          "trap": "요청자가 중요하다고 해도 승인 절차와 영향 분석을 생략하지 않습니다.",
          "review": {
            "question": "고객의 긴급 변경을 받자마자 개발하면 어떤 문제가 있나요?",
            "answer": "범위·일정·비용과 검증 책임이 불명확해지고 기존 약속을 지키지 못할 수 있습니다."
          }
        },
        {
          "h": "450자 답안과 산출물 검수",
          "text": "서술형은 결론을 먼저 쓰고 사례의 제약에 맞는 근거와 통제를 연결합니다. 수행형은 요청한 산출물과 필수 항목을 체크하면서 작성합니다.",
          "bullets": [
            "서술: 판단→근거→적용→검증",
            "설계: 구성요소→관계→예외→검증",
            "계산: 식→대입→단위→해석"
          ],
          "example": "“단일 DB 장애가 전체 주문을 중단하므로 복제와 장애 전환을 적용한다. 지연·중복 처리 위험을 점검하고 정기 전환 훈련에서 복구 시간과 데이터 손실을 측정한다.”",
          "trap": "키워드를 나열해도 사례의 원인과 해결 근거가 없으면 완전한 답안이 아닙니다.",
          "review": {
            "question": "설계 문제 제출 전에 확인할 네 가지는?",
            "answer": "요구사항 누락, 관계와 다중성, 실패·예외 경로, 검증 방법입니다."
          }
        }
      ],
      "sources": []
    }
  ],
  "questions": [
    {
      "module": "m1",
      "chapterId": "book-trace-lab",
      "type": "객관식",
      "question": "Python에서 a=[1,2]; b=a; b.append(3)을 실행한 뒤 a는?",
      "options": [
        "[1,2]",
        "[1,2,3]",
        "[3]",
        "오류"
      ],
      "correct": 1,
      "answer": "b와 a는 같은 리스트를 참조합니다. append는 그 객체를 변경하므로 a에서도 세 원소가 보입니다.",
      "keys": [],
      "minutes": 2,
      "day": 1,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m1",
      "chapterId": "book-trace-lab",
      "type": "객관식",
      "question": "a=[[1],[2]]; b=a[:]; b[0]=[9] 이후 a[0]은?",
      "options": [
        "[1]",
        "[9]",
        "[1,9]",
        "None"
      ],
      "correct": 0,
      "answer": "바깥 리스트가 복사되어 b의 첫 참조를 바꾸는 것은 a에 영향을 주지 않습니다. 공유 내부 리스트에 append한 경우와 구분하세요.",
      "keys": [],
      "minutes": 2,
      "day": 1,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m1",
      "chapterId": "book-trace-lab",
      "type": "객관식",
      "question": "s=0; for i in range(2,8,2): s+=i 와 같은 반복의 최종 s는?",
      "options": [
        "6",
        "8",
        "12",
        "20"
      ],
      "correct": 2,
      "answer": "range(2,8,2)는 2,4,6입니다. 종료값 8은 포함되지 않으므로 합은 12입니다.",
      "keys": [],
      "minutes": 2,
      "day": 1,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m1",
      "chapterId": "book-trace-lab",
      "type": "객관식",
      "question": "정수 i=1에서 시작해 i<32인 동안 i*=2를 반복하면 실행 횟수는?",
      "options": [
        "4",
        "5",
        "6",
        "32"
      ],
      "correct": 1,
      "answer": "반복 시작 시 i는 1,2,4,8,16입니다. 다음 값 32는 조건을 만족하지 않아 5회입니다.",
      "keys": [],
      "minutes": 2,
      "day": 1,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m1",
      "chapterId": "book-trace-lab",
      "type": "객관식",
      "question": "C에서 int a[]={3,6,9}; int *p=a; 일 때 *(p+2)는?",
      "options": [
        "3",
        "6",
        "9",
        "주소값 2"
      ],
      "correct": 2,
      "answer": "int 포인터의 +2는 int 원소 두 개만큼 이동합니다. 세 번째 원소 값은 9입니다.",
      "keys": [],
      "minutes": 2,
      "day": 1,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m1",
      "chapterId": "book-trace-lab",
      "type": "객관식",
      "question": "Java에서 new String(\"x\")로 각각 만든 두 객체 a,b의 비교로 맞는 것은?",
      "options": [
        "a==b는 true, equals는 false",
        "둘 다 false",
        "a==b는 false, a.equals(b)는 true",
        "둘 다 항상 true"
      ],
      "correct": 2,
      "answer": "별도로 생성한 객체의 참조는 다르지만 String.equals는 내용이 같은지 비교합니다. 문자열 리터럴 풀과 혼동하지 마세요.",
      "keys": [],
      "minutes": 2,
      "day": 1,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m1",
      "chapterId": "book-trace-lab",
      "type": "객관식",
      "question": "재귀 f(0)=1, f(n)=2*f(n-1)일 때 f(4)는?",
      "options": [
        "4",
        "8",
        "16",
        "32"
      ],
      "correct": 2,
      "answer": "1→2→4→8→16으로 네 번 두 배가 됩니다. 기저값을 0으로 착각하면 전체 결과가 달라집니다.",
      "keys": [],
      "minutes": 2,
      "day": 1,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m1",
      "chapterId": "book-algorithm-lab",
      "type": "객관식",
      "question": "[2,4,4,4,9]에서 4 이상의 첫 위치를 0부터 세면?",
      "options": [
        "0",
        "1",
        "2",
        "4"
      ],
      "correct": 1,
      "answer": "lower_bound는 같은 값이 여러 개일 때 첫 위치를 찾습니다. 값 4가 처음 나오는 인덱스는 1입니다.",
      "keys": [],
      "minutes": 2,
      "day": 1,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m1",
      "chapterId": "book-algorithm-lab",
      "type": "객관식",
      "question": "인접 리스트 그래프에서 모든 정점·간선을 한 번씩 확인하는 BFS의 시간복잡도는?",
      "options": [
        "O(V+E)",
        "O(V×E)",
        "O(log V)",
        "항상 O(V²)"
      ],
      "correct": 0,
      "answer": "각 정점은 한 번 큐에 들어가고 인접 간선을 훑으므로 O(V+E)입니다. 인접 행렬 구현은 다를 수 있습니다.",
      "keys": [],
      "minutes": 2,
      "day": 1,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m1",
      "chapterId": "book-algorithm-lab",
      "type": "객관식",
      "question": "동전 {1,3,4}로 금액 6을 만드는 최소 동전 수는?",
      "options": [
        "1",
        "2",
        "3",
        "6"
      ],
      "correct": 1,
      "answer": "3+3으로 2개입니다. 큰 동전부터 고르면 4+1+1이 되어 3개를 쓰므로 이 동전 체계에서 탐욕법은 실패합니다.",
      "keys": [],
      "minutes": 2,
      "day": 1,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m1",
      "chapterId": "book-algorithm-lab",
      "type": "객관식",
      "question": "하루에 가장 빠른 작업을 반복해서 꺼내야 합니다. 최소 우선순위 접근에 적합한 구조는?",
      "options": [
        "최소 힙",
        "스택",
        "정렬하지 않은 연결 리스트만",
        "FIFO 큐"
      ],
      "correct": 0,
      "answer": "최소 힙은 최솟값 조회 O(1), 삽입·삭제 O(log n)을 제공합니다. FIFO는 우선순위가 아니라 도착 순서입니다.",
      "keys": [],
      "minutes": 2,
      "day": 1,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m1",
      "chapterId": "book-algorithm-lab",
      "type": "객관식",
      "question": "모든 간선 가중치가 음수가 아닌 최단 경로 문제에 적합한 알고리즘은?",
      "options": [
        "Dijkstra",
        "위상 정렬만",
        "이진 탐색",
        "선택 정렬"
      ],
      "correct": 0,
      "answer": "음수 가중치가 없으면 Dijkstra의 탐욕적 거리 확정이 성립합니다. 음수 간선이 있으면 별도 알고리즘과 조건을 검토합니다.",
      "keys": [],
      "minutes": 2,
      "day": 1,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m1",
      "chapterId": "book-design-lab",
      "type": "객관식",
      "question": "UML 일반화 관계의 빈 삼각형 끝은 어느 쪽을 가리키나요?",
      "options": [
        "하위 클래스",
        "상위 클래스",
        "호출하는 객체",
        "다중성이 많은 객체"
      ],
      "correct": 1,
      "answer": "하위 타입에서 상위 타입으로 향합니다. 합성 관계의 마름모와 기호·방향을 구분하세요.",
      "keys": [],
      "minutes": 2,
      "day": 2,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m1",
      "chapterId": "book-design-lab",
      "type": "객관식",
      "question": "UML에서 private 속성을 표시하는 기호는?",
      "options": [
        "+",
        "#",
        "-",
        "~public"
      ],
      "correct": 2,
      "answer": "-는 private, +는 public, #는 protected입니다. 속성 이름 앞에 표시합니다.",
      "keys": [],
      "minutes": 2,
      "day": 2,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m1",
      "chapterId": "book-design-lab",
      "type": "객관식",
      "question": "시퀀스 다이어그램에서 승인 성공/실패의 대안 경로에 적합한 프레임은?",
      "options": [
        "loop",
        "alt",
        "class",
        "package"
      ],
      "correct": 1,
      "answer": "alt는 조건별 대안 경로입니다. loop는 반복 메시지를 표현합니다.",
      "keys": [],
      "minutes": 2,
      "day": 2,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m1",
      "chapterId": "book-design-lab",
      "type": "객관식",
      "question": "서로 다른 결제 방식을 같은 인터페이스로 교체 가능하게 묶는 행위 패턴은?",
      "options": [
        "Singleton",
        "Strategy",
        "Builder",
        "Prototype"
      ],
      "correct": 1,
      "answer": "Strategy는 알고리즘을 캡슐화해 교체할 수 있게 합니다. 객체 생성 방식에 초점을 둔 Builder·Prototype과 구분합니다.",
      "keys": [],
      "minutes": 2,
      "day": 2,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m1",
      "chapterId": "book-testing-lab",
      "type": "객관식",
      "question": "A AND B에 대해 TT와 FF만 시험했습니다. 논리값 기준으로 아직 확인하지 못한 것은?",
      "options": [
        "결정의 참·거짓",
        "각 조건의 참·거짓 조합 출현",
        "각 조건의 독립적인 결과 영향",
        "참 결과"
      ],
      "correct": 2,
      "answer": "TT↔FF는 두 조건이 동시에 바뀌므로 독립 영향을 입증하지 못합니다. MC/DC에는 TT/FT와 TT/TF 같은 쌍이 필요합니다. 단락 실행 여부는 별도로 고려합니다.",
      "keys": [],
      "minutes": 2,
      "day": 2,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m1",
      "chapterId": "book-testing-lab",
      "type": "객관식",
      "question": "이미 고친 결함이 해결됐는지 같은 실패 사례로 확인하는 시험은?",
      "options": [
        "재테스트",
        "부하 시험",
        "스트레스 시험",
        "사용성 시험"
      ],
      "correct": 0,
      "answer": "재테스트는 수정된 결함의 해결을 확인합니다. 회귀 테스트는 변경으로 다른 부분이 깨지지 않았는지 확인합니다.",
      "keys": [],
      "minutes": 2,
      "day": 2,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m1",
      "chapterId": "book-testing-lab",
      "type": "객관식",
      "question": "입력이 정수 10~20 포함일 때 경계 바로 밖의 두 값은?",
      "options": [
        "10,20",
        "9,21",
        "11,19",
        "0,100"
      ],
      "correct": 1,
      "answer": "9와 21은 경계의 바로 바깥입니다. 포함 경계 10·20과 안쪽 값도 조합해 테스트합니다.",
      "keys": [],
      "minutes": 2,
      "day": 2,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m1",
      "chapterId": "book-design-lab",
      "type": "객관식",
      "question": "메서드가 구체적인 메일 공급자 객체를 직접 생성합니다. 교체와 테스트를 쉽게 하려면?",
      "options": [
        "인터페이스를 주입한다",
        "메서드를 더 길게 만든다",
        "모든 필드를 public으로 둔다",
        "예외를 모두 무시한다"
      ],
      "correct": 0,
      "answer": "상위 정책이 추상화에 의존하고 구현을 주입받으면 공급자 교체와 테스트 대역 사용이 쉬워집니다.",
      "keys": [],
      "minutes": 2,
      "day": 2,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m1",
      "chapterId": "book-trace-lab",
      "type": "서술형",
      "question": "Python의 얕은 복사와 깊은 복사를 중첩 리스트 사례로 비교하고 깊은 복사가 언제나 최선은 아닌 이유를 쓰세요.",
      "options": null,
      "correct": "",
      "answer": "얕은 복사는 바깥 컨테이너를 새로 만들고 내부 객체 참조를 공유합니다. 깊은 복사는 중첩 객체까지 재귀적으로 복사합니다. 독립 변경이 필요하면 깊은 복사를 검토하지만 메모리·시간 비용이 크고 의도한 공유 관계나 외부 자원은 별도 처리가 필요합니다.",
      "keys": [
        "참조",
        "공유",
        "메모리"
      ],
      "rubric": [
        "바깥/내부 객체를 구분한다",
        "변경 전파 사례를 설명한다",
        "복사 비용이나 공유 의도를 언급한다"
      ],
      "minutes": 6,
      "day": 1,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m1",
      "chapterId": "book-algorithm-lab",
      "type": "서술형",
      "question": "BFS 구현에서 방문 표시를 큐에서 꺼낼 때까지 미루면 어떤 일이 생길 수 있나요? 간선이 많은 그래프를 생각해 설명하세요.",
      "options": null,
      "correct": "",
      "answer": "같은 정점이 여러 부모에게서 중복으로 큐에 들어갈 수 있습니다. 큐에 넣을 때 방문 처리하고 거리를 최초 설정하면 중복 삽입을 줄이며 가중치 없는 그래프의 최단 간선 수를 유지할 수 있습니다.",
      "keys": [
        "중복",
        "큐",
        "방문"
      ],
      "rubric": [
        "중복 큐 삽입을 지적한다",
        "enqueue 시점 방문 처리를 제시한다",
        "무가중치 최단 거리 조건을 적는다"
      ],
      "minutes": 6,
      "day": 1,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m1",
      "chapterId": "book-testing-lab",
      "type": "서술형",
      "question": "로그인 정책을 5회 실패 시 잠금으로 바꿨습니다. 재테스트와 회귀 테스트를 각각 두 사례씩 제시하세요.",
      "options": null,
      "correct": "",
      "answer": "재테스트: 4회 실패 후 아직 미잠금, 5회 실패 후 잠금이라는 수정 사항을 확인합니다. 회귀: 정상 로그인·로그아웃이 유지되는지, 비밀번호 재설정과 잠금 해제 후 로그인 흐름이 정상인지 확인합니다. 실패 횟수 갱신의 동시성과 계정별 분리도 점검합니다.",
      "keys": [
        "5회",
        "정상 로그인",
        "잠금"
      ],
      "rubric": [
        "4/5회 경계와 기대 결과",
        "기존 정상 흐름 두 가지",
        "계정 상태 또는 예외 조건"
      ],
      "minutes": 6,
      "day": 2,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m1",
      "chapterId": "book-design-lab",
      "type": "서술형",
      "question": "알림 전송 함수가 메일·문자 공급자의 API 호출과 메시지 작성, 로그 저장을 모두 처리합니다. 두 단계로 리팩토링 계획을 제안하세요.",
      "options": null,
      "correct": "",
      "answer": "먼저 현재 동작을 확인하는 테스트를 고정하고 메시지 작성·전송·로그 책임을 분리합니다. 다음으로 전송 인터페이스와 공급자별 구현을 만들고 의존성을 주입합니다. 기존 동작을 유지하면서 단계마다 회귀 테스트하고 실패·재시도 책임을 명확히 합니다.",
      "keys": [
        "책임",
        "인터페이스",
        "테스트"
      ],
      "rubric": [
        "책임을 구체적으로 분리한다",
        "교체 가능한 추상화를 둔다",
        "동작 보존 검증을 포함한다"
      ],
      "minutes": 6,
      "day": 2,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m1",
      "chapterId": "book-testing-lab",
      "type": "서술형",
      "question": "결정 커버리지 100%가 결함이 없음을 보장하지 않는 이유를 입력 데이터와 상태 관점에서 설명하세요.",
      "options": null,
      "correct": "",
      "answer": "각 분기 결과를 통과했어도 모든 입력 조합, 경계값, 실행 순서, 동시성 상태를 시험한 것은 아닙니다. 예를 들어 정상·실패 경로를 각각 한 번 실행해도 빈 입력이나 중복 요청 오류는 남을 수 있습니다. 위험에 맞춰 경계값·상태 전이·회귀 테스트를 보완합니다.",
      "keys": [
        "입력",
        "경계",
        "상태"
      ],
      "rubric": [
        "커버리지의 범위를 설명한다",
        "놓치는 결함 사례를 든다",
        "보완 시험을 제시한다"
      ],
      "minutes": 6,
      "day": 2,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m1",
      "chapterId": "book-algorithm-lab",
      "type": "수행형",
      "question": "정렬 배열에서 target 이상인 첫 인덱스를 반환하는 lower_bound 함수를 Python 또는 의사코드로 작성하세요. 없으면 길이를 반환하고 빈 배열도 처리하세요.",
      "options": null,
      "correct": "",
      "answer": "def lower_bound(a, target):\n    lo, hi = 0, len(a)\n    while lo < hi:\n        mid = (lo + hi) // 2\n        if a[mid] < target:\n            lo = mid + 1\n        else:\n            hi = mid\n    return lo\n\n시간 O(log n), 추가 공간 O(1). 빈 배열은 0을 반환합니다.",
      "keys": [
        "lo",
        "hi",
        "mid",
        "return"
      ],
      "rubric": [
        "구간 [lo,hi)를 유지한다",
        "모든 반복에서 구간이 줄어든다",
        "중복·없음·빈 배열을 처리한다"
      ],
      "minutes": 10,
      "day": 1,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m1",
      "chapterId": "book-trace-lab",
      "type": "수행형",
      "question": "문자열이 (), [], {} 괄호만 포함한다고 가정합니다. 올바른 중첩인지 판단하는 함수를 작성하고 \"([)]\"를 테스트하세요.",
      "options": null,
      "correct": "",
      "answer": "def valid(s):\n    stack = []\n    pairs = {')': '(', ']': '[', '}': '{'}\n    for ch in s:\n        if ch in '([{':\n            stack.append(ch)\n        elif not stack or stack.pop() != pairs[ch]:\n            return False\n    return not stack\n\n\"([)]\"는 False. 시간 O(n), 공간 O(n).",
      "keys": [
        "stack",
        "return"
      ],
      "rubric": [
        "닫는 괄호에서 빈 스택을 검사한다",
        "종류가 맞는지 비교한다",
        "종료 후 잔여 여는 괄호를 검사한다"
      ],
      "minutes": 10,
      "day": 1,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m1",
      "chapterId": "book-design-lab",
      "type": "수행형",
      "question": "도서관에서 도서는 여러 물리 복본을 갖고, 회원은 복본을 대출합니다. 도서·복본·회원·대출 클래스를 속성, 키, 다중성으로 설계하세요.",
      "options": null,
      "correct": "",
      "answer": "도서(bookId, title) 1 — 1..* 복본(copyId, status)\n회원(memberId, name) 1 — 0..* 대출(loanId, borrowedAt, returnedAt)\n복본 1 — 0..* 대출\n대출은 과거 이력을 포함합니다. 동일 복본의 미반납 대출은 최대 1건이라는 제약을 별도로 둡니다.",
      "keys": [
        "복본",
        "대출",
        "미반납"
      ],
      "rubric": [
        "서지 정보와 물리 복본을 분리한다",
        "대출 이력 엔티티를 둔다",
        "동시 미반납 제약을 명시한다"
      ],
      "minutes": 10,
      "day": 2,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m1",
      "chapterId": "book-testing-lab",
      "type": "수행형",
      "question": "정수 수량 1~5를 받고 재고보다 많으면 거부하는 주문 함수의 테스트 표를 입력·재고·기대 결과로 6행 작성하세요.",
      "options": null,
      "correct": "",
      "answer": "수량 0 / 재고 5 / 범위 오류\n수량 1 / 재고 5 / 성공\n수량 5 / 재고 5 / 성공, 재고 0\n수량 6 / 재고 10 / 범위 오류\n수량 3 / 재고 2 / 재고 부족\n수량 1 / 재고 0 / 재고 부족\n거부 시 재고가 바뀌지 않는지도 확인합니다.",
      "keys": [
        "0",
        "1",
        "5",
        "6",
        "재고"
      ],
      "rubric": [
        "허용 경계와 바깥값을 포함한다",
        "수량 정상이어도 재고 부족을 시험한다",
        "거부 시 부작용을 확인한다"
      ],
      "minutes": 10,
      "day": 2,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m1",
      "chapterId": "book-algorithm-lab",
      "type": "수행형",
      "question": "동전 [1,3,4]로 금액 6을 만드는 최소 개수를 DP로 구하세요. 상태·초기값·전이와 dp[0..6]을 쓰세요.",
      "options": null,
      "correct": "",
      "answer": "dp[x]는 금액 x의 최소 동전 수입니다. dp[0]=0, 나머지는 무한대로 초기화합니다. x=1..6을 순회하고 c<=x인 동전마다 dp[x]=min(dp[x],dp[x-c]+1)을 적용합니다. 결과는 [0,1,2,1,1,2,2]이며 답은 2개(3+3)입니다.",
      "keys": [
        "dp",
        "min",
        "2"
      ],
      "rubric": [
        "상태와 초기값",
        "작은 금액부터 전이",
        "배열과 실제 동전 구성 일치"
      ],
      "minutes": 10,
      "day": 1,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m2",
      "chapterId": "book-sql-lab",
      "type": "객관식",
      "question": "테이블의 값이 [10,NULL,20]일 때 COUNT(*), COUNT(v), SUM(v)는?",
      "options": [
        "3,3,30",
        "3,2,30",
        "2,2,NULL",
        "3,2,NULL"
      ],
      "correct": 1,
      "answer": "COUNT(*)는 행 3개, COUNT(v)는 비NULL 값 2개를 셉니다. SUM은 NULL을 제외하여 30입니다.",
      "keys": [],
      "minutes": 2,
      "day": 3,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m2",
      "chapterId": "book-sql-lab",
      "type": "객관식",
      "question": "SQL에서 NULL = NULL의 논리값은?",
      "options": [
        "TRUE",
        "FALSE",
        "UNKNOWN",
        "0"
      ],
      "correct": 2,
      "answer": "NULL은 알 수 없는 값이므로 일반 등호 비교는 UNKNOWN입니다. NULL 여부는 IS NULL로 검사합니다.",
      "keys": [],
      "minutes": 2,
      "day": 3,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m2",
      "chapterId": "book-sql-lab",
      "type": "객관식",
      "question": "고객 한 명에 주문 2건, 쿠폰 3건이 있습니다. 두 하위 테이블을 고객ID만으로 모두 조인하면 몇 행인가요?",
      "options": [
        "2",
        "3",
        "5",
        "6"
      ],
      "correct": 3,
      "answer": "주문마다 쿠폰 3개가 결합하므로 2×3=6행입니다. 주문 금액을 단순 합하면 3배로 부풀 수 있습니다.",
      "keys": [],
      "minutes": 2,
      "day": 3,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m2",
      "chapterId": "book-sql-lab",
      "type": "객관식",
      "question": "WHERE 조건과 HAVING 조건의 적용 대상이 올바른 것은?",
      "options": [
        "WHERE 그룹, HAVING 행",
        "둘 다 원본 행만",
        "WHERE 집계 전 행, HAVING 집계 후 그룹",
        "순서와 대상이 항상 같다"
      ],
      "correct": 2,
      "answer": "WHERE로 행을 거른 뒤 그룹을 만들고 HAVING으로 집계 결과의 그룹을 거릅니다.",
      "keys": [],
      "minutes": 2,
      "day": 3,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m2",
      "chapterId": "book-sql-lab",
      "type": "객관식",
      "question": "점수 90,90,70을 내림차순 RANK로 매긴 결과는?",
      "options": [
        "1,2,3",
        "1,1,2",
        "1,1,3",
        "0,0,1"
      ],
      "correct": 2,
      "answer": "공동 1위 두 명 다음 순위는 3위입니다. DENSE_RANK라면 1,1,2입니다.",
      "keys": [],
      "minutes": 2,
      "day": 3,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m2",
      "chapterId": "book-sql-lab",
      "type": "객관식",
      "question": "각 부서별로 점수 순위를 다시 시작할 때 OVER 안에 필요한 것은?",
      "options": [
        "PARTITION BY dept",
        "GROUP BY 없이 DISTINCT만",
        "LIMIT dept",
        "DELETE PARTITION"
      ],
      "correct": 0,
      "answer": "PARTITION BY는 윈도 계산 범위를 부서별로 나눕니다. GROUP BY와 달리 개별 행을 유지합니다.",
      "keys": [],
      "minutes": 2,
      "day": 3,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m2",
      "chapterId": "book-sql-lab",
      "type": "객관식",
      "question": "SELECT에 없는 값을 포함하는 NOT IN 서브쿼리 결과에 NULL이 섞였습니다. 어떤 점을 주의해야 하나요?",
      "options": [
        "항상 모든 행이 남는다",
        "일치하지 않는 값도 UNKNOWN으로 제거될 수 있다",
        "NULL이 자동으로 0이 된다",
        "NULL이 자동으로 삭제된다"
      ],
      "correct": 1,
      "answer": "NOT IN은 NULL 때문에 UNKNOWN이 될 수 있습니다. 의도에 따라 NULL 제거 또는 상관 NOT EXISTS를 검토합니다.",
      "keys": [],
      "minutes": 2,
      "day": 3,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m2",
      "chapterId": "book-sql-lab",
      "type": "객관식",
      "question": "UNION ALL과 UNION의 주요 차이는?",
      "options": [
        "ALL은 중복을 유지한다",
        "ALL은 모든 NULL을 지운다",
        "UNION은 항상 더 빠르다",
        "UNION은 열 수가 달라도 합친다"
      ],
      "correct": 0,
      "answer": "UNION ALL은 중복 제거를 하지 않습니다. UNION은 중복을 제거하며 보통 그에 따른 처리 비용이 있습니다.",
      "keys": [],
      "minutes": 2,
      "day": 3,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m2",
      "chapterId": "book-db-lab",
      "type": "객관식",
      "question": "A→B, B→C가 있으면 추론 가능한 함수 종속은?",
      "options": [
        "C→A",
        "A→C",
        "B→A",
        "C→B"
      ],
      "correct": 1,
      "answer": "함수 종속의 이행성에 의해 A→C입니다. 역방향 종속은 주어진 조건만으로 보장되지 않습니다.",
      "keys": [],
      "minutes": 2,
      "day": 3,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m2",
      "chapterId": "book-db-lab",
      "type": "객관식",
      "question": "후보키의 두 핵심 성질은?",
      "options": [
        "정렬성과 연속성",
        "유일성과 최소성",
        "NULL 허용과 중복 허용",
        "암호화와 압축"
      ],
      "correct": 1,
      "answer": "모든 행을 유일하게 구분하고 구성 속성을 더 줄이면 그 성질을 잃는 최소 집합입니다.",
      "keys": [],
      "minutes": 2,
      "day": 3,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m2",
      "chapterId": "book-db-lab",
      "type": "객관식",
      "question": "A계좌를 잠근 T1은 B를 기다리고, B를 잠근 T2는 A를 기다립니다. 현상은?",
      "options": [
        "교착상태",
        "정규화",
        "해시 충돌",
        "전처리 누수"
      ],
      "correct": 0,
      "answer": "서로 보유한 자원을 기다리는 순환 대기입니다. 잠금 순서 통일과 피해 트랜잭션 재시도 등을 고려합니다.",
      "keys": [],
      "minutes": 2,
      "day": 3,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m2",
      "chapterId": "book-db-lab",
      "type": "객관식",
      "question": "version=4인 행을 읽은 후 UPDATE ... WHERE version=4가 0행을 변경했습니다. 가장 적절한 판단은?",
      "options": [
        "무조건 성공",
        "다른 변경 또는 행 삭제로 조건이 맞지 않을 수 있다",
        "인덱스가 삭제됐다",
        "테이블이 항상 비었다"
      ],
      "correct": 1,
      "answer": "낙관적 잠금의 충돌 신호일 수 있습니다. 다시 읽어 현재 상태를 확인하고 재시도나 사용자 충돌 처리를 합니다.",
      "keys": [],
      "minutes": 2,
      "day": 3,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m2",
      "chapterId": "book-db-lab",
      "type": "객관식",
      "question": "수백만 행 중 90%를 읽는 집계 쿼리에서 전체 스캔이 선택됐습니다. 맞는 설명은?",
      "options": [
        "DB 오류다",
        "인덱스가 있으면 반드시 인덱스를 써야 한다",
        "비용상 전체 스캔이 합리적일 수 있다",
        "정규형 위반이다"
      ],
      "correct": 2,
      "answer": "대부분의 행을 읽으면 인덱스 조회와 테이블 접근을 반복하는 것보다 전체 스캔이 쌀 수 있습니다. 실행 계획과 실제 시간을 확인합니다.",
      "keys": [],
      "minutes": 2,
      "day": 3,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m2",
      "chapterId": "book-db-lab",
      "type": "객관식",
      "question": "BEGIN 후 두 UPDATE를 수행하다 오류가 나서 전부 ROLLBACK했습니다. 관련 ACID 성질은?",
      "options": [
        "원자성",
        "가용성",
        "분할 내성",
        "중복성"
      ],
      "correct": 0,
      "answer": "원자성은 트랜잭션 작업을 모두 반영하거나 전혀 반영하지 않는 성질입니다. 지속성은 커밋 후 보존과 관련됩니다.",
      "keys": [],
      "minutes": 2,
      "day": 3,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m2",
      "chapterId": "book-ai-lab",
      "type": "객관식",
      "question": "TP=30, FP=10, FN=20일 때 정밀도는?",
      "options": [
        "0.50",
        "0.60",
        "0.75",
        "0.90"
      ],
      "correct": 2,
      "answer": "정밀도는 TP/(TP+FP)=30/40=0.75입니다. 재현율은 30/50=0.6입니다.",
      "keys": [],
      "minutes": 2,
      "day": 3,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m2",
      "chapterId": "book-ai-lab",
      "type": "객관식",
      "question": "실제 양성 50건 중 35건을 찾아냈습니다. 재현율은?",
      "options": [
        "35%",
        "50%",
        "70%",
        "85%"
      ],
      "correct": 2,
      "answer": "재현율은 찾아낸 실제 양성/전체 실제 양성=35/50=70%입니다.",
      "keys": [],
      "minutes": 2,
      "day": 3,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m2",
      "chapterId": "book-ai-lab",
      "type": "객관식",
      "question": "정상 990건·이상 10건에서 모두 정상으로 예측했습니다. 정확도와 이상 재현율은?",
      "options": [
        "99%, 0%",
        "99%, 99%",
        "1%, 100%",
        "100%, 0%"
      ],
      "correct": 0,
      "answer": "정확도는 990/1000=99%지만 이상 10건을 하나도 찾지 못해 이상 재현율은 0%입니다.",
      "keys": [],
      "minutes": 2,
      "day": 3,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m2",
      "chapterId": "book-ai-lab",
      "type": "객관식",
      "question": "내일 수요를 예측할 모델 검증에 가장 적절한 기본 분할 방향은?",
      "options": [
        "미래로 학습하고 과거로 검증",
        "시간 순서로 과거 학습·미래 검증",
        "동일 날짜를 양쪽에 복사",
        "평가 결과가 좋은 분할만 선택"
      ],
      "correct": 1,
      "answer": "실제 사용처럼 과거 정보로 미래를 예측하도록 시간 순서를 보존합니다. 무작위 분할은 시간적 누수를 만들 수 있습니다.",
      "keys": [],
      "minutes": 2,
      "day": 3,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m2",
      "chapterId": "book-ai-lab",
      "type": "객관식",
      "question": "훈련 정확도는 매우 높고 검증 정확도가 낮습니다. 우선 의심할 현상은?",
      "options": [
        "과적합",
        "모든 데이터의 완벽한 일반화",
        "항상 과소적합",
        "서버 장애만"
      ],
      "correct": 0,
      "answer": "훈련 데이터의 특징이나 잡음을 지나치게 학습했을 수 있습니다. 규제·복잡도·데이터와 검증 방식도 확인합니다.",
      "keys": [],
      "minutes": 2,
      "day": 3,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m2",
      "chapterId": "book-sql-lab",
      "type": "객관식",
      "question": "결과를 페이지로 나눌 때 ORDER BY가 없으면?",
      "options": [
        "항상 PK 순서다",
        "결과 순서를 보장할 수 없다",
        "항상 삽입 순서다",
        "항상 랜덤 함수가 실행된다"
      ],
      "correct": 1,
      "answer": "관계형 쿼리 결과의 순서를 보장하려면 ORDER BY가 필요합니다. 안정적인 페이지 경계에는 유일한 동점 해소 기준도 필요합니다.",
      "keys": [],
      "minutes": 2,
      "day": 3,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m2",
      "chapterId": "book-sql-lab",
      "type": "서술형",
      "question": "LEFT JOIN한 오른쪽 테이블의 상태 조건을 ON과 WHERE에 둘 때 차이를 주문 없는 고객 사례로 설명하세요.",
      "options": null,
      "correct": "",
      "answer": "ON에 상태 조건을 두면 해당 상태 주문을 연결하되 없는 고객도 NULL 확장 행으로 남습니다. WHERE o.status=...로 거르면 NULL 확장 행의 조건이 TRUE가 아니므로 고객이 제거됩니다. 모든 고객의 완료 주문 건수를 원하면 ON 조건과 COUNT(o.id)를 사용합니다.",
      "keys": [
        "ON",
        "WHERE",
        "NULL",
        "COUNT"
      ],
      "rubric": [
        "주문 없는 고객의 잔존 여부",
        "NULL 조건 평가",
        "올바른 건수 집계"
      ],
      "minutes": 6,
      "day": 3,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m2",
      "chapterId": "book-db-lab",
      "type": "서술형",
      "question": "조회가 느리다고 모든 열에 인덱스를 만드는 제안의 문제와 대안을 설명하세요.",
      "options": null,
      "correct": "",
      "answer": "모든 인덱스는 저장 공간과 쓰기 유지 비용을 늘립니다. 자주 실행되는 쿼리, 선택도, 조인·정렬 조건을 분석하고 실행 계획으로 병목을 확인한 뒤 필요한 복합 인덱스를 선택합니다. 추가 전후 읽기와 쓰기 지연을 모두 측정합니다.",
      "keys": [
        "쓰기",
        "실행 계획",
        "선택도"
      ],
      "rubric": [
        "쓰기·공간 비용",
        "워크로드 근거",
        "전후 성능 측정"
      ],
      "minutes": 6,
      "day": 3,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m2",
      "chapterId": "book-ai-lab",
      "type": "서술형",
      "question": "사기 거래 탐지에서 정확도 99%만으로 도입을 결정하면 안 되는 이유와 추가 지표를 제시하세요.",
      "options": null,
      "correct": "",
      "answer": "사기 비율이 1%이면 모두 정상으로 예측해도 정확도 99%입니다. 사기 재현율, 정밀도, PR 곡선과 임계값별 미탐·오탐 비용을 평가합니다. 실제 운영 비율과 시간 분포를 반영한 검증 데이터로 고객 불편과 손실 사이 균형을 선택합니다.",
      "keys": [
        "재현율",
        "정밀도",
        "오탐",
        "임계값"
      ],
      "rubric": [
        "불균형의 함정",
        "미탐·오탐 비용",
        "운영 분포 검증"
      ],
      "minutes": 6,
      "day": 3,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m2",
      "chapterId": "book-db-lab",
      "type": "서술형",
      "question": "복제 DB가 있으므로 백업이 필요 없다는 주장을 평가하세요.",
      "options": null,
      "correct": "",
      "answer": "복제는 고가용성을 돕지만 실수로 지운 데이터나 논리 오류도 복제될 수 있습니다. 별도 보관한 백업과 시점 복구 로그, 보존 정책, 정기 복원 훈련이 필요합니다. 복제 지연과 장애 전환의 일관성도 별도로 검증합니다.",
      "keys": [
        "삭제",
        "백업",
        "복원"
      ],
      "rubric": [
        "논리 오류 전파",
        "별도 백업과 시점 복구",
        "복원 훈련"
      ],
      "minutes": 6,
      "day": 3,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m2",
      "chapterId": "book-ai-lab",
      "type": "서술형",
      "question": "한 환자의 검사 10개를 무작위 행 단위로 나눠 학습과 평가에 섞었습니다. 어떤 문제가 있으며 어떻게 개선하나요?",
      "options": null,
      "correct": "",
      "answer": "같은 환자의 유사 기록이 양쪽에 들어가 모델이 개인 특성을 기억하면 새 환자에 대한 성능을 과대평가합니다. 환자 ID 단위로 그룹을 분리하고 시간 예측이면 시간 순서도 반영합니다. 전처리 통계는 학습 집합으로만 적합합니다.",
      "keys": [
        "환자",
        "그룹",
        "전처리"
      ],
      "rubric": [
        "동일 개체 누수",
        "그룹 분할",
        "학습 데이터 전처리"
      ],
      "minutes": 6,
      "day": 3,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m2",
      "chapterId": "book-sql-lab",
      "type": "수행형",
      "question": "customers(id), orders(id,customer_id,status)가 있습니다. 주문 없는 고객도 포함하여 고객별 PAID 주문 건수를 SQL로 구하세요.",
      "options": null,
      "correct": "",
      "answer": "SELECT c.id, COUNT(o.id) AS paid_count\nFROM customers c\nLEFT JOIN orders o\n  ON o.customer_id = c.id AND o.status = 'PAID'\nGROUP BY c.id\nORDER BY c.id;",
      "keys": [
        "LEFT JOIN",
        "COUNT",
        "ON",
        "GROUP BY"
      ],
      "rubric": [
        "상태 조건이 ON에 있다",
        "COUNT(o.id)로 0건 처리",
        "고객 단위 그룹화"
      ],
      "minutes": 10,
      "day": 3,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m2",
      "chapterId": "book-sql-lab",
      "type": "수행형",
      "question": "results(id,team,score)에서 팀마다 정확히 상위 2행을 반환하세요. 동점이면 id가 작은 행을 우선합니다.",
      "options": null,
      "correct": "",
      "answer": "WITH ranked AS (\n SELECT id, team, score,\n ROW_NUMBER() OVER (PARTITION BY team\n ORDER BY score DESC, id ASC) AS rn\n FROM results\n)\nSELECT id, team, score FROM ranked\nWHERE rn <= 2 ORDER BY team, rn;",
      "keys": [
        "ROW_NUMBER",
        "PARTITION BY",
        "ORDER BY",
        "rn"
      ],
      "rubric": [
        "팀별 파티션",
        "동점 기준 id",
        "CTE 밖에서 순위 필터"
      ],
      "minutes": 10,
      "day": 3,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m2",
      "chapterId": "book-sql-lab",
      "type": "수행형",
      "question": "customers(id), orders(customer_id)가 있습니다. 한 번도 주문하지 않은 고객을 NULL이 섞여 있어도 안전하게 찾는 SQL을 쓰세요.",
      "options": null,
      "correct": "",
      "answer": "SELECT c.id FROM customers c\nWHERE NOT EXISTS (\n SELECT 1 FROM orders o\n WHERE o.customer_id = c.id\n);\nNOT IN은 서브쿼리의 NULL 때문에 의도와 달라질 수 있습니다.",
      "keys": [
        "NOT EXISTS",
        "WHERE"
      ],
      "rubric": [
        "상관 조건",
        "주문 없는 고객만",
        "NULL 함정 회피"
      ],
      "minutes": 10,
      "day": 3,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m2",
      "chapterId": "book-db-lab",
      "type": "수행형",
      "question": "등록(학번,학생명,강좌번호,강좌명,교수번호,교수명,성적)을 3NF로 분해하세요. 학번→학생명, 강좌번호→강좌명·교수번호, 교수번호→교수명이며 키는 (학번,강좌번호)입니다.",
      "options": null,
      "correct": "",
      "answer": "학생(학번 PK, 학생명)\n교수(교수번호 PK, 교수명)\n강좌(강좌번호 PK, 강좌명, 교수번호 FK)\n등록(학번 PK/FK, 강좌번호 PK/FK, 성적)\n학생·강좌 속성의 부분 종속과 교수명의 이행 종속을 분리합니다.",
      "keys": [
        "학생",
        "교수",
        "강좌",
        "등록",
        "성적"
      ],
      "rubric": [
        "4개 사실을 분리한다",
        "등록 복합키",
        "교수번호 FK와 종속 보존"
      ],
      "minutes": 10,
      "day": 3,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m2",
      "chapterId": "book-db-lab",
      "type": "수행형",
      "question": "잔여 재고 1개를 두 요청이 동시에 구매합니다. 음수 재고와 중복 주문을 막는 트랜잭션 흐름을 의사코드로 설계하세요.",
      "options": null,
      "correct": "",
      "answer": "BEGIN\n요청키의 UNIQUE 제약으로 중복 요청을 확인한다.\nUPDATE stock SET qty=qty-1 WHERE id=:id AND qty>=1;\n영향 행이 0이면 ROLLBACK 후 품절을 반환한다.\n주문과 요청키를 저장한다.\nCOMMIT\n실패하면 전체 ROLLBACK, 동일 요청키 재시도는 기존 결과를 반환한다.",
      "keys": [
        "UPDATE",
        "UNIQUE",
        "COMMIT",
        "ROLLBACK"
      ],
      "rubric": [
        "재고 검사·감소의 원자성",
        "주문과 재고를 같은 트랜잭션에 묶음",
        "멱등키와 실패 처리"
      ],
      "minutes": 10,
      "day": 3,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m3",
      "chapterId": "book-os-lab",
      "type": "객관식",
      "question": "모두 시각 0에 도착한 A=4, B=2, C=3을 FCFS A→B→C로 실행합니다. 평균 대기시간은?",
      "options": [
        "2",
        "10/3",
        "3",
        "9"
      ],
      "correct": 1,
      "answer": "대기시간은 A=0, B=4, C=6입니다. 평균은 (0+4+6)/3=10/3입니다. 문맥교환 비용은 없다고 가정합니다.",
      "keys": [],
      "minutes": 2,
      "day": 4,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m3",
      "chapterId": "book-os-lab",
      "type": "객관식",
      "question": "작업 도착=3, 종료=14, CPU 실행=6이고 I/O는 없습니다. 반환시간과 대기시간은?",
      "options": [
        "14,8",
        "11,5",
        "6,5",
        "11,8"
      ],
      "correct": 1,
      "answer": "반환=14−3=11, 대기=11−6=5입니다. 종료 시각과 반환시간을 구분하세요.",
      "keys": [],
      "minutes": 2,
      "day": 4,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m3",
      "chapterId": "book-os-lab",
      "type": "객관식",
      "question": "페이지 프레임 3개가 비어 있습니다. LRU에서 1,2,3,1,4를 참조하면 마지막에 교체되는 페이지는?",
      "options": [
        "1",
        "2",
        "3",
        "4"
      ],
      "correct": 1,
      "answer": "1은 네 번째에 재사용했습니다. 2의 마지막 사용이 가장 오래되어 4를 넣을 때 교체됩니다.",
      "keys": [],
      "minutes": 2,
      "day": 4,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m3",
      "chapterId": "book-os-lab",
      "type": "객관식",
      "question": "같은 프로세스의 스레드마다 보통 독립적으로 갖는 것은?",
      "options": [
        "코드 영역 전체",
        "열린 파일 목록 전체",
        "스택과 레지스터 상태",
        "전역 변수 전체"
      ],
      "correct": 2,
      "answer": "스레드는 호출 스택·레지스터를 각자 가지며 주소 공간의 코드·힙·전역 데이터는 공유합니다.",
      "keys": [],
      "minutes": 2,
      "day": 4,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m3",
      "chapterId": "book-os-lab",
      "type": "객관식",
      "question": "전체 작업의 80%를 4배 빠르게 하면 Amdahl 법칙의 전체 가속비는?",
      "options": [
        "2배",
        "2.5배",
        "3.2배",
        "4배"
      ],
      "correct": 1,
      "answer": "1/(0.2+0.8/4)=1/0.4=2.5배입니다. 개선되지 않은 20%가 상한을 만듭니다.",
      "keys": [],
      "minutes": 2,
      "day": 4,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m3",
      "chapterId": "book-os-lab",
      "type": "객관식",
      "question": "캐시 적중시간 2ns, 미스율 5%, 미스 추가 비용 80ns이면 평균 접근시간은?",
      "options": [
        "4ns",
        "6ns",
        "80ns",
        "82ns"
      ],
      "correct": 1,
      "answer": "2+0.05×80=6ns입니다. 80ns가 추가 비용이라는 조건이 중요합니다.",
      "keys": [],
      "minutes": 2,
      "day": 4,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m3",
      "chapterId": "book-network-lab",
      "type": "객관식",
      "question": "192.168.1.130/26의 네트워크 주소는?",
      "options": [
        "192.168.1.0",
        "192.168.1.64",
        "192.168.1.128",
        "192.168.1.192"
      ],
      "correct": 2,
      "answer": "/26은 마지막 옥텟에서 64씩 나눕니다. 130은 128~191 블록에 속합니다.",
      "keys": [],
      "minutes": 2,
      "day": 4,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m3",
      "chapterId": "book-network-lab",
      "type": "객관식",
      "question": "일반적인 /28 IPv4 서브넷의 사용 가능한 호스트 수는?",
      "options": [
        "14",
        "16",
        "28",
        "30"
      ],
      "correct": 0,
      "answer": "호스트 비트 4개로 16주소, 네트워크와 브로드캐스트 주소를 빼 14개입니다.",
      "keys": [],
      "minutes": 2,
      "day": 4,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m3",
      "chapterId": "book-network-lab",
      "type": "객관식",
      "question": "IPv4에서 같은 LAN의 목적지 IP에 대응하는 MAC 주소를 알아내는 프로토콜은?",
      "options": [
        "DNS",
        "ARP",
        "SMTP",
        "NTP"
      ],
      "correct": 1,
      "answer": "ARP는 로컬 링크의 IPv4 주소를 링크 계층 주소에 대응시킵니다. 원격망이면 보통 다음 홉 게이트웨이 MAC이 필요합니다.",
      "keys": [],
      "minutes": 2,
      "day": 4,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m3",
      "chapterId": "book-network-lab",
      "type": "객관식",
      "question": "수신자가 광고하는 TCP 수신 윈도는 주로 무엇을 위한 것인가요?",
      "options": [
        "수신 버퍼 초과 방지",
        "DNS 이름 암호화",
        "디스크 용량 계산",
        "MAC 주소 할당"
      ],
      "correct": 0,
      "answer": "수신자가 받아들일 수 있는 데이터량을 알리는 흐름제어입니다. 네트워크 혼잡을 다루는 혼잡제어와 구분합니다.",
      "keys": [],
      "minutes": 2,
      "day": 4,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m3",
      "chapterId": "book-network-lab",
      "type": "객관식",
      "question": "HTTP에서 같은 요청을 반복해도 의도한 서버 상태 효과가 같다는 성질은?",
      "options": [
        "멱등성",
        "캐시 미스",
        "다중화",
        "압축률"
      ],
      "correct": 0,
      "answer": "멱등성은 반복 요청의 의도한 효과에 대한 성질입니다. 응답 내용·로그 횟수가 항상 동일해야 한다는 뜻은 아닙니다.",
      "keys": [],
      "minutes": 2,
      "day": 4,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m3",
      "chapterId": "book-network-lab",
      "type": "객관식",
      "question": "HTTP 304 응답을 가장 잘 설명한 것은?",
      "options": [
        "리소스 영구 삭제",
        "조건부 요청에서 저장된 표현을 재사용할 수 있음",
        "인증 실패",
        "서버 과부하만"
      ],
      "correct": 1,
      "answer": "캐시 검증 결과 변경되지 않았음을 나타냅니다. 일반적으로 새 본문을 전송하지 않고 캐시된 표현을 활용합니다.",
      "keys": [],
      "minutes": 2,
      "day": 4,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m3",
      "chapterId": "book-security-lab",
      "type": "객관식",
      "question": "악성 게시글이 읽는 사람의 브라우저에서 스크립트로 실행됩니다. 가장 직접적인 취약점은?",
      "options": [
        "XSS",
        "CSRF만",
        "SYN flood",
        "ARP 정상 조회"
      ],
      "correct": 0,
      "answer": "저장형 XSS의 전형적인 상황입니다. 문맥에 맞는 출력 인코딩과 안전한 렌더링을 적용합니다.",
      "keys": [],
      "minutes": 2,
      "day": 4,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m3",
      "chapterId": "book-security-lab",
      "type": "객관식",
      "question": "전자서명을 생성하는 키와 검증하는 키의 일반적인 조합은?",
      "options": [
        "공개키·개인키",
        "개인키·공개키",
        "동일 비밀번호·Salt",
        "DNS키·MAC키"
      ],
      "correct": 1,
      "answer": "서명자의 개인키로 서명하고 대응 공개키로 검증합니다. 공개키가 누구의 것인지 신뢰할 수 있는 연결도 필요합니다.",
      "keys": [],
      "minutes": 2,
      "day": 4,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m3",
      "chapterId": "book-security-lab",
      "type": "객관식",
      "question": "chmod 640을 일반 파일에 적용하면 소유자/그룹/기타 권한은?",
      "options": [
        "rwx/r--/---",
        "rw-/r--/---",
        "rw-/rw-/---",
        "r--/rw-/---"
      ],
      "correct": 1,
      "answer": "r=4, w=2, x=1입니다. 6은 읽기+쓰기, 4는 읽기, 0은 권한 없음입니다.",
      "keys": [],
      "minutes": 2,
      "day": 4,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m3",
      "chapterId": "book-security-lab",
      "type": "객관식",
      "question": "서버가 사용자가 준 URL을 그대로 요청하여 내부 관리 주소에 접근합니다. 위험은?",
      "options": [
        "SSRF",
        "정상 캐싱만",
        "교착상태",
        "페이지 폴트"
      ],
      "correct": 0,
      "answer": "서버 측 요청 위조입니다. 목적지·프로토콜 허용 목록, 내부 주소 제한, 리다이렉트 후 재검증 등을 고려합니다.",
      "keys": [],
      "minutes": 2,
      "day": 4,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m3",
      "chapterId": "book-security-lab",
      "type": "객관식",
      "question": "웹 서버와 DB를 분리할 때 가장 적절한 DB 접근 규칙은?",
      "options": [
        "인터넷 전체 허용",
        "필요한 앱 서버에서 필요한 포트만 허용",
        "모든 포트를 모든 사용자에게 허용",
        "접근 로그 끄기"
      ],
      "correct": 1,
      "answer": "신뢰 경계를 줄이고 최소한의 출발지·목적지·포트만 허용합니다. 앱 계정의 DB 권한도 별도로 제한해야 합니다.",
      "keys": [],
      "minutes": 2,
      "day": 4,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m3",
      "chapterId": "book-security-lab",
      "type": "객관식",
      "question": "전체 백업 뒤 매일 증분 백업을 했습니다. 복구에 일반적으로 필요한 것은?",
      "options": [
        "마지막 증분 하나만",
        "전체 백업과 복구 시점까지 필요한 증분 체인",
        "전체 백업 없이 로그 이름만",
        "아무 파일이나 하나"
      ],
      "correct": 1,
      "answer": "증분은 직전 백업 이후 변경분이므로 전체 백업과 순서에 맞는 증분들이 필요합니다. 차등 백업과 구분합니다.",
      "keys": [],
      "minutes": 2,
      "day": 4,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m3",
      "chapterId": "book-network-lab",
      "type": "객관식",
      "question": "30일인 달에 가용성 99.9%를 목표로 합니다. 단순 계산상 허용 중단시간은?",
      "options": [
        "4.32분",
        "43.2분",
        "432분",
        "3시간"
      ],
      "correct": 1,
      "answer": "30×24×60=43,200분의 0.1%는 43.2분입니다. 실제 SLA는 제외 시간 등 정의를 따릅니다.",
      "keys": [],
      "minutes": 2,
      "day": 4,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m3",
      "chapterId": "book-security-lab",
      "type": "객관식",
      "question": "평문 비밀번호를 복호화할 수 있게 암호화해 저장하는 대신 일반적으로 권장할 방식은?",
      "options": [
        "Salt를 둔 비밀번호 전용 해시",
        "단순 Base64",
        "아이디와 함께 평문 저장",
        "모든 사용자 같은 빠른 해시만"
      ],
      "correct": 0,
      "answer": "사용자별 Salt와 적절한 비용의 비밀번호 전용 해시를 사용합니다. Base64는 인코딩이고 비밀번호 저장 보호가 아닙니다.",
      "keys": [],
      "minutes": 2,
      "day": 4,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m3",
      "chapterId": "book-os-lab",
      "type": "서술형",
      "question": "교착상태와 기아 상태를 구분하고 각각 예방·완화 방법 하나를 설명하세요.",
      "options": null,
      "correct": "",
      "answer": "교착상태는 작업들이 서로의 자원을 기다려 진행하지 못하는 상황이고, 기아는 특정 작업이 자원 배분에서 계속 밀리는 상황입니다. 잠금 순서를 통일하면 순환 대기를 줄일 수 있고, 대기 시간에 따라 우선순위를 높이는 에이징은 기아를 완화합니다.",
      "keys": [
        "순환",
        "에이징",
        "대기"
      ],
      "rubric": [
        "두 현상을 구분한다",
        "교착 대책의 메커니즘",
        "기아 대책의 메커니즘"
      ],
      "minutes": 6,
      "day": 4,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m3",
      "chapterId": "book-network-lab",
      "type": "서술형",
      "question": "사용자가 HTTPS 페이지를 처음 열 때 DNS·TCP·TLS·HTTP가 각각 맡는 일을 설명하고 연결 재사용의 영향을 덧붙이세요.",
      "options": null,
      "correct": "",
      "answer": "DNS는 이름에 대응하는 주소 정보를 조회하고 TCP는 신뢰성 있는 연결을 설정합니다. TLS는 인증서 검증과 암호화 통신을 협상하며 HTTP는 자원 요청과 응답의 의미를 정의합니다. 캐시나 연결 재사용이 있으면 매번 모든 단계를 반복하지 않습니다. HTTP/3는 QUIC를 사용합니다.",
      "keys": [
        "DNS",
        "TCP",
        "TLS",
        "HTTP"
      ],
      "rubric": [
        "각 단계의 역할",
        "캐시·재사용",
        "HTTP/3 예외 구분"
      ],
      "minutes": 6,
      "day": 4,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m3",
      "chapterId": "book-security-lab",
      "type": "서술형",
      "question": "게시글 서비스에서 XSS와 CSRF를 각각 막을 두 가지 대책과 한계를 설명하세요.",
      "options": null,
      "correct": "",
      "answer": "XSS에는 문맥별 출력 인코딩과 안전한 DOM API를 사용하고 CSP를 보조 통제로 둡니다. CSRF에는 CSRF 토큰, SameSite 쿠키 및 요청 출처 검증을 적용합니다. HttpOnly는 쿠키의 스크립트 읽기를 줄일 뿐 XSS 자체를 없애지 않으며 XSS가 있으면 CSRF 통제도 우회될 수 있습니다.",
      "keys": [
        "인코딩",
        "토큰",
        "SameSite",
        "HttpOnly"
      ],
      "rubric": [
        "공격별 대책 매핑",
        "보조 통제 한계",
        "쿠키 설정만으로 완결하지 않음"
      ],
      "minutes": 6,
      "day": 4,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m3",
      "chapterId": "book-security-lab",
      "type": "서술형",
      "question": "중요 데이터는 암호화하고 백업 파일은 같은 서버에만 보관합니다. 어떤 위험이 남고 무엇을 바꾸어야 하나요?",
      "options": null,
      "correct": "",
      "answer": "서버 파손·랜섬웨어·계정 탈취가 원본과 백업에 동시에 영향을 줄 수 있습니다. 별도 장애 영역과 접근 권한의 백업, 삭제 방지 보관 정책, 키 관리, 정기 복원 검증을 적용합니다. 암호화는 가용성을 보장하지 않으므로 RPO·RTO를 시험합니다.",
      "keys": [
        "백업",
        "권한",
        "복원",
        "RPO"
      ],
      "rubric": [
        "동시 손실 위험",
        "장애 영역·권한 분리",
        "실제 복원 검증"
      ],
      "minutes": 6,
      "day": 4,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m3",
      "chapterId": "book-network-lab",
      "type": "서술형",
      "question": "API의 재시도 폭주가 장애를 악화시키고 있습니다. 타임아웃·백오프·서킷 브레이커·멱등성으로 대책을 설명하세요.",
      "options": null,
      "correct": "",
      "answer": "타임아웃과 재시도 횟수 상한을 두고 지수 백오프에 지터를 섞어 요청을 분산합니다. 서킷 브레이커로 실패한 의존성 호출을 잠시 차단하고 회복 탐색을 제한합니다. 상태 변경 요청에는 멱등키를 사용해 중복 결제 같은 부작용을 막습니다.",
      "keys": [
        "타임아웃",
        "백오프",
        "서킷",
        "멱등"
      ],
      "rubric": [
        "재시도 예산과 분산",
        "실패 의존성 차단",
        "중복 부작용 방지"
      ],
      "minutes": 6,
      "day": 4,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m3",
      "chapterId": "book-network-lab",
      "type": "수행형",
      "question": "192.168.10.0/24를 동일 크기 4개 서브넷으로 나누세요. 각 네트워크와 호스트 범위, 브로드캐스트를 제시하세요.",
      "options": null,
      "correct": "",
      "answer": "/26으로 분할합니다.\n.0/26: 호스트 .1~.62, 브로드캐스트 .63\n.64/26: 호스트 .65~.126, 브로드캐스트 .127\n.128/26: 호스트 .129~.190, 브로드캐스트 .191\n.192/26: 호스트 .193~.254, 브로드캐스트 .255\n모든 주소의 앞 세 옥텟은 192.168.10이며 각 62호스트입니다.",
      "keys": [
        "/26",
        "62",
        "127",
        "191",
        "255"
      ],
      "rubric": [
        "64주소 단위 4블록",
        "네트워크·브로드캐스트 제외",
        "총 범위 누락·중복 없음"
      ],
      "minutes": 10,
      "day": 4,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m3",
      "chapterId": "book-os-lab",
      "type": "수행형",
      "question": "A=5, B=3, C=1이 시각 0에 도착해 RR 순서 A,B,C로 실행됩니다. 퀀텀 2, 문맥교환 비용 0일 때 간트 차트와 평균 대기시간을 구하세요.",
      "options": null,
      "correct": "",
      "answer": "0~2 A, 2~4 B, 4~5 C, 5~7 A, 7~8 B, 8~9 A\n완료: A=9, B=8, C=5\n대기: A=9−5=4, B=8−3=5, C=5−1=4\n평균=(4+5+4)/3=13/3≈4.33",
      "keys": [
        "A",
        "B",
        "C",
        "13/3"
      ],
      "rubric": [
        "퀀텀과 대기열 순서",
        "완료 시각",
        "대기시간에서 실행시간 차감"
      ],
      "minutes": 10,
      "day": 4,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m3",
      "chapterId": "book-os-lab",
      "type": "수행형",
      "question": "빈 프레임 3개에서 LRU로 1,2,3,1,4,2,5를 참조합니다. 각 단계 적중/폴트와 총 폴트를 구하세요.",
      "options": null,
      "correct": "",
      "answer": "1 폴트 [1]\n2 폴트 [1,2]\n3 폴트 [1,2,3]\n1 적중, 최근 사용 순서는 2,3,1\n4 폴트, 2 교체\n2 폴트, 3 교체\n5 폴트, 1 교체\n총 6회 폴트입니다.",
      "keys": [
        "6",
        "2",
        "3",
        "1"
      ],
      "rubric": [
        "적중 시 최근 사용 갱신",
        "교체 순서 2→3→1",
        "총 6회"
      ],
      "minutes": 10,
      "day": 4,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m3",
      "chapterId": "book-security-lab",
      "type": "수행형",
      "question": "인터넷 사용자→웹 API→주문 DB 구조의 최소 권한 방화벽 표를 출발지·목적지·포트·조치 4행 이상으로 작성하세요.",
      "options": null,
      "correct": "",
      "answer": "인터넷 / 로드밸런서 / TCP 443 / 허용\n로드밸런서 / 웹 API / 서비스 포트 / 허용\n웹 API / 주문 DB / 설정된 DB 포트 / 허용\n관리 전용망 / 관리 엔드포인트 / 필요한 관리 포트 / MFA·접근통제 하 허용\n그 외 / 내부 DB / 모든 포트 / 차단\n기본 거부와 로그, 상태 추적 규칙을 적용합니다.",
      "keys": [
        "443",
        "DB",
        "차단",
        "관리"
      ],
      "rubric": [
        "DB 직접 인터넷 노출 차단",
        "필요 통신만 허용",
        "관리 접근 분리와 기본 거부"
      ],
      "minutes": 10,
      "day": 4,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m3",
      "chapterId": "book-security-lab",
      "type": "수행형",
      "question": "사용자 첨부파일 업로드 기능의 검증 표를 위협·통제·검증 방법으로 4행 작성하세요.",
      "options": null,
      "correct": "",
      "answer": "위장 확장자 / 허용 형식과 실제 내용 검사 / 확장자만 바꾼 파일 거부\n대용량·압축 폭탄 / 크기·해제량 제한 / 제한 초과 입력 시험\n실행 파일 업로드 / 웹 실행 경로와 분리 저장 / 업로드 파일 실행 불가 확인\n타인 파일 접근 / 서버 측 소유권 검사 / 다른 계정으로 다운로드 거부 확인\n파일명은 서버에서 생성하고 악성코드 검사·격리를 함께 검토합니다.",
      "keys": [
        "형식",
        "크기",
        "실행",
        "소유권"
      ],
      "rubric": [
        "4개 다른 위협",
        "통제와 위협의 대응",
        "검증이 실제로 통제를 확인함"
      ],
      "minutes": 10,
      "day": 4,
      "domain": "tech",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m4",
      "chapterId": "book-pm-lab",
      "type": "객관식",
      "question": "PV=300, EV=240, AC=200일 때 SV와 CV는?",
      "options": [
        "−60,40",
        "60,−40",
        "40,−60",
        "−60,−40"
      ],
      "correct": 0,
      "answer": "SV=240−300=−60, CV=240−200=40입니다. 일정 가치는 계획보다 뒤이고 비용 효율은 좋습니다.",
      "keys": [],
      "minutes": 2,
      "day": 5,
      "domain": "biz",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m4",
      "chapterId": "book-pm-lab",
      "type": "객관식",
      "question": "BAC=800, EV=200, AC=250이고 현재 비용 효율이 계속된다면 EAC는?",
      "options": [
        "640",
        "800",
        "1000",
        "1250"
      ],
      "correct": 2,
      "answer": "CPI=200/250=0.8, EAC=800/0.8=1000입니다. 예측 식은 주어진 지속 가정에 따릅니다.",
      "keys": [],
      "minutes": 2,
      "day": 5,
      "domain": "biz",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m4",
      "chapterId": "book-pm-lab",
      "type": "객관식",
      "question": "EAC=1200, 지금까지 AC=450일 때 예상 잔여비용 ETC는?",
      "options": [
        "450",
        "750",
        "1200",
        "1650"
      ],
      "correct": 1,
      "answer": "ETC=EAC−AC=750입니다. 총 완료예상원가와 앞으로 필요한 비용을 구분합니다.",
      "keys": [],
      "minutes": 2,
      "day": 5,
      "domain": "biz",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m4",
      "chapterId": "book-pm-lab",
      "type": "객관식",
      "question": "A(2) 후 B(5), C(3)가 병렬이며 둘 다 끝나면 D(1)입니다. 총 기간은?",
      "options": [
        "6",
        "8",
        "10",
        "11"
      ],
      "correct": 1,
      "answer": "A-B-D=8, A-C-D=6으로 긴 경로가 8입니다. 병렬 B와 C의 기간을 더하지 않습니다.",
      "keys": [],
      "minutes": 2,
      "day": 5,
      "domain": "biz",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m4",
      "chapterId": "book-pm-lab",
      "type": "객관식",
      "question": "A(2일) 후 B(5일)와 C(3일)를 병렬 수행하고 둘 다 끝나면 D(1일)를 시작합니다. C의 총 여유시간은?",
      "options": [
        "0",
        "1",
        "2",
        "3"
      ],
      "correct": 2,
      "answer": "A-C-D 경로는 6이고 전체는 8이므로 C를 2만큼 늦춰도 완료 시점은 그대로입니다.",
      "keys": [],
      "minutes": 2,
      "day": 5,
      "domain": "biz",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m4",
      "chapterId": "book-pm-lab",
      "type": "객관식",
      "question": "초기투자 400, 매년 일정 순현금유입 100의 단순 회수기간은?",
      "options": [
        "2년",
        "3년",
        "4년",
        "5년"
      ],
      "correct": 2,
      "answer": "400/100=4년입니다. 순현금유입이 일정하고 할인하지 않는 계산입니다.",
      "keys": [],
      "minutes": 2,
      "day": 5,
      "domain": "biz",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m4",
      "chapterId": "book-pm-lab",
      "type": "객관식",
      "question": "총편익 360, 총비용 300일 때 ROI=(편익−비용)/비용으로 정의하면?",
      "options": [
        "16.7%",
        "20%",
        "60%",
        "120%"
      ],
      "correct": 1,
      "answer": "순편익은 60이고 ROI=60/300=20%입니다. 총편익/비용인 120%와 구분합니다.",
      "keys": [],
      "minutes": 2,
      "day": 5,
      "domain": "biz",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m4",
      "chapterId": "book-pm-lab",
      "type": "객관식",
      "question": "초기투자 100, 1년 뒤 순현금유입 121, 할인율 10%일 때 NPV는?",
      "options": [
        "10",
        "11",
        "21",
        "110"
      ],
      "correct": 0,
      "answer": "121/1.1−100=10입니다. 110은 미래 유입의 현재가치이고 투자 차감 전 값입니다.",
      "keys": [],
      "minutes": 2,
      "day": 5,
      "domain": "biz",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m4",
      "chapterId": "book-pm-lab",
      "type": "객관식",
      "question": "낙관 2, 최빈 5, 비관 8일 때 PERT 기대시간 (a+4m+b)/6은?",
      "options": [
        "4",
        "5",
        "6",
        "7"
      ],
      "correct": 1,
      "answer": "(2+4×5+8)/6=30/6=5일입니다. 단순 산술평균과 식을 혼동하지 마세요.",
      "keys": [],
      "minutes": 2,
      "day": 5,
      "domain": "biz",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m4",
      "chapterId": "book-pm-lab",
      "type": "객관식",
      "question": "확률 0.2, 발생 시 손실 500만 원인 위험의 단순 기대손실은?",
      "options": [
        "20만",
        "100만",
        "250만",
        "500만"
      ],
      "correct": 1,
      "answer": "0.2×500만=100만 원입니다. 실제 손실을 확정한 값이나 최대 손실을 뜻하지는 않습니다.",
      "keys": [],
      "minutes": 2,
      "day": 5,
      "domain": "biz",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m4",
      "chapterId": "book-business-lab",
      "type": "객관식",
      "question": "SWOT에서 경쟁사의 시장 철수로 생긴 기회는 어느 범주인가요?",
      "options": [
        "S",
        "W",
        "O",
        "T"
      ],
      "correct": 2,
      "answer": "외부 환경에서 유리하게 작용할 기회 Opportunity입니다. 회사 내부 강점 S와 구분합니다.",
      "keys": [],
      "minutes": 2,
      "day": 5,
      "domain": "biz",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m4",
      "chapterId": "book-business-lab",
      "type": "객관식",
      "question": "SWOT에서 사내 데이터 품질 관리 인력 부족은?",
      "options": [
        "강점",
        "약점",
        "기회",
        "위협"
      ],
      "correct": 1,
      "answer": "조직 내부의 불리한 역량 상태이므로 Weakness입니다. 외부 환경의 위협과 구분합니다.",
      "keys": [],
      "minutes": 2,
      "day": 5,
      "domain": "biz",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m4",
      "chapterId": "book-business-lab",
      "type": "객관식",
      "question": "상담 대기시간 감소라는 목표에 가장 직접적인 결과 지표는?",
      "options": [
        "구매한 서버 개수",
        "작성한 문서 수",
        "상담 대기시간 중앙값과 95백분위수(p95)",
        "회의 횟수"
      ],
      "correct": 2,
      "answer": "목표의 결과를 측정하는 지표입니다. 서버·문서·회의 수는 활동량이나 투입 지표입니다.",
      "keys": [],
      "minutes": 2,
      "day": 5,
      "domain": "biz",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m4",
      "chapterId": "book-business-lab",
      "type": "객관식",
      "question": "공급사 책임 계약으로 위험 영향을 넘기는 전략은?",
      "options": [
        "회피",
        "전가",
        "수용",
        "항상 제거"
      ],
      "correct": 1,
      "answer": "전가는 영향과 대응 책임을 다른 주체와 계약으로 배분하는 전략입니다. 위험 자체가 반드시 사라지는 것은 아닙니다.",
      "keys": [],
      "minutes": 2,
      "day": 5,
      "domain": "biz",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m4",
      "chapterId": "book-business-lab",
      "type": "객관식",
      "question": "원래 순차적인 작업을 겹쳐 진행하는 fast tracking의 대표 위험은?",
      "options": [
        "재작업 증가",
        "모든 의존성 제거",
        "품질 자동 향상",
        "항상 비용 감소"
      ],
      "correct": 0,
      "answer": "Fast tracking은 원래 순차적인 작업을 겹쳐 진행하는 방식입니다. 선행 산출물 변경으로 재작업 위험이 늘 수 있습니다. 자원 추가인 crashing과 구분하세요.",
      "keys": [],
      "minutes": 2,
      "day": 5,
      "domain": "biz",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m4",
      "chapterId": "book-business-lab",
      "type": "객관식",
      "question": "오픈소스 구성요소를 제품에 넣기 전 적절한 활동은?",
      "options": [
        "공개 코드면 조건 없이 배포",
        "라이선스와 고지·배포 의무를 확인",
        "저자 표시를 무조건 삭제",
        "저장소 이름만 변경"
      ],
      "correct": 1,
      "answer": "구성요소별 라이선스와 사용·배포 방식에 따른 조건을 확인합니다. 공개돼 있다는 사실만으로 모든 사용이 무조건 허용되는 것은 아닙니다.",
      "keys": [],
      "minutes": 2,
      "day": 5,
      "domain": "biz",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m4",
      "chapterId": "book-business-lab",
      "type": "객관식",
      "question": "장애 발생 전에 대응 계획의 실제 실행 가능성을 검증하는 활동은?",
      "options": [
        "복구 훈련",
        "로그 전부 삭제",
        "백업 이름 변경",
        "담당자 미지정"
      ],
      "correct": 0,
      "answer": "복구 훈련으로 절차, 권한, 연락 체계와 목표 시간을 점검합니다. 계획 문서만으로 실제 복구 능력을 확인할 수 없습니다.",
      "keys": [],
      "minutes": 2,
      "day": 5,
      "domain": "biz",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m4",
      "chapterId": "book-business-lab",
      "type": "객관식",
      "question": "회의록에서 후속 실행을 명확하게 하는 조합은?",
      "options": [
        "분위기·참석자 취향",
        "결정 사항·담당자·기한",
        "글자 크기·색상만",
        "모든 발언의 감상"
      ],
      "correct": 1,
      "answer": "결정과 실행 책임, 완료 시점을 명시해야 추적이 가능합니다. 미결 사항과 다음 확인 시점도 남기면 좋습니다.",
      "keys": [],
      "minutes": 2,
      "day": 5,
      "domain": "biz",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m4",
      "chapterId": "book-business-lab",
      "type": "객관식",
      "question": "비용·품질 점수는 모두 높을수록 좋게 환산했습니다. 가중치 비용 0.6·품질 0.4, 대안 A 점수 80·60이면 가중합은?",
      "options": [
        "64",
        "68",
        "72",
        "80"
      ],
      "correct": 2,
      "answer": "80×0.6+60×0.4=48+24=72입니다. 비용 점수는 이미 높을수록 좋은 점수로 환산됐다는 조건입니다.",
      "keys": [],
      "minutes": 2,
      "day": 5,
      "domain": "biz",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m4",
      "chapterId": "book-business-lab",
      "type": "객관식",
      "question": "프로젝트에서 승인된 범위·일정·비용의 비교 기준은?",
      "options": [
        "기준선",
        "임의 추측",
        "개인 메모만",
        "사용하지 않는 백로그"
      ],
      "correct": 0,
      "answer": "기준선은 변경 통제를 거쳐 관리하는 성과 비교 기준입니다. 현재 추정치와 원래 승인 기준을 구분합니다.",
      "keys": [],
      "minutes": 2,
      "day": 5,
      "domain": "biz",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m4",
      "chapterId": "book-pm-lab",
      "type": "서술형",
      "question": "SPI=1.1, CPI=0.8인 프로젝트를 일정·비용 관점에서 해석하고 다음 조치 두 가지를 제안하세요.",
      "options": null,
      "correct": "",
      "answer": "계획 가치보다 작업 진척은 앞서지만 비용 효율은 낮습니다. 작업별 원가 초과 원인을 분석하고 현재 효율이 지속될 때의 완료예상원가를 갱신합니다. 자원·범위·방법 조정 대안을 비교하고 승인된 변경과 품질 영향을 함께 관리합니다.",
      "keys": [
        "일정",
        "비용",
        "원인",
        "완료"
      ],
      "rubric": [
        "두 지수의 방향",
        "원인 분석과 예측",
        "변경 승인·품질 고려"
      ],
      "minutes": 6,
      "day": 5,
      "domain": "biz",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m4",
      "chapterId": "book-business-lab",
      "type": "서술형",
      "question": "SaaS 도입 의사결정에서 월 구독료만 비교하면 빠지는 비용을 네 가지 이상 적고 검증 방법을 제안하세요.",
      "options": null,
      "correct": "",
      "answer": "초기 데이터 이관, API 연동 개발, 사용자 교육, 운영·지원, 추가 저장·사용량, 종료 시 데이터 반출 비용이 빠질 수 있습니다. 동일 사용자 수와 3년 사용량 시나리오로 TCO를 계산하고 견적·PoC로 가정을 검증합니다.",
      "keys": [
        "이관",
        "연동",
        "교육",
        "종료",
        "TCO"
      ],
      "rubric": [
        "숨은 비용 네 가지",
        "동일 기간·사용량",
        "견적 또는 실증"
      ],
      "minutes": 6,
      "day": 5,
      "domain": "biz",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m4",
      "chapterId": "book-business-lab",
      "type": "서술형",
      "question": "변경 요청이 많아 프로젝트 범위가 계속 커집니다. 요구 추적과 기준선 관점에서 통제 방안을 쓰세요.",
      "options": null,
      "correct": "",
      "answer": "요구 ID와 우선순위, 수용 기준을 기록하고 변경 요청마다 일정·비용·위험 영향을 분석합니다. 승인 권한자가 결정한 뒤 기준선과 WBS·테스트 추적표를 갱신합니다. 미승인 작업을 착수하지 않고 차기 릴리스 후보와 현재 필수 범위를 구분합니다.",
      "keys": [
        "기준선",
        "영향",
        "승인",
        "추적"
      ],
      "rubric": [
        "요구 ID·수용 기준",
        "영향과 승인",
        "관련 산출물 갱신"
      ],
      "minutes": 6,
      "day": 5,
      "domain": "biz",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m4",
      "chapterId": "book-business-lab",
      "type": "서술형",
      "question": "고객 서비스에 생성형 AI를 도입할지 판단할 PoC의 합격 조건을 수치 예시와 함께 제안하세요.",
      "options": null,
      "correct": "",
      "answer": "예시 기준: 검증 질문 200개에서 근거에 맞는 답변 95% 이상, 민감정보 노출 0건, 사람 전환 성공률 99% 이상, 응답시간 95백분위수(p95)가 5초 이하. 기존 상담 대비 처리시간·비용과 오류 심각도를 비교하고 기준 미달이면 범위를 줄이거나 도입을 보류합니다. 수치는 조직의 위험 허용 수준에 맞춰 승인합니다.",
      "keys": [
        "근거",
        "민감정보",
        "전환",
        "응답시간"
      ],
      "rubric": [
        "정확성·보안·운영 지표",
        "측정 가능한 합격 조건",
        "실패 시 의사결정"
      ],
      "minutes": 6,
      "day": 5,
      "domain": "biz",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m4",
      "chapterId": "book-business-lab",
      "type": "서술형",
      "question": "프로젝트 책임자가 진행률 90%만 보고하고 출시가 계속 미뤄집니다. 더 유용한 보고 지표와 보고 구조를 제안하세요.",
      "options": null,
      "correct": "",
      "answer": "전체 산출물과 완료 정의를 기준으로 수용된 범위, 남은 작업, 미해결 심각 결함, 주공정 지연, 실제 비용과 예상 완료일을 제시합니다. 원인·대안·권고안과 필요한 결정, 담당자·기한을 적습니다. 주관적 진행률 대신 검증 가능한 완료 기준을 사용합니다.",
      "keys": [
        "완료",
        "결함",
        "원인",
        "결정"
      ],
      "rubric": [
        "진행률 대신 객관적 산출물",
        "일정·비용 예측",
        "요청 결정과 책임"
      ],
      "minutes": 6,
      "day": 5,
      "domain": "biz",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m4",
      "chapterId": "book-pm-lab",
      "type": "수행형",
      "question": "BAC=1200, PV=600, EV=480, AC=640입니다. SPI·CPI·SV·CV와 현재 비용 효율 지속 가정의 EAC·ETC를 구하세요.",
      "options": null,
      "correct": "",
      "answer": "SPI=480/600=0.8\nCPI=480/640=0.75\nSV=480−600=−120\nCV=480−640=−160\nEAC=1200/0.75=1600\nETC=1600−640=960\n일정 지연·원가 초과이며 현재 비용 효율이 계속된다는 가정입니다.",
      "keys": [
        "0.8",
        "0.75",
        "1600",
        "960"
      ],
      "rubric": [
        "네 지수와 차이 계산",
        "EAC 가정과 ETC",
        "일정·원가 해석"
      ],
      "minutes": 10,
      "day": 5,
      "domain": "biz",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m4",
      "chapterId": "book-pm-lab",
      "type": "수행형",
      "question": "A(3) 후 B(4), C(6)를 병렬 수행하고 둘 다 완료 후 D(2)를 합니다. 주공정·총기간·B의 총 여유와 기간 1일 단축 대안을 쓰세요.",
      "options": null,
      "correct": "",
      "answer": "A-B-D=9, A-C-D=11\n주공정 A-C-D, 총기간 11일\nB의 총 여유=2일\nA·C·D 중 하나를 1일 줄이면 10일이 됩니다. 비용·품질·자원 가능성을 비교해야 하며 B만 1일 줄여서는 총기간이 바뀌지 않습니다.",
      "keys": [
        "A-C-D",
        "11",
        "2",
        "10"
      ],
      "rubric": [
        "경로별 길이",
        "총 여유",
        "주공정 단축과 제약"
      ],
      "minutes": 10,
      "day": 5,
      "domain": "biz",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m4",
      "chapterId": "book-pm-lab",
      "type": "수행형",
      "question": "초기투자 500, 1~3년 말 순현금유입 200·200·250, 할인율 10%입니다. NPV와 할인하지 않은 회수기간을 구하세요.",
      "options": null,
      "correct": "",
      "answer": "NPV=200/1.1+200/1.1²+250/1.1³−500\n≈181.82+165.29+187.83−500=34.94\n2년 후 400 회수, 잔여 100\n3년차 유입이 연중 균등하다는 보간 가정이면 2+100/250=2.4년\n연말 일시 유입만 인정하면 3년 말 회수입니다.",
      "keys": [
        "34.94",
        "2.4",
        "3년"
      ],
      "rubric": [
        "연도별 할인",
        "회수의 현금흐름 가정",
        "양의 NPV 해석"
      ],
      "minutes": 10,
      "day": 5,
      "domain": "biz",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m4",
      "chapterId": "book-business-lab",
      "type": "수행형",
      "question": "고객 문의 대기시간이 12분입니다. 6분 이하로 줄이는 IT 개선 제안서를 목표·대안·선택·위험·지표 다섯 항목으로 작성하세요.",
      "options": null,
      "correct": "",
      "answer": "목표: 3개월 내 대기시간 중앙값 6분 이하.\n대안: 상담 인력 재배치, FAQ 검색 개선, AI 상담 보조.\n선택: FAQ 개선과 상담 보조를 소규모 시범 운영 후 비교.\n위험: 잘못된 안내·개인정보 노출은 근거 표시와 사람 전환, 권한 통제로 완화.\n지표: 대기시간 중앙값·95백분위수(p95), 재문의율·정확성·건당 비용.",
      "keys": [
        "목표",
        "대안",
        "위험",
        "지표"
      ],
      "rubric": [
        "목표 수치와 기간",
        "대안 비교 근거",
        "성과·품질·위험 지표"
      ],
      "minutes": 10,
      "day": 5,
      "domain": "biz",
      "origin": "출제기준 기반 창작"
    },
    {
      "module": "m4",
      "chapterId": "book-business-lab",
      "type": "수행형",
      "question": "보안 요구 추가로 출시가 5일 지연될 수 있습니다. 의사결정 요청 메일의 제목과 본문을 450자 이내로 작성하세요.",
      "options": null,
      "correct": "",
      "answer": "제목: 인증 보안 보강에 따른 출시 5일 조정 승인 요청\n현재 인증 검증에서 중요 결함이 확인돼 보강과 회귀시험에 5일이 필요합니다. 예정일 출시는 보안 사고 위험을 남기므로 출시 연기를 권고합니다. 대안은 영향 기능을 제외한 단계 출시이며 고객 영향과 추가 배포 비용이 있습니다. 오늘 17시까지 대안을 승인해 주시면 개발 책임자가 수정·시험 계획과 고객 안내 일정을 확정하겠습니다.",
      "keys": [
        "5일",
        "위험",
        "대안",
        "승인"
      ],
      "rubric": [
        "요청 결정이 제목·앞부분에 드러남",
        "지연 원인과 대안",
        "결정 기한과 담당자"
      ],
      "minutes": 10,
      "day": 5,
      "domain": "biz",
      "origin": "출제기준 기반 창작"
    }
  ],
  "resources": [
    {
      "title": "TOPCIT 공식 모의응시·설계·컴파일러 연습",
      "url": "https://www.topcit.or.kr/board/preview.do",
      "kind": "공식 연습",
      "year": "현행",
      "module": "all",
      "note": "컴퓨터 응시 화면과 UML·ERD·UI·언어별 도구를 직접 사용해 보세요. 공식 예시이며 회차 전체 기출과는 다릅니다."
    },
    {
      "title": "2026 신규 평가모델 안내 자료",
      "url": "https://swuniv.korea.ac.kr/bbs/swuniv/979/177637/download.do",
      "kind": "공식 기준",
      "year": "2026",
      "module": "all",
      "note": "대학 공지에 첨부된 주관기관 시험안내. 75문항·객관식60/서술7/수행8 구성과 구형 모델 비교."
    },
    {
      "title": "TOPCIT 공식 출제기준 V4.0E",
      "url": "https://www.topcit.or.kr/introduction/syllabus.do",
      "kind": "공식 기준",
      "year": "현행",
      "module": "all",
      "note": "M1~M4의 공식 학습 범위를 점검하는 기준입니다. 블로그의 과거 범위와 구분해 확인하세요."
    },
    {
      "title": "C++ 값 교환과 참조 전달 · 한경 공개문제 재게재",
      "url": "https://news.nate.com/view/20150424n04761?mid=n1101",
      "kind": "공개 기출",
      "year": "2015",
      "module": "m1",
      "note": "기사 아래의 C++ 함수 수정 문제. 인자 전달 방식과 임시 변수의 역할을 점검합니다."
    },
    {
      "title": "2020 TOPCIT 문제풀이 · 전 영역",
      "url": "https://www.youtube.com/watch?v=m22gK1dYGWk",
      "kind": "영상 강의",
      "year": "2020",
      "module": "all",
      "note": "여러 학습 후기에 연결된 과거 문제풀이 영상입니다. 영상의 문제·해설은 원문에서 확인하고 시험 구성은 2026 기준으로 보세요."
    },
    {
      "title": "경기대학교 TOPCIT 릴레이 특강 · SW 개발 ②",
      "url": "https://www.youtube.com/watch?v=HhZqWahjqlw",
      "kind": "영상 강의",
      "year": "2025",
      "module": "m1",
      "note": "경기대학교 SW중심대학 공개 강의. 소프트웨어 개발 개념과 문제풀이 전략을 다룹니다."
    },
    {
      "title": "경기대학교 TOPCIT 릴레이 특강 · SW 개발 ③",
      "url": "https://www.youtube.com/watch?v=cRira3BZ5YM",
      "kind": "영상 강의",
      "year": "2025",
      "module": "m1",
      "note": "동일 대학의 이어지는 공개 특강. 개발 영역을 복습한 뒤 영상의 풀이와 비교하세요."
    },
    {
      "title": "2020 문제풀이와 모의응시 필기 · 뽀시라운",
      "url": "https://proysm.tistory.com/20",
      "kind": "블로그 풀이",
      "year": "2024",
      "module": "all",
      "note": "VDI·뷰·리팩토링·EVM 등 개인 학습 필기. 공식 정답으로 간주하지 말고 계산과 SQL 설명을 교차 확인하세요."
    },
    {
      "title": "2020 TOPCIT 문제풀이 Chapter 1 · 10011001101",
      "url": "https://122gu.tistory.com/31",
      "kind": "블로그 풀이",
      "year": "2024",
      "module": "m1",
      "note": "UML·DFD·결합도·커버리지 풀이를 모은 개인 글. 코드 오탈자와 MC/DC 설명은 공식 개념과 대조하세요."
    },
    {
      "title": "3일 준비·610점 경험과 자료 모음 · KBW",
      "url": "https://kbwplace.tistory.com/160",
      "kind": "응시 후기",
      "year": "2022",
      "module": "all",
      "note": "공개 풀이를 먼저 풀고 부족한 개념을 보완한 개인 경험. 글의 에센스·게시판 경로는 현재 종료되거나 바뀌었습니다."
    },
    {
      "title": "샘플문제·한경 풀이 활용 경험 · 소신",
      "url": "https://wolfy.tistory.com/224",
      "kind": "응시 후기",
      "year": "2020",
      "module": "all",
      "note": "짧은 준비 기간에 샘플과 신문 공개문제를 활용한 기록. Flash·옛 학습센터 안내는 현행 사용법으로 적용하지 않습니다."
    },
    {
      "title": "2026 상반기 TOPCIT 응시 후기 · geonho-log",
      "url": "https://geonho-log.tistory.com/63",
      "kind": "응시 후기",
      "year": "2026",
      "module": "all",
      "note": "AI·SQL·UML·ERD·ROI를 언급한 개인 경험입니다. 출제 빈도 통계나 다음 시험의 출제 보장은 아닙니다."
    },
    {
      "title": "TOPCIT 후기와 공부 방법 · sophon",
      "url": "https://sophon.tistory.com/162",
      "kind": "응시 후기",
      "year": "2026",
      "module": "all",
      "note": "UML과 공식 모의응시 도구 연습을 언급합니다. 연결된 에센스 서비스는 현재 종료되어 대체 학습 본문을 이용하세요."
    },
    {
      "title": "탑싯 후기와 문제 유형 · domu-devlog",
      "url": "https://domu-devlog.tistory.com/entry/TOPCIT-%ED%9B%84%EA%B8%B0-%EB%B0%8F-%EB%AC%B8%EC%A0%9C-%EC%9C%A0%ED%98%95",
      "kind": "응시 후기",
      "year": "2022",
      "module": "all",
      "note": "SQL 작성과 문제 조건 읽기의 중요성을 언급한 과거 응시 기록. 구형 시험 구성은 현재와 다릅니다."
    },
    {
      "title": "TOPCIT 21회 후기 · choyan",
      "url": "https://choyan.tistory.com/36",
      "kind": "응시 후기",
      "year": "2024",
      "module": "all",
      "note": "SQL 복습과 운영체제 권한 등 놓친 내용을 돌아본 개인 후기입니다. 자기 점검 주제를 찾는 용도로 보세요."
    }
  ],
  "days": [
    {
      "day": 1,
      "title": "진단 · 코드와 알고리즘",
      "focus": "M1 기본기를 손으로 추적",
      "minutes": 210,
      "chapters": [
        "trace-lab",
        "algorithm-lab"
      ],
      "tasks": [
        "새 M1 코드·알고리즘 문제를 먼저 풀고 모르는 유형 표시 · 30분",
        "참조·반복·재귀 본문 읽고 변수 표 작성 · 45분",
        "lower_bound·괄호 검사·DP를 빈 화면에서 구현 · 75분",
        "오답 원인을 개념/계산/조건 누락으로 적고 다시 풀기 · 60분"
      ],
      "output": "코드 3개를 해설 없이 작성하고 시간복잡도를 설명한다."
    },
    {
      "day": 2,
      "title": "UML · 테스트 · 설계",
      "focus": "M1 수행형을 답안으로 만들기",
      "minutes": 210,
      "chapters": [
        "design-lab",
        "testing-lab"
      ],
      "tasks": [
        "클래스·시퀀스·DFD 차이와 기호 복습 · 45분",
        "도서관 모델과 결제 시퀀스를 직접 그리기 · 60분",
        "경계값·MC/DC 테스트 표 작성 · 45분",
        "공식 모의응시의 UML·컴파일러 조작 연습 · 60분"
      ],
      "output": "다중성·실패 경로가 있는 설계 2개와 테스트 표 1개를 완성한다."
    },
    {
      "day": 3,
      "title": "SQL · DB · AI 데이터",
      "focus": "M2 결과를 예측하고 쿼리 작성",
      "minutes": 240,
      "chapters": [
        "sql-lab",
        "db-lab",
        "ai-lab"
      ],
      "tasks": [
        "JOIN·NULL·COUNT·윈도 함수 손으로 계산 · 60분",
        "SQL 수행형 3개와 정규화 1개 작성 · 75분",
        "동시성·백업·인덱스 설명 연습 · 45분",
        "혼동행렬·데이터 누수 문제와 오답 복습 · 60분"
      ],
      "output": "주문 0건 고객, 팀별 Top 2, 미주문 고객 쿼리를 다시 작성한다."
    },
    {
      "day": 4,
      "title": "운영체제 · 네트워크 · 보안",
      "focus": "M3 계산과 공격-대책 연결",
      "minutes": 240,
      "chapters": [
        "os-lab",
        "network-lab",
        "security-lab"
      ],
      "tasks": [
        "RR·LRU·Amdahl·캐시 계산 · 60분",
        "서브넷 4개 분할과 HTTPS 흐름 설명 · 60분",
        "XSS·CSRF·SQL 삽입·암호·서명 비교 · 60분",
        "방화벽 표·업로드 검증 표를 작성하고 오답 반복 · 60분"
      ],
      "output": "단위가 있는 계산표 3개와 위협-통제 표를 완성한다."
    },
    {
      "day": 5,
      "title": "비즈니스 · EVM · 통합 답안",
      "focus": "M4 수치에서 의사결정까지",
      "minutes": 210,
      "chapters": [
        "pm-lab",
        "business-lab"
      ],
      "tasks": [
        "주공정·PERT·EVM·ROI·NPV 계산 · 60분",
        "전략·KPI·변경관리·라이선스 비교 · 45분",
        "450자 이내 보고와 IT 개선 제안서 작성 · 60분",
        "1~4일차 오답과 미완성 수행형 재도전 · 45분"
      ],
      "output": "EVM 6개 값과 일정표를 계산하고 결론·근거·조치를 적는다."
    },
    {
      "day": 6,
      "title": "150분 실전 리허설",
      "focus": "시간을 재고 답안 완성",
      "minutes": 210,
      "chapters": [],
      "tasks": [
        "공식 모의응시 도구 준비와 메모 환경 점검 · 10분",
        "실전 세트 75문제: 객관식60·서술7·수행8을 150분 동안 풀이",
        "해설과 자기채점 기준을 보며 오답 원인 분류 · 35분",
        "내일 다시 볼 약점 5개만 선정 · 15분"
      ],
      "output": "실제 점수 예측보다 미완성 문항과 시간 부족 원인을 기록한다."
    },
    {
      "day": 7,
      "title": "오답 회수 · 시험 전 정리",
      "focus": "새 주제보다 기억과 실행 확인",
      "minutes": 150,
      "chapters": [],
      "tasks": [
        "오답 노트의 문제를 해설 없이 다시 풀기 · 60분",
        "SQL·UML·네트워크·EVM 약점 5개 설명하기 · 45분",
        "공식 수험 안내·신분증·입실 시각·장소 직접 확인 · 15분",
        "핵심 공식과 답안 틀을 한 장으로 정리 · 30분"
      ],
      "output": "계산 단위, 다중성, NULL, 예외 경로를 마지막으로 확인한다."
    }
  ]
};
