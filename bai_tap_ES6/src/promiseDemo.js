// Hàm mô phỏng một tác vụ bất đồng bộ
function simulateAsyncTask(success, delay) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (success) {
                resolve("Tác vụ hoàn thành thành công!");
            } else {
                reject("Tác vụ thất bại!");
            }
        }, delay);
    });
}

// Demo 1: Promise cơ bản
console.log("Demo 1: Promise cơ bản");
simulateAsyncTask(true, 2000)
    .then(result => console.log(result))
    .catch(error => console.error(error));

// Demo 2: Chuỗi Promise
console.log("\nDemo 2: Chuỗi Promise");
simulateAsyncTask(true, 1000)
    .then(result => {
        console.log(result);
        return simulateAsyncTask(true, 1000);
    })
    .then(result => {
        console.log(result);
        return "Tất cả các tác vụ đã hoàn thành!";
    })
    .then(finalResult => console.log(finalResult))
    .catch(error => console.error(error));

// Demo 3: Promise.all
console.log("\nDemo 3: Promise.all");
const promise1 = simulateAsyncTask(true, 1000);
const promise2 = simulateAsyncTask(true, 2000);
const promise3 = simulateAsyncTask(true, 1500);

Promise.all([promise1, promise2, promise3])
    .then(results => console.log("Tất cả các promise đã hoàn thành:", results))
    .catch(error => console.error("Một trong các promise đã thất bại:", error));

// Demo 4: Promise.race
console.log("\nDemo 4: Promise.race");
Promise.race([
    simulateAsyncTask(true, 1000),
    simulateAsyncTask(true, 2000),
    simulateAsyncTask(true, 1500)
])
    .then(result => console.log("Promise đầu tiên hoàn thành:", result))
    .catch(error => console.error("Promise đầu tiên thất bại:", error));

// Demo 5: Xử lý lỗi
console.log("\nDemo 5: Xử lý lỗi");
simulateAsyncTask(false, 1000)
    .then(result => console.log(result))
    .catch(error => console.error("Đã xảy ra lỗi:", error));

// Demo 6: async/await
console.log("\nDemo 6: async/await");
async function runAsyncTasks() {
    try {
        const result1 = await simulateAsyncTask(true, 1000);
        console.log(result1);
        const result2 = await simulateAsyncTask(true, 1000);
        console.log(result2);
        return "Tất cả các tác vụ async/await đã hoàn thành!";
    } catch (error) {
        console.error("Lỗi trong async/await:", error);
    }
}

runAsyncTasks().then(finalResult => console.log(finalResult));