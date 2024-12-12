import { person } from './person.js';
import { student, formatStudent } from './student.js';
import { displayNameAndDegree } from './display.js';

const formattedStudent = formatStudent(student);
console.log(formattedStudent);

console.log("\nThông tin học viên (student):");
displayNameAndDegree(student);

console.log("\nThông tin person:");
displayNameAndDegree(person);