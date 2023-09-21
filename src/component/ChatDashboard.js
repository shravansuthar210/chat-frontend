import React from "react";

const ChatDashboard = ({ messageList, phone }) => {
  return (
    <div className="h-full flex flex-col-reverse px-8 overflow-y-auto">
      {messageList.map((eachMessage, index) => {
        const d = new Date(eachMessage.createdAt);
        const datestring =
          ("0" + d.getDate()).slice(-2) +
          "-" +
          ("0" + (d.getMonth() + 1)).slice(-2) +
          "-" +
          d.getFullYear() +
          " " +
          ("0" + d.getHours()).slice(-2) +
          ":" +
          ("0" + d.getMinutes()).slice(-2);

        return eachMessage.from === phone ? (
          <div className=" w-full flex  justify-end" key={index}>
            <div className="flex flex-col  text-right my-5 rounded-md p-1 bg-teal-500">
              <div className=" flex flex-col">
                <div className="p-2 rounded-md w-full text-right  ">
                  {eachMessage.msg}
                </div>
                <div className="w-full text-left p-1 text-sm">{datestring}</div>
              </div>
            </div>
          </div>
        ) : (
          <div className=" w-full flex flex-col" key={index}>
            <div className="max-w-[50%]  text-left my-5">
              <div className="bg-teal-500 rounded-md p-1">
                <span className="p-2 text-base ">{eachMessage.msg}</span>
                <div className="w-full text-right p-1 text-sm">
                  {datestring}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ChatDashboard;
