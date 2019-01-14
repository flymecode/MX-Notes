[TOC]

## 手写Array数组

```java
public class Array<E> {
	private E[] data;
	private int size;

	// 构造函数，传入数组的容量capacity构造Array
	public Array(int capacity) {
		data = (E[]) new Object[capacity];
		size = 0;
	}

	// 无参数的构造函数，默认数组的容量capacity =10
	public Array() {
		this(10);
	}

	// 获取元素的个数
	public int getSize() {
		return size;
	}

	// 获取数组的容量
	public int getcapacity() {
		return data.length;
	}

	// 判断元素是否为空
	public boolean isEmpty() {
		return size == 0;
	}

	// 向数组中添加一个元素
	public void addLast(E e) throws IllegalAccessException {
		add(size, e);
	}

	// 向数组中第一个位置插入
	public void addFirst(E e) throws IllegalAccessException {
		add(0, e);
	}

	// 获取index索引位置的位置
	public E get(int index) throws IllegalAccessException {
		if (index < 0 || index >= size) {
			throw new IllegalAccessException("Failed failed.Array is full");
		}
		return data[index];
	}

	// 修改index索引位置的元素为e
	public void set(int index, E e) {
		data[index] = e;

	}

	// 查找数组中是否有元素e
	public boolean contains(E e) {
		for (int i = 0; i < size; i++) {
			if (data[i].equals(e)) {
				return true;
			}
		}
		return false;
	}

	// 查找一个数的下标
	public int find(E e) {
		for (int i = 0; i < size; i++) {
			if (data[i].equals(e)) {
				return i;
			}
		}
		return -1;
	}

	// 在指定位置上增加一个元素
	public void add(int index, E e) throws IllegalAccessException {

		if (index < 0 || index > size) {
			throw new IllegalAccessException("Add failed.");
		}
		if (size == data.length) {
			resize(2 * data.length);
		}
		for (int i = size - 1; i >= index; i--) {
			data[i + 1] = data[i];
		}
		data[index] = e;
		size++;
	}

	private void resize(int newCapacity) {
		E[] newData = (E[])new Object[newCapacity];
		for (int i = 0; i < size; i++) {
			newData[i] = data[i];
		}
		data = newData;
	}

	// 移除数组中的一个元素，并返回移除的数
	public E remove(int index) throws IllegalAccessException {
		if (index < 0 || index > size) {
			throw new IllegalAccessException("Remove failed.");
		}
		E ret = data[index];
		for (int i = index + 1; i < size; i++) {
			data[i - 1] = data[i];
		}
		size--;
		// 这里利用懒策略，并且数组的缩容不能为0
		if(size == data.length / 4 && data.length / 2 != 0 ) {
			resize(data.length / 2);
		}
		return ret;
	}

	// 从数组中删除第一个元素
	public E removeFirst() throws IllegalAccessException {
		return remove(0);
	}

	// 从数组中删除最后一个元素
	public E removeLast() throws IllegalAccessException {
		return remove(size - 1);
	}

	// 删除一个元素
	public void removeElement(E e) throws IllegalAccessException {
		int index = find(e);
		if (index != -1) {
			remove(index);
		}
	}

	@Override
	public String toString() {
		StringBuilder res = new StringBuilder();
		res.append(String.format("Array:size = %d,capacity =%d\n", size, data.length));
		res.append('[');
		for (int i = 0; i < size; i++) {
			res.append(data[i]);
			if (i != size - 1) {
				res.append(',');
			}

		}
		res.append(']');
		return res.toString();
	}
}
```
### 手写Stack

```java
public interface Stack<E> {
    void push(E e);
    E pop();
    E peek();
    int getSize();
    boolean isEmpty();
}


public class ArrayStack<E> implements Stack<E> {
	Array<E> array;

	public ArrayStack(int capacity){
		array = new Array<>(capacity);
	}
	public ArrayStack(){
		array = new Array<>();
	}
	@Override
	public void push(E e){
		array.addLast(e);
	}

	@Override
	public E pop() {
		return array.removeLast();
	}

	@Override
	public E peek() {
		return array.getLast();
	}

	@Override
	public int getSize() {
		return array.getSize();
	}

	@Override
	public boolean isEmpty() {
		return array.isEmpty();
	}

	public int getCapacity() {
		return array.getcapacity();
	}

	@Override
	public String toString() {
		StringBuilder res = new StringBuilder();
		res.append("Stack:");
		res.append('[');
		for (int i = 0; i < array.getSize() ; i++) {
			res.append(array.get(i));
			if (i != array.getSize() - 1){
				res.append(',');
			}
		}
		res.append("] top");
		return res.toString();
	}
}

```

