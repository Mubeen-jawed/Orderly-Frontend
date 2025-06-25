import React from "react";
import { restaurantConfig } from "../data/restaurantData";

const Footer = () => {
  return (
    <footer
      className={`bg-${restaurantConfig.colors.primary} text-white py-8 mt-8`}
    >
      <div className="max-w-4xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div>
            <h3 className="text-xl font-bold mb-3">{restaurantConfig.name}</h3>
            <p className="text-orange-100">{restaurantConfig.tagline}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Contact Us</h4>
            <p className="text-orange-100 text-sm">
              Phone: {restaurantConfig.contact.phone}
            </p>
            <p className="text-orange-100 text-sm">
              Email: {restaurantConfig.contact.email}
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">Follow Us</h4>
            <p className="text-orange-100 text-sm">
              {restaurantConfig.social.facebook} |{" "}
              {restaurantConfig.social.instagram}
            </p>
            <p className="text-orange-100 text-sm">
              {restaurantConfig.social.twitter} |{" "}
              {restaurantConfig.social.whatsapp}
            </p>
          </div>
        </div>
        <div className="border-t border-orange-400 mt-6 pt-4 text-center">
          <p className="text-orange-100 text-sm">
            © 2025 {restaurantConfig.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
