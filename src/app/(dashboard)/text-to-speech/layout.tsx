import type React from "react";
import TextToSpeechLayout from "@/features/text-to-speech/components/text-to-speech-layout";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return <TextToSpeechLayout>{children}</TextToSpeechLayout>;
};

export default Layout;
