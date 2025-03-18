import { getWebsiteStats } from "@/app/actions/getWebsiteStats";
import { Home } from "@/app/home";
import WelcomeBanner from "@/components/insightsData/insightsData";

export default async function RootPage() {
  const insights = await getWebsiteStats();
  return (
    <>
      <WelcomeBanner onMobile={false} insights={insights} />
      <Home insights={insights} />;
    </>
  );
}
