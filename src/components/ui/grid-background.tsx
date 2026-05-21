export function GridBackground() {
  return (
    <div
      className="fixed inset-0 -z-10 h-dvh w-full"
      style={{
        backgroundImage: 'radial-gradient(circle, rgba(16, 185, 129, 0.05) 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }}
    />
  )
}
