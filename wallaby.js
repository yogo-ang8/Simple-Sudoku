

module.exports = function (w) {

    return {
      trace: true,
      files: [
        'events/**/*.json',
        'src/**/*.ts'
      ],
  
      tests: [
        '__tests__/**/*Spec.ts'
      ]
    };
  };