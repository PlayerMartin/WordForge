// app/game/[id]/layout.tsx

const GameLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      {children}
    </div>
  );
};

export default GameLayout;
