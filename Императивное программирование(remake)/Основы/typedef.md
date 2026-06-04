#### typedef - ключевое слово, которое позволяет объявить псевдоним типа

##### пример 
```C
typedef int number;

number num = 10;

typedef struct {
	int a;
	int b;
} MyStruct;

MyStruct str = (MyStruct){
	.a = 10,
	.b = 20,
};
```
***
#понятие #императивное-программирование 