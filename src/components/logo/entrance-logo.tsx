import styled from "styled-components";
import { motion } from "framer-motion";
import { useState, useRef } from "react";

const Wrapper = styled.div`
  margin-bottom: 30px;
`;

const Emotion = styled(motion.div)`
  font-size: 8rem;
  display: flex;
`;

const emotions = [
  "😄",
  "😭",
  "😍",
  "😫",
  "😤",
  "😱",
  "😑",
  "😔",
  "🙁",
  "😮",
  "😵‍💫",
  "😟",
  "😳",
];

export default function EntranceLogo() {
  const [currentEmotion, setCurrentEmotion] = useState(emotions[0]);
  const hasFlipped = useRef(false); // 플립 상태

  const handleEmotionChange = () => {
    const randomIndex = Math.floor(Math.random() * emotions.length);
    setCurrentEmotion(emotions[randomIndex]);
  };

  return (
    <Wrapper>
      <Emotion
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatDelay: 2,
          ease: "easeInOut",
        }}
        initial={{ rotateY: 0 }}
        animate={{ rotateY: 180 }}
        onUpdate={({ rotateY }) => {
          if (typeof rotateY === "number") {
            // 90도 이상으로 회전하면 이모지 변경
            if (rotateY >= 90 && !hasFlipped.current) {
              handleEmotionChange();
              hasFlipped.current = true;
            } else if (rotateY < 90) {
              hasFlipped.current = false;
            }
          }
        }}
      >
        {currentEmotion}
      </Emotion>
    </Wrapper>
  );
}
