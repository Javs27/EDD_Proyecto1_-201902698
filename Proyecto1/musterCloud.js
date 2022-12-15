///////////////////////////////////////////////////////////////Lista simple para crear a los usuarios  - Linea 3 a la 224

class NodoListaSimple {
    constructor(dpi,nombre,usuario,contrasenia,telefono,admin) {
        this.dpi = dpi;
        this.nombre = nombre;
        this.usuario = usuario;
        this.telefono = telefono;
        this.contrasenia = contrasenia;
        this.admin = admin;
        this.next = null;
    }
  }

  class ListaSimple{

    constructor() {
      this.head = null;
      this.size = 0;
    }
    
    /* Inserta un nodo al frente de la lista */
    push(dpi,nombre,usuario,contrasenia,telefono,admin) {
    var new_node = new NodoListaSimple(dpi,nombre,usuario,contrasenia,telefono,admin);
    new_node.next = this.head;
    this.head = new_node;
    this.size++;
    }
    
    /* Inserta un nodo en la posisión siguiente */
    append(dpi,nombre,usuario,contrasenia,telefono,admin) {
    
    var new_node = new NodoListaSimple(dpi,nombre,usuario,contrasenia,telefono,admin);
    
    if (this.head == null) {
      this.head = new NodoListaSimple(dpi,nombre,usuario,contrasenia,telefono,admin);
      this.size++;
      return;
    }
    
    
    new_node.next = null;
    
    var last = this.head;
    while (last.next != null)
      last = last.next;
      last.next = new_node;
      this.size++;
      return;
    }
    

    registrarUsuario(dpi,nombre,usuario,contrasenia,telefono,admin) {
    
      var usuario=document.getElementById("username").value;
      var nombre=document.getElementById("name").value;
      var dpi=document.getElementById("dpi").value;
      var telefono=document.getElementById("phone").value;
      var contrasenia=document.getElementById("password").value;
      var new_node = new NodoListaSimple(dpi,nombre,usuario,contrasenia,telefono,admin=false);
      alert("El usuario ha sido registrado!");
      
    
      if (this.head == null) {
        this.head = new NodoListaSimple(dpi,nombre,usuario,contrasenia,telefono,admin=false);
        this.size++;
    
        console.log(usuarios);
        return;
        
      }
      
      
      
      new_node.next = null;
      
      var last = this.head;
      while (last.next != null)
        last = last.next;
        last.next = new_node;
        this.size++;
        return;
      
        
      
      }
    
    
    deleteNode(key) {
      var temp = this.head, prev = null;
    
      // Si el propio nodo de cabecera tiene la clave que hay que borrar
      if (temp != null && temp.usuario == key) {
          this.head = temp.next; // Cambiando la cabeza
          return;
      }
    
      // Buscar la clave que se va a eliminar, mantener la pista de el nodo anterior ya que necesitamos cambiar temp.next
      while (temp != null && temp.usuario != key) {
          prev = temp;
          temp = temp.next;
      }
    
      // Si la clave no está en la lista
      if (temp == null)
          return;
    
      // Quitando el nodo de la lista
      prev.next = temp.next;
    }
    
    getCount() {
      var temp = this.head;
      var count = 0;
      while (temp != null) {
          count++;
          temp = temp.next;
      }
      return count;
    }
    
    // para buscar la informacion en la lista
    buscar(indice){
      let aux = this.head 
      while (aux!=null){
          if(aux.usuario == indice){
              console.log("Si aparece "+aux.usuario)
              
              return aux
          }
          aux = aux.next
      }
      console.log("No aparece ")      
      return this
    }
    
    
    
    printList() {
    var tnode = this.head;
      while (tnode != null) {
        document.write("Lista de usuarios" + "<br>");
          document.write(tnode.usuario + " " + tnode.nombre + " " + tnode.dpi + " " + tnode.telefono + " " + tnode.contrasenia + " " + tnode.admin + "<br>");
          tnode = tnode.next;
      }
    }
    
    //graficar con graphviz 
    graficarListaUsuarios(){
          var codigodot = "digraph G{\nlabel=\" Lista Simple De Usuarios \";\nnode [shape=box];\n";
          var temporal = this.head
          var conexiones ="";
          var nodos ="";
          var numnodo= 0;
          while (temporal != null) {
              nodos+=  "N" + numnodo + "[label=\"" +"Usuario: "+ temporal.usuario+"\n Nombre: " +temporal.nombre+"\n DPI: "+temporal.dpi+ "\n Telefono: " +temporal.telefono + "\n Contraseña: " +temporal.contrasenia +  "\n Admin: " +temporal.admin + "\" ];\n"
              if(temporal.next != null){
                  var auxnum = numnodo+1
                  conexiones += "N" + numnodo + " -> N" + auxnum + ";\n"
              }
              temporal = temporal.next
              numnodo++;            
          }
          codigodot += "//agregando nodos\n"
          codigodot += nodos+"\n"
          codigodot += "//agregando conexiones o flechas\n"
          codigodot += "{rank=same;\n"+conexiones+"\n}\n}"
          console.log(codigodot)
          //var arreglo = [0,2,3,4,5]
          d3.select("#lienzoUsuarios").graphviz()
                .width(900)
                .height(500)
                .renderDot(codigodot)
          console.log(usuarios);
    }
    
    
    mostrarUser(){
        var temporal = this.head
        
    
       
        const selectUsuarios = document.getElementById("selectUsuarios");
    
        
        while(temporal!=null){
           
          
           var  optionUsuarios = document.createElement("option");
           optionUsuarios.value = temporal.usuario
           optionUsuarios.text =  temporal.usuario;
           temporal= temporal.next
           selectUsuarios.appendChild(optionUsuarios);
    
        }
        
     }
    
     enviarUser(){
    
        const usuarios = document.querySelector('#selectUsuarios');
        console.log(usuarios)
        usuarios.addEventListener('change', () => {
          let valorOption = usuarios.value;
          console.log(valorOption);
    
          var optionSelect = usuarios.options[usuarios.selectedIndex];
    
          console.log("Opción:", optionSelect.text);
          console.log("Valor:", optionSelect.value);
    
          /*Mostrando el resultado en el input*/
        let  inputResult = document.querySelector('#resultUsuarios').value=(optionSelect.value);
          
        });
    
    
     }
    
    
    
    }

var usuarios = new ListaSimple();