### 应用 符号匹配

```java

class Solution {
    public boolean isValid(String s) {
        // 存入字符，当取出的时候可以不用转换
		Stack<Character> stack = new Stack<>();
        for(int i = 0; i < s.length(); i ++) {
            char c = s.charAt(i);
            if(c = '{' || c = '[' || c = '(') {
                stack.push(c);
            } else {
                if(stack.isEmpty()) {
                    return fase;
                } 
                char topChar = stack.pop();
                if(c == ')' && topChar != '('){
                    return false;
                }
                if(c == '}' && topChar != '{') {
                    return false;
                }
                if(c == ']' && topChar != '[') {
                    return false;
                }
            }
            return stcak.isEmpty();
        }
    }
}
```

### Queue

- 队列也是一种线性结构
- 相比数组，队列的对应操作是数组的子集
- 只能从一端添加元素，从另一端取出元素

```java
public interface Queue<E> {
    void enqueue(E e);
    E dequeue();
    E getFront();
    int getSize();
    boolean isEmpty();
} 
```



```java
public class ArrayQueue<E> implements Queue<E> {
    private Array<E> array;
    public ArrayQueue(int capacity) {
        array = new Array<>(capacity);
    }
    public ArrayQueue() {
        array = new Array<>();
    }
    @Override
    public boolean isEmpty() {
        return array.isEmpty();
    }
    @Override
    public boid enqueue(E e) {
        array.addLast(e);
    }
    @Override
    public E dequeue() {
        return array.removeFirst();
    }
    // 时间复杂度是O(nl)
    @Override
    public E getFront() {
        return array.getFirst();
    }
    @Override
	public int getSize() {
		return array.getSize();
	}
    
    @Override
    public String toString() {
        StringBuilder res = new StringBuilder();
		res.append("Queue:");
		res.append('front [');
		for (int i = 0; i < array.getSize() ; i++) {
			res.append(array.get(i));
			if (i != array.getSize() - 1){
				res.append(',');
			}
		}
		res.append("] tail");
		return res.toString();
    }
}
```

### 循环队列

```java
front == tail 队列为空
当有元素入队的时候这时候tail ++
当front == (tail + 1)%c 的时候对列满

public class LoopQueue<E> implements Queue<E> {
	private E[] data;
	private int front ,tail;
	private int size; // 存放数据的多少
	
    public LoopQueue(int capacity) {
    	data = (E[])new Object[capacity+1];
    	front = 0;
    	tail = 0;
    	size = 0;
    }
    public LoopQueue() {
    	this(10);
    }
    
    public int getCapacity() {
    	return data.length - 1;
    }
    
    public boolean isEmpty() {
    	return front == tail;
    }
    
    public int getSize() {
    	return size; 
    }
    
    public void enqueue(E e) {
    	if((tail + 1) % data.length == front) {
        	resize(getCapacity * 2);
    	}
			    	
    	data[tail] = e;
    	tail = (tail + 1) % data.length;
    	size ++;
    	
    }
    public E dequeue() {
    	if(isEmpty()) {
    		throw new IllegalArgumentException("queue is empty");
    	}
    	E ret = data[front];
    	data[front] = null;
    	front = (front + 1) % data.length;
    	size --;
        if(size == getCapacity() / 4 && getCapacity() / 2 != 0) {
        	resize(getCapacity / 2);
        }
    	return ret;
    }
    
    public E getFront() {
    	if(isEmpty()) {
    		return data[front];
   	 	}
    }
    
    private void resize(int newCapacity) {
    	E[] newData = (E[])new Object[newCapacity + 1];
        for(int i = 0;i < size; i ++) {
        	newData[i] = data[(font+i) % data.length];
        }
        tail = size;
        front = 0;
        data = newData;
    }
}
 
```

------

## 链表

- 数据存储在节点中

```java
class Node {
    E e;
    Node next;
}
```

