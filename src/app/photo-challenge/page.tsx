"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Camera, MapPin, Sun, CheckCircle2, Sparkles, ArrowLeft } from "lucide-react";

const PHOTO_SPOTS = [
  {
    id: 1,
    name: "St. James Cobblestone Church",
    description: "The crown jewel of Paris's cobblestone architecture. The entire front facade is made of glacial stones, varying from grey-brown to pink granite. Best shot: wide angle from the sidewalk at sunrise.",
    address: "120 Grand River St N, Paris",
    bestTime: "Sunrise — east-facing facade catches the first light",
    tip: "Use the stone lamppost on the left as a leading line",
    imageQuery: "cobblestone church paris ontario",
    difficulty: "Easy",
  },
  {
    id: 2,
    name: "Grand River Bridge View",
    description: "The iconic Paris bridge shot — the red rail bridge against the Grand River. Walk to the north end of Grand River St for the classic postcard angle.",
    address: "Grand River St N at the bridge",
    bestTime: "Blue hour (20 min before sunset) for the best light",
    tip: "The reflection in the water is best in calm conditions",
    imageQuery: "paris ontario grand river bridge",
    difficulty: "Easy",
  },
  {
    id: 3,
    name: "Cobblestone Pub Heritage Wall",
    description: "Inside one of Canada's oldest cobblestone buildings. The interior stonework is even more impressive than the exterior. Ask nicely at the bar.",
    address: "111 Grand River St N",
    bestTime: "Any time — inside year-round",
    tip: "The fireplace corner on the south wall is the most photogenic",
    imageQuery: "cobblestone building interior paris ontario",
    difficulty: "Easy",
  },
  {
    id: 4,
    name: "Nith River Confluence View",
    description: "Where the Nith River meets the Grand River — a peaceful spot just south of downtown. The water colour contrast is most dramatic after rain.",
    address: "End of Mill St, Paris",
    bestTime: "Late afternoon — the water glows green-blue",
    tip: "The footbridge gives a elevated perspective over both rivers",
    imageQuery: "nith river confluence paris ontario",
    difficulty: "Medium",
  },
  {
    id: 5,
    name: "Paris Fairgrounds Gate",
    description: "The heritage entrance to the Paris Fairgrounds — the annual Labour Day fair is one of Ontario's oldest. The wooden gate and cobblestone pillars are pure small-town Canada.",
    address: "139 Silver St, Paris",
    bestTime: "Golden hour — the wood glows warm",
    tip: "During Fair week (Labour Day weekend) there are banners and flags",
    imageQuery: "paris fairgrounds heritage gate",
    difficulty: "Easy",
  },
  {
    id: 6,
    name: "Library Park Gazebo",
    description: "The century-old gazebo in the park behind the Paris Carnegie Library. In spring the surrounding trees create a natural frame. One of the town's best-kept photo secrets.",
    address: "1 Market St, Paris (Library Park)",
    bestTime: "Spring (May) for cherry blossoms, or autumn for fall colours",
    tip: "The gazebo's reflection in the duck pond is best after rain",
    imageQuery: "paris ontario library park gazebo",
    difficulty: "Medium",
  },
  {
    id: 7,
    name: "Dundas St Looking West",
    description: "The classic main street shot — tree-lined Dundas St with the Paris clock tower in the distance. Walk to the east end of Dundas St for the full perspective.",
    address: "Dundas St E at William St",
    bestTime: "Early morning before traffic, or after 6pm for golden light",
    tip: "The trees on both sides create a natural frame — shoot between them",
    imageQuery: "paris ontario main street dundas",
    difficulty: "Easy",
  },
  {
    id: 8,
    name: "Cobblestone Side Street Alleys",
    description: "Behind the main commercial strip, the alleyways between buildings reveal hidden cobblestone walls — unexpected texture in the middle of town.",
    address: "Alley between 50-60 Grand River St N",
    bestTime: "Overcast days — even lighting shows the texture best",
    tip: "Look up — some of the best cobblestone is two stories high",
    imageQuery: "cobblestone alley heritage paris ontario",
    difficulty: "Hard",
  },
  {
    id: 9,
    name: "Forks of the Grand River",
    description: "The landform that defined Paris — where the Grand River bends and the Nith joins. The river is widest here, with the most dramatic sky reflections.",
    address: "Forks of the Grand River, Paris",
    bestTime: "Sunset — the sky colours reflect beautifully on the water",
    tip: "There's a small pull-off on River Road West — no facilities",
    imageQuery: "forks grand river nith paris ontario",
    difficulty: "Medium",
  },
  {
    id: 10,
    name: "Old Train Bridge Abutment",
    description: "The stone pillars of the old railway bridge that once crossed the Grand River. The remaining abutments on both banks make for striking industrial heritage photography.",
    address: "River Road West trail, Paris",
    bestTime: "Autumn — the trees around the stonework turn orange and gold",
    tip: "The abutment on the west bank is easiest to access via the trail",
    imageQuery: "old railway bridge stone abutment paris ontario",
    difficulty: "Hard",
  },
];

const DIFFICULTY_COLORS: Record<string, string> = {
  Easy: "#22c55e",
  Medium: "#f59e0b",
  Hard: "#ef4444",
};

