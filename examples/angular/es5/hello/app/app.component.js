
var Component = require('@angular/core').Component;

function AppComponent(){
	this.msg = 'Hello World!';
}

AppComponent.annotations = [new Component({
	selector: '#app',
	templateUrl: './app.component.html'
})];

exports.AppComponent = AppComponent;