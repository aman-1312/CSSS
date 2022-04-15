import "./styles/App.css";
import FileUpload from "./components/FileUpload";
import InfoForm from "./components/forms/InfoForm";
import ThankYou from "./components/ThankYou";
import Alert from "./components/Alert";
import { AlertState } from "./context/AlertContext";
import { AnimatePresence } from "framer-motion";
function App() {
  const { isForm, isThankYou, isUpload } = AlertState();
  return (
    <>
      <div className="App">
        <AnimatePresence>
          <header className="App-header">
            {isUpload && <FileUpload />}

            {isForm && <InfoForm />}

            <ThankYou />

            <Alert />
          </header>
        </AnimatePresence>
      </div>
      <div className="area">
          <ul className="circles">
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
    </>
  );
}

export default App;
