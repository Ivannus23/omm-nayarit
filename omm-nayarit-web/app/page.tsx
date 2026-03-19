import Image from "next/image";
import imageUrlBuilder from "@sanity/image-url";
import { sanityClient } from "@/lib/sanity.client";
import { ContactSection } from "@/components/ContactSection";
import {
  avisosQuery,
  noticiasQuery,
  fechasClaveQuery,
  documentosPorCategoriaQuery,
  galeriaQuery,
} from "@/lib/sanity.queries";

export const revalidate = 60;


const FOLDERS = {
  eliminatorio: process.env.NEXT_PUBLIC_DRIVE_FOLDER_ELIMINATORIO ?? "",
  semifinal: process.env.NEXT_PUBLIC_DRIVE_FOLDER_SEMIFINAL ?? "",
  final: process.env.NEXT_PUBLIC_DRIVE_FOLDER_FINAL ?? "",
  resultados: process.env.NEXT_PUBLIC_DRIVE_FOLDER_RESULTADOS ?? "",
};

const builder = imageUrlBuilder({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
});

function urlFor(source: any) {
  return builder.image(source);
}

type HeroImage = {
  url: string;
  caption?: string;
};

type GaleriaImage = {
  _key: string;
  url: string;
  caption?: string;
};

type GaleriaDoc = {
  title: string;
  year?: number;
  heroImage?: HeroImage;
  images?: GaleriaImage[];
};

type Documento = {
  _id: string;
  title: string;
  year?: number;
  url?: string;
};



type Aviso = {
  _id: string;
  title: string;
  summary?: string;
  link?: string;
};

type Noticia = {
  _id: string;
  title: string;
  summary?: string;
  image?: any;
};

type FechaClaveItem = {
  label: string;
  date?: string;
};

type FechasClaveDoc = {
  title: string;
  items?: FechaClaveItem[];
};

async function getFechasClave(): Promise<FechasClaveDoc | null> {
  return sanityClient.fetch(fechasClaveQuery);
};



async function getAvisos(): Promise<Aviso[]> {
  return sanityClient.fetch(avisosQuery);
}

async function getNoticias(): Promise<Noticia[]> {
  return sanityClient.fetch(noticiasQuery);
}

async function getDocumentos(category: string): Promise<Documento[]> {
  return sanityClient.fetch(documentosPorCategoriaQuery, { category });
}

async function getGaleria(): Promise<GaleriaDoc | null> {
  return sanityClient.fetch(galeriaQuery);
}


export default async function HomePage() {
  const [
    avisos,
    noticias,
    fechasClave,
    docsConvocatoria,
    docsResultadosFinales,
    docsCalendario,
    docsExEliminatorio,
    docsExSemifinal,
    docsExFinal,
    docsResultados,
    galeria,
  ] = await Promise.all([
    getAvisos(),
    getNoticias(),
    getFechasClave(),
    getDocumentos("convocatoria"),
    getDocumentos("resultados-finales"),
    getDocumentos("calendario"),
    getDocumentos("examen-eliminatorio"),
    getDocumentos("examen-semifinal"),
    getDocumentos("examen-final"),
    getDocumentos("resultados"),
    getGaleria(),
  ]);

  const heroImage: HeroImage | null = galeria?.heroImage ?? null;
  const galleryImages: GaleriaImage[] = galeria?.images ?? [];

  return (
    <>
      <HeroSection fechasClave={fechasClave} heroImage={heroImage} />
      <ConvocatoriaSection
        convocatoria={docsConvocatoria}
        resultadosFinales={docsResultadosFinales}
        calendario={docsCalendario}
      />
      <HowItWorksSection />
      <AvisosSection avisos={avisos} />
      <NoticiasSection noticias={noticias} />
      <ExamsSection
        eliminatorio={docsExEliminatorio}
        semifinal={docsExSemifinal}
        final={docsExFinal}
      />
      <ResultadosSection documentos={docsResultados} />
      <GallerySection galeria={galeria} images={galleryImages} />
      <NosotrosSection />
      <ContactSection />
    </>
  );
}




