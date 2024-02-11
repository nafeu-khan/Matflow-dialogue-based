import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import "regenerator-runtime/runtime";
import SpeechRecognition, {
  useSpeechRecognition,listening
} from "react-speech-recognition";
import Papa from "papaparse";
import useClipboard from "react-use-clipboard";
import {
  AiFillAudio,
  AiOutlineClear,
  AiFillCopy,
  AiOutlineFileDone,
  AiOutlineAudioMuted,
} from "react-icons/ai";
import TTS from "./components/TTS";
import FileModal from "./components/FilesModal/FileModal";
import { csvNameContext } from "./util/csvNameContext";
import DatasetDisplay from "./components/DatasetDisplay/DatasetDisplay";

function App() {
  const [botText, setbotText] = useState("");
  const [islistening, setislistening] = useState(true);
  const [userText, setUserText] = useState("");
  const [textToCopy, setTextToCopy] = useState();
  const [isCopied, setCopied] = useClipboard(textToCopy, {
    successDuration: 1000,
  });
  localStorage.setItem("uploadedNames",JSON.stringify([""]))
  const [csvNames,setcsvNames]=useState(JSON.parse(localStorage.getItem("uploadedNames")));

  useEffect(() => {
    if (userText) {
      async function fetchData() {
        try {
          SpeechRecognition.stopListening();
          const response = await axios.post(
            "http://localhost:8000/api/recognize-speech/",
            { text: userText ,csvNames }
          );
          console.log(response.data)
          setbotText(response.data);
        setcsvNames(JSON.parse(localStorage.getItem("uploadedNames")))
            console.log("in eff",csvNames)
        } catch (error) {
          console.error(error);
        }
      }
      fetchData();
    }
  }, [userText]);
  const startListening = () => {
    setislistening(false);
    SpeechRecognition.startListening({ continuous: true, language: "en-US" });
  };
  const { transcript, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();
  // useEffect(() => {
  //   if (transcript && transcript !== "") {
  //     setTimeout(() => {
  //        setUserText([...userText, transcript]);
  //     }, );
  //   }
  // }, [transcript]);
  if (!browserSupportsSpeechRecognition) {
    return null;
  }
  const handleFileUpload = async (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onload = async (e) => {
      const csvData = e.target.result;
      const parsedData = Papa.parse(csvData, { header: false }).data;
      await storeDataInIndexedDB(parsedData);

      console.log("CSV data stored in IndexedDB!");
    };

    reader.readAsText(file);
  };

  const handleSend = () => {
    setUserText(transcript);
    resetTranscript();
    setcsvNames(JSON.parse(localStorage.getItem("uploadedFiles")))
    // TTS(botText); 
    console.log("in app ",csvNames)
  };

  return (
    <>
      <div className="chat-container">
        <div className="chat-header">
          <div style={{justifyContent:"right",textAlign: "left"}}>
            <csvNameContext.Provider value={{csvNames,setcsvNames}}>< FileModal/></csvNameContext.Provider>
          </div>
          <h2>Matflow</h2>
        </div>
        <div className="chat-messages" id="chatMessages">
          <div className="messageUser">
            <div
              className="message-content"
              onClick={() => setTextToCopy(transcript)}
            >
              {/* // usertext */}
              {/* {userText} */}
              {transcript}
            </div>
          </div>

          <div className="messageChatbot">
            <div
              className="message-content"
              onClick={() => setTextToCopy(transcript)}
            >
              {botText.text} {/*//bot text*/}
              {/* {transcript} */}
              {console.log("main " ,csvNames,typeof(csvNames))}
              {botText.action =="DatasetDisplay"&&
              <DatasetDisplay csvNames={csvNames}/>
              }
            </div>
          </div>
        </div>
        <div className="prompt_wrap">
          <span className="prompt-buttons">
            {/* <button></button> */}
          </span>
        </div>
        <input type="file" name="csv" onChange={handleFileUpload} />
        <div className="chat-input">
          <input type="text" id="userInput" value={userText} placeholder="Type a message..." />
          <button id="sendButton" onClick={handleSend}>
            Send
          </button>
          {islistening ? (
            <button onClick={startListening}>
              <AiFillAudio />
            </button>
          ) : (
            <button
              onClick={() => {
                setislistening(true);
                SpeechRecognition.stopListening();
              }}
            >
              <AiOutlineAudioMuted />
            </button>
          )}
          {/* <Recorder
            onRecordingComplete={(audioBlob) => handleAudioUpload(audioBlob)}
            showUIAudio
            saveAudioFile
          /> */}
        </div>

        <div className="btn-style">
          <button onClick={setCopied}>
            {isCopied ? <AiOutlineFileDone /> : <AiFillCopy />}
          </button>

          <button
            onClick={() => {
              setbotText("");
              setUserText("");
              resetTranscript();
            }}
          >
            <AiOutlineClear />
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
