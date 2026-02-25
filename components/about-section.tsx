type AboutDictionary = {
  title: string;
  paragraphOne: string;
  paragraphTwo: string;
};

export function AboutSection({ dictionary }: { dictionary: AboutDictionary }) {
  return (
    <section id="about">
      <div className="relative">
        <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
          {dictionary.title}
        </h2>
        <div className="absolute -left-4 top-1 h-8 w-1 rounded-full bg-secondary md:-left-8" />
      </div>

      <div className="mt-6 flex flex-col gap-6 text-lg leading-relaxed text-muted-foreground">
        <p>{dictionary.paragraphOne}</p>
        <p>{dictionary.paragraphTwo}</p>
      </div>
    </section>
  );
}
