import React from "react";
import { createContact } from "../api";

const NewParticipantModal = ({
  setParticipantModal,
  contact,
  setContact,
  phone,
}) => {
  const [newParticipant, setNewParticipant] = React.useState("");
  const [fullName, setFullName] = React.useState("");
  const onSubmit = async () => {
    try {
      const newContact = await createContact({
        mobile: [newParticipant, phone],
        name: fullName,
      });
      setContact([newContact.data.participant, ...contact]);
      setParticipantModal(false);
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
      <div className="relative w-auto my-6 mx-auto max-w-3xl">
        <div className="border-0 rounded-lg shadow-lg relative  flex flex-col w-full bg-white outline-none focus:outline-none">
          <form className="px-8 pt-6 pb-8 w-full">
            <label className="block text-black text-left text-sm font-bold my-1">
              Enter Full Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full mt-1 py-2 px-1 text-black"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <label className="block text-black text-left text-sm font-bold my-1">
              Enter Phone Number
            </label>
            <input
              className="shadow appearance-none border rounded w-full mt-1 py-2 px-1 text-black"
              value={newParticipant}
              onChange={(e) => setNewParticipant(e.target.value)}
            />
          </form>
          <div className="flex items-center justify-end p-1 border-t border-solid border-blueGray-200 rounded-b">
            <button
              className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
              type="button"
              onClick={() => setParticipantModal(false)}
            >
              Close
            </button>
            <button
              className="text-white bg-yellow-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
              type="button"
              onClick={onSubmit}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewParticipantModal;
