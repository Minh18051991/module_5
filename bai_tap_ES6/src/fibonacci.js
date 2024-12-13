// Bước 1: Khai báo hàm trả về số Fibonacci bằng cách sử dụng đệ quy
const fibonacci = (n) => {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
};

// Bước 2: Sử dụng vòng lặp để hiển thị các số Fibonacci
const displayFibonacci = (count) => {
    console.log(`Dãy ${count} số Fibonacci đầu tiên:`);
    for (let i = 0; i < count; i++) {
        console.log(fibonacci(i));
    }
};

// Bước 3 và 4: Tính tổng các số Fibonacci
const sumFibonacci = (count) => {
    let sum = 0;
    for (let i = 0; i < count; i++) {
        sum += fibonacci(i);
    }
    return sum;
};


// Hiển thị dãy số Fibonacci
displayFibonacci(20);

// Tính và hiển thị tổng
const total = sumFibonacci(20);
console.log(`Tổng của ${20} số Fibonacci đầu tiên: ${total}`);