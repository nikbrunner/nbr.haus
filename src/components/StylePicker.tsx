import AccentPicker from "./AccentPicker";
import ColorModePicker from "./ColorModePicker";
import styles from "./StylePicker.module.css";

export default function StylePicker() {
  return (
    <div className={styles.stylePicker}>
      <div className={styles.container}>
        <AccentPicker />
        <div className={styles.separator} />
        <ColorModePicker />
      </div>
    </div>
  );
}
