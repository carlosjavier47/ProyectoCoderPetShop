function compra (productos){
    //Propiedades públicas
    this.productos = productos;
    this.obtenerProductos= function(contenido){
        //console.log('verifico que el local este con o sin elementos');
       
        this.productos=contenido;
       // console.log(this.productos);
    }

    this.guardarProductos= function(contenido){
        //console.log('guardo el producto, primero debo verificar si hay allgo o no en el local');
        if (this.productos.find(item => item.id ==contenido.id)==undefined) {
            this.productos.push(contenido);
            console.log(contenido);
            console.log(contenido.id);
            addLocalStorageList(contenido);
        } else {
            this.productos.forEach(function(item){
                if(item.id == contenido.id){
                    item.cantidad = item.cantidad+1;
                    chageCantidadLS(item.id,item.cantidad);
                }
              })
              
        }
    }
    this.eliminarProductos= function(contenido){
        //console.log('guardo el producto, primero debo verificar si hay allgo o no en el local');
        if (this.productos.find(item => item.id ==contenido.id)==undefined) {
            console.log('No se encuentra el producto');
        } else {
            this.productos = this.productos.filter(item=>item.id!=contenido.id); 
            eliminarProductoLS(contenido.id);
        }
        //console.log('eliminamos');
        //console.log(this.productos);
    }


}
//funciones de  LS
function getProductoList(){
    let productoLS;
       //console.log("paso por aqui");
    if (localStorage.getItem('productos') === null) {
        //console.log("esta vacio");
        productoLS=[];
    }else {
        productoLS = JSON.parse(localStorage.getItem('productos'));
        //console.log("NO esta vacio--"+JSON.stringify(productoLS));
    }
 
    return productoLS
 }
 
 function addLocalStorageList(productos){
   let productoLS;
   productoLS= getProductoList();
   //console.log('productos del LS--'+JSON.stringify(productoLS));
   //console.log('producto que entra--'+JSON.stringify(productos));
   //console.log("por que no dice que esta vacio");
   productoLS!=[] ? productoLS.push(productos):productoLS=productos;
   //console.log(productoLS);
    localStorage.setItem('productos', JSON.stringify(productoLS));
 }
 
 function eliminarProductoLS(id){
     //console.log(titulo, "titulo");
  let productoLS;
  productoLS= getProductoList();
  //console.log(productoLS);
  productoLS.forEach( function(element, index) {
      // statements
      
      //console.log(productoLS[0].titulo); 
      itemid=element.id?element.id:element[index].id;
      if (itemid === id) {
          productoLS.splice(index,1);
          //console.log(productoLS[index].titulo); 
          //console.log("y por que no elimino");
      }
  });
  //console.log(productoLS);
  localStorage.setItem('productos', JSON.stringify(productoLS));
 }
 
 function chageCantidadLS(id,cantidad){
    console.log('si  cambiando cantidad');
    let productoLS;
    productoLS= getProductoList();
    //console.log(JSON.stringify(productoLS));
    productoLS.forEach( function(productoLS, index) {
      //console.log(productoLS[1].titulo); 
      itemid=productoLS.id?productoLS.id:productoLS[index].id;
      if (itemid === id) {
          productoLS.cantidad= cantidad;
          //console.log(cantidad, "la cantidad");
          //console.log(productoLS[index].cantidad);
          //console.log("y por que no cambio");
      }
  });
  console.log(JSON.stringify(productoLS));
  localStorage.setItem('productos', JSON.stringify(productoLS));
 }

 function leerLocalStorage(){
	let productoLS;
    let carritoProdItem='';
    let total=0;
    const carritoProd = document.querySelector('.tablaProd');
	productoLS = getProductoList();
	productoLS.forEach( function(element, index) {
        
        subTotal=productoLS[index].precio*productoLS[index].cantidad;
        total=total+subTotal;
        carritoProdItem =carritoProdItem+`
        <tr class="infoProducto">
        <td scope="row"class="tituloProducto text-white">${productoLS[index].titulo}</td>
        <td scope="row"><button type="button" onclick="addCart(this)" class="btn btn-success ">Agregar</button></td>
        <td scope="row"><button type="button" onclick="deleteCart(this)" class="btn btn-danger ">Eliminar</button></td>
        <td scope="row"class="precioProducto text-white">${productoLS[index].precio}</td>
        <td scope="row"class="cantidadProducto text-white">${productoLS[index].cantidad}</td>
        <td scope="row">${subTotal}</td>
        <td scope="row" class='id'>${productoLS[index].id}</td>
       
        </tr>               
        `;
        
        });
        if (carritoProdItem=='') {
            carritoProdItem =carritoProdItem+`
                <tr>
                <td scope="row">No Hay productos seleccionados</td>
                <td scope="row"></td>
                <td scope="row"></td>
                <td scope="row"></td>
                <td scope="row"></td>
                <td scope="row">-</td>
                </tr>               
                `;
            const btncompra = document.getElementById('btnCompra');
            btncompra.disabled = true; 
        } else {
            console.log("no vacio");
        }
        carritoProdItem =carritoProdItem+`
        <tr>
        <td scope="row">TOTAL</td>
        <td scope="row">==</td>
        <td scope="row">==</td>
        <td scope="row">==</td>
        <td scope="row">==</td>
        <td scope="row">${total}</td>
        </tr>               
        `;
        carritoProd.innerHTML=carritoProdItem;
       
 }


