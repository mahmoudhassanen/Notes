import React, { useEffect, useState } from 'react'
import jwtDecode from 'jwt-decode';
import axios from 'axios';

export default function Home(props) {
    const [Notes, setNotes] = useState([])
let token = localStorage.getItem('userToken')
let baseUrk = 'https://route-egypt-api.herokuapp.com/'
let decode = jwtDecode(token)
console.log(decode)
let userID = decode._id;
console.log(userID)
async function GetAllNotes() {
    let {data} = await axios.get(baseUrk+"getUserNotes",{
        headers : {
            token,
            userID
        }

    })
    console.log(data)
    if (data.message === 'success') {
        setNotes(data.Notes)
    }
    // else
    // {
    //     setNotes([])
        
    // }
}
//////////////////////// add Notes ///////// 
const [AddNotes, setAddNotes] = useState({
    title : '',
    desc : '',
    userID,
    token,

})
function getDataNote(e) {
    let note = {...AddNotes}
    note[e.target.name] = e.target.value;
    setAddNotes(note)
    console.log(AddNotes)
    
}
 async function AddNote(e) {
    e.preventDefault();
    let {data} = await axios.post(baseUrk+"addNote",AddNotes)
    console.log(data)
    if (data.message = 'success') {
    GetAllNotes();
        
    }
}
async function deleteNote(NoteID) {
    let {data} = await axios.delete(baseUrk+"deleteNote",{
        data:{
            NoteID,
            token
        }
    })
    GetAllNotes();

}

useEffect(() => {
  GetAllNotes()
}, [])


  return (

    <div>
      
          <div className="container my-5">
                <div className="col-md-12 text-end">
                    <a className="add p-2 btn" data-bs-toggle="modal" data-bs-target="#exampleModal"><i className="fas fa-plus-circle"></i> Add
                        New</a>
                </div>
            </div>


            {/* <!-- Modal --> */}
            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <form onSubmit={AddNote}>
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <input onChange={getDataNote}  placeholder="Type Title" name="title" className="form-control" type="text" />
                                <textarea onChange={getDataNote}   className="form-control my-2" placeholder="Type your note" name="desc" id="" cols="30" rows="10"></textarea>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                                <button   data-bs-dismiss="modal" type="submit" className="btn btn-info"><i className="fas fa-plus-circle"></i> Add Note</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>



            {/* <!-- ==========================Notes=============================== --> */}

            <div className="container">
                <div className="row">

                   
                {Notes.map((note, index) => {
                        return (
                            <div key={index} className="col-md-4 my-4">
                                <div className="note p-4">
                                    <h3 className="float-start">{note.title}</h3>
                                    <a   ><i className="fas fa-edit float-end edit"></i></a>
                                    <a onClick={() => { deleteNote(note._id) }}> <i className="fas fa-trash-alt float-end px-3 del"></i></a>
                                    <span className="clearfix"></span>
                                    <p>{note.desc}</p>
                                </div>
                            </div>
                        )
                    })}
                   
                </div>
            </div>
    </div>
  )
}