function CargaMasivaUsuarios(e){
    var archivo =e.target.files[0];
    
    //si no encuentra el archivo
    if (!archivo){
        return;
    }
  
    let lector=new FileReader();
    lector.onload=function(e){
        let contenido = e.target.result;
        
        //crea el objeto json
        const objeto=JSON.parse(contenido);
        console.log(objeto);
  
        //para mandarlo a la estructura
        for (const key in objeto){
            let usuario =objeto[key]
            usuarios.append(usuario.dpi,usuario.name,usuario.username,usuario.password,usuario.phone,usuario.admin)
        }
  
        
        
        alert("El archivo ha sido cargado!")
        
        usuarios.graficarListaUsuarios();
        
   
    }
    
  
    lector.readAsText(archivo);
   
  
  }
  
document.getElementById("jsonusuarios").addEventListener("change", CargaMasivaUsuarios, false)


/////////////////////////////////////////////////////////////Empieza lo referente a Artistas

class NodoArtista {
    constructor(dato) {
        this.dato = dato;
        this.siguiente = null;
        this.anterior = null;
        this.lista = new Lista();
    }
  }
  
  class Lista {
    constructor() {
        this.primero = null;
        this.contador = 0;
    }
  
    get total(){
      return this.contador;
    }
    // método para crear la lista normal
    add(dato) {
        let nuevo = new NodoArtista(dato);
        if(this.primero == null) {
            // si la lista está vacía agrega el dato al inicio de la cola
            this.primero = nuevo;
        }else {
            let aux = this.primero;
            // mientras el nodo aux no sea null, pasará al siguiente nodo
            while(aux.siguiente != null) {
                aux = aux.siguiente;
            }
            let repetido = this.repetido(dato, this.primero);
            if(repetido) {
                console.log('Dato repetido, no se insertó: ' + dato + ' :(');
                return
            }
            // insertando el nuevo dato y asignando los apuntadores
            aux.siguiente = nuevo;
            nuevo.anterior = aux;
        }
        this.contador = this.contador + 1;
    }
  
  
    // método para insertar dentro de una lista 
    add2(nombre, dato) {
        let aux = this.primero;
        while(aux != null) {
            // si el nombre es igual al algún dato de la lista se iscerta otra lista dentro de ese nodo
            if (aux.dato == nombre) {
                let repetido = this.repetido(dato, aux.lista.primero);
                if (repetido) {
                    console.log('Dato repetido, no se insertó: ' + dato);
                }else {
                    aux.lista.add(dato);
                }                
                return
            }
            aux = aux.siguiente;
        }
        // si sale del while quiere decir que no hay tal nombre
        console.log('No existe ese nombre!');
    }
  
    // método para verificar si hay algún dato repetido
    repetido(dato, aux) {
        while(aux != null) {
            if(aux.dato == dato) {
                return true;
            }
            aux = aux.siguiente;
        }
        return false;
    }
  
    // método para mostrar la lista
    mostrar() {
        let aux = this.primero;
        //console.log('=========LISTA=======');
        document.write('=========LISTA======='+"<br>");
        while(aux != null) {
            //console.log('* ' + aux.dato);
            document.write('* ' + aux.dato+"<br>");
            let aux2 = aux.lista.primero;
            while(aux2 != null) {
                //console.log('   -> ' + aux2.dato);
                document.write('   -> ' + aux2.dato+"<br>");
                aux2 = aux2.siguiente;
            }
            aux = aux.siguiente;
        }
    }
  
    // para buscar la informacion en la lista
    buscar(indice){
        let aux = this.primero 
        while (aux!=null){
            if(aux.dato == indice){
                document.write("Si aparece "+aux.dato)
                
                return aux
                }
  
            aux = aux.siguiente
            
        }
            
            
            
        return this
    }
  
  
  
    //graficar con graphviz 
    graficarArtistas(){
        var codigodot = "digraph G{\nlabel=\" Artistas - Lista de Listas \";\nnode [shape=box];\n";
        var temporal = this.primero
        var conexiones ="";
        var conexiones2="";
        var nodos ="";
        var numnodo= 0;
        while (temporal != null) {
            nodos+=  "N" + numnodo + "[label=\"" + temporal.dato + "\" ];\n"
  
            var numnodo2= 0;
            
            
            
            //para la lista 2
            let temporal2=temporal.lista.primero
  
            conexiones2 += "N" + numnodo + " -> NN" + temporal.dato + "0;\n"
            while(temporal2!=null){
                nodos+=  "NN" + temporal.dato +numnodo2 + "[label=\"" + temporal2.dato + "\" ];\n"
  
  
                if(temporal2.siguiente!=null){
                    var auxnum2 = numnodo2+1
                conexiones2+= "NN" + temporal.dato +numnodo2 + " -> NN" +temporal.dato + auxnum2 + ";\n"
                }
  
                
                temporal2 = temporal2.siguiente
                numnodo2++; 
            }
            
  
            if(temporal.siguiente != null){
                var auxnum = numnodo+1
                conexiones += "N" + numnodo + " -> N" + auxnum + ";\n"
            }
  
  
            temporal = temporal.siguiente
            numnodo++;            
        }
  
        codigodot += "//agregando nodos\n"
        codigodot += nodos+"\n"
        codigodot += "//agregando conexiones o flechas\n"
        codigodot += conexiones2+"{rank=same;\n"+conexiones+"\n}\n}"
        console.log(codigodot)
        console.log(artistas);
        //var arreglo = [0,2,3,4,5]
        d3.select("#lienzoArtistas").graphviz()
            .width(900)
            .height(500)
            .renderDot(codigodot)
        d3.select("#lienzoArtistas2").graphviz()
            .width(900)
            .height(500)
            .renderDot(codigodot)
    }
  
    mostrarArtistas(){
      var temporal = this.primero
      
  
      const selecArtistas = document.getElementById("selectArtistas");

      while(temporal!=null){
         
        
         var  option = document.createElement("option");
         option.value = temporal.lista.primero.dato;
         option.text =  temporal.lista.primero.dato + " - " + temporal.dato;
         temporal= temporal.siguiente
         selecArtistas.appendChild(option);
  
      }
      
   }
  
   enviarArtistas(){
  
      const artistas = document.querySelector('#selectArtistas');
      console.log(artistas)
      artistas.addEventListener('change', () => {
        let valorOption = artistas.value;
        console.log(valorOption);
  
        var optionSelect = artistas.options[artistas.selectedIndex];
  
        console.log("Opción:", optionSelect.text);
        console.log("Valor:", optionSelect.value);
  
        /*Mostrando el resultado en el input*/
      let  inputResult = document.querySelector('#result').value=(optionSelect.value);
        
      });
  
  
   }
  
  }
  
  var artistas = new Lista();


  function CargaMasivaArtistas(e){
    var archivo =e.target.files[0];
    
    //si no encuentra el archivo
    if (!archivo){
        return;
    }
  
    let lector=new FileReader();
    lector.onload=function(e){
        let contenido = e.target.result;
        
        //crea el objeto json
        const objeto=JSON.parse(contenido);
        console.log(objeto);
  
        //para mandarlo a la estructura
        for (const key in objeto){
            let artista =objeto[key]
            artistas.add(artista.name)
        }
  
       
  
        alert("Archivo cargado Exitosamente")
        artistas.graficarArtistas();
      
   
    }
    
    
  
    lector.readAsText(archivo);
   
  
  }
  
  document.getElementById("jsonartistas").addEventListener("change", CargaMasivaArtistas, false)


  /////////////////////////////////////////////////////////////Empieza lo referente a cancion
  

  function CargaMasivaCanciones(e){
    var archivo =e.target.files[0];
    
    //si no encuentra el archivo
    if (!archivo){
        return;
    }
  
    let lector=new FileReader();
    lector.onload=function(e){
        let contenido = e.target.result;
        
        //crea el objeto json
        const objeto=JSON.parse(contenido);
        console.log(objeto);
  
        //para mandarlo a la estructura
        for (const key in objeto){
            let cancion =objeto[key]
            artistas .add2(cancion.artist,cancion.name)
        }
  
        alert("El archivo ha sido cargado!")
        
        artistas .graficarArtistas();
        console.log(artistas );
   
    }
    
  
    lector.readAsText(archivo);
    console.log(artistas )
  
  }
  
  document.getElementById("jsoncanciones").addEventListener("change", CargaMasivaCanciones, false)
  


  ////////////////////////////////////////////////////////////Empieza lo referente al podcast

