import { assets } from "../assets/assets";

const images = {
  lectureHall: {
    src: assets.s1,
    alt: "Lecture Hall",
  },
  studentLaptop: {
    src: assets.s2,
    alt: "Student Laptop",
  },
  studentsWorking: {
    src: assets.s3,
    alt: "Students Working",
  },
  reading: {
    src: assets.s4,
    alt: "Reading",
  },
  graduationJoy: {
    // Original ID (photo-1523050854058-8df90110c9f1) 404s — replaced with a verified working photo.
    src: assets.s6,
    alt: "Graduation Joy",
  },
  campusArchitecture: {
    src: assets.s7,
    alt: "Campus Architecture",
  },
  graduate: {
    src: assets.s8,
    alt: "Graduate",
  },
  studyGroup: {
    src: assets.s9,
    alt: "Study Group",
  },
};

/**
 * Desktop grid (4 cols x 3 rows), defined explicitly via grid-template-areas
 * so placement is deterministic — no per-cell responsive class combinations
 * that can silently misfire across breakpoints.
 *
 *  tall   cap1   img1   img2
 *  tall   img3   img4   cap2
 *  empty  img5   img6   img7
 */
const DESKTOP_AREAS = `
  "tall  cap1  img1  img2"
  "tall  img3  img4  cap2"
  "gap   img5  img6  img7"
`;

export default function Gallery() {
  return (
    <section className="w-full bg-[#EAF4F1] py-24">
      {/* Header */}
      <div className="max-w-[1600px] mx-auto px-6 lg:px-10 mb-12 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4">
        <span
          className="text-sm font-semibold tracking-[0.2em] uppercase text-[#FACC15]"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          Gallery
        </span>
        <h2
          className="text-5xl lg:text-6xl font-bold text-[#111184] leading-[1.05]"
          style={{ fontFamily: "'Tenor Sans', serif" }}
        >
          Life at Lebanon TTC
        </h2>
      </div>

      {/* Desktop grid — explicit areas, no responsive class juggling per cell */}
      <div className="max-w-[1600px] mx-auto px-3 hidden lg:block">
        <div
          className="grid gap-2"
          style={{
            gridTemplateAreas: DESKTOP_AREAS,
            gridTemplateColumns: "repeat(4, 1fr)",
            gridTemplateRows: "repeat(3, 260px)",
          }}
        >
          <Tile img={images.lectureHall} area="tall" />
          <Caption
            area="cap1"
            text="Lebanon TTC is Embu County's technical training destination for hands-on careers."
          />
          <Tile img={images.studentLaptop} area="img1" />
          <Tile img={images.studentsWorking} area="img2" />
          <Tile img={images.reading} area="img3" />
          <Tile img={images.graduationJoy} area="img4" />
          <Caption
            area="cap2"
            text="Book a campus tour anytime that suits you."
          />
          <Tile img={images.campusArchitecture} area="img5" />
          <Tile img={images.graduate} area="img6" />
          <Tile img={images.studyGroup} area="img7" />
          {/* "gap" area intentionally left empty for breathing room */}
        </div>
      </div>

      {/* Mobile / tablet — simple stacked flow, kept separate from the desktop
          grid entirely rather than overloaded with breakpoint variants */}
      <div className="px-3 grid grid-cols-2 gap-2 lg:hidden">
        <Tile img={images.lectureHall} className="col-span-2 aspect-[4/3]" />
        <Caption
          className="col-span-2"
          text="Lebanon TTC is Embu County's technical training destination for hands-on careers."
        />
        <Tile img={images.studentLaptop} className="aspect-square" />
        <Tile img={images.studentsWorking} className="aspect-square" />
        <Tile img={images.reading} className="aspect-square" />
        <Tile img={images.graduationJoy} className="aspect-square" />
        <Caption
          className="col-span-2"
          text="Book a campus tour anytime that suits you."
        />
        <Tile img={images.campusArchitecture} className="aspect-square" />
        <Tile img={images.graduate} className="aspect-square" />
        <Tile img={images.studyGroup} className="col-span-2 aspect-[4/3]" />
      </div>
    </section>
  );
}

function Tile({ img, area, className = "" }) {
  return (
    <div
      className={`overflow-hidden group rounded-lg ${className}`}
      style={area ? { gridArea: area } : undefined}
    >
      <img
        src={img.src}
        alt={img.alt}
        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
      />
    </div>
  );
}

function Caption({ text, area, className = "" }) {
  return (
    <div
      className={`flex items-end p-4 lg:p-5 ${className}`}
      style={area ? { gridArea: area } : undefined}
    >
      <p
        className="text-lg lg:text-xl font-semibold text-[#111184] leading-snug"
        style={{ fontFamily: "'Inter', sans-serif" }}
      >
        {text}
      </p>
    </div>
  );
}
