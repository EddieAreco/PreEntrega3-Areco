// CREACION DEL H1

let bienvenida = document.createElement("h1");
bienvenida.innerHTML = "¡Bienvenido!";
bienvenida.className = "h1";
document.body.append(bienvenida);

let usuario;
let usuarioStorage = sessionStorage.getItem("usuario");

// CREACION DEL BOTON INICIAR SESION
let iniciarSesion = document.createElement("button");
iniciarSesion.innerHTML = "Iniciar sesion";
iniciarSesion.className = "inputSesion";
document.body.appendChild(iniciarSesion);

//GENERO UNA CONDICION DE QUE SI HAY UN USUARIO ACTIVO, NO PUEDA INICIAR SESION Y SI INICIA SESION, APAREZCA EL NOMBRE DEL USUARIO EN EL H1
iniciarSesion.onclick = () => {
    if (!usuario == "" || !usuario == undefined) {
        alert("Ya hay un usuario activo, primero cierre sesión antes de iniciar una nueva");
    } else {
        usuario = prompt("Ingrese sesión");
        bienvenida.innerHTML = "¡Bienvenid@ " + usuario + "!";
        sessionStorage.setItem("usuario", usuario);
        document.body.className = "fondoActivo";
    }
}

// CREACION DEL BOTON CERRAR SESION
let cerrarSesion = document.createElement("button");
cerrarSesion.innerHTML = "Cerrar sesion";
cerrarSesion.className = "inputSesion";
document.body.appendChild(cerrarSesion);

cerrarSesion.onclick = () => {
    sessionStorage.clear();
    alert("Sesión cerrada");
    usuario = "";
    bienvenida.innerHTML = "¡Bienvenido" + usuario + "!";
    document.body.className = "fondoCerrarSesion";
}

// CREACION DEL BOTON USUARIO PARA QUE SE PUEDA VER CUAL ES EL USUARIO QUE ESTA ACTIVO
let usuarioActivo = document.createElement("button");
usuarioActivo.innerHTML = "Usuario activo";
usuarioActivo.className = "inputSesion";
document.body.appendChild(usuarioActivo);

usuarioActivo.onclick = () => {
    if (usuario === undefined) {
        usuario = "";
        alert(`No hay un usuario activo`);
    } else {
        usuarioActivo = usuario;
        alert(`El usuario activo es: ${usuario}`);
    }
}

// CREACION DEL FORMULARIO
let formulario = document.createElement("form");
formulario.textContent = "Formulario de suscripción";
formulario.className = "formulario";
document.body.append(formulario);

// CREACION DE LOS INPUTS
let inputNombre = document.createElement("input");
inputNombre.type = "text";
inputNombre.placeholder = "Nombre";
inputNombre.className = "input";
document.body.appendChild(inputNombre);

let inputApellido = document.createElement("input");
inputApellido.type = "text";
inputApellido.placeholder = "Apellido";
inputApellido.className = "input";
document.body.appendChild(inputApellido);

let inputEdad = document.createElement("input");
inputEdad.type = "number";
inputEdad.placeholder = "Edad";
inputEdad.className = "input";
document.body.appendChild(inputEdad);

// GENERO UNA CONDICION PARA QUE SI LA EDAD LLEGA A LOS 18 AÑOS, EL INPUT SE PONGA EN VERDE DANDO LA INTERPRETACION DE QUE LA EDAD ESTA BIEN AL SER MAYOR DE EDAD
inputEdad.addEventListener("input", () => {

    const edad = Number(inputEdad.value);

    if (edad >= 18) {
        inputEdad.className = "verde";
    } else {
        inputEdad.className = "blanco";
    }

})

let inputEmail = document.createElement("input");
inputEmail.type = "email";
inputEmail.placeholder = "Email";
inputEmail.className = "input";
document.body.appendChild(inputEmail);

// GENERO UNA CONDICION PARA QUE SI EL EMAIL CONTIENE UN @ Y UN ., EL INPUT SE PONGA EN VERDE DANDO LA INTERPRETACION DE QUE EL EMAIL ESTA BIEN
inputEmail.addEventListener("input", () => {

    if (inputEmail.value.includes("@") && inputEmail.value.includes(".")) {
        inputEmail.className = "verde";
    } else {
        inputEmail.className = "blanco";
    }

})

let inputEnviar = document.createElement("input");
inputEnviar.type = "submit";
inputEnviar.value = "Enviar";
inputEnviar.className = "input";
document.body.appendChild(inputEnviar);