class NodoArbol{
    constructor(dato){
        //"dato" puede ser de cualquier tipo, incluso un objeto si se sobrescriben los operadores de comparación
       this.dato = dato
       this.izquierda = null
       this.derecha = null
    }
      
}
  
  nodosBinario= ""
  conexionesBinario = ""
  
  class Arbol{
   // Funciones privadas
   constructor(){
       this.raiz = null
       
  }
      
   
   agregar_recursivo(nodo, dato){
  
       if(this.raiz == null) {
           // si la lista está vacía agrega el dato al inicio de la cola
           this.raiz = new NodoArbol(dato);
           return
       }
   
  
        if (dato < nodo.dato){
           if (nodo.izquierda == null){
               nodo.izquierda =new NodoArbol(dato)
           }
               
           else{
               this.agregar_recursivo(nodo.izquierda, dato)
           }
               
        }
           
       else{
  
           if (nodo.derecha == null){
               nodo.derecha = new NodoArbol(dato)
           }
               
           else{
               this.agregar_recursivo(nodo.derecha, dato)
           }
               
       }
           
   }
      
  
  
   
   inorden_recursivo(nodo){
          
  
    if (nodo != null){
  
        this.inorden_recursivo(nodo.izquierda)
        let nodoTempo=nodo.dato
        //nodos
        nodosBinario+=('"' +nodoTempo +'"' + "[label=\""+nodoTempo+"\" ];\n");
        console.log('"' +nodoTempo +'"' + "[label=\""+nodoTempo+"\" ];\n");
        
        let izquierda=nodo.izquierda
  
        //conecciones a la izquierda
        if (nodo.izquierda!=null){
            conexionesBinario+=('"' +nodoTempo+'"' + " -> " +'"'+izquierda.dato+'"' + "[arrowhead =null ];\n")
            console.log('"' +nodoTempo+'"' + " -> " +'"'+izquierda.dato+'"' + "[arrowhead =null ];\n")
        }
            
        //conecciones derecha    
        let derecha=nodo.derecha    
        if (nodo.derecha!=null){
            conexionesBinario+=('"' +nodoTempo+'"' + " -> " +'"'+derecha.dato +'"' + "[arrowhead =null ];\n")
            console.log('"' +nodoTempo+'"' + " -> " +'"'+derecha.dato +'"' + "[arrowhead =null ];\n")
        }
            
            
        
        this.inorden_recursivo(nodo.derecha)
  
        
        return
    }
    //console.log(nodos)
    //console.log(conexiones)
    return 
  
  }
   
   preorden_recursivo(nodo){
  
       if (nodo!= null){
           console.log(nodo.dato+ ", ")
  
           let nodoTempo=nodo.dato
           //nodos
           nodosBinario+=('"' +nodoTempo +'"' + "[label=\""+nodoTempo+"\" ];\n");
           console.log('"' +nodoTempo +'"' + "[label=\""+nodoTempo+"\" ];\n");
           
           let izquierda=nodo.izquierda
  
           //conecciones a la izquierda
           if (nodo.izquierda!=null){
               conexionesBinario+=('"' +nodoTempo+'"' + " -> " +'"'+izquierda.dato+'"' + "[arrowhead =null ];\n")
               console.log('"' +nodoTempo+'"' + " -> " +'"'+izquierda.dato+'"' + "[arrowhead =null ];\n")
           }
               
           //conecciones derecha    
           let derecha=nodo.derecha    
           if (nodo.derecha!=null){
               conexionesBinario+=('"' +nodoTempo+'"' + " -> " +'"'+derecha.dato +'"' + "[arrowhead =null ];\n")
               console.log('"' +nodoTempo+'"' + " -> " +'"'+derecha.dato +'"' + "[arrowhead =null ];\n")
           }
  
  
  
           this.preorden_recursivo(nodo.izquierda)
           this.preorden_recursivo(nodo.derecha)
  
       }
           
   }
       
   postorden_recursivo(nodo){
       if (nodo!= null){
  
           this.postorden_recursivo(nodo.izquierda)
           this.postorden_recursivo(nodo.derecha)
  
           let nodoTempo=nodo.dato
           //nodos
           nodosBinario+=('"' +nodoTempo +'"' + "[label=\""+nodoTempo+"\" ];\n");
           console.log('"' +nodoTempo +'"' + "[label=\""+nodoTempo+"\" ];\n");
           
           let izquierda=nodo.izquierda
  
           //conecciones a la izquierda
           if (nodo.izquierda!=null){
               conexionesBinario+=('"' +nodoTempo+'"' + " -> " +'"'+izquierda.dato+'"' + "[arrowhead =null ];\n")
               console.log('"' +nodoTempo+'"' + " -> " +'"'+izquierda.dato+'"' + "[arrowhead =null ];\n")
           }
               
           //conecciones derecha    
           let derecha=nodo.derecha    
           if (nodo.derecha!=null){
               conexionesBinario+=('"' +nodoTempo+'"' + " -> " +'"'+derecha.dato +'"' + "[arrowhead =null ];\n")
               console.log('"' +nodoTempo+'"' + " -> " +'"'+derecha.dato +'"' + "[arrowhead =null ];\n")
           }
           console.log(nodo.dato+", ")
       }
           
   }
       
   
  
   buscar(nodo, busqueda){
  
       if (nodo == null){
           return null
       }
           
       if (nodo.dato == busqueda){
           return nodo
       }
           
       if (busqueda < nodo.dato){
           return this.buscar(nodo.izquierda, busqueda)
       }
           
       else{
           return this.buscar(nodo.derecha, busqueda)
       }
           
   }
  
   
       

  
   agregar(dato){
        this.agregar_recursivo(this.raiz, dato)
   }
      
  
  
   enviarAlArbol() {
    var podcast;
  
    podcast=document.getElementById("namePodcast").value;
    arbolPodcast.agregar(podcast)
    alert("El podcast ha sido añadido!!")
    console.log(arbolPodcast)
    
    }
  
  
   graficarArbol(){
    this.inorden_recursivo(this.raiz)
    //this.postorden_recursivo(this.raiz)
    //this.preorden_recursivo(this.raiz)
  
    //("Imprimiendo árbol en orden: ")
    var codigodot = "digraph G{\nlabel=\" Arbol binario \";\nnode [];\n";
  
  
  
    codigodot += "//agregando nodos\n"
    codigodot+=nodosBinario
    codigodot += "//agregando conexiones o flechas\n"
    codigodot += conexionesBinario+"\n\n}"
  
    
    console.log(codigodot)
       
       d3.select("#lienzoPodcast").graphviz()
           .width(900)
           .height(500)
           .renderDot(codigodot)
        d3.select("#lienzoPodcast2").graphviz()
           .width(900)
           .height(500)
           .renderDot(codigodot)
  
      nodosBinario= ""
      conexionesBinario = ""
  
   }
       
  
   
  
   buscar2(busqueda){
       return this.buscar(this.raiz, busqueda)
   }
       
  
  }
  
  
