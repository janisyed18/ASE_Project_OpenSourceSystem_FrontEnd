import React, { useEffect, useState } from 'react';
 
function Detail(props) {

const id= props.match.params.id;

const [book, setBook] = useState({
  id:"",
  title:"",
  author:""
});


useEffect(()=>{ 
  fetch("http://localhost:8080/book/" + id, {method:"GET"})
  .then(res =>res.json())
  .then(res=>{
    setBook(res)});
},[])

  return (
    <div>
        <h1> Book Info. </h1>
        <hr/>
        <h3>{book.author}</h3>
        <h1>{book.title}</h1>
    </div>
  );
}

export default Detail;
