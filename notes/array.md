### 手写Array

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