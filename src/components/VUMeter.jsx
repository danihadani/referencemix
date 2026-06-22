export default function VUMeter({ active = false }) {
  return (
    <div className="flex items-end gap-[2px] h-8">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className={`w-[3px] rounded-sm transition-all duration-300 ${active ? 'vu-bar' : 'h-[15%]'}`}
          style={{
            background: active
              ? i < 3 ? '#3ddc84' : i < 4 ? '#ff9f43' : '#ff6b9d'
              : '#2a2a32',
            animationDelay: `${i * 0.12}s`,
          }}
        />
      ))}
    </div>
  );
}