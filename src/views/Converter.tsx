"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CitySearch from "@/components/CitySearch";
import ClockCard from "@/components/ClockCard";
import TimelineSlider from "@/components/TimelineSlider";
import OverlapIndicator from "@/components/OverlapIndicator";
import ShareButton from "@/components/ShareButton";
import CalendarExport from "@/components/CalendarExport";
import { CITIES, type City } from "@/data/cities";
import { getUserTimezone } from "@/lib/timezone";
import { Button } from "@/components/ui/button";
import { RotateCcw } from "lucide-react";

interface ConverterProps {
  defaultZones?: string[];
  seoContent?: { heading: string; body: string; pageTitle: string; pageDescription: string };
}

const getDefaultCities = (): City[] => {
  const userTz = getUserTimezone();
  const userCity = CITIES.find(c => c.timezone === userTz);
  const ny = CITIES.find(c => c.name === "New York")!;
  const london = CITIES.find(c => c.name === "London")!;
  const tokyo = CITIES.find(c => c.name === "Tokyo")!;
  return [userCity || ny, london, tokyo].filter(Boolean) as City[];
};

const Converter = ({ defaultZones, seoContent }: ConverterProps) => {
  const searchParams = useSearchParams();
  const [selectedCities, setSelectedCities] = useState<City[]>([]);
  const [referenceTime, setReferenceTime] = useState(new Date());
  const [isManualTime, setIsManualTime] = useState(false);

  // Init cities from URL > props > auto-detect
  useEffect(() => {
    const zonesParam = searchParams.get("zones");
    const timeParam = searchParams.get("time");

    if (zonesParam) {
      const names = zonesParam.split(",").map(s => s.trim());
      const cities = names
        .map(n => CITIES.find(c => c.name.toLowerCase() === n.toLowerCase()))
        .filter(Boolean) as City[];
      if (cities.length > 0) {
        setSelectedCities(cities);
        if (timeParam) {
          const d = new Date(timeParam);
          if (!isNaN(d.getTime())) {
            setReferenceTime(d);
            setIsManualTime(true);
          }
        }
        return;
      }
    }

    if (defaultZones && defaultZones.length > 0) {
      const cities = defaultZones
        .map(n => CITIES.find(c => c.name.toLowerCase() === n.toLowerCase()))
        .filter(Boolean) as City[];
      if (cities.length > 0) {
        setSelectedCities(cities);
        return;
      }
    }

    setSelectedCities(getDefaultCities());
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Auto-update time every minute (unless manual)
  useEffect(() => {
    if (isManualTime) return;
    const interval = setInterval(() => setReferenceTime(new Date()), 60000);
    return () => clearInterval(interval);
  }, [isManualTime]);

  const handleTimeChange = useCallback((date: Date) => {
    setReferenceTime(date);
    setIsManualTime(true);
  }, []);

  const resetToNow = () => {
    setReferenceTime(new Date());
    setIsManualTime(false);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-6 space-y-6">
        {/* Top bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h1 className="text-xl font-bold">Time Zone Converter</h1>
          <div className="flex gap-2">
            {isManualTime && (
              <Button variant="ghost" size="sm" onClick={resetToNow} className="gap-1.5 text-muted-foreground">
                <RotateCcw className="h-3.5 w-3.5" />
                Reset to now
              </Button>
            )}
            <ShareButton cities={selectedCities} referenceTime={referenceTime} />
            <CalendarExport cities={selectedCities} referenceTime={referenceTime} />
          </div>
        </div>

        {/* City picker */}
        <CitySearch selectedCities={selectedCities} onCitiesChange={setSelectedCities} />

        {/* Clocks */}
        {selectedCities.length > 0 && (
          <div className="grid gap-3 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {selectedCities.map((city, i) => (
              <ClockCard key={`${city.name}-${i}`} city={city} referenceTime={referenceTime} />
            ))}
          </div>
        )}

        {/* Timeline */}
        {selectedCities.length > 0 && (
          <div className="glass rounded-xl p-4 md:p-6">
            <h2 className="text-sm font-medium text-muted-foreground mb-4">
              Timeline — drag to change time
            </h2>
            <TimelineSlider
              zones={selectedCities}
              referenceTime={referenceTime}
              onTimeChange={handleTimeChange}
            />
          </div>
        )}

        {/* Overlap */}
        <OverlapIndicator zones={selectedCities} referenceTime={referenceTime} />

        {/* SEO content */}
        {seoContent && (
          <section className="border-t border-border/30 pt-8 mt-8">
            <h2 className="text-xl font-semibold mb-3">{seoContent.heading}</h2>
            <p className="text-muted-foreground leading-relaxed max-w-3xl">{seoContent.body}</p>
          </section>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Converter;
