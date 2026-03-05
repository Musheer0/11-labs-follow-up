"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import { SettingsPanel } from "@/features/text-to-speech/components/settings-pannel";
import { TextInputPanel } from "@/features/text-to-speech/components/text-input-pannel";
import {
  defaultTTSValues,
  TextToSpeechForm,
  type TTSFormValues,
} from "@/features/text-to-speech/components/text-to-speech-form";
import { VoicePreviewPlaceholder } from "@/features/text-to-speech/components/voice-preview-placeholder";
import { useTRPC } from "@/trpc/client";
import { TTSVoicesProvider } from "../context/tts-voices-context";

export function TextToSpeechView({
  initialValues,
}: {
  initialValues: Partial<TTSFormValues>;
}) {
  const trpc = useTRPC();
  const { data: voices } = useSuspenseQuery(trpc.voices.getAll.queryOptions());
  const { custom, system } = voices;
  const allVoices = [...custom, ...system];
  const fallbackVoiceId = allVoices[0]?.id;
  const resolvedVoiceId =
    initialValues.voiceId &&
    allVoices.some((v) => v.id === initialValues.voiceId)
      ? initialValues.voiceId
      : fallbackVoiceId;
  const defaultValues = {
    ...defaultTTSValues,
    ...initialValues,
    voiceId: resolvedVoiceId,
  };
  return (
    <TTSVoicesProvider
      value={{ customVoices: custom, systemVoices: system, allVoices }}
    >
      <TextToSpeechForm defaultValues={defaultValues}>
        <div className="flex min-h-0 flex-1 overflow-hidden">
          <div className="flex min-h-0 flex-1 flex-col">
            <TextInputPanel />
            <VoicePreviewPlaceholder />
          </div>
          <SettingsPanel />
        </div>
      </TextToSpeechForm>
    </TTSVoicesProvider>
  );
}
