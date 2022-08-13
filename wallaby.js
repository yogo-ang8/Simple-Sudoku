

module.exports = function (w) {

    return {
      files: [
        'events/**/*.json',
        'src/**/*.ts'
      ],
  
      tests: [
        '__tests__/**/*Spec.ts'
      ]
    };
  };