#### i-я порядковая статистика - это i-й по по величине элемент в множестве из n элементов(при условии их упорядоченности по возрастанию)

##### обозначения
- **минимум** - это первая порядковая статистика (i = 1)
- **максимум** - это n-я порядковая статистика (i = n)

##### поиск
- **рандомизированный выбор**
	- этот алгоритм основан на идее быстрой сортировки
	- так же как в быстрой сортировке мы выбираем элемент и сортируем числа относительно него 
	- только вместо того, чтобы сортировать массив полностью, мы  сортируем только ту половину, где находится наш индекс, то есть если мы ищем индекс 3, а наша последняя сортировка вернула 5, то нет смысла искать в правой части
```C
int quick_select(int* nums, int l, int r) {
	int pi = l + rand() % (r - l + 1);
	int pivot = nums[pi];
	swap(&nums[pi], &nums[r]);
	
	int idx = l;
	
	for (int i = l; i < r; i++) {
		if (nums[i] < pivot) {
			swap(&nums[i], &nums[idx]);
			idx++;
		}
	}
	
	swap(&nums[r], &nums[idx]);
	
	return idx;
}

int select(int* nums, int l, int r, int i) {
	if (l == r) return nums [l];
	
	int idx = quick_select(nums, l, r);
	
	if (idx == i) return nums[idx];
	if (idx < i) return select(nums, idx + 1, r, i);
	return select(nums, l, idx - 1, i);
}

int find(int* nums, int n, int i) {
	if (i < 0 || i >= n) return -1;
	return select(nums, 0, n - 1, i);
}
```
- **медиана медиан** 
```C
void insert_sort(int* nums, int l, int r) {
	for (int i = l + 1; i <= r; i++) {
		int key = nums[i];
		int j = i - 1;
		while (j >= l && nums[j] > key) {
			nums[j + 1] = nums[j];
			j--;
		}
		
		nums[j + 1] = key;
	}
}

  

int partion(int* nums, int l, int r, int p) {
	for (int i = l; i <= r; i++) {
		if (nums[i] == p) {
			swap(&nums[i], &nums[r]);
			break;
		}
	}
	
	int idx = l;
	
	for (int i = l; i < r; i++) {
		if (nums[i] < p) {
			swap(&nums[i], &nums[idx]);
			idx++;
		}
	}
	
	swap(&nums[r], &nums[idx]);
	return idx;
}

int select(int* nums, int l, int r, int i) {
	int n = r - l + 1;
	
	if (n <= 5) {
		insert_sort(nums, l, r);
		return nums[l + i];
	}
	
	int mi = l;
	
	for (int li = l; li <= r; li += 5) {
		int ri = li + 4;
		if (ri > r) ri = r;
		
		insert_sort(nums, li, ri);
		int m = li + (ri - li) / 2;
		swap(&nums[mi++], &nums[m]);
	}
	
	int count = mi - l;
	int p = select(nums, l, mi - 1, count / 2);
	int idx = partion(nums, l, r, p);
	int k = idx - l;
	
	if (k == i) return nums[idx];
	if (i < k) return select(nums, l, idx - 1, i);
	return select(nums, idx + 1, r, i - k - 1);
} 

void find(int* nums, int n, int i) {
	return select(nums, 0, n - 1, i);
}
```
***
#понятие #императивное-программирование 