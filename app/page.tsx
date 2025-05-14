import SpinnerGrid from './components/SpinnerGrid';
import ScrollReveal from './components/ScrollReveal';
import Link from 'next/link';
import Image from 'next/image';
import { playfair } from './fonts';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-[#0c0c0c] to-[#1a1a1a] text-white">
      {/* Video Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/SpinDark.mov" type="video/mp4" />
        </video>
        
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black/70" />
        
        {/* Content Overlay */}
        <div className="relative z-10 h-full flex flex-col items-center justify-center -mt-32 max-w-[1000px] mx-auto px-4">
          <ScrollReveal>
            <div className="flex flex-col items-center">
              <div className="relative w-48 h-48 mb-8">
                <Image
                  src="/F_Coin.png"
                  alt="Figé Coin"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
              <h1 className={`text-[#AB9768] text-4xl sm:text-6xl font-bold mb-4 ${playfair.className}`}>
                Figé
              </h1>
              <p className="text-white text-lg sm:text-xl mb-8 text-center">
                Elevate Your Focus. Command Your Presence.
              </p>
              <Link
                href="#pre-order"
                className="border border-[#AB9768] text-[#AB9768] px-8 py-3 rounded-full hover:bg-[#AB9768] hover:text-black transition-all duration-300"
              >
                Exclusive Access
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Art of Precision Section */}
      <section className="pt-[85px] pb-32 px-4 sm:px-6 lg:px-8 bg-[#1a1f24]">
        <div className="max-w-[1000px] mx-auto">
          <ScrollReveal>
            <h2 className={`text-3xl sm:text-5xl text-center mb-8 sm:mb-16 ${playfair.className}`}>
              The Art of Precision
            </h2>
          </ScrollReveal>
          <ScrollReveal>
            <p className="text-base sm:text-lg text-gray-300 text-center mx-auto mb-8 sm:mb-16 leading-relaxed">
              Born from years of relentless refinement, Figé is the pinnacle of focus tool design. 
              Its fidgetability knows no bounds—the crisp snap of brass ball bearings clicking into place, 
              the play between asymmetric spins and balanced whirls, the satisfying feel of a perfect 
              flick beneath your fingers. This is more than a spinner. It is a meditation on motion 
              and a testament to craft.
            </p>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['/Hero.jpg', '/Spinning.jpg', '/Snapping.jpg'].map((src, index) => (
              <div key={src}>
                <ScrollReveal>
                  <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                    <Image
                      src={src}
                      alt={`Figé Spinner ${index === 0 ? 'Hero Shot' : index === 1 ? 'in Motion' : 'Close-up'}`}
                      fill
                      className="object-cover transition-transform duration-700 hover:scale-110"
                    />
                  </div>
                </ScrollReveal>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About the Creator Section */}
      <section className="pt-[85px] pb-32 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-[1000px] mx-auto">
          <ScrollReveal>
            <h2 className={`text-3xl sm:text-5xl text-center mb-8 sm:mb-16 ${playfair.className}`}>
              About the Creator
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-5">
              <ScrollReveal>
                <div className="relative aspect-square w-full overflow-hidden rounded-2xl">
                  <Image
                    src="/JonF.jpg"
                    alt="Jon Friedman"
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-110"
                    priority
                  />
                </div>
              </ScrollReveal>
            </div>
            <div className="md:col-span-7">
              <ScrollReveal>
                <div className="flex flex-col gap-6 py-4">
                  <h3 className="text-2xl sm:text-3xl font-medium">
                    Crafted by a Design Executive
                  </h3>
                  <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                    Years in the making and refined through thousands of iterations, each Figé spinner is hand-assembled in Jon's home studio—where design, engineering, and elegance converge. Limited to just five numbered pieces, each one is individually etched and comes with a signed certificate of authenticity.
                  </p>
                  <a 
                    href="https://www.linkedin.com/in/designjon/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#AB9768] hover:text-white transition-colors duration-300"
                  >
                    Learn more about Jon
                  </a>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Materials & Craftsmanship Section */}
      <section className="pt-[85px] pb-32 px-4 sm:px-6 lg:px-8 bg-[#1a1f24]">
        <div className="max-w-[1000px] mx-auto">
          <ScrollReveal>
            <h2 className={`text-3xl sm:text-5xl text-center mb-8 sm:mb-16 ${playfair.className}`}>
              Materials & Craftsmanship
            </h2>
          </ScrollReveal>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-7">
              <ScrollReveal>
                <div className="flex flex-col gap-6 py-4">
                  <p className="text-2xl sm:text-3xl font-medium text-gray-300 leading-relaxed">
                    Every detail matters.
                  </p>
                  <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                    Crafted from carbon fiber–filled PETG, the spinner is strong, subtly glossy, and beautifully grained. Brass inlays and ball bearings give it a nostalgic, weighty balance, while premium R188 bearings ensure smooth, quiet, and long-lasting performance.
                  </p>
                  <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
                    This is functional sculpture for your desk.
                  </p>
                </div>
              </ScrollReveal>
            </div>
            <div className="md:col-span-5">
              <ScrollReveal>
                <div className="relative aspect-square w-full overflow-hidden rounded-2xl">
                  <Image
                    src="/Workbench.jpg"
                    alt="Figé Spinner Craftsmanship"
                    fill
                    className="object-cover transition-transform duration-700 hover:scale-110"
                    priority
                  />
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Executive Presence Section */}
      <section className="pt-[85px] pb-32 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-[1000px] mx-auto">
          <ScrollReveal>
            <h2 className={`text-3xl sm:text-5xl text-center mb-8 sm:mb-16 ${playfair.className}`}>
              A Tactile Anchor for Executive Presence
            </h2>
          </ScrollReveal>
          <ScrollReveal>
            <p className="text-base sm:text-lg text-gray-300 text-center mx-auto mb-8 sm:mb-16 leading-relaxed max-w-[800px]">
              In high-pressure moments, Figé becomes your discreet tool for clarity. It calms nerves, sharpens focus, 
              and anchors attention. Precision you can feel. Presence you can command.
            </p>
          </ScrollReveal>
          <ScrollReveal>
            <div className="relative aspect-[16/9] w-full max-w-[800px] mx-auto overflow-hidden rounded-2xl">
              <Image
                src="/Executive.jpg"
                alt="Executive with Figé Spinner"
                fill
                className="object-cover transition-transform duration-700 hover:scale-110"
                priority
              />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Lifetime Assurance Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#1a1f24] relative">
        <div className="max-w-[1000px] mx-auto">
          <ScrollReveal>
            <div>
              <div className="w-full h-px bg-white/20 mb-8 sm:mb-12" />
              
              <h2 className={`text-3xl sm:text-5xl text-center mb-6 sm:mb-8 ${playfair.className}`}>
                Lifetime Assurance
              </h2>
              <p className="text-base sm:text-lg text-gray-300 text-center mx-auto mb-8 sm:mb-12 leading-relaxed max-w-[1000px]">
                Figé is built to last. If it ever breaks, we'll replace it—no questions asked. This is our lifetime guarantee.
              </p>
              
              <div className="w-full h-px bg-white/20" />
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Pre-order Section */}
      <section id="pre-order" className="pt-[85px] pb-24 px-4 sm:px-6 lg:px-8 bg-black">
        <div className="max-w-[1000px] mx-auto text-center">
          <ScrollReveal>
            <h2 className={`text-3xl sm:text-5xl text-center mb-8 sm:mb-16 ${playfair.className}`}>
              Secure Your Exclusive Unit
            </h2>
          </ScrollReveal>
          <ScrollReveal>
            <SpinnerGrid />
          </ScrollReveal>
        </div>
      </section>
    </main>
  );
}
