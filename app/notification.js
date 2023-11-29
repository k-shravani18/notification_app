// notification.js
import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { requestForToken, onMessageListener } from "./firebase";

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  const notify = (notification) =>
    toast(<ToastDisplay notification={notification} />);

  function ToastDisplay({ notification }) {
    return (
      <div>
        <p>
          <b>{notification?.title}</b>
        </p>
        <p>{notification?.body}</p>
      </div>
    );
  }
  useEffect(() => {
    const setupNotificationListener = async () => {
      console.log("checking......");

      try {
        const payload = await onMessageListener();
        console.log("Received payload:", payload);

        const newNotification = {
          title: payload?.notification?.title,
          body: payload?.notification?.body,
        };
        console.log("newNotification :", newNotification);

        setNotifications((prevNotifications) => [
          ...prevNotifications,
          newNotification,
        ]);

        notify(newNotification);
      } catch (error) {
        console.error("Error setting up notification listener:", error);
      }
    };

    requestForToken();
    setupNotificationListener();
  }, [showNotifications]);

  useEffect(() => {
    console.log("Notifications:", notifications);
  }, [notifications]);

  return (
    <>
      <Toaster />
      <button
        type="button"
        className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        onClick={() => {
          setShowNotifications(!showNotifications);
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="50px"
          height="50px"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M12.0009 5C13.4331 5 14.8066 5.50571 15.8193 6.40589C16.832 7.30606 17.4009 8.52696 17.4009 9.8C17.4009 11.7691 17.846 13.2436 18.4232 14.3279C19.1606 15.7133 19.5293 16.406 19.5088 16.5642C19.4849 16.7489 19.4544 16.7997 19.3026 16.9075C19.1725 17 18.5254 17 17.2311 17H6.77066C5.47638 17 4.82925 17 4.69916 16.9075C4.54741 16.7997 4.51692 16.7489 4.493 16.5642C4.47249 16.406 4.8412 15.7133 5.57863 14.3279C6.1558 13.2436 6.60089 11.7691 6.60089 9.8C6.60089 8.52696 7.16982 7.30606 8.18251 6.40589C9.19521 5.50571 10.5687 5 12.0009 5ZM12.0009 5V3M9.35489 20C10.0611 20.6233 10.9888 21.0016 12.0049 21.0016C13.0209 21.0016 13.9486 20.6233 14.6549 20"
            stroke="#000000"
            strokeWidth="2"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      {/* Dropdown  */}
      {/* {showNotifications && notifications.length > 0 && ( */}
      <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div className="py-1" role="none">
          {notifications.map((notification, index) => (
            <a
              key={index}
              href="#"
              className="text-gray-700 block px-4 py-2 text-sm"
              role="menuitem"
              tabIndex="-1"
            >
              {notification.title}
            </a>
          ))}
        </div>
      </div>
      {/* )} */}
    </>
  );
};

export default Notification;
