##### свойства:
- не использует повороты при каждой операции
- не хранит дополнительной информации в узлах 
##### основная идея:
- дерево периодически становится несбалансированным
- когда дисбаланс превышает порог, находится "козёл отпущения" - узел, чьё поддерево слишком тяжёлое, и оно полностью перестраивается в идеально сбалансированное 
- есть коэффициент $\alpha$(~0.7), каждый узел должен удовлетворять условию height(left) $\leq$ $\alpha$ * height(n) и height(right) $\leq$ $\alpha$ * height(x)

## сигнатура
```C
typedef struct node {
	int val;
	int size;
	
	struct node* left;
	struct node* right;
} node;

float a = 0.7;

void nodes_to_array(node* n, node** arr, int* idx) {
	if (n == NULL) return;
	
	nodes_to_array(n->left, arr, idx);
	
	arr[(*idx)++] = n;
	
	nodes_to_array(n->right, arr, idx);
}

node* build_tree(node** arr, int l, int r) {
	if (l > r) return NULL;
	
	int m = l + (r - l) / 2;
	
	node* root = arr[m];
	
	root->left = build_tree(arr, l, m - 1);
	root->right = build_tree(arr, m + 1, r);
	
	int l_size = root->left ? root->left->size : 0;
	int r_size = root->right ? root->right->size : 0;
	
	root->size = l_size + r_size + 1;
	
	return root;
}

void balance(node** n) {
	if (*n == NULL) return;

	int** nodes = calloc((*n)->size, sizeof(node*));
	
	int idx = 0;
	
	nodes_to_array(*n, nodes, &idx);
	
	*n = build_tree(nodes, 0, (*n)->size);
	
	free(nodes);
}

int needs_rebalance(node* n) {
    if (n == NULL) return 0;
    
    int left_size = n->left ? n->left->size : 0;
    int right_size = n->right ? n->right->size : 0;
    
    if (left_size > a * n->size || right_size > a * n->size) {
        return 1;
    }
    return 0;
}
```
## вставка
```C
void push(node** head, node* new_node) {
    if (*head == NULL) {
        *head = new_node;
        new_node->size = 1;
        new_node->left = NULL;
        new_node->right = NULL;
        return;
    }
    
    if (new_node->val < (*head)->val) {
        push(&(*head)->left, new_node);
    } else if (new_node->val > (*head)->val) {
        push(&(*head)->right, new_node);
    } else return;
    
    int left_size = (*head)->left ? (*head)->left->size : 0;
    int right_size = (*head)->right ? (*head)->right->size : 0;
    (*head)->size = 1 + left_size + right_size;
    
    if (needs_rebalance(*head)) {
        balance(head);
    }
}
```
## поиск
```C
node* search(node* root, int data) {
    node* current = root;
    
    while (current != NULL) {
        if (data == current->data)
            return current;
        else if (data < current->data)
            current = current->left;
        else
            current = current->right;
    }
    return NULL;
}
```
## удаление
```C
void pop(node** head, int val) {
	if (*head == NULL) return;
	
	if ((*head)->val < val) pop(&(head)->left, val);
	else pop(&(head)->right, val);
	
	int left_size = (*head)->left ? (*head)->left->size : 0;
    int right_size = (*head)->right ? (*head)->right->size : 0;
    (*head)->size = 1 + left_size + right_size;
    
    if (needs_rebalance(*head)) {
        balance(head);
    }
}
```
***
#императивное-программирование #структура-данных #дерево