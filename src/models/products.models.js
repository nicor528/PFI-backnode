import { db } from "../data/data.js";
import { doc, getDoc, collection, getDocs, setDoc, addDoc, updateDoc, deleteDoc, } from "firebase/firestore";

export function obtenerProducto(id){
  return new Promise(async (res, rej) => {
    try{
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Snap data: ", docSnap)
        console.log("Document ID:", docSnap.id);
        console.log("Document data:", docSnap.data());
        res(docSnap.data())
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
        res()
      }
    }catch(error){
      console.log(error)
      rej(error)
    }
  })
  
}
//obtenerProducto(id)

export function obtenerProductos(){
  return(
    new Promise(async (res, rej) => {
      try{
        const querySnapshot = await getDocs(collection(db, "products"));
        console.log("Snap completa: ", querySnapshot)
        const productos = []
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          productos.push({...doc.data(), id: doc.id}) 
        });
        console.log(productos)
        res(productos)
      }catch(error){
        console.log(error)
        rej(error)
      }
    })
  )
}
obtenerProductos()

export function agregarProducto(producto){
  return(
    new Promise(async (res, rej) => {
        try{
          const docRef = await addDoc(collection(db, "products"), producto);
          console.log("Doc ID: ", docRef.id, "Producto: ", docRef)
          res({...producto, id: docRef.id})
        }catch(error){
          console.log(error)
          rej(error)
        }
    })
  )

}

//agregarProducto({nombre: "yerba", categoria: "infusion", precio: 200})
/*
export function actualizarProducto(id, producto){
  return(
    new Promise(async (res, rej) => {
      try{
        await updateDoc(doc(db, "products", id), {
          ...producto
        })
        console.log("producto actualizado")
        res({})
      }catch(error){
        console.log(error)
        rej(error)
      }
    })
  )

}*/

//actualizarProducto({id: "6VOeGkGEHLxBrdU3QVzV", precio: 220})

export function eliminarProducto(id){
  return(
    new Promise(async (res, rej) => {
      try{
        await deleteDoc(doc(db, "products", id));
        console.log("Producto eliminado")
        res()
      }catch(error){
        console.log(error)
        rej(error)
      }
    })
  )

}
