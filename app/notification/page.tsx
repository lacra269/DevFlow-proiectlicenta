
'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; 
import { BellRing, CheckCircle, Info, MessageSquare, X, Trash2, BellOff } from 'lucide-react'; 
const initialNotificationsData = [
  {
    id: 1,
    title: "Noul tău proiect a fost aprobat!",
    message: "Felicitări! Proiectul tău a fost acceptat de către echipa de moderare.",
    type: "success",
    timestamp: "2025-04-24T10:30:00Z"
  },
  {
    id: 2,
    title: "Comentariu pe proiectul tău",
    message: "Un utilizator a adăugat un comentariu pe proiectul tău. Verifică-l acum!",
    type: "info",
    timestamp: "2025-04-24T09:15:00Z"
  },
  {
    id: 3,
    title: "Mesaj de la un client",
    message: "Ai primit un mesaj de la un client pentru un proiect nou. Deschide-l pentru detalii.",
    type: "message",
    timestamp: "2025-04-23T18:05:00Z"
  },
  {
    id: 4,
    title: "Actualizare platformă",
    message: "Am lansat noi funcționalități pentru secțiunea de challenge-uri.",
    type: "info",
    timestamp: "2025-04-23T12:00:00Z"
  },
  {
    id: 5,
    title: "Cont nou creat!",
    message: "Bun venit pe DevFlow! Explorează platforma și începe să creezi.",
    type: "success",
    timestamp: "2025-04-22T08:00:00Z"
  },
];

const NotificationItem = ({ notification, onDismiss }) => {
  const { id, title, message, type, timestamp } = notification;
  const notificationConfig = {
    success: { icon: CheckCircle, color: "text-green-600", bgColor: "bg-green-50", borderColor: "border-green-200" },
    info: { icon: Info, color: "text-blue-600", bgColor: "bg-blue-50", borderColor: "border-blue-200" },
    message: { icon: MessageSquare, color: "text-purple-600", bgColor: "bg-purple-50", borderColor: "border-purple-200" },
    default: { icon: BellRing, color: "text-gray-600", bgColor: "bg-gray-50", borderColor: "border-gray-200" },
  };

  const config = notificationConfig[type] || notificationConfig.default;
  const IconComponent = config.icon;
  const formattedTime = new Date(timestamp).toLocaleString('ro-RO', {
      hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'short'
  });

  return (
    <motion.div
      layout 
      initial={{ opacity: 0, y: -20, scale: 0.95 }} 
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, x: "-50%", transition: { duration: 0.3 } }} 
      transition={{ duration: 0.4, ease: "easeOut" }}
      className={`relative flex items-start space-x-4 p-4 rounded-lg border shadow-sm hover:shadow-md transition-all ${config.bgColor} ${config.borderColor}`}
    >
      <div className={`flex-shrink-0 mt-1 p-1.5 rounded-full ${config.color} bg-white shadow-sm`}>
        <IconComponent size={18} aria-hidden="true" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className={`text-sm font-semibold ${config.color}`}>{title}</h3>
        <p className="text-sm text-gray-700 mt-1">{message}</p>
        <p className="text-xs text-gray-400 mt-2">{formattedTime}</p>
      </div>

      {/* Buton Dismiss */}
      <button
        onClick={() => onDismiss(id)}
        className="absolute top-2 right-2 p-1 rounded-full text-gray-400 hover:bg-gray-200 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400 transition-colors"
        aria-label="Dismiss notification"
      >
        <X size={16} />
      </button>
    </motion.div>
  );
};

const NotificationsPageRedesigned = () => {
  const [notifications, setNotifications] = useState(initialNotificationsData);

  const handleDismiss = (id) => {
    setNotifications((prev) => prev.filter((notif) => notif.id !== id));
  };

  const handleMarkAllRead = () => {
    setNotifications([]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-3xl font-bold text-gray-800 flex items-center">
            <BellRing className="mr-3 text-purple-600" />
            Notificări
          </h1>
          {notifications.length > 0 && (
            <button
              onClick={handleMarkAllRead}
              className="flex items-center text-sm font-medium py-2 px-4 bg-white text-purple-600 border border-purple-200 rounded-lg shadow-sm hover:bg-purple-50 hover:border-purple-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition-all"
            >
              <Trash2 size={16} className="mr-1.5" />
              Marchează toate ca citite ({notifications.length})
            </button>
          )}
        </div>
        <div className="space-y-3"> 
          <AnimatePresence initial={false}>
            {notifications.length === 0 ? (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-10 px-6 bg-white rounded-lg shadow-sm border border-gray-100"
              >
                  <BellOff className="mx-auto h-12 w-12 text-gray-300" />
                  <p className="mt-4 text-lg font-medium text-gray-600">Nu ai notificări noi.</p>
                  <p className="mt-1 text-sm text-gray-500">Te vom anunța aici când apar noutăți.</p>
              </motion.div>
            ) : (
              notifications.map((notif) => (
                <NotificationItem
                  key={notif.id} 
                  notification={notif}
                  onDismiss={handleDismiss}
                />
              ))
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPageRedesigned; 
