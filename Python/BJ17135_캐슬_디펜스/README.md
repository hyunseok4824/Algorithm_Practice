<div> 
  <h1>백준 1181. 단어 정렬</h1>  
  <img src="../../assets/BJ_gold3.svg" width="30" style="margin: 0 auto;" />
</div>

<br>

---

## 1. 문제 정리

### 01. 문제 
캐슬 디펜스는 성을 향해 몰려오는 적을 잡는 턴 방식의 게임이다. 게임이 진행되는 곳은 **크기가 N×M인 격자판**으로 나타낼 수 있다. 
격자판은 1×1 크기의 칸으로 나누어져 있고, 각 칸에 포함된 적의 수는 최대 하나이다. **격자판의 N번행의 바로 아래(N+1번 행)의 모든 칸에는 성이 있다.**

성을 적에게서 지키기 위해 **궁수 3명을 배치**하려고 한다. 궁수는 성이 있는 칸에 배치할 수 있고, 하나의 칸에는 최대 1명의 궁수만 있을 수 있다. 
각각의 턴마다 궁수는 적 하나를 공격할 수 있고, 모든 궁수는 동시에 공격한다. 궁수가 공격하는 적은 **거리가 D이하인 적 중에서 가장 가까운 적**이고, 그러한 적이 여럿일 경우에는 **가장 왼쪽에 있는 적을 공격한다.** 
같은 적이 여러 궁수에게 공격당할 수 있다. 공격받은 적은 게임에서 제외된다. **궁수의 공격이 끝나면, 적이 이동한다. 적은 아래로 한 칸 이동하며, 성이 있는 칸으로 이동한 경우에는 게임에서 제외된다.** 
**모든 적이 격자판에서 제외되면 게임이 끝난다.** 

게임 설명에서 보다시피 궁수를 배치한 이후의 게임 진행은 정해져있다. 따라서, 이 게임은 궁수의 위치가 중요하다. **격자판의 상태가 주어졌을 때, 궁수의 공격으로 제거할 수 있는 적의 최대 수를 계산해보자.**

격자판의 두 위치 (r1, c1), (r2, c2)의 거리는 $|r_1-r_2| + |c_1-c_2|$이다.


### 02. 입력
- 첫째 줄에 격자판 행의 수 N, 열의 수 M, 궁수의 공격 거리 제한 D가 주어진다. 
(3 ≤ N, M ≤ 15, 1 ≤ D ≤ 10) <br>
- 둘째 줄부터 N개의 줄에는 격자판의 상태가 주어진다. 0은 빈 칸, 1은 적이 있는 칸이다.

### 03. 출력
첫째 줄에 궁수의 공격으로 제거할 수 있는 적의 최대 수를 출력한다.

### 04. 제한

1 ≤ D ≤ 10

---
## 2. 문제 접근

### 01. 문제 접근 방식



### 02. 풀이법
단어를 정렬하는 과정에서 두 가지 방법을 구현해보았다.
둘 다 기본적으로 단어 길이를 기준으로 오름차순 정렬하고, 길이가 같을 경우엔 사전 순으로 정렬하지만, 구현하는 방식이 조금 다르다.

**1. localeCompare() 메소드 사용**
**`a.localeCompare(b)`**: 길이가 같을 경우, 유니코드/언어 설정을 고려한 정확한 사전순 정렬
	**localeCompare**는 언어별 특수 문자나 대소문자 정렬 등에서도 정밀한 정렬을 지원한다.

```javascript
    const wordList = [... new Set(input.splice(1).sort((a, b) => a.length - b.length || a.localeCompare(b)))].join("\n")
```




**2. if 문으로 사용해서 정렬**
  단순 if문을 `sort()` 안에 사용해서 정렬했다.

  ```javascript
  const wordList = [ ... new Set(input.splice(1).sort((a, b) => {
    if (a.length === b.length) return a < b? -1 : 1
    return a.length - b.length
    })
  )].join("\n")

  ```



-> `localeCompare()`를 사용하는 것보다 `if문`을 사용하는 것이 훨씬 빨랐다. 아마 localeCompare()는 다양한 언어를 지원하다 보니, 추가적인 기능들이 있어서 무겁나 보다.

## 3. 회고
이번 기회에 `localeCompare()`라는 메소드랑 `sort()`의 심층적인 사용법을 익힐 수 있었다. 조금씩 자바스크립트가 익숙해지는 것 같지만, 아직 갈 길이 멀었다.
알고리즘을 풀면서 자바스크립트에 익숙해지는 것도 좋지만, 자바스크립트 자체에 대해 공부하는 것도 중요하다는 생각이 들었다. 자바스크립트 공부도 같이 병행해야겠다.


from collections import deque
from copy import deepcopy
import sys
input = sys.stdin.readline

def combine (step, lev):
    global M, selectors

    if lev == 3:
        combinations = []  # 생성된 조합 담는 리스트
        for i in range(M):
            if selectors[i]:
                combinations.append(i)
        archers_pos.append(combinations)
        return

    for r in range(step, M-(2-lev)):
        selectors[r] = 1
        combine(r+1, lev+1)
        selectors[r] = 0


def simulate_game(archer):
    simulate_map = deepcopy(game_map)
    visited = set()
    cnt = 0

    for i in range(N-1, -1, -1):
        killed_enermy = set()
        for j in archer:
            q = deque([[i, j, 1]])
            while q:
                x, y, d = q.popleft()
                if simulate_map[x][y]:
                    killed_enermy.add((x, y))
                    if not (x, y) in visited:
                        visited.add((x, y))
                        cnt += 1
                    break

                if d < D :
                    for dx, dy in DIRECTIONS:
                        nx, ny = x+dx, y+dy
                        if 0 <= nx < N and 0 <= ny < M:
                            q.append([nx, ny, d+1])

        for enermy_x, enermy_y in killed_enermy:
            simulate_map[enermy_x][enermy_y] = 0

    return cnt


N, M, D = map(int, input().split())
game_map = [list(map(int, input().split())) for _ in range(N)]
archers_pos = []      # 궁수 위치 담는 리스트
DIRECTIONS = [(0, -1), (-1, 0), (0, 1)]
result = 0

selectors = [0] * M   # 조합 체크용 리스트
combine(0, 0)

for pos in archers_pos:
    result = max(result, simulate_game(pos))

print(result)