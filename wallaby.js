

module.exports = function (w) {

    return {
      trace: true,
      files: [
        'events/*.json',
        'src/**/*.ts',
        'src/**/*.tsx',
        'src/api/*.json'
      ],
      tests: [
        'test/**/*.spec.ts'
      ],
      env:{
        type:'node'
      },
      compiler:{
        'src/**/*.ts?(x)': w.compilers.typeScript({ module: 'commonjs' })
      }
    };
  };