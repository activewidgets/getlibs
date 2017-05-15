
import {Component} from '@angular/core';

@Component({
	selector: '#app',
	template: '<h1>{{msg}}</h1>'
})

export class AppComponent {
	msg = 'Hello World!';
}
