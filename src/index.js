import './module';
import './scss/index.scss'
console.log(4);

if (module.hot) {
  module.hot.accept('./module.js', function() {
    console.log('Accepting the updated printMe module!');
  })
}


