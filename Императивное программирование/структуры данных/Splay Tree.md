##### основная идея:
- вместо балансировки всего дерева, балансируется только путь к последнему использованному узлу 
##### случаи поворота:

## сигнатура
```C
typedef struct node {
	int val;
	
	struct node* parent;
	struct node* left;
	struct node* right;
} node;

node* grand_parent(node* n) {
	return n->parent->parent;
}

void splay(node* root, node* n) {
	node* p = x->parent;      
	node* g = p->parent;      
	
	if (g == NULL) {
		if (x == p->left) {
			right_rotate(p);
		} else {
			left_rotate(p);
		}
	} else {
		if (x == p->left && p == g->left) {
			right_rotate(g);
			right_rotate(p);
		} else if (x == p->right && p == g->right) {
			left_rotate(g);
			left_rotate(p);
		} else if (x == p->right && p == g->left) {
			left_rotate(p);
			right_rotate(g);
		} else {
			right_rotate(p);
			left_rotate(g);
		}
    }
    
    *root = n;
}
```
## вставка
```C
node* create_node(int val) {
    node* n = (node*)malloc(sizeof(node));
    n->val = val;
    n->left = NULL;
    n->right = NULL;
    n->parent = NULL; 
    return n;
}

node* insert(node* root, int val) {
    if (root == NULL) {
        return create_node(val);
    }
    
    node* new_node = NULL;
    
    if (val < root->val) {
        root->left = insert(root->left, val);
        root->left->parent = root;  
        new_node = root->left;
    } else if (val > root->val) {
        root->right = insert(root->right, val);
        root->right->parent = root;  
        new_node = root->right;
    } else {
        return root;
    }
    
    root = splay(root, new_node);
    
    return root;
}
```
## поиск
```C
node* search(node* root, int val) {
    node* current = root;
    
    while (current != NULL) {
        if (val == current->val)
            return current;
        else if (val < current->val)
            current = current->left;
        else
            current = current->right;
    }
    return NULL;
}
```
## удаление
```C
void pop(node** root, node* n, int val) {
	if (n == NULL) return;
	
	if (val == n->val) 
		splay(root, n);
	
	else if (n->val > val) {
		pop(root, n->left, val);
		return;
	} else {
		pop(root, n->right, val);
		return;
	}

	mx = get_max(n->left);
	n->val = mx->val;
	
	free(mx);
}
```
***
#императивное-программирование #структура-данных #дерево