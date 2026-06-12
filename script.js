let carrito = [];

function agregarProductoCantidad(
    nombre,
    precio,
    idCantidad
){

    let cantidad = parseInt(
        document.getElementById(idCantidad).value
    );

    carrito.push({
        nombre,
        precio,
        cantidad
    });

    actualizarCarrito();
}

function actualizarCarrito(){

    let contenedor =
    document.getElementById("carrito");

    contenedor.innerHTML = "";

    let total = 0;

    carrito.forEach((producto,index)=>{

        let subtotal =
        producto.precio *
        producto.cantidad;

        total += subtotal;

        contenedor.innerHTML += `

        <div class="item-carrito">

            <p>
            ${producto.nombre}
            </p>

            <p>
            ${producto.cantidad} x $${producto.precio}
            </p>

            <strong>
            $${subtotal}
            </strong>

            <button
            onclick="eliminarProducto(${index})">
            Eliminar
            </button>

        </div>

        `;
    });

    document.getElementById("total")
    .textContent =
    "Total: $" + total;
}

function eliminarProducto(index){

    carrito.splice(index,1);

    actualizarCarrito();
}

function vaciarCarrito(){

    carrito = [];

    actualizarCarrito();
}

function checkout(){

    let nombre =
    document.getElementById("Nombre").value;

    let direccion =
    document.getElementById("Direccion").value;

    let telefono =
    document.getElementById("Telefono").value;

    if(carrito.length === 0){

        alert(
        "Tu carrito está vacío"
        );

        return;
    }

    let total =
    carrito.reduce(
        (acum,producto)=>

        acum +
        producto.precio *
        producto.cantidad

    ,0);

    let productosTexto =
    carrito.map(producto =>

        `${producto.nombre}
        x${producto.cantidad}
        = $${producto.precio * producto.cantidad}`

    ).join("\n");

    alert(

`Pedido recibido

Cliente: ${nombre}

Dirección: ${direccion}

Teléfono: ${telefono}

${productosTexto}

TOTAL: $${total}`

    );

    emailjs.send(
        "service_53jwgjx",
        "template_tr6ndyd",
        {
            Nombre:nombre,
            Direccion:direccion,
            Telefono:telefono,
            productos:productosTexto,
            total:"$"+total
        }
    );

    carrito = [];

    actualizarCarrito();
}