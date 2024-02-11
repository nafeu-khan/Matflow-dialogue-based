import React, { useContext, useEffect, useRef, useState } from "react";
import { AiFillCloseCircle } from "react-icons/ai";
import { BsFillPlayFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteIndexedDB,
  parseCsv,
  parseExcel,
  storeDataInIndexedDB,
  fetchDataFromIndexedDB
} from "../../util/indexdb";
import { setActiveFunction } from "../../Slices/SideBarSlice";
import { setActiveFile, setReRender } from "../../Slices/UploadedFileSlice";
import { csvNameContext } from "../../util/csvNameContext";
import { toast } from "react-toastify";

const Fileupload=({modalopen})=> {
  const [files, setFiles] = useState([]);
  const [fileActiveId, setFileActiveId] = useState();
  const [uploadedFile, setUploadedFile] = useState("");
  const [uploadSectionHeight, setUploadSectionHeight] = useState(0);
  const inputRef = useRef();
  const uploadSection = useRef();
//   const render = useSelector((state) => state.uploadedFile.rerender);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     setUploadSectionHeight(uploadSection.current.clientHeight);
//     const tempFiles = localStorage.getItem("uploadedFiles");
//     if (tempFiles) {
//       setFiles(JSON.parse(tempFiles));
//     }
//     const tempActiveFile = localStorage.getItem("activeFile");
//     if (tempActiveFile) {
//       dispatch(setActiveFile(JSON.parse(tempActiveFile)));
//       setFileActiveId(JSON.parse(tempActiveFile).name);
//     }
//   }, [dispatch, render]);

//   const handleDrag = (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//   };

//   const handleDrop = async (e) => {
//     e.preventDefault();
//     e.stopPropagation();
//     if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      
//       const file = e.dataTransfer.files[0];
//       setUploadedFile(file);
//       let parsedData;
//       const type = file.name.split(".").slice(-1)[0];
//       if (type === "csv") {
//         parsedData = await parseCsv(file);
//       } else {
//         parsedData = await parseExcel(file);
        
//       }
      
//       storeDataInIndexedDB(parsedData, file.name);
//     }
//   };

//   const handleDelete = async (name) => {
//     const tempFiles = files.filter((item) => item.name != name);
//     setFiles(tempFiles);
//     localStorage.setItem("uploadedFiles", JSON.stringify(tempFiles));
//     if (name === fileActiveId) {
//       localStorage.removeItem("activeFile");
//       dispatch(setActiveFile(null));
//       setFileActiveId("");
//       dispatch(setActiveFunction(""));
//       localStorage.removeItem("activeFunction");
//     }
    
//     await deleteIndexedDB(name);
//   };

//   const handleFileSelect = (name) => {
//     setFileActiveId(name);
//     const active = files.filter((item) => item.name === name)[0];
//     dispatch(setActiveFile(active));
//     localStorage.setItem("activeFile", JSON.stringify(active));
//     dispatch(setActiveFunction(localStorage.getItem("activeFunction")));
    
//     dispatch(setReRender(!render));
//   };

  const {csvNames,setcsvNames}=useContext(csvNameContext)
const handleFileChange = async (e) => {
   const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };
  console.log(csvNames)
  const handleFileUpload = async (e) => {
    if (uploadedFile) {
      const tempFiles = [...files, uploadedFile.name];
      setFiles(tempFiles);
      localStorage.setItem("uploadedFiles", JSON.stringify(tempFiles));
      let a=JSON.parse(localStorage.getItem("uploadedNames"))
      console.log(a)
      a.push(uploadedFile.name)
      localStorage.setItem("uploadedNames",JSON.stringify(a))
      setcsvNames(localStorage.getItem("uploadedNames"))
      let parsedData;
      const type = uploadedFile.name.split(".").slice(-1)[0];
      if (type === "csv") {
        parsedData = await parseCsv(uploadedFile);
      } else {
        parsedData = await parseExcel(uploadedFile);
        // console.log(parsedData);
      }
      await storeDataInIndexedDB(parsedData, uploadedFile.name);
      setUploadedFile("");
      toast.success(`${uploadedFile.name} is uploaded successfully`)
      modalopen(false)

    //   dispatch(setReRender(!render));
    }
  };
  console.log(csvNames)
  return (
    <div
      className="flex flex-col h-full justify-between"
      style={{ minHeight: `calc(100% - ${uploadSectionHeight}px)` }}
    >
      {/* <div className="p-2 w-full h-full overflow-y-auto">
        {files && files.length > 0 ? (
          files.map((item, ind) => {
            return (
              <div key={ind}>
                <div
                  className={`flex cursor-pointer  items-center group justify-between mt-2 px-2 py-3 rounded ${
                    fileActiveId === item.name
                      ? "bg-[#287e5a] text-gray-100"
                      : "text-gray-300 hover:bg-[#276a4e] hover:text-gray-100"
                  }`}
                >
                  <p
                    className={`flex w-full tracking-wide gap-1 items-center ${
                      fileActiveId === item.name ? "font-bold" : ""
                    }`}
                    onClick={() => handleFileSelect(item.name)}
                  >
                    {" "}
                    <span>
                      {fileActiveId === item.name && <BsFillPlayFill />}
                    </span>{" "}
                    <span className="w-full">{item.name}</span>
                  </p>
                  <button
                    className="hidden group-hover:flex z-[9999] "
                    onClick={() => handleDelete(item.name)}
                  >
                    <AiFillCloseCircle />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-center mt-4 font-bold text-white tracking-wide">
            Please upload a file
          </p>
        )}
      </div> */}
      <div
        className="p-2 pt-4 rounded text-end border-t border-gray-400"
        // onDragEnter={handleDrag}
        // onDragLeave={handleDrag}
        // onDragOver={handleDrag}
        // onDrop={handleDrop}
        // ref={uploadSection}
      >
        <form
        //   onDragEnter={handleDrag}
        //   onDragLeave={handleDrag}
        //   onDragOver={handleDrag}
        //   onDrop={handleDrop}
          onSubmit={(e) => e.preventDefault()}
          className="bg-emerald-600 rounded py-2 text-gray-300 border-[#cbd5e1] text-center border-2 border-dashed"
        >
          <label htmlFor="input-file-upload" className="">
            <p className="text-sm">Drag and drop your file or</p>
            <p><u>Upload a File</u></p>
            

            {uploadedFile ? (
              <p className="font-bold text-gray-100 tracking-wide text-md">
                {uploadedFile.name}
              </p>
            ) : (
              <p> No file found</p>
              // <p className="text-xs font-light">Limit 200MB per file</p>
            )}
          </label>
          <input
            ref={inputRef}
            type="file"
            id="input-file-upload"
            hidden
            onChange={handleFileChange}
          />
        </form>
        <button
          className="mt-2 outline-none bg-primary-btn text-slate-100 text-sm font-medium px-4 py-2 rounded text"
          onClick={handleFileUpload}
        >
          Upload
        </button>
      </div>
    </div>
  );
}

export default Fileupload;
