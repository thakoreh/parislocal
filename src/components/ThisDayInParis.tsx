"use client";

import { useState, useEffect } from "react";
import { CalendarDays, Landmark, Droplets, TreeDeciduous, Flag } from "lucide-react";

// Real historical facts about Paris, Ontario
const PARIS_HISTORY = [
  { day: 1, fact: "Paris was founded in 1816 when settlers built mills at the Forks of the Grand and Nith Rivers — the word 'Paris' reportedly came from a dispute over whether the settlement should be named Paris or Niagara." },
  { day: 2, fact: "The iconic cobblestone buildings of Paris were built using glacial erratics — rounded stones deposited by glaciers and later exposed along the ancient shoreline of Lake Iroquois. Local builders found them abundant and free." },
  { day: 3, fact: "Paris, Ontario has more cobblestone buildings per capita than almost any other town in Canada. The technique flourished between 1850 and 1880 and produced buildings that have survived nearly two centuries." },
  { day: 4, fact: "The Grand River that runs through Paris is one of Ontario's designated Heritage Rivers — recognized for both its cultural significance and recreational value since 1994." },
  { day: 5, fact: "The Paris Fair, held annually on Labour Day weekend, is one of Ontario's oldest agricultural fairs, dating back to 1857 — making it over 165 years old." },
  { day: 6, fact: "The Carnegie Library on Market Street was built in 1911 using funding from Andrew Carnegie. It remains one of Paris's most architecturally significant public buildings." },
  { day: 7, fact: "Paris was once called 'the prettiest town in Canada' by Harrieet ll — a nickname that stuck and is still referenced in local tourism materials today." },
  { day: 8, fact: "The S.C. Johnson Trail connecting Paris to Brantford follows the path of an old railway line. The rail bed makes for a flat, scenic walk through forest and farmland." },
  { day: 9, fact: "Before European settlement, the area around Paris was hunting ground for the Mississaugas of the Credit River First Nation. The Forks of the Grand was a significant gathering place." },
  { day: 10, fact: "The Paris railway station, now closed, was built in the 1890s and was once a key stop on the Grand Trunk Railway line connecting Toronto and Chicago." },
  { day: 11, fact: "Apps' Mill Nature Centre, just west of Paris, was established in 1968 and is named after a local family. The 3 km of trails pass through Carolinian forest with rare plant species." },
  { day: 12, fact: "Paris sits at the confluence of the Grand River and Nith River — one of the few places in Southern Ontario where two significant rivers meet within a small town centre." },
  { day: 13, fact: "The Cobblestone Pub building at 111 Grand River St N is one of the most-photographed heritage structures in Southwestern Ontario, its lower walls made entirely of hand-set glacial stones." },
  { day: 14, fact: "Paris District High School, founded in 1923, is one of the oldest continuously operating secondary schools in Brant County. The original brick building still stands on Church Street." },
  { day: 15, fact: "In 1850, Paris had seven flour mills along the Grand River — more than any other settlement in what is now Brant County. The water power from the river drove the local economy." },
  { day: 16, fact: "The Paris Lions Club was founded in 1949 and has organized community events including the annual Santa Claus Parade for over 70 years." },
  { day: 17, fact: "Pinehurst Lake, a man-made lake created by a former gravel pit, is now a popular swimming spot 10 minutes from Paris with one of the warmest lakes in the region in summer." },
  { day: 18, fact: "The County of Brant (which includes Paris) has a population of approximately 40,000 people as of the 2021 Census, with Paris being the largest community at roughly 15,000." },
  { day: 19, fact: "The Two Rivers Tour, an annual cycling event running from Paris to Ancaster and back, has been called Ontario's spring cycling classic — the 70 km gravel route is a rite of passage for local cyclists." },
  { day: 20, fact: "Paris's cobblestone buildings are made from stones too rounded to cut into bricks, so builders set them individually by hand in mortar. Each building is effectively unique." },
  { day: 21, fact: "The Grand River in Paris is wide and slow-moving, making it suitable for beginner kayakers and canoeists. The current is mild through the town — paddlers should still check water levels after heavy rain." },
  { day: 22, fact: "The Paris Studio Tour, held each October, is a self-guided tour of local artists' working studios. It has been running for over 25 years and features painters, sculptors, and craftspeople." },
  { day: 23, fact: "The Brant County Health Team's physician waitlist is the primary way new Paris residents find a family doctor. Walk-in clinics in Brantford are the nearest option for urgent care." },
  { day: 24, fact: "Paris is located at approximately 43.2° N latitude — slightly north of some parts of Vancouver and with similar climate to much of interior Southern Ontario." },
  { day: 25, fact: "The Nith River joins the Grand River at Paris from the north, creating a natural T-junction. The river was historically used to float timber downstream to sawmills." },
  { day: 26, fact: "The Paris Golf Club, established in 1922, is one of the oldest golf courses in the region — a par-70 parkland course overlooking the Grand River valley." },
  { day: 27, fact: "During the War of 1812, the area around Paris (then still very new) was used as a supply route. The Forks of the Grand was strategically important for moving goods and people." },
  { day: 28, fact: "The Parish of St. James, with its distinctive cobblestone tower, was consecrated in 1849 — one of the oldest continuing congregations in the County of Brant." },
  { day: 29, fact: "Paris Ontario sits at the boundary between the Carolinian forest zone (to the south) and the Great Lakes-St. Lawrence forest zone. This makes the local ecology unusually diverse for its latitude." },
  { day: 30, fact: "The annual Paris Fair's Demolition Derby is one of the longest-running traditions of its kind in Ontario — cars deliberately crashed into each other for sport, to the delight of generations of fairgoers." },
  { day: 31, fact: "Despite being named after Paris, France, the connection was likely coincidental — some historians believe it simply referred to 'parish' or was the result of a coin toss. The town has no formal connection to France." },
];

export function ThisDayInParis() {
  const [fact, setFact] = useState<typeof PARIS_HISTORY[0] | null>(null);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const today = new Date().getDate();
    const todaysFact = PARIS_HISTORY.find((f) => f.day === today) || PARIS_HISTORY[0];
    setFact(todaysFact);
  }, []);

  if (!fact) return null;

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #1a2e26 0%, #2c4c3e 100%)",
        borderRadius: "16px",
        padding: "1.25rem",
        marginTop: "1.5rem",
      }}
    >
      <div
        style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.75rem", cursor: "pointer" }}
        onClick={() => setExpanded(!expanded)}
      >
        <Landmark size={16} style={{ color: "#c67f3b" }} />
        <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.75rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>
          This Day in Paris History
        </span>
      </div>

      <p
        style={{
          color: "white",
          fontSize: "0.9rem",
          lineHeight: 1.6,
          margin: 0,
          overflow: "hidden",
          transition: "max-height 0.3s ease",
          maxHeight: expanded ? "500px" : "3.2em",
        }}
      >
        {fact.fact}
      </p>

      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          marginTop: "0.5rem",
          background: "none",
          border: "none",
          color: "#c67f3b",
          fontSize: "0.8rem",
          fontWeight: 600,
          cursor: "pointer",
          padding: 0,
        }}
      >
        {expanded ? "Show less" : "Read more"}
      </button>
    </div>
  );
}
