import { getWebsiteStats } from "@/lib/getWebsiteStats";
import { Home } from "@/app/home";
import WelcomeBanner from "@/components/insightsData/insightsData";

export const revalidate = false;
export const dynamic = "force-dynamic";

export default async function RootPage() {
  const insights = await getWebsiteStats();

  return (
    <>
      <WelcomeBanner onMobile={false} insights={insights} />
      <Home insights={insights} />
    </>
  );
}
