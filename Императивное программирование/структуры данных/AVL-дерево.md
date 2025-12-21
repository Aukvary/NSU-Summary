## сигнатура
```C
typedef struct node {
    int val; // значение 
    int height; // высота, считается как высота максимального из потосков + 1
    struct node *left; // левый потомок
    struct node *right; // правый потомок 
} node;

int height(node *n) { // высота узла
    return n ? n->height : 0;
}

int balanced(node *n) { // считается сбалансированным, если |значение| <= 1
    return n ? height(n->left) - height(n->right) : 0;
}

node* rightRotate(node* y) {
    node* x = y->left;
    node* T2 = x->right;

    x->right = y;
    y->left = T2;

    y->height = MAX(height(y->left), height(y->right)) + 1;
    x->height = MAX(height(x->left), height(x->right)) + 1;
    
    return x;
}

node* leftRotate(node* x) {
    node* y = x->right;
    node* T2 = y->left;

    y->left = x;
    x->right = T2;

    x->height = MAX(height(x->left), height(x->right)) + 1;
    y->height = MAX(height(y->left), height(y->right)) + 1;
  
    return y;
}

node* minValueNode(node* n) {
    node* cur = n;
    while (cur && cur->left)
        cur = cur->left;
        
    return cur;
}
```
## вставка
```C
node* push(node* node, int val) {
	if (!node) return newNode(val);

    if (val < node->val)
        node->left = push(node->left, val);
    else if (val > node->val)
        node->right = push(node->right, val);
    else
	    return node;
    
    node->height = 1 + MAX(height(node->left), height(node->right));

    int balance = balanced(node);

    if (balance > 1 && val < node->left->val)
        return rightRotate(node);

    if (balance < -1 && val > node->right->val)
        return leftRotate(node);

    if (balance > 1 && val > node->left->val) {
        node->left = leftRotate(node->left);
        return rightRotate(node);
    }

    if (balance < -1 && val < node->right->val) {
        node->right = rightRotate(node->right);
        return leftRotate(node);
    }

    return node;
}
```
## поиск
```C
node* search(node* head, int val) {
    if (!head) return NULL;

    if (head->val == val) return head;
    if (head->val > val) return search(head->left, val);
    
    return search(head->right, val);
}

node* search(node* head, int val) {
    node* current = head;
    
    while (current) {
        if (current->val == val) return current;
        if (val < current->val)
            current = current->left;
        else
            current = current->right;
    }
    
    return NULL;
}
```
## удаление
```C
node* pop(node* head, int val) {
    if (val < head->val)
        head->left = pop(head->left, val, removed);
    else if (val > head->val)
        head->right = pop(head->right, val, removed);
    else {
        if (!head->left || !head->right) {
            node* tmp = head->left ? head->left : head->right;

            if (!tmp) {
                tmp = head;
                head = NULL;
            } else {
                *head = *tmp;
            }
            free(tmp);
            
        } else {
            node* tmp = minValueNode(head->right);
            head->val = tmp->val;
            head->right = pop(head->right, tmp->val, removed);
        }
    }  

    if (!head) return head;

    head->height = 1 + MAX(height(head->left), height(head->right));
    int balance = balanced(head);

    if (balance > 1 && balanced(head->left) >= 0)
        return rightRotate(head);

    if (balance > 1 && balanced(head->left) < 0) {
        head->left = leftRotate(head->left);
        return rightRotate(head);
    }

    if (balance < -1 && balanced(head->right) <= 0)
        return leftRotate(head);

    if (balance < -1 && balanced(head->right) > 0) {
        head->right = rightRotate(head->right);
        return leftRotate(head);
    }

    return head;
}
```

##### асимптотики
вставка - log(N)
поиск - log(N)
удаление - log(N)
***
#императивное-программирование #структура-данных #дерево