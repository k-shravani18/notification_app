import React, { useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { onMessage } from "firebase/messaging";
import { messaging, requestForToken } from "./firebase";
import { Fragment } from "react";
import { Popover, Transition } from "@headlessui/react";
import { UserIcon } from "@heroicons/react/20/solid";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
const Notification = () => {
  const [notifications, setNotifications] = useState([]);

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
  onMessage(messaging, (payload) => {
    console.log("Message received...:", payload);
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
  });

  useEffect(() => {
    requestForToken();
    // setupNotificationListener();
  }, []);
  return (
    <>
      <Toaster />

      <header className="bg-white">
        <nav
          className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1"></div>

          <div className="hidden lg:flex lg:flex-1">
            <Popover.Group className="hidden lg:flex lg:gap-x-12">
              <Popover className="relative">
                <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                  <span className="h-8 w-8 flex-none text-gray-400">
                    {" "}
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
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
                  </span>
                </Popover.Button>

                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                    <div className="p-4">
                      {notifications.length > 0 ? (
                        notifications.map((item) => (
                          <div
                            key={item.tilte}
                            className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50"
                          >
                            <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                              <UserIcon
                                className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                                aria-hidden="true"
                              />
                            </div>
                            <div className="flex-auto">
                              <span className="block font-semibold text-gray-900">
                                {item.title}
                                <span className="absolute inset-0" />
                              </span>
                              <p className="mt-1 text-gray-600">{item.body}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="group relative flex items-center gap-x-6 rounded-lg p-4 text-sm leading-6 hover:bg-gray-50">
                          <div className="flex flex-none items-center justify-center block font-semibold text-gray-900">
                            No Notifications Available...
                          </div>
                        </div>
                      )}
                    </div>
                  </Popover.Panel>
                </Transition>
              </Popover>
            </Popover.Group>
          </div>
        </nav>
      </header>
    </>
  );
};
export default Notification;
