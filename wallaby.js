

module.exports = function (w) {

    return {
      files: [
        'events/*.json',
        'src/**/*.ts',
        'src/api/*.json'
      ],
      tests: [
        'test/unit/**/*.spec.ts'
      ],
      env:{
        type:'node'
      },
      compiler:{
        'src/**/*.ts?(x)': w.compilers.typeScript({ module: 'commonjs' })
      }
    };
  };