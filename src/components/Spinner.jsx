const heroLogo = "/images/heroLogo.gif";

const Spinner = () => {
  return (
    <div className="fixed inset-0 z-[999] flex items-center justify-center overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(34,197,94,0.16),_transparent_34%),linear-gradient(180deg,#f8fff7_0%,#eef9ee_46%,#ffffff_100%)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,197,94,0.12),transparent_22%),radial-gradient(circle_at_80%_18%,rgba(234,179,8,0.1),transparent_18%)]" />

      <div className="relative flex flex-col items-center gap-5 px-6 text-center">
        <div className="absolute h-40 w-40 rounded-full bg-green-500/10 blur-3xl" />
        <div className="relative flex h-32 w-32 items-center justify-center rounded-full border border-green-200 bg-white/85 p-3 shadow-[0_28px_70px_-30px_rgba(22,101,52,0.45)] backdrop-blur sm:h-36 sm:w-36">
          <div className="absolute inset-2 animate-pulse rounded-full border border-dashed border-green-300/70" />
          <img src={heroLogo} alt="North South Group loading" className="relative h-full w-full rounded-full object-contain" />
        </div>
        <div className="space-y-2">
          <p
            className="text-[0.72rem] font-bold uppercase tracking-[0.32em] text-green-700"
            style={{ fontFamily: '"Montserrat", sans-serif' }}
          >
            North South Group
          </p>
          <p
            className="text-sm font-medium text-slate-600 sm:text-base"
            style={{ fontFamily: '"Montserrat", sans-serif' }}
          >
            Loading your experience...
          </p>
        </div>
      </div>
    </div>
  );
};

export default Spinner;
