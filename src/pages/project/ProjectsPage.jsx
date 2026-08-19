import Projects from "./Projects";

export default function ProjectsPage() {
  return (
    <main className="bg-white pt-24">
      <section className="px-5 py-12">
        <div className="mx-auto max-w-7xl border-b border-gray-100 pb-10">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.25em] text-green-700">
            Apartment Project
          </p>
          <h1 className="max-w-4xl text-4xl font-black leading-tight text-gray-950 md:text-6xl">
            Featured projects in one full page view
          </h1>
          <p className="mt-5 max-w-2xl text-sm leading-7 text-gray-600 md:text-base">
            Browse the same featured apartment projects with more room for scanning, comparing, and opening each project detail.
          </p>
        </div>
      </section>
      <Projects fullWidth view="grid" />
    </main>
  );
}
