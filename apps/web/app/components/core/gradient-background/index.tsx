
export default function GradientBackground({
  conic,
  className,
  small,
  styles,
}: {
  small?: boolean;
  conic?: boolean;
  className?: string;
  styles?: any
}): JSX.Element {
  return (
    <span
      className={[
        styles.gradient,
        conic ? styles.glowConic : undefined,
        small ? styles.gradientSmall : styles.gradientLarge,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    />
  );
}
