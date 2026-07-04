import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { useScrollAnimationGroup } from "../hooks/useScrollAnimationGroup";
import { useParallax } from "../hooks/useParallax";
import { assets } from "../assets/assets";

const schools = [
  {
    id: "business",
    code: "SB.01",
    title: "School of Business",
    desc: "Practical, NITA-accredited courses for entrepreneurs and professionals building commercial skill.",
    img: assets.sl5,
  },
  {
    id: "leadership",
    code: "SB.02",
    title: "School of Leadership & Management",
    desc: "Supervisory, strategic, and administrative programs for people stepping into management.",
    img: assets.sl7,
  },
];

function SchoolCard({ school: s, cardRef }) {
  const imgRef = useParallax(-0.12);

  return (
    <div ref={cardRef} className="relative">
      {/* Image — parallax, fixed frame */}
      <div className="relative overflow-hidden" style={{ height: "380px" }}>
        <img
          ref={imgRef}
          src={s.img}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover scale-125"
          style={{
            willChange: "transform",
            filter: "saturate(0.9) brightness(0.82)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(11,16,96,0.15) 0%, rgba(11,16,96,0.05) 40%, rgba(11,16,96,0.55) 100%)",
          }}
        />
      </div>

      {/* Caption card — overlaps the image via negative margin, corner clipped like a stub */}
      <div
        className="relative z-10 mx-4 sm:mx-6 -mt-16 sm:-mt-20 px-6 sm:px-8 pt-6 pb-7 sm:pt-7 sm:pb-8"
        style={{
          background: "#FAF7EF",
          clipPath: "polygon(28px 0, 100% 0, 100% 100%, 0 100%, 0 28px)",
          boxShadow: "0 18px 40px -12px rgba(11,16,96,0.35)",
        }}
      >
        <span
          className="block text-[11px] tracking-[0.2em] uppercase mb-2"
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 600,
            color: "#B8121E",
          }}
        >
          {s.code}
        </span>

        <h3
          className="text-[#0B1060] text-xl sm:text-2xl leading-snug mb-3"
          style={{ fontFamily: "'Tenor Sans', serif", fontWeight: 400 }}
        >
          {s.title}
        </h3>

        <div className="w-10 h-[2px] mb-3" style={{ background: "#FACC15" }} />

        <p
          className="text-[#0B1060]/70 text-sm leading-relaxed max-w-sm"
          style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 300 }}
        >
          {s.desc}
        </p>
      </div>
    </div>
  );
}

export default function Faculty() {
  const eyebrowRef = useScrollAnimation({ delay: 0 });
  const headingRef = useScrollAnimation({ delay: 100 });
  const gridRef = useScrollAnimationGroup({
    staggerMs: 160,
    animVars: { ty: "40px", op: "0", sc: "0.98" },
  });

  return (
    <section className="w-full bg-[#111184] py-20 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="max-w-[1440px] mx-auto">
        {/* Header */}
        <div className="max-w-3xl mb-10 sm:mb-14">
          <span
            ref={eyebrowRef}
            className="text-yellow-400 font-semibold text-[11px] sm:text-xs tracking-[0.2em] uppercase mb-3 block"
            style={{
              fontFamily: "'Poppins', sans-serif",
              "--anim-tx": "-20px",
              "--anim-ty": "0px",
              "--anim-op": "0",
              "--anim-sc": "1",
              "--anim-ro": "0deg",
            }}
          >
            Our Schools
          </span>
          <h2
            ref={headingRef}
            className="text-white text-2xl sm:text-4xl leading-snug tracking-tight"
            style={{
              fontFamily: "'Tenor Sans', serif",
              fontWeight: 400,
              "--anim-tx": "0px",
              "--anim-ty": "16px",
              "--anim-op": "0",
              "--anim-sc": "1",
              "--anim-ro": "0deg",
            }}
          >
            Business &amp; Leadership, taught for the real world
          </h2>
        </div>

        {/* Cards */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-14 sm:gap-y-16"
        >
          {schools.map((s) => (
            <SchoolCard key={s.id} school={s} cardRef={gridRef.itemRef} />
          ))}
        </div>
      </div>
    </section>
  );
}
