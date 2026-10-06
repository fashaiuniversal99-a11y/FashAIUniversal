import React from "react";
import { BRAND_PROOF_DATA } from "@/data/brand-proof";

interface VerifiedGuestsPartnersSectionProps {
  className?: string;
  title?: string;
}

export const VerifiedGuestsPartnersSection: React.FC<VerifiedGuestsPartnersSectionProps> = ({
  className = "",
  title = "Verified Partners & Corporate Proof",
}) => {
  const { guests, partners, sponsors, mediaPartners, creativePartners } = BRAND_PROOF_DATA;

  const totalVerifiedCount =
    guests.length + partners.length + sponsors.length + mediaPartners.length + creativePartners.length;

  // If no verified public proof records exist, render safely nothing
  if (totalVerifiedCount === 0) {
    return null;
  }

  return (
    <section className={`py-12 bg-neutral-950 border-t border-b border-neutral-900/60 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="text-[#D4AF37] font-medium tracking-[0.2em] text-xs uppercase block mb-2 font-jost">
            Official Affiliations
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif text-white tracking-wide font-dm-serif">
            {title}
          </h2>
        </div>

        {/* Display Verified Partners */}
        {partners.length > 0 && (
          <div className="mb-6">
            <div className="flex flex-wrap items-center justify-center gap-6">
              {partners.map((partner) => (
                <div
                  key={partner.id}
                  className="px-6 py-4 rounded-md border border-neutral-800 bg-neutral-900/40 text-center max-w-sm"
                >
                  <p className="text-white font-medium text-base font-jost">{partner.name}</p>
                  <p className="text-xs text-neutral-400 mt-1 font-jost">{partner.relationship}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Display Verified Guests if available */}
        {guests.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
            {guests.map((guest) => (
              <div
                key={guest.id}
                className="p-4 rounded-md border border-neutral-800 bg-neutral-900/40"
              >
                {guest.image && (
                  <img
                    src={guest.image}
                    alt={guest.name}
                    className="w-16 h-16 rounded-full object-cover mb-3 border border-[#D4AF37]/30"
                  />
                )}
                <h3 className="text-white font-medium font-jost">{guest.name}</h3>
                <p className="text-xs text-neutral-400 font-jost">{guest.title}</p>
                <p className="text-xs text-[#D4AF37]/80 mt-1 font-jost">{guest.organization}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default VerifiedGuestsPartnersSection;
