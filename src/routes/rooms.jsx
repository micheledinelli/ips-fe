import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../index.css";

// TODO: Handle room and device addition
// import NewDeviceModal from "../components/NewDeviceModal";
// import NewRoomModal from "../components/NewRoomModal";

export default function Rooms() {
  const [rooms, setRooms] = useState([]);
  const [isRoomModalOpen, setIsRoomModalOpen] = useState(false);
  const [isDeviceModalOpen, setIsDeviceModalOpen] = useState(false);

  useEffect(() => {
    // var source = new EventSource("http://localhost:8888/stream");
    // source.onmessage = function (event) {
    //   alert(event.data);
    // };

    getRooms();
  }, []);

  const getRooms = async () => {
    axios
      .get("http://localhost:8888/rooms")
      .then((response) => {
        setRooms(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // TODO: Handle room and device addition
  // const handleAddRoom = (newRoom) => {
  //   setRooms([...rooms, newRoom]);
  //   setIsRoomModalOpen(false);
  // };

  // const handleAddDevice = (newRoom) => {
  //   setRooms([...rooms, newRoom]);
  //   setIsRoomModalOpen(false);
  // };

  return (
    <div className="w-full h-screen text-white bg-cover bg-hero-pattern-1 overflow-hidden">
      <div className="fixed top-3 p-5 w-full flex justify-between items-center text-xl md:text-2xl">
        <div className="text-2xl">
          <button className="border-2 rounded-md p-3 cursor-pointer hover:bg-white hover:text-black">
            <Link to={"/"}>HOME</Link>
          </button>
        </div>

        {/* TODO: Handle room and device addition */}
        {/* <div className="flex flex-row space-x-4">
          <button
            className="border-2 rounded-md p-3 cursor-pointer hover:bg-white hover:text-black"
            onClick={() => setIsRoomModalOpen(true)}
          >
            NEW ROOM
          </button>
          <button
            className="border-2 rounded-md p-3 cursor-pointer hover:bg-white hover:text-black"
            onClick={() => setIsDeviceModalOpen(true)}
          >
            NEW DEVICE
          </button>
        </div> */}
      </div>
      <div className="flex flex-col justify-center items-center w-full h-full">
        <div className="text-4xl mb-10">Your rooms</div>
        <div
          className={`w-2/3 h-2/3 grid gap-y-10 ${
            rooms && rooms.length === 1
              ? "grid-cols-1"
              : rooms.length === 2
              ? "grid-cols-2"
              : "md:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {rooms &&
            rooms.map((room) => (
              <div
                key={room.roomId}
                className={`flex flex-col justify-center items-center text-lg hover:-translate-y-1 hover:scale-110 duration-300 ${
                  rooms.length === 1 ? "max-w-xl mx-auto" : ""
                }`}
              >
                <h1 className="cursor-pointer text-3xl underline underline-offset-4">
                  <Link to={`/rooms/${room.roomId}`}>{room.name}</Link>
                </h1>

                {room.public ? (
                  <p className="mt-3">Access type: 🌐</p>
                ) : (
                  <p className="mt-3">Access type: 🔐</p>
                )}

                <p className="mt-3">
                  {room.notification === "vibration"
                    ? "Notification type 📳"
                    : room.notification === "sound"
                    ? "Notification type 🔊"
                    : room.notification === "cow"
                    ? "Notification type 🐮"
                    : ""}
                </p>

                <p className="mt-3">
                  Access granted to{" "}
                  {room.grantedTo.length != 0
                    ? room.grantedTo.length
                    : "everyone"}
                </p>

                <p className="m-3">
                  Devices required{" "}
                  {room.devices.length != 0 ? room.devices.length : "none"}
                </p>

                <button className="m-2 border-2 rounded-md p-3 cursor-pointer hover:bg-white hover:text-black">
                  <Link to={`/rooms/${room.roomId}`}>EDIT</Link>
                </button>
              </div>
            ))}
        </div>
      </div>
      {/* TODO: Handle room and device addition */}
      {/* <NewRoomModal
        isOpen={isRoomModalOpen}
        onClose={() => setIsRoomModalOpen(false)}
        onSave={handleAddRoom}
      />
      <NewDeviceModal
        isOpen={isDeviceModalOpen}
        onClose={() => setIsDeviceModalOpen(false)}
        onSave={handleAddDevice}
      /> */}
    </div>
  );
}
