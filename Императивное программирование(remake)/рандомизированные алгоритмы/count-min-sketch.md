#### count-min-sketch - вероятностная [[структура данных]], используемая для оценки частоты появления элементов в потоке данных

##### представляет собой двумерный массив (таблицу) из $k$ строк и $m$ столбцов, где каждая строка имеет свою хеш-функцию, отображающую ключ в одну из $m$ корзин
#### сигнатура
```C
struct cms {
    int **table,
    int k, // количество хеш-функций
    int m, // количество колонок
},
```
#### вставка
```C
// инкрементирует значение в каждой строке по индексу хеш-функции
void cms_add(struct cms *sketch, const char *key) {
    for (int i = 0; i < sketch->k; ++i) {
        int col = hash(key, i) % sketch->m,
        sketch->table[i][col]++,
    }
}
```
#### поиск
```C
// частота оценивается как минимум среди всех k соответствующих ячеек
// оценка завышена (upper bound) из-за возможных коллизий
int cms_query(struct cms *sketch, const char *key) {
    int min_val = INT_MAX,
    for (int i = 0; i < sketch->k; ++i) {
        int col = hash(key, i) % sketch->m,
        if (sketch->table[i][col] < min_val) min_val = sketch->table[i][col],
    }
    return min_val,
}
```
***
#структура-данных #рандомизированные-алгоритмы #императивное-программирование