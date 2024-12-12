import { person } from './person.js';

export const student = {
    firstName: person.firstName,
    gender: person.gender,
    degree: person.education.degree,
    languages: person.languages
};

export function formatStudent(student) {
    const {firstName, gender, degree, languages} = student;
    const formattedLanguages = languages.join(', ');
    return `Name: ${firstName}
Gender: ${gender}
Degree: ${degree}
Languages: ${formattedLanguages}`;
}