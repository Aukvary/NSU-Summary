#### сигнатура
```C
int deque[SIZE];
int head = 0;
int tail = 0;
```
#### вставка
```C
void push_back(int val) {
	deque[tail++ % SIZE] = val;
}

void push_front(int val) {
	head--;
	if (head < 0) head += SIZE;
	deque[head-- % SIZE] = val;
}
```
#### поиск
```C
int peek_back() {
	return deque[tail];
}

int peek_front() {
	return deque[head];
}
```
#### удаление
```C
void pop_back(int val) {
	tail--;
	if (tail < 0) tail += SIZE;
	deque[tail-- % SIZE] = val;
}

int pop_front(int val) {
	return deque[head++ % SIZE];
}
```
***
#императивное-программирование #структура-данных 