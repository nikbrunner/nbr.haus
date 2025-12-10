import AccentPicker from "./AccentPicker";
import ColorModePicker from "./ColorModePicker";

export default function StylePicker() {
  return (
    <div className="StylePicker">
      <div className="StylePicker__container">
        <AccentPicker />
        <div className="StylePicker__separator" />
        <ColorModePicker />
      </div>
    </div>
  );
}
