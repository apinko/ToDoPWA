// src/components/AddTask.jsx
import { useState } from "react";

const channel = new BroadcastChannel("todo_sync");

export default function AddTask({ addNewTask }) {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("bg-yellow-300"); // Domyślnie żółty

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (taskName.trim().length < 3) {
      alert("Nazwa zadania musi mieć co najmniej 3 znaki.");
      return;
    }

    console.log("📌 handleSubmit() - Dodawanie zadania...");

    const newTask = {
      id: Date.now(),
      name: taskName,
      description: taskDescription,
      deadline,
      priority: { color: priority },
      note: "",
      location: null,
      city: null,
    };

    // Pobieranie geolokalizacji użytkownika
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          console.log("📍 Lokalizacja pobrana:", position.coords);
          const { latitude, longitude } = position.coords;
          let city = "Nieznane miasto";

          try {
            const response = await fetch(
              `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
            );
            const data = await response.json();
            if (data.address?.city) city = data.address.city;
            else if (data.address?.town) city = data.address.town;
            else if (data.address?.village) city = data.address.village;
            console.log(`🏙 Miasto: ${city}`);
          } catch (error) {
            console.error("❌ Błąd pobierania nazwy miasta:", error);
          }

          // Aktualizacja zadania
          newTask.location = { latitude, longitude };
          newTask.city = city;
          newTask.note = `_Lokalizacja: ${city}_`;

          finalizeTask(newTask);
        },
        (error) => {
          console.error("❌ Błąd pobierania lokalizacji:", error);
          finalizeTask(newTask);
        }
      );
    } else {
      console.warn("⚠ Geolokalizacja nie jest obsługiwana.");
      finalizeTask(newTask);
    }
  };

  const finalizeTask = (task) => {
    addNewTask(task);
    channel.postMessage("update_tasks");
    sendLocalNotification(task.name);

    // Resetowanie formularza
    setTaskName("");
    setTaskDescription("");
    setDeadline("");
    setPriority("bg-yellow-300");

    console.log("✅ Zadanie dodane:", task);
  };

  const sendLocalNotification = (taskName) => {
    if (!("Notification" in window)) {
      console.error("❌ Przeglądarka nie obsługuje powiadomień.");
      return;
    }

    if (Notification.permission === "granted") {
      showNotification(taskName);
    } else if (Notification.permission === "default") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          showNotification(taskName);
        } else {
          console.warn("⚠ Powiadomienia są zablokowane.");
        }
      });
    } else {
      console.warn("❌ Powiadomienia są zablokowane.");
    }
  };

  const showNotification = (taskName) => {
    if ("serviceWorker" in navigator) {
      navigator.serviceWorker.ready
        .then((registration) => {
          return registration.showNotification("Nowe zadanie dodane!", {
            body: `Zadanie: ${taskName}`,
            icon: "/icon.png",
            badge: "/badge.png",
            requireInteraction: true,
          });
        })
        .then(() => console.log("🔔 Powiadomienie push wyświetlone"))
        .catch((err) => console.error("❌ Błąd wyświetlania powiadomienia:", err));
    } else {
      console.error("❌ Service Worker nie jest dostępny!");
    }
  };

  if ("serviceWorker" in navigator && navigator.serviceWorker.controller) {
    navigator.serviceWorker.addEventListener("notificationclose", (event) => {
        console.log("🔕 Powiadomienie zostało zamknięte", event.notification);
    });
} else {
    console.warn("⚠ Service Worker nie jest dostępny lub nie został jeszcze zarejestrowany.");
}

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-2">Dodaj nowe zadanie</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <input
          type="text"
          placeholder="Nazwa zadania (min. 3 znaki)"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
          className="p-2 border rounded text-black bg-white"
          required
        />
        <textarea
          placeholder="Opis zadania (opcjonalnie)"
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          className="p-2 border rounded text-black bg-white"
        />

        <div className="flex items-center gap-2">
          <span>📅</span>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="p-2 border rounded text-black bg-white w-40 appearance-none"
          />
        </div>

        <div>
          <label className="block mb-1 font-semibold">Priorytet:</label>
          <div className="flex gap-2">
            <button
              type="button"
              className={`w-8 h-8 rounded ${priority === "bg-red-500" ? "ring-2 ring-black" : ""} bg-red-500`}
              onClick={() => setPriority("bg-red-500")}
            ></button>
            <button
              type="button"
              className={`w-8 h-8 rounded ${priority === "bg-yellow-300" ? "ring-2 ring-black" : ""} bg-yellow-300`}
              onClick={() => setPriority("bg-yellow-300")}
            ></button>
            <button
              type="button"
              className={`w-8 h-8 rounded ${priority === "bg-green-500" ? "ring-2 ring-black" : ""} bg-green-500`}
              onClick={() => setPriority("bg-green-500")}
            ></button>
          </div>
        </div>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Dodaj
        </button>
      </form>
    </div>
  );
}