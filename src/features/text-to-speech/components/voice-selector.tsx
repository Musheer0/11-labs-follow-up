import { useStore } from "@tanstack/react-form";

import { Field, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import VoiceAvatar from "@/components/voice-avatars/voice-avatar";
import { VOICE_CATEGORY_LABELS } from "@/features/voices/data/voice-categories";
import { useTypedAppFormContext } from "@/hooks/use-app-form";
import { useTTSVoices } from "../context/tts-voices-context";
import { ttsFormOptions } from "./text-to-speech-form";

const VoiceSelector = () => {
  const { customVoices, allVoices, systemVoices } = useTTSVoices();
  const form = useTypedAppFormContext(ttsFormOptions);
  const voiceId = useStore(form.store, (s) => s.values.voiceId);
  const isSubmitting = useStore(form.store, (s) => s.isSubmitting);
  const selectedVoice = allVoices.find((v) => v.id === voiceId);
  const hasMissingSelectedVoice = Boolean(voiceId) && !selectedVoice;
  const currentVoice = selectedVoice
    ? selectedVoice
    : hasMissingSelectedVoice
      ? {
          id: voiceId,
          name: "Unavailable",
          category: null,
        }
      : allVoices[0];
  return (
    <Field>
      <FieldLabel>Voice Style</FieldLabel>
      <Select
        value={voiceId}
        onValueChange={(e) => form.setFieldValue("voiceId", e)}
        disabled={isSubmitting}
      >
        <SelectTrigger className="h-auto py-1 h-auto! w-full">
          <SelectValue className="py-2">
            {currentVoice && (
              <>
                <VoiceAvatar seed={currentVoice.id} name={currentVoice.name} />
                <span className="truncate">
                  {currentVoice.name}
                  {currentVoice.category &&
                    `-${VOICE_CATEGORY_LABELS[currentVoice.category]}`}
                </span>
              </>
            )}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {hasMissingSelectedVoice && currentVoice && (
            <SelectGroup>
              <SelectLabel>Select Voice</SelectLabel>
              <SelectItem className="py-2" value={currentVoice.id}>
                <VoiceAvatar seed={currentVoice.id} name={currentVoice.name} />
                <span className="truncate tracking-tight font-semibold">
                  {currentVoice.name}
                  {currentVoice.category &&
                    `-${VOICE_CATEGORY_LABELS[currentVoice.category]}`}
                </span>
              </SelectItem>
            </SelectGroup>
          )}
          {customVoices.length > 0 && (
            <SelectGroup>
              <SelectLabel>Team Voices</SelectLabel>
              {customVoices.map((e) => {
                return (
                  <SelectItem key={e.id} value={e.id}>
                    <VoiceAvatar seed={e.id} name={e.name} />
                    <span className="truncate">
                      {e.name}
                      {e.category && `-${VOICE_CATEGORY_LABELS[e.category]}`}
                    </span>
                  </SelectItem>
                );
              })}
            </SelectGroup>
          )}

          {systemVoices.length > 0 && (
            <SelectGroup>
              <SelectLabel>Team Voices</SelectLabel>
              {systemVoices.map((e) => {
                return (
                  <SelectItem key={e.id} value={e.id}>
                    <VoiceAvatar seed={e.id} name={e.name} />
                    <span className="truncate">
                      {e.name}
                      {e.category && `-${VOICE_CATEGORY_LABELS[e.category]}`}
                    </span>
                  </SelectItem>
                );
              })}
            </SelectGroup>
          )}
        </SelectContent>
      </Select>
    </Field>
  );
};

export default VoiceSelector;
