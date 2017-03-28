var comprasBD;
var myScroll;
$( document ).ready(function(){
  loaded();
   $(".button-collapse").sideNav();
   crearBaseDato();
});
function loaded(){
  myScroll = new IScroll('#listado');}
// function loaded(){
//   myScroll = new IScroll('#listado', {
// 		scrollbars: true,
// 		mouseWheel: true,
// 		interactiveScrollbars: true,
// 		shrinkScrollbars: 'scale',
// 		fadeScrollbars: true
// 	});
// }
//
// document.addEventListener('touchmove', function (e) { e.preventDefault(); }, isPassive() ? {
// 	capture: false,
// 	passive: false
// } : false);

function menu(opcion){
  if (opcion === 1){
    $.ajax({
      type: 'get',
      url: "comprar.html",
      success: function(resultado) {
          $('#contenido').html(resultado);
          $('#menu').addClass('leftTotal').removeClass('center');
          $('#contenido').addClass('center').removeClass('rightTotal');
          consultaProductos();
      },
      error: function(jqXHR, textStatus, errorThrown) {
          alert("Error detectado: " + textStatus + "\nExcepcion: " + errorThrown);
      }
    });

  }
  if (opcion === 2){
    $.ajax({
      type: 'get',
      url: "articulos.html",
      success: function(resultado) {
          $('#contenido').html(resultado);
          $('#menu').addClass('leftTotal').removeClass('center');
          $('#contenido').addClass('center').removeClass('rightTotal');
      },
      error: function(jqXHR, textStatus, errorThrown) {
          alert("Error detectado: " + textStatus + "\nExcepcion: " + errorThrown);
      }
    });

  }
  if (opcion === 3){
    $.ajax({
      type: 'get',
      url: "comprar.html",
      success: function(resultado) {
          $('#contenido').html(resultado);
          $('#menu').addClass('leftTotal').removeClass('center');
          $('#contenido').addClass('center').removeClass('rightTotal');
      },
      error: function(jqXHR, textStatus, errorThrown) {
          alert("Error detectado: " + textStatus + "\nExcepcion: " + errorThrown);
      }
    });

  }
}
async function crearBaseDato() {
  try {
    var result = await CrearBD();
  } catch (err) {
    alert("Error detectado: " + err);
  }
}
function CrearBD(){
  comprasBD = window.openDatabase('CromprasBD', '1.0', 'Base de datos de lista de compras', 1024 * 1024, function(comprasBD) {});
    comprasBD.transaction(function (tx) {
          tx.executeSql('CREATE TABLE IF NOT EXISTS Productos (id INTEGER PRIMARY KEY ASC AUTOINCREMENT, producto TEXT, tienda TEXT, estado BOOLEAN)');
      });
}
async function agregarProducto(articulo, tienda) {
  try {
    var result = await agregaProducto(articulo, tienda);
  } catch (err) {
    alert("Error detectado: " + err);
  }
}
function agregaProducto(articulo, tienda){
  comprasBD.transaction(function (tx) {
      tx.executeSql('INSERT INTO Productos (producto, tienda, estado) VALUES("'+articulo+'","'+tienda+'", "true")');
    });
    alert("Árticulo agregado");
}

async function consultaProductos() {
  try {
    var result = await consultaProd();
  } catch (err) {
    alert("Error detectado: " + err);
  }
}
function consultaProd(){
  comprasBD.transaction(function (tx) {
        tx.executeSql('SELECT * FROM Productos',[], mostrarElementos);
    });

}
function mostrarElementos(transaction, results) {

    var i;
    for (i = 0; i < results.rows.length; i++) {
        var row = results.rows.item(i);
        $("#lista-productos").append("<tr><td>"+row.producto+"</td><td>"
          +row.tienda+"</td><td>"
          +row.estado+"</td></tr>");
    }
}
function volver(){
  $('#principal').addClass('center').removeClass('rightTotal');
  $('#contenido').addClass('rightTotal').removeClass('center');
}
function mostarMenu(){
  $('#principal').addClass('rightTotal').removeClass('center');
  $('#menu').addClass('center').removeClass('leftTotal');
}
function enviar(){
  articulo = $('input:text[name="articulo"]').val();
  tienda = $('input:text[name=tienda]').val();
  agregarProducto(articulo, tienda)
}