function HeroSection({
  fechasClave,
  heroImage,
}: {
  fechasClave: FechasClaveDoc | null;
  heroImage: HeroImage | null;
}) {
  const items = fechasClave?.items ?? [];
  const tieneFechas = items.length > 0;

  return (
    <section
      id="inicio"
      className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-950/80 px-4 py-8 sm:px-6 sm:py-10"
    >

  <div className="pointer-events-none absolute -right-8 -top-10 h-32 w-32 opacity-10 sm:-right-12 sm:-top-12 sm:h-40 sm:w-40">
    <Image
      src="/logo-omm-nayarit.svg"
      alt="Logo OMM Nayarit"
      fill
      className="object-contain"
    />
  </div>

      {/* Fondo: imagen + degradado */}
      {heroImage?.url && (
        <>
          <Image
            src={heroImage.url}
            alt={
              heroImage.caption ||
              "Participantes de la Olimpiada Estatal de Matemáticas en Nayarit"
            }
            fill
            priority
            className="object-cover opacity-40"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-950/70 via-slate-950/40 to-slate-950/90" />
        </>
      )}

      {/* Contenido por encima */}
      <div className="relative grid gap-8 md:grid-cols-[1.2fr_0.8fr] md:items-stretch">
        {/* Columna izquierda: texto */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-[11px] text-blue-100">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span className="font-semibold uppercase tracking-[0.2em]">
              OMM Nayarit
            </span>
            <span className="text-blue-200/70">Comité estatal · UAN</span>
          </div>

          <h1 className="text-3xl font-bold leading-tight sm:text-4xl md:text-5xl">
            Olimpiada Estatal de Matemáticas{" "}
            <span className="block text-blue-300">Nayarit</span>
          </h1>

          <p className="mt-2 text-sm text-slate-200 sm:text-base">
            Entrena, resuelve problemas y representa a Nayarit en la Olimpiada
            Mexicana de Matemáticas. Aquí encuentras convocatorias, exámenes,
            resultados y material oficial del comité estatal.
          </p>

          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href="#convocatoria"
              className="inline-flex items-center justify-center rounded-full bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-blue-900/40 hover:bg-blue-500"
            >
              {tieneFechas ? "Ver convocatoria vigente" : "Ver convocatoria"}
            </a>
            <a
              href="#examenes"
              className="inline-flex items-center justify-center rounded-full border border-slate-200/40 bg-slate-900/40 px-5 py-2.5 text-sm font-semibold text-slate-50 hover:border-slate-200/70"
            >
              Exámenes anteriores
            </a>
          </div>

          <div className="mt-4 flex flex-wrap gap-6 text-xs text-slate-200/90">
            <div>
              <p className="font-semibold text-slate-50">+20 años</p>
              <p>de historia en Nayarit</p>
            </div>
            <div>
              <p className="font-semibold text-slate-50">Niveles</p>
              <p>Secundaria y Media Superior</p>
            </div>
            <div>
              <p className="font-semibold text-slate-50">Sede</p>
              <p>Universidad Autónoma de Nayarit</p>
            </div>
          </div>
        </div>

        {/* Columna derecha: tarjeta de fechas */}
        <div className="flex items-stretch">
          <div className="w-full rounded-2xl border border-slate-700/70 bg-slate-950/80 p-5 backdrop-blur">
            <h2 className="text-sm font-semibold text-slate-50">
              {fechasClave?.title || "Fechas oficiales"}
            </h2>

            {items.length === 0 ? (
              <p className="mt-3 text-xs text-slate-300">
                Próximamente se publicarán las fechas oficiales de la etapa estatal.
              </p>
            ) : (
              <ul className="mt-3 space-y-2 text-xs text-slate-200">
                {items.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex justify-between border-b border-slate-800 pb-2 last:border-b-0"
                  >
                    <span>{item.label}</span>
                    <span className="text-slate-400">
                      {item.date
                        ? new Date(item.date).toLocaleDateString("es-MX")
                        : ""}
                    </span>
                  </li>
                ))}
              </ul>
            )}

            <a
              href="#resultados"
              className="mt-4 inline-block text-xs font-semibold text-blue-300 hover:text-blue-200"
            >
              Ver últimos resultados →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}