var arbolPodcast = new Arbol();

function CargaMasivaPodcast(e){
    var archivo =e.target.files[0];
    
    //si no encuentra el archivo
    if (!archivo){
        return;
    }
  
    let lector=new FileReader();
    lector.onload=function(e){
        let contenido = e.target.result;
        
        //crea el objeto json
        const objeto=JSON.parse(contenido);
        console.log(objeto);
  
        //para mandarlo a la estructura
        for (const key in objeto){
            let podcast =objeto[key]
            arbolPodcast.agregar(podcast.name)
        }
  
        alert("El archivo ha sido cargado!")
        
        arbolPodcast.graficarArbol();
        
   
    }
    
  
    lector.readAsText(archivo);
  
  
}
  
document.getElementById("jsonpodcast").addEventListener("change", CargaMasivaPodcast, false)


 ////////////////////////////////////////////////////////////Empieza lo referente a musica programada 
  
 class NodoDispersa{
    constructor(dato){
        this.dato = dato
        //Coordenadas
        this.posVertical = null
        this.posHorizontal =null
        //Apuntadores
        this.derecha = null
        this.izquierda = null
        this.arriba = null
        this.abajo = null
    }
        
  }
    
  
  class MatrizDispersa{
    constructor(){
        //Creamos el nodo raiz en 0,0
        this.raiz = new NodoDispersa()
        this.raiz.posVertical = 0
        this.raiz.posHorizontal = 0
    }
        
  
    crearIndiceVertical(pos){
        // recorrer todos los nodos de manera vertical
        // creamos un temporal
        let tmp = this.raiz
        while (tmp != null){
            // no existe el indice; solo hay índices menores
            if (tmp.abajo == null && tmp.posVertical < pos){
                // ya no hay más nodos en vertical
                // se inserta al final
                let nuevo = new NodoDispersa()
                nuevo.posHorizontal = 0
                nuevo.posVertical = pos
                nuevo.arriba = tmp
                tmp.abajo = nuevo
                return tmp.abajo
            }
                
            
            // indice actual es igual a el nuevo índice
            if (tmp.posVertical == pos){
                // no hacer nada
                return tmp
            }
                
  
            // indice actual es menor, pero el siguiente es mayor
            if (tmp.posVertical < pos && tmp.abajo.posVertical > pos){
                // insertar un nodo en medio del nodo actual y del nodo siguiente
                let nuevo = new NodoDispersa()
                nuevo.posHorizontal = 0
                nuevo.posVertical = pos
  
                // asignar abajo y arriba para el nodo nuevo
                nuevo.abajo = tmp.abajo
                nuevo.arriba = tmp
                
                tmp.abajo.arriba = nuevo // reasignar arriba para el nodo de abajo
                tmp.abajo = nuevo // reasignar abajo para el nodo actual
                return tmp.abajo
            }
                
  
            // pasar al siguiente nodo abajo si no hubo un return
            tmp = tmp.abajo
        }
            
    }
  
    crearIndiceHorizontal(pos){
        // recorrer todos los nodos de manera horizontal
        let tmp = this.raiz
        while (tmp != null){
            // no existe el indice; solo hay índices menores
            if (tmp.derecha == null && tmp.posHorizontal < pos){
                // ya no hay más nodos en horizontal
                // se inserta al final
                let nuevo = new NodoDispersa()
                nuevo.posHorizontal = pos
                nuevo.posVertical = 0
                nuevo.izquierda = tmp
                tmp.derecha = nuevo
                return tmp.derecha
            }
                
            
            // indice actual es igual a el nuevo índice
            if (tmp.posHorizontal == pos){
                // no hacer nada
                return tmp
            }
                
  
            // indice actual es menor, pero el siguiente es mayor
            if (tmp.posHorizontal < pos && tmp.derecha.posHorizontal > pos){
                 // insertar un nodo en medio del nodo actual y del nodo siguiente
                 let nuevo = new NodoDispersa()
                nuevo.posHorizontal = pos
                nuevo.posVertical = 0
  
                // asignar derecha y arriba para el nodo nuevo
                nuevo.derecha = tmp.derecha
                nuevo.izquierda = tmp
                
                tmp.derecha.izquierda = nuevo // reasignar arriba para el nodo de derecha
                tmp.derecha = nuevo // reasignar derecha para el nodo actual
                return tmp.derecha
                
            }
               
            // pasar al siguiente nodo derecha si es que no hubo return 
            tmp = tmp.derecha
        }
            
  
    }
  
    insertarVertical(nodo, indiceHorizontal){
        // recorrer todos los nodos de manera horizontal para insertar los verticales
        let tmp = indiceHorizontal
        while (tmp != null){
            // no existe el indice; solo hay índices menores
            if (tmp.abajo == null && tmp.posVertical < nodo.posVertical){
                // ya no hay más nodos en vertical
                // se inserta al final
                nodo.arriba = tmp
                tmp.abajo = nodo
                return tmp.abajo
            }
                
            
            // indice actual es igual a el nuevo índice
            if (tmp.posVertical == nodo.posVertical){
                // no hacer nada, el dato se sobre escribe
                tmp.dato = nodo.dato
                return tmp
  
            }
                
            // indice actual es menor, pero el siguiente es mayor
            if (tmp.posVertical < nodo.posVertical && tmp.abajo.posVertical > nodo.posVertical){
                // insertar un nodo en medio del nodo actual y del nodo siguiente
  
                // asignar abajo y arriba para el nodo nuevo
                nodo.abajo = tmp.abajo
                nodo.arriba = tmp
                
                tmp.abajo.arriba = nodo // reasignar arriba para el nodo de abajo
                tmp.abajo = nodo // reasignar abajo para el nodo actual
                return tmp.abajo
            }
                
  
            // pasar al siguiente nodo abajo si no hubo return
            tmp = tmp.abajo
        }
            
    }
       
    insertarHorizontal(nodo, indiceVertical){
        // recorrer todos los nodos en horizontal
        let tmp = indiceVertical
        while (tmp != null){
            // no existe el indice; solo hay índices menores
            if (tmp.derecha == null && tmp.posHorizontal < nodo.posHorizontal){
                // ya no hay más nodos en horizontal
                // se inserta al final
                nodo.izquierda  = tmp
                tmp.derecha = nodo
                return tmp.derecha
            }
                
            
            // indice actual es igual a el nuevo índice
            if (tmp.posHorizontal == nodo.posHorizontal){
                // no hacer nada se sobre escribe
                tmp.dato = nodo.dato
                return tmp
  
            }
                
            // indice actual es menor, pero el siguiente es mayor
            if (tmp.posHorizontal < nodo.posHorizontal && tmp.derecha.posHorizontal > nodo.posHorizontal){
  
                // insertar un nodo en medio del nodo actual y del nodo siguiente
                // asignar derecha y arriba para el nodo nuevo
                nodo.derecho = tmp.derecha
                nodo.izquierda = tmp
                
                tmp.derecha.izquierda = nodo // reasignar arriba para el nodo de derecha
                tmp.derecha = nodo // reasignar derecha para el nodo actual
                return tmp.derecha
            }
                
                
            // pasar al siguiente nodo derecha si esque no hubo return
            tmp = tmp.derecha
        }
            
    }
  
    insertarDato(dato,  posVertical, posHorizontal){
        // validar que los índices existan en horizontal y vertical
        let indiceVertical = this.crearIndiceVertical(posVertical)
        let indiceHorizontal = this.crearIndiceHorizontal(posHorizontal)
  
        // crear el nodo informacion
        let nuevo =new NodoDispersa()
        nuevo.posHorizontal = posHorizontal
        nuevo.posVertical = posVertical
        nuevo.dato = dato
  
        // indexar/apuntar nodo nuevo en indice vertical
        nuevo = this.insertarVertical(nuevo, indiceHorizontal) 
        nuevo = this.insertarHorizontal(nuevo, indiceVertical)
        console.log("Nodo insertado...")
        //pass
  
    }
  
    graficarMatriz(){
        var codigodot = "digraph G{\nlabel=\" Matriz Dispersa - Musica programada \";\nnode [shape=box];\n";
        
        var asd=this.raiz.derecha
        var temporal = this.raiz
        var conexiones ="";
        var conexiones2="";
        var nodos ="";
        var subgrafo=0
  
        
        while (temporal != null ) {
            var nodosTemporales="subgraph cluster_"+subgrafo +"{ "
            console.log("while 1")
            nodosTemporales+=  '"' + temporal.dato +'"' + "[label=\"" + temporal.dato +  "\" ];\n"
            //nodos+=  '"' + abajo.dato +'"' + "[label=\"" + abajo.dato +  "\" ];\n"
  
            var conexionesTemporales="{rank=same;"
            let temporal2=temporal
            while(temporal2!=null){
                
                console.log("while 2")
                nodosTemporales+=  '"' + temporal2.dato +'"' + "[label=\"" + temporal2.dato +  "\"" +",group="+temporal2.posHorizontal +"];\n"
  
                
                if(temporal2.derecha!=null){
                    conexionesTemporales += '"' + temporal2.dato +'"' + " -> " +'"' + temporal2.derecha.dato +'" [dir=both]' + ";\n"
                    //conexionesTemporales += '"' + temporal2.derecha.dato  +'"' + " -> " +'"' + temporal2.dato +'"' + ";\n"
                  }
                if(temporal2.abajo!=null){
                    conexiones += '"' + temporal2.dato +'"' + " -> " +'"' + temporal2.abajo.dato +'"[dir=both]' + ";\n"
                   // conexiones += '"' + temporal2.abajo.dato +'"' + " -> " +'"' + temporal2.dato +'"' + ";\n"
                  }
  
                
                temporal2 = temporal2.derecha
            }
            conexiones+=conexionesTemporales+"}\n"
            nodos+=nodosTemporales+"}"
            subgrafo+=1   
            conexionesTemporales="{rank=same;"
            
            
            //if(temporal.abajo!=null){
              //conexiones2 += '"' + temporal.dato +'"' + " -> " +'"' + temporal.abajo.dato +'"' + ";\n"  
            //}
            temporal = temporal.abajo
                       
        }
        codigodot += "//agregando nodos\n"
        codigodot += nodos+"\n"
        codigodot += "//agregando conexiones o flechas\n"
        codigodot += conexiones2+"\n"+conexiones+"\n\n}"
        console.log(codigodot)
        //var arreglo = [0,2,3,4,5]
        d3.select("#lienzoMusicaProgramada").graphviz()
            .width(900)
            .height(500)
            .renderDot(codigodot)
    }
   
  
  
  
    insertarDatoDispersa(dato,  posVertical, posHorizontal){
        
        this.insertarDato(posVertical+"-0",posVertical,0)

        
        this.insertarDato(posHorizontal,0,posHorizontal)
  
        this.insertarDato(dato,  posVertical, posHorizontal)
  
    }
  
  
  
  }
  
  var matrizDispersa =new MatrizDispersa()
  matrizDispersa.insertarDatoDispersa("INICIO",0,0)


