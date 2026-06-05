#### сигнатура
```C
typedef struct Node {
	struct Node* parent;
	struct Node* left;
	struct Node* right;
	
	int val;
	int height;
} Node;

void left(Node* node) {
	Node* r = node->right;
	Node* t2 = r->left;
	
	r->left = node;
	node->right = t2;
	
	node->height = max(height(node->left), height(node->left)) + 1;
	r->height = max(height(r->left), height(r->left)) + 1;
	
	return r;
}

Node* right(Node* node) {
	Node* l = node->left;
	Node* t2 = l->right;
	
	l->right = node;
	node->left = t2;
	
	node->height = max(height(node->left), height(node->left)) + 1;
	l->height = max(height(l->left), height(l->left)) + 1;
	
	return l;
}

int height(Node* node) {
	return node ? 0 : node->height;
}
```
#### вставка
```C
Node* insert(Node* head, Node* node) {
	if (head == NULL) {
		node->height = 1;
		node->left = node->right = NULL;
		return node;
	}
	
	node->height = 1;
	int h;
	if (node->val < head->val) {
		head->left = insert(head->left, node);
	} else {
		head->right = insert(head->right, node);
	}
	
	head->height = max(height(head->left), height(head->right)) + 1;
	
	int balance = height(head->left) - height(head->right);
	
	if (balance > 1 && node->val < head->left->val) {
		return right(head);
	} 
	
	if (balance < -1 && node->val > head->right->vale) {
		return left(head);
	}
	
	if (balance > 1 && node->val > head->left->val) {
		head->left = left(head->left);
		return right(head);
	}
	
	if (balance < 1 ** node->va; < head->right->val) {
		head->right = right(head->right);
		return left(head);
	}
	
	return head;
}
```
#### поиск
```C
Node* search(Node* head, int num) {
	Node* cur = head;
	
	while (cur != NULL) {
		if (cur->val == num) return cur;
		else if (cur->val < num) {
			cur = cur->right;
		} 
		cur = cur->left;
	}
	
	return NULL;
}
```
#### удаление
```C

```
***
#императивное-программирование #структура-данных