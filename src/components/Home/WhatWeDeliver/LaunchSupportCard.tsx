"use client";

import { Check, Loader, Brain, Bug, Rocket, Radio, Eye } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

interface LaunchSupportCardProps {
  className?: string;
}

import { cn } from "@/lib/utils";

export default function LaunchSupportCard({
  className,
}: LaunchSupportCardProps) {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const t = useTranslations("home");

  const steps = [
    {
      id: "build",
      labelKey: "launch_step_build",
      subKey: "launch_step_build_sub",
      icon: Brain,
    },
    {
      id: "test",
      labelKey: "launch_step_test",
      subKey: "launch_step_test_sub",
      icon: Bug,
    },
    {
      id: "review",
      labelKey: "launch_step_review",
      subKey: "launch_step_review_sub",
      icon: Eye,
    },
    {
      id: "deploy",
      labelKey: "launch_step_deploy",
      subKey: "launch_step_deploy_sub",
      icon: Rocket,
    },
    {
      id: "live",
      labelKey: "launch_step_live",
      subKey: "launch_step_live_sub",
      icon: Radio,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStepIndex((prev) => (prev + 1) % (steps.length + 1));
    }, 2000);

    return () => clearInterval(interval);
  }, [steps.length]);

  const isComplete = activeStepIndex === steps.length;

  return (
    <div
      className={cn(
        "w-full rounded-xl bg-[#0F0F10] border border-white/10 p-5 md:p-6 flex flex-col mx-auto md:mx-0 transition-all duration-300",
        className,
      )}
    >
      <h2 className="text-2xl font-bold text-white mb-3">
        {t("launch_support_title")}
      </h2>
      <p className="text-gray-400 text-sm mb-6 leading-relaxed">
        {t("launch_support_desc")}
      </p>

      <div className="flex-1 flex flex-col justify-end">
        {/* Status Header */}
        <div className="flex items-center justify-between text-sm font-medium mb-3">
          <span className={isComplete ? "text-emerald-400" : "text-white"}>
            {isComplete
              ? t("launch_status_live")
              : t("launch_status_deploying")}
          </span>
          <span className="text-gray-500">v2.29.0</span>
        </div>

        {/* Steps List */}
        <div className="space-y-3">
          {steps.map((step, i) => {
            let status: "waiting" | "loading" | "completed" = "waiting";
            if (i < activeStepIndex) status = "completed";
            else if (i === activeStepIndex) status = "loading";

            const isCompleted = status === "completed";
            const isLoading = status === "loading";

            // Colors: Yellow-400 (#FACC15), Blue-400 (#60A5FA), Green-400 (#34D399)
            const loadingColors = ["#FACC15", "#60A5FA", "#34D399"];

            return (
              <motion.div
                key={step.id}
                initial={false}
                animate={
                  isLoading
                    ? {
                        borderColor: loadingColors,
                        backgroundColor: [
                          "rgba(250, 204, 21, 0.1)",
                          "rgba(96, 165, 250, 0.1)",
                          "rgba(52, 211, 153, 0.1)",
                        ],
                        color: loadingColors,
                      }
                    : isCompleted
                      ? {
                          borderColor: "rgba(52, 211, 153, 0.2)",
                          backgroundColor: "rgba(52, 211, 153, 0.1)",
                          color: "#34D399",
                        }
                      : {
                          borderColor: "#27272a",
                          backgroundColor: "rgba(24, 24, 27, 0.5)",
                          color: "#52525b",
                        }
                }
                transition={
                  isLoading
                    ? { duration: 2, repeat: Infinity, ease: "linear" }
                    : { duration: 0.3 }
                }
                className="relative flex items-center p-3 rounded-xl border transition-all gap-4"
              >
                {/* Status Loader/Check */}
                <div className="shrink-0 flex items-center justify-center w-6">
                  {isLoading ? (
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      <Loader className="w-4 h-4" />
                    </motion.div>
                  ) : isCompleted ? (
                    <Check className="w-4 h-4" />
                  ) : (
                    <div className="w-1.5 h-1.5 rounded-full bg-current opacity-20" />
                  )}
                </div>

                {/* Step Icon */}
                <div className="shrink-0 flex items-center justify-center w-6">
                  <step.icon
                    className={`w-4 h-4 ${status === "waiting" ? "opacity-50" : ""}`}
                  />
                </div>

                {/* Text */}
                <div className="flex flex-col">
                  <span className="font-semibold text-sm leading-none mb-1">
                    {t(step.labelKey)}
                  </span>
                  <span className="text-xs opacity-80 leading-none">
                    {t(step.subKey)}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-6 flex items-center gap-2 text-sm text-gray-500">
          <div
            className={`w-2 h-2 rounded-full ${
              isComplete
                ? "bg-emerald-500 animate-pulse"
                : "bg-blue-500 animate-pulse"
            }`}
          />
          <span>
            {isComplete
              ? t("launch_status_operational")
              : t("launch_status_progress")}
          </span>
        </div>
      </div>
    </div>
  );
}
