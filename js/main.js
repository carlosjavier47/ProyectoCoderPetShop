function compra (productos){
    //Propiedades públicas
    this.productos = productos;
    this.obtenerProductos= function(contenido){
        //verifico que el local este con o sin elementos
        this.productos=contenido;
    }

    this.guardarProductos= function(contenido){
        //guardo el producto, primero debo verificar si hay allgo o no en el local
        if (this.productos.find(item => item.id ==contenido.id)==undefined) {
            this.productos.push(contenido);
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
        if (this.productos.find(item => item.id ==contenido.id)==undefined) {
           
        } else {
            this.productos = this.productos.filter(item=>item.id!=contenido.id); 
            eliminarProductoLS(contenido.id);
        }
    }


}
//funciones de  LS
function getProductoList(){
    let productoLS;
    if (localStorage.getItem('productos') === null) {
        productoLS=[];
    }else {
        productoLS = JSON.parse(localStorage.getItem('productos'));
    }
 
    return productoLS
 }
 
 function addLocalStorageList(productos){
   let productoLS;
   productoLS= getProductoList();
   productoLS!=[] ? productoLS.push(productos):productoLS=productos;
    localStorage.setItem('productos', JSON.stringify(productoLS));
 }
 
 function eliminarProductoLS(id){
  let productoLS;
  productoLS= getProductoList();
  productoLS.forEach( function(element, index) {
      itemid=element.id?element.id:element[index].id;
      if (itemid === id) {
          productoLS.splice(index,1);
      }
  });
  localStorage.setItem('productos', JSON.stringify(productoLS));
 }
 
 function chageCantidadLS(id,cantidad){

    let productoLS;
    productoLS= getProductoList();
    productoLS.forEach( function(productoLS, index) {
      itemid=productoLS.id?productoLS.id:productoLS[index].id;
      if (itemid === id) {
          productoLS.cantidad= cantidad;
      }
  });

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

// toast de sweetalert
const Toast = Swal.mixin({
    toast: true,
    position: 'bottom',
    showConfirmButton: false,
    timer: 1500
  });
  const Toast2 = Swal.mixin({
    toast: false,
    position: 'center',
    showConfirmButton: false,
    timer: 1500
  });


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
    let producto={
            id:idProd,
            titulo:nombreProd,
            precio:precioProd,
            cantidad:cantidadProd
        }
    carrito.guardarProductos(producto);
    document.querySelector('.tablaProd')!=null ? leerLocalStorage(): ""; 
    Toast.fire({
        icon: 'success',
        title: 'El producto fue agregado al carrito'
      })

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
    Toast.fire({
        icon: 'error',
        title: 'El producto fue eliminado del carrito'
      })

}

let finalizarCompra=document.getElementById('btnCompra');

if (finalizarCompra!=null) {
    finalizarCompra.addEventListener('click',function(e){
  
        let productoLS;
        productoLS = getProductoList();
        let btnMedioPago=document.getElementById('medioPago');
        let respuesta=document.getElementById('respuesta');
        if (btnMedioPago.value!=0) {
            document.getElementById('texto').innerHTML="Muchas gracias por realizar la compra, dirijase a la sucursal para hacer el retiro de su mercancia.";
            const btncompra = document.getElementById('btnCompra');
            btncompra.disabled = true; 
            clearLocalStorage();
            setTimeout( function() { window.location.href = "../index.html"; }, 8000 );
            Toast2.fire({
                icon: 'success',
                title: 'Su compra fue satisfactoria.'
              })
        } else {
            document.getElementById('texto').innerHTML="Seleccionar medio de pago para continuar";
        }
    
    })
} 

const CargarProd = async ()=>{
    const resp = await fetch('../js/data.js')
    const data = await resp.json();
    let productosHtml="";
    data.forEach(producto => {
        productosHtml+=`
    <div class="producto">
        <img class="imgProducto" src="${producto.imagen}" alt="${producto.nombre}" style="width: 200px; height: 200px;">
        <div class="infoProducto">
            <h4 class="tituloProducto">${producto.nombre}</h4>
            <h6 class="precioProducto">${producto.precio}$</h6>
            <p class="id">${producto.id}</p> 
            <button type="button" onclick="addCart(this)" class="btn btn-outline-success botonProducto">Agregar</button>
        </div>
    </div>
    `;
    })
    document.getElementById('seccionResultadosBusquedaProd').innerHTML=productosHtml;
}

if (document.getElementById('seccionResultadosBusquedaProd')!=null) {
    CargarProd();
} 

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