// helper opcional, arriba del componente
function galeriaTitleForHero(fechasClave: FechasClaveDoc | null) {
  return "Olimpiada Estatal de Matemáticas · Nayarit";
}





function ConvocatoriaSection({
  convocatoria,
  resultadosFinales,
  calendario,
}: {
  convocatoria: Documento[];
  resultadosFinales: Documento[];
  calendario: Documento[];
}) {
  return (
    <section id="convocatoria" className="border-t border-slate-800 py-10">
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold">Convocatoria y documentos</h2>
          <p className="mt-2 max-w-3xl text-sm text-slate-300">
            Documentos oficiales de la Olimpiada Estatal de Matemáticas en Nayarit:
            convocatoria vigente, resultados finales y calendario de entrenamientos.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <DocCard
            title="Convocatoria"
            text="Bases, requisitos y etapas de la Olimpiada Estatal de Matemáticas."
            documentos={convocatoria}
          />
          <DocCard
            title="Resultados finales"
            text="Listado oficial de ganadores y delegación estatal."
            documentos={resultadosFinales}
          />
          <DocCard
            title="Calendario de entrenamientos"
            text="Fechas y horarios de las sesiones de entrenamiento."
            documentos={calendario}
          />
        </div>
      </div>
    </section>
  );
}


function HowItWorksSection() {
  const steps = [
    {
      title: "1. Tu escuela se registra",
      text: "El docente responsable llena la convocatoria y registra a sus estudiantes en la etapa estatal.",
      icon: "🏫",
    },
    {
      title: "2. Exámenes y selección",
      text: "Las y los participantes presentan exámenes eliminatorio, semifinal y final para seleccionar a la delegación.",
      icon: "✏️",
    },
    {
      title: "3. Entrenamientos y nacional",
      text: "El comité organiza entrenamientos para preparar a la delegación rumbo a la fase nacional de la OMM.",
      icon: "📚",
    },
  ];

  return (
    <section className="border-t border-slate-800 bg-slate-950 py-10">
      <div className="space-y-6">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-xl font-semibold">¿Cómo funciona la Olimpiada?</h2>
            <p className="mt-2 max-w-3xl text-sm text-slate-300">
              Queremos que el proceso sea claro para estudiantes, docentes y
              familias. Estos son los pasos generales de la etapa estatal en Nayarit.
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {steps.map((step) => (
            <article
              key={step.title}
              className="flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-900/70 p-4"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-600/20 text-lg">
                <span>{step.icon}</span>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-slate-100">
                  {step.title}
                </h3>
                <p className="mt-1 text-xs text-slate-300">{step.text}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}


function DocCard({
  title,
  text,
  documentos,
}: {
  title: string;
  text: string;
  documentos: Documento[];
}) {
  const principal = documentos[0];

  return (
    <article className="flex flex-col justify-between rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
      <div>
        <h3 className="text-sm font-semibold text-slate-100">{title}</h3>
        <p className="mt-2 text-xs text-slate-300">{text}</p>
      </div>

      {principal ? (
        <>
          <a
            href={principal.url}
            target="_blank"
            className="mt-4 inline-flex items-center justify-center rounded-full bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-500"
          >
            Descargar PDF {principal.year ? `(${principal.year})` : ""}
          </a>
          {documentos.length > 1 && (
            <p className="mt-2 text-[11px] text-slate-400">
              También disponibles:{" "}
              {documentos.slice(1).map((d, i) => (
                <span key={d._id}>
                  {i > 0 && ", "}
                  {d.year ?? "s/f"}
                </span>
              ))}
            </p>
          )}
        </>
      ) : (
        <p className="mt-4 text-[11px] text-slate-400">
          Aún no hay documentos cargados en esta sección.
        </p>
      )}
    </article>
  );
}


function AvisosSection({ avisos }: { avisos: Aviso[] }) {
  return (
    <section className="border-t border-slate-800 bg-slate-950 py-10">
      <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
        <div>
          <h2 className="text-xl font-semibold">Avisos / Convocatorias</h2>
          <p className="mt-2 max-w-3xl text-sm text-slate-300">
            Comunicados recientes del comité estatal: convocatoria vigente, avisos
            importantes y documentos relevantes para escuelas y participantes.
          </p>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/80 p-4 text-sm shadow-lg">
          {avisos.length === 0 && (
            <p className="text-xs text-slate-400">
              No hay avisos publicados todavía.
            </p>
          )}

          {avisos.map((aviso, idx) => (
            <div key={aviso._id}>
              <a
                href={aviso.link ?? "#"}
                target={aviso.link ? "_blank" : undefined}
                rel={aviso.link ? "noopener noreferrer" : undefined}
                className="block py-3 text-xs text-blue-400 hover:text-blue-300"
              >
                {aviso.title}
              </a>
              {idx < avisos.length - 1 && (
                <div className="my-1 h-px w-full bg-slate-800" />
              )}
            </div>
          ))}

          {avisos.length > 0 && (
            <div className="mt-3 text-center">
              <button className="text-xs font-semibold text-blue-400 hover:text-blue-300">
                Ver más
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

function NoticiasSection({ noticias }: { noticias: Noticia[] }) {
  const principal = noticias[0];
  const secundarias = noticias.slice(1);

  return (
    <section className="border-t border-slate-800 bg-slate-950 py-10">
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Noticias</h2>

        {noticias.length === 0 && (
          <p className="text-sm text-slate-400">
            Aún no hay noticias publicadas.
          </p>
        )}

        {noticias.length > 0 && (
          <div className="grid gap-4 rounded-3xl border border-slate-800 bg-slate-900/80 p-4 shadow-lg md:grid-cols-[1.4fr_0.9fr]">
            {/* principal */}
            <article className="flex flex-col">
              {principal?.image && (
                <div className="relative mb-3 h-52 w-full overflow-hidden rounded-2xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={urlFor(principal.image).width(800).height(400).url()}
                    alt={principal.title}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}
              <h3 className="text-sm font-semibold text-slate-100">
                {principal.title}
              </h3>
              <p className="mt-2 text-xs text-slate-300">
                {principal.summary}
              </p>
            </article>

            {/* secundarias */}
            <div className="space-y-3">
              {secundarias.map((n) => (
                <article
                  key={n._id}
                  className="grid grid-cols-[80px,1fr] gap-3 rounded-2xl bg-slate-900/60 p-2"
                >
                  {n.image && (
                    <div className="relative h-16 w-20 overflow-hidden rounded-xl">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={urlFor(n.image).width(160).height(100).url()}
                        alt={n.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex flex-col justify-center">
                    <h4 className="text-xs font-semibold text-slate-100">
                      {n.title}
                    </h4>
                    <p className="mt-1 line-clamp-2 text-[11px] text-slate-400">
                      {n.summary}
                    </p>
                  </div>
                </article>
              ))}

              {secundarias.length > 0 && (
                <button className="mt-1 text-xs font-semibold text-blue-400 hover:text-blue-300">
                  Ver más
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function ExamsSection({
  eliminatorio,
  semifinal,
  final,
}: {
  eliminatorio: Documento[];
  semifinal: Documento[];
  final: Documento[];
}) {
  return (
    <section
      id="examenes"
      className="border-t border-slate-800 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-950 py-10"
    >
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold">Exámenes de años anteriores</h2>
          <p className="mt-2 max-w-3xl text-sm text-slate-300">
            Esta sección se actualiza desde el panel del comité. Para agregar un examen
            solo hay que subir el PDF como “Documento descargable” en la categoría
            correspondiente.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <ExamColumn
            title="Exámenes eliminatorios"
            documentos={eliminatorio}
          />
          <ExamColumn
            title="Exámenes semifinales"
            documentos={semifinal}
          />
          <ExamColumn
            title="Exámenes finales"
            documentos={final}
          />
        </div>
      </div>
    </section>
  );
}

function ExamColumn({
  title,
  documentos,
}: {
  title: string;
  documentos: Documento[];
}) {
  return (
    <div>
      <h3 className="mb-2 text-sm font-semibold text-slate-100">{title}</h3>
      <ul className="rounded-2xl border border-slate-800 bg-slate-900/70 p-3 text-xs">
        {documentos.length === 0 && (
          <li className="text-slate-400">Aún no hay documentos cargados.</li>
        )}
        {documentos.map((doc) => (
          <li
            key={doc._id}
            className="flex items-center justify-between border-b border-slate-800 py-1 last:border-b-0"
          >
            <span className="pr-3 text-slate-100">
              {doc.year ? `${doc.year} · ` : ""}
              {doc.title}
            </span>
            <a
              href={doc.url}
              target="_blank"
              className="text-[11px] text-blue-400 hover:text-blue-300"
            >
              Ver PDF
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}


function ResultadosSection({ documentos }: { documentos: Documento[] }) {
  return (
    <section id="resultados" className="border-t border-slate-800 py-10">
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-semibold">Resultados</h2>
          <p className="mt-2 max-w-3xl text-sm text-slate-300">
            Resultados oficiales publicados por el comité estatal. Cada documento
            corresponde a un año o fase específica de la Olimpiada Estatal de Matemáticas.
          </p>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
          <h3 className="mb-2 text-sm font-semibold text-slate-100">
            Resultados por año
          </h3>
          {documentos.length === 0 ? (
            <p className="text-xs text-slate-400">
              Aún no hay resultados cargados en esta sección.
            </p>
          ) : (
            <ul className="text-xs">
              {documentos.map((doc) => (
                <li
                  key={doc._id}
                  className="flex items-center justify-between border-b border-slate-800 py-1 last:border-b-0"
                >
                  <span className="pr-3 text-slate-100">
                    {doc.year ? `${doc.year} · ` : ""}
                    {doc.title}
                  </span>
                  <a
                    href={doc.url}
                    target="_blank"
                    className="text-[11px] text-blue-400 hover:text-blue-300"
                  >
                    Ver PDF
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  );
}


function NosotrosSection() {
  return (
    <section id="nosotros" className="border-t border-slate-800 py-10">
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-semibold">
            Sobre la Olimpiada Estatal de Matemáticas · Nayarit
          </h2>
          <p className="mt-2 max-w-3xl text-sm text-slate-300">
            La Olimpiada Estatal de Matemáticas en Nayarit es organizada por un comité de
            profesores y académicos que colaboran de manera voluntaria.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <h3 className="mb-2 text-sm font-semibold">Comité</h3>
            <ul className="list-disc space-y-1 pl-4 text-xs text-slate-200">
              <li>
                <strong>MC. Juan Felipe Flores Robles</strong> — Delegado
              </li>
              <li>
                <strong>Dr. Francisco Javier Jara Ulloa</strong> — Co-delegado
              </li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <h3 className="mb-2 text-sm font-semibold">Organizadores</h3>
            <ul className="list-disc space-y-1 pl-4 text-xs text-slate-200">
              <li>Dr. Francisco Javier Jara Ulloa</li>
              <li>Dr. José Trinidad Ulloa Ibarra</li>
              <li>M.C. Juan Felipe Flores Robles</li>
              <li>M.C. Héctor Ocampo Anguiano</li>
              <li>M.C. Francia Carbajal Esparza</li>
              <li>M.C. Miriam Carolina Ortiz Torrescano</li>
              <li>Dr. Pablo Eduardo Cancino Marentes</li>
              <li>Alejandro Rico Torres</li>
              <li>Lic. A Rico Torres</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/70 p-4">
            <h3 className="mb-2 text-sm font-semibold">Historia de delegados</h3>
            <div className="space-y-3 text-xs text-slate-200">
              <Delegate
                name="M.C. Juan Felipe Flores Robles"
                period="2022 · Actualidad"
                img="/delegado_juan_felipe.avif"
                initial="J"
              />
              <Delegate
                name="Dr. Francisco Javier Jara Ulloa"
                period="2010 · 2022"
                img="/delegado_francisco_jara.avif"
                initial="F"
              />
              <Delegate
                name="Prof. Rodolfo Dávalos Mejía"
                period="2000 · 2010"
                initial="R"
              />
              <Delegate
                name="M.C. Oscar Ariel Parra Ortiz"
                period="1993 · 2000"
                img="/delegado_oscar_parra.avif"
                initial="O"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


function GallerySection({
  galeria,
  images,
}: {
  galeria: GaleriaDoc | null;
  images: GaleriaImage[];
}) {
  return (
    <section className="border-t border-slate-800 bg-slate-950 py-10">
      <div className="space-y-4">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-xl font-semibold">Momentos de la Olimpiada</h2>
            <p className="mt-2 max-w-3xl text-sm text-slate-300">
              {galeria
                ? `Imágenes de la edición ${
                    galeria.year ?? ""
                  } de la Olimpiada Estatal de Matemáticas en Nayarit.`
                : "Imágenes de ediciones de la Olimpiada Estatal de Matemáticas en Nayarit."}
            </p>
          </div>
          {galeria?.year && (
            <span className="rounded-full border border-slate-700 px-3 py-1 text-[11px] text-slate-300">
              Edición {galeria.year}
            </span>
          )}
        </div>

        {images.length === 0 ? (
          <p className="text-xs text-slate-400">
            Aún no se han cargado imágenes en la galería. El comité puede
            subirlas desde el panel de Sanity.
          </p>
        ) : (
          <div className="grid gap-3 md:grid-cols-4">
            {/* imagen grande principal de la galería */}
            <figure className="relative h-64 overflow-hidden rounded-2xl border border-slate-800 md:col-span-2 md:row-span-2">
              <Image
                src={images[0].url}
                alt={
                  images[0].caption ||
                  "Imagen de la Olimpiada Estatal de Matemáticas"
                }
                fill
                className="object-cover"
              />
              {images[0].caption && (
                <figcaption className="absolute inset-x-0 bottom-0 bg-slate-950/70 px-3 py-1.5 text-[11px] text-slate-100">
                  {images[0].caption}
                </figcaption>
              )}
            </figure>

            {/* demás imágenes */}
            {images.slice(1).map((img) => (
              <figure
                key={img._key}
                className="relative h-32 overflow-hidden rounded-2xl border border-slate-800"
              >
                <Image
                  src={img.url}
                  alt={img.caption || "Imagen de la Olimpiada"}
                  fill
                  className="object-cover"
                />
                {img.caption && (
                  <figcaption className="absolute inset-x-0 bottom-0 bg-slate-950/70 px-2 py-1 text-[10px] text-slate-100">
                    {img.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}




function Delegate({
  name,
  period,
  img,
  initial,
}: {
  name: string;
  period: string;
  img?: string;
  initial: string;
}) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-12 w-12 items-center justify-center rounded-full border border-blue-500 bg-slate-900 text-sm font-bold">
        {img ? (
          <Image
            src={img}
            alt={name}
            width={48}
            height={48}
            className="h-11 w-11 rounded-full object-cover"
          />
        ) : (
          <span>{initial}</span>
        )}
      </div>
      <div>
        <p className="font-semibold">{name}</p>
        <p className="text-slate-400">{period}</p>
      </div>
    </div>
  );
}
