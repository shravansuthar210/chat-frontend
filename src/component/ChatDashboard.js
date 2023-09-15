import React from "react";

const ChatDashboard = ({ messageList, phone }) => {
  return (
    <div className="h-full flex flex-col-reverse px-8 overflow-y-auto">
      {messageList.map((eachMessage, index) => {
        return eachMessage.from === phone ? (
          <div className=" w-full flex flex-col justify-end" key={index}>
            <div className=" text-right my-5">
              <span className="p-2 rounded-md max-w-[50%] bg-teal-500">
                {eachMessage.msg}
              </span>
            </div>
          </div>
        ) : (
          <div className=" w-full flex flex-col" key={index}>
            <div className="max-w-[50%]  text-left my-5">
              <span className="p-2 rounded-md bg-teal-500">
                {eachMessage.msg}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatDashboard;