function CargaMasivaMusicaProgramada(e){
    var archivo =e.target.files[0];
    
    //si no encuentra el archivo
    if (!archivo){
        return;
    }
  
    let lector=new FileReader();
    lector.onload=function(e){
        let contenido = e.target.result;
        
        //crea el objeto json
        const objeto=JSON.parse(contenido);
        console.log(objeto);
  
        //para mandarlo a la estructura
        for (const key in objeto){
            let musicaP =objeto[key]
            matrizDispersa.insertarDatoDispersa(musicaP.song + " " + musicaP.artist ,musicaP.month,musicaP.day)
        }
  
        alert("El archivo ha sido cargado!")
        
        matrizDispersa.graficarMatriz();
        console.log(matrizDispersa);
   
    }
    
  
    lector.readAsText(archivo);
    console.log(listaArtistas)
  
  }
  
  document.getElementById("jsonMusicaProgramada").addEventListener("change", CargaMasivaMusicaProgramada, false)


/////////////////////////////////////////////////////////////Empieza lo referente a playlist (LISTA DOBLEMENTE ENLAZADA)
class NodoListaDoble {
    constructor(value) {
        this.value = value
        this.next = null
	      this.prev = null
    }
}

class CircularDoublyLinkedList {
  constructor(value) {
    this.head = null
    this.tail = null
    this.length = 0
    
    if (value) {
      this.initialize(value)
    }
  }
  
