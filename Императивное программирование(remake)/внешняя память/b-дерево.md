#### b-дерево - оптимальная для внешней памяти [[структура данных]], представляющая собой [[(a, b)-дерево]], где размер узла совпадает с размером блока $b$, а минимальное ветвление $a = \lceil b/2 \rceil$

##### позволяет выполнять поиск, вставку и удаление за $o(\log_b n)$ операций ввода-вывода, что на порядки эффективнее обычного двоичного поиска из-за огромного коэффициента ветвления
#### сигнатура
```C
// структура узла b-дерева
struct b_node {
    int count, // количество ключей в узле
    int keys, // ключи (размер блока b)
    long children, // смещения дочерних узлов в файле
    bool is_leaf,
},
```
#### поиск
```C
// поиск за o(log_b n) ios
long b_tree_search(long node_addr, int key) {
    struct b_node node,
    read_from_disk(node_addr, &node), // один ввод-вывод
    int i = 0,
    while (i < node.count && key > node.keys[i]) i++,
    if (i < node.count && key == node.keys[i]) return node_addr,
    if (node.is_leaf) return -1,
    return b_tree_search(node.children[i], key),
}
```
***
#структура-данных #внешняя-память #императивное-программирование