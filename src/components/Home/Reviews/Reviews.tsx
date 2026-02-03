"use client";

import { cn } from "@/lib/utils";
import { Marquee } from "@/components/ui/marquee";
import { useTranslations, useLocale } from "next-intl";

const ReviewCard = ({
  img,
  name,
  role,
  body,
}: {
  img: string;
  name: string;
  role: string;
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-80 h-45 cursor-pointer overflow-hidden rounded-xl border p-4",
        // dark styles
        "border-white/10 bg-black/20 hover:bg-black/40 backdrop-blur-sm transition-colors",
      )}
    >
      <div className="flex flex-row items-center gap-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <div className="flex flex-col">
          <figcaption className="text-sm font-medium text-white">{name}</figcaption>
          <p className="text-xs font-medium text-white/40">{role}</p>
        </div>
      </div>
      <blockquote className="mt-2 text-sm text-white/70">{body}</blockquote>
    </figure>
  );
};

export default function Reviews() {
  const t = useTranslations("home");
  const locale = useLocale();

  const reviews = [
    {
      name: t("review_1_name"),
      role: t("review_1_role"),
      body: t("review_1_body"),
      img: "https://avatar.vercel.sh/heba",
    },
    {
      name: t("review_2_name"),
      role: t("review_2_role"),
      body: t("review_2_body"),
      img: "https://avatar.vercel.sh/mahmoud",
    },
    {
      name: t("review_3_name"),
      role: t("review_3_role"),
      body: t("review_3_body"),
      img: "https://avatar.vercel.sh/fahad",
    },
    {
      name: t("review_4_name"),
      role: t("review_4_role"),
      body: t("review_4_body"),
      img: "https://avatar.vercel.sh/abdullah",
    },
    {
      name: t("review_5_name"),
      role: t("review_5_role"),
      body: t("review_5_body"),
      img: "https://avatar.vercel.sh/sultan",
    },
    {
      name: t("review_7_name"),
      role: t("review_7_role"),
      body: t("review_7_body"),
      img: "https://avatar.vercel.sh/sarah",
    },
    {
      name: t("review_8_name"),
      role: t("review_8_role"),
      body: t("review_8_body"),
      img: "https://avatar.vercel.sh/karim",
    },
    {
      name: t("review_9_name"),
      role: t("review_9_role"),
      body: t("review_9_body"),
      img: "https://avatar.vercel.sh/omar",
    },
    {
      name: t("review_10_name"),
      role: t("review_10_role"),
      body: t("review_10_body"),
      img: "https://avatar.vercel.sh/mohamed",
    },
  ];

  const firstRow = reviews.slice(0, Math.ceil(reviews.length / 2));
  const secondRow = reviews.slice(Math.ceil(reviews.length / 2));

  return (
    <section className="w-full bg-[#0a0a0a] py-8 overflow-hidden relative">
      <div className="w-full max-w-[100rem] mx-auto relative z-10 flex flex-col gap-4">
        <h2 className="text-3xl md:text-5xl font-bold text-center text-white mb-8">
          {t("reviews_title")}
        </h2>
        <Marquee dir="ltr" pauseOnHover className="[--duration:40s] [--gap:1rem]">
          {firstRow.map((review) => (
            <div key={review.name} dir={locale === "ar" ? "rtl" : "ltr"}>
              <ReviewCard {...review} />
            </div>
          ))}
        </Marquee>
        <Marquee dir="ltr" reverse pauseOnHover className="[--duration:40s] [--gap:1rem]">
          {secondRow.map((review) => (
            <div key={review.name} dir={locale === "ar" ? "rtl" : "ltr"}>
              <ReviewCard {...review} />
            </div>
          ))}
        </Marquee>

        <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-[#0a0a0a] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-[#0a0a0a] to-transparent" />
      </div>
    </section>
  );
}
