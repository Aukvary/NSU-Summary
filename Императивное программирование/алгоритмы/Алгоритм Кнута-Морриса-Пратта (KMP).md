```C
int* get_prefix(char* target) {
    int m = strlen(target);
    int* pi = calloc(m, sizeof(int));
    pi[0] = 0;
    int k = 0;  // длина текущего префикса
    
    for (int q = 1; q < m; q++) {
        // Пока не совпадает и k > 0
        while (k > 0 && P[k] != P[q])
            k = pi[k-1];  // откатываемся
        
        // Если совпадает
        if (P[k] == P[q])
            k++;
            
        pi[q] = k;
    }
    return pi;
}

void kmp_search(char* str, char* target) {
    int n = strlen(str);
    int m = strlen(target);
    int* pi = compute_prefix(target);
    int q = 0;  // количество совпавших символов
    
    for (int i = 0; i < n; i++) {
        // Пока не совпадает и q > 0
        while (q > 0 && P[q] != T[i])
            q = pi[q-1];  // откатываемся
        
        // Если совпадает
        if (P[q] == T[i])
            q++;
        
        // Нашли образец
        if (q == m) {
            printf("Найдено на позиции %d\n", i - m + 1);
            q = pi[q-1];  // продолжаем поиск
        }
    }
    
    free(pi);
}
```

##### асимптотика
- скорость O(n + m)
- память O(m)
***
#императивное-программирование #поиск #алгоритм