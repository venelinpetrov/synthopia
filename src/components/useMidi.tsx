import { useEffect } from "react"


export const useMidi = ({
  ctx,
  onNoteOn,
  onNoteOff,
}: {
  ctx: AudioContext,
  onNoteOn(e: any): void;
  onNoteOff(e: any): void;
}) => {
  useEffect(() => {
    if (navigator.requestMIDIAccess)
      navigator.requestMIDIAccess().then(onMIDIInit, onMIDIReject);
    else
      alert("No MIDI support present in your browser.  You're gonna have a bad time.")
  });
  useEffect(() => {
    document.addEventListener('keydown', onNoteOn);
    document.addEventListener('keyup', onNoteOff);

    return () => {
      document.removeEventListener('keydown', onNoteOn);
      document.removeEventListener('keyup', onNoteOff);
    }
  });


  function onMIDIInit(midi: WebMidi.MIDIAccess) {
    const inputs = midi.inputs.values();
    let haveAtLeastOneDevice = false;
    for (let input = inputs.next(); input && !input.done; input = inputs.next()) {
      input.value.onmidimessage = MIDIMessageEventHandler;
      haveAtLeastOneDevice = true;
    }
    if (!haveAtLeastOneDevice)
      alert('No MIDI input devices present');
  }

  function onMIDIReject() {
    alert('No MIDI support');
  }

  function MIDIMessageEventHandler(e: WebMidi.MIDIMessageEvent) {
    // Mask off the lower nibble (MIDI channel, which we don't care about)
    switch (e.data[0] & 0xf0) {
      case 0x90:
        if (e.data[2] != 0) {  // if velocity != 0, this is a note-on message
          onNoteOn(e.data[1]);
          return
        }
      // if velocity == 0, fall thru: it's a note-off.  MIDI's weird, y'all.
      // eslint-disable-next-line no-fallthrough
      case 0x80:
        onNoteOff(e.data[1]);
        return;
    }
  }
}
