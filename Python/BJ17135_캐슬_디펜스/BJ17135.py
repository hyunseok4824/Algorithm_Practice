from collections import deque
from copy import deepcopy
import sys
input = sys.stdin.readline

N, M, D = map(int, input().split())
game_map = [list(map(int, input().split())) for _ in range(N)]

# 궁수를 각 열(column)에 배치했을 때, 누굴 먼저 쏴야 할지 우선순위 선정
archer_targets_by_col = [[] for _ in range(M)]
enemy_cnt = []

enemies = 0
for i in range(N - 1, -1, -1):  # 아래 행부터 위로
    enemy_cnt.append(enemies)   # 지금까지 센 적의 수 저장
    for j in range(M):
        if game_map[i][j]:
            enemies += 1
            for c in range(M):
                archer_targets_by_col[c].append((N - i + abs(j - c), j, N - 1 - i))

print(enemy_cnt)
print(archer_targets_by_col)
# for c in range(m):
#     enemy_priority_from_column[c].sort()
# for r in range(n):
#     enemy_cnt[r] = enemies - enemy_cnt[r]
# maximal = 3 * n, enemies


# archers_pos = []      # 궁수 위치 담는 리스트
# # DIRECTIONS = [(0, -1), (-1, 0), (0, 1)]
# # result = 0

# selectors = [0] * M   # 조합 체크용 리스트
# combine(0, 0)
#
# for pos in archers_pos:
#     result = max(result, simulate_game(pos))
#
# print(result)