import React from "react";
import { getAllMyParticipant } from "../api";
import { socket } from "../config/socket";

const PhoneNumberModal = ({ setPhone, setContact }) => {
  const [phoneTemp, setPhoneTemp] = React.useState("");
  const onLogin = async () => {
    setPhone(phoneTemp);
    try {
      const contact = await getAllMyParticipant(phoneTemp);
      console.log(contact.data);
      const participantId = contact.data.participant.map((item) => item._id);
      socket.emit("join chat", { participantId });

      setContact([...contact.data.participant]);
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div className="flex justify-center items-center overflow-x-hidden bg-gray-500  overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <div className="relative w-auto my-6 mx-auto max-w-3xl">
        <div className="border-0 rounded-lg w-96 shadow-lg relative flex flex-col  bg-white outline-none focus:outline-none">
          <div className="flex flex-col gap-3 items-start justify-between p-5  ">
            <h3 className="text-xl font=semibold">Login</h3>
            <input
              className="shadow appearance-none border rounded w-full mt-1 py-2 px-1 text-black"
              value={phoneTemp}
              required
              onChange={(e) => setPhoneTemp(e.target.value)}
            />
          </div>

          <div className="flex items-center justify-end p-6 ">
            <button
              className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
              type="button"
              onClick={onLogin}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhoneNumberModal;