  // used to initialize Circular Doubly Linked List
  initialize(value) {
    // create a node
    const newNode = new NodoListaDoble(value)
    // create a circular reference (points to itself)
    newNode.next = newNode
    newNode.prev = newNode
    // now make both head and tail to point on newNode
    this.head = newNode
    this.tail = newNode
    // increment length
    this.length++
  }
  
  append(value) {
    // if length is zero, use initialize method instead
    if (this.length === 0) {
      return this.initialize(value)
    }

    // create a new node
    const newNode = new NodoListaDoble(value)
    
    // fix newNode pointers to set it as a new tail:
    newNode.prev = this.tail
    newNode.next = this.head
    
    // now update the head and tail accordingly:
    this.head.prev = newNode
    this.tail.next = newNode
    
    // update the tail to be the newNode:
    this.tail = newNode
    // increment length:
    this.length++
  }
  
  prepend(value) {
    // if length is zero, use initialize method instead
    if (this.length === 0) {
      return this.initialize(value)
    }
    
    // create a new node
    const newNode = new NodoListaDoble(value)
    
    // fix newNode pointers to set it as a new head:
    newNode.next = this.head
    newNode.prev = this.tail
    
    // now update the head and tail accordingly:
    this.head.prev = newNode
    this.tail.next = newNode
    
    // update the head to be the newNode:
    this.head = newNode
    
    // increment length
    this.length++
  }
  
  // toArray - loop through nested objects, then return the values in an array
  toArray() {
    const array = []
    // Initialize a currentNode variable pointing to this.head - which will be the starting point for traversal.
    let currentNode = this.head

    do {
    	array.push(currentNode.value)
      currentNode = currentNode.next
      // NOTE: 
      // Since there can be duplicate values in the list, we will be using "Referential equality" instead of comparing Node values as the exit condition (which is figuring out where the head is).
      // When strict equality operator is used in reference types in JS, it checks if compared values referencing the same object instance. This is useful when you like to compare references.
    } while (currentNode !== this.head)
    
    return array
  }
  
  // traverse to index
  traverseToIndex(index) {
    if (index < 0) return undefined
    // keeps track of traversal
    let counter = 0
    // starting point
    let currentNode = this.head

    // traverse to the target index
    while (counter !== index) {
      currentNode = currentNode.next
      counter++
    }

    return currentNode
  }
  
  insert(index, value) {
    // if length is 0, just prepend (add to the beginning)
    if (index === 0) {
      return this.prepend(value)
    }
    // validate the received index parameter:
    if (!index) return 'Index is missing'
    if (typeof index !== 'number') return 'Index should be a number'
    if (index < 0) return 'Index should be bigger than zero'
    
    // if length is too long, just append (add to the end)
    if (index >= this.length) {
      return this.append(value)
    }

    // Initialize a newNode with value recieved.
    const newNode = new NodoListaDoble(value)
    
  	// pick previous index
    const preIdx = this.traverseToIndex(index - 1)
    
    // pick target index
    const targetIdx = preIdx.next
    
    // Set the preIdx next to newNode. This is because newNode replaces the targetIdx's position.
    preIdx.next = newNode
    
    // Set the newNode prev to preIdx. This is because newNode replaces the targetIdx's position.
    newNode.prev = preIdx
    
    // Set the newNode next to targetIdx. This is because newNode replaces the targetIdx's position.
    newNode.next = targetIdx
    
    // Now, targetIdx (which have changed place until this step) will point the prev to the newNode. Again, timing is important on steps!
    targetIdx.prev = newNode
    this.length++
  }
  
  // remove from beginning:
  deleteHead() {
    // check if there is a head value - if not return a warning or null
    if (this.length === 0) return null
    const currHead = this.head
    
    // if one element left
    if (this.length === 1) {
      const headVal = this.head.value
      this.head = null
      this.tail = null
      this.length--
      return headVal
    }
    
     // pick the current head value:
    const headVal = this.head.value
    
    // define newHead as this.head.next
    const newHead = this.head.next
    
    // move the head to next node:
    this.head = newHead
  
    // set the tail next to new this.head:
    this.tail.next = this.head
    
    // set the new previous pointer to updated tail:
    this.head.prev = this.tail
    // decrement length:
    this.length--
    return headVal
  }
  
  // remove from end:
  deleteTail() {
    // check the length - if zero return null
    if (this.length === 0) return null
    
    // If there is only one node left:
    if (this.length === 1) {
      	const tailVal = this.tail.value
        this.head = null
        this.tail = null
        this.prev = null
      	this.length--
        return tailVal
    }
        
    // store the tailVal (to return):
    const tailVal = this.tail.value
    // define new tail by picking the previous node of current tail.    
    const newTail = this.tail.prev

    // prepare for replacement:
    // point newTail.next to this.head
    newTail.next = this.head
    // point this.head.prev to newTail. Now the new tail has correct pointers.
    this.head.prev = newTail
    
    // finalize removal by pointing current tail to newTail
    this.tail = newTail
    // decrement length:
    this.length--
    return tailVal
  }
  
  // Delete from specific index
    delete(index) {
        // if length is 0, just prepend (add to the beginning)
        if (index === 0) {
          return this.deleteHead()
        }

        // validate the received index parameter:
        if (!index) return 'Index is missing'
        if (typeof index !== 'number') return 'Index should be a number'

        // check the length - if zero return a warning
        if (this.length === 0) return 'List is empty'

        // Validation - should not be less than 0
        if (index < 0) return `Minimum idx should be 0 or greater`

        // Check if it is the last element. In that case reset head and tail to null
        if (this.length === 1) {
          	const targetVal = this.head.value
            this.head = null
            this.tail = null
            this.prev = null
          	return targetVal
        }

        // If not define removal style. Removal will be either head, middle or tail.
        let removalType

        if (index === 0) {
            removalType = 'head'
        }
        // When we do a removal from middle on Doubly Linked List, we need to take 3 indexes into account: pre, target and next. To be able to make it work the middle removal with the length prop, we specify the comparison one minus form the length prop compared to a Singly Linked List.
        if (index >= this.length - 1) {
            removalType = 'tail'
        }
        if (index > 0 && index < this.length - 1) {
            removalType = 'middle'
        }

        if (removalType === 'head') {
            return this.deleteHead()
        }

        if (removalType === 'tail') {
            return this.deleteTail()
        }

        if (removalType === 'middle') {
            /*
              Pick the previous Node of targetIdx via traverse.
              Pick the target idx with preIdx.next
              Now make preIdx point to targetIdx next. This will remove the node in middle.
            */
            const preIdx = this.traverseToIndex(index - 1)
            const targetIdx = preIdx.next
            const targetVal = targetIdx.value
            const nextIdx = targetIdx.next
            preIdx.next = nextIdx
            nextIdx.prev = preIdx
            this.length--
            return targetVal
        }
    }
  
