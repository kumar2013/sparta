function convertToArray(values) {
  var result = [];
    
  values.forEach(function(value) {
    result.push(value.dataValues);
  });
  
  return result;
}


module.exports = {
  convertToArray: convertToArray
};