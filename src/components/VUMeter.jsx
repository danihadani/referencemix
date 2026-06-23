export default function VUMeter({ active = false }) {
  return (
    <div className="flex items-end gap-[2px] h-6">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className={`w-[4px] rounded-xl transition-all duration-150 ${active ? 'vu-bar' : ''}`}
          style={{
            height: active ? undefined : '15%',
            background: active
              ? i < 5 ? '#c4832a' : i < 7 ? '#e05c2a' : '#e03a1a'
              : '#3d2e1a',
            animationDelay: `${i * 0.08}s`,
          }}
        />
      ))}
    </div>
  );
}
