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

    hostname:"http://dialab.com.mx",
    username:"",
    password:"",
    asunto:"",
    mensaje:"",
    paciente:"",
    fecha:"",

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

        console.log("Variable Autenticado:"+window.localStorage.getItem("autenticado"));

        if (window.localStorage.getItem("autenticado")=="true"){
        mainView.router.navigate('/home/',{animate:false});

      }

    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {

    },

    LoginAccess:function(){

    app.username = $$('#username').val();
    app.password = $$('#password').val();

 if (this.username ==""||this.password ==""){
      app7.dialog.alert('Debes de ingresar usuario y/o contaseña');
}
else {
  app7.preloader.show();

          app7.request({
              url: this.hostname+'/dia/api/login.php',
              //parametro
              data: {username: this.username, password: this.password},
              crossDomain: true,
              method: 'POST',
              success: function (data) {



                app7.preloader.hide();

                var objson = JSON.parse(data); //parseo


                if(objson.data =="Autenticado"){

                  window.localStorage.setItem("autenticado","true");
                  window.localStorage.setItem("username",app.username);
                  this.autenticado = window.localStorage.getItem("autenticado");
                  console.log(this.autenticado);
                  mainView.router.navigate('/home/',{animate:true});




                }
                else{
                  app7.dialog.alert("Usuario o password incorrecto");
                }
                console.log(objson.data);


              },
              error: function(error){
                app7.preloader.hide();
                app7.dialog.alert("Hubo un error por favor intenta de nuevo")
                console.log(data);
              }
            })
      }

    },

    OlvideContrasena: function(){
      app7.dialog.alert('Debes ingresar a la pagina de DIA para recuperar tu contreseña');
    },

    loginClose:function (){
     app7.panel.close();
     app7.dialog.confirm('Desea cerrar sesión?', function (){
       window.localStorage.setItem("autenticado","false");
       mainView.router.navigate('/index/',{animate:true});
     })
   },

   BuscarporFecha: function(){
     this.fecha = $$ ('#demo-calendar-range').val();
     if(this.fecha == ""){
       app7.dialog.alert('Debes llenar el campo');
     }else {
        buscarFecha();
     }
   },
   BuscarporNombre: function(){
     this.paciente = $$ ('#rpaciente').val();
     if(this.paciente == ""){
       app7.dialog.alert('Debes llenar el campo');
     }else {
       buscarNombre();
     }
   },
   RegistrarComentario: function(){

       this.asunto = $$('#asunto').val();
       this.mensaje = $$('#mensaje').val();

       if(this.asunto=="" || this.mensaje=="")
       {
         app7.dialog.alert('Debes llenar todos los campos');
       }

       else {
         app7.request({
     url: this.hostname+'/dia/api/contact.php',
     data:{asunto:this.asunto,mensaje:this.mensaje},
     method:'POST',
     crossDomain: true,

     success: function (data){
       app7.preloader.hide();

     },
     error:function(error){
       app7.preloader.hide();
       app7.dialog.alert("Hubo un error por favor intente nuevamente");
       console.log(data);
     }
   });

   app7.dialog.alert('Mensaje Registrado');
   mainView.router.navigate('/home/',{animate:true});

       }
     },







}; // COMBAK: FIN VAR APP // COMBAK: FIN VAR APP // COMBAK: FIN VAR APP // COMBAK: FIN VAR APP // COMBAK: FIN VAR APP






  function showMenu (){
    app7.panel.open('right' , true);
  };

  $$(document).on('page:init', '.page[data-name="home"]', function(e){
    console.log('View Home load Init!');
    app7.panel.allowOpen = true;
    app7.panel.enableSwipe('right');

    getEstudios();
    getInfo();
    bienvenida();

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
  dateFormat: 'yyyy/mm/dd',
  rangePicker: true
});
  } );

  $$(document).on('page:init', '.page[data-name="resultados_nombre"]', function(e){
    console.log('View Home load Init!');
    app7.panel.allowOpen = true;
    app7.panel.enableSwipe('right');

    buscarNombre(app.paciente);

  } );

  $$(document).on('page:init', '.page[data-name="resultados_fecha"]', function(e){
    console.log('View Home load Init!');
    app7.panel.allowOpen = true;
    app7.panel.enableSwipe('right');

    buscarFecha(app.fecha);

  } );

  $$(document).on('page:init', '.page[data-name="configuracion_general"]', function(e){
    console.log('View Home load Init!');
    app7.panel.allowOpen = true;
    app7.panel.enableSwipe('right');


  } );

  $$(document).on('page:init', '.page[data-name="resultados_view"]', function(e){
    console.log('View Home load Init!');
    app7.panel.allowOpen = true;
    app7.panel.enableSwipe('right');

    ViewEstudios();

  } );


  function getEstudios(){

    app7.request({
    url: app.hostname+'/dia/api/estudios.php',

    method:'GET',
    crossDomain: true,
    success:function(data){
      app7.preloader.hide();

      var objson = JSON.parse(data);

      for(x in objson.data){

        $$('#estudios-home').append('<li><a href="/resultados_view/" class="item-link item-content"><div class="item-media"><i class="f7-icons" style="font-size: 40px;">info</i></div><div class="item-inner"><div class="item-title"><div class="item-header texto">'+objson.data[x].numero_estudio+'</div>'+objson.data[x].paciente+'<div class="item-footer texto">'+objson.data[x].fecha+'</div></div><div class="item-after texto">Ver</div></div></a></li>');
      }

    },
    error:function(error){
      app7.preloader.hide();
      app7.dialog.alert("Hubo un error por favor intente nuevamente");
      console.log(data);

  }
  });
  }


  function ViewEstudios(){

    app7.request({
    url: app.hostname+'/dia/api/estudios.php',

    method:'GET',
    crossDomain: true,
    success:function(data){
      app7.preloader.hide();

      var objson = JSON.parse(data);

      for(x in objson.data){
        $$('#view-resultados-nombre').append('<span>'+objson.data[x].paciente+'</span>');
      }

      for(x in objson.data){
        $$('#view-resultados-general').append('<div class="vresultados nombre texto"> <div class="titulos"> No. Estudio </div> <div class="campos"> '+objson.data[x].numero_estudio+' </div>   </div><div class="vresultados nombre texto"><div class="titulos"> Nombre </div> <div class="campos"> '+objson.data[x].paciente+'</div>  </div><div class="vresultados fecha texto"> <div class="titulos"> Fecha </div>  <div class="campos"> '+objson.data[x].fecha+' </div> </div><div class="vresultados sexo texto"> <div class="titulos"> Sexo </div>  <div class="campos"> '+objson.data[x].sexo+' </div>  </div><div class="vresultados edad texto"> <div class="titulos"> Edad </div> <div class="campos"> '+objson.data[x].edad+' años </div>   </div>');
      }

      for(x in objson.data){
        $$('#view-resultados-datosclinicos').append('<div class="campos"> '+objson.data[x].datos_clinicos+'  </div>');
      }

      for(x in objson.data){
        $$('#view-resultados-diagnosticoclinico').append('<div class="campos"> '+objson.data[x].diagnostico_clinico+'  </div>');
      }

      for(x in objson.data){
        $$('#view-resultados-tipodemuestra').append('<div class="campos"> '+objson.data[x].tipo_muestra+'  </div>');
      }

      for(x in objson.data){
        $$('#view-resultados-hallazgos').append('<div class="campos">   <textarea>  '+objson.data[x].hallazgos+'</textarea>  </div>');
      }

      for(x in objson.data){
        $$('#view-resultados-calidaddelamuestra').append('<div class="campos"> '+objson.data[x].calidad_muestra+'  </div>');
      }

      for(x in objson.data){
        $$('#view-resultados-interpretacion').append('<div class="campos">   <textarea>  '+objson.data[x].interpretacion+'</textarea>     </div>');
      }







    },
    error:function(error){
      app7.preloader.hide();
      app7.dialog.alert("Hubo un error por favor intente nuevamente");
      console.log(data);

  }
  });
  }


  function getInfo(){



    app7. preloader.show();
    var usuario = window.localStorage.getItem("username");

    app7.request({
    url: app.hostname+'/dia/api/encabezado.php',
    data: {usuario: usuario},
    method:'GET',
    crossDomain: true,
    success:function(data){
      app7.preloader.hide();

      var objson = JSON.parse(data);



      for(x in objson.data){

        $$('#home-info').html('<div class="home info texto" style="margin-top:20px;">'+objson.data[x].nombre+' '+objson.data[x].apellidos+'</div><div class="home info texto">'+objson.data[x].correo+'</div><div class="home info texto">'+objson.data[x].celular+'</div>');
      }

    },
    error:function(error){
      app7.preloader.hide();
      app7.dialog.alert("Hubo un error por favor intente nuevamente");
      console.log(data);

  }
  });
  }


  function buscarNombre(){

  var buscar = app.paciente;

  $$('#resultados-nombre').html("");

  app7. preloader.show();

  app7.request({
  url: app.hostname+'/dia/api/buscar_nombre.php?buscar='+buscar,

  method:'GET',
  crossDomain: true,
  success:function(data){
    app7.preloader.hide();

    var objson = JSON.parse(data);

    if(objson.data== "No existe")
    {   app7.dialog.alert('No hay coincidencias');

    }else {

      mainView.router.navigate('/resultados_nombre/',{animate:true});
      $$('#busqueda').append(' "'+buscar+'" ');

    for(x in objson.data){
      console.log(objson.data[x].titulo);

      estudio= '<li><a href="/resultados_view/" class="item-link item-content"><div class="item-media"><i class="f7-icons"  style="font-size: 40px;">info</i></div><div class="item-inner"><div class="item-title"><div class="item-header texto">'+objson.data[x].numero_estudio+'</div>'+objson.data[x].paciente+'<div class="item-footer texto">'+objson.data[x].fecha+'</div></div><div class="item-after texto">Ver</div></div></a></li>';

      $$('#resultados-nombre').append(estudio);
    }}

  },
  error:function(error){
    app7.preloader.hide();
    app7.dialog.alert("Hubo un error por favor intente nuevamente");
    console.log(data);

}
});
}

