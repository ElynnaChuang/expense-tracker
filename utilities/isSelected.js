module.exports = (array, value) => {
  let option = ''
  if (array) {
    for (let i = 0; i < array.length; i++) {
      if (array[i].name === value) {
        option += `<option value="${array[i].name}" selected>${array[i].name}</option>`
      } else {
        option += `<option value="${array[i].name}">${array[i].name}</option>`
      }
    }
    return option
  }
}