import { useEffect } from "react"

export interface IMidi {
  onNoteOn(e: WebMidi.MIDIMessageEvent): void;
  onNoteOff(e: WebMidi.MIDIMessageEvent): void;
}

export const useMidi = ({
  onNoteOn,
  onNoteOff,
}: IMidi) => {
  useEffect(() => {
    if (navigator.requestMIDIAccess)
      navigator.requestMIDIAccess().then(onMIDIInit, onMIDIReject);
    else
      alert("No MIDI support present in your browser.  You're gonna have a bad time.")
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
        if (e.data[2] !== 0) {  // if velocity != 0, this is a note-on message
          onNoteOn(e);
          return
        }
      // if velocity == 0, fall thru: it's a note-off.  MIDI's weird, y'all.
      // eslint-disable-next-line no-fallthrough
      case 0x80:
        onNoteOff(e);
        return;
    }
  }
}
