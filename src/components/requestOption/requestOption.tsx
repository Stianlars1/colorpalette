import { Button } from "@/components/ui/button";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import styles from "./requestOption.module.css";
import { useState } from "react";
import { cx } from "class-variance-authority";
import { logRequestExportEvent } from "@/lib/logExportEvent";

const RequestExportOption = () => {
  const handleGithubIssue = async () => {
    await logRequestExportEvent();
    window.open(
      "https://github.com/Stianlars1/colorpalette/issues/new?labels=feature-request,export-format&template=export-format-request.md&title=%5BExport%20Format%5D%3A%20",
      "_blank",
    );
  };

  const [isExpaned, setIsExpanded] = useState(false);
  const handleExpand = () => {
    setIsExpanded((prev) => !prev);
  };
  return (
    <div className={styles.container}>
      <Button
        className={styles.expandButton}
        variant={"link"}
        onClick={handleExpand}
      >
        Don&apos;t see your preferred format?
      </Button>
      {isExpaned && (
        <>
          <p>
            Request a new export format through our GitHub issues. We&apos;re
            always looking to support more frameworks and tools.
          </p>
          <Button
            onClick={handleGithubIssue}
            variant="outline"
            className={cx("shrink-0", styles.openIssueButton)}
            style={{ backgroundColor: "hsl(var(--primary))" }}
          >
            <GitHubLogoIcon className="mr-2 h-4 w-4" />
            Request Export Format
          </Button>
        </>
      )}
    </div>
  );
};

export default RequestExportOption;
