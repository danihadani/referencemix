export default function ChainNode({ node, isLast, delay = 0 }) {
  return (
    <div className="flex items-center chain-animate" style={{ animationDelay: `${delay}ms` }}>
      <div className="flex flex-col items-center gap-1">
        <div
          className="w-20 h-16 rounded-xl border flex flex-col items-center justify-center gap-1 transition-all duration-200 panel-texture cursor-default"
          style={{ background: 'linear-gradient(180deg, #1e1e24 0%, #141418 100%)', borderColor: '#2a2a32' }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = node.color;
            e.currentTarget.style.boxShadow = `0 0 12px ${node.color}33`;
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = '#2a2a32';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <span className="text-[10px] font-bold tracking-widest font-mono" style={{ color: node.color }}>
            {node.abbr}
          </span>
          <span className="text-[9px] text-[#5a5a6e] font-medium text-center leading-tight px-1">
            {node.category}
          </span>
        </div>
        <span className="text-[9px] text-[#5a5a6e] text-center leading-tight max-w-[80px]">
          {node.name}
        </span>
      </div>

      {!isLast && (
        <div className="flex items-center mx-1 mb-5">
          <div className="w-5 h-px bg-[#2a2a32]" />
          <div className="w-0 h-0" style={{
            borderTop: '4px solid transparent',
            borderBottom: '4px solid transparent',
            borderLeft: '5px solid #2a2a32',
          }} />
        </div>
      )}
    </div>
  );
}