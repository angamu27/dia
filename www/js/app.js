/* NOTE:
AUTOR: ANGAMU
FECHA DE MODIFICACION: 07/07/18
ARCHIVO JS APPMPLAY
 */

var $$ = Dom7;

 var app7 = new Framework7({
   // App root element
   root: '#app',
   // App Name
   name: 'DIA',
   // App id
   id: 'com.myapp.test',
   // Enable swipe panel
   /*panel: {
     swipe: 'left',
   },*/
   // Add default routes
   routes: routes,

   // ... other parameters
 });

var mainView = app7.views.create('.view-main');



var app = {

    username:"",
    password:"",

    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');


// NOTE: opcion para que se inicie sesion sola
/*
        console.log("Variable Autenticado:"+window.localStorage.getItem("autenticado"));

        if (window.localStorage.getItem("autenticado")=="true"){
          mainView.router.navigate('/home/',{animate:false});
        }*/
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {

    },

    LoginAccess: function(){
      mainView.router.navigate('/home/',{animate:true});
    },

    OlvideContrasena: function(){
      app7.dialog.alert('Debes ingresar a la pagina de DIA para recuperar tu contreseña');
    },

    loginClose:function (){
     app7.panel.close();
     app7.dialog.confirm('Desea cerrar sesión?', function (){

       mainView.router.navigate('/index/',{animate:true});
     })
   },




};


  function showMenu (){
    app7.panel.open('right' , true);
  };

  $$(document).on('page:init', '.page[data-name="home"]', function(e){
    console.log('View Home load Init!');
    app7.panel.allowOpen = true;
    app7.panel.enableSwipe('right');
  } );

  $$(document).on('page:init', '.page[data-name="login"]', function(e){
    console.log('View Home load Init!');
    app7.panel.allowOpen = false;
    app7.panel.disableSwipe('right');
  } );

  $$(document).on('page:init', '.page[data-name="resultados"]', function(e){
    console.log('View Home load Init!');
    app7.panel.allowOpen = true;
    app7.panel.enableSwipe('right');

    var calendarRange = app7.calendar.create({
  inputEl: '#demo-calendar-range',
  dateFormat: 'M dd yyyy',
  rangePicker: true
});
  } );
