module.exports = (page, array, value) => {
  let option = ''
  if (page === 'edit') {
    if (array) {
      for (let i = 0; i < array.length; i++) {
        if (array[i].name === value) {
          option += `<option value="${array[i].name}" selected>${array[i].name}</option>`
        } else {
          option += `<option value="${array[i].name}">${array[i].name}</option>`
        }
      }
    }
  }

  if (page === 'index') {
    if (array) {
      for (let i = 0; i < array.length; i++) {
        if (String(array[i]._id) === value) {
          option += `<option value="${array[i]._id}" selected>${array[i].name}</option>`
        } else {
          option += `<option value="${array[i]._id}">${array[i].name}</option>`
        }
      }
    }
  }

  return option
}
