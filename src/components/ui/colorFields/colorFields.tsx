import ColorField from "@/components/ColorField";
import styles from "./colorFields.module.css";

interface ColorFieldsProps {
  accent: {
    label: string;
    value: string;
    onChange: (value: string) => void;
  };
  gray: {
    label: string;
    value: string;
    onChange: (value: string) => void;
  };
  backgroundColor: {
    label: string;
    value: string;
    onChange: (value: string) => void;
  };
  darkmodeBackground: {
    label: string;
    value: string;
    onChange: (value: string) => void;
  };
}

export const ColorFields = ({
  accent,
  gray,
  backgroundColor,
  darkmodeBackground,
}: ColorFieldsProps) => {
  return (
    <div className={styles.colorFieldsContainer}>
      <div className={styles.colorFieldGroup}>
        <ColorField
          label={accent.label}
          value={accent.value}
          onChange={accent.onChange}
        />
        <ColorField
          label={gray.label}
          value={gray.value}
          onChange={gray.onChange}
        />
        <ColorField
          label={backgroundColor.label}
          value={backgroundColor.value}
          onChange={backgroundColor.onChange}
        />
        <ColorField
          label={darkmodeBackground.label}
          value={darkmodeBackground.value}
          onChange={darkmodeBackground.onChange}
        />
      </div>
    </div>
  );
};