function buscarFecha(){

var buscartitulo = app.fecha;
var buscar = app.fecha;
buscar = buscar.replace("-", "AND");
buscar = buscar.replace("/", "-");
buscar = buscar.replace("/", "-");
buscar = buscar.replace("/", "-");
buscar = buscar.replace("/", "-");

$$('#resultados_fecha').html("");

app7. preloader.show();

app7.request({
url: app.hostname+'/dia/api/buscar_fecha.php?buscar='+buscar,

method:'GET',
crossDomain: true,
success:function(data){
  app7.preloader.hide();
  var objson = JSON.parse(data);
  if(objson.data== "No existe")
  {   app7.dialog.alert('No hay coincidencias');

  }else {

    mainView.router.navigate('/resultados_fecha/',{animate:true});
    $$('#busqueda-fecha').append(' "'+buscartitulo+'" ');

  for(x in objson.data){

    estudio= '<li><a href="/resultados_view/" class="item-link item-content"><div class="item-media"><i class="f7-icons"  style="font-size: 40px;">info</i></div><div class="item-inner"><div class="item-title"><div class="item-header texto">'+objson.data[x].numero_estudio+'</div>'+objson.data[x].paciente+'<div class="item-footer texto">'+objson.data[x].fecha+'</div></div><div class="item-after texto">Ver</div></div></a></li>';

    $$('#resultados-fecha').append(estudio);
  }}

},
error:function(error){
  app7.preloader.hide();
  app7.dialog.alert("Hubo un error por favor intente nuevamente");
  console.log(data);

}
});
}




