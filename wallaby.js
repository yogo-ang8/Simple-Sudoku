

module.exports = function (w) {

    return {
      files: [
        'events/**/*.json',
        'src/**/*.ts'
      ],
      tests: [
        'test/**/*spec.ts'
      ],
      env:{
        type:'node'
      },
      compiler:{
        'src/**/*.ts?(x)': w.compilers.typeScript({ module: 'commonjs' })
      }
    };
  };