//GENERO EL EVENTO PARA QUE ANTES DE QUE EL FORMULARIO SE ENVIE, VALIDE SI LA EDAD ESTA BIEN, SI TODOS LOS CAMPOS SE LLENARON Y SI EL MAIL CONTIENE CARACTERES DE @ Y DE UN .
inputEnviar.addEventListener("click", (e) => {
    e.preventDefault(); // Esto evita que el formulario se recargue

    if (inputEdad.value === "" || inputApellido.value === "" || inputNombre.value === "") {

        alert("Error, todos los campos deben estar completados");

    } else if (inputEdad.value < 18) {

        alert("La edad debe ser mayor a 18 años, sino no puedes suscribirte");
        inputEdad.value = "";

    } else if (!inputEmail.value.includes("@") || !inputEmail.value.includes(".")) {

        inputEmail.value = "";
        alert("Error, falta el signo de @ o un . al email");

    } else {

        alert("Formulario enviado");

    }
});

// CREO EL ARRAY PRODUCTOS CON SUS OBJETOS
const productos = [
    {
        id: 1,
        nombre: "coca",
        precio: 300,
        stock: 100,
    },
    {
        id: 2,
        nombre: "pepsi",
        precio: 330,
        stock: 50,
    },
    {
        id: 3,
        nombre: "fanta",
        precio: 270,
        stock: 33,
    },
    {
        id: 4,
        nombre: "sprite",
        precio: 270,
        stock: 70,
    },
    {
        id: 5,
        nombre: "fernet",
        precio: 3000,
        stock: 1200,
    },
    {
        id: 6,
        nombre: "whisky",
        precio: 4300,
        stock: 10,
    },
    {
        id: 7,
        nombre: "vino",
        precio: 450,
        stock: 190,
    },
    {
        id: 8,
        nombre: "vodka",
        precio: 3100,
        stock: 21,
    },
    {
        id: 9,
        nombre: "agua",
        precio: 200,
        stock: 1060,
    },
    {
        id: 10,
        nombre: "pritty",
        precio: 350,
        stock: 500,
    },
]

// LO GUARDO COMO STRING EN EL LOCALSTORAGE
localStorage.setItem("productos", JSON.stringify(productos));

//DEFINO LA VARIABLE EN LA CUAL VOY A GUARDAR EL ARRAY PRODUCTOS
let productosStorage = localStorage.getItem("productos");

// CREO EL ARREGLO VACIO CARRITO EN DONDE VOY A GUARDAR LOS PRODUCTOS QUE EL CLIENTE COMPRE
let carrito = [];

// CREO EL INPUT DE BUSQUEDA PARA USARLO CUANDO QUIERA FILTRAR POR NOMBRE O PRECIO
let inputBusqueda = document.createElement("input");
inputBusqueda.placeholder = "Buscador por producto o por precio";
inputBusqueda.className = "inputSesion";
document.body.appendChild(inputBusqueda);

let totalCompra = 0;
let total= 0;

const agregar = (id) => {
    const agregarProductos = productos.find((productos) => productos.id === id);

    //SI AGREGARPRODUCTOS ES TRUE PROCEDEMOS A INICIAR LA OPERACION DE COMPRA
    if (agregarProductos){

        //CONSULTAMOS CUANTOS PRODUCTOS VA A QUERER
        const cantidad = Number(prompt("Cuantas unidades quiere comprar?"));

        // SI QUIERE COMPRAR MAS UNIDADES DE LAS DISPONIBLES, NO PERMITE SEGUIR LA COMPRA
            if (cantidad > agregarProductos.stock){

                alert("Producto sin stock suficiente");

            } else{

            // SI NO, CALCULAMOS EL TOTAL DE LA COMPRA QUE DESPUES SE LO VAMOS A IR AGREGANDO A LA COMPRA TOTAL PARA DESPUES DECIRLE AL USUARIO CUANTO SERIA EL TOTAL DE LA COMPRA FINAL
            total = cantidad*agregarProductos.precio;

            // RESTAMOS EL STOCK DEL PRODUCTO PARA QUE SE VAYA ACTUALIZANDO
            agregarProductos.stock -= cantidad;

            //AGREGAMOS AL ARRAY CARRITO LA CANTIDAD COMPRADA, EL PRODUCTO Y EL PRECIO PARA DESPUES MOSTRARSELO AL USUARIO EN UN RESUMEN
            carrito.push(
            `
            ${cantidad} unidades del producto: ${agregarProductos.nombre} a un precio de: $${agregarProductos.precio};
            `);

                alert(
                    `La compra es: ${carrito}`);
                };
        }else{
            alert("Producto no encontrado o sin stock suficiente");
        }
    
        totalCompra += total;

        alert (`El total de la compra hasta ahora es: $${totalCompra}`);
}

