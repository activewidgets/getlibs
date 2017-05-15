
import {Component} from '@angular/core';

export class AppComponent {
	constructor(){
		this.msg = 'Hello World!';
	}
}

AppComponent.annotations = [new Component({
	selector: '#app',
	template: '<h1>{{msg}}</h1>'
})];
