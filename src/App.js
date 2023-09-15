import React from "react";
import "./index.css";
import "./App.css";
// @component
import EachContact from "./component/EachContact";
import ChatDashboard from "./component/ChatDashboard";
import InputSearch from "./component/InputSearch";
import Header from "./component/Header";

// @api
import PhoneNumberModal from "./component/PhoneNumberModal";
import NewParticipantModal from "./component/NewParticipantModal";
import { socket } from "./config/socket";

function App() {
  const [message, setMessage] = React.useState("");
  const [search, setSearch] = React.useState("");
  const [participantModal, setParticipantModal] = React.useState(false);

  const [phone, setPhone] = React.useState("");
  const [messageList, setMessageList] = React.useState([]);
  const [activeParticipant, setActiveParticipant] = React.useState({
    participantId: undefined,
    to: undefined,
  });

  const [contact, setContact] = React.useState([]);

  const onSend = () => {
    const chunk = {
      msg: message,
      from: phone,
      time: new Date(),
      ...activeParticipant,
    };
    setMessageList([...messageList, chunk]);

    socket.emit("chat", chunk);
  };

  const contactSearch = search
    ? contact.filter((state) => String(state.phone).indexOf(search) !== -1)
    : contact;

  React.useEffect(() => {
    socket.on("chat", (message) => {
      console.log("receive", message);
      if (message.participantId) {
        console.log(messageList);
        console.log(message);
        setMessageList([...messageList, message]);
      }
    });
  }, []);

  React.useEffect(() => {
    const onTyping = () => {
      socket.emit("typing", {
        ...activeParticipant,
      });
    };
    const triggerCall = setTimeout(() => {
      onTyping();
    }, 500);
    return () => clearTimeout(triggerCall);
  }, [message]);
  return (
    <div className="App h-screen flex  items-stretch ">
      <Header />
      {!phone && (
        <PhoneNumberModal setPhone={setPhone} setContact={setContact} />
      )}
      {participantModal && (
        <NewParticipantModal
          setParticipantModal={setParticipantModal}
          contact={contact}
          setContact={setContact}
          phone={phone}
        />
      )}
      <div className="container  flex flex-row mx-auto pt-[5rem]">
        <div className="w-1/3  bg-rose-400">
          <InputSearch search={search} setSearch={setSearch} />
          <EachContact
            contactSearch={contactSearch}
            setParticipantModal={setParticipantModal}
            phone={phone}
            setActiveParticipant={setActiveParticipant}
            setMessageList={setMessageList}
          />
        </div>
        <div className="w-full flex flex-col items-stretch bg-rose-50">
          <ChatDashboard messageList={messageList} phone={phone} />
          <div className="w-full justify-self-end flex  px-8 pb-5">
            <input
              className="w-full h-10 p-3"
              placeholder="Write a message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button className="px-10 bg-blue-500" onClick={onSend}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
