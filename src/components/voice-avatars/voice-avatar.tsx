import type React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useVoiceAvator } from "./use-voice-avatar";

interface voiceAvatarProps {
  name: string;
  seed: string;
  className?: string;
}
const VoiceAvatar: React.FC<voiceAvatarProps> = ({ name, seed }) => {
  const avatarUrl = useVoiceAvator(seed);

  return (
    <Avatar>
      <AvatarImage
        sizes="22"
        width={2}
        height={2}
        src={avatarUrl}
        alt={name}
      ></AvatarImage>
      <AvatarFallback className="text-[8px]">
        {name.slice(0, 2).toLocaleUpperCase()}
      </AvatarFallback>
    </Avatar>
  );
};

export default VoiceAvatar;