export default function PhotoChallengePage() {
  const [checked, setChecked] = useState<string[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem("paris_photo_challenge");
    if (stored) {
      setChecked(JSON.parse(stored));
    }
  }, []);

  const toggleSpot = (id: number) => {
    const newChecked = checked.includes(String(id))
      ? checked.filter((c) => String(id) !== c)
      : [...checked, String(id)];
    setChecked(newChecked);
    localStorage.setItem("paris_photo_challenge", JSON.stringify(newChecked));
  };

  const progress = Math.round((checked.length / PHOTO_SPOTS.length) * 100);
  const completed = checked.length === PHOTO_SPOTS.length;

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", fontFamily: "var(--font-sans)" }}>
      {/* Header */}
      <header style={{ background: "linear-gradient(135deg, #1a2e26 0%, #233d32 100%)", padding: "3rem 1.5rem 4rem" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: "0.875rem", marginBottom: "1.5rem" }}>
            <ArrowLeft size={16} />
            Back to ParisLocal
          </Link>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
            <Camera size={32} style={{ color: "#c67f3b" }} />
            <h1 style={{ fontSize: "2rem", fontWeight: 800, color: "white", margin: 0 }}>
              Paris Photo Challenge
            </h1>
          </div>
          <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "1rem", maxWidth: 500 }}>
            10 curated Instagram-worthy spots in Paris, Ontario. Check them off as you discover them.
          </p>

          {/* Progress */}
          <div style={{ marginTop: "2rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
              <span style={{ color: "rgba(255,255,255,0.8)", fontSize: "0.875rem", fontWeight: 600 }}>
                {checked.length} / {PHOTO_SPOTS.length} spots discovered
              </span>
              <span style={{ color: "#c67f3b", fontSize: "0.875rem", fontWeight: 700 }}>{progress}%</span>
            </div>
            <div style={{ height: "8px", background: "rgba(255,255,255,0.2)", borderRadius: "9999px", overflow: "hidden" }}>
              <div
                style={{
                  height: "100%",
                  width: `${progress}%`,
                  background: completed ? "#22c55e" : "#c67f3b",
                  borderRadius: "9999px",
                  transition: "width 0.5s ease",
                }}
              />
            </div>
          </div>

          {completed && (
            <div style={{ marginTop: "1.5rem", padding: "1rem", background: "rgba(34,197,94,0.15)", borderRadius: "12px", border: "1px solid rgba(34,197,94,0.3)", display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <Sparkles size={24} style={{ color: "#22c55e" }} />
              <div>
                <p style={{ color: "#22c55e", fontWeight: 700, margin: 0 }}>Challenge Complete!</p>
                <p style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.875rem", margin: "0.25rem 0 0" }}>
                  You've discovered all 10 photo spots in Paris, Ontario
                </p>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Spots Grid */}
      <div style={{ maxWidth: 800, margin: "0 auto", padding: "2rem 1.5rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {PHOTO_SPOTS.map((spot) => {
            const isChecked = checked.includes(String(spot.id));
            return (
              <div
                key={spot.id}
                style={{
                  background: "white",
                  borderRadius: "16px",
                  overflow: "hidden",
                  border: isChecked ? "2px solid #22c55e" : "2px solid var(--border)",
                  transition: "all 0.2s ease",
                  boxShadow: isChecked ? "0 0 0 4px rgba(34,197,94,0.1)" : "var(--shadow-sm)",
                }}
              >
                {/* Placeholder image area */}
                <div
                  style={{
                    height: 180,
                    background: `linear-gradient(135deg, #e8e5df 0%, #d4cfc7 100%)`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    position: "relative",
                  }}
                >
                  <div style={{ textAlign: "center", color: "var(--text-muted)" }}>
                    <Camera size={32} style={{ opacity: 0.5, marginBottom: "0.5rem" }} />
                    <p style={{ fontSize: "0.75rem", maxWidth: 200 }}>
                      {spot.imageQuery}
                    </p>
                  </div>

                  {/* Difficulty badge */}
                  <div
                    style={{
                      position: "absolute",
                      top: 12,
                      right: 12,
                      background: DIFFICULTY_COLORS[spot.difficulty],
                      color: "white",
                      padding: "0.25rem 0.75rem",
                      borderRadius: "9999px",
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {spot.difficulty}
                  </div>

                  {/* Check overlay */}
                  {isChecked && (
                    <div style={{ position: "absolute", inset: 0, background: "rgba(34,197,94,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <CheckCircle2 size={48} style={{ color: "#22c55e" }} />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div style={{ padding: "1.25rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", marginBottom: "0.75rem" }}>
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--text)", margin: 0 }}>{spot.name}</h3>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.25rem", marginTop: "0.25rem", color: "var(--text-muted)", fontSize: "0.8rem" }}>
                        <MapPin size={12} />
                        {spot.address}
                      </div>
                    </div>
                    <button
                      onClick={() => toggleSpot(spot.id)}
                      style={{
                        flexShrink: 0,
                        width: 44,
                        height: 44,
                        borderRadius: "50%",
                        border: isChecked ? "2px solid #22c55e" : "2px solid var(--border)",
                        background: isChecked ? "#22c55e" : "transparent",
                        color: isChecked ? "white" : "var(--text-muted)",
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transition: "all 0.2s",
                        fontSize: "0.7rem",
                        fontWeight: 600,
                      }}
                    >
                      {isChecked ? <CheckCircle2 size={20} /> : <span>+{checked.filter(c => c === String(spot.id)).length || ""}</span>}
                    </button>
                  </div>

                  <p style={{ color: "var(--text-secondary)", fontSize: "0.875rem", lineHeight: 1.6, margin: "0 0 0.75rem" }}>
                    {spot.description}
                  </p>

                  <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                      <Sun size={14} style={{ color: "#c67f3b" }} />
                      <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>{spot.bestTime}</span>
                    </div>
                  </div>

                  <div style={{ marginTop: "0.75rem", padding: "0.75rem", background: "var(--bg)", borderRadius: "10px" }}>
                    <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", margin: 0 }}>
                      <strong style={{ color: "var(--text)" }}>Pro tip:</strong> {spot.tip}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
