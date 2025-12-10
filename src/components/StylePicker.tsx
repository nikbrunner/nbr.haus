import AccentPicker from "./AccentPicker";
import ColorModePicker from "./ColorModePicker";
import "./StylePicker.css";

export default function StylePicker() {
  return (
    <div className="style-picker">
      <div className="style-picker__container">
        <AccentPicker />
        <div className="style-picker__separator" />
        <ColorModePicker />
      </div>
    </div>
  );
}
