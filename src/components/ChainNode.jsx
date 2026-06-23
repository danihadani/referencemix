export default function ChainNode({ node, isLast, delay = 0 }) {
  return (
    <div className="flex items-center chain-animate" style={{ animationDelay: `${delay}ms` }}>
      <div className="flex flex-col items-center gap-1.5">
        {/* Rack unit style node */}
        <div
          className="w-[72px] h-[72px] rack-unit rounded-xl flex flex-col items-center justify-center gap-1.5 cursor-default relative overflow-hidden"
          style={{ fontFamily: "'JetBrains Mono', monospace" }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = node.color;
            e.currentTarget.style.boxShadow = `inset 0 1px 0 rgba(255,200,100,0.08), 0 0 14px ${node.color}55`;
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = '#3d2e1a';
            e.currentTarget.style.boxShadow = 'inset 0 1px 0 rgba(255,200,100,0.08), 0 2px 8px rgba(0,0,0,0.4)';
          }}
        >
          {/* Top LED row */}
          <div className="absolute top-1.5 left-0 right-0 flex justify-center gap-1">
            <div className="led led-on" style={{ background: node.color, boxShadow: `0 0 4px ${node.color}` }} />
          </div>
         

          <span className="text-[11px] font-bold tracking-[0.15em] mt-3" style={{ color: node.color, fontFamily: 'inherit' }}>
            {node.abbr}
          </span>
          <span className="text-[8px] tracking-wider text-center leading-tight px-1" style={{ color: '#8a7355', fontFamily: 'inherit' }}>
            {node.category.toUpperCase()}
          </span>
        </div>
        <span className="text-[8px] tracking-wide text-center leading-tight max-w-[72px]" style={{ color: '#8a7355' }}>
          {node.name}
        </span>
      </div>

      {!isLast && (
        <div className="flex items-center mx-0.5 mb-6">
          <div className="w-6 h-px" style={{ background: 'linear-gradient(90deg, #3d2e1a, #5a4030)' }} />
          <div className="w-0 h-0" style={{
            borderTop: '3px solid transparent',
            borderBottom: '3px solid transparent',
            borderLeft: '4px solid #5a4030',
          }} />
        </div>
      )}
    </div>
  );
}
