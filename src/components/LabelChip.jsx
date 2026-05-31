export default function LabelChip({ label }) {
  return (
    <span
      style={{
        display: 'inline-block',
        borderRadius: '9999px',
        padding: '4px 12px',
        fontSize: '0.7rem',
        fontWeight: 500,
        backgroundColor: 'var(--color-secondary-container)',
        color: 'var(--color-on-secondary-container)'
      }}
    >
      {label}
    </span>
  );
}