  	reverse() {
      // Checkup - if list only contains one item, no need to reverse
      if (this.length === 0) return
      // do not reverse if there is a single element
      if (this.length === 1) return
      
      // We'll use 3 pointers. Prev and Next is empty at the start
      let previousNode = null
      let currentNode = this.head
      let nextNode = null

      // It is quite similar to doubly linked list reverse, the main difference is we can't use null termination as an exit condition - due to dealing with a circular list.
      // To tackle this issue, we will be using "Referential equality" instead of comparing Node values as the exit condition (which is figuring out if we come back to the head node again).
      // When strict equality operator is used in reference types in JS, it checks if compared values referencing the same object instance. This is useful when you need to compare references.
      do {
          // Store next node reference
          nextNode = currentNode.next
         	// Store prev node reference
          previousNode = currentNode.prev

        	// Change next node of the current node so it would link to previous node.
          currentNode.next = previousNode
          currentNode.prev = nextNode
        
        // Move prevNode and currNode nodes one step forward.
          previousNode = currentNode
          currentNode = nextNode
        
        // console.log(previousNode.value, currentNode.value, nextNode.value)
      } while (currentNode !== this.head)
      
        // Set the new tail with this.head (it contains the last item at this point of time):
        this.tail = this.head
     		 // Now reference this head to previousNode (contains the reversed list):
       	this.head = previousNode

      	return this.toArray()
    }

    buscarCircular(indice){
      let aux = this.head 
      while (aux!=null){
          if(aux.value == indice){
              document.write("Si aparece "+aux.value)
              
              return aux
              }

          aux = aux.next
          
      }
          
          
          
      return this
  }

    graficarlistaCircular(){
      var codigodot = "digraph G{\nlabel=\"Lista Circular Doblemente Enlazada \";\nnode [shape=box];\n";
      var temporal = this.head
      var conexiones ="";
      var nodos ="";
      var numnodo= 0;
      while (temporal != null) {
          nodos+=  "N" + numnodo + "[label=\"" + temporal.value + "\" ];\n"
          if(temporal.next != (null||this.head)){
              var auxnum = numnodo+1
              conexiones += "N" + numnodo + " -> N" + auxnum + ";\n"
              conexiones += "N" +auxnum + " -> N" + numnodo  + ";\n"
          }
          else if(temporal.next==this.head){
              var auxnum = numnodo+1
              //Agrega la flecha del fin al inicio
              conexiones += "N" + numnodo + " -> N0" + ";\n"
              //Agrega la flecha del inicio al fin
              conexiones += "N0" + " -> N"+ numnodo + ";\n"
              break
              
          }
          temporal = temporal.next
          numnodo++;            
      }
      codigodot += "//agregando nodos\n"
      codigodot += nodos+"\n"
      codigodot += "//agregando conexiones o flechas\n"
      codigodot += "{rank=same;\n"+conexiones+"\n}\n}"
      console.log(codigodot)
      //var arreglo = [0,2,3,4,5]
      d3.select("#lienzoPlaylist").graphviz()
          .width(900)
          .height(500)
          .renderDot(codigodot)
  }

}

var playlistCanciones = new CircularDoublyLinkedList();

//////////////////////////////////////////////////////////////Empieza lo referente a la pila amigos (Amigos)

class nodeStack 
{
  constructor (data, next) 
  {
    this.data = data
    this.next = null
  }

}

class Stack
{
  constructor () 
  {
    this.top = null
    
  }

  push(ele)
  {
	  var node=new nodeStack(ele)
	  console.log(node)
	  node.next=this.top
	  this.top=node
      
  }

  pop()
  {
	  var temp=this.top
	  this.top=this.top.next
	  temp=null
      
  }

  display()
  {
    
      var temp=this.top
      while(temp!=null)
      {
        console.log(temp.data)
        temp=temp.next
      }
  }

  mostrarAmigos(){
    var temporal = this.top
    

    const selecAmigos = document.getElementById("selectAmigos");

    while(temporal!=null){
       
      
       var  optionAmigos = document.createElement("option");
       optionAmigos.value = temporal.data
       optionAmigos.text =  temporal.data;
       temporal= temporal.next
       selecAmigos.appendChild(optionAmigos);

    }
    
 }

 enviarAmigos(){

  const amigos = document.querySelector('#selectAmigos');
  console.log(amigos)
  amigos.addEventListener('change', () => {
    let valorOption = amigos.value;
    console.log(valorOption);

    var optionSelect = amigos.options[amigos.selectedIndex];

    console.log("Opción:", optionSelect.text);
    console.log("Valor:", optionSelect.value);

    /*Mostrando el resultado en el input*/
  let  inputResult = document.querySelector('#resultAmigos').value=(optionSelect.value);
    
  });


 }

  graficarpila(){
    var codigodot = 'digraph G { label=" PILA AMIGOS";node [shape=box]; \n ';
    codigodot += 'rankdir = LR; \n'
    var temporal = this.top
   
    var nodos ="";
    
    while (temporal != null) {
        nodos+=   temporal.data + '\n'
        temporal = temporal.next        
    }
    codigodot += nodos+'}'
    
    console.log(codigodot)
    d3.select("#lienzoDeAmigos").graphviz()
        .width(900)
        .height(500)
        .renderDot(codigodot)
    }

  
}

var pilaDeAmigos = new Stack();


////////////////////////////////////////////////////////////////////////Empieza lo referente a bloqueados (usuarios - amigos)

