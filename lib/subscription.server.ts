import { auth } from "@clerk/nextjs/server";
import { PLAN_LIMITS } from "./subscription-constants";

export async function getUserPlan() {
  const { userId, has } = auth();

  if (!userId) return "free";

  // Check Clerk to see if they have purchased a specific plan role
  try {
    if (has({ permission: "plan:pro" })) return "pro";
    if (has({ permission: "plan:standard" })) return "standard";
  } catch (error) {
    // If billing isn't fully configured in the Clerk dashboard yet, default to free
    console.error("Clerk plan check fallback");
  }

  return "free";
}

export async function getPlanLimits() {
  const plan = await getUserPlan();
  
  // Return the specific limits for their active plan
  if (plan === "pro") return PLAN_LIMITS.pro;
  if (plan === "standard") return PLAN_LIMITS.standard;
  return PLAN_LIMITS.free;
}