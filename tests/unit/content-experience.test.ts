import { describe, expect, it } from "vitest";
import { EDUCATION } from "@/content/education";
import { EXPERIENCE } from "@/content/experience";
import { profile } from "@/content/profile";
import { SERVICES } from "@/content/services";
import type { Localized } from "@/content/types";

function expectBothLocales(value: Localized<unknown>) {
  expect(Object.keys(value).sort()).toEqual(["en", "pt-BR"]);
  for (const text of Object.values(value)) expect(text).toBeTruthy();
}

describe("experience", () => {
  it("has at least one deliverable and one stack item per job, in both languages", () => {
    for (const job of EXPERIENCE) {
      expect(job.deliverables.length).toBeGreaterThanOrEqual(1);
      expect(job.stack.length).toBeGreaterThanOrEqual(1);
      expectBothLocales(job.role);
      expectBothLocales(job.summary);
      for (const deliverable of job.deliverables) {
        expectBothLocales(deliverable.title);
        expectBothLocales(deliverable.description);
      }
    }
  });

  it("is ordered by start date, newest first", () => {
    const starts = EXPERIENCE.map((job) => job.start);
    expect(starts).toEqual([...starts].sort().reverse());
  });
});

describe("education", () => {
  it("is ordered by year, then completion month, newest first", () => {
    const keys = EDUCATION.map((course) => `${course.year}-${course.completedOn ?? "00"}`);
    expect(keys).toEqual([...keys].sort().reverse());
  });

  it("has course names in both languages", () => {
    for (const course of EDUCATION) expectBothLocales(course.course);
  });
});

describe("services", () => {
  it("has three areas with unique keys and items in both languages", () => {
    expect(SERVICES).toHaveLength(3);
    expect(new Set(SERVICES.map((service) => service.key)).size).toBe(3);
    for (const service of SERVICES) {
      expectBothLocales(service.title);
      expectBothLocales(service.summary);
      expect(service.items["pt-BR"]).toHaveLength(service.items.en.length);
    }
  });
});

describe("profile stats", () => {
  it("never counts projects", () => {
    for (const stat of profile.stats) {
      expect(`${stat.label["pt-BR"]} ${stat.label.en}`).not.toMatch(/projeto|project/i);
    }
  });
});