class NodoColaBloqueados{
    constructor(inf){
        this.inf=inf
        this.siguiente=null
    }
  }
  
  
  
  class colaBloqueados{
    constructor(){
        this.primero=null
        this.ultimo=null
        var length=0
        
    }
  
  
  
    //metodos de la cola
  
    insertar(inf){
        
        let temporal=new NodoColaBloqueados(inf)
  
        if(this.primero==null){
            this.primero=temporal
            this.ultimo=temporal
            length++;
        }
        else{
            this.ultimo.siguiente=temporal
            this.ultimo=temporal
            length++;
        }
  
    }
  
    mostrar(){
        let temporal=this.primero
  
        while(temporal!=null){
            document.write(temporal.inf+"<br>")
            temporal=temporal.siguiente
        }
        document.write("<br>")
        document.write(length+"<br>")
    }
  
  
    eliminarPrimero(){
        if(this.primero==null){
            alert("Cola no creada")
        }
        else{
            
  
            this.primero = this.primero.siguiente
            length--;
        }
    }
  
  
    // nos va ayudar a buscar los nodos
    getTheIndex() {
        let counter = 0;
        let currentNode = this.primero;
    
        while (counter < length-2) {
          currentNode = currentNode.siguiente;
          counter++;
         
        }
        //document.write(currentNode.inf+"<br>")
        return currentNode;
      }
  
  
  
    eliminarUltimo(){
          if(this.primero==null){
              alert("Cola no creada")
          }
          else{
              
              let firstPointer = this.getTheIndex();
              let pointerToRemove = this.ultimo.siguiente;
              firstPointer.siguiente = null;
              length--;
          }
      }
  
  
    graficarColaBloqueados(){
        var codigodot = 'digraph G { label=" Cola Bloqueados";node [shape=box]; \n '+' a0 [label=< <TABLE border="5"  cellpadding="10" bgcolor="black">';
        var temporal = this.primero
       
        var nodos ="";
        var numnodo= 0;
        while (temporal != null) {
            nodos+=  ' <TR><TD border="3" style="radial" bgcolor="white"  gradientangle="60"> ' + temporal.inf + '</TD></TR>  \n'
            
            temporal = temporal.siguiente
            numnodo++;            
        }
        codigodot += "//agregando FILAS PARA LA TABLA\n"
        codigodot += nodos+'</TABLE>>];}'
        
        console.log(codigodot)
        //var arreglo = [0,2,3,4,5]
        d3.select("#lzBoqueados").graphviz()
            .width(900)
            .height(500)
            .renderDot(codigodot)
    }
  
  
  }
  
  var colaDeBloqueados=new colaBloqueados()


////////////////////////////////////////////////////////////////////////////FUNCIONES GENERALES

function iniciarSesion(){
    
    var usuario, contrasenia;
  
    usuario=document.getElementById("username2").value;
    contrasenia=document.getElementById("password2").value;
  
  
    var UsuarioBuscar= usuarios.buscar(usuario)
  
    if(usuario=="EDD" && contrasenia=="123" || UsuarioBuscar.admin == true && usuario== UsuarioBuscar.usuario &&  contrasenia== UsuarioBuscar.contrasenia){
        alert(" HOLA ADMINISTRADOR")  
        administrador()
        
    }
    else if(usuario==UsuarioBuscar.usuario && contrasenia==UsuarioBuscar.contrasenia ){
        alert("HOLA: "+UsuarioBuscar.nombre)
        mostrarUsuario();
        
    }
  
    else{
        alert("Nombre de usuario o contraseña incorrecto")
    }   
}

function cerrarSesion(){
    alert("Sesion cerrado")
    inicio()
    
}


function publicarCancion(){
    var artista = document.getElementById("nombreArtista").value;
    var cancion = document.getElementById("nombreCancion").value;
    artistas .add(artista)
    artistas .add2(artista,cancion)
    alert("Cancion publicada!!")
}

function borrarOptionsArtista() {
    document.getElementById("selectArtistas").innerHTML= "";
}

function agregarPlaylist(){
    var resultado;
  
    resultado=document.getElementById("result").value;
    playlistCanciones.append(resultado);
    alert("Cancion agregada a la playlist!")
    console.log(playlistCanciones);
  }

function borrarUsuariosSelect() {
    document.getElementById("selectUsuarios").innerHTML= "";
}


function agregarPilaAmigos(){
    var amigo;
  
    amigo=document.getElementById("resultUsuarios").value;
    pilaDeAmigos.push(amigo);
    alert("El amigo ha sido añadido!!")
    pilaDeAmigos.graficarpila()
    console.log(pilaDeAmigos);
  }
function popAmigo(){
 pilaDeAmigos.pop();
  alert("El amigo ha sido eliminado")
  pilaDeAmigos.graficarpila();
  console.log(pilaDeAmigos);
}

function borrarAmigosSelect() {
    document.getElementById("selectAmigos").innerHTML= "";
}

function bloquearUsuario(){
    var usuario;
  
    usuario=document.getElementById("resultUsuarios").value;
    colaDeBloqueados.insertar(usuario);
    alert("El usuario ha sido bloqueado!!")
    console.log(colaDeBloqueados);
}

  function desbloquearUsuario(){
    colaDeBloqueados.eliminarPrimero()
    alert("El usuario ha sido desbloqueado!!")
    colaDeBloqueados.graficarColaBloqueados()
    console.log(colaDeBloqueados);

}

function inicio(){
    document.getElementById('CargaDeUsuarios').style.display = 'none';
    document.getElementById('CargaDeArtistas').style.display = 'none';
    document.getElementById('CargaDeCanciones').style.display = 'none';
    document.getElementById('CargaDePodcast').style.display = 'none';
    document.getElementById('CargaDeMusicaProgramada').style.display = 'none';
    document.getElementById('InfefazUsuario').style.display = 'none';
    document.getElementById('ShowSongs').style.display = 'none';
    document.getElementById('listaAmigos').style.display = 'none';
    document.getElementById('podcast').style.display = 'none';
    
  }
  
  function administrador(){
    document.getElementById('CargaDeUsuarios').style.display = '';
    document.getElementById('CargaDeArtistas').style.display = '';
    document.getElementById('CargaDeCanciones').style.display = '';
    document.getElementById('CargaDePodcast').style.display = '';
    document.getElementById('CargaDeMusicaProgramada').style.display = '';
    document.getElementById('InfefazUsuario').style.display = '';
    document.getElementById('ShowSongs').style.display = '';
    document.getElementById('listaAmigos').style.display = '';
    document.getElementById('podcast').style.display = '';
 

  }
  
  function mostrarUsuario(){
    document.getElementById('CargaDeUsuarios').style.display = 'none';
    document.getElementById('CargaDeArtistas').style.display = 'none';
    document.getElementById('CargaDeCanciones').style.display = 'none';
    document.getElementById('CargaDePodcast').style.display = 'none';
    document.getElementById('CargaDeMusicaProgramada').style.display = 'none';
    document.getElementById('InfefazUsuario').style.display = '';
    document.getElementById('ShowSongs').style.display = '';
    document.getElementById('listaAmigos').style.display = '';
    document.getElementById('podcast').style.display = '';
 
  }

inicio()