function getviewEstudios(){

  app7.request({
  url: app.hostname+'/dia/api/estudios.php',

  method:'GET',
  crossDomain: true,
  success:function(data){
    app7.preloader.hide();

    var objson = JSON.parse(data);

    for(x in objson.data){

      $$('#estudios-home').append('<li><a href="/resultados_view/" class="item-link item-content"><div class="item-media"><i class="f7-icons"  style="font-size: 40px;">info</i></div><div class="item-inner"><div class="item-title"><div class="item-header texto">'+objson.data[x].tipo+'</div>'+objson.data[x].paciente+'<div class="item-footer texto">'+objson.data[x].fecha+'</div></div><div class="item-after texto">Ver</div></div></a></li>');
    }

  },
  error:function(error){
    app7.preloader.hide();
    app7.dialog.alert("Hubo un error por favor intente nuevamente");
    console.log(data);

}
});
}

function bienvenida(){
  app7. preloader.show();
  var usuario = window.localStorage.getItem("username");
  app7.request({
  url: app.hostname+'/dia/api/encabezado.php',
  data: {usuario: usuario},
  method:'GET',
  crossDomain: true,
  success:function(data){
  app7.preloader.hide();
    var objson = JSON.parse(data);
    for(x in objson.data){
      $$('#bienvenida').html('<span> Hola '+objson.data[x].nombre+' </span>');
    }
  },
  error:function(error){
    app7.preloader.hide();
    app7.dialog.alert("Hubo un error por favor intente nuevamente");
    console.log(data);
}
});
}
