import React, { useState } from 'react'
import { useDropzone } from "react-dropzone";
const QuizAssingment = (props) => {
   const [title, setTitle] = useState("");
   const [instructions, setInstructions] = useState("");
   const [files, setFiles] = useState([]);
 
   const onDrop = (acceptedFiles) => {
     setFiles((prevFiles) => [...prevFiles, ...acceptedFiles]);
   };
 
   const { getRootProps, getInputProps } = useDropzone({
     onDrop,
     accept: ".pdf, .docx, .xlsx, .jpg, .png",
     maxSize: 5 * 1024 * 1024, // 5MB
   });
 
   const removeFile = (fileName) => {
     setFiles(files.filter((file) => file.name !== fileName));
   };
 
   return (
     <>
         <div className="mb-3">
           <label className="form-label">Title</label>
           <input
             type="text"
             className="form-control"
             value={title}
             onChange={(e) => setTitle(e.target.value)}
             placeholder="Enter assignment title"
           />
         </div>
         <div className="mb-3">
           <label className="form-label">Instructions (optional)</label>
           <textarea
             className="form-control"
             rows="3"
             value={instructions}
             onChange={(e) => setInstructions(e.target.value)}
             placeholder="Add instructions..."
           ></textarea>
         </div>
         <h6>Attach Files</h6>
         <div
           {...getRootProps()}
           className="dropzone border border-primary rounded p-4 text-center"
           style={{ backgroundColor: "#f8f9fa", cursor: "pointer" }}
         >
           <input {...getInputProps()} />
           <p className="mb-0 text-muted p-4">Drag & drop files here, or click to upload</p>
         </div>
         <div className="mt-3">
           {files.map((file, index) => (
             <div key={index} className="d-flex align-items-center mb-2">
               <span className="me-2">{file.name}</span>
               <button
                 className="btn btn-link text-danger p-0"
                 onClick={() => removeFile(file.name)}
               >
                 Remove
               </button>
             </div>
           ))}
         </div>
         <div className="row mt-4">
           <div className="col-md-6 mb-3">
             <label className="form-label">For</label>
             <select className="form-select">
               <option>All Students</option>
               <option>Group A</option>
               <option>Group B</option>
             </select>
           </div>
           <div className="col-md-6 mb-3">
             <label className="form-label">Points</label>
             <select className="form-select">
               <option>100</option>
               <option>50</option>
               <option>25</option>
             </select>
           </div>
           <div className="col-md-6 mb-3">
             <label className="form-label">Due</label>
             <select className="form-select">
               <option>No due date</option>
               <option>Today</option>
               <option>Tomorrow</option>
             </select>
           </div>
           <div className="col-md-6 mb-3">
             <label className="form-label">Topic</label>
             <select className="form-select">
               <option>No topic</option>
               <option>Math</option>
               <option>Science</option>
             </select>
           </div>
         </div>
         <div className="mt-4" style={{ float : "right"}}>
           <button  className="btn btn-primary me-2">Save</button>
           <button  onClick={props.toggleQuizAssingmentModal} className="btn btn-secondary">Cancel</button>
         </div>
  </>   
   )
}

export default QuizAssingment