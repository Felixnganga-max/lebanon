import { useScrollAnimation } from "../hooks/useScrollAnimation";
import { useScrollAnimationGroup } from "../hooks/useScrollAnimationGroup";

const features = [
  {
    icon: "groups",
    title: "Certified Teachers",
    desc: "Our faculty consists of industry experts and PhD holders committed to academic excellence and student success.",
  },
  {
    icon: "assignment",
    title: "Trending Courses",
    desc: "Curriculum designed to meet the evolving demands of the global job market and technological landscape.",
  },
  {
    icon: "school",
    title: "Certification",
    desc: "Earn internationally recognized certifications that validate your skills and enhance your professional credibility.",
  },
  {
    icon: "devices",
    title: "Online Courses",
    desc: "Flexible learning options that allow you to balance your education with professional and personal commitments.",
  },
];

export default function WhyChooseUs() {
  const headingRef = useScrollAnimation({ delay: 0 });
  const gridRef = useScrollAnimationGroup({
    staggerMs: 120,
    animVars: { ty: "50px", op: "0", sc: "0.97" },
  });

  return (
    <section className="w-full bg-white py-24 px-4 overflow-hidden">
      <link
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
        rel="stylesheet"
      />
      <div className="max-w-[1440px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
        {/* Left heading block */}
        <div
          ref={headingRef}
          className="lg:col-span-5"
          style={{
            "--anim-tx": "-60px",
            "--anim-ty": "0px",
            "--anim-op": "0",
            "--anim-sc": "1",
            "--anim-ro": "0deg",
          }}
        >
          <h2
            className="text-5xl text-[#111184] mb-8 leading-tight font-bold"
            style={{ fontFamily: "'Tenor Sans', serif" }}
          >
            Why Choose Us
          </h2>
          <div className="w-16 h-1 bg-yellow-400 mb-8" />
          <p className="text-gray-500 text-lg leading-relaxed">
            Our institution is dedicated to providing industry-leading education
            that bridges the gap between theoretical knowledge and practical
            expertise.
          </p>
        </div>

        {/* Right features grid — horizontal scroll on mobile */}
        <div className="lg:col-span-7 overflow-x-auto pb-2 lg:overflow-visible">
          <div
            ref={gridRef}
            className="flex lg:grid lg:grid-cols-2 gap-10 lg:gap-12 border-l border-gray-200 pl-4 lg:pl-12"
            style={{ minWidth: "max-content" }}
          >
            {features.map((f) => (
              <div
                key={f.title}
                className="flex flex-col gap-4"
                style={{ minWidth: "220px", maxWidth: "260px" }}
              >
                <div className="text-[#dc2626]">
                  <span className="material-symbols-outlined text-5xl">
                    {f.icon}
                  </span>
                </div>
                <h3
                  className="text-xl font-bold text-[#111184]"
                  style={{ fontFamily: "'Tenor Sans', serif" }}
                >
                  {f.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {f.desc}
                </p>
                <a
                  href="#"
                  className="text-[#dc2626] font-bold text-xs uppercase tracking-widest border-b-2 border-[#dc2626]/30 w-fit pb-1 hover:border-[#dc2626] transition-all"
                >
                  More
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