function clearLocalStorage(){
   localStorage.clear(); 
}




let prod = [];
let carrito =new compra(prod);
productoLS=getProductoList();

document.querySelector('.tablaProd')!=null ? leerLocalStorage(): ""; 

if (productoLS!=null && productoLS!=[]) {
    carrito.obtenerProductos(productoLS);
}
let loginBtn=document.getElementById("loginBtn");
//con esta funcion agregamos elementos a la compra
function addCart(el){

    let infoProd=el.closest('.infoProducto');
    let nombreProd=infoProd.querySelector(".tituloProducto").innerText;
    let precioProd=infoProd.querySelector(".precioProducto").innerText.substr(0, infoProd.querySelector(".precioProducto").innerText.length - 1);
    let idProd=infoProd.querySelector(".id").innerText;
    let cantidadProd=infoProd.querySelector(".cantidadProducto")!=null? infoProd.querySelector(".cantidadProducto").innerText:1;
    //let idProd=$(el).data("id");
    let producto={
            id:idProd,
            titulo:nombreProd,
            precio:precioProd,
            cantidad:cantidadProd
        }
    carrito.guardarProductos(producto);
    document.querySelector('.tablaProd')!=null ? leerLocalStorage(): ""; 

}
function deleteCart(el){

    let infoProd=el.closest('.infoProducto');
    let nombreProd=infoProd.querySelector(".tituloProducto").innerText;
    let precioProd=infoProd.querySelector(".precioProducto").innerText.substr(0, infoProd.querySelector(".precioProducto").innerText.length - 1);
    let idProd=infoProd.querySelector(".id").innerText;
    let producto={
            id:idProd,
            titulo:nombreProd,
            precio:precioProd,
            cantidad:1
        }
    carrito.eliminarProductos(producto);
    document.querySelector('.tablaProd')!=null ? leerLocalStorage(): ""; 
}

let finalizarCompra=document.getElementById('btnCompra');

finalizarCompra.addEventListener('click',function(e){
    console.log('asd');
    let productoLS;
    productoLS = getProductoList();
    let btnMedioPago=document.getElementById('medioPago');
    let respuesta=document.getElementById('respuesta');
    console.log(btnMedioPago.value);
    if (btnMedioPago.value!=0) {
        document.getElementById('texto').innerHTML="Muchas gracias por realizar la compra, dirijase a la sucursal para hacer el retiro de su mercancia.";
        const btncompra = document.getElementById('btnCompra');
        btncompra.disabled = true; 
        clearLocalStorage();
        setTimeout( function() { window.location.href = "../index.html"; }, 8000 );
    } else {
        document.getElementById('texto').innerHTML="Seleccionar medio de pago para continuar";
    }

})
/**
 *  <option value="1">Paypal</option>
                            <option value="2">Visa - Credito</option>
                            <option value="3">Master - Credito</option>
                            <option value="4">Efectivo en la sucursal</option>
 * 
 */
/*
- agregar productos local   -LISTO
- modificar cantidad local  -LISTO
- eliminar producto local   -LISTO

- ver carrito                -LISTO
- agregar desded el carro    -LISTO
- eliminar desde el carro    -LISTO

- impactar cambios directo tabla -LISTO

- finalizar compra               -LISTO
- bloquear boton de compra si no hay productos - LISTO


-hacer json con los productos
-agregar los productos a traves de js


*/