export function displayNameAndDegree(obj) {
    const { firstName = "Quân", degree: directDegree, education = {} } = obj;
    const { degree: educationDegree = "NA" } = education;
    
    const finalDegree = directDegree || educationDegree;
    
    console.log(`Họ tên: ${firstName}`);
    console.log(`Học vị: ${finalDegree}`);
}