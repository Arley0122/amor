import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

export default function WomenDayCard() {
  const [showHeart, setShowHeart] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [message, setMessage] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [countdown, setCountdown] = useState(5); 
  const [showPhotos, setShowPhotos] = useState(false); 
  const [photoIndex, setPhotoIndex] = useState(0); 
  const [currentPhrase, setCurrentPhrase] = useState(""); 
  const audioRef = useRef<HTMLAudioElement>(null);
  const romanticMessage = `Minha amada Sophia,

  Hoje é um dia muito especial, mas para mim, cada momento ao seu lado é uma celebração. Você é o sol que brilha em meu coração, trazendo calor e luz aos meus dias mais escuros.
  
  Você sempre esteve lá para mim, em todos os momentos, bons e ruins. Você é a pessoa que me faz rir quando estou triste, que me apoia quando estou fraco, e que me inspira a ser melhor a cada dia. Você é a minha força, a minha alegria, e o meu tudo.
  
  Sophia, você é incrível, inspiradora, e muito especial. Você é a mulher dos meus sonhos, e eu sou o homem mais sortudo do mundo por ter você ao meu lado. Eu amo você, e prometo que sempre estarei aqui para você, como você sempre esteve para mim.
  
  Feliz Dia das Mulheres, minha amada. Você merece todo o amor e felicidade do mundo, e eu espero poder continuar te fazendo feliz por muitos anos ainda.
  
  Com todo o meu amor,
  
  Arley`;
  const photos = ["foto1.jpg", "foto2.jpg", "foto3.jpg"]; 
  const lovePhrases = [
    "Sem você, não há vida.",
    "Cada momento com você é precioso.",
    "Sem você, não há sol.",
  ]; 

  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showMessage) {
      const interval = setInterval(() => {
        if (currentIndex < romanticMessage.length) {
          setCurrentIndex((prevIndex) => prevIndex + 1);
          setMessage(romanticMessage.slice(0, currentIndex + 1));
        } else {
          clearInterval(interval);
        }
  
        
        if (messageRef.current) {
          messageRef.current.scrollTop = messageRef.current.scrollHeight;
        }
      }, 40);
  
      return () => clearInterval(interval);
    }
  }, [showMessage, currentIndex]);
  
  

  useEffect(() => {
    if (showHeart) {
    
      const countdownInterval = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(countdownInterval);
            setShowPhotos(true);
            setShowHeart(false); 
            return 0;
          }
          return prev - 1;
        });
      }, 1000); // A cada 1 segundo

      return () => clearInterval(countdownInterval);
    }
  }, [showHeart]);

  useEffect(() => {
    if (showPhotos) {
     
      setCurrentPhrase(lovePhrases[0]);
  
      const photoInterval = setInterval(() => {
        setPhotoIndex((prev) => {
          const newIndex = (prev + 1) % photos.length;
          setCurrentPhrase(lovePhrases[newIndex]); 
          return newIndex;
        });
      }, 3000); 
  
      return () => clearInterval(photoInterval);
    }
  }, [showPhotos]);
  
  

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((error) => {
        console.error("Erro ao tentar tocar a música:", error);
      });
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-pink-100">
      {!showHeart && !showPhotos ? (
        <Card className="p-6 max-w-md text-center shadow-xl bg-gradient-to-r from-pink-100 to-white rounded-2xl overflow-auto max-h-screen relative">
          <motion.h1
            className="text-2xl font-bold text-pink-600"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            Feliz Dia das Mulheres, Meu Amor! 💖
          </motion.h1>
          <CardContent ref={messageRef} className="card overflow-y-auto max-h96 no-scrollbar relative">
            <div className="relative">
              <motion.div
                className="absolute top-0 left-0 w-full h-full rounded-lg"
                style={{
                  background: "radial-gradient(circle at center, #ff7e5f, #c73446)",
                  opacity: 0.8,
                }}
                animate={{
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
              <motion.img
                src="SophiaFoto.png"
                alt="Sophia"
                className="w-full rounded-lg mb-4 relative z-10 w-full rounded-lg mb-4 relative z-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
                style={{marginTop: '16px'}}
              />
            </div>
            {!showMessage ? (
              <Button
                className="mt-4 bg-pink-500 hover:bg-pink-600 text-white"
                onClick={() => {
                  setShowMessage(true);
                  handlePlay();
                }}
              >
                Clique para uma surpresa!
              </Button>
            ) : (
              <motion.p
                className="mt-4 text-lg text-gray-700 whitespace-pre-line"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                {message}
              </motion.p>
            )}
            {currentIndex === romanticMessage.length && (
              <Button
                className="mt-4 bg-pink-500 hover:bg-pink-600 text-white"
                onClick={() => setShowHeart(true)}
              >
                Clique para ver o coração!
              </Button>
            )}
          </CardContent>
        </Card>
      ) : null}
      {showHeart && !showPhotos && (
        <motion.div
          className="flex justify-center items-center absolute top-0 left-0 w-full h-full rounded-lg z-0"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="relative w-48 h-48 flex justify-center items-center">
       
            <motion.div
              className="absolute w-48 h-48 rounded-full bg-gradient-to-r from-pink-500 to-red-500 z-0"
              animate={{
                scale: [1, 4], 
                opacity: [1, 0], 
              }}
              transition={{
                duration: 4, 
                ease: "easeOut", 
              }}
            />

            <motion.svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              className="w-36 h-36 z-10" 
              animate={{
                scale: [1, 1.15, 1], 
              }}
              transition={{
                duration: 1.5, 
                repeat: Infinity, 
                ease: "easeInOut", 
              }}
            >
              <path
                fill="none"
                strokeWidth="2"
                d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
              />
            </motion.svg>
          </div>
        </motion.div>
      )}


      {showHeart && !showPhotos && (
        <div className="absolute bottom-10 text-4xl text-black">
          {countdown} segundos restantes...
        </div>
      )}

  
      {showPhotos && (
        <div className="absolute flex flex-col items-center">
          <motion.img
            key={photos[photoIndex]} 
            src={photos[photoIndex]} 
            alt={`Foto ${photoIndex + 1}`}
            className="w-96 h-96 rounded-full object-cover mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          />
          <motion.p
            className="text-xl text-black"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            {currentPhrase} 
          </motion.p>
        </div>
      )}

      <audio ref={audioRef} src="musica.mp3" loop className="hidden"></audio>
    </div>
  );
}
