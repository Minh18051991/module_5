// Hàm tính tổng sử dụng rest parameter
// function sum(...numbers) {
//     return numbers.reduce((total, num) => total + num, 0);
// }


// Hàm tìm giá trị lớn nhất sử dụng rest parameter
function findMax(...numbers) {
    return Math.max(...numbers);
}

// Hàm kết hợp các mảng sử dụng rest parameter
function combineArrays(array1, array2, ...otherArrays) {
    return [...array1, ...array2, ...otherArrays.flat()];
}

// Demo sử dụng các hàm
console.log("Tổng của 1, 2, 3, 4, 5:", sum1(1, 2, 3, 4, 5));
console.log("Giá trị lớn nhất trong 10, 5, 30, 15, 25:", findMax(10, 5, 30, 15, 25));

const fruits = ['apple', 'banana'];
const vegetables = ['carrot', 'tomato'];
const dairy = ['milk', 'cheese'];
const meat = ['chicken', 'beef'];

console.log("Kết hợp các mảng thực phẩm:", 
    combineArrays(fruits, vegetables, dairy, meat)
);

// Sử dụng rest trong destructuring
const [first, second, ...rest] = [1, 2, 3, 4, 5];
console.log("First:", first);
console.log("Second:", second);
console.log("Rest:", rest);

// Hàm log thông tin người dùng với các trường tùy chọn
function logUserInfo(name, email, ...otherInfo) {
    console.log(`Tên: ${name}`);
    console.log(`Email: ${email}`);
    if (otherInfo.length > 0) {
        console.log("Thông tin khác:");
        otherInfo.forEach((info, index) => {
            console.log(`  ${index + 1}. ${info}`);
        });
    }
}

logUserInfo("John Doe", "john@example.com", "30 tuổi", "Lập trình viên", "Thích đọc sách");

function sum1(...numbers) {
    return numbers.reduce((total, num) => total + num, 0);
}
let arr = [123, 2, 33, 24, 65];
console.log("ket qua", sum1(...arr))

