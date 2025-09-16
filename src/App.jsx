import { useEffect, useRef, useState } from "react";
import { FaComment, FaHeart, FaPaperPlane, FaTimes } from "react-icons/fa";
const fakeChat = [
  { user: "Ana", avatar: "https://randomuser.me/api/portraits/women/21.jpg", message: "Hola! ¿Cómo andan todos? 😊" },
  { user: "Luis", avatar: "https://randomuser.me/api/portraits/men/18.jpg", message: "Todo bien, tranqui. ¿Vos?" },
  { user: "Carla", avatar: "https://randomuser.me/api/portraits/women/45.jpg", message: "Che, ¿alguien vio la última serie de Netflix? 🔥" },
  { user: "Juli", avatar: "https://randomuser.me/api/portraits/women/36.jpg", message: "Sí! La terminé ayer, está muy buena" },
  { user: "Marcos", avatar: "https://randomuser.me/api/portraits/men/55.jpg", message: "Yo estoy por el capítulo 3 todavía 😅" },
  { user: "Ana", avatar: "https://randomuser.me/api/portraits/women/21.jpg", message: "jajaja te falta un montón entonces" },
  { user: "Luis", avatar: "https://randomuser.me/api/portraits/men/18.jpg", message: "Hoy juega la selección? ⚽🇦🇷" },
  { user: "Carla", avatar: "https://randomuser.me/api/portraits/women/45.jpg", message: "Sí! A las 21:00" },
  { user: "Marcos", avatar: "https://randomuser.me/api/portraits/men/55.jpg", message: "Uff qué nervios, espero que gane 🙏" },
  { user: "Juli", avatar: "https://randomuser.me/api/portraits/women/36.jpg", message: "Yo ya tengo la pizza lista 🍕" },
  { user: "Ana", avatar: "https://randomuser.me/api/portraits/women/21.jpg", message: "Qué envidia 😭" },
  { user: "Luis", avatar: "https://randomuser.me/api/portraits/men/18.jpg", message: "Si gana hacemos videollamada para festejar 🎉" },
  { user: "Carla", avatar: "https://randomuser.me/api/portraits/women/45.jpg", message: "Obvioo, cuenten conmigo" },
  { user: "Marcos", avatar: "https://randomuser.me/api/portraits/men/55.jpg", message: "Dale, va a estar buenísimo" },
  { user: "Juli", avatar: "https://randomuser.me/api/portraits/women/36.jpg", message: "Bueno gente, me voy a bañar 🚿" },
  { user: "Ana", avatar: "https://randomuser.me/api/portraits/women/21.jpg", message: "Ok, nos vemos después" },
  { user: "Luis", avatar: "https://randomuser.me/api/portraits/men/18.jpg", message: "Bye 👋" },
  { user: "Carla", avatar: "https://randomuser.me/api/portraits/women/45.jpg", message: "chauuuu" },
  { user: "Leo", avatar: "https://randomuser.me/api/portraits/men/32.jpg", message: "Alguien quiere unirse a la partida online?" },
  { user: "Valen", avatar: "https://randomuser.me/api/portraits/women/22.jpg", message: "Yo sí! 😎" },
];

function App() {
  const videoRef = useRef(null);
  const chatRef = useRef(null);
  const [messages, setMessages] = useState([]);
  const [hearts, setHearts] = useState([]);
  const [viewers, setViewers] = useState(0);

  // Acceso a la cámara
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: false })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => console.error("Error al acceder a la cámara:", err));
  }, []);

  // Simular mensajes que aparecen con el tiempo
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < fakeChat.length - 1) {
        setMessages((prev) => [...prev, fakeChat[i]]);
        i++;
      } else {
        i = 0
        //clearInterval(interval);
      }
    }, 2500); // cada 2.5s llega un mensaje
    return () => clearInterval(interval);
  }, []);

  // Scroll automático al último mensaje
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  // Generar corazones automáticos
  useEffect(() => {
    const interval = setInterval(() => {
      const id = Date.now();
      setHearts((prev) => [...prev, id]);
      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h !== id));
      }, 2000);
    }, 1200); // cada 1.2s aparece un corazón
    return () => clearInterval(interval);
  }, []);

  // Contador dinámico de espectadores
  useEffect(() => {
  // valor inicial
  const randomInitial = Math.floor(Math.random() * (80000 - 30000) + 30000);
  setViewers(randomInitial);

  const interval = setInterval(() => {
    setViewers((prev) => {
      // en vez de saltar a cualquier número, variamos suavemente
      const variation = Math.floor(Math.random() * 2000 - 1000); // -1000 a +1000
      let newVal = prev + variation;

      // aseguramos que siga en el rango 30k - 80k
      if (newVal < 30000) newVal = 30000;
      if (newVal > 80000) newVal = 80000;

      return newVal;
    });
  }, 5000); // cada 5s

  return () => clearInterval(interval);
}, []);
 
  return (
    <> <div className="relative h-screen w-full bg-black overflow-hidden flex justify-center items-center">
        {/* Video en vivo */}
        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          className="h-full w-auto max-w-full object-cover"
        />

        {/* Overlay superior */}
        <div className="absolute top-0 left-0 w-full p-3 flex justify-between items-center bg-gradient-to-b from-black/70 to-transparent">
          <div className="flex items-center gap-2">
            <img
              src="https://randomuser.me/api/portraits/men/12.jpg"
              alt="perfil"
              className="w-8 h-8 rounded-full border-2 border-pink-500"
            />
            <span className="text-white font-semibold">bautirenaudo</span>
            <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded">LIVE</span>
            <span className="text-gray-300 text-xs ml-2">{(viewers / 1000).toFixed(1)}K</span>
          </div>
          <FaTimes className="text-white text-xl cursor-pointer" />
        </div>

        {/* Chat lateral con scroll */}
        <div
          ref={chatRef}
          className="absolute bottom-20 left-3 w-[70%] space-y-2 max-h-[40%] overflow-y-auto pr-2"
          style={{ scrollbarWidth: "none" }}
        >
          {messages.map((msg, idx) => (
            <div key={idx} className="flex items-center gap-2 text-white text-sm animate-fadeIn">
              <img src={msg.avatar} alt={msg.user} className="w-6 h-6 rounded-full" />
              <span className="font-semibold">{msg.user}</span>
              <span>{msg.message}</span>
            </div>
          ))}
        </div>

        {/* Barra de acciones */}
        <div className="absolute bottom-0 left-0 w-full p-3 flex justify-between items-center bg-gradient-to-t from-black/70 to-transparent">
          <div className="flex items-center bg-black/40 rounded-full px-3 py-1 text-gray-300 text-sm w-[70%]">
            <FaComment className="mr-2" />
            Agregar comentario...
          </div>
          <div className="flex gap-4 items-center text-white">
            <FaHeart className="text-2xl cursor-pointer" />
            <FaPaperPlane className="text-xl" />
          </div>
        </div>

        {/* Corazones flotando */}
        {hearts.map((id) => (
          <div
            key={id}
            className="absolute bottom-16 right-8 text-pink-500 text-3xl animate-floatUp"
          >
            ❤️
          </div>
        ))}

        {/* Animaciones Tailwind personalizadas */}
        <style>
          {`
          @keyframes floatUp {
            0% { transform: translateY(0) scale(1); opacity: 1; }
            100% { transform: translateY(-150px) scale(1.5); opacity: 0; }
          }
          .animate-floatUp {
            animation: floatUp 2s ease-in-out forwards;
          }
          .animate-fadeIn {
            animation: fadeIn 0.5s ease-in;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
        </style>
      </div></>
  );
}

export default App;