const mostrarProoductos = (productos) => {

    //CREAMOS LA ESTRUCTURA DEL HTML POR MEDIO DE JS Y LES DEFINIMOS ID Y CLASES
    let div = document.createElement("div");
    div.innerHTML =
        `
<h2>Id: ${productos.id}</h2>
<p class= "p" id="nombre">Nombre de producto: ${productos.nombre}</p>
<b class= "b" id="precio">Precio: $${productos.precio}</b> <br>
<b class= "b">Stock Disponible: ${productos.stock}</b> <br> <br>
<button id= "boton${productos.id}" class="comprar">Comprar</button>
<hr>
`
    div.className = "div producto";
    document.body.append(div);

    let boton = document.getElementById(`boton${productos.id}`);
    boton.addEventListener("click", () => agregar(productos.id));

};

productos.forEach((productos) => {
    mostrarProoductos(productos);
})

// GENERO EL EVENTO DEL INPUT DE LA BUSQUEDA DONDE PODEMOS BUSCAR POR NOMBRE O POR PRECIO EN BASE AL VALOR INGRESADO EN EL INPUT
inputBusqueda.addEventListener("input", () =>{

    const valorBusqueda = inputBusqueda.value.toLowerCase();

    const productosElements = document.querySelectorAll(".producto");

    productosElements.forEach((producto) => {
    const nombreProducto = producto.querySelector("#nombre").textContent.toLowerCase();
    const precioProducto = producto.querySelector("#precio").textContent.toLowerCase();

    // COMPRUEBO SI EL NOMBRE DEL PRODUCTO O EL PRECIO CONTIENEN EL VALOR DE BUSQUEDA Y SINO NO ESTA, QUE OCULTE EL PRODUCTO
    if (nombreProducto.includes(valorBusqueda) || precioProducto.includes(valorBusqueda)) {
      producto.style.display = "block"; // Mostrar el producto
    } else {
      producto.style.display = "none"; // Ocultar el producto
    }
  });
});

//CREO EL BOTON DEL FINAL DE COMPRA PARA QUE SI NO QUIERE COMPRAR MAS, VEA EL TOTAL Y VEA EL DETALLE DE LOS PRODUCTOS QUE COMPRO
let botonFinalCompra = document.createElement("button");
botonFinalCompra.innerHTML = "Finalizar compra";
botonFinalCompra.className = "botonFinalCompra";
document.body.appendChild(botonFinalCompra);

botonFinalCompra.addEventListener("click", () => {
    alert(`La compra final es: $${totalCompra}`);
    alert(`El resumen de productos es: ${carrito}`);
})

let h3 = document.createElement("h3");
h3.innerHTML = "Métodos de pago";
h3.className = "h3";
document.body.appendChild(h3);

//AGREGO BOTONES DE METODOS DE PAGO PARA QUE ELIJA Y LE DETALLO QUE SI TIENE DESCUENTO O RECARGO CADA METODO AL CLICKEARLO
let pagoEfectivo = document.createElement("button");
pagoEfectivo.innerHTML = "Pagar en Efectivo";
pagoEfectivo.className = "botonMetodoDePago";
document.body.appendChild(pagoEfectivo);

let pagoDebito = document.createElement("button");
pagoDebito.innerHTML = "Pagar en Debito";
pagoDebito.className = "botonMetodoDePago";
document.body.appendChild(pagoDebito);

let pagoCredito = document.createElement("button");
pagoCredito.innerHTML = "Pagar en Credito";
pagoCredito.className = "botonMetodoDePago";
document.body.appendChild(pagoCredito);

let pagoFinal = 0;

pagoEfectivo.addEventListener("click", () => {
    pagoFinal = totalCompra - (totalCompra * 0.15);
    alert(`Pagando en efectivo, la compra tiene un descuento del 15%.
    El total a pagar en efectivo sería: $${pagoFinal}`);
})

pagoDebito.addEventListener("click", () => {
    alert(`Pagando con Débito, la compra no tiene descuento.
    El total a pagar en efectivo sería: $${totalCompra}`);
})

pagoCredito.addEventListener("click", () => {
    pagoFinal = totalCompra + (totalCompra * 0.4);
    alert(`Pagando en efectivo, la compra tiene un recargo del 40%.
    El total a pagar en efectivo sería: $${pagoFinal}`);
})

//POR ULTIMO, GENERO EL BOTON DE VACIAR CARRITO POR SI SE EQUIVOCO EN LA COMPRA O SI SE ARREPIENTE Y EN ESE CASO, LOS VALORES VUELVEN A COMO ESTABAN ANTES DE EMPEZAR A HACER LA COMPRA

let botonVaciarCarrito = document.createElement("button");
botonVaciarCarrito.textContent = "Vaciar Carrito";
botonVaciarCarrito.className = "botonFinalCompra";
document.body.appendChild(botonVaciarCarrito);

botonVaciarCarrito.addEventListener("click", () => {
    // Vaciar el carrito
    carrito = [];
    totalCompra = 0;
    pagoCredito = 0;
    pagoEfectivo = 0;

    alert("El carrito ha sido vaciado.");
    localStorage.clear();

});