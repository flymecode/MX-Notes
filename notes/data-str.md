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

![1547430420395](https://github.com/flymecode/MX-Notes/blob/master/image/1547430420395.png)

- 优点：不需要处理固定容量的问题，做到真正的动态
- 缺点：丧失了随机访问的能力

```java
public class LinkedList<E> {
	// 设计成内部类的形式，对外部是透明的
	private class Node {
 		public E e;
    	public Node next;

		public Node(E e,Node next) {
			this.e = e;
			this.next = next;
		}

		public Node(E e) {
			this(e,null);
		}
		public Node() {
			this(null,null);
		}
		public String toString() {
			return e.toString();
		}
	}

	private Node head;
	private int size;
	
	public LinkedList() {
		this.head = null;
		this.size = 0;
	}
	// 获取链表中元素的个数
	public int getSize() {
		return size;
	}
	// 判断链表是否为空
	public boolean isEmpty() {
		return size == 0;
	}
	// 在链表头添加元素
	public void addFirst(E e) {
		// Node node = new Node(e);
		// node.next = head;
		// head = node;

		head = new Node(e,head);
		size ++;
	}

	public void add(int index, E e) {
		if(index < 0 || index > size) {
			throw new IllegalArgumentException("Add failed,Illegal index is error");
		}
		
		if(index == 0) {
			addFirst(e);
		} else {
			Node prev = head;
			for(int i = 0; i < index - 1; i++) {
				prev = prev.next();
			}
			// Node node = new Node(e);
			// node.next = prev.next;
			// prev.next = node;
			prev.next = new Node(e.prev.next);
			size ++;
		}
	}
	// 在链表末尾添加元素
	public void addLast(E e){
		add(size,e);
	}

}
```
### 虚拟节点
- 解决头节点插入与其他节点插入方法不同的问题

```java
public class LinkList<E> {

	// 设计成内部类的形式，对外部是透明的
	private class Node {
		public E e;
		public Node next;

		public Node(E e, Node next) {
			this.e = e;
			this.next = next;
		}

		public Node(E e) {
			this(e, null);
		}

		public Node() {
			this(null, null);
		}

		@Override
		public String toString() {
			return e.toString();
		}
	}

	private Node dummyHead;
	private int size;

	public LinkList() {
		this.dummyHead = new Node(null, null);
		this.size = 0;
	}

	// 获取链表中元素的个数
	public int getSize() {
		return size;
	}

	// 判断链表是否为空
	public boolean isEmpty() {
		return size == 0;
	}

	public void add(int index, E e) {
		if (index < 0 || index > size) {
			throw new IllegalArgumentException("Add failed,Illegal index is error");
		}
		Node prev = dummyHead;
		for (int i = 0; i < index; i++) {
			prev = prev.next;
		}
		prev.next = new Node(e,prev.next);
		size++;
	}

	// 在链表末尾添加元素
	public void addLast(E e) {
		add(size, e);
	}

	// 在链表头添加元素
	public void addFirst(E e) {
		add(0,e);
	}

	// 获取链表的index的值
	public E get(int index) {
		if (index < 0 || index > size) {
			throw new IllegalArgumentException("Add failed,Illegal index is error");
		}
		Node cur = dummyHead.next;
		for (int i = 0; i < index; i++) {
			cur = cur.next;
		}
		return cur.e;
	}

	// 获得链表的第一个元素
	public E getFirst() {
		return get(0);
	}

	// 获得链表的最后一个元素
	public E getLast() {
		return get(size - 1);
	}

	// 更新链表的最后一个元素
	public void set(int index, E e) {
		if (index < 0 || index > size) {
			throw new IllegalArgumentException("Add failed,Illegal index is error");
		}
		Node cur = dummyHead;
		for (int i = 0; i < index; i++) {
			cur = cur.next;
		}
		cur.e = e;
	}

	// 查找链表是否存在元素e
	public boolean contains(E e) {
		Node cur = dummyHead.next;
		while (cur != null) {
			if (cur.e.equals(e)) {
				return true;
			}
		}
		return false;
	}

	// 删除指定元素
	public E remove(int index) {
		if (index < 0 || index > size) {
			throw new IllegalArgumentException("Add failed,Illegal index is error");
		}
		Node prev = dummyHead;
		for (int i = 0; i < index; i++) {
			prev = prev.next;
		}
		Node delNode = prev.next;
		prev.next = delNode.next;
		delNode.next = null;
		size--;
		return delNode.e;
	}

	// 删除第一个元素
	public E removeFirst() {
		return remove(0);
	}

	// 删除最后一个元素
	public E removeLast() {
		return remove(size - 1);
	}

	@Override
	public String toString() {
		StringBuilder res = new StringBuilder();
		// Node cur = dummyHead.next;
		// while(cur != null) {
		//	res.append(cur + "->");
		//	cur = cur.next;
		// }
		for (Node cur = dummyHead.next; cur != null; cur = cur.next) {
			res.append(cur + "->");
		}
		res.append("NULL");
		return res.toString();
	}
}
```
### 链表实现栈
```java
public class LinkedListStack<E> implements Stack<E> {

	private LinkList<E> list;
	public LinkedListStack() {
		list = new LinkList<>();
	}
	@Override
	public void push(E e) {
		list.addFirst(e);
	}

	@Override
	public E pop() {
		return list.removeFirst();
	}

	@Override
	public E peek() {
		return list.getFirst();
	}

	@Override
	public int getSize() {
		return list.getSize();
	}

	@Override
	public boolean isEmpty() {
		return list.isEmpty();
	}
	@Override
	public String toString() {
		StringBuilder res = new StringBuilder();
		res.append("Stack:top");
		res.append(list);
		return res.toString();
	}
}
​```java
public class LinkedListQueue<E> implements Queue<E> {
	private class Node {
 		public E e;
    	public Node next;

		public Node(E e,Node next) {
			this.e = e;
			this.next = next;
		}

		public Node(E e) {
			this(e,null);
		}
		public Node() {
			this(null,null);
		}
		public String toString() {
			return e.toString();
		}
	}

	private Node head, tail;
	private int size;

	public LinkedListQueue() {
		head = null;
		tail = null;
		size = 0;
	}
	public int getSize() {
		return size;
	}
	public boolean isEmpty() {
		return size == 0;
	}
	public void enqueue(E e) {
		if(tail == null) {
			tail = new Node(e);
			head = tail;
		} else {
			tail.next = new Node(e);
			tail = tail.next;
		}
		size ++;
	}
	public void dequeue() {
		if(isEmpty()) {
			throw new IllegalArgumentException("Cannot dequeue from an empty queue");
		}
		Node reNode = head;
		head = head.next;
		retNode.next = null;
		if(head == null) {
			tail = null;
		}
		size --;
		return retNode.e;
	}
}
```
### 链表与递归
203. 移除链表元素
删除链表中等于给定值 val 的所有节点。

示例:

输入: 1->2->6->3->4->5->6, val = 6
输出: 1->2->3->4->5

```java
public class Solution {

	public ListNode removeElements(ListNode head, int val) {
		ListNode dummyHead = new ListNode(0);
		dummyHead.next = head;
		ListNode pre = dummyHead;
		while(pre.next != null){
			if(pre.next.val == val ) {
				pre.next = pre.next.next;
			} else {
				pre = pre.next;
			}
		}
	}
}
```

把递归过程想成一个子函数，在子函数中写处理逻辑来解决上层函数的问题。

```java
	public class Solution {

	public ListNode removeElements(ListNode head, int val) {
		if(head == null){
			return null;
		}
		head.next = removeElements(head.next,val);
		return head.val == val? head.next: head;
		
	}
}
```

## 树

### 二分搜索树 Binary Search Tree
- 必须有可比较性
- 左孩子比根节点小
- 右孩子比根节点大
- 如果想包含重复的元素的话，只需要定义：
左子树小于等于节点；或者右子树大于等于节点
```java
public class BST<E> extends Comparable<E> {
	private class Node {
		public E e;
		public Node left, right;
	}

	public Node(E e) {
		this.e = e;
		this.left = null;
		this.right = null;
	}

	private Node root;
	private int size;

	public BST() {
		this.root = null;
		this.size = 0;
	}

	public int size() {
		return size;
	}

	public boolean isEmpty() {
		return size == 0;
	}
	// 添加元素
	public void add(E e) {
		// if(root == null) {
		// 	root = new Node(e);
		// 	size ++;
		// } else {
		// 	add(root,e);
		// }
		
		// 修改之后
		root = add(root,e);
	}

	// 向以node为根的二分搜索树种插入元素E
	private Node add(Node node, E e) {
		// if(root.e.equals(e)) {
		// 	return;
		// } else if(e.compareTo(node.e) < 0 && node.left == null) {
		// 	node.left = new Node(e);
		// 	size ++;
		// 	return;
		// } else if(e.compareTo(node.e) > 0 && node.right == null) {
		// 	node.right = new Node(e);
		// 	size ++;
		// 	return;
		// }
		// if (e.compareTo(node.e) < 0) {
		// 	add(node.left,e);
		// } else {
		// 	add(node.right,e);
		// }

		// 当我们递归到null的时候就一定要创建一个节点
		if(node == null) {
			size ++;
			return new Node(e);
		}
		if (e.compareTo(node.e) < 0) {
			node.left = add(node.left,e);
		} else {
			node.right = add(node.right,e);
		}
		return node;
	}

	public boolean contains(E e) {
		return contains(root, e);
	}

	private boolean contains(Node node, e) {
		if(node == null) {
			return false;
		}

		if(e.compareTo(node.e)){
			return true;
		}

		if (e.compareTo(node.e) < 0) {
			return contains(node.left,e);
		} else {
			return contains(node.right,e);
		}
	}

	// 二叉树的前序遍历
	public void preOrder() {
		preOrder(root);
	}

	private void preOrder(Node node) {
		if(node == null) {
			return;
		}
		System.out.println(node.e);
		preOreder(node.left);
		preOreder(node.right);
	}

	// 顺序的排列的
	public void inOrder() {
		inOrder(root);
	}

	public void inOrder(Node node) {
		if(node == null) {
			return;
		}
		preOreder(node.left);
		System.out.println(node.e);
		preOreder(node.right);
	}

	// 后序遍历
	// 为二分搜索释放内存
	public void postOrder() {
		postOrder(root);
	}

	private void postOrder(Node node) {
		if(node == null) {
			return;
		}
		preOreder(node.left);
		preOreder(node.right);
		System.out.println(node.e);
	}
    // 最小值
    public E minimum() {
        if(size == 0){
            throw new IllegalArgumentException("BST is empty");
        }
        return minimum(root).e;
    }
    // 返回已node为根的二分搜索树的最小值所在的节点
    private Node minimum(Node node) {
        if(node.left == null) {
            return node;
        }
        return minimum(node.left);
    }
    
    // 最大值	
    public E maximum() {
        if(size == 0){
            throw new IllegalArgumentException("BST is empty");
        }
        return maximum(root).e;
    }
    // 返回已node为根的二分搜索树的最小值所在的节点
    private Node maximum(Node node) {
        if(node.right == null) {
            return node;
        }
        return minimum(node.right);
    }
    // 从树中删除最小值
    public E removeMin() {
        E ret = minimum();
        // 返回删除后新的根节点
        root = removeMin(root);
        return ret;
    }
    // 返回删除节点后新的二分搜索树
    private Node removeMin(Node node) {
        
        if(node.left == null) {
            Node rightNode = node.rigth;
            node.right = null;
            size --;
            return rightNode;
        }
        node.left = removeMin(node.left);
        return node;
    }
    
     // 从树中删除最小值
    public E removeMax() {
        E ret = maximum();
        // 返回删除后新的根节点
        root = removeMax(root);
        return ret;
    }
    // 返回删除节点后新的二分搜索树
    private Node removeMax(Node node) {
        
        if(node.right == null) {
            Node leftNode = node.left;
            node.left = null;
            size --;
            return leftNode;
        }
        node.right = removeMin(node.right);
        return node;
    }
    
    // 删除某一结点
    public void remove(E e) {
        root = remove(root);
    }
    private Node remove(Node node, E e) {
        if(node == null) {
            return null;
        }
        if(e.compareTo(node.e) < 0) {
            node.left = remove(node.left,e);
            return node;
        } else if(e.compareTo(node.e) > 0) {
            node.right = remove(node.right,e);
            return node;
        } else {
            // 3种情况
            if(node.left == null) {
                Node rightNode = node.right;
                node.right = null;
                size --;
                return rightNode;
            }
            if(node.right == null) {
                Node leftNode = node.left;
                node.left = null;
                size --;
                return leftNode;
            }
            // 当左右子树都不为空的时候
            Node successor = minimum(node.right);
            // 这里我们进行了删除size进行了减操作
            successor.right = removeMin(node.right);
            successor.left = node.left;
            node.left = node.right = null;
            return successor;
        }
        
    }
}
```
### 前序遍历非递归
```java
// 首先将节点压入栈中，如果栈不为空这弹出栈顶元素，并将左右孩子压入栈中，首先压入左孩子然后压入右孩子
	public void preOrder() {
		Stack<Node> stack = new Stack<>();
		stack.push(root);

		if(!stack.isEmpty()){
			Node node = stack.pop();
			System.out.println(node.e);
			if(node.left != null){
				stack.push(node.left);
			}
			if(node.right != null){
				stack.push(node.right);
			}
		}
	}
```

### 层序遍历

```java
// 利用队列
public void levelOrder() {
    Queue<Node> q = new LinkedList<>();
    q.add(root);
    while(!q.isEmpty()) {
        Node cur = q.remove();
        System.out.println(cur.e);
        if(cur.left != null) {
            q.add(cur.left);
        }
        if(cur.right != null) {
            q.add(cur.right);
        }
    }
}
```

## Set 

```java
// 应用：客户统计、词汇量统计
public interface Set<E> {
    void add(E e); // 不能添加重复元素
    void remove(E e);
    boolean contains(E e);
    int getSize();
    boolean isEmpty();
}
```

### BST实现集合

```java
//平均时间复杂度O(logn)
public class BSTSet<E extends Comparable<E>> implements Set<E> {
    private BST<E> bst;
    public BSTSet() {
        bst = new BST<>();
    }
    @Override
    public int getSize() {
        return bst.size();
    }
    @Override
    public boolean isEmpty() {
        return bst.isEmpty();
    }
    @Override
    public void add(E e) {
        bst.add(e);
    }
    @Override
    public boolean contains(E e) {
        return bst.contains(e);
    }
}
```

### 链表实现集合

```java
// 平均时间复杂度O(n)
public class LinkedListSet<E> implements Set<E> {
    private LinkedList<E> list;
    
    public LinkListSet() {
        list = new LinkedList<>();
    }
    @Override
    public int getSize() {
        return list.size();
    }
    @Override
    public boolean isEmpty() {
        return list.isEmpty();
    }
    @Override
    public void add(E e) {
        if(!list.contains(e)) {
            list.addFirst(e);
        }
    }
    @Override
    public boolean contains(E e) {
        return list.contains(e);
    }
    @Override
    public void remove(E e) {
        list.removeElement(e);
    }
}
```

## Map

```java
public interface Map<K,V> {
    void add(K key,V value);
    V remove(K key);
    boolean contains(K key);
    V get(K key);
    void set(K key,V value);
    int getSize();
    boolean isEmpty();
}
```

#### 链表实现Map

```java
// 平均时间复杂度O(n)
public class LinkedListMap<K,V> implements Map<K,V> {
    private class Node {
       public K key;
       public V value;
       public Node next;
        
       public Node(K key, V value, Node next) {
            this.key = key;
            this.value = value;
            this.next = next;
        }
        public Node(K key){
            this(key,null,null);
        }
        public Node() {
            this(null,null,null);
        }
        @Override
        public String toString() {
            return key.toString() + ":" + value.toString();
        }
   }
    
    private Node dummyHead;
    private int size;
    
    public LinkedListMap() {
        dummyHead = new Node();
        size = 0;
    }
    
    @Override 
    public int getSize() {
        return size;
    }
    @Override
    public boolean isEmpty() {
        return size == 0;
    }
    private Node getNode(K key) {
        Node cur = dummyHead.next;
        while(cur != null) {
            if(cur.key.equals(key)){
                return cur;
            }
            cur = cur.next;
        }
        return null;
    }
    
    @Override
    public boolean contains(K key) {
        return getNode(key) != null;
    }
    @Override
    public V get(K key) {
        Node node = getNode(key);
        return node == null ? null : node.value;
    }
    @Override
    public void add(K key, V value) {
        Node node = getNode(key);
        if(node == null) {
            // 头插法
            dummyHead.next = new Node(key,value,dummyHead.next);
            size ++;
        } else {
            node.value = value;
        }
    }
    @Override
    public void set(K key, V value) {
        Node node = getNode(key);
        if(node == null) {
            throw new IllegalArgumentException(key + "doesn't exist !");
        }
        node.value = value;
    }
    @Override
    public V remove(Key key) {
        Node prev = dummyHead;
        // 寻找删除节点的前驱
        while(prev.next != null) {
            if(prev.next.key.equals(key)){
                break;
            }
            prev = prev.next;
        }
        if(prev.next != null) {
            Node delNode = prev.next;
            prev.next = delNode.next;
            delNode.next = null;
            return delNode.value;
        }
        return null;
    }
}
```

#### 二分搜索树实现Map

```java
// 平均时间复杂度O（logn）
public class BSTMap<K extends Comparable<K>, V> implements Map<K, V> {
	private class Node {
		public K key;
		public V value;
		public Node left, right;

		public Node(K key, V value) {
			this.key = key;
			this.value = value;
			left = null;
			right = null;
		}
	}

	private Node root;
	private int size;

	public BSTMap() {
		root = null;
		size = 0;
	}

	@Override
	public int size() {
		return size;
	}

	@Override
	public boolean isEmpty() {
		return size == 0;
	}

	@Override
	public boolean contains(K key) {
		return getNode(root, key) != null;
	}

	// 添加元素
	@Override
	public void add(K key, V value) {
		root = add(root, key, value);
	}

	// 向以node为根的二分搜索树种插入元素E
	private Node add(Node node, K key, V value) {
		// 当我们递归到null的时候就一定要创建一个节点
		if (node == null) {
			size++;
			return new Node(key, value);
		}
		if (key.compareTo(node.key) < 0) {
			node.left = add(node.left, key, value);
		} else if (key.compareTo(node.key) > 0) {
			node.right = add(node.right, key, value);
		} else {
			node.value = value;
		}
		return node;
	}

	private Node getNode(Node node, K key) {
		if (node == null) {
			return null;
		}
		if (key.compareTo(node.key) < 0) {
			return getNode(node.left, key);
		} else if (key.compareTo(node.key) > 0) {
			return getNode(node.right, key);
		} else {
			return node;
		}
	}

	@Override
	public V get(K key) {
		Node node = getNode(root, key);
		return node == null ? null : node.value;
	}

	@Override
	public void set(K key, V value) {
		Node node = getNode(root, key);
		if (node == null) {
			throw new IllegalArgumentException(key + "doesn't exist !");
		}
		node.value = value;
	}

	public V remove(K key) {
		Node node = getNode(root, key);
		if (node != null) {
			root = remove(root, key);
			return node.value;
		}
		return null;
	}

	private Node remove(Node node, K key) {
		if (node == null) {
			return null;
		}
		if (key.compareTo(node.key) < 0) {
			node.left = remove(node.left, key);
			return node;
		} else if (key.compareTo(node.key) > 0) {
			node.right = remove(node.right, key);
			return node;
		} else {
			// 3种情况
			if (node.left == null) {
				Node rightNode = node.right;
				node.right = null;
				size--;
				return rightNode;
			}
			if (node.right == null) {
				Node leftNode = node.left;
				node.left = null;
				size--;
				return leftNode;
			}
			// 在BST上有实现的方法
			Node successor = minimum(node.right);
			// 这里我们进行了删除size进行了减操作
			successor.right = removeMin(node.right);
			successor.left = node.left;
			node.left = node.right = null;
			return successor;
		}
	}
}	
```

我们可以通过映射来包装成映射。



### 优先队列

|              | 入队    | 出队    |
| ------------ | ------- | ------- |
| 普通线性结构 | O(1)    | O(N)    |
| 顺序线性结构 | O(N)    | O(1)    |
| 堆           | O(logn) | O(logn) |

### 使用数组完成堆的结构

```java
public class MaxHeap<E extends Comparable<E>> {
    private Array<E> data;
    public MaxHeap(int capacity){
        data = new Array<>(capacity);
    }
    
    public int size(){
        return data.size();
    }
    public boolean isEmpty(){
        return data.isEmpty();
    }
    // 返回完全二叉树的数组表示中，一个索引所表示的元素的父亲节点的索引
    private int parent(int index){
        if(index == 0){
            throw new IllegalArgumentException("index -0 doesn't have parent");
        }
        return (index-1)/2;
    }
    //返回完全二叉树的数组表示中，一个索引所表示的元素的左孩子节点的索引
    private int leftChild(int index){
        return 2 * index + 1;
    }
     //返回完全二叉树的数组表示中，一个索引所表示的元素的右孩子节点的索引
    private int leftChild(int index){
        return 2 * index + 2;
    }
}
```

### Sift Up 上浮

```java
// 向堆中添加元素
public void add(E e) {
    data.addLast(e);
    siftUp(data.getSize() - 1);
}
private void siftUp(int k){
    while(k > 0 && data.get(parent(k)).compareTo(data.get(k)) < 0) {
        // 在data里实现swap
        data.swap(k, parent(k));
        k = parent(k);
    }
}
```

### Sift Down

```java
public E findMax() {
    if(data.getSize() == 0) {
        throw new IllegalArumentException("Con not findMax");
    }
    return data.get(0);
}
public E getMax() {
    E e = findMax();
    data.swap(0,data.size() - 1);
    data.removeLast();
    
    siftDown(0);
    return e;
}
private void siftDown(int k) {
    // 左孩子索引比右孩子索引大的时候循环终止
    while(leftChild(k) < data.getSize()) {
        // 保存要交换的索引值
        int j = leftChild(k);
        // 说明有右孩子，并且右孩子的值比左孩子大，那么j++
        if( j + 1 < data.getSize() && data.get(j+1).compareTo(data.get(j) > 0)) {
            j ++;
        }
        // 如果当前节点比两个孩子节点中的最大值还要大的时候跳出循环
        if(data.get(k).compareTo(data.get(j)) >= 0) {
            break;
        }
        // 下沉操作
        data.swap(i,j);
        // 节点索引值改变
        k = j;
    }
}
```

### replace

- 取出最大元素之后，放入一个新的元素
- 实现： 可以先extractMax,在add,两次O(logn)的操作
- 实现： 可以直接将堆顶替换之后进行siftDown,一次O(logn)的操作

```java
public E replace(E e) {
    E ret = findMax();
    data.set(0,e);
    siftDown(0);
    return ret;
}
```

### heapify

- 将任意的数组整理成堆的形状
- 实现：从最后一个非叶子节点之前的元素进行siftdown操作。
- 找到最后一个非叶子节点，就是最后一个节点的父亲节点。

```java
public MaxHeap(E[] arr) {
    data = new Array<>(arr);
    for(int i = parent(arr.length - 1); i >= 0; i--) {
        siftDown(i);
    }
}
// 在arry中构造
pullic Array(E[] arr) {
    data = (E[])new Object[arr.length];
    for(int i = 0; i < arr.length; i++) {
        data[i] = arr[i];
    }
}
```

### 优先队列PriorityQueue

```java
public class PriorityQueue<E extends Comparabel<E>> implements Queue {
    private MaxHeap<E> maxHeap;
    public PriorityQueue() {
        maxHeap = new MaxHeap();
    }
    public int getSize(){
        return maxHeap.size();
    }
    public boolean isEmpty() {
        return maxHeap.isEmpty();
    }
    public E getFront() {
        return maxHeap.findMax();
    }
    public void enqueue(E e) {
        maxHeap.add(e);
    }
    public void dequeue() {
        return maxhHeap.extractMax();
    }
}
```

在N个元素中选出前M个元素？

```JAVA
class Solution {
	private class Freq implements Comparable<Freq> {
		int e,freq;
		public Freq(int e,int freq) {
			this.e = e;
			this.freq = freq;
		}
		@Override
		public int compareTo(Freq another) {
			return this.freq - another.freq;
		}
	}
    public List<Integer> topKFrequent(int[] nums, int k) {
        
        Map<Integer> map = new TreeMap<>();
        for(int key: map) {
            if(map.containKey(value)) {
                map.put(key,map.get(key) + 1);
            } else {
                map.put(key,1);
            }
        }
        PriorityQueue<Freq> queue = new PriorityQueue<>();
		for(int key:map.keySet()) {
			if(queue.getSize() < k){
				queue.enqueue(new Freq(key,map.get(key));
			} else if(map.get(key) > queue.getFront().freq){
				queue.dequeue();
				queue.enqueue(new Freq(key,map.get(key)));
			}
		}
		LinkedList<Integer> res = new LinkedList<>();
		while(!queue.isEmpty())
		res.add(pq.dequeue().e);
		return res;
    }
}
```

### 比较器

用户可以自定义比较方式

```java
// 使用匿名内部类简化代码
PriorityQueue<Freq> pq = new PriorityQueue<>(new Comparator<Freq>() {
    @Override
    public int compare(Freq a,Freq b) {
        return a.freq - b.freq;
    }
})；

// 变量补获
PriorityQueue<Integer> pq = new PriorityQueue<>(new Comparator<Freq>() {
    @Override
    public int compare(Integer a,Integer b) {
    	// 可以获取全局变量中不可变得值
        return map.get(a) - map.get(b);
    }
})；
// lamdar
PriorityQueue<Integer> pq = new PriorityQueue<>(
    (a,b) -> map.get(a) - map.get(b)
)；
```

### 线段树（区间树）Segment Tree

##### 为什么使用线段树？

实质：基于区间的统计查询

问题：区间染色问题

线段树是平衡二叉树

线段树不一定是完全二叉树，也不一定是满二叉树

对一颗树来说，最大的深度和最小的深度最大差距为1

![1551841744513](C:\Users\maxu1\Desktop\MX-Notes\notes\1551841744513.png)



![1551842995697](C:\Users\maxu1\Desktop\MX-Notes\notes\1551842995697.png)

```java
public interface Meger<E> {
    E merger(E a, E b);
}
public class SegmentTree<E>{
	private E[] data;
	private E[] tree;
	private Meger merger;

	public SegmentTree(E[] arr, Meger<E> merger) {
		this.merger = merger;
		data = (E[]) new Object[arr.length];
		for (int i = 0; i < arr.length; i++){
			data[i] = arr[i];
		}
		// 为线段树创建4n的空间
		tree = (E[]) new Object[4 * arr.length];
		buildSegmentTree(0, 0, data.length - 1);
	}

	private void buildSegmentTree(int treeIndex, int l, int r) {
		if (l == r) {
			tree[treeIndex] = data[l];
			return;
		}
		int leftTreeIndex = leftChild(treeIndex);
		int rightTreeIndex = rightChild(treeIndex);
		// 防止溢出
		int mid = l + (r - l) / 2;
		buildSegmentTree(leftTreeIndex, l, mid);
		buildSegmentTree(rightTreeIndex, mid + 1, r);
		//对节点进行业务的操作，具体实现需要传递一个
		tree[treeIndex] = (E) merger.merger(tree[leftTreeIndex], tree[rightTreeIndex]);
	}

	public int getSize() {
		return data.length;
	}

	public E get(int index) {
		return data[index];
	}
    
    public void set(int index, E e) {
        data[index] = e;
        set(0, 0, data.length - 1, index, e);
    }
    
    private void set(int treeIndex, int l, int r, int index, E e) {
        if(l == r) {
            tree[treeIndex] = e;
            return;
        }
        int mid = l + (r - l) / 2;
        int leftTreeIndex = leftChild(treeIndex);
        int rightTreeIndex = rightChild(treeIndex);
        if(index >= mid + 1) {
            set(rigTreeIndex, mid + 1, r,index, e);
        } else {
            set(leftTreeIndex, l, mid, index, e);
        }
        tree[treeIndex] = (E)merger.merger(tree[leftTreeIndex],tree[rightTreeIndex]);
    }

	// 返回完全二叉树的数组表示中，一个索引表示元素的左孩子节点的索引
	private int leftChild(int index) {
		return 2 * index + 1;
	}

	// 返回完全二叉树的数组表示中，一个索引表示元素的右孩子节点的索引
	private int rightChild(int index) {
		return 2 * index + 2;
	}

	// 查询[l,r]
	public E query(int ql, int qr) {
		if (ql > qr || ql < 0 || qr < 0 || qr > data.length || ql > data.length) {
			throw new IllegalArgumentException("index is error");
		}
		return query(0, 0, data.length - 1, ql, qr);
	}

	//  从[l,r]中查找[ql,qr]
	private E query(int treeIndex, int l, int r, int ql, int qr) {
		if (l == ql && r == qr) {
			return tree[treeIndex];
		}
		int mid = l + (r - l) / 2;
		int leftTreeIndex = leftChild(treeIndex);
		int rightTreeIndex = rightChild(treeIndex);
		if (ql >= mid + 1) {
			return query(rightTreeIndex, mid + 1, r, ql, qr);
		} else if (qr <= mid) {
			return query(leftTreeIndex, l, mid, ql, qr);
		}

		E leftResult = query(leftTreeIndex, l, mid, ql, mid);
		E rightResult = query(rightTreeIndex, mid + 1, r, mid + 1, qr);
		// 融合结果
		return (E) merger.merger(leftResult, rightResult);
	}
}
```

### Trie

![1551925152006](C:\Users\maxu1\Desktop\MX-Notes\notes\1551925152006.png)

```java
public class Trie {
    private class Node {
        // 判断是否是一个单词，我们不能只依靠叶子节点来判断是否结束
        boolean isWord;
        // 边与节点的映射
        Map<Character, Node> next;
        public Node(boolean isWord) {
            this.isWord = isWord;
            next = new TreeMap<>();
        }

        public Node() {
            this(false);
        }
    }
    private Node root;
    private int size;

    public Trie() {
        root = new Node();
        size = 0;
    }

    // 获取单词数量
    public int getSize() {
        return size;
    }

    // 向Trie中添加新的单词word
    public void add(String word) {
        Node cur = root;
        for (int i = 0; i < word.length(); i++) {
            char c = word.charAt(i);
            if (cur.next.get(c) == null) {
                cur.next.put(c, new Node());
            }
            cur = cur.next.get(c);
        }

        if (!cur.isWord) {
            cur.isWord = true;
            size++;
        }
    }

    public boolean constains(String word) {
        Node cur = root;
        for (int i = 0; i < word.length(); i++) {
            char c = word.charAt(i);
            if (cur.next.get(c) == null) {
                return false;
            }
            cur = cur.next.get(c);
        }
        // 返回这个单词是否包含
        return cur.isWord;
    }
    // 查询是否存在Trie中有单词以prefix为前缀

    public boolean isPrefix(String prefix) {
        Node cur = root;
        for (int i = 0; i < prefix.length(); i++) {
            char c = prefix.charAt(i);
            if (cur.next.get(c) == null) {
                return false;
            }
            cur = cur.next.get(c);
        }
        return true;
    } 
}

```

