
var NgModule = require('@angular/core').NgModule,
	BrowserModule = require('@angular/platform-browser').BrowserModule,
	AppComponent = require('./app.component').AppComponent;


function AppModule(){}

AppModule.annotations = [new NgModule({
	imports: [BrowserModule],
	declarations: [AppComponent],
	bootstrap: [AppComponent]
})];

exports.AppModule = AppModule;