import React from "react";

const phases = [
  {
    phase: "PHASE 1",
    title: "Consultation",
    icon: "https://cdn.prod.website-files.com/636bcba314325d46664ce3a4/646eba3b9a947b6271f5ddc3_order_number_icon_149906%201.svg",
    arrow: true,
  },
  {
    phase: "PHASE 2",
    title: "Order & Consolidation",
    icon: "https://cdn.prod.website-files.com/636bcba314325d46664ce3a4/646eba459a947b6271f5e5f4_loading_icon_149916%201.svg",
    arrow: true,
  },
  {
    phase: "PHASE 3",
    title: "Shipping & Customs",
    icon: "https://cdn.prod.website-files.com/636bcba314325d46664ce3a4/646eba6bc155e528ca2d5300_process_events_icon_149896%201%20(1).svg",
    arrow: true,
  },
  {
    phase: "PHASE 4",
    title: "Delivery & Installation",
    icon: "https://cdn.prod.website-files.com/636bcba314325d46664ce3a4/646eba79b4a048bfc0b0b99a_quit_icon_149882%201.svg",
    subtext: "LOCAL PARTNER ASSEMBLY TEAM",
    arrow: true,
  },
  {
    phase: "PHASE 5",
    title: "Concierge Customer Service",
    icon: "https://cdn.prod.website-files.com/636bcba314325d46664ce3a4/646eba83e23fb18371709ec3_profile_config_icon_149889%201.svg",
    subtext: "CUSTOMER SERVICE AFTER-SALES SERVICE",
    arrow: false,
  },
];

export default function ProcessSteps() {
  return (
    <div className="process-wrap">
      <div className="process-h">
        <h1 className="h2-new">
          Our concierge procurement process and white glove delivery services
        </h1>
      </div>

      <div className="process-blocks-wrap">
        {phases.map((item, idx) => (
          <div className="process-card" key={idx}>
            <div className="process-box">
              <div
                className={`process-graphic pg${idx + 1}`}
                style={{ opacity: 1 }}
              >
                <div className="process-circle">
                  <div className="process-icon">
                    <img
                      src={item.icon}
                      alt="Icon"
                      loading="lazy"
                      className="image"
                    />
                  </div>
                </div>
                {item.subtext && (
                  <div className="graphic-title">
                    <div className="paragraph-12">{item.subtext}</div>
                  </div>
                )}
                <div
                  className={`process-phase phase${idx + 1}`}
                  style={{ color: "#002b00" }}
                >
                  <div className="paragraph-12">{item.phase}</div>
                </div>
              </div>
            </div>

            <div className="process-content">
              <div className="process-title">
                <div className="process-title-h">
                  <div className="editorial-26 height-1">{item.title}</div>
                </div>
                {item.arrow && (
                  <div className="arrow-right">
                    <img
                      src="https://cdn.prod.website-files.com/636bcba314325d46664ce3a4/6458e93574276d7720e9853b_Vector%201.svg"
                      alt="Arrow"
                      loading="lazy"
                      className="image"
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Optional Progress Bar */}
        <div className="process-bar-div">
          <div
            className="process-bar"
            style={{ width: "100%", height: "100%" }}
          ></div>
        </div>
      </div>
    </div>
  );
}
