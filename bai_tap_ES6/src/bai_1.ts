// happy coding 👻
console.log("hello world");

// Định nghĩa mảng courses
let courses = [
    {
        id: 1,
        title: "ReactJS Tutorial",
        rating: 4.2,
    },
    {
        id: 2,
        title: "Angular Tutorial",
        rating: 2.5,
    },
    {
        id: 3,
        title: "VueJS Tutorial",
        rating: 3.8,
    },
    {
        id: 4,
        title: "Java Tutorial",
        rating: 4,
    },
    {
        id: 5,
        title: "JavaScript Tutorial",
        rating: 3.5,
    },
];

const highRatedCourses = courses.filter((course) => course.rating >= 4);
console.log("Các khóa học có rating lớn hơn hoặc bằng 4:");
console.log(highRatedCourses);


const ratedSmallerThanFourCourses = courses
    .filter((course) => course.rating < 4)
    .map((course) => `<${course.id}> - <${course.title}> - <${course.rating}>`);

console.log("Các khóa học có rating nhỏ hơn 4:");
console.log(ratedSmallerThanFourCourses);

let addedCourses = [
    {
        id: 6,
        title: "PHP Tutorial",
        rating: 3,
    },
    {
        id: 7,
        title: "C# Tutorial",
        rating: 2,
    },
    {
        id: 8,
        title: "Docker Tutorial",
        rating: 3.8,
    }
];


const updatedCoures = [...courses,...addedCourses];
console.log("Các khóa học sau khi thêm mới:");
console.log(updatedCoures);

