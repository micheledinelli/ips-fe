import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Bounce, ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Room() {
  const { roomId } = useParams();
  const [room, setRoom] = useState(null);
  const [users, setUsers] = useState([]);
  const [devices, setDevices] = useState([]);

  useEffect(() => {
    getRoom();
    getUsers();
    getDevices();
  }, []);

  const getRoom = async () => {
    try {
      const response = await axios.get(`http://localhost:8888/rooms/${roomId}`);
      setRoom(response.data);
    } catch (error) {
      toast.error("Error fetching room");
      console.error("Error fetching room:", error);
    }
  };

  const getUsers = async () => {
    axios
      .get("http://localhost:8888/users")
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const getDevices = async () => {
    axios
      .get("http://localhost:8888/devices")
      .then((response) => {
        setDevices(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAddUser = (idToAdd) => {
    if (!idToAdd) {
      return;
    }

    idToAdd = parseInt(idToAdd);
    if (!room.grantedTo.includes(idToAdd)) {
      setRoom((prevRoom) => ({
        ...prevRoom,
        grantedTo: [...prevRoom.grantedTo, idToAdd],
      }));
    }
  };

  const handleAddDevice = (deviceId) => {
    if (!deviceId) {
      return;
    }

    deviceId = parseInt(deviceId);
    if (!room.devices.includes(deviceId)) {
      setRoom((prevRoom) => ({
        ...prevRoom,
        devices: [...prevRoom.devices, deviceId],
      }));
    }
  };

  const handleRemoveUser = (idToRemove) => {
    idToRemove = parseInt(idToRemove);
    setRoom((prevRoom) => ({
      ...prevRoom,
      grantedTo: prevRoom.grantedTo.filter((id) => id !== idToRemove),
    }));
  };

  const handleRemoveDevice = (idToRemove) => {
    idToRemove = parseInt(idToRemove);
    setRoom((prevRoom) => {
      const updatedDevices = prevRoom.devices.filter(
        (deviceId) => deviceId !== idToRemove
      );
      return {
        ...prevRoom,
        devices: updatedDevices,
      };
    });
  };

  const findDeviceNameById = (devices, deviceId) => {
    const device = devices.find((device) => device.deviceId === deviceId);
    return device ? device.name : "Device not found";
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRoom((prevRoom) => ({
      ...prevRoom,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // If the room is public, remove all granted access and devices
    if (room.public) {
      setRoom((prevRoom) => ({
        ...prevRoom,
        grantedTo: [],
        devices: [],
      }));
    }

    try {
      await toast.promise(
        axios.put(`http://localhost:8888/rooms/${roomId}`, room),
        {
          pending: "Updating room...",
          success: "Room updated!",
          error: "Error updating room",
        },
        {
          transition: Bounce,
          autoClose: 1000,
        }
      );
    } catch (error) {
      console.error("Error updating room:", error);
    }
  };

  return (
    <div className="w-full h-screen text-white bg-slate-900 overflow-x-hidden">
      <ToastContainer />
      <div className="fixed top-3 p-5 w-full flex justify-between items-center text-xl md:text-2xl">
        <button className="border-2 rounded-md p-3 cursor-pointer hover:bg-white hover:text-black">
          <Link to={"/rooms"}>BACK</Link>
        </button>

        {roomId && <h1>id: {roomId}</h1>}
      </div>
      <div className="flex flex-row w-full h-full justify-evenly items-center gap-">
        {room && users && (
          <form
            className="flex flex-col justify-center"
            onSubmit={handleSubmit}
          >
            <h1 className="text-3xl mb-8">Edit Room</h1>
            <label className="mb-3">Room Name</label>
            <input
              type="text"
              name="name"
              value={room.name}
              onChange={handleInputChange}
              className="mb-5 p-2 rounded text-black"
            />
            <label className="mb-3">Access Type</label>
            <select
              name="accessType"
              value={room.public ? "public" : "private"}
              onChange={(e) => {
                const value = e.target.value === "public";

                setRoom((prevRoom) => ({
                  ...prevRoom,
                  public: value,
                  grantedTo: value ? [] : prevRoom.grantedTo,
                  devices: value ? [] : prevRoom.devices,
                }));
              }}
              className="mb-5 p-2 rounded text-black"
            >
              <option value="public">Public 🌐</option>
              <option value="private">Private 🔐</option>
            </select>

            <label className="mb-3">Notification Type</label>
            <select
              name="notification"
              value={room.notification}
              className="mb-5 p-2 rounded text-black"
              onChange={(e) => {
                const value = e.target.value;
                setRoom((prevRoom) => ({
                  ...prevRoom,
                  notification: value,
                }));
              }}
            >
              <option value="vibration">Vibration 📳</option>
              <option value="sound">Sound 🔊</option>
              <option value="cow">Cow 🐮</option>
            </select>

            <button
              type="submit"
              className="mt-10 border-2 rounded-md p-3 cursor-pointer hover:bg-white hover:text-black"
            >
              SAVE
            </button>
          </form>
        )}

        {room && devices && users && (
          <div className="flex flex-col justify-center">
            <label className="mb-3">Add User:</label>
            <select
              onChange={(e) => {
                e.preventDefault();
                handleAddUser(e.target.value);
              }}
              className="mb-3 p-2 rounded text-black"
              disabled={room.public}
            >
              <option value="">Select User</option>
              {users.length !== 0 &&
                users.map((user) => (
                  <option key={user.userId} value={user.userId}>
                    {user.userId}
                  </option>
                ))}
            </select>

            {room.public || room.grantedTo.length === 0 ? (
              <div className="mb-3">No access granted</div>
            ) : (
              <div className="mb-3">Access granted to</div>
            )}

            {room.grantedTo.length > 0 && !room.public ? (
              <div className="mb-3">Access granted to</div> &&
              room.grantedTo.map((id) => (
                <div
                  key={id}
                  className="flex items-center justify-between mb-2"
                >
                  <span>Id: {id}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveUser(id)}
                    className="ml-2 px-2 py-1 bg-red-500 text-white rounded"
                  >
                    Remove
                  </button>
                </div>
              ))
            ) : (
              <></>
            )}

            <label className="mb-4 mt-8">Add required device:</label>
            <select
              onChange={(e) => {
                e.preventDefault();
                handleAddDevice(e.target.value);
              }}
              className="mb-4 p-2 rounded text-black"
              disabled={room.public}
            >
              <option value="">Select Device</option>
              {devices.length !== 0 &&
                devices.map((device) => (
                  <option key={device.deviceId} value={device.deviceId}>
                    {device.name}
                  </option>
                ))}
            </select>

            {room.devices && room.devices.length === 0 ? (
              <div className="mb-4">No device required</div>
            ) : (
              <div className="mb-4">Devices required</div>
            )}

            {room.devices.length > 0 ? (
              room.devices.map((deviceId) => (
                <div
                  key={deviceId}
                  className="flex items-center justify-between mb-2"
                >
                  <span>Device: {findDeviceNameById(devices, deviceId)}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveDevice(deviceId)}
                    className="m-2 px-2 py-1 bg-red-500 text-white rounded"
                  >
                    Remove
                  </button>
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
