

module.exports = function (w) {

    return {
      files: [
        'events/**/*.json',
        'src/**/*.ts'
      ],
      tests: [
        '__tests__/**/*spec.ts'
      ],
      env:{
        type:'node'
      },
      compiler:{
        'src/**/*.ts?(x)': w.compilers.typeScript({ module: 'commonjs' })
      }
    };
  };