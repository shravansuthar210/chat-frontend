import React from "react";
import { getAllmsg } from "../api";
import { socket } from "../config/socket";

const EachContact = ({
  contactSearch,
  setParticipantModal,
  phone,
  setActiveParticipant,
  setMessageList,
}) => {
  const [TypingId, setTypingId] = React.useState("");
  const getAllMsg = async (participantId, to) => {
    try {
      const msg = await getAllmsg(participantId);
      setMessageList([...msg.data.msg]);
      setActiveParticipant({ participantId, to });
    } catch (error) {
      alert(error);
    }
  };
  React.useEffect(() => {
    socket.on("typing", (message) => {
      setTypingId(message.participantId);
    });
  }, []);

  React.useEffect(() => {
    const typingFalse = () => {
      setTypingId("");
    };
    const triggerCall = setTimeout(() => {
      typingFalse();
    }, 2000);
    return () => clearTimeout(triggerCall);
  }, [TypingId]);

  return (
    <div className="mx-auto divide-y-2 ">
      {contactSearch.map((item) => {
        const { _id, mobile, typing } = item;
        const to = mobile.filter((state) => state !== phone)[0];
        const opposite = item?.mobile?.filter((state) => state !== phone);
        return (
          <div
            onClick={() => {
              getAllMsg(_id, to);
            }}
            key={_id}
            className="flex items-center gap-2 my-1 py-1 px-10 cursor-pointer "
          >
            <div className="rounded-full h-10 w-12 bg-white flex justify-center items-center font-semibold text-lg">
              {String(opposite)[0]}
            </div>
            <div className="flex flex-col">
              <span className="w-full text-left font-semibold">{opposite}</span>
              <span className="text-sm">{TypingId === _id && "typing..."}</span>
            </div>
          </div>
        );
      })}
      <Plus setParticipantModal={setParticipantModal} />
    </div>
  );
};

const Plus = ({ setParticipantModal }) => (
  <div
    className="flex justify-center border-b-2 my-1 py-1 px-10 cursor-pointer "
    onClick={() => setParticipantModal(true)}
  >
    <svg
      enable-background="new 0 0 50 50"
      height="50px"
      id="Layer_1"
      version="1.1"
      viewBox="0 0 50 50"
      width="50px"
    >
      <rect fill="none" height="50" width="50" />
      <line
        fill="none"
        stroke="#000000"
        stroke-miterlimit="10"
        stroke-width="4"
        x1="9"
        x2="41"
        y1="25"
        y2="25"
      />
      <line
        fill="none"
        stroke="#000000"
        stroke-miterlimit="10"
        stroke-width="4"
        x1="25"
        x2="25"
        y1="9"
        y2="41"
      />
    </svg>
  </div>
);

export default EachContact;
