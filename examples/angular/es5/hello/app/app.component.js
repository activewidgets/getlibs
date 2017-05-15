
var Component = require('@angular/core').Component;

function AppComponent(){
	this.msg = 'Hello World!';
}

AppComponent.annotations = [new Component({
	selector: '#app',
	template: '<h1>{{msg}}</h1>'
})];

exports.AppComponent = AppComponent;