// Sử dụng hàm arrow function va filter viết ham kiểm tra 1 số có phải là số nguyên tố hay không


const isPrime = (number) => {
    if (number <= 1) return false;
    for (let i = 2; i <= Math.sqrt(number); i++) {
        if (number % i === 0) return false;
    }
    return true;
}


const primeNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 67, 10].filter(isPrime);

console.log(primeNumbers);

