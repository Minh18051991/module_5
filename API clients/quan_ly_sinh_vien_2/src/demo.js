

function commonCharacterCount(s1, s2) {
  // Tạo object chứa tần số của mỗi kí tự trong s1
  const charCount1 = {};
  for (let char of s1) {
    charCount1[char] = (charCount1[char] || 0) + 1;
  }


  let commonCount = 0;
  for (let char of s2) {
    if (charCount1[char]) {
      commonCount++;
      charCount1[char]--; // Bỏ đi 1 kí tự đã đoán đúng
    }
  }

  return commonCount;
}

console.log(commonCharacterCount("aabcc", "adcaa"));